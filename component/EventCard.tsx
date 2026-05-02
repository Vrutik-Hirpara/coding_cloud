"use client";

import { apiService, BASE_URL } from "@/lib/api";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import EnrollModal from "./EnrollModal";
import { addCourseToCart } from "@/lib/cart";

type EventItem = {
  id: number;
  slug: string;
  image: string;
  title: string;
  subtitle: string;
  author: string;
  dateRange: string;
  lessons: number;
  students: number;
  reviews: number;
  rating?: number;
  show_price?: boolean;
  showPrice?: boolean;
  price?: string | number;
  discount_price?: string | number;
  oldPrice?: string | number;
  category: string;
  instructor: string;
  instructorImage: string;
};

interface Props {
  event: EventItem;
  variant?: "default" | "kids";
}

const EventCard: React.FC<Props> = ({ event, variant = "default" }) => {
  const [avgRating, setAvgRating] = useState(0);
  const [totalReviews, setTotalReviews] = useState(0);
  const [isEnrollOpen, setIsEnrollOpen] = useState(false);
  const [enrollModalMode, setEnrollModalMode] = useState<"enroll" | "book_demo" | "download_brochure">("enroll");
  const [isAddedToCart, setIsAddedToCart] = useState(false);

  const showPrice = (event as any).show_price === true || (event as any).show_price === 1;

  const parsePrice = (v: unknown): number | null => {
    if (v === null || v === undefined || v === "") return null;
    if (typeof v === "number") return Number.isFinite(v) ? v : null;
    const cleaned = String(v).replace(/[^0-9.]/g, "");
    const num = Number(cleaned);
    return Number.isFinite(num) ? num : null;
  };

  const originalPriceNum = parsePrice(event.price || (event as any).oldPrice || (event as any).old_price);
  const salePriceNum = parsePrice((event as any).discount_price || (event as any).discounted_price);

  const formatPrice = (p: number | null) => {
    if (p === null) return "0";
    return new Intl.NumberFormat("en-IN").format(p);
  };

  const handleAddToCart = () => {
    const result = addCourseToCart({
      id: event.id,
      slug: event.slug,
      name: event.title,
      image: event.image,
      duration: event.dateRange || "",
      lecture: String(event.lessons),
      students: String(event.students),
      price: originalPriceNum || 0,
      discount_price: salePriceNum || 0,
    });

    if (result.added) {
      setIsAddedToCart(true);
      setTimeout(() => setIsAddedToCart(false), 2000);
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

  const courseForModal = {
    id: event.id,
    name: event.title,
    slug: event.slug,
    image: event.image,
  };

  useEffect(() => {
    const fetchRating = async () => {
      try {
        const json = await apiService.getCourseAverageRating(event.id);
        const data = json.course_average_rating?.[0];
        if (data) {
          setAvgRating(Number(data.average_rating) || 0);
          setTotalReviews(Number(data.total_reviews) || 0);
        }
      } catch (err) {
        console.error("Error fetching rating:", err);
      }
    };

    if (event?.id) fetchRating();
  }, [event?.id]);

  return (
    <div className="w-full h-full pt-2">

      {/* ---------- DESIGN 1 ---------- */}
      {variant === "default" && (
        <div className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 flex flex-col h-full w-full">

          {/* IMAGE */}
          <div className="relative overflow-hidden h-[215px] w-full">
            <Image
              src={event.image || "/images/placeholder-course.jpg"}
              alt={event.title}
              fill
              className="object-contain aspect-square"
              sizes="320px"
            />

            <div className="absolute top-2 left-1 bg-white px-3 py-1 rounded-full text-xs font-semibold shadow-sm z-10">
              {event.dateRange}
            </div>


          </div>

          {/* CONTENT */}
          <div className="px-3 pt-6 pb-4 flex flex-col flex-grow">



            {/* <h3 className="text-xl font-bold mb-3 line-clamp-2">
              {event.title}
            </h3>
         
            {showPrice && (
              <div className="flex flex-col items-end">
                <span className="text-[10px] text-gray-400 line-through leading-none mb-0.5">
                  ₹{formatPrice(originalPriceNum)}
                </span>
                <span className="text-base font-bold text-[var(--color-logo-main)] leading-none">
                  ₹{formatPrice(salePriceNum)}
                </span>
              </div>
            )} */}
            <div className="flex justify-between items-start gap-3">
              {/* TITLE */}
              <h3 className="text-xl font-bold line-clamp-2 flex-1">
                {event.title}
              </h3>

              {/* PRICE */}
              {showPrice && (
                <div className="flex flex-col items-end shrink-0">
                  <span className="text-[10px] text-gray-400 line-through leading-none mb-0.5">
                    ₹{formatPrice(originalPriceNum)}
                  </span>
                  <span className="text-base font-bold text-[var(--color-logo-main)] leading-none">
                    ₹{formatPrice(salePriceNum)}
                  </span>
                </div>
              )}
            </div>
            {/* CATEGORY */}
            <p className="text-sm text-gray-500 mb-2 line-clamp-2">
              {event.subtitle}
            </p>

            {/* AUTHOR */}
            <p className="text-sm text-gray-500 mb-4 line-clamp-1">
              By {event.author}
            </p>

            {/* META */}
            <div className="flex justify-between text-sm text-gray-500 mb-4">
              <span>{event.lessons || 0} Lessons</span>
              <span>{event.students || 0} Students</span>
            </div>

            <div className="flex text-gray-500 items-center justify-between w-full">
              <div className="flex items-center gap-1">
                <span className="font-bold text-gray-500">
                  {avgRating
                    ? (avgRating % 1 === 0 ? avgRating : avgRating.toFixed(1))
                    : 0}
                </span>
                <div className="relative inline-block text-gray-300">
                  <span className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span key={star}>★</span>
                    ))}
                  </span>

                  <span
                    className="flex absolute top-0 left-0 overflow-hidden text-yellow-400"
                    style={{ width: `${(avgRating / 5) * 100}%` }}
                  >
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span key={star}>★</span>
                    ))}
                  </span>
                </div>

                <span className="text-[var(--color-heading)] text-sm text-gray-500">
                  ({totalReviews} ratings)
                </span>
              </div>


            </div>

            {/* ACTION BUTTONS */}
            <div className="mt-auto pt-3 pb-1">
              <div className="flex gap-3">
                <Link
                  href={`/courses/${event.slug}`}
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
                      handleAddToCart();
                    }}
                    className="flex-1 px-4 py-2 rounded-lg font-semibold text-sm text-[var(--color-white)] hover:opacity-90 transition flex items-center justify-center gap-1"
                    style={{ background: "var(--color-logo-gradient)" }}
                  >
                    {isAddedToCart ? "Added" : "Add to Cart"}
                  </button>
                )}
              </div>
            </div>

          </div>
        </div>
      )}

      {/* ---------- DESIGN 2 (Kids) ---------- */}
      {variant === "kids" && (
        <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition p-6 flex flex-col sm:flex-row gap-6 items-start sm:items-center h-full w-full">

          {/* LEFT IMAGE SECTION */}
          <div className="w-full sm:w-[40%] flex-shrink-0 relative">
            <img
              src={event.image}
              alt={event.title}
              className="w-full h-[180px] object-contain"
            />



            <div className="flex gap-3 mt-3">
              <span className="bg-gray-100 text-xs px-1 py-2 rounded-md shadow flex items-center gap-1">
                🎥 {event.lessons || 0} lesson
              </span>

              <span className="bg-gray-100 text-xs px-1 py-2 rounded-md shadow flex items-center gap-1">
                👨‍🎓 {event.students || 0} Students
              </span>
            </div>
          </div>

          {/* RIGHT CONTENT */}
          <div className="w-full sm:w-[60%] flex-1 flex flex-col h-full">

            {/* <div className="flex items-center justify-between w-full mb-2">
            

              {showPrice && (
                <div className="flex flex-col items-end">
                  <span className="text-xs text-gray-400 line-through">
                    ₹{formatPrice(originalPriceNum)}
                  </span>
                  <span className="text-lg font-bold text-[var(--color-logo-main)]">
                    ₹{formatPrice(salePriceNum)}
                  </span>
                </div>
              )}
            </div>



            <h3 className="text-xl sm:text-2xl font-bold mb-2 line-clamp-2">
              {event.title}
            </h3> */}

            <div className="flex items-start justify-between mb-2 gap-2">
  
  {/* LEFT SIDE - TITLE */}
  <h3 className="text-xl sm:text-2xl font-bold line-clamp-2 flex-1">
    {event.title}
  </h3>

  {/* RIGHT SIDE - PRICE */}
  {showPrice && (
    <div className="flex flex-col items-end shrink-0">
      <span className="text-xs text-gray-400 line-through">
        ₹{formatPrice(originalPriceNum)}
      </span>
      <span className="text-lg font-bold text-[var(--color-logo-main)]">
        ₹{formatPrice(salePriceNum)}
      </span>
    </div>
  )}

</div>

            <div className="flex gap-6 text-sm text-gray-500 mb-3">
              <span>{event.lessons || 0} Lessons</span>
              <span>{event.students || 0} Students</span>
            </div>

            <p className="text-gray-500 mb-4 line-clamp-2">
              {event.subtitle}
            </p>

            <div className="flex items-center gap-2 mb-4">
              <span className="text-gray-500">
                By {event.instructor}
              </span>
            </div>
  <div className="flex items-center gap-1">
                <span className="font-bold text-gray-500">
                  {avgRating
                    ? (avgRating % 1 === 0 ? avgRating : avgRating.toFixed(1))
                    : 0}
                </span>
                <div className="relative inline-block text-gray-300">
                  <span className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span key={star}>★</span>
                    ))}
                  </span>

                  <span
                    className="flex absolute top-0 left-0 overflow-hidden text-yellow-400"
                    style={{ width: `${(avgRating / 5) * 100}%` }}
                  >
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span key={star}>★</span>
                    ))}
                  </span>
                </div>

                <span className="text-[var(--color-heading)] text-sm text-gray-500">
                  ({totalReviews} ratings)
                </span>
              </div>
            <div className="mt-auto pt-3 w-full">
              <div className="flex gap-3">
                <Link
                  href={`/courses/${event.slug}`}
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
                      handleAddToCart();
                    }}
                    className="flex-1 px-4 py-2 rounded-lg font-semibold text-sm text-[var(--color-white)] hover:opacity-90 transition flex items-center justify-center gap-1"
                    style={{ background: "var(--color-logo-gradient)" }}
                  >
                    {isAddedToCart ? "Added" : "Add to Cart"}
                  </button>
                )}
              </div>
            </div>
          </div>

        </div>
      )}

      <EnrollModal
        isOpen={isEnrollOpen}
        onClose={() => setIsEnrollOpen(false)}
        courses={[courseForModal]}
        mode={enrollModalMode}
      />


    </div>
  );
}
export default EventCard;