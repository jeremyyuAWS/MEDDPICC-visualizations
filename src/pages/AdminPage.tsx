import React from 'react';
import AppLayout from '../components/layout/AppLayout';
import AdminPanel from '../components/admin/AdminPanel';

const AdminPage: React.FC = () => {
  return (
    <AppLayout>
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Admin Panel</h1>
          <p className="text-gray-600">
            Test and debug the Lyzr agent integration
          </p>
        </div>
        
        <AdminPanel />
      </div>
    </AppLayout>
  );
};

export default AdminPage;