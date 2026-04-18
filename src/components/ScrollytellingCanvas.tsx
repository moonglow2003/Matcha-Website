'use client';

import { useEffect, useRef, useState } from 'react';
import { useScroll, useSpring, useTransform, motion, MotionValue } from 'framer-motion';

const FRAME_COUNT = 255;

export default function ScrollytellingCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [loadedCount, setLoadedCount] = useState(0);

  // Scroll logic
  const { scrollYProgress } = useScroll();

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Preload Images
  useEffect(() => {
    const loadedImages: HTMLImageElement[] = [];
    let count = 0;

    for (let i = 1; i <= FRAME_COUNT; i++) {
      const img = new Image();
      // Pad to 3 digits e.g., ezgif-frame-001.jpg
      const paddedIndex = i.toString().padStart(3, '0');
      img.src = `/sequence/ezgif-frame-${paddedIndex}.jpg`;

      img.onload = () => {
        count++;
        setLoadedCount(count);
        if (count === FRAME_COUNT) {
          setImages(loadedImages);
        }
      };
      
      // Store at correct index (0-based)
      loadedImages[i - 1] = img;
    }
  }, []);

  // Draw on Canvas
  useEffect(() => {
    if (images.length < FRAME_COUNT || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const render = (progress: number) => {
      const frameIndex = Math.min(
        FRAME_COUNT - 1,
        Math.floor(progress * FRAME_COUNT)
      );

      const img = images[frameIndex];
      if (!img) return;

      // Handle Resize / Retina displays
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.scale(dpr, dpr);

      // Object fit "cover" logic
      const hRatio = window.innerWidth / img.width;
      const vRatio = window.innerHeight / img.height;
      const ratio = Math.max(hRatio, vRatio);
      
      const centerShift_x = (window.innerWidth - img.width * ratio) / 2;
      const centerShift_y = (window.innerHeight - img.height * ratio) / 2;
      
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      ctx.drawImage(
        img,
        0, 0, img.width, img.height,
        centerShift_x, centerShift_y, img.width * ratio, img.height * ratio
      );
    };

    // Initial render
    render(smoothProgress.get());

    // Subscription for scroll updates
    const unsubscribe = smoothProgress.on("change", (latest) => {
      render(latest);
    });

    // Resize listener
    const handleResize = () => render(smoothProgress.get());
    window.addEventListener('resize', handleResize);

    return () => {
      unsubscribe();
      window.removeEventListener('resize', handleResize);
    };
  }, [images, smoothProgress]);

  // Loading State
  if (loadedCount < FRAME_COUNT) {
    const progressPercent = Math.round((loadedCount / FRAME_COUNT) * 100);
    return (
      <div className="flex flex-col items-center justify-center w-screen h-screen bg-[#050505] text-white">
        <div className="w-12 h-12 mb-6 border-t-2 border-r-2 border-white/80 rounded-full animate-spin" />
        <p className="text-white/60 tracking-widest text-sm font-light mb-2">LOADING EXPERIENCE</p>
        <div className="w-48 h-[2px] bg-white/10 rounded overflow-hidden">
          <div 
            className="h-full bg-white transition-all duration-300 ease-out" 
            style={{ width: `${progressPercent}%` }} 
          />
        </div>
      </div>
    );
  }

  return (
    <>
      <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full -z-50 pointer-events-none object-cover" />
      <div ref={containerRef} className="relative h-[400vh]">
        <div className="sticky top-0 w-full h-screen overflow-hidden pointer-events-none">
          {/* Scroll Indicator */}
          <ScrollIndicator progress={scrollYProgress} />

          {/* Text Overlays */}
          <BeatA progress={smoothProgress} />
          <BeatB progress={smoothProgress} />
          <BeatC progress={smoothProgress} />
          <BeatD progress={smoothProgress} />
        </div>
      </div>
    </>
  );
}

function ScrollIndicator({ progress }: { progress: MotionValue<number> }) {
  const opacity = useTransform(progress, [0, 0.05], [1, 0]);
  return (
    <motion.div 
      style={{ opacity }}
      className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 bg-black/60 backdrop-blur-md px-6 py-4 rounded-3xl border border-white/20 shadow-2xl"
    >
      <span className="text-sm font-black tracking-widest uppercase text-white drop-shadow-xl">Scroll to Explore</span>
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        className="w-[3px] h-12 bg-gradient-to-b from-white to-transparent rounded-full shadow-lg"
      />
    </motion.div>
  );
}

function BeatA({ progress }: { progress: MotionValue<number> }) {
  const opacity = useTransform(progress, [0, 0.1, 0.15, 0.2], [0, 1, 1, 0]);
  const y = useTransform(progress, [0, 0.1, 0.15, 0.2], [20, 0, 0, -20]);

  return (
    <motion.div 
      style={{ opacity, y }}
      className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center px-6"
    >
      <h1 className="text-7xl md:text-9xl font-black tracking-tighter text-white drop-shadow-2xl mb-4">
        THE MATCHA
      </h1>
      <p className="text-xl md:text-3xl text-white font-bold tracking-wide max-w-lg mx-auto drop-shadow-xl">
        Pure energy, refined by nature.
      </p>
    </motion.div>
  );
}

function BeatB({ progress }: { progress: MotionValue<number> }) {
  const opacity = useTransform(progress, [0.25, 0.35, 0.4, 0.45], [0, 1, 1, 0]);
  const y = useTransform(progress, [0.25, 0.35, 0.4, 0.45], [20, 0, 0, -20]);

  return (
    <motion.div 
      style={{ opacity, y }}
      className="absolute inset-0 flex flex-col justify-center pointer-events-none px-6 md:px-32 lg:px-48"
    >
      <div className="max-w-xl">
        <h2 className="text-5xl md:text-7xl font-black tracking-tight text-white drop-shadow-2xl mb-4">
          ORGANIC LAYERS
        </h2>
        <p className="text-xl md:text-2xl text-white font-bold leading-relaxed drop-shadow-xl">
          Sourced from shade-grown fields. Every micro-layer tells a story of meticulous cultivation.
        </p>
      </div>
    </motion.div>
  );
}

function BeatC({ progress }: { progress: MotionValue<number> }) {
  const opacity = useTransform(progress, [0.5, 0.6, 0.65, 0.7], [0, 1, 1, 0]);
  const y = useTransform(progress, [0.5, 0.6, 0.65, 0.7], [20, 0, 0, -20]);

  return (
    <motion.div 
      style={{ opacity, y }}
      className="absolute inset-0 flex flex-col justify-center items-end pointer-events-none px-6 md:px-32 lg:px-48 text-right"
    >
      <div className="max-w-xl">
        <h2 className="text-5xl md:text-7xl font-black tracking-tight text-white drop-shadow-2xl mb-4">
          SLOW GROUND
        </h2>
        <p className="text-xl md:text-2xl text-white font-bold leading-relaxed drop-shadow-xl">
          Milled by granite blocks to preserve maximum antioxidant potential.
        </p>
      </div>
    </motion.div>
  );
}

function BeatD({ progress }: { progress: MotionValue<number> }) {
  const opacity = useTransform(progress, [0.75, 0.85, 0.95, 1], [0, 1, 1, 0]);
  const y = useTransform(progress, [0.75, 0.85, 0.95, 1], [20, 0, 0, -20]);

  return (
    <motion.div 
      style={{ opacity, y }}
      className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center px-6"
    >
      <h2 className="text-6xl md:text-8xl font-black tracking-tighter text-white drop-shadow-2xl mb-8">
        ELEVATE YOUR RITUAL
      </h2>
      <button className="px-12 py-5 bg-white text-[#050505] font-black tracking-widest text-sm uppercase rounded-full hover:bg-white/90 transition-all pointer-events-auto shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] hover:scale-105 active:scale-95 duration-200">
        Pre-order Now
      </button>
    </motion.div>
  );
}
