import React from 'react';
import { motion } from 'motion/react';
import { ChevronDown } from 'lucide-react';

export const HeroContent: React.FC = () => {
  const searchParams = new URLSearchParams(window.location.search);
  const prefix = searchParams.get('prefix');
  const name = searchParams.get('name');
  const inviteType = searchParams.get('invite') || 'both';

  let dateText = "December 5 & 6, 2026";
  if (inviteType === 'wedding') {
    dateText = "Saturday, December 5, 2026";
  } else if (inviteType === 'homecoming') {
    dateText = "Sunday, December 6, 2026";
  }

  const getDisplayName = (p: string, n: string) => {
    const trimmedName = n.trim();
    if (!trimmedName) return '';
    switch (p) {
      case 'Mr.': return `Mr. ${trimmedName}`;
      case 'Mrs.': return `Mrs. ${trimmedName}`;
      case 'Miss': return `Miss ${trimmedName}`;
      case 'Mr. & Mrs.': return `Mr. & Mrs. ${trimmedName}`;
      case 'Family': return `${trimmedName} and Family`;
      case 'Dear': return trimmedName;
      default: return p ? `${p} ${trimmedName}` : trimmedName;
    }
  };

  let guestNameString = '';
  const pathname = window.location.pathname.slice(1);
  
  if (pathname && pathname !== 'admin') {
    const decodedName = decodeURIComponent(pathname);
    guestNameString = getDisplayName(prefix || '', decodedName);
  } else if (prefix || name) {
    guestNameString = getDisplayName(prefix || '', name || '');
  }

  return (
    <section aria-label="Hero" className="relative w-full h-[100dvh] overflow-hidden flex items-center justify-center">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/ChatGPT Image Aug 4, 2026, 01_41_50 AM.png" 
          alt="Wedding background" 
          className="h-full w-full object-cover" 
          loading="eager" 
        />
        <div className="absolute inset-0 bg-[#022c22]/30" />
      </div>

      <div className="relative z-10 w-full h-full flex flex-col justify-center items-center px-4">
        
        {guestNameString && (
          <motion.div 
            className="flex flex-col items-center justify-center mb-6 sm:mb-8 bg-black/30 px-8 py-4 rounded-2xl backdrop-blur-sm border border-[#D4AF37]/20"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <p className="text-[10px] sm:text-xs uppercase tracking-[0.3em] mb-2 font-sans text-white/90 drop-shadow-md text-center">
              We cordially invite
            </p>
            <p className="font-serif text-2xl sm:text-3xl text-[#D4AF37] whitespace-nowrap text-center drop-shadow-lg">
              {guestNameString}
            </p>
          </motion.div>
        )}

        {/* We're Getting Married pill */}
        <motion.div 
          className="inline-flex items-center justify-center px-6 sm:px-8 py-3 rounded-[40px] border border-white/40 bg-black/10 backdrop-blur-sm mb-12 sm:mb-20 mt-16 sm:mt-0"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <span className="text-xs sm:text-sm tracking-[0.2em] sm:tracking-[0.25em] uppercase font-sans text-white font-medium">
            We're Getting Married!
          </span>
        </motion.div>

        {/* Names */}
        <motion.div 
          className="flex flex-col items-center gap-2 sm:gap-4 text-center"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
        >
          <h1 className="text-6xl sm:text-7xl md:text-8xl font-display text-white drop-shadow-xl leading-tight" style={{ fontFamily: "'Great Vibes', cursive" }}>
            Maneesha
          </h1>
          
          <div className="my-1 sm:my-3 text-white opacity-90 drop-shadow-lg">
             <span className="text-4xl sm:text-5xl font-serif italic">&amp;</span>
          </div>

          <h1 className="text-6xl sm:text-7xl md:text-8xl font-display text-white drop-shadow-xl leading-tight" style={{ fontFamily: "'Great Vibes', cursive" }}>
            Marin
          </h1>
          
          <p className="text-sm sm:text-lg md:text-xl font-sans tracking-[0.1em] sm:tracking-[0.15em] text-white uppercase mt-12 sm:mt-16 drop-shadow-md">
            {dateText}
          </p>
        </motion.div>

      </div>

      {/* Swipe up */}
      <motion.div 
        className="absolute bottom-8 inset-x-0 z-10 flex justify-center cursor-pointer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <div className="flex flex-col items-center text-center animate-bounce">
          <p className="text-[11px] sm:text-xs font-sans tracking-widest text-white mb-2 opacity-90">Swipe up for more</p>
          <ChevronDown className="h-6 w-6 text-white opacity-90" />
        </div>
      </motion.div>
      
    </section>
  );
};
