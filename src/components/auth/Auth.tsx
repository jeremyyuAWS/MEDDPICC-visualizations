import React, { useState, useEffect } from 'react';
import { Auth as SupabaseAuth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from '../../lib/supabase';
import { useLocation, useNavigate } from 'react-router-dom';

const Auth: React.FC = () => {
  const [view, setView] = useState<'sign_in' | 'sign_up'>('sign_in');
  const location = useLocation();
  const navigate = useNavigate();
  
  // Get the redirect path from location state if available
  const from = location.state?.from?.pathname || '/';

  // Check if user is already authenticated
  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (data.user) {
        navigate(from, { replace: true });
      }
    };
    
    checkUser();
  }, [navigate, from]);

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold">
          {view === 'sign_in' ? 'Sign In' : 'Create Account'}
        </h2>
        <p className="text-sm text-gray-600 mt-1">
          {view === 'sign_in'
            ? 'Sign in to access your MEDDPICC qualification tools'
            : 'Create an account to get started with MEDDPICC qualification'}
        </p>
      </div>

      <SupabaseAuth
        supabaseClient={supabase}
        view={view}
        appearance={{
          theme: ThemeSupa,
          style: {
            button: {
              backgroundColor: '#000',
              color: '#fff',
              borderRadius: '0.375rem',
            },
            input: {
              borderRadius: '0.375rem',
            },
            anchor: {
              color: '#000',
            },
          },
        }}
        theme="light"
        showLinks={true}
        providers={[]}
        redirectTo={`${window.location.origin}/`}
      />

      <div className="mt-6 text-center">
        {view === 'sign_in' ? (
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <button
              onClick={() => setView('sign_up')}
              className="text-black font-medium hover:underline"
            >
              Sign up
            </button>
          </p>
        ) : (
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <button
              onClick={() => setView('sign_in')}
              className="text-black font-medium hover:underline"
            >
              Sign in
            </button>
          </p>
        )}
      </div>
    </div>
  );
};

export default Auth;