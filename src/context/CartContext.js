// CartContext.js
import React, { createContext, useState } from 'react';
import { LinkedList } from '../components/LinkedList';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(new LinkedList());


  return (
    <CartContext.Provider value={[cartItems, setCartItems,]}>
      {children}
    </CartContext.Provider>
  );
};