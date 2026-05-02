// "use client";

// import Link from "next/link";
// import { motion } from "framer-motion";
// import { ReactNode } from "react";
// import clsx from "clsx";

// type ButtonProps = {
//   children: ReactNode;
//   href?: string;
//   onClick?: () => void;
//   icon?: React.ElementType;
//   className?: string;
// };

// export default function Button({
//   children,
//   href,
//   onClick,
//   icon: Icon,
//   className,
// }: ButtonProps) {
//   const base =
//     "relative inline-flex items-center justify-center gap-2 px-8 py-3 rounded-full font-semibold text-[var(--color-white)]";

//   const inner = (
//     <motion.div
//       whileHover={{ y: -3, scale: 1.03 }}
//       whileTap={{ scale: 0.95 }}
//       transition={{ type: "spring", stiffness: 260, damping: 18 }}
//       className={clsx(
//         base,
//         "group shadow-md hover:shadow-xl transition-all duration-100",
//         className
//       )}
//      style={{
//   background: "var(--color-accent-purple)",
// }}
//     >
//       {/* soft glow */}
//       <span
//         className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition duration-100"
//         style={{
//           boxShadow: "0 0 16px var(--color-accent-purple)",
//         }}
//       />

//       <span className="relative z-10 flex items-center gap-2">
//         {children}
//         {Icon && (
//           <span className="transition-transform duration-100 group-hover:translate-x-1">
//             <Icon />
//           </span>
//         )}
//       </span>
//     </motion.div>
//   );

//   if (href) return <Link href={href}>{inner}</Link>;
//   return <button onClick={onClick}>{inner}</button>;
// }

// "use client";

// import Link from "next/link";
// import { motion } from "framer-motion";
// import { ReactNode } from "react";
// import clsx from "clsx";

// type ButtonProps = {
//   children: ReactNode;
//   href?: string;
//   onClick?: () => void;
//   icon?: React.ElementType;
//   className?: string;
//   variant?: "gradient" | "purple" | "outline";
//   size?: "sm" | "md" | "lg";
// };

// export default function Button({
//   children,
//   href,
//   onClick,
//   icon: Icon,
//   className,
//   variant = "gradient",
//   size = "md",
// }: ButtonProps) {

//   /* ================= SIZE ================= */
//   const sizes = {
//     sm: "px-3 py-1 text-xs",
//     md: "px-6 py-2 text-sm",
//     lg: "px-8 py-3 text-base",
//   };

//   /* ================= VARIANTS ================= */
//   const variants = {
//     gradient: "text-white",
//     purple: "bg-[var(--color-accent-purple)] text-white",
//     outline:
//       "border border-[var(--color-accent-purple)] text-[var(--color-accent-purple)] bg-transparent",
//   };

//   const base =
//     "relative inline-flex items-center justify-center gap-2 rounded-full font-semibold overflow-hidden group";

//   const inner = (
//     <motion.div
//       whileHover={{ y: -3, scale: 1.04 }}
//       whileTap={{ scale: 0.95 }}
//       transition={{ type: "spring", stiffness: 180, damping: 18 }}
//       className={clsx(
//         base,
//         sizes[size],
//         variants[variant],
//         "shadow-md hover:shadow-xl transition-all duration-200",
//         className
//       )}
//       style={
//         variant === "gradient"
//           ? { background: "var(--color-logo-gradient)" }
//           : undefined
//       }
//     >
//       {/* glow */}
//       <span
//         className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition duration-200"
//         style={{
//           boxShadow: "0 0 18px rgba(37,99,235,0.6)",
//         }}
//       />

//       {/* shine */}
//       <span className="absolute left-[-40%] top-0 h-full w-[40%] bg-white/20 skew-x-[-25deg] transition-all duration-700 group-hover:left-[140%]" />

//       {/* content */}
//       <span className="relative z-10 flex items-center gap-2">

//         <span>{children}</span>

//         {Icon && (
//           <span className="relative flex items-center w-[18px] overflow-hidden">

//             <span className="transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-x-2 group-hover:opacity-0">
//               <Icon />
//             </span>

//             <span className="absolute left-0 translate-x-2 opacity-0 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0 group-hover:opacity-100">
//               <Icon />
//             </span>

//           </span>
//         )}

//       </span>
//     </motion.div>
//   );

//   if (href) return <Link href={href}>{inner}</Link>;

//   return <button onClick={onClick}>{inner}</button>;
// }   




// "use client";

// import Link from "next/link";
// import { motion } from "framer-motion";
// import { ReactNode, useState } from "react";
// import clsx from "clsx";
// import { style } from "framer-motion/client";

// type ButtonProps = {
//   children: ReactNode;
//   href?: string;
//   onClick?: () => void;
//   icon?: React.ElementType;
//   className?: string;
//   variant?: "gradient" | "purple" | "outline" | "navbar";
//   size?: "sm" | "md" | "lg";
//   type?: "submit"
//   style?: React.CSSProperties;

// };

// export default function Button({
//   children,
//   href,
//   onClick,
//   icon: Icon,
//   className,
//   variant = "gradient",
//   size = "md",
//   type = "submit",
//   style
// }: ButtonProps) {

//   const [riverClass, setRiverClass] = useState("");

//   /* ================= SIZE ================= */
// const sizes = {
//   sm: "px-3 py-1 text-xs",
//   md: "px-6 py-3 text-sm",
//   lg: "px-20 py-4 text-xl"
// };

//   /* ================= VARIANTS ================= */
//   const variants = {
//     gradient: "text-white",
//     purple: "bg-[var(--color-accent-purple)] text-white",
//     outline:
//       "border border-[var(--color-accent-purple)] text-[var(--color-accent-purple)] bg-transparent",
//     navbar: "btn-navbar",
//   };

//   const base =
//     "relative inline-flex items-center justify-center gap-2 rounded-lg font-semibold overflow-hidden group";
//   const inner = (
//     <motion.div
//       whileHover={{
//         y: variant === "navbar" ? 0 : -3,
//         scale: variant === "navbar" ? 1 : 1.04,
//       }}
//       whileTap={{ scale: 0.95 }}
//       transition={{ type: "spring", stiffness: 180, damping: 18 }}
//       className={clsx(
//         base,
//         sizes[size],
//         variants[variant],
//         variant !== "navbar" && "shadow-md hover:shadow-xl transition-all duration-200",
//         className
//       )}
//       style={
//         variant === "gradient"
//           ? { background: "var(--color-logo-gradient)" }
//           : undefined
//       }
//       onMouseEnter={() => variant === "navbar" && setRiverClass("river-in")}
//       onMouseLeave={() => variant === "navbar" && setRiverClass("river-out")}
//     >
//       {/* glow only for non-navbar */}
//       {/* {variant !== "navbar" && (
//         <span
//           className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition duration-200"
//           style={{
//             boxShadow: "0 0 18px rgba(37,99,235,0.6)",
//           }}
//         />
//       )} */}

//       {/* shine effect only for non-navbar */}
//       {variant !== "navbar" && (
//         <span className="absolute left-[-40%] top-0 h-full w-[40%] bg-white/20 skew-x-[-25deg] transition-all duration-700 group-hover:left-[140%]" />
//       )}

//       {/* content */}
//       <span className="relative z-10 flex items-center gap-2">

//         <span
//           className={
//             variant === "navbar"
//               ? `btn-navbar-text ${riverClass}`
//               : ""
//           }
//         >
//           {children}
//         </span>

//         {Icon && (
//           <span className="relative flex items-center w-[18px]
//           ">

//             <span className="transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-x-2 group-hover:opacity-0">
//               <Icon />
//             </span>

//             <span className="absolute left-0 translate-x-2 opacity-0 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0 group-hover:opacity-100">
//               <Icon />
//             </span>

//           </span>
//         )}

//       </span>
//     </motion.div>
//   );

//   if (href) return <Link href={href}>{inner}</Link>;

//   return <button onClick={onClick}>{inner}</button>;
// }



"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ReactNode, useState } from "react";
import clsx from "clsx";
import { style } from "framer-motion/client";

type ButtonProps = {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  icon?: React.ElementType;
  className?: string;
  variant?: "gradient" | "purple" |"outlineWhite"| "outline" | "navbar";
  size?: "sm" | "md" | "lg";
  type?: "submit"
    disabled?: boolean; // ✅ Add this

  style?: React.CSSProperties;

};

export default function Button({
  children,
  href,
  onClick,
  icon: Icon,
  className,
  variant = "gradient",
  size = "md",
  type = "submit",
  style
}: ButtonProps) {

  const [riverClass, setRiverClass] = useState("");

  /* ================= SIZE ================= */
const sizes = {
  sm: "px-3 py-1 text-xs",
  md: "px-6 py-3 text-sm",
  lg: "px-20 py-4 text-xl"
};

  /* ================= VARIANTS ================= */
  // const variants = {
  //   gradient: "text-white",
  //   purple: "bg-[var(--color-accent-purple)] text-white",
  //   outline:
  //     "border border-[var(--color-accent-purple)] text-[var(--color-accent-purple)] bg-transparent",
  //   navbar: "btn-navbar",
  // };
const variants = {
  gradient: "text-white",

  purple: "bg-[var(--color-accent-purple)] text-white",

  outline:
    "border border-[var(--color-accent-purple)] text-[var(--color-accent-purple)] bg-transparent",

  outlineWhite:
    "border border-white text-white bg-transparent hover:bg-transparent hover:text-white",

  navbar: "btn-navbar",
};
  // const base =
  //   "relative inline-flex items-center justify-center gap-2 rounded-lg font-semibold overflow-hidden group";
 const base =
"relative flex items-center justify-center gap-2 rounded-lg font-semibold overflow-hidden group w-full";
 
  const inner = (
    <motion.div
      whileHover={{
        y: variant === "navbar" ? 0 : -3,
        scale: variant === "navbar" ? 1 : 1.04,
      }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 180, damping: 18 }}
      className={clsx(
        base,
        sizes[size],
        variants[variant],
        variant !== "navbar" && "shadow-md hover:shadow-xl transition-all duration-200",
        className
      )}
      style={
        variant === "gradient"
          ? { background: "var(--color-logo-gradient)" }
          : undefined
      }
      onMouseEnter={() => (variant === "navbar" || variant === "gradient") && setRiverClass("river-in")}
      onMouseLeave={() => (variant === "navbar" || variant === "gradient") && setRiverClass("river-out")}
    >
      {/* shine effect only for non-navbar and non-gradient */}
      {variant !== "navbar" && variant !== "gradient" && (
        <span className="absolute left-[-40%] top-0 h-full w-[40%] bg-white/20 skew-x-[-25deg] transition-all duration-700 group-hover:left-[140%]" />
      )}

      {/* content */}
      <span className="relative z-10 flex items-center gap-2">

        <span
          className={
            variant === "navbar" || variant === "gradient"
              ? `btn-navbar-text ${riverClass}`
              : ""
          }
        >
          {children}
        </span>

        {Icon && (
          <span className="relative flex items-center w-[18px]
          ">

            <span className="transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-x-2 group-hover:opacity-0">
              <Icon />
            </span>

            <span className="absolute left-0 translate-x-2 opacity-0 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0 group-hover:opacity-100">
              <Icon />
            </span>

          </span>
        )}

      </span>
    </motion.div>
  );

  // if (href) return <Link href={href}>{inner}</Link>;

  // return <button onClick={onClick}>{inner}</button>;
if (href)
  return (
    <Link href={href} className={clsx("inline-flex justify-center", className)}>
      {inner}
    </Link>
  );

return (
  <button
    onClick={onClick}
    type={type}
    className={clsx("inline-flex justify-center", className)}
  >
    {inner}
  </button>
);
}