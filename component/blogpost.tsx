// "use client";

// import Image from "next/image";
// import Link from "next/link";

// export default function BlogPost() {
//   return (
//     <section className="bg-[#f6f7fb] py-16">
//       <div className="container-custom">

//         {/* HEADER */}
//         <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-10">
//           <div>
//             <span className="inline-block px-4 py-1 rounded-full text-sm font-semibold bg-pink-100 text-[var(--color-accent-pink)] mb-3">
//               BLOG POST
//             </span>

//             <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-dark)]">
//               Post Popular Post.
//             </h2>
//           </div>

//           <Link
//             href="/articles"
//             className="mt-4 md:mt-0 inline-flex items-center gap-2 px-6 py-3 rounded-xl text-[var(--color-white)] font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90 transition"
//           >
//             See All Articles →
//           </Link>
//         </div>

//         {/* GRID */}
//         <div className="grid lg:grid-cols-2 gap-8">

//           {/* LEFT BIG CARD */}
//           <div className="bg-[var(--color-white)] rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition">
//             <div className="relative h-[260px] md:h-[300px]">
//               <Image
//                 src="/images/blog/blog-big.jpg"
//                 alt="Blog"
//                 fill
//                 className="object-cover"
//               />
//             </div>

//             <div className="p-6">
//               <h3 className="text-2xl font-bold text-[var(--color-dark)] mb-2">
//                 React
//               </h3>

//               <p className="text-[var(--color-muted)] mb-4">
//                 It is a long established fact that a reader.
//               </p>

//               <Link
//                 href="#"
//                 className="text-[var(--color-primary)] font-semibold hover:underline"
//               >
//                 Learn More →
//               </Link>
//             </div>
//           </div>

//           {/* RIGHT SIDE LIST */}
//           <div className="flex flex-col gap-6">

//             {/* ITEM 1 */}
//             <div className="bg-[var(--color-white)] rounded-2xl p-4 flex gap-4 items-center shadow-sm hover:shadow-md transition">
//               <div className="relative w-40 h-28 rounded-xl overflow-hidden">
//                 <Image
//                   src="/images/blog/blog-1.jpg"
//                   alt="blog1"
//                   fill
//                   className="object-cover"
//                 />
//               </div>

//               <div>
//                 <h4 className="font-bold text-lg text-[var(--color-dark)] mb-1">
//                   Why Is Education So Famous?
//                 </h4>
//                 <Link href="#" className="text-sm text-[var(--color-muted)] hover:text-blue-600">
//                   Read Article →
//                 </Link>
//               </div>
//             </div>

//             {/* ITEM 2 */}
//             <div className="bg-[var(--color-white)] rounded-2xl p-4 flex gap-4 items-center shadow-sm hover:shadow-md transition">
//               <div className="relative w-40 h-28 rounded-xl overflow-hidden">
//                 <Image
//                   src="/images/blog/blog-2.jpg"
//                   alt="blog2"
//                   fill
//                   className="object-cover"
//                 />
//               </div>

//               <div>
//                 <h4 className="font-bold text-lg text-[var(--color-dark)] mb-1">
//                   Difficult Things About Education.
//                 </h4>
//                 <Link href="#" className="text-sm text-[var(--color-muted)] hover:text-blue-600">
//                   Read Article →
//                 </Link>
//               </div>
//             </div>

//             {/* ITEM 3 */}
//             <div className="bg-[var(--color-white)] rounded-2xl p-4 flex gap-4 items-center shadow-sm hover:shadow-md transition">
//               <div className="relative w-40 h-28 rounded-xl overflow-hidden">
//                 <Image
//                   src="/images/blog/blog-3.jpg"
//                   alt="blog3"
//                   fill
//                   className="object-cover"
//                 />
//               </div>

//               <div>
//                 <h4 className="font-bold text-lg text-[var(--color-dark)] mb-1">
//                   Education Is So Famous, But Why?
//                 </h4>
//                 <Link href="#" className="text-sm text-[var(--color-muted)] hover:text-blue-600">
//                   Read Article →
//                 </Link>
//               </div>
//             </div>

//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }


"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import Button from "./ui/Button";
import { apiService, BASE_URL } from "@/lib/api";
import Heading from "./ui/Heading";
import Pill from "./ui/Pill";

interface Blog {
  id: number;
  title: string;
  short_description: string;
  featured_image: string;
  slug: string;
}

export default function BlogPost() {
  const [blogs, setBlogs] = useState<Blog[]>([]);

  // useEffect(() => {
  //   const fetchBlogs = async () => {
  //     try {
  //       // const res = await fetch(
  //       //   `${BASE_URL}/blogs/`
  //       // );
  //       const res = await fetch(`${BASE_URL}/blogs/?status=published`);
  //       const data = await res.json();
  //       setBlogs(data.data || []);
  //     } catch (error) {
  //       console.error("Blog fetch error:", error);
  //     }
  //   };

  //   fetchBlogs();
  // }, []);
useEffect(() => {
  const fetchBlogs = async () => {
    try {
      const blogs = await apiService.getPublishedBlogs();
      setBlogs(blogs);
    } catch (error) {
      console.error("Blog fetch error:", error);
    }
  };

  fetchBlogs();
}, []);
  if (blogs.length === 0) return null;

  const mainBlog = blogs[0];
  const sideBlogs = blogs.slice(1, 4);

  return (
    <section className="bg-[var(--color-bg-light)] pt-16">
      <div className="container-custom">

        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-center mb-4">

          {/* LEFT SIDE (Heading + Pill) */}
          <div className="flex flex-col items-center">

            <Pill
              text="Blog Post"
              textColor="var(--color-accent-purple)"
              bgColor="var(--color-primary-light)"
            />

            <Heading
              title={<>Latest Blog & Article</>}
              align="left"
            />

          </div>



        </div>
        {/* RIGHT SIDE BUTTON */}
        <div className="mt-4 md:mt-0 flex md:justify-end mb-4">
          <Button
            href="/blogs"
            variant="gradient"
            className="px-6 py-3 rounded-full font-semibold hover:scale-105 transition"
          >
            See All Blogs →
          </Button>
        </div>
        {/* GRID */}
        <div className="grid lg:grid-cols-2 gap-8">

          {/* LEFT MAIN BLOG */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-[var(--color-white)] rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition"
          >
            <div className="relative h-[260px] sm:h-[320px] md:h-[380px] w-full overflow-hidden rounded-t-xl">
              <Image
                src={BASE_URL + mainBlog.featured_image}
                alt={mainBlog.title}
                fill
                sizes="(max-width: 768px) 100vw, 600px"
                priority
                className="object-contain transition-transform duration-500 hover:scale-105"
                unoptimized
              />

              {/* optional overlay for readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
            </div>

            <div className="p-6">
              <h3 className="text-2xl font-bold text-[var(--color-dark)]">
                {mainBlog.title}
              </h3>

              <p className="text-[var(--color-muted)]">
  {mainBlog.short_description.split(" ").slice(0, 20).join(" ")}
  {mainBlog.short_description.split(" ").length > 20 && "..."}
</p>

              <Link
                href={`/blogs/${mainBlog.slug}`}
                className="text-[var(--color-accent-purple)] font-semibold hover:underline"
              >
                Learn More →
              </Link>
            </div>
          </motion.div>

          {/* RIGHT SIDE BLOG LIST */}
          <div className="flex flex-col gap-6">
            {sideBlogs.map((blog, index) => (
              <motion.div
                key={blog.id}
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.2 }}
                className="bg-[var(--color-white)] rounded-2xl p-4 flex gap-4 items-center shadow-sm hover:shadow-md transition"
              >
                <div className="relative w-32 sm:w-40 h-24 sm:h-28 rounded-xl overflow-hidden flex-shrink-0">
                  <Image
                    src={BASE_URL + blog.featured_image}
                    alt={blog.title}
                    fill
                    sizes="(max-width: 640px) 128px, 160px"
                    loading="lazy"
                    className="object-contain transition-transform duration-300 hover:scale-105"
                    unoptimized
                  />
                </div>

                <div>
                  <h4 className="font-bold text-lg text-[var(--color-dark)] mb-1 line-clamp-2">
                    {blog.title}
                  </h4>

                  <p className="text-sm text-[var(--color-muted)] line-clamp-2 mb-2">
                    {blog.short_description}
                  </p>

                  <Link
                    href={`/blogs/${blog.slug}`}
                    className="text-sm text-[var(--color-accent-purple)] hover:underline"
                  >
                    Learn More →
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}