import React, { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';

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
// Cookie name for storing wishlist data
const WISHLIST_COOKIE_NAME = 'real_estate_wishlist';
// Cookie expiration in days (e.g., 30 days)
const COOKIE_EXPIRATION_DAYS = 30;

export const WishlistProvider = ({ children }: { children: React.ReactNode }) => {
  // Initialize state from cookies if available
  const [wishlist, setWishlist] = useState<WishlistProperty[]>(() => {
    const savedWishlist = Cookies.get(WISHLIST_COOKIE_NAME);
    try {
      return savedWishlist ? JSON.parse(savedWishlist) : [];
    } catch (error) {
      console.error('Error parsing wishlist cookie:', error);
      return [];
    }
  });

  // Save to cookies whenever wishlist changes
  useEffect(() => {
    try {
      Cookies.set(WISHLIST_COOKIE_NAME, JSON.stringify(wishlist), { 
        expires: COOKIE_EXPIRATION_DAYS,
        sameSite: 'strict',
        secure: window.location.protocol === 'https:'
      });
    } catch (error) {
      console.error('Error saving wishlist to cookie:', error);
    }
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