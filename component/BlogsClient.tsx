"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { API, BASE_URL } from "@/lib/api";

interface Blog {
  id: number;
  title: string;
  short_description: string;
  featured_image?: string;
  slug: string;
}




export default function BlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getBlogs = async () => {
      try {
        setLoading(true);
        setError(null);

      const res = await fetch(API.BLOGS.LIST, {
  cache: "no-store",
});

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();
        console.log("BLOG API:", data);

        let blogsArray: Blog[] = [];

        if (Array.isArray(data)) {
          blogsArray = data;
        } else if (data.data && Array.isArray(data.data)) {
          blogsArray = data.data;
        } else if (data.results && Array.isArray(data.results)) {
          blogsArray = data.results;
        } else {
          const possibleArray = Object.values(data).find((val) =>
            Array.isArray(val)
          );
          if (possibleArray) {
            blogsArray = possibleArray as Blog[];
          }
        }

const publishedBlogs = blogsArray.filter(
  (blog: any) =>
    blog.status &&
    blog.status.toLowerCase() === "published"
);

setBlogs(publishedBlogs);      } catch (err) {
        console.error("Blog fetch error:", err);
        setError(err instanceof Error ? err.message : "Failed to load blogs");
        setBlogs([]);
      } finally {
        setLoading(false);
      }
    };

    getBlogs();
  }, []);

  // 🔥 Image helper
const getFullImageUrl = (img?: string) => {
  if (!img) return null;
  if (img.startsWith("http")) return img;

  const clean = img.startsWith("/") ? img.slice(1) : img;
  return `${BASE_URL}/${clean}`;
};

  // ================= LOADING =================
  if (loading) {
    return (
      <div className="container-custom py-16">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-10">
          All Blogs
        </h1>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1,2,3,4,5,6].map((i)=>(
            <div key={i} className="bg-[var(--color-white)] rounded-xl p-4 shadow animate-pulse">
              <div className="h-44 w-full bg-[var(--color-light)] rounded-lg mb-4"></div>
              <div className="h-6 bg-[var(--color-light)] rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-[var(--color-light)] rounded w-full mb-1"></div>
              <div className="h-4 bg-[var(--color-light)] rounded w-2/3"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ================= ERROR =================
  if (error) {
    return (
      <div className="container-custom py-16 text-center">
        <h1 className="text-3xl font-bold mb-6">All Blogs</h1>
        <p className="text-[var(--color-danger)] mb-4">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="px-6 py-2 rounded-full bg-[var(--color-accent-purple)] text-[var(--color-white)]"
        >
          Retry
        </button>
      </div>
    );
  }

  // ================= EMPTY =================
  if (blogs.length === 0) {
    return (
      <div className="container-custom py-16 text-center">
        <p className="text-[var(--color-muted)]">No blogs available</p>
      </div>
    );
  }

  // ================= SUCCESS =================
  return (
    <div className="container-custom py-16">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl md:text-4xl font-bold text-center mb-12 text-[var(--color-dark)]"
      >
        All Blogs
      </motion.h1>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {blogs.map((blog, index) => {
          const img = getFullImageUrl(blog.featured_image);

          return (
            <motion.div
              key={blog.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 }}
              whileHover={{ y: -6 }}
            >
              <Link
                href={`/blogs/${blog.slug}`}
                className="block bg-[var(--color-white)] rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition h-full"
              >
                <div className="h-48 w-full bg-[var(--color-bg-light)] overflow-hidden">
                  {img ? (
                    <img
                      src={img}
                      alt={blog.title}
                      className="w-full h-full object-contain  transition duration-500"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-[var(--color-muted-light)]">
                      No Image
                    </div>
                  )}
                </div>

                <div className="p-5">
                  <h2 className="text-lg font-bold text-[var(--color-dark)] mb-2 line-clamp-2">
                    {blog.title}
                  </h2>

                  <p className="text-sm text-[var(--color-muted)] line-clamp-3 mb-3">
                    {blog.short_description}
                  </p>

                  <span className="text-[var(--color-accent-purple)] font-medium text-sm">
                    Learn More →
                  </span>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}