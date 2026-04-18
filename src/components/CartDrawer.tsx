'use client';

import { useCart } from '@/context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

export default function CartDrawer() {
  const { items, isCartOpen, setIsCartOpen, removeFromCart, cartTotal, clearCart } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', address: '' });
  const [loading, setLoading] = useState(false);

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName: formData.name,
          customerEmail: formData.email,
          shippingAddress: formData.address,
          items: JSON.stringify(items),
          totalPrice: cartTotal
        }),
      });
      if (res.ok) {
        alert("Order placed successfully!");
        clearCart();
        setIsCheckingOut(false);
        setIsCartOpen(false);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]" 
          />
          <motion.div 
            initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.4 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-[#050505] border-l border-white/10 z-[70] shadow-2xl flex flex-col"
          >
            <div className="p-6 border-b border-white/10 flex justify-between items-center">
              <h2 className="text-xl font-bold tracking-widest text-white uppercase">Your Cart</h2>
              <button onClick={() => setIsCartOpen(false)} className="text-white/50 hover:text-white uppercase text-xs tracking-widest">Close</button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
              {items.length === 0 ? (
                <div className="text-white/40 text-center mt-12">Your cart is empty.</div>
              ) : (
                items.map((item, idx) => (
                  <div key={`${item.id}-${idx}`} className="flex gap-4 items-center">
                    <img src={item.image} alt={item.name} className="w-16 h-20 object-cover rounded-md bg-white/5" />
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-white">{item.name}</h4>
                      <p className="text-white/50 text-xs mt-1">{item.price} x {item.quantity}</p>
                    </div>
                    <button onClick={() => removeFromCart(item.id)} className="text-xs text-white/40 hover:text-red-400 uppercase">Remove</button>
                  </div>
                ))
              )}

              {isCheckingOut && items.length > 0 && (
                <form onSubmit={handleCheckout} className="mt-8 space-y-4 border-t border-white/10 pt-8">
                  <h3 className="text-sm uppercase tracking-widest text-white/80 mb-4">Shipping Details</h3>
                  <input required placeholder="Full Name" className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white text-sm" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                  <input required type="email" placeholder="Email Address" className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white text-sm" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                  <input required placeholder="Shipping Address" className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white text-sm" value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} />
                  <button disabled={loading} type="submit" className="w-full py-4 bg-white text-[#050505] font-medium tracking-widest text-sm uppercase rounded-xl hover:bg-white/90 transition-colors mt-4 disabled:opacity-50">
                    {loading ? 'Processing...' : 'Confirm Order'}
                  </button>
                </form>
              )}
            </div>

            {items.length > 0 && !isCheckingOut && (
              <div className="p-6 border-t border-white/10 bg-black/50">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-white/60 uppercase tracking-widest text-sm">Total</span>
                  <span className="text-white font-bold text-lg">${cartTotal.toFixed(2)}</span>
                </div>
                <button onClick={() => setIsCheckingOut(true)} className="w-full py-4 bg-white text-[#050505] font-medium tracking-widest text-sm uppercase rounded-xl hover:bg-white/90 transition-colors">
                  Checkout
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
