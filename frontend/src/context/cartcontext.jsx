import { createContext, useContext, useState, useEffect } from "react";
import axios from "../api/axios";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {

  const [loading, setLoading] = useState(true);

  

  
  return (
    <CartContext.Provider
      value={{  loading }}
    >
      {children}
    </CartContext.Provider>
  );
};

// ✅ Custom hook to use CartContext
export const useCart = () => {
  return useContext(CartContext);
};
