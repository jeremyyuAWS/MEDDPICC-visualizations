export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      analyses: {
        Row: {
          id: string
          meeting_id: string
          user_id: string
          overall_score: number | null
          max_score: number | null
          score_percentage: number | null
          email_draft: string | null
          created_at: string
        }
        Insert: {
          id?: string
          meeting_id: string
          user_id: string
          overall_score?: number | null
          max_score?: number | null
          score_percentage?: number | null
          email_draft?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          meeting_id?: string
          user_id?: string
          overall_score?: number | null
          max_score?: number | null
          score_percentage?: number | null
          email_draft?: string | null
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "analyses_meeting_id_fkey"
            columns: ["meeting_id"]
            referencedRelation: "meetings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "analyses_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      enrichment_tags: {
        Row: {
          id: string
          analysis_id: string
          type: string
          value: string
          created_at: string
        }
        Insert: {
          id?: string
          analysis_id: string
          type: string
          value: string
          created_at?: string
        }
        Update: {
          id?: string
          analysis_id?: string
          type?: string
          value?: string
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "enrichment_tags_analysis_id_fkey"
            columns: ["analysis_id"]
            referencedRelation: "analyses"
            referencedColumns: ["id"]
          }
        ]
      }
      follow_up_questions: {
        Row: {
          id: string
          analysis_id: string
          component: string
          question: string
          created_at: string
        }
        Insert: {
          id?: string
          analysis_id: string
          component: string
          question: string
          created_at?: string
        }
        Update: {
          id?: string
          analysis_id?: string
          component?: string
          question?: string
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "follow_up_questions_analysis_id_fkey"
            columns: ["analysis_id"]
            referencedRelation: "analyses"
            referencedColumns: ["id"]
          }
        ]
      }
      meddpicc_components: {
        Row: {
          id: string
          analysis_id: string
          component_type: string
          name: string
          description: string | null
          score: number
          text: string | null
          confidence: number | null
          citation: string | null
          created_at: string
        }
        Insert: {
          id?: string
          analysis_id: string
          component_type: string
          name: string
          description?: string | null
          score: number
          text?: string | null
          confidence?: number | null
          citation?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          analysis_id?: string
          component_type?: string
          name?: string
          description?: string | null
          score?: number
          text?: string | null
          confidence?: number | null
          citation?: string | null
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "meddpicc_components_analysis_id_fkey"
            columns: ["analysis_id"]
            referencedRelation: "analyses"
            referencedColumns: ["id"]
          }
        ]
      }
      meetings: {
        Row: {
          id: string
          user_id: string
          title: string | null
          notes: string
          meeting_date: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          title?: string | null
          notes: string
          meeting_date?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          title?: string | null
          notes?: string
          meeting_date?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "meetings_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      users: {
        Row: {
          id: string
          email: string
          full_name: string | null
          organization_id: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          organization_id?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          organization_id?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "users_id_fkey"
            columns: ["id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}