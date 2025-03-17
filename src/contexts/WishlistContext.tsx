import React, { createContext, useContext, useState, useEffect } from 'react';

// Property type for wishlist items
export type WishlistProperty = {
  id: number;
  title: string;
  price: string;
  address: string;
  beds: number;
  baths: number;
  sqft: number;
  type: string;
  isNew: boolean;
  image: string;
};

type WishlistContextType = {
  wishlist: WishlistProperty[];
  addToWishlist: (property: WishlistProperty) => void;
  removeFromWishlist: (propertyId: number) => void;
  isInWishlist: (propertyId: number) => boolean;
};

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider = ({ children }: { children: React.ReactNode }) => {
  // Initialize state from localStorage if available
  const [wishlist, setWishlist] = useState<WishlistProperty[]>(() => {
    const savedWishlist = localStorage.getItem('wishlist');
    return savedWishlist ? JSON.parse(savedWishlist) : [];
  });

  // Save to localStorage whenever wishlist changes
  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const addToWishlist = (property: WishlistProperty) => {
    setWishlist(prev => {
      // Only add if not already in wishlist
      if (!prev.some(item => item.id === property.id)) {
        return [...prev, property];
      }
      return prev;
    });
  };

  const removeFromWishlist = (propertyId: number) => {
    setWishlist(prev => prev.filter(property => property.id !== propertyId));
  };

  const isInWishlist = (propertyId: number) => {
    return wishlist.some(property => property.id === propertyId);
  };

  return (
    <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist, isInWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};