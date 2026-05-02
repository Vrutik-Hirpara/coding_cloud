// "use client";
// import React from "react";
// import CountUp from "react-countup";

// type StatItem = {
//   icon: React.ReactNode;
//   number: number;
//   label: string;
// };

// interface WhyChooseUsProps {
//   stats: StatItem[];
// }

// const WhyChooseUs: React.FC<WhyChooseUsProps> = ({ stats }) => {
//   return (
//     <section className="py-20 bg-[var(--color-bg-light)] overflow-hidden">
//       <div className="container-custom text-center">

//         {/* Badge */}
//         <span className="inline-block px-4 py-1 mb-5 text-sm font-semibold text-[var(--color-primary)] bg-blue-100 rounded-full uppercase tracking-wider">
//           Why Choose Us
//         </span>

//         {/* Heading */}
//         <h2 className="text-3xl md:text-5xl font-bold text-[var(--color-dark)] leading-tight mb-20">
//           Creating A Community Of
//           <br className="hidden md:block" />
//           Life Long Learners.
//         </h2>

//         <div className="relative">

//           {/* Top Line */}
//           <div className="hidden md:block absolute top-0 left-0 w-full h-[2px] bg-blue-200"></div>

//           <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
//             {stats.map((stat, index) => {
//               const isLower = index === 1 || index === 3;

//               return (
//                 <div key={index} className="relative">

//                   {/* Dot + Vertical Line */}
//                   <div className="hidden md:flex flex-col items-center absolute top-0 left-1/2 -translate-x-1/2 w-full -z-0">
//                     <div className="w-5 h-5 bg-[var(--color-white)] border-4 border-[var(--color-primary)] rounded-full -mt-2.5 z-10"></div>
//                     <div className={`w-[2px] bg-blue-200 ${isLower ? "h-24" : "h-12"}`}></div>
//                   </div>

//                   {/* Card */}
//                   <div
//                     className={`bg-[var(--color-white)] overflow-hidden p-8 py-20 rounded-xl shadow-xl relative transition-transform duration-300 hover:-translate-y-2 group ${
//                       isLower ? "mt-0 md:mt-24" : "mt-0 md:mt-12"
//                     }`}
//                   >
//                     {/* Icon */}
//                     <div className="w-20 h-20 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-6 relative z-10 ring-8 ring-white">
//                       {stat.icon}
//                     </div>

//                     {/* Number */}
//                     <h3 className="text-4xl font-bold text-[var(--color-dark)]">
//                       <CountUp end={stat.number} duration={2} />
//                     </h3>

//                     {/* Label */}
//                     <p className="text-[var(--color-muted)] mt-2">{stat.label}</p>

//                     {/* Bottom Gradient Line */}
//                     <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-b-3xl"></div>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>

//         </div>
//       </div>
//     </section>
//   );
// };

// export default WhyChooseUs;

"use client";
import React from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import Pill from "./ui/Pill";
import Heading from "../component/ui/Heading";

const CountUp = dynamic(
  () => import("react-countup").then((mod) => mod.default),
  { ssr: false }
);

type StatItem = {
  icon: React.ReactNode;
  number: number;
  label: string;
};

interface WhyChooseUsProps {
  stats: StatItem[];
}

const WhyChooseUs: React.FC<WhyChooseUsProps> = ({ stats = [] }) => {
  return (
    <section className="py-20 bg-[var(--color-bg-light)] overflow-hidden">
      <div className="container-custom text-center">
        <Pill
          text="Why Choose Us"
          textColor="var(--color-accent-purple)"
          bgColor="var(--color-primary-light)"
        />
        {/* Heading */}
        <Heading
          title={
            <>
              Creating A Community Of <br />
              Life Long Learners.
            </>
          }
        />

        <div className="relative">

          {/* PERFECT TOP LINE */}
          <div className="hidden md:block absolute left-0 right-0 top-[22px] h-[2px] bg-blue-200"></div>

          {/* GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 relative z-10">

            {stats.map((stat, index) => {
              const isLower = index === 1 || index === 3;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="relative flex flex-col items-center"
                >

                  {/* DOT + LINE */}
                  <div className="hidden md:flex flex-col items-center absolute top-0 left-1/2 -translate-x-1/2">

                    {/* dot centered on line */}
                    <div className="w-5 h-5 bg-[var(--color-white)] border-4 border-[var(--color-accent-purple)] rounded-full translate-y-[11px] z-10"></div>

                    {/* vertical connector */}
                    <div className={`w-[2px] bg-blue-200 ${isLower ? "h-28" : "h-16"}`}></div>
                  </div>

                  {/* CARD */}
                  <div
className={`bg-[var(--color-white)] w-full max-w-[280px] p-8 pt-16 pb-12 rounded-t-xl shadow-xl relative transition-all duration-300 hover:-translate-y-3 hover:shadow-2xl mt-2 ${isLower ? "sm:mt-28" : "sm:mt-16"}`}
                  >
                    {/* icon */}
                    <div className="w-20 h-20 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-6 ring-8 ring-white text-[var(--color-accent-pink)] text-2xl transition-transform duration-300 group-hover:scale-110">
                      {stat.icon}
                    </div>

                    {/* number */}
                    <h3 className="text-4xl font-bold text-[var(--color-dark)]">
                      <CountUp
                        end={stat.number}
                        duration={2}
                        enableScrollSpy
                      //   scrollSpyOnce
                      />+
                    </h3>

                    {/* label */}
                    <p className="text-[var(--color-muted)] mt-2 text-sm">
                      {stat.label}
                    </p>

                    {/* bottom gradient */}
                    <div className="absolute bottom-0 left-0 w-full h-[4px] bg-gradient-to-r from-purple-500 to-blue-500 rounded-b-xl"></div>
                  </div>
                </motion.div>
              );
            })}

          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
