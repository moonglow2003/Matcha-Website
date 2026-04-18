'use client';

import { useCart } from '@/context/CartContext';

const products = [
  {
    id: 1,
    name: "Ceremonial Grade Matcha",
    price: "$45",
    description: "First harvest leaves, granite milled. Our signature blend.",
    image: "/ceremonial-matcha.jpg"
  },
  {
    id: 2,
    name: "Artisan Bamboo Whisk",
    price: "$28",
    description: "Hand-carved from a single piece of winter-hardened bamboo.",
    image: "/bamboo-whisk.jpg"
  },
  {
    id: 3,
    name: "Handcrafted Chawan",
    price: "$65",
    description: "Traditional ceramic bowl, perfect for preparing and enjoying matcha.",
    image: "/chawan.jpg",
    imageClass: "object-[66%_center]"
  }
];

export default function ShopSection() {
  const { addToCart } = useCart();

  return (
    <div id="shop" className="min-h-screen text-white pt-32 pb-24 px-6 md:px-12 flex items-center">
      <div className="max-w-7xl mx-auto w-full">
        <div className="flex justify-center mb-16">
          <header className="text-center bg-black/80 backdrop-blur-md p-10 md:p-14 rounded-[3rem] border border-white/10 shadow-2xl inline-flex flex-col items-center">
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-4 text-white drop-shadow-xl">THE COLLECTION</h2>
            <p className="text-xl text-white font-bold tracking-wide max-w-2xl mx-auto">
              Everything you need to elevate your daily ritual. Curated for purity and performance.
            </p>
          </header>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {products.map((product) => (
            <div key={product.id} className="group cursor-pointer bg-black/80 backdrop-blur-md p-6 rounded-[2.5rem] border border-white/10 shadow-2xl flex flex-col hover:border-white/20 transition-all duration-300">
              <div className="relative aspect-[4/5] bg-white/5 rounded-[2rem] overflow-hidden mb-6 shadow-inner">
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10" />
                <img 
                  src={product.image} 
                  alt={product.name}
                  className={`w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out ${product.imageClass || ''}`}
                />
              </div>
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-black tracking-wide text-white">{product.name}</h3>
                <span className="text-white font-bold">{product.price}</span>
              </div>
              <p className="text-sm text-white font-bold leading-relaxed mb-6 flex-grow">
                {product.description}
              </p>
              <button onClick={() => addToCart(product)} className="w-full py-4 border border-white/20 rounded-full text-sm font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all shadow-lg active:scale-95">
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
