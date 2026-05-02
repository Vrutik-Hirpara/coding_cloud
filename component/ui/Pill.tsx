
"use client";

import React from "react";

type PillProps = {
  text: string;
  textColor?: string;
  bgColor?: string;
  blur?: string;          // glass effect
  className?: string;
};

export default function Pill({
  text,
  textColor = "var(--color-accent-purple)",
  bgColor = "rgba(106,77,244,0.12)",
  blur,
  className = "",
}: PillProps) {
  return (
    <span
      className={`inline-block px-4 py-1 mb-5 text-sm font-semibold rounded-full uppercase tracking-wider ${className}`}
      style={{
        color: textColor,
        background: bgColor,
        backdropFilter: blur ? blur : undefined,
        WebkitBackdropFilter: blur ? blur : undefined,
      }}
    >
      {text}
    </span>
  );
}