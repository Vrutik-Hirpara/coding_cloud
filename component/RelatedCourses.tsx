
// "use client";

// import { useEffect, useState } from "react";
// import Image from "next/image";
// import { API, BASE_URL } from "@/lib/api";

// type Course = {
//   id: number;
//   name: string;
//   image: string;
//   text: string;
//   duration: string | null;
//   lecture: string | null;
//   students: string | null;
//   level: string | null;
//   language: string | null;
//   category_details: {
//     name: string;
//   };
// };

// export default function RelatedCourses() {
//   const [courses, setCourses] = useState<Course[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchCourses = async () => {
//       try {
//         const res = await fetch(API.COURSES.LIST);
//         const data = await res.json();

//         // 🔥 only first 2 courses
//         setCourses(data.data.slice(0, 2));
//       } catch (err) {
//         console.error("Course fetch error:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCourses();
//   }, []);

//   return (
//     <section className="py-16 bg-[#f8fafc]">
//       <div className="container-custom">

//         {/* HEADER */}
//         <div className="mb-12">
//           <span className="inline-block px-4 py-1 mb-3 text-sm font-semibold text-blue-600 bg-blue-100 rounded-full">
//             MORE SIMILAR COURSES
//           </span>

//           <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-dark)]">
//             Related Courses
//           </h2>
//         </div>

//         {/* LOADING */}
//         {loading ? (
//           <div className="text-center font-semibold text-blue-600">
//             Loading courses...
//           </div>
//         ) : (
//          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

//   {/* 🔥 Actual Courses */}
//   {courses.map((course) => {
//     const imageUrl = course.image
//       ? `${BASE_URL}${course.image}`
//       : "/images/fallback.png";

//     return (
//       <div
//         key={course.id}
//         className="bg-[var(--color-white)] rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group"
//       >
//         {/* IMAGE */}
//         <div className="relative h-[200px] overflow-hidden">
//           <Image
//             src={imageUrl}
//             alt={course.name}
//             fill
//             className="object-cover group-hover:scale-105 transition duration-500"
//           />

//           <span className="absolute top-3 left-3 bg-[var(--color-white)]/90 text-xs px-3 py-1 rounded-full font-semibold">
//             {course.duration || "Course"}
//           </span>
//         </div>

//         {/* CONTENT */}
//         <div className="p-6">
//           <div className="text-orange-400 text-sm mb-2">
//             ⭐⭐⭐⭐⭐ <span className="text-[var(--color-muted)] ml-2">(5 Reviews)</span>
//           </div>

//           <h3 className="text-xl font-bold text-[var(--color-dark)] mb-2">
//             {course.name}
//           </h3>

//           <div className="flex gap-4 text-sm text-[var(--color-muted)] mb-3">
//             <span>📘 {course.lecture || 0} Lessons</span>
//             <span>👨‍🎓 {course.students || 0} Students</span>
//           </div>

//           <p className="text-[var(--color-muted)] text-sm mb-4 line-clamp-2">
//             {course.text}
//           </p>

//           <div className="text-xs text-[var(--color-muted-light)] mb-4">
//             Category: {course.category_details?.name}
//           </div>

//           <div className="flex items-center justify-between">


//             <button className="text-blue-600 font-semibold hover:underline">
//               Learn More →
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   })}

//   {/* 🔥 EMPTY PLACEHOLDER CARD (for layout spacing) */}
//   {courses.length === 2 && (
//     <div className="hidden lg:block"></div>
//   )}

// </div>
//         )}
//       </div>
//     </section>
//   );
// }

// "use client";

// import { useEffect, useState } from "react";
// import Image from "next/image";
// import Link from "next/link";
// import { API, BASE_URL } from "@/lib/api";

// type Course = {
//   id: number;
//   name: string;
//   image: string;
//   text: string;
//   duration: string | null;
//   lecture: string | null;
//   students: string | null;
//   level: string | null;
//   language: string | null;
//   slug: string;
//   category_details: {
//     name: string;
//   };
// };

// export default function RelatedCourses() {
//   const [courses, setCourses] = useState<Course[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [ratings, setRatings] = useState<Record<number, any>>({});
//   // 🔥 helper for full image url
//   const getImageUrl = (path?: string) => {
//     if (!path) return "/images/fallback.png";

//     // already full url hoy to direct return
//     if (path.startsWith("http")) return path;

//     // remove starting slash to avoid double //
//     const clean = path.startsWith("/") ? path.slice(1) : path;

//     return `${BASE_URL}/${clean}`;
//   };

//   useEffect(() => {
//     const fetchCourses = async () => {
//       try {
//         const res = await fetch(API.COURSES.LIST);
//         const data = await res.json();

//         const list = data.data || [];

//         // only first 2 courses
//         const selected = list.slice(0, 2);
//         setCourses(selected);
//         fetchRatings(selected);
//       } catch (err) {
//         console.error("Course fetch error:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCourses();

//     const fetchRatings = async (courseList: Course[]) => {
//       const ratingData: Record<number, any> = {};

//       await Promise.all(
//         courseList.map(async (course) => {
//           try {
//             const res = await fetch(
//               `${BASE_URL}/course_average_rating/?course_id=${course.id}`
//             );

//             const json = await res.json();

//             const data = json.course_average_rating?.[0];

//             if (data) {
//               ratingData[course.id] = data;
//             }
//           } catch (err) {
//             console.error("Rating error", err);
//           }
//         })
//       );

//       setRatings(ratingData);
//     };
//   }, []);

// "use client";

// import { useEffect, useState } from "react";
// import Image from "next/image";
// import Link from "next/link";
// import { API, BASE_URL } from "@/lib/api";
// import { useParams } from "next/navigation"; // ✅ ADD THIS

// type Course = {
//   id: number;
//   name: string;
//   image: string;
//   text: string;
//   duration: string | null;
//   lecture: string | null;
//   students: string | null;
//   level: string | null;
//   language: string | null;
//   slug: string;
//   category: number; // ✅ ADD THIS (category id)
//   category_details: {
//     name: string;
//   };
// };

// export default function RelatedCourses() {
//   const { slug } = useParams(); // ✅ ADD THIS - get current course slug
//   const [courses, setCourses] = useState<Course[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [ratings, setRatings] = useState<Record<number, any>>({});
//   const [currentCourse, setCurrentCourse] = useState<Course | null>(null); // ✅ ADD THIS

//   const getImageUrl = (path?: string) => {
//     if (!path) return "/images/fallback.png";
//     if (path.startsWith("http")) return path;
//     const clean = path.startsWith("/") ? path.slice(1) : path;
//     return `${BASE_URL}/${clean}`;
//   };

//   useEffect(() => {
//     const fetchCourses = async () => {
//       try {
//         const res = await fetch(API.COURSES.LIST);
//         const data = await res.json();
//         const list = data.data || [];

//         // ✅ FIND CURRENT COURSE BY SLUG
//         const current = list.find((c: Course) => c.slug === slug);
//         setCurrentCourse(current || null);

//         if (current) {
//           // ✅ FILTER COURSES BY SAME CATEGORY, EXCLUDE CURRENT COURSE
//           const sameCategory = list.filter(
//             (c: Course) => c.category === current.category && c.id !== current.id
//           );

//           // ✅ TAKE FIRST 2 COURSES
//           const selected = sameCategory.slice(0, 2);
//           setCourses(selected);
//           fetchRatings(selected);
//         } else {
//           // FALLBACK: show first 2 courses if no current course found
//           const selected = list.slice(0, 2);
//           setCourses(selected);
//           fetchRatings(selected);
//         }
//       } catch (err) {
//         console.error("Course fetch error:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (slug) { // ✅ ONLY FETCH IF SLUG EXISTS
//       fetchCourses();
//     }
//   }, [slug]); // ✅ ADD DEPENDENCY

//   const fetchRatings = async (courseList: Course[]) => {
//     const ratingData: Record<number, any> = {};

//     await Promise.all(
//       courseList.map(async (course) => {
//         try {
//           const res = await fetch(
//             `${BASE_URL}/course_average_rating/?course_id=${course.id}`
//           );
//           const json = await res.json();
//           const data = json.course_average_rating?.[0];
//           if (data) {
//             ratingData[course.id] = data;
//           }
//         } catch (err) {
//           console.error("Rating error", err);
//         }
//       })
//     );

//     setRatings(ratingData);
//   };

//   return (
//     <section className="py-16 bg-[var(--color-bg-light)]">
//       <div className="container-custom">

//         {/* HEADER */}
//         <div className="mb-12">
//           <span className="inline-block px-4 py-1 mb-3 text-sm font-semibold text-[var(--color-accent-purple)] bg-[var(--color-primary-light)] rounded-full">
//             MORE SIMILAR COURSES
//           </span>

//           <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-dark)]">
//             Related Courses
//           </h2>
//         </div>

//         {/* LOADING */}
//         {loading ? (
//           <div className="text-center font-semibold text-[var(--color-accent-purple)]">
//             Loading courses...
//           </div>
//         ) : (
//           // <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

//           //   {courses.map((course) => {
//           //     const imageUrl = getImageUrl(course.image);

//           //     return (
//           //       <div
//           //         key={course.id}
//           //         className="bg-[var(--color-white)] rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group"
//           //       >
//           //         {/* IMAGE */}
//           //         <div className="relative h-[190px] sm:h-[240px] md:h-[190px] lg:h-[190px] overflow-hidden">
//           //           <Image
//           //             src={imageUrl}
//           //             alt={course.name}
//           //             fill
//           //             unoptimized
//           //             className="absolute object-contain group-hover:scale-101 transition duration-500"
//           //           />

//           //           <span className="absolute top-3 left-3 bg-[var(--color-white)]/90 text-xs px-3 py-1 rounded-full font-semibold">
//           //             {course.duration || "Course"}
//           //           </span>
//           //         </div>

//           //         {/* CONTENT */}
//           //         <div className="p-6">
//           //           <div className="text-orange-400 text-sm mb-2">
//           //             ★ {ratings[course.id]?.average_rating || 0}

//           //             <span className="text-[var(--color-muted)] ml-2">
//           //               ({ratings[course.id]?.total_reviews || 0} Reviews)
//           //             </span>
//           //           </div>

//           //           <h3 className="text-xl font-bold text-[var(--color-dark)] mb-2">
//           //             {course.name}
//           //           </h3>

//           //           <div className="flex gap-4 text-sm text-[var(--color-muted)] mb-3">
//           //             <span>📘 {course.lecture || 0} Lessons</span>
//           //             <span>👨‍🎓 {course.students || 0} Students</span>
//           //           </div>

//           //           {/* <p className="text-[var(--color-muted)] text-sm mb-4 line-clamp-2">
//           //             {course?.text?.replace(/<[^>]*>/g, "")}
//           //           </p> */}
//           //           <div
//           //             className="text-[var(--color-muted)] text-sm mb-4 line-clamp-2"
//           //             dangerouslySetInnerHTML={{ __html: course?.text || "" }}
//           //           />
//           //           <div className="text-xs text-[var(--color-muted-light)] mb-4">
//           //             Category: {course.category_details?.name}
//           //           </div>

//           //           <div className="flex items-center justify-between">
//           //             <Link
//           //               href={`/courses/${course.slug}`}
//           //               className="text-[var(--color-accent-purple)] font-semibold hover:underline"
//           //             >
//           //               Learn More →
//           //             </Link>
//           //           </div>
//           //         </div>
//           //       </div>
//           //     );
//           //   })}

//           //   {/* placeholder for grid balance */}
//           //   {courses.length === 2 && (
//           //     <div className="hidden lg:block"></div>
//           //   )}
//           // </div>
//           <div className="relative group/slider flex items-center justify-center px-4 md:px-8">

//   {/* LEFT ARROW */}
//   {courses.length > 3 && (
//     <button
//       onClick={() => {
//         const container = document.getElementById("courseScroll");
//         if (!container) return;
//         container.scrollBy({ left: -336 * 3, behavior: "smooth" });
//       }}
//       className="
//         absolute left-0 md:-left-6 top-1/2 -translate-y-1/2 z-30
//         w-12 h-12 rounded-full flex items-center justify-center
//         text-[var(--color-accent-purple)] md:bg-[var(--color-accent-purple)]
//         md:text-white md:shadow-lg hover:scale-110 transition
//       "
//     >
//       ‹
//     </button>
//   )}

//   {/* RIGHT ARROW */}
//   {courses.length > 3 && (
//     <button
//       onClick={() => {
//         const container = document.getElementById("courseScroll");
//         if (!container) return;
//         container.scrollBy({ left: 336 * 3, behavior: "smooth" });
//       }}
//       className="
//         absolute right-0 md:-right-6 top-1/2 -translate-y-1/2 z-30
//         w-12 h-12 rounded-full flex items-center justify-center
//         text-[var(--color-accent-purple)] md:bg-[var(--color-accent-purple)]
//         md:text-white md:shadow-lg hover:scale-110 transition
//       "
//     >
//       ›
//     </button>
//   )}

//   {/* CONTENT */}
//   <div
//     id="courseScroll"
//     className={`
//       ${courses.length <= 3
//         ? "grid md:grid-cols-2 lg:grid-cols-3 gap-8 w-full"
//         : "grid grid-flow-col auto-cols-[320px] gap-8 overflow-x-auto hide-scrollbar scroll-smooth w-fit"}
//     `}
//   >
//     {courses.map((course) => {
//       const imageUrl = getImageUrl(course.image);

//       return (
//         <div
//           key={course.id}
//           className="
//             bg-[var(--color-white)] rounded-2xl shadow-sm hover:shadow-lg
//             transition-all duration-300 overflow-hidden group
//             min-w-[320px]
//           "
//         >
//           {/* IMAGE */}
//           <div className="relative h-[190px] sm:h-[240px] md:h-[190px] lg:h-[190px] overflow-hidden">
//             <Image
//               src={imageUrl}
//               alt={course.name}
//               fill
//               unoptimized
//               className="absolute object-contain group-hover:scale-101 transition duration-500"
//             />

//             <span className="absolute top-3 left-3 bg-[var(--color-white)]/90 text-xs px-3 py-1 rounded-full font-semibold">
//               {course.duration || "Course"}
//             </span>
//           </div>

//           {/* CONTENT */}
//           <div className="p-6">
//             <div className="text-orange-400 text-sm mb-2">
//               ★ {ratings[course.id]?.average_rating || 0}
//               <span className="text-[var(--color-muted)] ml-2">
//                 ({ratings[course.id]?.total_reviews || 0} Reviews)
//               </span>
//             </div>

//             <h3 className="text-xl font-bold text-[var(--color-dark)] mb-2">
//               {course.name}
//             </h3>

//             <div className="flex gap-4 text-sm text-[var(--color-muted)] mb-3">
//               <span>📘 {course.lecture || 0} Lessons</span>
//               <span>👨‍🎓 {course.students || 0} Students</span>
//             </div>

//             <div
//               className="text-[var(--color-muted)] text-sm mb-4 line-clamp-2"
//               dangerouslySetInnerHTML={{ __html: course?.text || "" }}
//             />

//             <div className="text-xs text-[var(--color-muted-light)] mb-4">
//               Category: {course.category_details?.name}
//             </div>

//             <div className="flex items-center justify-between">
//               <Link
//                 href={`/courses/${course.slug}`}
//                 className="text-[var(--color-accent-purple)] font-semibold hover:underline"
//               >
//                 Learn More →
//               </Link>
//             </div>
//           </div>
//         </div>
//       );
//     })}

//     {/* balance */}
//     {courses.length === 2 && <div className="hidden lg:block"></div>}
//   </div>
// </div>
//         )}
//       </div>
//     </section>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { API, apiService, BASE_URL } from "@/lib/api";
import { useParams } from "next/navigation";
import CourseCard from "@/component/ui/CourseCard";

type Course = {
  id: number;
  name: string;
  image: string;
  text: string;
  duration: string | null;
  lecture: string | null;
  students: string | null;
  level: string | null;
  language: string | null;
  slug: string;
  category: number;
  category_details: {
    name: string;
  };
};

export default function RelatedCourses() {
  const { slug } = useParams();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [ratings, setRatings] = useState<Record<number, any>>({});
  const [currentCourse, setCurrentCourse] = useState<Course | null>(null);


  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetch(API.COURSES.LIST);
        const data = await res.json();
        const list = data.data || [];

        const current = list.find((c: Course) => c.slug === slug);
        setCurrentCourse(current || null);

        if (current) {
          const sameCategory = list.filter(
            (c: Course) => c.category === current.category && c.id !== current.id
          );

          const selected = sameCategory.slice(0, 2);
          setCourses(selected);
          fetchRatings(selected);
        } else {
          const selected = list.slice(0, 2);
          setCourses(selected);
          fetchRatings(selected);
        }
      } catch (err) {
        console.error("Course fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchCourses();
    }
  }, [slug]);

  const fetchRatings = async (courseList: Course[]) => {
    const ratingData: Record<number, any> = {};

    await Promise.all(
      courseList.map(async (course) => {
        try {
          // const res = await fetch(
          //   `${BASE_URL}/course_average_rating/?course_id=${course.id}`
          // );
          // const json = await res.json();
          // const data = json.course_average_rating?.[0];
          const json = await apiService.getCourseAverageRating(course.id);
          const data = json.course_average_rating?.[0];
          if (data) {
            ratingData[course.id] = data;
          }
        } catch (err) {
          console.error("Rating error", err);
        }
      })
    );

    setRatings(ratingData);
  };

  return (
    <section className=" bg-[var(--color-bg-light)]">
      <div className="container-custom">
        {/* Related Courses Section - Only show if courses exist */}
        {courses.length > 0 && (
          <div className="py-16">
            {/* HEADER */}
            <div className="mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-dark)]">
                Related Courses
              </h2>
            </div>

            {/* LOADING */}
            {loading ? (
              <div className="text-center font-semibold text-[var(--color-accent-purple)]">
                Loading courses...
              </div>
            ) : (
              <div className="relative w-full">
                {/* Scroll Buttons - Only if more than 3 courses */}
                {courses.length > 3 && (
                  <div className="flex justify-end gap-3 mb-6">
                    <button
                      onClick={() => {
                        const container = document.getElementById("relatedCourseScroll");
                        if (container) {
                          container.scrollBy({ left: -335, behavior: "smooth" });
                        }
                      }}
                      className="w-10 h-10 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition"
                    >
                      ←
                    </button>
                    <button
                      onClick={() => {
                        const container = document.getElementById("relatedCourseScroll");
                        if (container) {
                          container.scrollBy({ left: 335, behavior: "smooth" });
                        }
                      }}
                      className="w-10 h-10 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition"
                    >
                      →
                    </button>
                  </div>
                )}

                {/* Cards Container */}
                <div
                  id="relatedCourseScroll"
                  className={`
            ${courses.length <= 3
                      ? "grid grid-cols-[repeat(auto-fit,minmax(300px,335px))] gap-6 justify-start"
                      : "grid grid-flow-col  auto-cols-[335px] overflow-x-auto gap-4 pb-10 pt-2 hide-scrollbar scroll-smooth"
                    }
          `}
                >
                  {courses.map((course, index) => {
                    const ratingValue = ratings[course.id]?.average_rating || 0;
                    const reviewsCount = ratings[course.id]?.total_reviews || 0;

                    const courseProp = {
                      ...course,
                      short_description: course.text,
                    };

                    return (
                      <CourseCard
                        key={course.id}
                        course={courseProp as any}
                        rating={ratingValue}
                        reviews={reviewsCount}
                        index={index}
                        imageBaseUrl={BASE_URL}
                        className="w-[280px] sm:w-[335px]"
                      />
                    );
                  })}

                  {/* Placeholder for grid balance - if only 2 courses */}
                  {courses.length === 2 && (
                    <div className="hidden lg:block w-[335px]"></div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

      </div>
    </section>
  );
}