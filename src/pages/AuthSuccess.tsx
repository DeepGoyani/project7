import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const AuthSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    const user = urlParams.get('user');

    if (token && user) {
      try {
        const userData = JSON.parse(decodeURIComponent(user));
        
        // Store auth data
        localStorage.setItem('authToken', token);
        localStorage.setItem('user', JSON.stringify(userData));
        
        toast.success(`Welcome back, ${userData.name}!`);
        
        // Add delay to ensure localStorage is set
        setTimeout(() => {
          navigate('/');
        }, 1500);
      } catch (error) {
        console.error('Error parsing user data:', error);
        toast.error('Login failed. Please try again.');
        setTimeout(() => {
          navigate('/login');
        }, 1500);
      }
    } else {
      toast.error('Invalid login response');
      setTimeout(() => {
        navigate('/login');
      }, 1500);
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-foreground mx-auto mb-4"></div>
        <p className="text-lg text-muted-foreground">Completing login...</p>
      </div>
    </div>
  );
};

export default AuthSuccess;
