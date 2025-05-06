import React, { useState } from 'react';
import { Brain, Menu, X, User, Settings, BarChart } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

interface HeaderProps {
  onNavigate?: (route: string) => void;
  currentRoute?: string;
}

const Header: React.FC<HeaderProps> = ({ onNavigate, currentRoute = 'main' }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, signOut } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavigation = (route: string) => {
    if (onNavigate) {
      onNavigate(route);
      setIsMenuOpen(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <header className="bg-white border-b border-gray-200 py-4">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <Brain className="h-8 w-8 text-black" />
          <div>
            <h1 className="text-xl font-bold text-black">MEDDPICC Qualification Agent</h1>
            <p className="text-sm text-gray-600">AI-powered opportunity qualification</p>
          </div>
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <Link 
            to="/"
            className={`text-sm ${location.pathname === '/' ? 'text-black font-medium' : 'text-gray-700 hover:text-black'}`}
          >
            Dashboard
          </Link>
          <Link 
            to="/visualization"
            className={`text-sm ${location.pathname === '/visualization' ? 'text-black font-medium' : 'text-gray-700 hover:text-black'}`}
          >
            Visualization
          </Link>
          <Link 
            to="/admin"
            className={`text-sm ${location.pathname === '/admin' ? 'text-black font-medium' : 'text-gray-700 hover:text-black'}`}
          >
            Admin Panel
          </Link>
          
          {user ? (
            <div className="relative group">
              <button className="flex items-center space-x-1 bg-gray-100 rounded-full px-3 py-1 hover:bg-gray-200 transition-colors">
                <User className="h-4 w-4 text-gray-700" />
                <span className="text-sm text-gray-700">{user.email?.split('@')[0]}</span>
              </button>
              
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 invisible group-hover:visible transition-all z-10">
                <Link 
                  to="/profile" 
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-2" />
                    Profile
                  </div>
                </Link>
                <Link 
                  to="/admin" 
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  <div className="flex items-center">
                    <Settings className="h-4 w-4 mr-2" />
                    Admin Panel
                  </div>
                </Link>
                <div className="border-t border-gray-100"></div>
                <button 
                  onClick={handleSignOut}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Sign Out
                </button>
              </div>
            </div>
          ) : (
            <Link 
              to="/login"
              className="bg-black text-white px-4 py-2 rounded-md text-sm hover:bg-gray-800 transition-colors"
            >
              Sign In
            </Link>
          )}
        </div>
        
        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-gray-700 hover:text-black"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden pt-2 pb-4 px-4 border-t border-gray-100">
          <div className="flex flex-col space-y-3">
            <Link 
              to="/"
              className={`text-sm py-2 ${location.pathname === '/' ? 'text-black font-medium' : 'text-gray-700'}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Dashboard
            </Link>
            <Link 
              to="/visualization"
              className={`text-sm py-2 ${location.pathname === '/visualization' ? 'text-black font-medium' : 'text-gray-700'}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Visualization
            </Link>
            <Link 
              to="/admin"
              className={`text-sm py-2 ${location.pathname === '/admin' ? 'text-black font-medium' : 'text-gray-700'}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Admin Panel
            </Link>
            
            {user ? (
              <>
                <Link 
                  to="/profile"
                  className="text-sm py-2 text-gray-700"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Profile
                </Link>
                <button 
                  onClick={() => {
                    handleSignOut();
                    setIsMenuOpen(false);
                  }}
                  className="text-sm py-2 text-gray-700 text-left"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <Link 
                to="/login"
                className="bg-black text-white px-4 py-2 rounded-md text-sm hover:bg-gray-800 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;