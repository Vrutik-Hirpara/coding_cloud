

// "use client";

// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import Image from "next/image";
// import { API, BASE_URL } from "@/lib/api";

// type Category = {
//   id: number;
//   name: string;
//   slug: string;
//   image: string | null;
// };

// export default function Categories() {
//   const [categories, setCategories] = useState<Category[]>([]);
//   const [categoryTotals, setCategoryTotals] = useState<Record<number, number>>({});
//   const [loading, setLoading] = useState(true);

//   const router = useRouter();

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         console.log("🔍 Fetching categories from:", API.CATEGORY.LIST);

//         const [catRes, totalRes] = await Promise.all([
//           fetch(API.CATEGORY.LIST),
//           fetch(API.CATEGORY.TOTALS),
//         ]);

//         const catData = await catRes.json();
//         const totalData = await totalRes.json();

//         console.log("📦 Categories API Response:", catData);
//         console.log("📦 Totals API Response:", totalData);

//         // 🔥 Check karo ke data kya chhe
//         const categoriesList = catData.data || catData || [];
//         setCategories(categoriesList);

//         // 🔥 Check first category ni slug
//         if (categoriesList.length > 0) {
//           console.log("🏷️ First category slug:", categoriesList[0].slug);
//         }

//         const totalsMap: Record<number, number> = {};

//         (totalData.data || []).forEach((item: any) => {
//           totalsMap[item.id] = item.total_courses;
//         });

//         setCategoryTotals(totalsMap);

//       } catch (err) {
//         console.error("❌ Category fetch error:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   return (
//     <section className=" bg-[var(--color-white)]">
//       <div className="py-16 container-custom flex flex-col items-center">

//         <div className="px-6 py-2 bg-blue-100 text-blue-700 font-semibold rounded-full">
//           CATEGORIES
//         </div>

//         <h2 className="text-2xl md:text-4xl font-bold text-center mt-5 mb-12">
//           Explore Top Categories
//         </h2>

//         {loading ? (
//           <div className="animate-pulse text-blue-600 font-bold">
//             Loading...
//           </div>
//         ) : (
//           <div className="w-full max-w-7xl mx-auto">
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
//               {categories.map((cat) => {
//                 const imageUrl = cat.image
//                   ? `${BASE_URL}${cat.image}`
//                   : "/images/fallback.png";

//                 // 🔥 Debug: Click thay to slug check
//                 const handleClick = () => {
//                   console.log("🖱️ Clicked category:", cat.name, "with slug:", cat.slug);
//                   router.push(`/category/${cat.slug}`);
//                 };

//                 return (
//                   <div
//                     key={cat.id}
//                     onClick={handleClick}  // 🔥 Updated with debug
//                     className="h-60 shadow-xl bg-[var(--color-white)] rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:-translate-y-2 transition-all duration-300 border border-transparent hover:border-blue-500 group"
//                   >

//                     {/* <div className="relative h-20 w-20 mb-5">
//                     <Image
//                       src={imageUrl}
//                       alt={cat.name}
//                       fill
//                       className="object-contain group-hover:scale-110 transition-transform duration-300"
//                     />
//                   </div> */}
//                     <div className="relative h-20 w-20 mb-5 overflow-hidden">
//                       <Image
//                         src={imageUrl || "/images/placeholder-course.jpg"}
//                         alt={cat.name}
//                         fill
//                         className="object-contain object-center group-hover:scale-110 transition-transform duration-300"
//                         unoptimized
//                       />
//                     </div>

//                     <h3 className="text-lg font-semibold text-center">
//                       {cat.name}
//                     </h3>

//                     {/* 🔥 TOTAL COURSES */}
//                     <p className="text-sm text-gray-500 mt-1 inline-block relative
// after:content-[''] after:absolute after:left-0 after:-bottom-1
// after:h-[2px] after:w-0 after:bg-[var(--color-accent-purple)]
// after:transition-all after:duration-300
// group-hover:after:w-full">
//                       {categoryTotals[cat.id] ?? 0} Courses
//                     </p>

//                   </div>
//                 );
//               })}

//             </div>
//             </div>
//         )}
//           </div>
          
//     </section>
//   );
// }


"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { API, BASE_URL } from "@/lib/api";
import { motion } from "framer-motion";

type Category = {
  id: number;
  name: string;
  slug: string;
  image: string | null;
};

export default function Categories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoryTotals, setCategoryTotals] = useState<Record<number, number>>({});
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("🔍 Fetching categories from:", API.CATEGORY.LIST);

        const [catRes, totalRes] = await Promise.all([
          fetch(API.CATEGORY.LIST),
          fetch(API.CATEGORY.TOTALS),
        ]);

        const catData = await catRes.json();
        const totalData = await totalRes.json();

        console.log("📦 Categories API Response:", catData);
        console.log("📦 Totals API Response:", totalData);

        // 🔥 Check karo ke data kya chhe
        const categoriesList = catData.data || catData || [];
        setCategories(categoriesList);

        // 🔥 Check first category ni slug
        if (categoriesList.length > 0) {
          console.log("🏷️ First category slug:", categoriesList[0].slug);
        }

        const totalsMap: Record<number, number> = {};

        (totalData.data || []).forEach((item: any) => {
          totalsMap[item.id] = item.total_courses;
        });

        setCategoryTotals(totalsMap);

      } catch (err) {
        console.error("❌ Category fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Loading Skeleton
  if (loading) {
    return (
      <section className="bg-[var(--color-white)]">
        <div className="pb-16 container-custom flex flex-col items-center">
          <div className="px-6 py-2 bg-blue-100 text-blue-700 font-semibold rounded-full animate-pulse">
            CATEGORIES
          </div>
          <div className="h-8 w-64 bg-gray-200 rounded mt-5 mb-12 animate-pulse"></div>
          <div className="w-full max-w-7xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 lg:gap-8">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                <div key={n} className="h-60 2xl:h-72 bg-gray-100 rounded-2xl animate-pulse"></div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-[var(--color-white)]">
      <div className="pb-16 container-custom flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="px-6 py-2 bg-blue-100 text-blue-700 font-semibold rounded-full"
        >
          CATEGORIES
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-2xl md:text-4xl font-bold text-center mt-5 mb-12"
        >
          Explore Top Categories
        </motion.h2>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-full max-w-7xl mx-auto"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 lg:gap-8">
            {categories.map((cat, index) => {
              const imageUrl = cat.image
                ? `${BASE_URL}${cat.image}`
                : "/images/fallback.png";

              const handleClick = () => {
                console.log("🖱️ Clicked category:", cat.name, "with slug:", cat.slug);
                router.push(`/category/${cat.slug}`);
              };

              return (
                <motion.div
                  key={cat.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  onClick={handleClick}
                  className="
                    h-60 2xl:h-72                 // Height increase on 2XL
                    shadow-xl 
                    bg-[var(--color-white)] 
                    rounded-2xl 
                    flex 
                    flex-col 
                    items-center 
                    justify-center 
                    cursor-pointer 
                    hover:-translate-y-2 
                    transition-all 
                    duration-300 
                    border 
                    border-transparent 
                    hover:border-blue-500 
                    group
                    p-4 2xl:p-6                    // Padding increase on 2XL
                  "
                >
                  {/* Icon/Image Container */}
                  <div className="relative h-20 w-20 2xl:h-24 2xl:w-24 mb-5 2xl:mb-6 overflow-hidden">
                    <Image
                      src={imageUrl || "/images/placeholder-course.jpg"}
                      alt={cat.name}
                      fill
                      className="object-contain object-center transition-transform duration-300"
                      unoptimized
                    />
                  </div>

                  {/* Category Name */}
                  <h3 className="
                    text-lg 2xl:text-xl              // Text size increase on 2XL
                    font-semibold 
                    text-center
                    mb-1
                  ">
                    {cat.name}
                  </h3>

                  {/* Course Count with Animated Underline */}
                  {/* <p className="
                    text-sm 2xl:text-base             // Text size increase on 2XL
                    text-gray-500 
                    mt-1 
                    inline-block 
                    relative
                    after:content-[''] 
                    after:absolute 
                    after:left-0 
                    after:-bottom-1
                    after:h-[2px] 
                    after:w-0 
                    after:bg-[var(--color-accent-purple)]
                    after:transition-all 
                    after:duration-300
                    group-hover:after:w-full
                  ">
                    {categoryTotals[cat.id] ?? 0} Courses
                  </p> */}
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}