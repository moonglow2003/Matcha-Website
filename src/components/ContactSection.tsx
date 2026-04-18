'use client';
import { useState } from 'react';

export default function ContactSection() {
  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        alert("Message sent successfully!");
        setFormData({ firstName: '', lastName: '', email: '', message: '' });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="contact" className="min-h-screen text-white pt-32 pb-24 px-6 md:px-12 flex flex-col items-center justify-center">
      <div className="max-w-2xl w-full">
        <header className="mb-16 text-center bg-black/80 backdrop-blur-md p-10 md:p-14 rounded-[3rem] border border-white/10 shadow-2xl inline-block mx-auto flex flex-col items-center">
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-4 text-white drop-shadow-xl">GET IN TOUCH</h2>
          <p className="text-xl text-white font-bold tracking-wide">
            For wholesale inquiries, press, or support.
          </p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-8 bg-black/80 p-8 md:p-12 rounded-[3rem] backdrop-blur-md border border-white/10 shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label htmlFor="firstName" className="text-xs font-black uppercase tracking-widest text-white ml-1">First Name</label>
              <input 
                required
                type="text" 
                id="firstName"
                value={formData.firstName} onChange={e => setFormData({...formData, firstName: e.target.value})}
                className="w-full bg-white/10 border border-white/20 rounded-2xl px-5 py-4 text-white font-bold focus:outline-none focus:border-white transition-colors"
                placeholder="Jane"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="lastName" className="text-xs font-black uppercase tracking-widest text-white ml-1">Last Name</label>
              <input 
                required
                type="text" 
                id="lastName"
                value={formData.lastName} onChange={e => setFormData({...formData, lastName: e.target.value})}
                className="w-full bg-white/10 border border-white/20 rounded-2xl px-5 py-4 text-white font-bold focus:outline-none focus:border-white transition-colors"
                placeholder="Doe"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="email" className="text-xs font-black uppercase tracking-widest text-white ml-1">Email Address</label>
            <input 
              required
              type="email" 
              id="email"
              value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})}
              className="w-full bg-white/10 border border-white/20 rounded-2xl px-5 py-4 text-white font-bold focus:outline-none focus:border-white transition-colors"
              placeholder="jane@example.com"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="message" className="text-xs font-black uppercase tracking-widest text-white ml-1">Message</label>
            <textarea 
              required
              id="message"
              rows={6}
              value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})}
              className="w-full bg-white/10 border border-white/20 rounded-2xl px-5 py-4 text-white font-bold focus:outline-none focus:border-white transition-colors resize-none"
              placeholder="How can we help you?"
            ></textarea>
          </div>

          <button 
            disabled={loading}
            type="submit"
            className="w-full py-5 bg-white text-[#050505] font-black tracking-widest text-sm uppercase rounded-2xl hover:bg-white/90 transition-all disabled:opacity-50 shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] duration-200"
          >
            {loading ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      </div>
    </div>
  );
}
