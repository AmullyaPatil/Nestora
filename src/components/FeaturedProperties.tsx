
import { useState, useEffect, useRef } from 'react';
import { ArrowRight, Bed, Bath, Maximize, MapPin, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

// Property data
const properties = [
  {
    id: 1,
    title: "Neelgund Developers LLP",
    price: "₹12,550,000",
    address: "Renuka Nagar, Hubli",
    beds: 4,
    baths: 3,
    sqft: 2800,
    type: "For Sale",
    isNew: true,
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2075&q=80",
  },
  {
    id: 2,
    title: "Millenium Properties",
    price: "₹25,500/mo",
    address: "Bairidevarkoppa, Hubli",
    beds: 3,
    baths: 2.5,
    sqft: 1950,
    type: "For Rent",
    isNew: false,
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
  },
  {
    id: 3,
    title: "SkyTown Builders",
    price: "₹100,500,000",
    address: "Keshwapur, Hubli",
    beds: 2,
    baths: 2,
    sqft: 1200,
    type: "For Sale",
    isNew: true,
    image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
  },
  {
    id: 4,
    title: "Marvel Properties",
    price: "₹100,000,000",
    address: "Navanagar, Hubli",
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
  const sectionRef = useRef<HTMLDivElement>(null);

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
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
          <div>
            <Badge className="bg-estate-blue/10 text-estate-blue hover:bg-estate-blue/20 mb-4">
              Featured Properties
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Discover Our Premium Selection</h2>
            <p className="text-gray-600 max-w-2xl">
              Explore our handpicked collection of exclusive properties, designed to meet your highest expectations and lifestyle needs.
            </p>
          </div>
          <div className="mt-6 md:mt-0">
            <Link to="/properties">
              <Button className="bg-white hover:bg-gray-50 text-estate-dark border border-gray-200 rounded-full group hover:text-estate-blue">
                View All Properties
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {properties.map((property, index) => (
            <PropertyCard 
              key={property.id} 
              property={property} 
              isVisible={isVisible}
              delay={index * 100}
            />
          ))}
        </div>
      </div>
    </section>
  );
};


interface PropertyCardProps {
  property: typeof properties[0];
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

export default FeaturedProperties;
