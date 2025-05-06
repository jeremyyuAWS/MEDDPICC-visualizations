import React from 'react';
import AppLayout from '../components/layout/AppLayout';
import UserProfile from '../components/auth/UserProfile';
import { useAuth } from '../context/AuthContext';

const ProfilePage: React.FC = () => {
  const { user } = useAuth();

  return (
    <AppLayout>
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">My Profile</h1>
          <p className="text-gray-600">
            Manage your account settings and preferences
          </p>
        </div>

        <UserProfile />
        
        <div className="mt-8 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Account Information</h2>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium text-gray-700">Email</h3>
              <p className="text-sm text-gray-900">{user?.email}</p>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-gray-700">User ID</h3>
              <p className="text-sm text-gray-900">{user?.id}</p>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-gray-700">Last Sign In</h3>
              <p className="text-sm text-gray-900">
                {user?.last_sign_in_at 
                  ? new Date(user.last_sign_in_at).toLocaleString() 
                  : 'Not available'}
              </p>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-gray-700">Account Created</h3>
              <p className="text-sm text-gray-900">
                {user?.created_at 
                  ? new Date(user.created_at).toLocaleString() 
                  : 'Not available'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default ProfilePage;