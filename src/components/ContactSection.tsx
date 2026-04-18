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
        <header className="mb-16 text-center">
          <h2 className="text-5xl md:text-7xl font-bold tracking-tighter mb-4 text-white/90">GET IN TOUCH</h2>
          <p className="text-xl text-white/60 font-light tracking-wide">
            For wholesale inquiries, press, or support.
          </p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-8 bg-white/5 p-8 md:p-12 rounded-3xl backdrop-blur-sm border border-white/10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label htmlFor="firstName" className="text-xs uppercase tracking-widest text-white/60 ml-1">First Name</label>
              <input 
                required
                type="text" 
                id="firstName"
                value={formData.firstName} onChange={e => setFormData({...formData, firstName: e.target.value})}
                className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/40 transition-colors"
                placeholder="Jane"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="lastName" className="text-xs uppercase tracking-widest text-white/60 ml-1">Last Name</label>
              <input 
                required
                type="text" 
                id="lastName"
                value={formData.lastName} onChange={e => setFormData({...formData, lastName: e.target.value})}
                className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/40 transition-colors"
                placeholder="Doe"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="email" className="text-xs uppercase tracking-widest text-white/60 ml-1">Email Address</label>
            <input 
              required
              type="email" 
              id="email"
              value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})}
              className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/40 transition-colors"
              placeholder="jane@example.com"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="message" className="text-xs uppercase tracking-widest text-white/60 ml-1">Message</label>
            <textarea 
              required
              id="message"
              rows={6}
              value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})}
              className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/40 transition-colors resize-none"
              placeholder="How can we help you?"
            ></textarea>
          </div>

          <button 
            disabled={loading}
            type="submit"
            className="w-full py-4 bg-white text-[#050505] font-medium tracking-widest text-sm uppercase rounded-xl hover:bg-white/90 transition-colors disabled:opacity-50"
          >
            {loading ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      </div>
    </div>
  );
}
