import { useState, useEffect } from 'react';
import { Menu, X, User, LogIn, Briefcase } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    const checkAuth = () => {
      const token = localStorage.getItem('authToken');
      const adminToken = localStorage.getItem('adminToken');
      setIsLoggedIn(!!token);
      setIsAdmin(!!adminToken);
    };

    window.addEventListener('scroll', handleScroll);
    checkAuth();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    navigate('/');
  };

  const handleAdminLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    setIsAdmin(false);
    navigate('/');
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-background/80 backdrop-blur-md border-b border-border'
          : 'bg-transparent'
      }`}
    >
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="text-2xl font-black uppercase tracking-tighter">
            AGENCY
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <a
              href="#services"
              className="text-sm font-medium uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors"
            >
              Services
            </a>
            <a
              href="#work"
              className="text-sm font-medium uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors"
            >
              Work
            </a>
            <a
              href="#team"
              className="text-sm font-medium uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors"
            >
              Team
            </a>
            <a
              href="#contact"
              className="text-sm font-medium uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors"
            >
              Contact
            </a>
            
            {isAdmin ? (
              <button
                onClick={() => navigate('/admin/dashboard')}
                className="flex items-center gap-2 px-4 py-2 text-xs font-medium uppercase tracking-wider bg-foreground text-background rounded-lg hover:bg-muted hover:text-foreground transition-all"
              >
                <Briefcase className="w-3 h-3" />
                Admin Panel
              </button>
            ) : isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 text-xs font-medium uppercase tracking-wider border border-border rounded-lg hover:bg-foreground hover:text-background transition-all"
              >
                <LogIn className="w-3 h-3" />
                Logout
              </button>
            ) : (
              <button
                onClick={() => navigate('/admin/login')}
                className="flex items-center gap-2 px-4 py-2 text-xs font-medium uppercase tracking-wider border border-border rounded-lg hover:bg-foreground hover:text-background transition-all"
              >
                <User className="w-3 h-3" />
                Admin Login
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-border">
            <div className="flex flex-col gap-4 mt-4">
              <a
                href="#services"
                className="text-sm font-medium uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Services
              </a>
              <a
                href="#work"
                className="text-sm font-medium uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Work
              </a>
              <a
                href="#team"
                className="text-sm font-medium uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Team
              </a>
              <a
                href="#contact"
                className="text-sm font-medium uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Contact
              </a>
              
              {isAdmin ? (
                <button
                  onClick={() => {
                    navigate('/admin/dashboard');
                    setIsOpen(false);
                  }}
                  className="flex items-center gap-2 px-4 py-2 text-xs font-medium uppercase tracking-wider bg-foreground text-background rounded-lg hover:bg-muted hover:text-foreground transition-all"
                >
                  <Briefcase className="w-3 h-3" />
                  Admin Panel
                </button>
              ) : isLoggedIn ? (
                <button
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                  className="flex items-center gap-2 px-4 py-2 text-xs font-medium uppercase tracking-wider border border-border rounded-lg hover:bg-foreground hover:text-background transition-all"
                >
                  <LogIn className="w-3 h-3" />
                  Logout
                </button>
              ) : (
                <button
                  onClick={() => {
                    navigate('/admin/login');
                    setIsOpen(false);
                  }}
                  className="flex items-center gap-2 px-4 py-2 text-xs font-medium uppercase tracking-wider border border-border rounded-lg hover:bg-foreground hover:text-background transition-all"
                >
                  <User className="w-3 h-3" />
                  Admin Login
                </button>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
