'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Slide } from '@/config/slides';

interface NavbarProps {
  currentSlide: number;
  totalSlides: number;
  slideData: Slide;
  onPrevious: () => void;
  onNext: () => void;
}

const DELAY_FACTOR = 0.68; // matches contentIn(0.68) in Slide.tsx

export function Navbar({ currentSlide, totalSlides, slideData, onPrevious, onNext }: NavbarProps) {
  const dur = 0.9; // matches SLIDE_DURATION_MS / 1000 from Hero.tsx

  const fadeVariants = {
    hidden: { opacity: 0, y: -8 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        delay: dur * DELAY_FACTOR,
        ease: 'easeOut',
      },
    },
    exit: {
      opacity: 0,
      y: -6,
      transition: { duration: 0.18, ease: 'easeIn' },
    },
  };

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-30 px-8 py-6"
      style={{ pointerEvents: 'auto' }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide} // re-animates on every slide change
          variants={fadeVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          style={{ color: slideData.textColor }}
        >
          {/* Top row */}
          <div className="flex items-center justify-between mb-8">
            <div className="text-xs font-bold tracking-widest uppercase">
              Menu
            </div>

            <div className="absolute left-1/2 -translate-x-1/2">
              <svg
                className="w-8 h-8"
                viewBox="0 0 40 40"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path d="M12 15 L20 8 L28 15 M12 15 L20 22 L28 15" />
                <path d="M12 25 L20 18 L28 25 M12 25 L20 32 L28 25" />
              </svg>
            </div>

            <div className="flex items-center gap-6">
              <span className="text-xs font-bold tracking-widest uppercase">Contacts</span>
              <span className="text-xs font-bold tracking-widest uppercase">Cart</span>
            </div>
          </div>

          {/* Bottom row */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              <span className="text-xs font-bold tracking-widest uppercase">Showroom</span>
              <span className="text-xs font-bold tracking-widest uppercase">About</span>
            </div>

            <div className="flex items-center gap-6">
              <div className="font-mono text-xs font-bold tracking-wider">
                {String(currentSlide + 1).padStart(2, '0')}/{String(totalSlides).padStart(2, '0')}
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={onPrevious}
                  className="hover:opacity-70 transition-opacity p-1"
                  aria-label="Previous slide"
                >
                  <ChevronLeft size={18} strokeWidth={2.5} />
                </button>
                <button
                  onClick={onNext}
                  className="hover:opacity-70 transition-opacity p-1"
                  aria-label="Next slide"
                >
                  <ChevronRight size={18} strokeWidth={2.5} />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </nav>
  );
}