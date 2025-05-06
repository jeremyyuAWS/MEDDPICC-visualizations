import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { AnalysisResult } from '../types';

export function useSupabaseStorage() {
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Save meeting notes and analysis results to Supabase
   */
  const saveAnalysis = async (notes: string, result: AnalysisResult, title?: string) => {
    setIsSaving(true);
    setError(null);

    try {
      // Get the current authenticated user
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error('User not authenticated');
      }

      // 1. First, create a meeting record
      const { data: meeting, error: meetingError } = await supabase
        .from('meetings')
        .insert({
          user_id: user.id,
          title: title || 'Meeting Notes',
          notes: notes,
          meeting_date: new Date().toISOString()
        })
        .select()
        .single();

      if (meetingError) throw meetingError;

      // Calculate overall scores
      const components = Object.values(result.meddpicc);
      const totalScore = components.reduce((sum, component) => sum + component.score, 0);
      const maxScore = components.length * 3;
      const scorePercentage = Math.round((totalScore / maxScore) * 100);

      // 2. Create an analysis record
      const { data: analysis, error: analysisError } = await supabase
        .from('analyses')
        .insert({
          meeting_id: meeting.id,
          user_id: user.id,
          overall_score: totalScore,
          max_score: maxScore,
          score_percentage: scorePercentage,
          email_draft: result.followUp.emailDraft
        })
        .select()
        .single();

      if (analysisError) throw analysisError;

      // 3. Insert MEDDPICC components
      const meddpiccComponents = Object.values(result.meddpicc).map(component => ({
        analysis_id: analysis.id,
        component_type: component.id,
        name: component.name,
        description: component.description,
        score: component.score,
        text: component.text,
        confidence: component.confidence,
        citation: component.citation
      }));

      const { error: componentsError } = await supabase
        .from('meddpicc_components')
        .insert(meddpiccComponents);

      if (componentsError) throw componentsError;

      // 4. Insert enrichment tags
      const tags = [
        ...(result.enrichment.cloudProvider 
          ? [{ 
              analysis_id: analysis.id, 
              type: 'cloud', 
              value: result.enrichment.cloudProvider 
            }] 
          : []),
        ...result.enrichment.tags.map(tag => ({
          analysis_id: analysis.id,
          type: tag.type,
          value: tag.value
        }))
      ];

      if (tags.length > 0) {
        const { error: tagsError } = await supabase
          .from('enrichment_tags')
          .insert(tags);

        if (tagsError) throw tagsError;
      }

      // 5. Insert follow-up questions
      if (result.followUp.questions.length > 0) {
        const questions = result.followUp.questions.map(q => ({
          analysis_id: analysis.id,
          component: q.component,
          question: q.question
        }));

        const { error: questionsError } = await supabase
          .from('follow_up_questions')
          .insert(questions);

        if (questionsError) throw questionsError;
      }

      return { success: true, meetingId: meeting.id, analysisId: analysis.id };
    } catch (err) {
      console.error('Error saving analysis:', err);
      setError(err instanceof Error ? err.message : 'Failed to save analysis');
      return { success: false, error: err };
    } finally {
      setIsSaving(false);
    }
  };

  /**
   * Load a specific analysis from Supabase
   */
  const loadAnalysis = async (analysisId: string) => {
    setIsLoading(true);
    setError(null);

    try {
      // Get the analysis
      const { data: analysis, error: analysisError } = await supabase
        .from('analyses')
        .select('*, meetings!inner(*)')
        .eq('id', analysisId)
        .single();

      if (analysisError) throw analysisError;

      // Get MEDDPICC components
      const { data: components, error: componentsError } = await supabase
        .from('meddpicc_components')
        .select('*')
        .eq('analysis_id', analysisId);

      if (componentsError) throw componentsError;

      // Get enrichment tags
      const { data: tags, error: tagsError } = await supabase
        .from('enrichment_tags')
        .select('*')
        .eq('analysis_id', analysisId);

      if (tagsError) throw tagsError;

      // Get follow-up questions
      const { data: questions, error: questionsError } = await supabase
        .from('follow_up_questions')
        .select('*')
        .eq('analysis_id', analysisId);

      if (questionsError) throw questionsError;

      // Transform data to match the application's format
      const meddpiccData: Record<string, any> = {};
      components.forEach(component => {
        meddpiccData[component.component_type] = {
          id: component.component_type,
          name: component.name,
          description: component.description,
          score: component.score,
          text: component.text,
          confidence: component.confidence,
          citation: component.citation
        };
      });

      const cloudProvider = tags.find(tag => tag.type === 'cloud')?.value;
      const otherTags = tags.filter(tag => tag.type !== 'cloud').map(tag => ({
        id: tag.id,
        type: tag.type,
        value: tag.value
      }));

      const followUpQuestions = questions.map(q => ({
        id: q.id,
        component: q.component,
        question: q.question
      }));

      // Construct the result object
      const result: AnalysisResult = {
        meddpicc: meddpiccData,
        enrichment: {
          cloudProvider,
          tags: otherTags
        },
        followUp: {
          questions: followUpQuestions,
          emailDraft: analysis.email_draft
        }
      };

      return {
        success: true,
        notes: analysis.meetings.notes,
        result,
        meetingMetadata: {
          title: analysis.meetings.title,
          meeting_date: analysis.meetings.meeting_date
        }
      };
    } catch (err) {
      console.error('Error loading analysis:', err);
      setError(err instanceof Error ? err.message : 'Failed to load analysis');
      return { success: false, error: err };
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Get a list of saved analyses for the current user
   */
  const getSavedAnalyses = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Get the current authenticated user
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error('User not authenticated');
      }

      // Get analyses with related meeting data
      const { data, error } = await supabase
        .from('analyses')
        .select(`
          id,
          overall_score,
          max_score,
          score_percentage,
          created_at,
          meetings (
            id,
            title,
            meeting_date
          )
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;

      return {
        success: true,
        analyses: data
      };
    } catch (err) {
      console.error('Error fetching analyses:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch analyses');
      return { success: false, error: err };
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isSaving,
    isLoading,
    error,
    saveAnalysis,
    loadAnalysis,
    getSavedAnalyses
  };
}