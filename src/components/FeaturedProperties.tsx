import { useState, useEffect, useRef } from 'react';
import { ArrowRight, Bed, Bath, Maximize, MapPin, Heart, Building, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';
import { useWishlist, WishlistProperty } from '@/contexts/WishlistContext';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import PropertyDetails from './PropertyDetails';

// Updated property data with 5 Hubli locations and Indian Rupee prices
const properties = [
  {
    id: 1,
    title: "Modern Minimalist Villa",
    price: "₹1.25 Cr",
    address: "Vidyanagar, Hubli",
    beds: 4,
    baths: 3,
    sqft: 2800,
    type: "For Sale",
    isNew: true,
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2075&q=80",
  },
  {
    id: 2,
    title: "Luxury Beachfront Condo",
    price: "₹55,000/mo",
    address: "Keshwapur, Hubli",
    beds: 3,
    baths: 2.5,
    sqft: 1950,
    type: "For Rent",
    isNew: false,
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
  },
  {
    id: 3,
    title: "Contemporary City Apartment",
    price: "₹85 L",
    address: "Navanagar, Hubli",
    beds: 2,
    baths: 2,
    sqft: 1200,
    type: "For Sale",
    isNew: true,
    image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
  },
  {
    id: 4,
    title: "Panoramic Mountain Retreat",
    price: "₹3.2 Cr",
    address: "Unkal, Hubli",
    beds: 5,
    baths: 4.5,
    sqft: 3600,
    type: "For Sale",
    isNew: false,
    image: "https://images.unsplash.com/photo-1602343168117-bb8a12d7c180?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2025&q=80",
  },
];

const FeaturedProperties = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [filteredProperties, setFilteredProperties] = useState(properties);
  const [showFiltered, setShowFiltered] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<typeof properties[0] | null>(null);
  const [isPropertyDetailsOpen, setIsPropertyDetailsOpen] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  
  // Search state
  const [selectedType, setSelectedType] = useState('Residential');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedPriceRange, setSelectedPriceRange] = useState('');

  const propertyTypes = ['Residential', 'Commercial', 'Land', 'Luxury'];
  
  const hubliLocations = [
    'Vidyanagar',
    'Keshwapur',
    'Navanagar',
    'Unkal',
    'Gokul Road'
  ];

  const priceRanges = [
    '₹50L - ₹1Cr',
    '₹1Cr - ₹2Cr',
    '₹2Cr - ₹5Cr',
    '₹5Cr - ₹10Cr',
    '₹10Cr+'
  ];

  const isPropertyInPriceRange = (propertyPrice: string, priceRange: string): boolean => {
    const propertyValue = convertPriceToValue(propertyPrice);
    
    // Parse the price range string
    const [minPriceStr, maxPriceStr] = priceRange.split(' - ');
    
    let minValue = 0;
    let maxValue = Number.MAX_VALUE;
    
    // Parse minimum value
    if (minPriceStr.includes('Cr')) {
      minValue = parseFloat(minPriceStr.replace(/[^0-9.]/g, '')) * 100;
    } else if (minPriceStr.includes('L')) {
      minValue = parseFloat(minPriceStr.replace(/[^0-9.]/g, ''));
    }
    
    // Parse maximum value
    if (maxPriceStr.includes('Cr+')) {
      maxValue = Number.MAX_VALUE;
    } else if (maxPriceStr.includes('Cr')) {
      maxValue = parseFloat(maxPriceStr.replace(/[^0-9.]/g, '')) * 100;
    } else if (maxPriceStr.includes('L')) {
      maxValue = parseFloat(maxPriceStr.replace(/[^0-9.]/g, ''));
    }
    
    return propertyValue >= minValue && propertyValue <= maxValue;
  };

  const convertPriceToValue = (priceString: string): number => {
    const cleanPrice = priceString.replace('₹', '').replace('/mo', '');
    
    // Extract the numeric part
    const numericPart = cleanPrice.replace(/[^0-9.]/g, '');
    const value = parseFloat(numericPart);
    
    if (cleanPrice.includes('Cr')) {
      return value * 100;
    } else if (cleanPrice.includes('L')) {
      return value;
    } else {
      // Monthly rent to yearly in lakhs
      return (value * 12) / 100000;
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    let filtered = [...properties];
    
    if (selectedLocation) {
      filtered = filtered.filter(property => 
        property.address.includes(selectedLocation)
      );
    }
    
    if (selectedPriceRange) {
      filtered = filtered.filter(property => 
        isPropertyInPriceRange(property.price, selectedPriceRange)
      );
    }
    
    setFilteredProperties(filtered);
    setShowFiltered(true);
    
    if (filtered.length === 0) {
      toast({
        title: "No properties found",
        description: "Try different filter criteria to see more properties.",
        variant: "destructive",
      });
    }
  };

  const handleResetFilters = () => {
    setSelectedType('Residential');
    setSelectedLocation('');
    setSelectedPriceRange('');
    setFilteredProperties(properties);
    setShowFiltered(false);
  };

  const handlePropertyClick = (property: typeof properties[0]) => {
    setSelectedProperty(property);
    setIsPropertyDetailsOpen(true);
  };

  const { toast } = useToast();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section id="properties" ref={sectionRef} className="section-container">
      <div className={cn(
        "transition-all duration-700 delay-100", 
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      )}>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <Badge className="bg-Nestora-blue/10 text-Nestora-blue hover:bg-Nestora-blue/20 mb-4">
              Featured Properties
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Discover Our Premium Selection</h2>
            <p className="text-gray-600 max-w-2xl">
              Explore our handpicked collection of exclusive properties, designed to meet your highest expectations and lifestyle needs.
            </p>
          </div>
          <div className="mt-6 md:mt-0 flex gap-4">
            <Link to="/properties">
              <Button className="bg-white hover:bg-gray-50 text-Nestora-dark border border-gray-200 rounded-full group hover:text-Nestora-blue">
                View All Properties
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/wishlist">
              <Button className="bg-Nestora-blue hover:bg-Nestora-blue/90 text-white rounded-full group">
                My Wishlist
                <Heart className="ml-2 h-4 w-4 group-hover:scale-110 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Search Section - More compact layout */}
        <div className="glass-panel rounded-2xl max-w-4xl mx-auto mb-12 shadow-subtle">
          <form onSubmit={handleSearch} className="p-6">
            <div className="flex flex-wrap gap-4 mb-6">
              {propertyTypes.map((type) => (
                <button
                  key={type}
                  type="button"
                  className={cn(
                    "px-5 py-2 rounded-full text-sm font-medium transition-all duration-200",
                    selectedType === type 
                      ? "bg-Nestora-blue text-white" 
                      : "bg-gray-100 text-gray-600 hover:bg-Nestora-blue/10 hover:text-Nestora-blue"
                  )}
                  onClick={() => setSelectedType(type)}
                >
                  {type}
                </button>
              ))}
            </div>
            
            <div className="flex flex-col md:flex-row gap-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:flex-1">
                <div className="relative">
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <select 
                      className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-Nestora-blue appearance-none"
                      value={selectedLocation}
                      onChange={(e) => setSelectedLocation(e.target.value)}
                    >
                      <option value="">Any Location</option>
                      {hubliLocations.map((location) => (
                        <option key={location} value={location}>{location}</option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <div className="relative">
                  <div className="relative">
                    <Building className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <select 
                      className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-Nestora-blue appearance-none"
                      value={selectedPriceRange}
                      onChange={(e) => setSelectedPriceRange(e.target.value)}
                    >
                      <option value="">Any Price</option>
                      {priceRanges.map((range) => (
                        <option key={range} value={range}>{range}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              
              <Button 
                type="submit" 
                className="bg-Nestora-blue hover:bg-Nestora-blue/90 text-white rounded-lg h-12"
              >
                <Search className="mr-2 h-4 w-4" />
                Search
              </Button>
            </div>
            
            {showFiltered && (
              <div className="mt-4 flex justify-between items-center">
                <p className="text-sm text-gray-500">
                  {filteredProperties.length === 0 
                    ? "No properties match your search criteria."
                    : `Showing ${filteredProperties.length} properties`
                  }
                </p>
                <Button 
                  type="button" 
                  variant="ghost" 
                  className="text-sm h-8 px-2"
                  onClick={handleResetFilters}
                >
                  Reset Filters
                </Button>
              </div>
            )}
          </form>
        </div>

        {showFiltered ? (
          <div>
            <h3 className="text-2xl font-bold mb-6">Search Results</h3>
            {filteredProperties.length === 0 ? (
              <div className="text-center py-12 bg-gray-50 rounded-xl">
                <h4 className="text-xl font-medium mb-2">No properties found</h4>
                <p className="text-gray-500 mb-6">Try adjusting your search filters to find properties.</p>
                <Button 
                  onClick={handleResetFilters} 
                  className="bg-Nestora-blue hover:bg-Nestora-blue/90"
                >
                  Clear Filters
                </Button>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                {filteredProperties.map((property, index) => (
                  <PropertyCard 
                    key={property.id} 
                    property={property} 
                    isVisible={isVisible}
                    delay={index * 100}
                    onClick={() => handlePropertyClick(property)}
                  />
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {properties.map((property, index) => (
              <PropertyCard 
                key={property.id} 
                property={property} 
                isVisible={isVisible}
                delay={index * 100}
                onClick={() => handlePropertyClick(property)}
              />
            ))}
          </div>
        )}
      </div>

      <PropertyDetails 
        property={selectedProperty}
        isOpen={isPropertyDetailsOpen}
        onClose={() => setIsPropertyDetailsOpen(false)}
      />
    </section>
  );
};

interface PropertyCardProps {
  property: typeof properties[0];
  isVisible: boolean;
  delay: number;
  onClick: () => void;
}

const PropertyCard = ({ property, isVisible, delay, onClick }: PropertyCardProps) => {
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const isFavorite = isInWishlist(property.id);

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click event
    
    if (!isAuthenticated) {
      toast({
        title: "Authentication required",
        description: "Please log in to add properties to your wishlist",
        variant: "destructive",
      });
      navigate('/login');
      return;
    }
    
    if (isFavorite) {
      removeFromWishlist(property.id);
      toast({
        title: "Removed from wishlist",
        description: `${property.title} has been removed from your wishlist.`
      });
    } else {
      addToWishlist(property as WishlistProperty);
      toast({
        title: "Added to wishlist",
        description: `${property.title} has been added to your wishlist.`
      });
    }
  };

  return (
    <div 
      className={cn(
        "property-card bg-white rounded-xl overflow-hidden border border-gray-100 shadow-subtle transition-all duration-700 cursor-pointer hover:shadow-md",
        isVisible 
          ? "opacity-100 translate-y-0" 
          : "opacity-0 translate-y-10"
      )}
      style={{ transitionDelay: `${delay}ms` }}
      onClick={onClick}
    >
      {/* Image container */}
      <div className="relative img-hover-zoom h-64">
        <img 
          src={property.image} 
          alt={property.title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 left-4 flex gap-2">
          <Badge className={cn(
            "text-xs font-semibold px-3 py-1",
            property.type === "For Sale" 
              ? "bg-Nestora-blue text-white" 
              : "bg-purple-500 text-white"
          )}>
            {property.type}
          </Badge>
          {property.isNew && (
            <Badge className="bg-green-500 text-white text-xs font-semibold px-3 py-1">
              New
            </Badge>
          )}
        </div>
        <button 
          className={cn(
            "absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center transition-colors",
            isFavorite 
              ? "bg-red-500 text-white" 
              : "bg-white text-gray-600 hover:bg-gray-100"
          )}
          onClick={handleToggleWishlist}
        >
          <Heart className="h-4 w-4" fill={isFavorite ? "currentColor" : "none"} />
        </button>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="mb-2">
          <h3 className="text-lg font-bold text-Nestora-dark mb-1">{property.title}</h3>
          <div className="flex items-center text-gray-500 text-sm">
            <MapPin className="h-3.5 w-3.5 mr-1" />
            <span>{property.address}</span>
          </div>
        </div>

        <div className="flex justify-between items-center mb-4">
          <div className="text-Nestora-blue font-bold text-xl">{property.price}</div>
        </div>

        <div className="border-t border-gray-100 pt-4 flex justify-between">
          <div className="flex items-center text-gray-500 text-sm">
            <Bed className="h-4 w-4 mr-1" />
            <span>{property.beds} Beds</span>
          </div>
          <div className="flex items-center text-gray-500 text-sm">
            <Bath className="h-4 w-4 mr-1" />
            <span>{property.baths} Baths</span>
          </div>
          <div className="flex items-center text-gray-500 text-sm">
            <Maximize className="h-4 w-4 mr-1" />
            <span>{property.sqft} sqft</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedProperties;