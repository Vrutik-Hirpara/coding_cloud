
"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Button from "../component/ui/Button";
import aboutBg from "../public/images/about/about-bg.jpeg";
import { apiService, BASE_URL } from "../lib/api";
import { Accordion, AccordionItem } from "@/component/ui/Accordion";

// Interfaces
interface Course {
  id: number;
  name: string;
  slug: string;
  image?: string;
  icon?: string;
}

interface FAQ {
  id: number;
  course: number;
  course_name: string;
  question: string;
  answer: string;
}

export default function CourseFaqs() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [faqsLoading, setFaqsLoading] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  
  const rightSideRef = useRef<HTMLDivElement>(null);

  // Check screen size
  const isMobileView = () => {
    if (typeof window !== 'undefined') {
      return window.innerWidth < 1024;
    }
    return false;
  };

  // Fetch all courses
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await apiService.getCourses();

        if (data?.data) {
          setCourses(data.data);
          if (data.data.length > 0) {
            setSelectedCourse(data.data[0].id);
          }
        }
      } catch (err) {
        console.error("Courses fetch error", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  // Fetch FAQs when selected course changes
  useEffect(() => {
    if (!selectedCourse) return;

    const fetchFaqs = async () => {
      setFaqsLoading(true);
      try {
        const data = await apiService.getFaqs();
        if (data?.data) {
          const courseFaqs = data.data.filter(
            (faq: FAQ) => faq.course === selectedCourse
          );
          setFaqs(courseFaqs);
          setExpandedFaq(null);
          
          // ✅ Auto scroll to top of FAQs section ONLY on screens below 1024px
          setTimeout(() => {
            if (rightSideRef.current && isMobileView()) {
              const elementPosition = rightSideRef.current.getBoundingClientRect().top;
              const offsetPosition = elementPosition + window.pageYOffset - 100;
              window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
              });
            }
          }, 100);
        }
      } catch (err) {
        console.error("FAQs fetch error", err);
      } finally {
        setFaqsLoading(false);
      }
    };

    fetchFaqs();
  }, [selectedCourse]);

  const toggleFaq = (id: number) => {
    setExpandedFaq(expandedFaq === id ? null : id);
  };
  
  const faqItems: AccordionItem[] = faqs.map((faq) => ({
    id: faq.id,
    title: faq.question,
    content: (
      <div
        className="text-gray-700 leading-relaxed"
        dangerouslySetInnerHTML={{ __html: faq.answer }}
      />
    ),
  }));

  const handleCourseClick = (courseId: number) => {
    setSelectedCourse(courseId);
  };

  return (
    <>
      {/* ================= HERO SECTION ================= */}
      <section className="relative h-[40vh] flex items-center justify-center text-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={aboutBg}
            alt="Course FAQs"
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-60"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/70"></div>
        <div className="relative z-10 max-w-4xl px-6">
          <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight drop-shadow-lg">
            <span className="block text-blue-400">
              Course FAQs
            </span>
          </h1>
          <p className="text-gray-200 mt-6 text-lg max-w-xl mx-auto">
            Find answers to frequently asked questions for each course.
          </p>
        </div>
      </section>

      {/* ================= MAIN CONTENT ================= */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* LEFT SIDEBAR - Courses List */}
            <div className="lg:col-span-4">
              <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 pb-3 border-b border-gray-200">
                  All Courses
                </h2>

                {loading ? (
                  <div className="text-center py-10">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-t-transparent"></div>
                    <p className="mt-2 text-gray-500">Loading courses...</p>
                  </div>
                ) : (
                  <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
                    {courses.map((course) => (
                      <motion.div
                        key={course.id}
                        whileHover={{ x: 5 }}
                        className={`p-3 rounded-xl cursor-pointer transition-all duration-300 ${
                          selectedCourse === course.id
                            ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md"
                            : "bg-gray-50 hover:bg-gray-100 text-gray-700"
                        }`}
                        onClick={() => handleCourseClick(course.id)}
                      >
                        <div className="flex items-center gap-3">
                          {course.icon ? (
                            <div className="relative w-10 h-10 rounded-lg overflow-hidden flex-shrink-0">
                              <Image
                                src={`${BASE_URL}${course.icon}`}
                                alt={course.name}
                                fill
                                className="object-cover"
                                unoptimized
                              />
                            </div>
                          ) : (
                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                              selectedCourse === course.id
                                ? "bg-white/20"
                                : "bg-blue-100"
                            }`}>
                              <span className={`text-lg font-bold ${
                                selectedCourse === course.id
                                  ? "text-white"
                                  : "text-blue-600"
                              }`}>
                                {course.name.charAt(0)}
                              </span>
                            </div>
                          )}
                          <span className="font-medium line-clamp-2 flex-1">
                            {course.name}
                          </span>
                          {selectedCourse === course.id && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="w-2 h-2 bg-white rounded-full flex-shrink-0"
                            />
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* RIGHT SIDE - FAQs */}
            <div className="lg:col-span-8" ref={rightSideRef}>
              <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedCourse}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.3 }}
                    className="mb-8"
                  >
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
                      {courses.find(c => c.id === selectedCourse)?.name || 'Course'}
                      <span className="text-blue-600 ml-2">FAQs</span>
                    </h2>
                    <p className="text-gray-600 mt-2">
                      Frequently asked questions about this course
                    </p>
                  </motion.div>
                </AnimatePresence>

                {faqsLoading ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-16"
                  >
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
                    <p className="mt-4 text-gray-500">Loading FAQs...</p>
                  </motion.div>
                ) : faqs.length > 0 ? (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    <Accordion items={faqItems} scrollOffset={250}/>
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-16 bg-gray-50 rounded-xl"
                  >
                    <div className="text-6xl mb-4">📚</div>
                    <h3 className="text-xl font-semibold text-gray-700 mb-2">
                      No FAQs Available
                    </h3>
                    <p className="text-gray-500">
                      There are no frequently asked questions for this course yet.
                    </p>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #888;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #555;
        }
      `}</style>
    </>
  );
}