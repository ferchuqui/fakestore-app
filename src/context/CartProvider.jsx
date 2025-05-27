import { useState } from 'react';
import { CartContext } from './CartContext';

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart(prevCart => {
      const existing = prevCart.find(p => p.id === product.id);
      if (existing) {
        return prevCart.map(p =>
          p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (id) => {
    setCart(prevCart => {
      return prevCart
        .map(p => (p.id === id ? { ...p, quantity: p.quantity - 1 } : p))
        .filter(p => p.quantity > 0);
    });
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}
