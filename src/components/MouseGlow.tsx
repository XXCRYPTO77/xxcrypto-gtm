"use client";
import { useEffect } from "react";

export default function MouseGlow() {
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      document.querySelectorAll<HTMLElement>(".glow-card-hover").forEach((card) => {
        const rect = card.getBoundingClientRect();
        card.style.setProperty("--mx", `${e.clientX - rect.left}px`);
        card.style.setProperty("--my", `${e.clientY - rect.top}px`);
      });
    };
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, []);
  return null;
}
