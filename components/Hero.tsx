"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import { Navbar } from "./Navbar";
import { Slide } from "./Slide";
import { slides } from "@/config/slides";

// Total image slide duration in ms — bg + content delays are relative to this
const SLIDE_DURATION_MS = 900;

export function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [bgIndex, setBgIndex]           = useState(0); // lags behind so bg switches after image exits
  const [direction, setDirection]       = useState<1 | -1>(1);
  const lockRef = useRef(false);

  const pointerStartRef   = useRef({ x: 0, y: 0 });
  const pointerCurrentRef = useRef({ x: 0, y: 0 });

  const navigate = useCallback((nextIndex: number, dir: 1 | -1) => {
    if (lockRef.current) return;
    lockRef.current = true;
    setDirection(dir);
    setCurrentIndex(nextIndex);

    // Bg color switches ~halfway through — image is near the edge by then
    setTimeout(() => setBgIndex(nextIndex), SLIDE_DURATION_MS * 0.55);

    // Unlock after full animation completes
    setTimeout(() => { lockRef.current = false; }, SLIDE_DURATION_MS + 100);
  }, []);

  const goToNext     = useCallback(() => navigate((currentIndex + 1) % slides.length, 1),  [currentIndex, navigate]);
  const goToPrevious = useCallback(() => navigate((currentIndex - 1 + slides.length) % slides.length, -1), [currentIndex, navigate]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") goToNext();
      if (e.key === "ArrowLeft")  goToPrevious();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [goToNext, goToPrevious]);

  const handlePointerDown = (e: React.PointerEvent) => {
    pointerStartRef.current = pointerCurrentRef.current = { x: e.clientX, y: e.clientY };
  };
  const handlePointerMove = (e: React.PointerEvent) => {
    pointerCurrentRef.current = { x: e.clientX, y: e.clientY };
  };
  const handlePointerUp = () => {
    const dx = pointerCurrentRef.current.x - pointerStartRef.current.x;
    if (Math.abs(dx) > 80) dx > 0 ? goToPrevious() : goToNext();
  };

  return (
    <div
      className="relative w-full h-screen"
      // overflow-hidden is NOT here — image must visibly travel to the screen edge
      style={{
        backgroundColor: slides[bgIndex].bgColor,
        transition: `background-color ${SLIDE_DURATION_MS * 0.6}ms ease`,
        overflow: 'hidden',
      }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
    >
      <AnimatePresence initial={false} custom={direction} mode="wait">
        <Slide
          key={currentIndex}
          slide={slides[currentIndex]}
          direction={direction}
          slideDuration={SLIDE_DURATION_MS}
        />
      </AnimatePresence>

      <Navbar
  currentSlide={currentIndex}
  totalSlides={slides.length}
  slideData={slides[currentIndex]}   // ← add this
  onPrevious={goToPrevious}
  onNext={goToNext}
/>
    </div>
  );
}