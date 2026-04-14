'use client';

import { motion } from 'framer-motion';
import { Slide as SlideType } from '@/config/slides';

interface SlideProps {
  slide: SlideType;
  direction: 1 | -1;
  slideDuration: number;
}

export function Slide({ slide, direction, slideDuration }: SlideProps) {
  const dur = slideDuration / 1000;

  const imageVariants = {
    hidden: (d: number) => ({
      x: d > 0 ? '110vw' : '-110vw',
    }),
    visible: {
      x: '0vw',
      transition: {
        duration: dur,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
    exit: (d: number) => ({
      x: d < 0 ? '110vw' : '-110vw',
      transition: {
        duration: dur,
        ease: [0.55, 0.055, 0.675, 0.19],
      },
    }),
  };

  const contentIn = (delayFactor: number) => ({
    hidden: { opacity: 0, y: 18 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: dur * delayFactor,
        ease: 'easeOut',
      },
    },
    exit: {
      opacity: 0,
      y: -10,
      transition: { duration: 0.18, ease: 'easeIn' },
    },
  });

  return (
    <>
      {/* ── Responsive styles injected once ── */}
      <style>{`
        .slide-dsgn {
          font-size: clamp(4rem, 18vw, 19rem);
          left: 40%;
        }
        .slide-specter {
          font-size: clamp(4rem, 18vw, 16rem);
          right: 33.333%;
        }
        .slide-image {
          max-width: 50vw;
          height: 100vh;
        }
        .slide-left-panel {
          max-width: 20rem;
          padding: 2rem;
        }
        .slide-right-panel {
          padding: 2rem;
        }
        .slide-subtitle-pill {
          left: 50%;
          transform: translateX(-50%);
          bottom: 3rem;
        }

        /* ── Tablet (≤1024px) ── */
        @media (max-width: 1024px) {
          .slide-dsgn {
            font-size: clamp(3rem, 14vw, 12rem);
            left: 35%;
          }
          .slide-specter {
            font-size: clamp(3rem, 14vw, 10rem);
            right: 28%;
          }
          .slide-image {
            max-width: 55vw;
          }
          .slide-left-panel {
            max-width: 14rem;
            padding: 1.25rem;
          }
          .slide-right-panel {
            padding: 1.25rem;
            gap: 2rem !important;
          }
        }

        /* ── Mobile landscape (≤768px) ── */
        @media (max-width: 768px) {
          .slide-dsgn {
            font-size: clamp(2.5rem, 16vw, 7rem);
            left: 50%;
            transform: translateX(-50%);
            justify-content: center;
          }
          .slide-specter {
            font-size: clamp(2rem, 13vw, 6rem);
            right: 50%;
            transform: translateX(50%);
            justify-content: center;
          }
          .slide-image {
            max-width: 70vw;
            height: 60vh;
          }
          .slide-left-panel {
            max-width: 100%;
            width: 100%;
            flex-direction: row;
            justify-content: space-between;
            align-items: flex-end;
            top: auto;
            bottom: 4.5rem;
            height: auto;
            padding: 0 1rem;
          }
          .slide-right-panel {
            display: none !important;
          }
          .slide-subtitle-pill {
            bottom: 1.25rem;
          }
          .slide-left-top {
            margin-top: 0 !important;
          }
        }

        /* ── Mobile portrait (≤480px) ── */
        @media (max-width: 480px) {
          .slide-dsgn {
            font-size: clamp(2rem, 18vw, 5rem);
          }
          .slide-specter {
            font-size: clamp(1.75rem, 15vw, 4.5rem);
          }
          .slide-image {
            max-width: 85vw;
            height: 55vh;
          }
          .slide-left-panel {
            flex-direction: column;
            align-items: flex-start;
            bottom: 5rem;
            gap: 0.5rem;
          }
          .slide-subtitle-pill {
            bottom: 1rem;
          }
        }
      `}</style>

      <div className="fixed inset-0" style={{ pointerEvents: 'auto' }}>

        {/* ── LAYER 1 (z-10): _DSGN — sits BEHIND the image ── */}
        <motion.div
          initial="hidden"
          animate="visible"
          exit="exit"
          className="slide-dsgn absolute inset-0 flex items-center justify-center pointer-events-none"
          style={{ zIndex: 10 }}
        >
          <span
            className="drop-shadow-xl"
            style={{
              fontWeight: 900,
              fontStyle: 'italic',
              color: slide.textColor,
              fontFamily: "'Bebas Neue', 'Righteous', sans-serif",
              letterSpacing: '0.05em',
              whiteSpace: 'nowrap',
              userSelect: 'none',
            }}
          >
            _DSGN
          </span>
        </motion.div>

        {/* ── LAYER 2 (z-20): Image — slides over _DSGN, under SPECTER ── */}
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{ zIndex: 20 }}
        >
          <motion.div
            custom={direction}
            variants={imageVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            style={{ willChange: 'transform' }}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="slide-image object-cover object-center"
              style={{ display: 'block' }}
              crossOrigin="anonymous"
            />
          </motion.div>
        </div>

        {/* ── LAYER 3 (z-30): SPECTER — sits ON TOP of the image ── */}
        <motion.div
          initial="hidden"
          animate="visible"
          exit="exit"
          className="slide-specter absolute inset-0 flex items-center justify-center pointer-events-none"
          style={{ zIndex: 30 }}
        >
          <span
            className="drop-shadow-md"
            style={{
              fontWeight: 900,
              color: slide.textColor,
              fontFamily: "'Bebas Neue', 'Righteous', sans-serif",
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              whiteSpace: 'nowrap',
              userSelect: 'none',
            }}
          >
            SPECTER
          </span>
        </motion.div>

        {/* ── Left panel ── */}
        <motion.div
          variants={contentIn(0.68)}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="slide-left-panel absolute left-0 top-0 h-full flex flex-col justify-between z-10 pointer-events-none"
          style={{ color: slide.textColor }}
        >
          <div>
            <div className="slide-left-top mt-20">
              <h2 className="text-sm font-bold tracking-widest mb-2">
                {slide.productLabel}
              </h2>
              <p className="text-xs leading-relaxed opacity-80">
                {slide.description}
              </p>
            </div>
          </div>
          <div>
            <p className="text-xs leading-relaxed opacity-75 mb-4">
              {slide.details.slice(0, 2).join(', ')}
            </p>
            <div className="text-sm font-bold">{slide.price}</div>
            <div className="text-xs opacity-75 mt-1">{slide.details[2]}</div>
          </div>
        </motion.div>

        {/* ── Right panel ── */}
        <motion.div
          variants={contentIn(0.75)}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="slide-right-panel absolute right-0 top-1/2 -translate-y-1/2 flex flex-col items-end gap-16 z-10 pointer-events-none"
          style={{ color: slide.textColor }}
        >
          <div className="text-right">
            <div className="text-xs font-bold tracking-widest mb-4">
              {String(slide.id).padStart(2, '0')}/06
            </div>
          </div>
          <div className="text-right text-xs leading-relaxed max-w-xs">
            <p className="opacity-80">{slide.details.join(' • ')}</p>
          </div>
        </motion.div>

        {/* ── Subtitle pill ── */}
        <motion.div
          variants={contentIn(0.82)}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="slide-subtitle-pill absolute z-30"
        >
          <div
            className="text-xs font-bold tracking-widest px-4 py-2 rounded-full"
            style={{ backgroundColor: slide.textColor, color: slide.bgColor }}
          >
            {slide.subtitle}
          </div>
        </motion.div>
      </div>
    </>
  );
}