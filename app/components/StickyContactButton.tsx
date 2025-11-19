"use client";

import { useEffect, useState } from "react";

export default function StickyContactButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show the sticky button after scrolling 300px
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {isVisible && (
        <a
          href="#contact"
          className="fixed bottom-6 right-6 z-40 btn btn-primary shadow-xl hover:shadow-2xl transition-all duration-300 animate-pulse-subtle"
          aria-label="Get a quote"
        >
          <span className="mr-2">✨</span>
          Get a Quote
        </a>
      )}
    </>
  );
}
