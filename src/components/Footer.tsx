export default function Footer() {
  return (
    <footer className="w-full py-12 px-6 md:px-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
      <div className="flex flex-col gap-2 text-center md:text-left">
        <span className="text-xl font-bold tracking-widest text-white">MATCHA</span>
        <span className="text-xs text-white/40 uppercase tracking-widest">Pure energy, refined by nature.</span>
      </div>
      
      <div className="flex gap-8">
        <a href="#" className="text-xs text-white/60 hover:text-white uppercase tracking-widest transition-colors">Instagram</a>
        <a href="#" className="text-xs text-white/60 hover:text-white uppercase tracking-widest transition-colors">Twitter</a>
        <a href="#" className="text-xs text-white/60 hover:text-white uppercase tracking-widest transition-colors">Journal</a>
      </div>

      <div className="text-xs text-white/30 tracking-widest uppercase">
        © {new Date().getFullYear()} Matcha Inc.
      </div>
    </footer>
  );
}
