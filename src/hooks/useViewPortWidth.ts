import { useState, useCallback } from "react";
const browser = typeof window !== "undefined";

export default function useViewPortWidth(): number {
  const [viewportWidth, setInnerWidth] = useState(
    browser ? window.innerWidth : 0
  );

  const setSize = useCallback(() => {
    setInnerWidth(window.innerWidth || 0);
  }, []);

  typeof window !== "undefined" &&
    window.addEventListener("resize", setSize, { passive: true });
  typeof window !== "undefined" &&
    window.addEventListener("orientationchange", setSize, { passive: true });

  return viewportWidth;
}
