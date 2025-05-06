import React from 'react';
import { Navigate } from 'react-router-dom';
import Auth from '../components/auth/Auth';
import { Brain } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const LoginPage: React.FC = () => {
  const { user, loading } = useAuth();

  // If the user is already logged in, redirect to the dashboard
  if (!loading && user) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white border-b border-gray-200 py-4">
        <div className="container mx-auto px-4 flex items-center">
          <Brain className="h-8 w-8 text-black" />
          <div className="ml-2">
            <h1 className="text-xl font-bold text-black">MEDDPICC Qualification Agent</h1>
            <p className="text-sm text-gray-600">AI-powered opportunity qualification</p>
          </div>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <Auth />
        </div>
      </main>

      <footer className="py-6 border-t border-gray-200">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-gray-600">
            © {new Date().getFullYear()} MEDDPICC Qualification Agent. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LoginPage;