

"use client";

import CardSlider from "@/component/CardSlider";
import { useState, useEffect, useRef } from "react";
import {
  FaUserGraduate,
  FaLaptopCode,
  FaAward,
  FaUsers,
} from "react-icons/fa";
import event1 from "@/public/images/courses/course-online-01.jpg";
import event2 from "@/public/images/courses/course-online-02.jpg";
import event3 from "@/public/images/courses/course-online-03.jpg";
import user1 from "@/public/images/avatars/avatar-02.png";
import user2 from "@/public/images/avatars/avatar-01.png";
import user3 from "@/public/images/avatars/avatar-03.png";
import Categories from "@/component/Categories";
import TestimonialSection from "@/component/TestimonialSection";
import HeroSection from "@/component/HeroSection";
import KnowAboutUs from "@/component/KnowAboutUs";
import WhyChooseUs from "@/component/WhyChooseUs";
import '../index.css'
import Pill from "@/component/ui/Pill";
import BlogPost from "@/component/blogpost";
import KidsCoursesSection from "@/component/KidsCoursesSection";
import Heading from "@/component/ui/Heading";
import FeaturedCoursesSection from "@/component/FeaturedCoursesSection";
import RegisterPage from "./RegisterClient";
import Accreditation from "@/component/Accreditation";
// import { API } from "@/app/api/endpoints/route";
import { BASE_URL, API, apiService } from "@/lib/api";
// ============================
// MAIN HOME PAGE
// ============================
export default function HomePage() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      const data = await apiService.getCoursesWithRatings();
      setCourses(data);
    };

    fetchCourses();
  }, []);

  const stats = [
    {
      icon: <FaUserGraduate className="text-[var(--color-accent-pink)] text-3xl" />,
      number: 500,
      label: "Learners & counting",
    },
    {
      icon: <FaLaptopCode className="text-[var(--color-accent-pink)] text-3xl" />,
      number: 800,
      label: "Courses & Video",
    },
    {
      icon: <FaAward className="text-[var(--color-accent-pink)] text-3xl" />,
      number: 999,
      label: "Certified Students",
    },
    {
      icon: <FaUsers className="text-[var(--color-accent-pink)] text-3xl" />,
      number: 100,
      label: "Registered Enrolls",
    },
  ];

  // ================= EVENTS DATA =================
  const eventsData = [
    {
      id: 1,
      image: event1.src,
      title: "React Bootcamp",
      subtitle: "Development",
      author: "Coding Cloud",
      dateRange: "10 - 15 Feb",
      lessons: 12,
      students: 50,
      reviews: 10,
      price: "$70",
      oldPrice: "$120",
      category: "Web",
      instructor: "John",
      instructorImage: user1.src,
    },
    {
      id: 2,
      image: event2.src,
      title: "JavaScript Mastery",
      subtitle: "Programming",
      author: "Coding Cloud",
      dateRange: "18 - 22 Feb",
      lessons: 18,
      students: 80,
      reviews: 25,
      price: "$60",
      oldPrice: "$100",
      category: "Programming",
      instructor: "Emily",
      instructorImage: user2.src,
    },
    {
      id: 3,
      image: event3.src,
      title: "UI/UX Design Bootcamp",
      subtitle: "Design",
      author: "Coding Cloud",
      dateRange: "1 - 5 Mar",
      lessons: 20,
      students: 65,
      reviews: 30,
      price: "$50",
      oldPrice: "$90",
      category: "Design",
      instructor: "Michael",
      instructorImage: user3.src,
    },
  ];

  // ================= RENDER =================
  // return (
  //   <div className="bg-[var(--color-white)] min-h-screen">
  return (
    <div className="bg-[var(--color-white)] min-h-screen overflow-x-hidden">
      {/* HERO */}
      <HeroSection courses={courses} />

      {/* CATEGORIES */}
      <Categories />

      {/* ABOUT */}
      <KnowAboutUs />

      {/* STATS */}
      <WhyChooseUs stats={stats} />

      {/* TESTIMONIAL */}
      <section className="py-24 bg-[var(--color-bg-light)] overflow-hidden relative border-t-4 border-[var(--color-accent-purple)]">
        <div className="container-custom text-center mb-16">
          {/* <span className="inline-block px-4 py-1 mb-5 text-sm font-semibold text-[var(--color-primary)] bg-blue-100 rounded-full uppercase tracking-wider">
            EDUCATION FOR EVERYONE
          </span> */}
          <Pill
            text="Education For Everywhere"
            textColor="var(--color-accent-purple)"
            bgColor="var(--color-primary-light)"
          />

          <Heading
            title={
              <>
                People like Coding Cloud education. <br />
                No joking - here’s the proof!
              </>
            }
          />
        </div>

        <TestimonialSection />
      </section>

      <RegisterPage />
      {/* EVENTS */}
      <FeaturedCoursesSection />
      <KidsCoursesSection />
      {/* BLOG */}
      <BlogPost />
      <Accreditation />
    </div>
  );
}

