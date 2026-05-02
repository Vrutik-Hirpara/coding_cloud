import React from "react";

interface HeadingProps {
  title: React.ReactNode;
  subtitle?: string;
  align?: "left" | "center" | "right";

  // 🎨 colors (optional props)
  titleColor?: string;
  subtitleColor?: string;
  bgAccentColor?: string; // for underline or pill etc.

  size?: "sm" | "md" | "lg" | "xl";
  weight?: "normal" | "bold" | "extrabold";
}

const Heading: React.FC<HeadingProps> = ({
  title,
  subtitle,
  align = "center",
  titleColor = "var(--color-dark)",
  subtitleColor = "var(--color-muted)",
  bgAccentColor = "var(--color-accent-purple)",
  size = "lg",
  weight = "bold",
}) => {
  // 📏 font sizes
  const sizeClass = {
    sm: "text-xl md:text-2xl",
    md: "text-2xl md:text-3xl",
    lg: "text-3xl md:text-4xl",
    xl: "text-4xl md:text-5xl",
  }[size];

  const weightClass = {
    normal: "font-normal",
    bold: "font-bold",
    extrabold: "font-extrabold",
  }[weight];

  const alignClass = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  }[align];

  return (
    <div className={`mb-6 ${alignClass}`}>
      {/* TITLE */}
      <h2
        className={`${sizeClass} ${weightClass} leading-tight`}
        style={{ color: titleColor }}
      >
        {title}
      </h2>

      {/* UNDERLINE / ACCENT */}
      <div
        className="w-16 h-1 mx-auto mt-3 rounded-full"
        style={{ background: bgAccentColor }}
      />

      {/* SUBTITLE */}
      {subtitle && (
        <p
          className="mt-4 text-sm md:text-base max-w-xl mx-auto"
          style={{ color: subtitleColor }}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default Heading;