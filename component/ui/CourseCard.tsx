"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ReactNode, useState } from "react";
import { addCourseToCart } from "@/lib/cart";
import EnrollModal from "../EnrollModal";
import { BASE_URL } from "@/lib/api";

interface Course {
  id: number;
  slug: string;
  name: string;
  image?: string;
  description?: string;
  duration?: string;
  lecture?: string;
  students?: string;
  short_description?: string;
  category_details?: {
    name: string;
  };
}

interface CourseCardProps {
  course: Course;
  rating?: number;
  reviews?: number;
  imageBaseUrl?: string;
  index?: number;
  className?: string;
  showCategory?: boolean;
  showRating?: boolean;
  showStats?: boolean;
  showDuration?: boolean;
  showDescription?: boolean;
  children?: ReactNode;
}

export default function CourseCard({
  course,
  rating = 0,
  reviews = 0,
  imageBaseUrl = "",
  index = 0,
  className = "",
  showCategory = true,
  showRating = true,
  showStats = true,
  showDuration = true,
  showDescription = true,
  children,
}: CourseCardProps) {
  const [isAdded, setIsAdded] = useState(false);
  const [isEnrollOpen, setIsEnrollOpen] = useState(false);
  const [enrollModalMode, setEnrollModalMode] = useState<"enroll" | "book_demo" | "download_brochure">("enroll");

  // Helper function to get full image URL
  const getFullImageUrl = (bannerImg?: string) => {
    if (!bannerImg) return null;
    if (bannerImg.startsWith('http')) return bannerImg;
    const cleanPath = bannerImg.startsWith('/') ? bannerImg : `/${bannerImg}`;
    return `${BASE_URL}${cleanPath}`;
  };

  const parsePrice = (v: unknown): number | null => {
    if (v === null || v === undefined || v === "") return null;
    if (typeof v === "number") return Number.isFinite(v) ? v : null;
    const cleaned = String(v).replace(/[^0-9.]/g, "");
    const num = Number(cleaned);
    return Number.isFinite(num) ? num : null;
  };

  const originalPriceNum = parsePrice((course as any).price || (course as any).old_price || (course as any).oldPrice);
  const salePriceNum = parsePrice((course as any).discount_price || (course as any).discounted_price);

  const formatPrice = (p: number | null) => {
    if (p === null) return "0";
    return new Intl.NumberFormat("en-IN").format(p);
  };




  // Format students count
  const formatStudents = (students?: string) => {
    if (!students) return "0";
    const num = parseInt(String(students).replace(/\D/g, ""));
    return isNaN(num) ? "0" : num.toString();
  };

  const imageUrl = getFullImageUrl(course.image);

  const handleAddToCart = () => {
    const result = addCourseToCart({
      id: course.id,
      slug: course.slug,
      name: course.name,
      image: course.image,
      duration: course.duration,
      lecture: course.lecture,
      students: course.students,
      price: originalPriceNum || 0,
      discount_price: salePriceNum || 0,
    });

    if (result.added) {
      setIsAdded(true);
      setTimeout(() => setIsAdded(false), 1500);
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
  };

  // Rating Stars Component
  const RatingStars = () => {
    if (!showRating) return null;

    return (
      <div className="flex items-center gap-2 text-sm mb-2">
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
        <span className="text-orange-400">
          {rating ? (rating % 1 === 0 ? rating : rating.toFixed(1)) : 0}
        </span>
        <span className="text-[var(--color-muted)] ml-2">
          ({reviews} {reviews === 1 ? 'Review' : 'Reviews'})
        </span>
      </div>
    );
  };

  // Course Stats Component
  const CourseStats = () => {
    if (!showStats) return null;

    return (
      <div className="flex gap-4 text-sm text-[var(--color-muted)] mb-3">
        <span>📘 {course.lecture || "0"} Lessons</span>
        <span>👨‍🎓 {formatStudents(course.students)} Students</span>
      </div>
    );
  };

  // Duration Badge Component
  const DurationBadge = () => {
    if (!showDuration || !course.duration) return null;

    return (
      <span className="absolute top-3 left-3 bg-white/90 text-xs px-3 py-1 rounded-full font-semibold shadow-sm">
        {course.duration}
      </span>
    );
  };

  // Course Image Component
  const CourseImage = () => {
    return (
      <div className="relative h-[180px] sm:h-[200px] w-full bg-[var(--color-bg-light)] rounded-t-2xl overflow-hidden mb-2">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={course.name}
            className="w-full h-full object-contain group-hover:scale-105 transition duration-500"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.onerror = null;
              target.style.display = 'none';
              if (target.parentElement) {
                target.parentElement.innerHTML = `
                  <div class="flex items-center justify-center h-full text-[var(--color-muted-light)] bg-[var(--color-bg-softest)]">
                    <span class="text-sm">Image not available</span>
                  </div>
                `;
              }
            }}
          />
        ) : (
          <div className="flex items-center justify-center h-full text-[var(--color-muted-light)] bg-[var(--color-bg-softest)]">
            <span className="text-sm">No banner</span>
          </div>
        )}
        <DurationBadge />
      </div>
    );
  };

  // Course Description Component
  const CourseDescription = () => {
    if (!showDescription) return null;

    return (
      <p
        className="text-[var(--color-muted)] text-sm mb-4 line-clamp-2"
        dangerouslySetInnerHTML={{
          __html: course.short_description || "No description available",
        }}
      />
    );
  };

  // Category Component
  const CategoryBadge = () => {
    if (!showCategory || !course.category_details?.name) return null;

    return (
      <div className="text-xs text-[var(--color-muted-light)] mb-4">
        Category: {course.category_details.name}
      </div>
    );
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        whileHover={{ y: -5 }}
        className={`w-[335px] ${className}`}
      >
        <div className="block p-2 rounded-3xl shadow-xl transition-all duration-300 hover:-translate-y-2 bg-white shadow-sm hover:shadow-xl h-full">
          <div className="flex flex-col w-full h-full">
            <div className="p-4 pt-2">
              <Link href={`/courses/${course.slug}`} className="block">
                <CourseImage />
              </Link>
              {/* <div className="flex items-center justify-between mb-2">
                
                {Boolean((course as any).show_price) && (
                  <div className="flex flex-col items-end">
                    <span className="text-[10px] text-gray-400 line-through">
                      ₹{formatPrice(originalPriceNum)}
                    </span>
                    <span className="text-sm font-bold text-[var(--color-logo-main)]">
                      ₹{formatPrice(salePriceNum)}
                    </span>
                  </div>
                )}
              </div>
              <Link href={`/courses/${course.slug}`} className="block">
                <h3 className="text-lg font-bold text-[var(--color-dark)] mb-2 line-clamp-2 hover:text-[var(--color-accent-purple)] transition-colors">
                  {course.name}
                </h3>
              </Link> */}
              <div className="flex items-start justify-between mb-2">

                {/* LEFT SIDE: COURSE NAME */}
                <Link href={`/courses/${course.slug}`} className="block flex-1 pr-2">
                  <h3 className="text-lg font-bold text-[var(--color-dark)] line-clamp-2 hover:text-[var(--color-accent-purple)] transition-colors">
                    {course.name}
                  </h3>
                </Link>

                {/* RIGHT SIDE: PRICE */}
                {Boolean((course as any).show_price) && (
                  <div className="flex flex-col items-end">
                    <span className="text-[10px] text-gray-400 line-through">
                      ₹{formatPrice(originalPriceNum)}
                    </span>
                    <span className="text-sm font-bold text-[var(--color-logo-main)]">
                      ₹{formatPrice(salePriceNum)}
                    </span>
                  </div>
                )}

              </div>
              <CourseStats />
              <CourseDescription />
              <CategoryBadge />
              <RatingStars />


              <div className="flex flex-col gap-3 mt-4">
                <div className="flex items-center gap-3">
                  <Link
                    href={`/courses/${course.slug}`}
                    onClick={(e) => e.stopPropagation()}
                    className="flex-1 px-4 py-2 text-sm font-semibold rounded-lg text-white hover:opacity-90 transition text-center flex items-center justify-center"
                    style={{ background: "var(--color-logo-gradient)" }}
                  >
                    Know More
                  </Link>
                  {Boolean((course as any).show_price) && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAddToCart();
                      }}
                      className="flex-1 px-4 py-2 text-sm font-semibold rounded-lg text-white hover:opacity-90 transition"
                      style={{ background: "var(--color-logo-gradient)" }}
                    >
                      {isAdded ? "Added" : "Add to Cart"}
                    </button>
                  )}
                </div>
              </div>

              {children}
            </div>
          </div>
        </div>
      </motion.div>

      <EnrollModal
        isOpen={isEnrollOpen}
        onClose={() => setIsEnrollOpen(false)}
        courses={[course]}
        mode={enrollModalMode}
      />
    </>
  );
}

// Skeleton Loader Component
export const CourseCardSkeleton = () => {
  return (
    <div className="w-[335px] p-2 rounded-3xl bg-white shadow-sm animate-pulse">
      <div className="h-[180px] sm:h-[200px] w-full bg-[var(--color-light)] rounded-t-2xl mb-2"></div>
      <div className="p-4">
        <div className="h-4 bg-[var(--color-light)] rounded w-1/4 mb-2"></div>
        <div className="h-6 bg-[var(--color-light)] rounded w-3/4 mb-2"></div>
        <div className="flex gap-4 mb-3">
          <div className="h-4 bg-[var(--color-light)] rounded w-1/3"></div>
          <div className="h-4 bg-[var(--color-light)] rounded w-1/3"></div>
        </div>
        <div className="h-4 bg-[var(--color-light)] rounded w-full mb-1"></div>
        <div className="h-4 bg-[var(--color-light)] rounded w-2/3"></div>
      </div>
    </div>
  );
};