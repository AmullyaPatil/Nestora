import React, { useState, useEffect } from 'react';
import {  ChevronDown, Menu,   X,   Home,MapPin,Heart,LogIn,UserPlus,LogOut} from 'lucide-react';
import {NavigationMenu,NavigationMenuContent,NavigationMenuItem,NavigationMenuLink,NavigationMenuList,NavigationMenuTrigger,} from "@/components/ui/navigation-menu";
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useIsMobile } from '@/hooks/use-mobile';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isAuthenticated, logout, user } = useAuth();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const location = useLocation();
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  useEffect(() => {
    // Close mobile menu when route changes
    setIsMobileMenuOpen(false);
  }, [location.pathname]);
  
  const handleLogout = () => {
    logout();
    navigate('/');
  };
  
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  
  const navLinkClass = "text-sm font-medium transition-colors hover:text-primary";
  
  return (
    <header className={cn(
      "fixed w-full top-0 z-50 transition-all duration-300 bg-white shadow-sm",
      isScrolled ? "py-3 shadow-md" : "py-4"
    )}>
      <div className="container flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <div className="text-2xl font-bold text-Nestora-blue">
            <span className="font-black">Estate</span>Mate
          </div>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-8">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link to="/" className={navLinkClass}>
                  Home
                </Link>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent">Properties</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    <li className="row-span-3">
                      <NavigationMenuLink asChild>
                        <Link
                          to="/properties"
                          className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-Nestora-blue/20 to-Nestora-blue/60 p-6 no-underline outline-none focus:shadow-md"
                        >
                          <div className="mt-4 mb-2 text-lg font-medium text-white">
                            View All Properties
                          </div>
                          <p className="text-sm leading-tight text-white/90">
                            Browse through our extensive collection of premium properties across various locations.
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <Link to="/properties?type=Residential" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                        <div className="text-sm font-medium leading-none">Residential</div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          Houses, apartments, and villas for families
                        </p>
                      </Link>
                    </li>
                    <li>
                      <Link to="/properties?type=Commercial" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                        <div className="text-sm font-medium leading-none">Commercial</div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          Office spaces and retail properties
                        </p>
                      </Link>
                    </li>
                    <li>
                      <Link to="/properties?type=Luxury" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                        <div className="text-sm font-medium leading-none">Luxury</div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          High-end properties with premium amenities
                        </p>
                      </Link>
                    </li>
                    <li>
                      <Link to="/properties?type=Land" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                        <div className="text-sm font-medium leading-none">Land</div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          Plots and land for development
                        </p>
                      </Link>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <Link to="/localities" className={navLinkClass}>
                  Localities
                </Link>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <a href="#testimonials" className={navLinkClass}>
                  Testimonials
                </a>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <a href="#contact" className={navLinkClass}>
                  Contact
                </a>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          
          <div className="flex items-center space-x-3">
            {isAuthenticated ? (
              <>
                <Button 
                  variant="ghost" 
                  className="flex items-center" 
                  onClick={() => navigate('/wishlist')}
                >
                  <Heart className="mr-2 h-4 w-4" />
                  <span>Wishlist</span>
                </Button>
                <Button 
                  variant="outline" 
                  className="flex items-center" 
                  onClick={handleLogout}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Logout</span>
                </Button>
              </>
            ) : (
              <>
                <Button 
                  variant="ghost" 
                  className="flex items-center" 
                  onClick={() => navigate('/login')}
                >
                  <LogIn className="mr-2 h-4 w-4" />
                  <span>Login</span>
                </Button>
                <Button 
                  className="bg-Nestora-blue hover:bg-Nestora-blue/90" 
                  onClick={() => navigate('/register')}
                >
                  <UserPlus className="mr-2 h-4 w-4" />
                  <span>Register</span>
                </Button>
              </>
            )}
          </div>
        </nav>
        
        {/* Mobile Menu Button */}
        <Button 
          variant="ghost" 
          size="icon" 
          className="lg:hidden"
          onClick={toggleMobileMenu}
        >
          <Menu className="h-6 w-6" />
        </Button>
        
        {/* Mobile Menu */}
        <div className={cn(
          "fixed inset-y-0 right-0 w-full bg-white shadow-xl transform transition-transform duration-300 ease-in-out z-50 lg:hidden overflow-auto",
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        )}>
          <div className="p-6">
            <div className="flex justify-between items-center mb-8">
              <div className="text-2xl font-bold text-Nestora-blue">
                <span className="font-black">Estate</span>Mate
              </div>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={toggleMobileMenu}
              >
                <X className="h-6 w-6" />
              </Button>
            </div>
            
            <nav className="space-y-6">
              <div className="space-y-3">
                <Link 
                  to="/" 
                  className="flex items-center text-base font-medium py-2"
                  onClick={toggleMobileMenu}
                >
                  <Home className="mr-3 h-5 w-5" />
                  Home
                </Link>
                
                <div className="border-t border-gray-100 pt-3">
                  <p className="text-sm font-semibold text-gray-500 mb-3">Properties</p>
                  <div className="space-y-3 pl-8">
                    <Link 
                      to="/properties" 
                      className="block text-base font-medium py-1"
                      onClick={toggleMobileMenu}
                    >
                      All Properties
                    </Link>
                    <Link 
                      to="/properties?type=Residential" 
                      className="block text-base font-medium py-1"
                      onClick={toggleMobileMenu}
                    >
                      Residential
                    </Link>
                    <Link 
                      to="/properties?type=Commercial" 
                      className="block text-base font-medium py-1"
                      onClick={toggleMobileMenu}
                    >
                      Commercial
                    </Link>
                    <Link 
                      to="/properties?type=Luxury" 
                      className="block text-base font-medium py-1"
                      onClick={toggleMobileMenu}
                    >
                      Luxury
                    </Link>
                    <Link 
                      to="/properties?type=Land" 
                      className="block text-base font-medium py-1"
                      onClick={toggleMobileMenu}
                    >
                      Land
                    </Link>
                  </div>
                </div>
                
                <Link 
                  to="/localities" 
                  className="flex items-center text-base font-medium py-2"
                  onClick={toggleMobileMenu}
                >
                  <MapPin className="mr-3 h-5 w-5" />
                  Localities
                </Link>
                
                <a 
                  href="#testimonials" 
                  className="flex items-center text-base font-medium py-2"
                  onClick={toggleMobileMenu}
                >
                  Testimonials
                </a>
                
                <a 
                  href="#contact" 
                  className="flex items-center text-base font-medium py-2"
                  onClick={toggleMobileMenu}
                >
                  Contact
                </a>
              </div>
              
              <div className="border-t border-gray-100 pt-4 space-y-3">
                {isAuthenticated ? (
                  <>
                    <Link 
                      to="/wishlist" 
                      className="flex items-center text-base font-medium py-2"
                      onClick={toggleMobileMenu}
                    >
                      <Heart className="mr-3 h-5 w-5" />
                      My Wishlist
                    </Link>
                    <Button 
                      variant="outline" 
                      className="w-full justify-start" 
                      onClick={() => {
                        handleLogout();
                        toggleMobileMenu();
                      }}
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Logout</span>
                    </Button>
                  </>
                ) : (
                  <>
                    <Button 
                      variant="outline" 
                      className="w-full justify-start" 
                      onClick={() => {
                        navigate('/login');
                        toggleMobileMenu();
                      }}
                    >
                      <LogIn className="mr-2 h-4 w-4" />
                      <span>Login</span>
                    </Button>
                    <Button 
                      className="w-full justify-start bg-Nestora-blue hover:bg-Nestora-blue/90" 
                      onClick={() => {
                        navigate('/register');
                        toggleMobileMenu();
                      }}
                    >
                      <UserPlus className="mr-2 h-4 w-4" />
                      <span>Register</span>
                    </Button>
                  </>
                )}
              </div>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;