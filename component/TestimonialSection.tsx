// "use client";
// import React, { useState, useEffect } from "react";
// import { FaQuoteRight, FaStar } from "react-icons/fa";
// import { API,BASE_URL } from "@/lib/api";

// type TestimonialItem = {
//   id: number;
//   name: string;
//   review: string;
//   image: string;
//   rating?: number;
//   variant?: "white" | "color";
// };


// const rowPadding="p-3"
// // ================= CARD =================
// const TestimonialCard = ({ item }: { item: TestimonialItem }) => {
//   if (!item) return null;

//   const isColor = item.variant === "color";

//   return (
//     <div
//       className={`shrink-0 w-[280px] sm:w-[320px] md:w-[380px] p-6 md:p-8 rounded-2xl mx-4 flex flex-col justify-between transition-all duration-300 hover:scale-105 ${
//         isColor
//           ? "bg-gradient-to-r from-[var(--color-primary)] to-purple-600 text-[var(--color-white)]"
//           : "bg-[var(--color-white)] text-[var(--color-muted)] border-[var(--color-border-light)]"
//       }`}
//     >
//       {/* stars + quote */}
//       <div className="flex justify-between items-start mb-6">
//         <div className="flex gap-1 text-[var(--color-accent-yellow-light)] text-sm">
//           {[...Array(5)].map((_, i) => (
//             <FaStar
//               key={i}
//               className={
//                 i < (item.rating || 5) ? "text-[var(--color-accent-yellow-light)]" : "border border-[var(--color-border-light)]"
//               }
//             />
//           ))}
//         </div>
//         <FaQuoteRight
//           className={`text-4xl opacity-30 ${
//             isColor ? "text-[var(--color-white)]" : "border border-[var(--color-border-light)]"
//           }`}
//         />
//       </div>

//       {/* review */}
//       <p
//         className={`text-base md:text-lg mb-8 italic ${
//           isColor ? "text-blue-50" : "text-[var(--color-muted)]"
//         }`}
//       >
//         "{item.review}"
//       </p>

//       {/* user */}
//       <div className="flex items-center gap-4">
//         <img
//           src={item.image}
//           alt={item.name}
//           className="w-12 h-12 rounded-full object-cover border-2 border-white/20"
//           onError={(e: any) => {
//             e.target.src = `https://ui-avatars.com/api/?name=${item.name}`;
//           }}
//         />
//         <div>
//           <h4
//             className={`font-bold ${
//               isColor ? "text-[var(--color-white)]" : "text-[var(--color-dark)]"
//             }`}
//           >
//             {item.name}
//           </h4>
//           <p
//             className={`text-sm ${
//               isColor ? "text-blue-200" : "text-[var(--color-muted-light)]"
//             }`}
//           >
//             Student
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// // ================= MAIN =================
// const TestimonialSection = () => {
//   const [data, setData] = useState<TestimonialItem[]>([]);
//   const [loading, setLoading] = useState(true);

// useEffect(() => {
//   const loadData = async () => {
//     try {
//       const res = await fetch(API.TESTIMONIALS.LIST, {
//         cache: "no-store",
//       });

//       const json = await res.json();
//       console.log("Testimonials API =>", json);

//       let arr: any[] = [];

//       if (Array.isArray(json)) arr = json;
//       else if (json.results) arr = json.results;
//       else if (json.data) arr = json.data;

//       const processed = arr.map((item, i) => {
//         let img = item.image;

//         if (img && !img.startsWith("http")) {
//           img = `${BASE_URL}${img}`;
//         }

//         return {
//           ...item,
//           image: img,
//           variant: i % 2 === 0 ? "white" : "color",
//           rating: item.rating || 5,
//         };
//       });

//       let final = processed;
//       if (final.length > 0 && final.length < 6) {
//         final = [...final, ...final, ...final];
//       }

//       setData(final);

//     } catch (err) {
//       console.error("Testimonial fetch error:", err);
//       setData([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   loadData();
// }, []);

//   if (loading)
//     return <div className="py-20 text-center text-[var(--color-muted-light)]">Loading...</div>;

//   if (!data.length)
//     return <div className="text-center text-[var(--color-muted-light)]">No reviews</div>;

//   const mid = Math.ceil(data.length / 2);
//   const row1 = data.slice(0, mid);
//   const row2 = data.slice(mid);

//   const marquee1 = [...row1, ...row1];
//   const marquee2 = [...row2, ...row2];

//   return (
//     <div className="w-full overflow-hidden ">

//       {/* animations */}
//       <style>{`
//         @keyframes marqueeLeft {
//           0% { transform: translateX(0); }
//           100% { transform: translateX(-50%); }
//         }
//         @keyframes marqueeRight {
//           0% { transform: translateX(-50%); }
//           100% { transform: translateX(0); }
//         }
//         .marquee-left { animation: marqueeLeft 40s linear infinite; }
//         .marquee-right { animation: marqueeRight 40s linear infinite; }
//       `}</style>

//       {/* row 1 */}
//       <div className={`mb-10 ${rowPadding} overflow-hidden`}>
//         <div className="flex w-max marquee-left">
//           {marquee1.map((item, i) => (
//             <TestimonialCard key={i} item={item} />
//           ))}
//         </div>
//       </div>

//       {/* row 2 */}
//       {marquee2.length > 0 && (
//         <div className={rowPadding}>
//           <div className="flex w-max marquee-right ">
//             {marquee2.map((item, i) => (
//               <TestimonialCard key={i} item={item} />
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default TestimonialSection;

//aa perfect chh epan testimonial api change pachhi no review aave chhe

// "use client";
// import React, { useState, useEffect } from "react";
// import { FaQuoteRight, FaStar } from "react-icons/fa";
// import { API, BASE_URL } from "@/lib/api";

// type TestimonialItem = {
//   id: number;
//   name: string;
//   review: string;
//   image: string;
//   rating?: number;
//   variant?: "white" | "color";
// };

// const rowPadding = "p-3";

// // ================= CARD =================
// const TestimonialCard = ({ item }: { item: TestimonialItem }) => {
//   if (!item) return null;

//   const isColor = item.variant === "color";

//   return (
//   <div
//   className={`shrink-0 w-[300px] sm:w-[360px] md:w-[460px] p-6 md:p-8 rounded-2xl mx-4 flex flex-col justify-between transition-all duration-300 hover:scale-105 ${
//     isColor
//       ? "text-[var(--color-white)]"
//       : "bg-[var(--color-white)] text-[var(--color-muted)] border-[var(--color-border-light)]"
//   }`}
//   style={
//     isColor
//       ? { background: "var(--color-logo-gradient)" }
//       : {}
//   }
// >
//       {/* stars + quote */}
//       <div className="flex justify-between items-start mb-6">
//         <div className="flex gap-1 text-[var(--color-accent-yellow-light)] text-sm">
//           {[...Array(5)].map((_, i) => (
//             <FaStar
//               key={i}
//               className={
//                 i < (item.rating || 5) ? "text-[var(--color-accent-yellow-light)]" : "text-[var(--color-dark)]"
//               }
//             />
//           ))}
//         </div>

//         <FaQuoteRight
//           className={`text-4xl opacity-30 ${
//             isColor ? "text-[var(--color-white)]" : ""
//           }`}
//         />
//       </div>

//       {/* review */}
//       {/* <p
//         className={`text-base md:text-lg mb-8 italic ${
//           isColor ? "text-blue-50" : "text-[var(--color-muted)]"
//         }`}
//       >
//         "{item.review}"
//       </p> */}
// <p
//   className={`text-base md:text-lg mb-8 italic ${
//     isColor ? "text-blue-50" : "text-[var(--color-muted)]"
//   }`}
// >
//   "
//   {item.review?.split(" ").slice(0, 40).join(" ")}
//   {item.review?.split(" ").length > 40 ? "..." : ""}
//   "
// </p>
//       {/* user */}
//       <div className="flex items-center gap-4">
//         <img
//           src={item.image}
//           alt={item.name}
//           className="w-12 h-12 rounded-full object-cover border-2 border-white/20"
//           onError={(e: any) => {
//             e.target.src = `https://ui-avatars.com/api/?name=${item.name}`;
//           }}
//         />
//         <div>
//           <h4
//             className={`font-bold ${
//               isColor ? "text-[var(--color-white)]" : "text-[var(--color-dark)]"
//             }`}
//           >
//             {item.name}
//           </h4>
//           <p
//             className={`text-sm ${
//               isColor ? "text-blue-200" : "text-[var(--color-muted-light)]"
//             }`}
//           >
//             Student
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// // ================= MAIN =================
// const TestimonialSection = () => {
//   const [data, setData] = useState<TestimonialItem[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const loadData = async () => {
//       try {
//         const res = await fetch(API.TESTIMONIALS.LIST, {
//           cache: "no-store",
//         });

//         const json = await res.json();

//         // 🔥 IMPORTANT: your API format = { status, data: [] }
//         let arr: any[] = [];

//         if (Array.isArray(json)) arr = json;
//         else if (json.results) arr = json.results;
//         else if (json.data) arr = json.data;
// else if (json.testimonials) arr = json.testimonials;
//         const processed: TestimonialItem[] = arr.map((item, i) => {
//           let img = item.image;

//           // absolute image fix
//           if (img && !img.startsWith("http")) {
//             img = `${BASE_URL}${img}`;
//           }

//           return {
//             id: item.id,
//             name: item.name,
//             review: item.review,
//             image: img,
//             rating: item.rating || 5,
//             variant: i % 2 === 0 ? "white" : "color",
//           };
//         });

//         // duplicate for marquee smooth loop
//         let final = processed;
//         if (final.length > 0 && final.length < 6) {
//           final = [...final, ...final, ...final];
//         }

//         setData(final);
//       } catch (err) {
//         console.error("Testimonial fetch error:", err);
//         setData([]);
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadData();
//   }, []);

//   if (loading)
//     return <div className="py-20 text-center text-[var(--color-muted-light)]">Loading...</div>;

//   if (!data.length)
//     return <div className="text-center text-[var(--color-muted-light)]">No reviews</div>;

//   const mid = Math.ceil(data.length / 2);
//   const row1 = data.slice(0, mid);
//   const row2 = data.slice(mid);

//   const marquee1 = [...row1, ...row1];
//   const marquee2 = [...row2, ...row2];

//   return (
//     <div className="w-full overflow-hidden">
//       {/* animations */}
//       <style>{`
//         @keyframes marqueeLeft {
//           0% { transform: translateX(0); }
//           100% { transform: translateX(-50%); }
//         }
//         @keyframes marqueeRight {
//           0% { transform: translateX(-50%); }
//           100% { transform: translateX(0); }
//         }
//         .marquee-left { animation: marqueeLeft 40s linear infinite; }
//         .marquee-right { animation: marqueeRight 40s linear infinite; }
//       `}</style>

//       {/* row 1 */}
//       <div className={`mb-10 ${rowPadding} overflow-hidden`}>
//         <div className="flex w-max marquee-left">
//           {marquee1.map((item, i) => (
//             <TestimonialCard key={i} item={item} />
//           ))}
//         </div>
//       </div>

//       {/* row 2 */}
//       {marquee2.length > 0 && (
//         <div className={rowPadding}>
//           <div className="flex w-max marquee-right">
//             {marquee2.map((item, i) => (
//               <TestimonialCard key={i} item={item} />
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default TestimonialSection;


//scroll

// "use client";
// import React, { useState, useEffect } from "react";
// import { FaQuoteRight, FaStar } from "react-icons/fa";
// import { API, BASE_URL } from "@/lib/api";

// type TestimonialItem = {
//   id: number;
//   name: string;
//   review: string;
//   image: string;
//   rating?: number;
//   variant?: "white" | "color";
// };

// const rowPadding = "p-3";


// // ================= CARD =================
// const TestimonialCard = ({ item }: { item: TestimonialItem }) => {
//   if (!item) return null;

//   const isColor = item.variant === "color";

//   return (
//     <div
//       className={`relative shrink-0 w-[300px] sm:w-[330px] md:w-[360px] h-[260px]
//       px-8 py-8 rounded-xl mx-2 flex flex-col justify-between text-center
//       transition-all duration-300 hover:-translate-y-2 shadow-md overflow-hidden
//       ${
//         isColor
//           ? "bg-gradient-to-r from-[var(--color-accent-purple)] to-[var(--color-primary-dark)] text-white"
//           : "bg-white text-[var(--color-muted)] border border-[var(--color-border-light)]"
//       }`}
//     >
//       {/* quote icon */}
//       <FaQuoteRight
//         className={`absolute top-6 right-6 text-2xl opacity-30 ${
//           isColor ? "text-white" : "text-gray-300"
//         }`}
//       />

//       {/* ⭐ Dynamic Rating Stars */}
//       <div className="flex justify-center gap-1 mb-2">
//         {[...Array(5)].map((_, i) => (
//           <FaStar
//             key={i}
//             className={`text-sm ${
//               i < (item.rating || 0)
//                 ? "text-yellow-400"
//                 : "text-gray-300"
//             }`}
//           />
//         ))}
//       </div>

//       {/* review */}
//       <p
//         className={`text-sm leading-relaxed break-words whitespace-normal line-clamp-5
//         ${
//           isColor ? "text-blue-50" : "text-[var(--color-muted)]"
//         }`}
//       >
//         {item.review}
//       </p>

//       {/* user */}
//       <div className="flex items-center justify-center gap-3 mt-4">
//         <img
//           src={item.image}
//           alt={item.name}
//           className="w-10 h-10 rounded-full object-cover"
//           onError={(e: any) => {
//             e.target.src = `https://ui-avatars.com/api/?name=${item.name}`;
//           }}
//         />

//         <div className="text-left">
//           <h4
//             className={`text-sm font-semibold ${
//               isColor ? "text-white" : "text-[var(--color-dark)]"
//             }`}
//           >
//             {item.name}
//           </h4>

//           <p
//             className={`text-xs ${
//               isColor ? "text-blue-200" : "text-[var(--color-muted-light)]"
//             }`}
//           >
//             Student
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };


// // ================= MAIN =================
// const TestimonialSection = () => {
//   const [data, setData] = useState<TestimonialItem[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const loadData = async () => {
//       try {
//         const res = await fetch(API.TESTIMONIALS.LIST, {
//           cache: "no-store",
//         });

//         const json = await res.json();

//         let arr: any[] = [];

//         if (Array.isArray(json)) arr = json;
//         else if (json.results) arr = json.results;
//         else if (json.data) arr = json.data;
//         else if (json.testimonials) arr = json.testimonials;

//         const processed: TestimonialItem[] = arr.map((item, i) => {
//           let img = item.image;

//           if (img && !img.startsWith("http")) {
//             img = `${BASE_URL}${img}`;
//           }

//           return {
//             id: item.id,
//             name: item.name,
//             review: item.review,
//             image: img,
//             rating: item.rating || 0,
//             variant: i % 2 === 0 ? "white" : "color",
//           };
//         });

//         let final = processed;

//         if (final.length > 0 && final.length < 6) {
//           final = [...final, ...final, ...final];
//         }

//         setData(final);
//       } catch (err) {
//         console.error("Testimonial fetch error:", err);
//         setData([]);
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadData();
//   }, []);

//   if (loading)
//     return (
//       <div className="py-20 text-center text-[var(--color-muted-light)]">
//         Loading...
//       </div>
//     );

//   if (!data.length)
//     return (
//       <div className="text-center text-[var(--color-muted-light)]">
//         No reviews
//       </div>
//     );

//   const mid = Math.ceil(data.length / 2);
//   const row1 = data.slice(0, mid);
//   const row2 = data.slice(mid);

//   const marquee1 = [...row1, ...row1];
//   const marquee2 = [...row2, ...row2];

//   return (
//     <div className="w-full overflow-hidden">

//       <style>{`
//         @keyframes marqueeLeft {
//           0% { transform: translateX(0); }
//           100% { transform: translateX(-50%); }
//         }

//         @keyframes marqueeRight {
//           0% { transform: translateX(-50%); }
//           100% { transform: translateX(0); }
//         }

//         .marquee-left { animation: marqueeLeft 40s linear infinite; }
//         .marquee-right { animation: marqueeRight 40s linear infinite; }
//       `}</style>

//       {/* row 1 */}
//       <div className={`mb-10 ${rowPadding} overflow-hidden`}>
//         <div className="flex w-max marquee-left">
//           {marquee1.map((item, i) => (
//             <TestimonialCard key={i} item={item} />
//           ))}
//         </div>
//       </div>

//       {/* row 2 */}
//       {marquee2.length > 0 && (
//         <div className={rowPadding}>
//           <div className="flex w-max marquee-right">
//             {marquee2.map((item, i) => (
//               <TestimonialCard key={i} item={item} />
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default TestimonialSection;


// //no scroll
// "use client";
// import React, { useState, useEffect } from "react";
// import { FaQuoteRight, FaStar } from "react-icons/fa";
// import { API, BASE_URL } from "@/lib/api";

// type TestimonialItem = {
//   id: number;
//   name: string;
//   review: string;
//   image: string;
//   rating?: number;
//   variant?: "white" | "color";
// };

// const rowPadding = "p-3";

// // ================= CARD =================
// const TestimonialCard = ({ item }: { item: TestimonialItem }) => {
//   if (!item) return null;

//   const isColor = item.variant === "color";

//   return (
//     <div
//       className={`relative shrink-0 w-[300px] sm:w-[330px] md:w-[360px] h-[260px]
//       px-8 py-8 rounded-xl mx-2 flex flex-col justify-between text-center
//       transition-all duration-300 hover:-translate-y-2 shadow-md overflow-hidden
//       ${isColor
//           ? "bg-gradient-to-r from-[var(--color-accent-purple)] to-[var(--color-primary-dark)] text-white"
//           : "bg-white text-[var(--color-muted)] border border-[var(--color-border-light)]"
//         }`}
//     >
//       {/* quote icon */}
//       <FaQuoteRight
//         className={`absolute top-6 right-6 text-2xl opacity-30 ${isColor ? "text-white" : "text-gray-300"
//           }`}
//       />

//       {/* ⭐ Dynamic Rating Stars */}
//       <div className="flex justify-center gap-1 mb-2">
//         {[...Array(5)].map((_, i) => (
//           <FaStar
//             key={i}
//             className={`text-sm ${i < (item.rating || 0)
//               ? "text-yellow-400"
//               : "text-gray-300"
//               }`}
//           />
//         ))}
//       </div>

//       {/* review */}
//       <p
//         className={`text-sm leading-relaxed break-words whitespace-normal line-clamp-5
//         ${isColor ? "text-blue-50" : "text-[var(--color-muted)]"
//           }`}
//       >
//         {item.review}
//       </p>

//       {/* user */}
//       <div className="flex items-center justify-center gap-3 mt-4">
//         <img
//           src={item.image}
//           alt={item.name}
//           className="w-10 h-10 rounded-full object-cover"
//           onError={(e: any) => {
//             e.target.src = `https://ui-avatars.com/api/?name=${item.name}`;
//           }}
//         />

//         <div className="text-left">
//           <h4
//             className={`text-sm font-semibold ${isColor ? "text-white" : "text-[var(--color-dark)]"
//               }`}
//           >
//             {item.name}
//           </h4>

//           <p
//             className={`text-xs ${isColor ? "text-blue-200" : "text-[var(--color-muted-light)]"
//               }`}
//           >
//             Student
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// // ================= MAIN =================
// const TestimonialSection = () => {
//   const [data, setData] = useState<TestimonialItem[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const loadData = async () => {
//       try {
//         const res = await fetch(API.TESTIMONIALS.LIST, {
//           cache: "no-store",
//         });

//         const json = await res.json();

//         let arr: any[] = [];

//         if (Array.isArray(json)) arr = json;
//         else if (json.results) arr = json.results;
//         else if (json.data) arr = json.data;
//         else if (json.testimonials) arr = json.testimonials;

//         const processed: TestimonialItem[] = arr.map((item, i) => {
//           let img = item.image;

//           if (img && !img.startsWith("http")) {
//             img = `${BASE_URL}${img}`;
//           }

//           return {
//             id: item.id,
//             name: item.name,
//             review: item.review,
//             image: img,
//             rating: item.rating || 0,
//             variant: i % 2 === 0 ? "white" : "color",
//           };
//         });

//         let final = processed;

//         if (final.length > 0 && final.length < 6) {
//           final = [...final, ...final, ...final];
//         }

//         setData(final);
//       } catch (err) {
//         console.error("Testimonial fetch error:", err);
//         setData([]);
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadData();
//   }, []);

//   if (loading)
//     return (
//       <div className="py-20 text-center text-[var(--color-muted-light)]">
//         Loading...
//       </div>
//     );

//   if (!data.length)
//     return (
//       <div className="text-center text-[var(--color-muted-light)]">
//         No reviews
//       </div>
//     );

//   const mid = Math.ceil(data.length / 2);
//   const row1 = data.slice(0, mid);
//   const row2 = data.slice(mid);

//   const marquee1 = [...row1, ...row1, ...row1];
//   const marquee2 = [...row2, ...row2, ...row2];

//   return (
//     <div className="w-full overflow-hidden">
//       <style>{`
//         @keyframes marqueeLeft {
//           0% { transform: translateX(0); }
//           100% { transform: translateX(-33.33%); }
//         }

//         @keyframes marqueeRight {
//           0% { transform: translateX(-33.33%); }
//           100% { transform: translateX(0); }
//         }

//         .marquee-container {
//           width: 100%;
//           overflow: hidden;
//           position: relative;
//         }

//       .marquee-track-left {
//   display: flex;
//   gap: 16px;
//   width: fit-content;
//   animation: marqueeLeft 40s linear infinite;
//   will-change: transform;
// }

// .marquee-track-right {
//   display: flex;
//   gap: 16px;
//   width: fit-content;
//   animation: marqueeRight 40s linear infinite;
//   will-change: transform;
// }

//         /* Pause on hover */
//         .marquee-container:hover .marquee-track-left,
//         .marquee-container:hover .marquee-track-right {
//           animation-play-state: paused;
//         }

//         /* Responsive card width */
//         @media (max-width: 640px) {
//           .testimonial-card {
//             width: 280px !important;
//           }
//         }
//       `}</style>

//       {/* row 1 - Left to Right */}
//       <div className={`mb-10 ${rowPadding} marquee-container`}>
//         <div className="marquee-track-left">
//           {marquee1.map((item, i) => (
//             <div key={`row1-${i}-${item.id}`} className="testimonial-card">
//               <TestimonialCard item={item} />
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* row 2 - Right to Left */}
//       {marquee2.length > 0 && (
//         <div className={`${rowPadding} marquee-container`}>
//           <div className="marquee-track-right">
//             {marquee2.map((item, i) => (
//               <div key={`row2-${i}-${item.id}`} className="testimonial-card">
//                 <TestimonialCard item={item} />
//               </div>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default TestimonialSection;


//no scroll

"use client";
import React, { useState, useEffect } from "react";
import { FaQuoteRight, FaStar } from "react-icons/fa";
import { API, BASE_URL } from "@/lib/api";

type TestimonialItem = {
  id: number;
  name: string;
  review: string;
  image: string;
  rating?: number;
  variant?: "white" | "color";
};

const rowPadding = "p-3";

// ================= CARD =================
const TestimonialCard = ({ item }: { item: TestimonialItem }) => {
  if (!item) return null;

  const isColor = item.variant === "color";

  return (
    <div
      className={`relative shrink-0 w-[300px] sm:w-[330px] md:w-[360px] h-[260px]
      px-8 py-8 rounded-xl mx-2 flex flex-col justify-between text-center
      transition-all duration-300 hover:-translate-y-2 shadow-md overflow-hidden
      ${isColor
          ? "bg-gradient-to-r from-[var(--color-accent-purple)] to-[var(--color-primary-dark)] text-white"
          : "bg-white text-[var(--color-muted)] border border-[var(--color-border-light)]"
        }`}
    >
      {/* quote icon */}
      <FaQuoteRight
        className={`absolute top-6 right-6 text-2xl opacity-30 ${isColor ? "text-white" : "text-gray-300"
          }`}
      />

      {/* ⭐ Dynamic Rating Stars */}
      {/* <div className="flex justify-center gap-1 mb-2">
        {[...Array(5)].map((_, i) => (
          <FaStar
            key={i}
            className={`text-sm ${i < (item.rating || 0)
              ? "text-yellow-400"
              : "text-gray-300"
              }`}
          />
        ))}
      </div> */}
      <div className="flex justify-center gap-1 mb-2">
        {[...Array(5)].map((_, i) => (
          <span
            key={i}
            className={`text-sm ${i < (item.rating || 0)
              ? "text-yellow-400"
              : "text-gray-300"
              }`}
          >
            ★
          </span>
        ))}
      </div>
      {/* review */}
      <p
        className={`text-sm leading-relaxed break-words whitespace-normal line-clamp-5
        ${isColor ? "text-blue-50" : "text-[var(--color-muted)]"
          }`}
      >
        {item.review}
      </p>

      {/* user */}
      <div className="flex items-center justify-center gap-3 mt-4">
        {/* <img
          src={item.image}
          alt={item.name}
          className="w-10 h-10 rounded-full object-cover"
          onError={(e: any) => {
            e.target.src = `https://ui-avatars.com/api/?name=${item.name}`;
          }}
        /> */}
{item.image ? (
  <img
    src={item.image}
    alt={item.name}
    className="w-10 h-10 rounded-full object-cover"
    onError={(e: any) => {
      e.target.src = `https://ui-avatars.com/api/?name=${item.name}`;
    }}
  />
) : (
  <div className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold uppercase">
    {item.name?.charAt(0)}
  </div>
)}
        <div className="text-left">
          <h4
            className={`text-sm font-semibold ${isColor ? "text-white" : "text-[var(--color-dark)]"
              }`}
          >
            {item.name}
          </h4>

          <p
            className={`text-xs ${isColor ? "text-blue-200" : "text-[var(--color-muted-light)]"
              }`}
          >
            Student
          </p>
        </div>
      </div>
    </div>
  );
};

// ================= MAIN =================
const TestimonialSection = () => {
  const [data, setData] = useState<TestimonialItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await fetch(API.TESTIMONIALS.LIST, {
          cache: "no-store",
        });

        const json = await res.json();

        let arr: any[] = [];

        if (Array.isArray(json)) arr = json;
        else if (json.results) arr = json.results;
        else if (json.data) arr = json.data;
        else if (json.testimonials) arr = json.testimonials;

        const processed: TestimonialItem[] = arr.map((item, i) => {
          let img = item.image;

          if (img && !img.startsWith("http")) {
            img = `${BASE_URL}${img}`;
          }

          return {
            id: item.id,
            name: item.name,
            review: item.review,
            image: img,
            rating: item.rating || 0,
            variant: i % 2 === 0 ? "white" : "color",
          };
        });

        let final = processed;

        if (final.length > 0 && final.length < 6) {
          final = [...final, ...final, ...final];
        }

        setData(final);
      } catch (err) {
        console.error("Testimonial fetch error:", err);
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading)
    return (
      <div className="py-20 text-center">
        <div className="flex flex-col items-center gap-6">
          {/* Spinner with gradient border */}
          <div className="relative">
            <div className="w-16 h-16 border-4 border-gray-200 border-t-blue-500 border-r-purple-500 border-b-pink-500 border-l-transparent rounded-full animate-spin"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse"></div>
            </div>
          </div>

          {/* Text with dots */}
          <div className="flex items-center gap-1 text-gray-600 font-medium">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent text-lg">
              Loading
            </span>
            <span className="text-blue-600 animate-bounce [animation-delay:-0.3s] text-lg">.</span>
            <span className="text-purple-600 animate-bounce [animation-delay:-0.15s] text-lg">.</span>
            <span className="text-pink-600 animate-bounce text-lg">.</span>
          </div>
        </div>
      </div>
    );

  if (!data.length)
    return (
      <div className="text-center text-[var(--color-muted-light)]">
        No reviews
      </div>
    );

  const mid = Math.ceil(data.length / 2);
  const row1 = data.slice(0, mid);
  const row2 = data.slice(mid);

  const marquee1 = [...row1, ...row1, ...row1];
  const marquee2 = [...row2, ...row2, ...row2];

  return (
    <div className="w-full overflow-hidden">
      <style>{`
        @keyframes marqueeLeft {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.33%); }
        }
 
        @keyframes marqueeRight {
          0% { transform: translateX(-33.33%); }
          100% { transform: translateX(0); }
        }
      `}</style>

      {/* row 1 - Left to Right */}
      <div className={`${rowPadding} marquee-container relative w-full overflow-hidden mb-10`}>
        <div
          className="flex gap-2 sm:gap-3 md:gap-2 lg:gap-1 w-fit animate-[marqueeLeft_90s_linear_infinite] hover:[animation-play-state:paused] will-change-transform"
        >
          {marquee1.map((item, i) => (
            <div key={`row1-${i}-${item.id}`}>
              <TestimonialCard item={item} />
            </div>
          ))}
        </div>
      </div>

      {/* row 2 - Right to Left */}
      {marquee2.length > 0 && (
        <div className={`${rowPadding} marquee-container relative w-full overflow-hidden`}>
          <div
            className="flex gap-2 sm:gap-3 md:gap-2 lg:gap-1 w-fit animate-[marqueeRight_90s_linear_infinite] hover:[animation-play-state:paused] will-change-transform"
          >
            {marquee2.map((item, i) => (
              <div key={`row2-${i}-${item.id}`}>
                <TestimonialCard item={item} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TestimonialSection;