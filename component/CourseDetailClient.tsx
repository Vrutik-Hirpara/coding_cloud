"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import CourseTabs from "@/component/CourseTabs";
import { motion } from "framer-motion";
import CourseSidebar from "@/component/CourseSidebar";
import RelatedCourses from "@/component/RelatedCourses";
import { riverEnter, riverLeave } from "@/app/utils/riverAnimation";
import event1 from "@/public/images/courses/course-online-01.jpg";
import event2 from "@/public/images/courses/course-online-02.jpg";
import user1 from "@/public/images/avatars/avatar-02.png";
import user2 from "@/public/images/avatars/avatar-01.png";
import { apiService, BASE_URL } from "@/lib/api";
import Link from "next/link";
interface Course {
  id: number;
  slug: string;
  name: string;
  image: string;
  short_description: string;
  banner_img: string;
  text: string;
  duration: string;
  lecture: string;
  students: string;
  level: string;
  language: string;
  certificate: string;
  category_details: { name: string };
}
const getImageUrl = (path?: string) => {
  if (!path) return "";
  if (path.startsWith("http")) return path;
  return `${BASE_URL}${path}`;
};

export default function Page({ slug }: { slug: string }) {
  const [isEnrollOpen, setIsEnrollOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [course, setCourse] = useState<Course | null>(null);
  const [avgRating, setAvgRating] = useState(0);
  const [totalReviews, setTotalReviews] = useState(0);
  // 🔥 FETCH COURSE BY SLUG
  // useEffect(() => {
  //   const getCourse = async () => {
  //     try {
  //       const res = await fetch(
  //         `${BASE_URL}/course/?slug=${slug}`
  //       );

  //       const json = await res.json();

  //       const list = Array.isArray(json.data) ? json.data : [];

  //       // API already filter by slug but still safety
  //       const selected =
  //         list.find((c: Course) => c.slug === slug) || list[0];

  //       setCourse(selected || null);
  //     } catch (err) {
  //       console.error("Course fetch error", err);
  //     }
  //   };
  //   getCourse();
  // }, [slug]);
  useEffect(() => {
    const getCourse = async () => {
      if (!slug) return;

      // 🔥 Convert slug to string safely
      const slugStr = Array.isArray(slug) ? slug[0] : slug;

      try {
        const json = await apiService.getCourseBySlug(slugStr);

        const list = Array.isArray(json.data) ? json.data : [];

        const selected =
          list.find((c: Course) => c.slug === slugStr) || list[0];

        setCourse(selected || null);
      } catch (err) {
        console.error("Course fetch error", err);
      }
    };

    getCourse();
  }, [slug]);
  // useEffect(() => {
  //   const fetchRating = async () => {
  //     try {
  //       const res = await fetch(
  //         `${BASE_URL}/course_average_rating/?course_id=${course?.id}`
  //       );

  //       const json = await res.json();

  //       const data = json.course_average_rating?.[0];

  //       if (data) {
  //         setAvgRating(data.average_rating);
  //         setTotalReviews(data.total_reviews);
  //       }
  //     } catch (err) {
  //       console.error("Rating fetch error", err);
  //     }
  //   };

  //   if (course?.id) fetchRating();
  // }, [course?.id]);
  useEffect(() => {
    const fetchRating = async () => {
      if (!course?.id) return;

      try {
        const json = await apiService.getCourseAverageRating(course.id);

        const data = json.course_average_rating?.[0];

        if (data) {
          setAvgRating(data.average_rating);
          setTotalReviews(data.total_reviews);
        }
      } catch (err) {
        console.error("Rating fetch error", err);
      }
    };

    fetchRating();
  }, [course?.id]);
  if (!course) {
    return <div className="py-20 text-center">
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
    </div>;
  }


  return (
    <div className="bg-[var(--color-bg-light)]">
      {/* 🔥 HEADER */}
      {/* <section className="bg-gradient-to-b from-[#ede9fe] to-white pt-16 pb-28 text-center">
        <div className="flex justify-center items-center gap-4 text-sm mb-4 flex-wrap">
          <span className="bg-[var(--color-white)] px-3 py-1 rounded-full shadow text-[var(--color-accent-purple)] font-semibold">
            Bestseller
          </span>
          <span className="text-yellow-500 font-semibold">
            {avgRating} ★★★★★
          </span>

          <span className="text-[var(--color-muted)]">
            ({totalReviews} ratings)
          </span>
          <span className="text-[var(--color-muted)]">
            {course.students || 0} students
          </span>
        </div>

        <h1 className="text-3xl md:text-5xl font-bold text-[var(--color-accent-purple)]">
          {course.name}
        </h1>


      </section>


      <div className="w-full -mt-20 md:-mt-24">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="relative w-full h-[440px] sm:h-[260px] md:h-[500px] overflow-hidden shadow-xl border-y-4 border-white"
        >
          <Image
            src={getImageUrl(course.banner_img || course.image)}
            alt={course.name}
            fill
            sizes="100vw"
            priority
            unoptimized
            className="object-fill"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/10 to-transparent pointer-events-none" />
        </motion.div>
      </div> */}

      <section
        className="pt-16 sm:pb-24 pb-16 container-custom"
        style={{
          backgroundImage: `linear-gradient(rgb(148 179 246) 0%, rgb(79, 130, 240) 45%, rgb(147 173 252) 100%), url(${getImageUrl(
            course.banner_img || course.image
          )})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="container-custom  mx-auto px-4">
          {/* Main Content */}
          <div className="max-w-xl  xl:max-w-3xl 2xl:max-w-7xl">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
              {/* Home */}
              <Link href="/" className="hover:text-[var(--color-accent-purple)]  transition">
                Home
              </Link>

              <span>›</span>
              <Link href="/courses" className="hover:text-[var(--color-accent-purple)]  transition">
                Course
              </Link>
              <span>›</span>

              {/* Course Name */}
              <span
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="cursor-pointer text-[var(--color-accent-purple)] transition"
              >
                {course?.name}
              </span>

            </div>

            {/* Heading */}
            {/* <h1 className="flex items-center gap-4 text-3xl md:text-4xl text-[50px] font-[700] lg:text-5xl font-bold text-gray-900 mb-6 leading-relaxed"> */}
            <h1 className="flex items-center gap-4 
text-2xl sm:text-3xl md:text-4xl lg:text-5xl 
font-bold text-gray-900 sm:mb-6 mb-3 leading-tight">
              {/* <Image
                src={getImageUrl(course.image)}
                alt={course.name}
                width={80}
                height={100}
                className="w-16 h-16 md:w-20 md:h-20 object-contain"
              /> */}

              <span className="text-[var(--color-black)]">
                {course.name}
              </span>
            </h1>

            {/* Description */}
            <p className="text-[var(--color-black)] text-lg max-w-3xl mb-4 sm:mb-8">
              {course.short_description}
            </p>

            {/* Stats Row */}
            <div className="flex flex-wrap items-center gap-6 mb-2 sm:mb-4 text-md leading-[1.5] font-normal">              {/* Bestseller Badge */}


              {/* Rating */}
              {/* <div className="flex items-center gap-1">
                <span className="font-bold text-gray-900">{avgRating}</span>
                <span className="text-yellow-400">★★★★★</span>
                <span className="text-[var(--color-heading)] text-sm">({totalReviews} ratings)</span>
              </div> */}
              <div className="flex items-center gap-1">
                <span className="font-bold text-gray-900">{avgRating}</span>

                <div className="relative inline-block text-gray-300">
                  {/* Gray stars */}
                  <span className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span key={star}>★</span>
                    ))}
                  </span>

                  {/* Yellow overlay */}
                  <span
                    className="flex absolute top-0 left-0 overflow-hidden text-yellow-400"
                    style={{ width: `${(avgRating / 5) * 100}%` }}
                  >
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span key={star}>★</span>
                    ))}
                  </span>
                </div>

                <span className="text-[var(--color-heading)] text-sm">
                  ({totalReviews} ratings)
                </span>
              </div>
              {/* Students */}
              <div className="text-[var(--color-heading)] text-sm">
                {course.students || 0} students
              </div>

              {/* Instructor */}
              {/* <div className="text-gray-500 text-sm">
          By Angela In Development
        </div> */}
            </div>

            {/* Course Meta Info */}
            <div className="flex flex-wrap items-center gap-4 text-md text-[var(--color-heading)]">
              <span>🎓 {course.language}</span>
              <span>🏆 Certified Course</span>
            </div>
          </div>


        </div>
      </section>
      {/* 🔥 MAIN CONTENT */}
      <div className=" mx-auto px-4 py-4 sm:px-8 md:px-4 lg:px-12 xl:px-16 2xl:px-24">

        {/* <div className="flex flex-col lg:grid lg:grid-cols-[1fr_280px] gap-6 lg:gap-8"> */}
        <div className="flex flex-col lg:grid lg:grid-cols-[1fr_340px] gap-6 lg:gap-8">

          {/* LEFT SIDE */}
          <div className="w-full">
            <CourseTabs course={course} />
          </div>
          <div className="lg:hidden mt-8">
            <CourseSidebar
              course={course}
              setIsEnrollOpen={setIsEnrollOpen}
            />
          </div>
          {/* RIGHT SIDEBAR */}
          {/* <div className="lg:sticky lg:top-[140px] lg:self-start"> */}
          {/* <div className="lg:-mt-40 lg:sticky lg:top-[120px] lg:self-start">
      <CourseSidebar
        course={course}
        setIsEnrollOpen={setIsEnrollOpen}
      />
    </div> */}
          {/* <div className="lg:relative lg:top-1/2 lg:-translate-y-1/2 lg:sticky lg:self-start">
            <CourseSidebar
              course={course}
              setIsEnrollOpen={setIsEnrollOpen}
            />
          </div> */}
          {/* <div className="pt-4 lg:sticky lg:top-[120px] lg:self-start "> */}
          {/* <div className="lg:-mt-48 pt-4 lg:sticky  lg:top-[120px] lg:self-start">
            <CourseSidebar
              course={course}
              setIsEnrollOpen={setIsEnrollOpen}
            />
          </div> */}
          {/* <div className="pt-4 lg:-mt-[220px] lg:sticky lg:top-[120px] lg:self-start">
            <CourseSidebar
              course={course}
              setIsEnrollOpen={setIsEnrollOpen}
            />
          </div> */}
          {/* <div className="pt-4 lg:sticky lg:top-[120px] lg:self-start h-fit">
            <CourseSidebar course={course}
              setIsEnrollOpen={setIsEnrollOpen}
            />
          </div> */}
          {/* RIGHT SIDEBAR - NAVBAR HEIGHT MATCHING */}
          {/* <div
            className="hidden lg:block"
            style={{
              position: 'sticky',
              top: '140px',
              alignSelf: 'start',
              width: '340px',
              marginTop: '-200px'
            }}
          >
            <CourseSidebar
              course={course}
              setIsEnrollOpen={setIsEnrollOpen}
            />
          </div> */}
          <div className="hidden lg:block -mt-[280px] lg:sticky lg:top-[140px] self-start h-fit">
            <CourseSidebar
              course={course}
              setIsEnrollOpen={setIsEnrollOpen}
            />
          </div>
        </div>
      </div>

      <RelatedCourses />
    </div >
  );
}
