import { useState, useEffect } from 'react';
import { ArrowLeft, Bed, Bath, Maximize, MapPin, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Link, useLocation } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const allProperties = [
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
  {
    id: 5,
    title: "Coastal Luxury Mansion",
    price: "₹4.5 Cr",
    address: "Gokul Road, Hubli",
    beds: 6,
    baths: 5,
    sqft: 4200,
    type: "For Sale",
    isNew: true,
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
  },
  {
    id: 6,
    title: "Downtown Loft Apartment",
    price: "₹38,000/mo",
    address: "Vidyanagar, Hubli",
    beds: 2,
    baths: 2,
    sqft: 1800,
    type: "For Rent",
    isNew: false,
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
  },
  {
    id: 7,
    title: "Countryside Farmhouse",
    price: "₹95 L",
    address: "Keshwapur, Hubli",
    beds: 4,
    baths: 3,
    sqft: 2500,
    type: "For Sale",
    isNew: false,
    image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
  },
  {
    id: 8,
    title: "Urban Penthouse Suite",
    price: "₹75,000/mo",
    address: "Navanagar, Hubli",
    beds: 3,
    baths: 3.5,
    sqft: 2200,
    type: "For Rent",
    isNew: true,
    image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
  },
  {
    id: 9,
    title: "Historic Brick Townhouse",
    price: "₹1.75 Cr",
    address: "Unkal, Hubli",
    beds: 4,
    baths: 3,
    sqft: 2400,
    type: "For Sale",
    isNew: false,
    image: "https://images.unsplash.com/photo-1605146769289-440113cc3d00?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
  },
  {
    id: 10,
    title: "Lakefront Cottage",
    price: "₹98 L",
    address: "Gokul Road, Hubli",
    beds: 3,
    baths: 2,
    sqft: 1750,
    type: "For Sale",
    isNew: true,
    image: "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
  },
];

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
  
  console.log(`Property: ${propertyPrice} (${propertyValue}L) | Range: ${minValue}L - ${maxValue === Number.MAX_VALUE ? 'MAX' : maxValue + 'L'} | Match: ${propertyValue >= minValue && propertyValue <= maxValue}`);
  
  return propertyValue >= minValue && propertyValue <= maxValue;
};

const AllProperties = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [filteredProperties, setFilteredProperties] = useState(allProperties);
  const location = useLocation();
  const { toast } = useToast();
  
  useEffect(() => {
    setIsVisible(true);
    window.scrollTo(0, 0);
    
    const params = new URLSearchParams(location.search);
    const locationFilter = params.get('location');
    const priceFilter = params.get('price');
    
    console.log("Filtering with:", { locationFilter, priceFilter });
    
    let filtered = [...allProperties];
    
    if (locationFilter) {
      filtered = filtered.filter(property => 
        property.address.includes(locationFilter)
      );
      console.log("After location filter:", filtered.length, "properties");
    }
    
    if (priceFilter) {
      filtered = filtered.filter(property => 
        isPropertyInPriceRange(property.price, priceFilter)
      );
      console.log("After price filter:", filtered.length, "properties");
    }
    
    setFilteredProperties(filtered);
    
    if (filtered.length === 0 && (locationFilter || priceFilter)) {
      toast({
        title: "No properties found",
        description: "Try different filter criteria to see more properties.",
        variant: "destructive",
      });
    }
  }, [location.search, toast]);

  return (
    <div className="min-h-screen bg-white">
      <div className="pt-24 pb-16 px-6 md:px-12 max-w-7xl mx-auto">
        <div className={cn(
          "transition-all duration-700 delay-100", 
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        )}>
          <div className="mb-8">
            <Link to="/">
              <Button variant="ghost" className="pl-0 hover:bg-gray-50 hover:text-Nestora-blue mb-4">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Button>
            </Link>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Properties</h1>

            {/* Filter information */}
            {location.search && (
              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <h2 className="font-medium mb-2">Applied Filters:</h2>
                <div className="flex flex-wrap gap-2">
                  {new URLSearchParams(location.search).get('location') && (
                    <Badge variant="outline" className="bg-gray-100">
                      Location: {new URLSearchParams(location.search).get('location')}
                    </Badge>
                  )}
                  {new URLSearchParams(location.search).get('price') && (
                    <Badge variant="outline" className="bg-gray-100">
                      Price: {new URLSearchParams(location.search).get('price')}
                    </Badge>
                  )}
                </div>
              </div>
            )}

            <p className="text-gray-600 max-w-2xl">
              {filteredProperties.length === 0
                ? "No properties match your search criteria. Please try different filters."
                : `Showing ${filteredProperties.length} properties that match your criteria.`
              }
            </p>
          </div>
          
          {filteredProperties.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-xl font-medium mb-4">No properties found</h3>
              <p className="text-gray-500 mb-6">Try adjusting your search filters to find properties.</p>
              <Link to="/">
                <Button className="bg-Nestora-blue hover:bg-Nestora-blue/90">
                  Return to Home
                </Button>
              </Link>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {filteredProperties.map((property, index) => (
                <PropertyCard 
                  key={property.id} 
                  property={property} 
                  isVisible={isVisible}
                  delay={index * 100}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

interface PropertyCardProps {
  property: typeof allProperties[0];
  isVisible: boolean;
  delay: number;
}

const PropertyCard = ({ property, isVisible, delay }: PropertyCardProps) => {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <div 
      className={cn(
        "property-card bg-white rounded-xl overflow-hidden border border-gray-100 shadow-subtle transition-all duration-700",
        isVisible 
          ? "opacity-100 translate-y-0" 
          : "opacity-0 translate-y-10"
      )}
      style={{ transitionDelay: `₹{delay}ms` }}
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
          onClick={() => setIsFavorite(!isFavorite)}
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

export default AllProperties;
