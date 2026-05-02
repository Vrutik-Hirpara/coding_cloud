"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { API, BASE_URL } from "@/lib/api";

interface Course {
  id: number;
  name: string;
  slug: string;
  image?: string;
  category: number;
  text: string;
}

export default function CategoryCoursesPage() {
  const params = useParams();
  const categoryId = Number(params.id);

  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  // 🔥 image helper
  const getImage = (img?: string) => {
    if (!img) return null;
    if (img.startsWith("http")) return img;
    return `${BASE_URL}/${img.startsWith("/") ? img.slice(1) : img}`;
  };

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetch(API.COURSES.LIST, { cache: "no-store" });
        const data = await res.json();

        const list = data.data || data.results || data;

        // 🎯 FILTER by category id
        const filtered = list.filter(
          (course: Course) => course.category === categoryId
        );

        setCourses(filtered);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [categoryId]);

  // ================= UI =================

  if (loading) {
    return <div className="p-10 text-center">Loading courses...</div>;
  }

  if (courses.length === 0) {
    return <div className="p-10 text-center">No courses found</div>;
  }

  return (
    <div className="container-custom py-16">
      <h1 className="text-3xl font-bold mb-10 text-center">
        Courses in Category
      </h1>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => {
          const img = getImage(course.image);

          return (
            <Link
              key={course.id}
              href={`/courses/${course.slug}`}
              className="bg-[var(--color-white)] rounded-xl shadow hover:shadow-lg transition overflow-hidden"
            >
              <div className="h-44 bg-[var(--color-bg-light)]">
                {img && (
                  <Image
                    src={img}
                    alt={course.name}
                    width={400}
                    height={300}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>

              <div className="p-4">
                <h3 className="font-semibold text-lg mb-2">
                  {course.name}
                </h3>
                {/* <p className="text-sm text-[var(--color-muted)] line-clamp-2">
                  {course?.text?.replace(/<[^>]*>/g, "")}
                </p> */}
                 <div
                  className="text-sm text-[var(--color-muted)] line-clamp-2"
                  dangerouslySetInnerHTML={{
                    __html: course?.text || "",
                  }}
                />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}