

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { API, BASE_URL, apiService } from "@/lib/api";
import { motion } from "framer-motion";
import EnrollModal from "./EnrollModal";
import { addCourseToCart } from "@/lib/cart";

interface Course {
  id: number;
  name: string;
  slug: string;
  image?: string;
  category: number;
  text: string;
  duration?: string;
  lecture?: string;
  students?: string;
  show_price?: boolean;
  showPrice?: boolean;
  price?: number | string;
  category_details?: {
    id: number;
    name: string;
    slug: string;
    image: string;
  };
}

export default function CategoryCoursesPage({ slug }: { slug: string }) {
  type RatingInfo = { average_rating?: number; total_reviews?: number };
//   const params = useParams();
//   const categorySlug = params.slug as string;
  const categorySlug = slug;
  const router = useRouter();

//   console.log("📌 Category slug from URL:", categorySlug);

  const [courses, setCourses] = useState<Course[]>([]);
  const [categoryName, setCategoryName] = useState("");
  const [loading, setLoading] = useState(true);
  const [ratings, setRatings] = useState<Record<number, RatingInfo>>({});
  const [enrollModalOpen, setEnrollModalOpen] = useState(false);
  const [enrollModalMode, setEnrollModalMode] = useState<"enroll" | "book_demo" | "download_brochure">("enroll");
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [addedToCart, setAddedToCart] = useState<Record<number, boolean>>({});

  const getImage = (img?: string) => {
    if (!img) return null;
    if (img.startsWith("http")) return img;
    return `${BASE_URL}${img.startsWith("/") ? img : "/" + img}`;
  };

  // Format students count
  const formatStudents = (students?: string) => {
    if (!students) return "0";
    const num = parseInt(String(students).replace(/\D/g, ""));
    return isNaN(num) ? "0" : num.toString();
  };

  const parsePrice = (v: unknown): number | null => {
    if (v === null || v === undefined) return null;
    if (typeof v === "number") return Number.isFinite(v) ? v : null;
    const cleaned = String(v).replace(/[^0-9.]/g, "");
    const num = Number(cleaned);
    return Number.isFinite(num) ? num : null;
  };

  const formatPrice = (num: number): string => {
    const formatter = new Intl.NumberFormat("en-IN", { maximumFractionDigits: 2 });
    return formatter.format(num);
  };

  const handleAddToCart = (course: any) => {
    const result = addCourseToCart({
      id: course.id,
      slug: course.slug,
      name: course.name,
      image: course.image,
      duration: course.duration,
      lecture: course.lecture,
      students: course.students,
      price: parsePrice(course.price || course.old_price || course.oldPrice) || 0,
      discount_price: parsePrice(course.discount_price || course.discounted_price) || 0,
    });

    if (result.added) {
      setAddedToCart((prev) => ({ ...prev, [course.id]: true }));
      setTimeout(() => {
        setAddedToCart((prev) => ({ ...prev, [course.id]: false }));
      }, 1500);
    } else {
      const Swal = require("sweetalert2");
      if ((result as any).limitReached) {
        Swal.fire({
          title: "Cart is Full",
          text: "You can only add one course to the cart at a time. Please remove the existing course to add a new one.",
          icon: "warning",
          confirmButtonColor: "var(--color-accent-purple)",
        });
      } else {
        Swal.fire({
          title: "Already in Cart",
          text: "This course is already in your cart.",
          icon: "info",
          confirmButtonColor: "var(--color-accent-purple)",
        });
      }
    }
  };// Fetch ratings for courses
  // const fetchRatings = async (courseList: Course[]) => {
  //   const ratingData: Record<number, any> = {};

  //   await Promise.all(
  //     courseList.map(async (course) => {
  //       try {
  //         const res = await fetch(
  //           `${BASE_URL}/course_average_rating/?course_id=${course.id}`
  //         );
  //         const json = await res.json();
  //         const data = json.course_average_rating?.[0];
  //         if (data) {
  //           ratingData[course.id] = data;
  //         }
  //       } catch (err) {
  //         console.error("Rating error", err);
  //       }
  //     })
  //   );

  //   setRatings(ratingData);
  // };
  const fetchRatings = async (courseList: Course[]) => {
    const courseIds = courseList.map(course => course.id);
    const ratingData = await apiService.getMultipleCourseRatings(courseIds);
    setRatings(ratingData as Record<number, RatingInfo>);
  };
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const apiUrl = API.CATEGORY.DETAIL_BY_SLUG(categorySlug);
        console.log("🌐 Fetching from URL:", apiUrl);

        const res = await fetch(apiUrl);
        console.log("📡 Response status:", res.status);

        const data = await res.json();
        console.log("📦 Response data:", data);

        if (data.success) {
          setCourses(data.data || []);

          if (data.data && data.data.length > 0) {
            setCategoryName(data.data[0].category_details?.name || categorySlug);
          }

          // Fetch ratings for courses
          if (data.data && data.data.length > 0) {
            fetchRatings(data.data);
          }
        } else {
          setCourses([]);
        }

      } catch (err) {
        console.error("❌ Error:", err);
        setCourses([]);
      } finally {
        setLoading(false);
      }
    };

    if (categorySlug) {
      fetchCourses();
    }
  }, [categorySlug]);

  // Loading Skeleton
  if (loading) {
    return (
      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="text-center mb-8 sm:mb-10">
          <div className="h-10 w-64 bg-gray-200 rounded mx-auto animate-pulse"></div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-5 gap-4 justify-items-center">
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <div key={n} className="w-[335px] p-2 rounded-3xl bg-white shadow-sm animate-pulse">
              <div className="h-[180px] sm:h-[200px] w-full bg-gray-200 rounded-t-2xl mb-2"></div>
              <div className="p-4">
                <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="flex gap-4 mb-3">
                  <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                </div>
                <div className="h-4 bg-gray-200 rounded w-full mb-1"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (courses.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Category: {categorySlug}
          </h1>
          <p className="text-gray-600">No courses found in this category</p>
          <Link
            href="/"
            className="mt-6 inline-block px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Go Back Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl sm:text-4xl font-bold mb-8 sm:mb-10 text-center text-[var(--color-text-strong)]"
      >
        {categoryName} Courses
      </motion.h1>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex flex-wrap justify-center gap-4 mx-auto"
      >
        {courses.map((course, index) => {
          const img = getImage(course.image);
          const rating = ratings[course.id]?.average_rating || 0;
          const reviews = ratings[course.id]?.total_reviews || 0;
          const showPrice = Boolean(course.show_price ?? course.showPrice);
          const parsedPrice = parsePrice(course.price);
          const isAdded = Boolean(addedToCart[course.id]);

          return (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="w-[335px] flex-shrink-0"
            >
              <div
                className="block p-2 rounded-3xl transition-all duration-300 hover:-translate-y-2 bg-white shadow-sm shadow-xl h-full"
              >
                <div className="flex flex-col w-full h-full">
                  {/* Image Container */}
                  <div className="relative h-[180px] sm:h-[200px] w-full bg-[var(--color-bg-light)] rounded-t-2xl overflow-hidden mb-2">
                    {img ? (
                      <Image
                        src={img}
                        alt={course.name}
                        fill
                        className="object-contain group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          target.parentElement!.innerHTML = `
                      <div class="flex items-center justify-center h-full text-gray-400 bg-gray-100">
                        <span class="text-sm">Image not available</span>
                      </div>
                    `;
                        }}
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full text-gray-400 bg-gray-100">
                        <span className="text-sm">No Image</span>
                      </div>
                    )}

                    {/* Duration Badge */}
                    {course.duration && (
                      <span className="absolute top-3 left-3 bg-white/90 text-xs px-3 py-1 rounded-full font-semibold shadow-sm">
                        {course.duration}
                      </span>
                    )}
                  </div>

                  {/* Content Section */}
                  <div className="p-4 pt-2">
                

                    {/* <h3 className="text-lg font-bold text-[var(--color-dark)] mb-2">
                      {course.name}
                    </h3>

                    {showPrice && (
                      <div className="flex items-center gap-2 mb-4">
                        <span className="text-xl font-bold text-[var(--color-logo-main)]">
                          ₹{new Intl.NumberFormat("en-IN").format(Number((course as any).discount_price) || 0)}
                        </span>
                        {course.price && Number(course.price) > 0 && (
                          <span className="text-sm text-gray-400 line-through">
                            ₹{new Intl.NumberFormat("en-IN").format(Number(course.price))}
                          </span>
                        )}
                        {course.price && Number(course.price) > Number((course as any).discount_price) && (
                          <span className="text-xs bg-green-100 text-green-600 px-2 py-0.5 rounded-full font-semibold">
                            {Math.round(((Number(course.price) - Number((course as any).discount_price)) / Number(course.price)) * 100)}% OFF
                          </span>
                        )}
                      </div>
                    )} */}
                    <div className="flex justify-between items-start gap-3 mb-4">

  {/* Title */}
  <h3 className="text-lg font-bold text-[var(--color-dark)] flex-1 line-clamp-2">
    {course.name}
  </h3>

  {/* Price */}
  {showPrice && (
    <div className="flex flex-col items-end shrink-0">

      {/* Old Price */}
      {course.price && Number(course.price) > 0 && (
        <span className="text-[10px] text-gray-400 line-through leading-none mb-0.5">
          ₹{new Intl.NumberFormat("en-IN").format(Number(course.price))}
        </span>
      )}

      {/* Discount Price */}
      <span className="text-base font-bold text-[var(--color-logo-main)] leading-none">
        ₹{new Intl.NumberFormat("en-IN").format(
          Number((course as any).discount_price) || 0
        )}
      </span>

   
    </div>
  )}

</div>

                    {/* Stats */}
                    <div className="flex gap-4 text-sm text-[var(--color-muted)] mb-3">
                      <span>📘 {course.lecture || "0"} Lessons</span>
                      <span>👨‍🎓 {formatStudents(course.students)} Students</span>
                    </div>

                    {/* Description */}
                    <div
                      className="text-[var(--color-muted)] text-sm mb-4 line-clamp-2"
                      dangerouslySetInnerHTML={{
                        __html: course?.text?.replace(/<[^>]*>/g, "") || "No description available",
                      }}
                    />

                    {/* Category */}
                    {course.category_details?.name && (
                      <div className="text-xs text-[var(--color-muted-light)] mb-4">
                        Category: {course.category_details.name}
                      </div>
                    )}
  <div className="flex items-center gap-2 text-sm mb-2 text-orange-400">
                      {/* ⭐ Dynamic Stars */}
                      <div className="flex items-center">
                        {[1, 2, 3, 4, 5].map((star) => {
                          const ratingValue = rating || 0;

                          let fillPercent = 0;

                          if (ratingValue >= star) {
                            fillPercent = 100;
                          } else if (ratingValue > star - 1) {
                            fillPercent = (ratingValue - (star - 1)) * 100;
                          }

                          return (
                            <span key={star} className="relative text-lg">
                              <span className="text-gray-300">★</span>
                              <span
                                className="absolute top-0 left-0 overflow-hidden text-yellow-500"
                                style={{ width: `${fillPercent}%` }}
                              >
                                ★
                              </span>
                            </span>
                          );
                        })}
                      </div>

                      {/* ⭐ Rating number */}
                      <span>
                        {rating
                          ? (rating % 1 === 0 ? rating : rating.toFixed(1))
                          : 0}
                      </span>

                      {/* ⭐ Reviews */}
                      <span className="text-[var(--color-muted)] ml-2">
                        ({reviews} {reviews === 1 ? 'Review' : 'Reviews'})
                      </span>
                    </div>
                   

                    {/* ACTION BUTTONS */}
                    <div className="mt-auto pt-4 w-full">
                      <div className="flex gap-3">
                        <Link
                          href={`/courses/${course.slug}`}
                          onClick={(e) => e.stopPropagation()}
                          className="flex-1 px-4 py-2 rounded-lg font-semibold text-sm text-[var(--color-white)] hover:opacity-90 transition text-center flex items-center justify-center"
                          style={{ background: "var(--color-logo-gradient)" }}
                        >
                          Know More
                        </Link>

                        {showPrice && (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleAddToCart(course);
                            }}
                            className="flex-1 px-4 py-2 rounded-lg font-semibold text-sm text-[var(--color-white)] hover:opacity-90 transition flex items-center justify-center gap-1"
                            style={{ background: "var(--color-logo-gradient)" }}
                          >
                            {isAdded ? "Added" : "Add to Cart"}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      <EnrollModal
        isOpen={enrollModalOpen}
        onClose={() => setEnrollModalOpen(false)}
        courses={selectedCourse ? [selectedCourse] : []}
        mode={enrollModalMode}
      />
    </div>
  );
}