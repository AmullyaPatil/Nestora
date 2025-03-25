import { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, User, Heart, LogOut } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const scrollToSection = (sectionId: string) => {
    closeMenu();
    if (window.location.pathname !== '/') {
      navigate('/');
      // Add a delay to allow navigation to complete before scrolling
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleUserMenuToggle = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  const handleLogout = () => {
    setIsUserMenuOpen(false);
    logout();
  };

  return (
    <header 
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out px-6 md:px-12',
        isScrolled 
          ? 'py-4 bg-white bg-opacity-90 backdrop-blur-md shadow-subtle' 
          : 'py-6 bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <a href="/" className="flex items-center">
          <span className="text-2xl font-display font-bold text-Nestora-dark">
            Nestora<span className="text-Nestora-blue">Hub</span>
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          <NavItem href="#hero" label="Home" onClick={() => scrollToSection('hero')} />
          <NavItem href="#services" label="Services" onClick={() => scrollToSection('services')} />
          <NavItem href="#properties" label="Properties" onClick={() => scrollToSection('properties')} />
          <NavItem href="#localities" label="Localities" onClick={() => scrollToSection('localities')} />
          <NavItem href="#testimonials" label="Testimonials" onClick={() => scrollToSection('testimonials')} />
          <NavItem href="#contact" label="Contact Us" onClick={() => scrollToSection('contact')} />
        </nav>

         {/* Auth Buttons (Desktop) */}
         <div className="hidden md:flex items-center gap-4">
          {isAuthenticated ? (
            <div className="relative">
              <Button 
                variant="ghost" 
                className="flex items-center gap-2"
                onClick={handleUserMenuToggle}
              >
                <User size={18} />
                <span className="font-medium">{user?.name?.split(' ')[0]}</span>
                <ChevronDown size={16} className={`transition-transform ${isUserMenuOpen ? 'rotate-180' : ''}`} />
              </Button>
              
              {/* User dropdown menu */}
              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-md py-1 z-50">
                  <Link 
                    to="/wishlist"
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setIsUserMenuOpen(false)}
                  >
                    <Heart className="mr-2 h-4 w-4" />
                    My Wishlist
                  </Link>
                  <button 
                    className="w-full flex items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                    onClick={handleLogout}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link to="/login">
                <Button variant="ghost" className="hover:bg-Nestora-blue/10 hover:text-Nestora-blue">
                  Sign In
                </Button>
              </Link>
              <Link to="/register">
                <Button className="bg-Nestora-blue hover:bg-Nestora-blue/90 text-white rounded-full px-6">
                  Register
                </Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-Nestora-dark p-2 focus:outline-none" 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      <div 
        className={cn(
          "fixed inset-0 bg-white z-40 flex flex-col pt-20 px-6 transition-transform duration-300 ease-in-out transform md:hidden",
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <button 
          className="absolute top-6 right-6 text-Nestora-dark p-2 focus:outline-none" 
          onClick={closeMenu}
          aria-label="Close menu"
        >
          <X size={24} />
        </button>
        
        <nav className="flex flex-col space-y-4">
          <MobileNavItem href="#hero" label="Home" onClick={() => scrollToSection('hero')} />
          <MobileNavItem href="#services" label="Services" onClick={() => scrollToSection('services')} />
          <MobileNavItem href="#properties" label="Properties" onClick={() => scrollToSection('properties')} />
          <MobileNavItem href="#localities" label="Localities" onClick={() => scrollToSection('localities')} />
          <MobileNavItem href="#testimonials" label="Testimonials" onClick={() => scrollToSection('testimonials')} />
          <MobileNavItem href="#contact" label="Contact Us" onClick={() => scrollToSection('contact')} />
                  
          {isAuthenticated ? (
            <>
              <div className="border-t border-gray-100 my-4 pt-4">
                <MobileNavItem href="/wishlist" label="My Wishlist" onClick={() => {
                  closeMenu();
                  navigate('/wishlist');
                }} />
                <button 
                  className="w-full flex items-center py-3 text-lg font-medium text-red-600"
                  onClick={() => {
                    closeMenu();
                    logout();
                  }}
                >
                  <LogOut className="mr-2 h-5 w-5" />
                  Sign Out
                </button>
              </div>
            </>
          ) : (
            <div className="border-t border-gray-100 my-4 pt-4">
              <MobileNavItem href="/login" label="Sign In" onClick={() => {
                closeMenu();
                navigate('/login');
              }} />
              <MobileNavItem href="/register" label="Register" onClick={() => {
                closeMenu();
                navigate('/register');
              }} />
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

// Desktop Nav Item
const NavItem = ({ href, label, onClick }: { href: string; label: string; onClick: () => void }) => {
  return (
    <a 
      href={href}
      className="relative px-4 py-2 text-Nestora-dark hover:text-Nestora-blue font-medium text-sm transition-colors duration-200"
      onClick={(e) => {
        e.preventDefault();
        onClick();
      }}
    >
      {label}
    </a>
  );
};

// Mobile Nav Item
const MobileNavItem = ({ href, label, onClick }: { href: string; label: string, onClick: () => void }) => {
  return (
    <a 
      href={href}
      className="py-3 text-lg font-medium text-Nestora-dark border-b border-gray-100"
      onClick={(e) => {
        e.preventDefault();
        onClick();
      }}
    >
      {label}
    </a>
  );
};

export default Header;
