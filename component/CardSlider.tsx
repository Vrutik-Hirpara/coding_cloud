// "use client";

// import { useState, useRef } from "react";
// import Image from "next/image";

// export default function CardSlider() {
//   const [cards, setCards] = useState([
//     {
//       id: 1,
//       title: "React",
//       desc: "It is a long established fact that a reader will be distracted.",
//       lessons: 12,
//       students: 50,
//       color: "linear-gradient(135deg, #a78bfa 0%, #8b5cf6 100%)",
//       price: 70,
//       oldPrice: 120,
//       rating: 15,
//       tag: "-40% Off",
//     },
//     {
//       id: 2,
//       title: "JavaScript",
//       desc: "Mastering the web language.",
//       lessons: 18,
//       students: 120,
//       color: "linear-gradient(135deg, #34d399 0%, #10b981 100%)",
//       price: 60,
//       oldPrice: 100,
//       rating: 20,
//       tag: "Popular",
//     },
//     {
//       id: 3,
//       title: "UI/UX Design",
//       desc: "Designing for user experience.",
//       lessons: 20,
//       students: 80,
//       color: "linear-gradient(135deg, #f472b6 0%, #ec4899 100%)",
//       price: 50,
//       oldPrice: 90,
//       rating: 18,
//       tag: "New",
//     },
//   ]);

//   const [dragX, setDragX] = useState(0);
//   const [isDragging, setIsDragging] = useState(false);
//   const startX = useRef(0);

//   const handleMouseDown = (e: any) => {
//     setIsDragging(true);
//     startX.current = e.clientX;
//   };

//   const handleMouseMove = (e: any) => {
//     if (!isDragging) return;
//     setDragX(e.clientX - startX.current);
//   };

//   const handleMouseUp = () => {
//     setIsDragging(false);
//     if (dragX > 100 || dragX < -100) {
//       setCards((prev) => {
//         const arr = [...prev];
//         arr.push(arr.shift()!);
//         return arr;
//       });
//     }
//     setDragX(0);
//   };

//   return (
//     <div className="w-full h-[450px] flex items-center justify-center relative">
//       <div
//         className="relative w-[280px] h-[380px] cursor-grab active:cursor-grabbing"
//         onMouseDown={handleMouseDown}
//         onMouseMove={handleMouseMove}
//         onMouseUp={handleMouseUp}
//         onMouseLeave={handleMouseUp}
//       >
//         {cards.map((card, index) => {
//           let style: any = {};

//           if (index === 0) {
//             style = {
//               zIndex: 3,
//               transform: isDragging
//                 ? `translateX(${dragX}px) rotate(${dragX * 0.05}deg)`
//                 : "translateX(0)",
//               transition: isDragging ? "none" : "transform 0.3s",
//             };
//           } else if (index === 1) {
//             style = {
//               zIndex: 2,
//               transform: "translateX(15px) translateY(15px) scale(0.95)",
//             };
//           } else {
//             style = {
//               zIndex: 1,
//               opacity: 0.5,
//               transform: "translateX(30px) translateY(30px) scale(0.9)",
//             };
//           }

//           if (index > 2) return null;

//           return (
//             <div
//               key={card.id}
//               style={style}
//               className="absolute top-0 left-0 w-full h-full bg-[var(--color-white)] rounded-2xl shadow-xl overflow-hidden border"
//             >
//               {/* HEADER */}
//               <div
//                 className="h-[160px] p-5 relative text-[var(--color-white)]"
//                 style={{ background: card.color }}
//               >
//                 <h3 className="text-sm font-bold w-2/3 leading-snug">
//                   Difficult Things About Education.
//                 </h3>

//                 <span className="absolute bottom-4 left-4 text-xs bg-[var(--color-white)]/20 px-2 py-1 rounded">
//                   {card.lessons} Class
//                 </span>

//                 <div className="absolute top-4 right-4 w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center text-xs font-bold border border-dashed border-white">
//                   {card.tag}
//                 </div>

//                 <div className="absolute bottom-4 right-4 w-16 h-16 rounded-full overflow-hidden border-2 border-white">
//                   <Image
//                     src="https://i.pravatar.cc/300?img=5"
//                     alt="avatar"
//                     width={64}
//                     height={64}
//                   />
//                 </div>
//               </div>

//               {/* BODY */}
//               <div className="p-5 text-sm">
//                 <div className="flex justify-between text-[var(--color-muted-light)] text-xs mb-2">
//                   <span>{card.lessons} Lessons</span>
//                   <span>{card.students} Students</span>
//                 </div>

//                 <h2 className="text-xl font-bold">{card.title}</h2>

//                 <p className="text-[var(--color-muted)] text-xs">{card.desc}</p>

//                 <div className="text-[var(--color-accent-yellow-light)] my-2">
//                   ⭐⭐⭐⭐⭐ ({card.rating})
//                 </div>

//                 <div className="flex justify-between items-center border-t pt-3 mt-3">
//                   <div>
//                     <span className="font-bold text-lg">${card.price}</span>
//                     <span className="text-[var(--color-muted-light)] line-through ml-2 text-xs">
//                       ${card.oldPrice}
//                     </span>
//                   </div>

//                   <button className="text-sm text-[var(--color-accent-indigo)] font-semibold">
//                     Learn More →
//                   </button>
//                 </div>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }
//maru

// "use client";

// import { useState, useRef } from "react";
// import Image from "next/image";

// export default function CardSlider() {
//   const [cards, setCards] = useState([
//     {
//       id: 1,
//       title: "React",
//       desc: "It is a long established fact that a reader will be distracted.",
//       lessons: 12,
//       students: 50,
//       color: "linear-gradient(135deg, #a78bfa 0%, #8b5cf6 100%)",
//       price: 70,
//       oldPrice: 120,
//       rating: 15,
//       tag: "-40% Off",
//     },
//     {
//       id: 2,
//       title: "JavaScript",
//       desc: "Mastering the web language.",
//       lessons: 18,
//       students: 120,
//       color: "linear-gradient(135deg, #34d399 0%, #10b981 100%)",
//       price: 60,
//       oldPrice: 100,
//       rating: 20,
//       tag: "Popular",
//     },
//     {
//       id: 3,
//       title: "UI/UX Design",
//       desc: "Designing for user experience.",
//       lessons: 20,
//       students: 80,
//       color: "linear-gradient(135deg, #f472b6 0%, #ec4899 100%)",
//       price: 50,
//       oldPrice: 90,
//       rating: 18,
//       tag: "New",
//     },
//   ]);

//   const [dragX, setDragX] = useState(0);
//   const [isDragging, setIsDragging] = useState(false);
//   const startX = useRef(0);

//   const handleMouseDown = (e: any) => {
//     setIsDragging(true);
//     startX.current = e.clientX;
//   };

//   const handleMouseMove = (e: any) => {
//     if (!isDragging) return;
//     setDragX(e.clientX - startX.current);
//   };

//   const handleMouseUp = () => {
//     setIsDragging(false);
//     if (dragX > 120 || dragX < -120) {
//       setCards((prev) => {
//         const arr = [...prev];
//         arr.push(arr.shift()!);
//         return arr;
//       });
//     }
//     setDragX(0);
//   };

//   return (
//     <div className="w-full h-[520px] flex items-center justify-center relative">
//       <div
//         className="relative w-[340px] h-[460px] cursor-grab active:cursor-grabbing"
//         onMouseDown={handleMouseDown}
//         onMouseMove={handleMouseMove}
//         onMouseUp={handleMouseUp}
//         onMouseLeave={handleMouseUp}
//       >
//         {cards.map((card, index) => {
//           let style: any = {};

//           if (index === 0) {
//             style = {
//               zIndex: 3,
//               transform: isDragging
//                 ? `translateX(${dragX}px) rotate(${dragX * 0.05}deg)`
//                 : "translateX(0)",
//               transition: isDragging ? "none" : "transform 0.3s",
//             };
//           } else if (index === 1) {
//             style = {
//               zIndex: 2,
//               transform: "translateX(20px) translateY(20px) scale(0.96)",
//             };
//           } else {
//             style = {
//               zIndex: 1,
//               opacity: 0.5,
//               transform: "translateX(40px) translateY(40px) scale(0.9)",
//             };
//           }

//           if (index > 2) return null;

//           return (
//             <div
//               key={card.id}
//               style={style}
//               className="absolute top-0 left-0 w-full h-full bg-[var(--color-white)] rounded-2xl shadow-2xl overflow-hidden border"
//             >
//               {/* HEADER */}
//               <div
//                 className="h-[190px] p-6 relative text-[var(--color-white)]"
//                 style={{ background: card.color }}
//               >
//                 <h3 className="text-base font-bold w-2/3 leading-snug">
//                   Difficult Things About Education.
//                 </h3>

//                 <span className="absolute bottom-5 left-5 text-xs bg-[var(--color-white)]/20 px-3 py-1 rounded">
//                   {card.lessons} Class
//                 </span>

//                 <div className="absolute top-5 right-5 w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center text-xs font-bold border border-dashed border-white">
//                   {card.tag}
//                 </div>

//                 <div className="absolute bottom-4 right-4 sm:bottom-5 sm:right-5 w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border-2 border-white shadow-md">
//                   <Image
//                     src="https://i.pravatar.cc/300?img=5"
//                     alt="avatar"
//                     fill
//                     sizes="(max-width: 640px) 64px, 80px"
//                     className="object-cover"
//                   />
//                 </div>
//               </div>

//               {/* BODY */}
//               <div className="p-6 text-sm">
//                 <div className="flex justify-between text-[var(--color-muted-light)] text-xs mb-3">
//                   <span>{card.lessons} Lessons</span>
//                   <span>{card.students} Students</span>
//                 </div>

//                 <h2 className="text-2xl font-bold mb-1">{card.title}</h2>

//                 <p className="text-[var(--color-muted)] text-sm mb-3">
//                   {card.desc}
//                 </p>

//                 <div className="text-[var(--color-accent-yellow-light)] mb-3 text-sm">
//                   ⭐⭐⭐⭐⭐ ({card.rating})
//                 </div>

//                 <div className="flex justify-between items-center border-t pt-4 mt-3">
//                   {/* <div>
//                     <span className="font-bold text-xl">${card.price}</span>
//                     <span className="text-[var(--color-muted-light)] line-through ml-2 text-sm">
//                       ${card.oldPrice}
//                     </span>
//                   </div> */}

//                   <button className="text-sm text-[var(--color-accent-indigo)] font-semibold">
//                     Learn More →
//                   </button>
//                 </div>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }




//mansi

// "use client";

// import { useState, useRef, useEffect } from "react";
// import Image from "next/image";
// import { useRouter } from "next/navigation";
// import { BASE_URL } from "@/lib/api";
// export default function CardSlider({ courses = [] }: { courses?: any[] }) {

//   const [cards, setCards] = useState<any[]>([]);
//   const [dragX, setDragX] = useState(0);
//   const [isDragging, setIsDragging] = useState(false);
//   const startX = useRef(0);
//   const router = useRouter();
//   // 🔥 convert API courses to slider cards
//   useEffect(() => {
//     if (!courses.length) return;

//     const mapped = courses.map((course: any) => ({
//       id: course.id,
//       slug: course.slug,
//       title: course.name,
//       desc: course.text?.replace(/<[^>]+>/g, "").slice(0, 80),
//       lessons: Number(course.lecture) || 0,
//       students: course.students,
//       rating: course.rating,
//       tag: course.level || "Course",
//       image: `${BASE_URL}${course.image}`,
//     }));

//     setCards(mapped);
//   }, [courses]);

//   const handleMouseDown = (e: any) => {
//     setIsDragging(true);
//     startX.current = e.clientX;
//   };

//   const handleMouseMove = (e: any) => {
//     if (!isDragging) return;
//     setDragX(e.clientX - startX.current);
//   };

//   const handleMouseUp = () => {
//     setIsDragging(false);

//     if (dragX > 120 || dragX < -120) {
//       setCards((prev: any[]) => {
//         const arr = [...prev];
//         arr.push(arr.shift()!);
//         return arr;
//       });
//     }

//     setDragX(0);
//   };

//   return (
//     <div className="w-full h-[520px] flex items-center justify-center relative">
//       <div
//         className="relative w-[300px] h-[460px] cursor-grab active:cursor-grabbing"
//         onMouseDown={handleMouseDown}
//         onMouseMove={handleMouseMove}
//         onMouseUp={handleMouseUp}
//         onMouseLeave={handleMouseUp}
//       >
//         {cards.map((card, index) => {

//           let style: any = {};

//           if (index === 0) {
//             style = {
//               zIndex: 3,
//               transform: isDragging
//                 ? `translateX(${dragX}px) rotate(${dragX * 0.05}deg)`
//                 : "translateX(0)",
//               transition: isDragging ? "none" : "transform 0.3s",
//             };
//           } else if (index === 1) {
//             style = {
//               zIndex: 2,
//               transform: "translateX(20px) translateY(20px) scale(0.96)",
//             };
//           } else {
//             style = {
//               zIndex: 1,
//               opacity: 0.5,
//               transform: "translateX(40px) translateY(40px) scale(0.9)",
//             };
//           }

//           if (index > 2) return null;

//           return (
//             <div
//               key={card.id}
//               style={style}
//               className="absolute top-0 left-0 w-full h-full bg-[var(--color-white)] rounded-2xl shadow-2xl overflow-hidden border"
//             >
//               {/* HEADER */}
//               {/* <div className="h-[190px] relative overflow-hidden">
//                 <Image
//                   src={card.image}
//                   alt={card.title}
//                   fill
//                   className="object-contain"
//                 /> */}
//               {/* 10:35 11-03-2026 */}
//               <div className="h-[190px] relative overflow-hidden">
//                 <Image
//                   src={card.image}
//                   alt={card.title}
//                   fill
//                   className="object-fill"
//                 />


//                 <div className="absolute inset-0 p-6 text-white">




//                   <div className="absolute top-5 right-5 w-20 h-10 bg-indigo-600 rounded-md flex items-center justify-center text-xs font-bold border border border-white">
//                     {card.tag}
//                   </div>

//                   {/* <div className="absolute bottom-4 right-4 sm:bottom-5 sm:right-5 w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border-2 border-white shadow-md">
//                   <Image
//                     src="https://i.pravatar.cc/300?img=5"
//                     alt="avatar"
//                     fill
//                     sizes="(max-width: 640px) 64px, 80px"
//                     className="object-cover"
//                   />
//                 </div> */}
//                 </div>
//               </div>

//               {/* BODY */}
//               <div className="p-6 text-sm">
//                 <div className="flex justify-between text-[var(--color-muted-light)] text-xs mb-3">
//                   <span>{card.lessons} Lessons</span>
//                   <span>{card.students} Students</span>
//                 </div>

//                 <h2 className="text-2xl font-bold mb-1">{card.title}</h2>

//                 <p className="text-[var(--color-muted)] text-sm mb-3">
//                   {card.desc}
//                 </p>

//                 <div className="text-[var(--color-accent-yellow-light)] mb-3 text-sm">
//                   ★ {card.rating} / 5
//                 </div>

//                 <div className="flex justify-between items-center border-t pt-4 mt-3">
//                   <button
//                     onClick={() => router.push(`/courses/${card.slug}`)}
//                     className="text-sm text-[var(--color-accent-indigo)] font-semibold"
//                   >
//                     Learn More →
//                   </button>
//                 </div>
//               </div>
//             </div>

//           );
//         })}

//       </div>
//     </div>
//   );
// }

// "use client";

// import { useState, useRef, useEffect } from "react";
// import Image from "next/image";
// import { useRouter } from "next/navigation";
// import { BASE_URL } from "@/lib/api";

// export default function CardSlider({ courses = [] }: { courses?: any[] }) {
//   const [cards, setCards] = useState<any[]>([]);
//   const [isAnimating, setIsAnimating] = useState(false);
//   const [dragX, setDragX] = useState(0);
//   const [nextCardX, setNextCardX] = useState(25); // Slightly more offset
//   const router = useRouter();
//   const timeoutRef = useRef<NodeJS.Timeout>();

//   // 🔥 convert API courses to slider cards
//   useEffect(() => {
//     if (!courses.length) return;

//     const mapped = courses.map((course: any) => ({
//       id: course.id,
//       slug: course.slug,
//       title: course.name,
//       desc: course.text?.replace(/<[^>]+>/g, "").slice(0, 70), // Shorter desc
//       lessons: Number(course.lecture) || 0,
//       students: course.students,
//       rating: course.rating,
//       tag: course.level || "Course",
//       image: `${BASE_URL}${course.image}`,
//     }));

//     setCards(mapped);
//   }, [courses]);

//   // Auto slide every 2 seconds
//   useEffect(() => {
//     if (cards.length === 0 || isAnimating) return;

//     const startAutoSlide = () => {
//       timeoutRef.current = setTimeout(() => {
//         // Start animation
//         setIsAnimating(true);

//         let startTime: number;
//         const duration = 800; // Slightly faster animation

//         const animate = (timestamp: number) => {
//           if (!startTime) startTime = timestamp;
//           const progress = (timestamp - startTime) / duration;

//           if (progress < 1) {
//             // Ease-in effect for dramatic disappear
//             const easeProgress = Math.pow(progress, 1.5);

//             // Front card drag to right (positive value)
//             setDragX(350 * easeProgress);

//             // Next card moves from right to left
//             setNextCardX(25 - (20 * easeProgress));

//             requestAnimationFrame(animate);
//           } else {
//             // Animation complete - card disappears instantly
//             setDragX(0);
//             setNextCardX(25); // Reset to right

//             // Rotate cards
//             setCards((prev: any[]) => {
//               const arr = [...prev];
//               const firstCard = arr.shift()!;
//               arr.push(firstCard);
//               return arr;
//             });

//             setIsAnimating(false);
//           }
//         };

//         requestAnimationFrame(animate);
//       }, 2000);
//     };

//     startAutoSlide();

//     return () => {
//       if (timeoutRef.current) {
//         clearTimeout(timeoutRef.current);
//       }
//     };
//   }, [cards.length, isAnimating]);

//   // Pause on hover
//   const handleMouseEnter = () => {
//     if (timeoutRef.current) {
//       clearTimeout(timeoutRef.current);
//     }
//   };

//   const handleMouseLeave = () => {
//     if (!isAnimating) {
//       timeoutRef.current = setTimeout(() => {
//         setIsAnimating(true);

//         let startTime: number;
//         const duration = 800;

//         const animate = (timestamp: number) => {
//           if (!startTime) startTime = timestamp;
//           const progress = (timestamp - startTime) / duration;

//           if (progress < 1) {
//             const easeProgress = Math.pow(progress, 1.5);
//             setDragX(350 * easeProgress);
//             setNextCardX(25 - (20 * easeProgress));
//             requestAnimationFrame(animate);
//           } else {
//             setDragX(0);
//             setNextCardX(25);
//             setCards((prev: any[]) => {
//               const arr = [...prev];
//               const firstCard = arr.shift()!;
//               arr.push(firstCard);
//               return arr;
//             });
//             setIsAnimating(false);
//           }
//         };

//         requestAnimationFrame(animate);
//       }, 2000);
//     }
//   };

//   return (
//     <div className="w-full min-h-[550px] flex items-center justify-center relative overflow-visible py-8">
//       <div 
//         className="relative w-[320px] h-[450px] cursor-pointer"
//         onMouseEnter={handleMouseEnter}
//         onMouseLeave={handleMouseLeave}
//       >
//         {cards.slice(0, 3).map((card, index) => {
//           let style: any = {};

//           if (index === 0) {
//             // Front card - SLIDING RIGHT and then DISAPPEAR
//             style = {
//               zIndex: 3,
//               transform: `translateX(${dragX}px) translateY(${dragX * 0.1}px) scale(${1 - (dragX * 0.001)})`,
//               rotate: `${dragX * 0.05}deg`,
//               opacity: dragX > 300 ? 0 : 1 - (dragX * 0.003), // Fade out at the end
//               boxShadow: '0 15px 25px rgba(0,0,0,0.15)',
//               transition: "none",
//             };
//           } else if (index === 1) {
//             // Second card - SLIGHTLY LOWER AND SMALLER
//             style = {
//               zIndex: 2,
//               transform: `translateX(${nextCardX}px) translateY(22px) scale(0.94)`,
//               opacity: 0.9,
//               boxShadow: '0 12px 20px rgba(0,0,0,0.12)',
//               transition: "none",
//             };
//           } else if (index === 2) {
//             // Third card - EVEN LOWER AND SMALLER
//             style = {
//               zIndex: 1,
//               transform: "translateX(42px) translateY(40px) scale(0.88)",
//               opacity: 0.7,
//               boxShadow: '0 8px 15px rgba(0,0,0,0.08)',
//               transition: "none",
//             };
//           }

//           return (
//             <div
//               key={card.id}
//               style={style}
//               className="absolute top-0 left-0 w-full h-full bg-white rounded-xl overflow-hidden border border-gray-200"
//             >
//               {/* IMAGE SECTION - Smaller height */}
//               <div className="h-[170px] relative overflow-hidden">
//                 <Image
//                   src={card.image}
//                   alt={card.title}
//                   fill
//                   className="object-cover"
//                   sizes="320px"
//                   priority={index === 0}
//                 />

//                 {/* TAG - Smaller */}
//                 <div className="absolute top-3 right-3 z-10">
//                   <span className="px-3 py-1.5 bg-indigo-600 text-white text-xs font-bold rounded-md border border-white shadow-md">
//                     {card.tag}
//                   </span>
//                 </div>
//               </div>

//               {/* CONTENT - Tighter spacing */}
//               <div className="p-4">
//                 {/* Stats */}
//                 <div className="flex justify-between text-gray-500 text-xs mb-2">
//                   <span>📚 {card.lessons} Lessons</span>
//                   <span>👥 {card.students} Students</span>
//                 </div>

//                 {/* Title - Smaller */}
//                 <h3 className="text-lg font-bold text-gray-800 mb-1 line-clamp-1">
//                   {card.title}
//                 </h3>

//                 {/* Description - Shorter */}
//                 <p className="text-gray-600 text-xs mb-2 line-clamp-2">
//                   {card.desc}
//                 </p>

//                 {/* Rating - Smaller */}
//                 <div className="text-yellow-500 text-sm mb-3">
//                   {'★'.repeat(5)} <span className="text-gray-600 text-xs ml-1">{card.rating || 4.5}/5</span>
//                 </div>

//                 {/* Button - Smaller */}
//                 <div className="border-t pt-3">
//                   <button
//                     onClick={() => router.push(`/courses/${card.slug}`)}
//                     className="text-indigo-600 font-semibold text-xs hover:text-indigo-800 transition-colors flex items-center gap-1"
//                   >
//                     Learn More <span className="text-sm">→</span>
//                   </button>
//                 </div>
//               </div>
//             </div>
//           );
//         })}
//       </div>

//       {/* Timer Dots - Smaller */}
//       <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex gap-1.5">
//         {cards.slice(0, 5).map((_, i) => (
//           <div
//             key={i}
//             className={`h-1.5 rounded-full transition-all duration-300 ${
//               !isAnimating && i === 0
//                 ? "w-5 bg-indigo-600"
//                 : "w-1.5 bg-gray-300"
//             }`}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }




"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { BASE_URL } from "@/lib/api";

// ============ INTERFACES ============
interface Course {
  id: number;
  slug?: string;
  name?: string;
  text?: string;
  lecture?: string | number;
  students?: string | number;
  rating?: number;
  level?: string;
  image?: string;
  
kids_course? : boolean
}

interface Card {
  id: number;
  slug: string;
  title: string;
  desc: string;
  lessons: number;
  students: string | number;
  rating: number;
  tag: string;
  image: string;
}

interface CardSliderProps {
  courses?: Course[];
}

// ============ MAIN COMPONENT ============
export default function CardSlider({ courses = [] }: CardSliderProps) {
  const [cards, setCards] = useState<Card[]>([]);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [dragX, setDragX] = useState<number>(0);
  const [nextCardX, setNextCardX] = useState<number>(25);

  const router = useRouter();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // 🔥 Convert API courses to slider cards with SAFETY CHECKS
  useEffect(() => {
    if (!courses || !Array.isArray(courses) || courses.length === 0) {
      setCards([]);
      return;
    }

    // console.log("Mapping courses to cards:", courses); // Debug log

    const mapped: Card[] = courses
      .filter((course): course is Course => course !== null && typeof course === 'object' && 'id' in course && course.kids_course !== true)
      .map((course: Course) => ({
        id: course.id,
        slug: course.slug || '',
        title: course.name || 'Untitled Course',
        desc: course.text?.replace(/<[^>]+>/g, "").slice(0, 70) || 'No description available',
        lessons: Number(course.lecture) || 0,
        students: course.students || '0',
        rating: course.rating || 0,
        tag: course.level || 'Course',
        image: course.image
          ? course.image.startsWith('http')
            ? course.image
            : `${BASE_URL}${course.image}`
          : '/images/placeholder-course.jpg', // FALLBACK IMAGE
      }));
      // console.log(mapped,"mapped")
    setCards(mapped);
  }, [courses]);

  // Auto slide every 2 seconds
  useEffect(() => {
    if (!cards || cards.length === 0 || isAnimating) return;

    const startAutoSlide = () => {
      timeoutRef.current = setTimeout(() => {
        setIsAnimating(true);

        let startTime: number | null = null;
        const duration = 800; // 0.8 seconds

        const animate = (timestamp: number) => {
          if (!startTime) startTime = timestamp;
          const progress = (timestamp - startTime) / duration;

          if (progress < 1) {
            const easeProgress = Math.pow(progress, 1.5); // Ease-in effect
            setDragX(350 * easeProgress);
            setNextCardX(25 - (20 * easeProgress));
            requestAnimationFrame(animate);
          } else {
            // Animation complete
            setDragX(0);
            setNextCardX(25);

            // Rotate cards safely
            setCards((prev: Card[]) => {
              if (!prev || prev.length === 0) return prev;
              const arr = [...prev];
              const firstCard = arr.shift();
              if (firstCard) {
                arr.push(firstCard);
              }
              return arr;
            });

            setIsAnimating(false);
          }
        };

        requestAnimationFrame(animate);
      }, 2000); // 2 second delay
    };

    startAutoSlide();

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [cards?.length, isAnimating]);

  // Pause on hover
  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  const handleMouseLeave = () => {
    if (!isAnimating && cards && cards.length > 0) {
      timeoutRef.current = setTimeout(() => {
        setIsAnimating(true);

        let startTime: number | null = null;
        const duration = 800;

        const animate = (timestamp: number) => {
          if (!startTime) startTime = timestamp;
          const progress = (timestamp - startTime) / duration;

          if (progress < 1) {
            const easeProgress = Math.pow(progress, 1.5);
            setDragX(350 * easeProgress);
            setNextCardX(25 - (20 * easeProgress));
            requestAnimationFrame(animate);
          } else {
            setDragX(0);
            setNextCardX(25);
            setCards((prev: Card[]) => {
              if (!prev || prev.length === 0) return prev;
              const arr = [...prev];
              const firstCard = arr.shift();
              if (firstCard) {
                arr.push(firstCard);
              }
              return arr;
            });
            setIsAnimating(false);
          }
        };

        requestAnimationFrame(animate);
      }, 2000);
    }
  };

  // Don't render if no cards
  if (!cards || cards.length === 0) {
    return (
      <div className="w-full min-h-[550px] flex items-center justify-center">
        <div className="text-center">
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
      </div>
    );
  }

  return (
    <div className="w-full min-h-[550px] flex items-center justify-center relative overflow-visible">
      <div
        className="relative w-[320px] h-[420px] cursor-pointer"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {cards.slice(0, 3).map((card, index) => {
          // console.log("Rendering card:", card); 
          // Safety check for card
          if (!card) return null;

          // Dynamic styles based on card position
          let cardStyle: React.CSSProperties = {};
          let cardClasses = "absolute top-0 left-0 w-full h-full bg-white rounded-xl overflow-hidden border border-gray-200 transition-shadow duration-300";

          if (index === 0) {
            // Front card - SLIDING RIGHT and then DISAPPEAR
            cardStyle = {
              zIndex: 3,
              transform: `translateX(${dragX}px) translateY(${dragX * 0.1}px) scale(${1 - (dragX * 0.001)}) rotate(${dragX * 0.05}deg)`,
              opacity: dragX > 300 ? 0 : 1 - (dragX * 0.003),
              boxShadow: '0 15px 25px rgba(0,0,0,0.15)',
              transition: isAnimating ? 'none' : 'transform 0.3s ease',
            };
          } else if (index === 1) {
            // Second card - SLIGHTLY LOWER AND SMALLER
            cardStyle = {
              zIndex: 2,
              transform: `translateX(${nextCardX}px) translateY(22px) scale(0.94)`,
              opacity: 0.9,
              boxShadow: '0 12px 20px rgba(0,0,0,0.12)',
              transition: 'none',
            };
          } else if (index === 2) {
            // Third card - EVEN LOWER AND SMALLER
            cardStyle = {
              zIndex: 1,
              transform: 'translateX(42px) translateY(40px) scale(0.88)',
              opacity: 0.7,
              boxShadow: '0 8px 15px rgba(0,0,0,0.08)',
              transition: 'none',
            };
          } else {
            return null;
          }

          return (
            <div
              key={card.id}
              style={cardStyle}
              className={cardClasses}
            >
              {/* IMAGE SECTION - Smaller height */}
              {/* <div className="h-[170px] relative overflow-hidden bg-gray-100">
                {card.image ? (
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    className="object-contain"
                    sizes="320px"
                    priority={index === 0}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = '/images/placeholder-course.jpg';
                    }}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600">
                    <span className="text-white text-2xl font-bold">{card.title.charAt(0)}</span>
                  </div>
                )}

                <div className="absolute top-3 right-3 z-10">
                  <span className="px-3 py-1.5 bg-indigo-600 text-white text-xs font-bold rounded-md border border-white shadow-md">
                    {card.tag}
                  </span>
                </div>
              </div> */}
              <div className="h-[170px] relative overflow-hidden bg-gray-100 rounded-xl">

                {/* IMAGE */}
                {card.image ? (
                  <Image
                    src={card.image || "/images/placeholder-course.jpg"}
                    alt={card.title}
                    fill
                    className="object-contain object-center"
                    sizes="320px"
                    priority={index === 0}
                    unoptimized
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600">
                    <span className="text-white text-2xl font-bold">
                      {card.title.charAt(0)}
                    </span>
                  </div>
                )}

                {/* TAG */}
                <div className="absolute top-3 right-3 z-10">
                  <span className="px-3 py-1.5 bg-indigo-600 text-white text-xs font-bold rounded-md border border-white shadow-md">
                    {card.tag}
                  </span>
                </div>

              </div>

              {/* CONTENT - Tighter spacing */}
              <div className="p-4">
                {/* Stats */}
                <div className="flex justify-between text-gray-500 text-xs mb-2">
                  <span className="flex items-center gap-1">
                    <span>📚</span> {card.lessons} Lessons
                  </span>
                  <span className="flex items-center gap-1">
                    <span>👥</span> {card.students} Students
                  </span>
                </div>

                {/* Title - Smaller */}
                <h3 className="text-xl py-2 font-bold text-gray-800 mb-1">
                  {card.title}
                </h3>

                {/* Description - Shorter */}
                <p className="text-gray-600 text-md mb-2 line-clamp-2">
                  {card.desc}
                </p>

                {/* Rating - Smaller */}
                {/* <div className="flex items-center gap-1 text-yellow-500 text-sm mb-3">
                  <span>{'★'.repeat(5)}</span>
                  <span className="text-gray-600 text-xs ml-1">{card.rating}/5</span>
                </div> */}
                <div className="flex items-center gap-1 text-sm mb-3">
                  {/* Dynamic Stars based on rating */}
                  <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map((star) => {
                      const ratingValue = card.rating || 0;

                      if (star <= Math.floor(ratingValue)) {
                        // Full Star
                        return (
                          <span key={star} className="text-yellow-500 text-lg">
                            ★
                          </span>
                        );
                      }
                      else if (star === Math.ceil(ratingValue) && !Number.isInteger(ratingValue)) {
                        // Half Star (for decimals like 4.5)
                        return (
                          <span key={star} className="relative text-lg">
                            <span className="text-gray-300">★</span>
                            <span className="absolute top-0 left-0 overflow-hidden w-1/2 text-yellow-500">
                              ★
                            </span>
                          </span>
                        );
                      }
                      else {
                        // Empty Star
                        return (
                          <span key={star} className="text-gray-300 text-lg">
                            ☆
                          </span>
                        );
                      }
                    })}
                  </div>

                  {/* Rating Number */}
                  <span className="text-gray-600 text-xs ml-1">
                    {card.rating
                      ? Number.isInteger(card.rating)
                        ? card.rating
                        : card.rating.toFixed(1)
                      : '0'}/5
                  </span>
                </div>
                {/* Button - Smaller */}
                <div className="border-t pt-3">
                  <button
                    onClick={() => router.push(`/courses/${card.slug}`)}
                    className="text-indigo-600 font-semibold text-xs hover:text-indigo-800 transition-colors flex items-center gap-1 group"
                  >
                    Learn More
                    <span className="text-sm group-hover:translate-x-1 transition-transform">→</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Timer Dots - Smaller */}
      {/* <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex gap-1.5">
        {cards.slice(0, 5).map((_, i) => (
          <div
            key={i}
            className={`h-1.5 rounded-full transition-all duration-300 ${!isAnimating && i === 0
                ? "w-5 bg-indigo-600"
                : "w-1.5 bg-gray-300"
              }`}
          />
        ))}
      </div> */}
    </div>
  );
}