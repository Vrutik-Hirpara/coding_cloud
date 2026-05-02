

"use client";
import Swal from "sweetalert2";
import { showApiErrors } from "@/utility/apiError";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import EnrollModal from "./EnrollModal";  // 👈 IMPORT HERE

import user1 from "@/public/images/avatars/avatar-02.png";
import user2 from "@/public/images/avatars/avatar-01.png";
import user3 from "@/public/images/avatars/avatar-03.png";
import EventCard from "./EventCard";
import Faq from "@/app/faq/page";
import { apiService, BASE_URL } from "@/lib/api";
import Button from "./ui/Button";
import { Stars } from "lucide-react";
import { Accordion } from "./ui/Accordion";

type Testimonial = {
    id: number;
    name: string;
    review: string;
    rating: number;
    created_at: string;
    image: string;
    course: number;
};

type Module = {
    id: number;
    name: string;
    course_data: any;
    descriptions: string | null; // Assuming descriptions is an array of topics or similar
};

type FaqType = {
    id: number;
    course: number;
    course_name: string;
    question: string;
    answer: string;
};
type Course = {
    id: number;
    name: string;
    price?: number;
};
const getImageUrl = (path: string) => {
    if (!path) return "";
    if (path.startsWith("http")) return path;
    return `${BASE_URL}${path}`;
};



export default function CourseTabs({ course, events }: any) {
    const [isEnrollOpen, setIsEnrollOpen] = useState(false);
    const [courses, setCourses] = useState<Course[]>([]);
    const [active, setActive] = useState("overview");
    const formRef = useRef<HTMLFormElement | null>(null);
    // 🔥 REVIEW STATE
    const [reviews, setReviews] = useState<Testimonial[]>([]);
    const [loading, setLoading] = useState(true);
    const [apiAvg, setApiAvg] = useState<number | null>(null);
    // 🔥 MODULE STATE
    const [modules, setModules] = useState<Module[]>([]);
    const [faqs, setFaqs] = useState<FaqType[]>([]);

    const [openId, setOpenId] = useState<number | null>(null);
    const isClickScrolling = useRef(false);
    const targetSection = useRef<string | null>(null);

    const [topicsData, setTopicsData] = useState<any[]>([]);
    const [showForm, setShowForm] = useState(false);


    type Module = {
        id: number;
        name: string;
        descriptions: string;
    };

    type AccordionItem = {
        id: number;
        title: string;
        content: string;
    };

    const accordionItems = modules.map((m) => ({
        id: m.id,
        title: m.name,
        content: (
            <div
                dangerouslySetInnerHTML={{
                    __html: m.descriptions,
                }}
            />
        ),
    }));


    const faqItems = faqs.map((faq) => ({
        id: faq.id,
        title: faq.question,
        content: (
            <div
                className="prose max-w-none"
                dangerouslySetInnerHTML={{ __html: faq.answer }}
            />
        ),
    }));


    const formatRating = (rating: number | null | undefined): string => {
        if (rating === null || rating === undefined) return "0";
        return Number(rating).toFixed(2).replace(/\.?0+$/, '');
    };

    const [formData, setFormData] = useState({
        name: "",
        review: "",
        rating: 5,
        image: null as File | null,
    });

    // console.log("CourseTabs Rendered with course:", course);
    // const handleSubmit = async () => {
    //     try {
    //         const form = new FormData();

    //         form.append("name", formData.name);
    //         form.append("review", formData.review);
    //         form.append("rating", formData.rating.toString());
    //         form.append("course", course.id.toString()); // if required

    //         if (formData.image) {
    //             form.append("image", formData.image);
    //         }

    //         const res = await fetch(
    //             `${BASE_URL}/course_wise_rating/`,
    //             {
    //                 method: "POST",
    //                 body: form, // ❗ no headers
    //             }
    //         );

    //         if (!res.ok) {
    //             const errData = await res.json();
    //             console.log("Backend Error:", errData);
    //             throw new Error("Failed to submit review");
    //         }

    //         const data = await res.json();

    //         // update UI instantly
    //         setReviews((prev) => [data.data, ...prev]);

    //         setShowForm(false);
    //         setFormData({
    //             name: "",
    //             review: "",
    //             rating: 5,
    //             image: null,
    //         });

    //     } catch (err) {
    //         console.error(err);
    //         alert("Something went wrong!");
    //     }
    // };

    // const handleSubmit = async () => {
    //     // ✅ Validation
    //     if (!formData.name.trim()) {
    //         Swal.fire("Warning", "Please enter your name", "warning");
    //         return;
    //     }
    //     if (!formData.review.trim()) {
    //         Swal.fire("Warning", "Please write your review", "warning");
    //         return;
    //     }
    //     if (!formData.rating) {
    //         Swal.fire("Warning", "Please select rating", "warning");
    //         return;
    //     }

    //     try {
    //         const form = new FormData();

    //         form.append("name", formData.name);
    //         form.append("review", formData.review);
    //         form.append("rating", formData.rating.toString());
    //         form.append("course", course.id.toString());

    //         if (formData.image) {
    //             form.append("image", formData.image);
    //         }

    //         // const res = await fetch(`${BASE_URL}/course_wise_rating/`, {
    //         //     method: "POST",
    //         //     body: form,
    //         // });

    //         // const data = await res.json(); // ✅ only once
    //         const data = await apiService.submitCourseRating(form);

    //         // ❌ Backend error
    //         if (data.status === "error") {
    //             showApiErrors(data.errors || data); // 🔥 SweetAlert error
    //             return;
    //         }

    //         // ✅ Success
    //         Swal.fire("Success", "Review submitted successfully!", "success");

    //         // UI update
    //         setReviews((prev) => [data.data, ...prev]);

    //         setShowForm(false);
    //         setFormData({
    //             name: "",
    //             review: "",
    //             rating: 5,
    //             image: null,
    //         });

    //     } catch (err) {
    //         console.error(err);

    //         Swal.fire("Error", "Something went wrong!", "error");
    //     }
    // };
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Get values directly from state instead of FormData
        const name = formData.name?.trim();
        const review = formData.review?.trim();
        const rating = formData.rating;
        const image = formData.image;

        // Validation
        if (!name) {
            alert("Please enter your name");
            return;
        }

        if (!review) {
            alert("Please write your review");
            return;
        }

        if (!rating) {
            alert("Please select rating");
            return;
        }

        try {
            // Create FormData and append values from state
            const submitFormData = new FormData();
            submitFormData.append("name", name);
            submitFormData.append("review", review);
            submitFormData.append("rating", rating.toString());
            submitFormData.append("course", course.id.toString());

            if (image) {
                submitFormData.append("image", image);
            }

            const data = await apiService.submitCourseRating(submitFormData);

            if (data.status === "error") {
                showApiErrors(data.errors || data);
                return;
            }

            Swal.fire("Success", "Review submitted successfully!", "success");

            // Update UI
            setReviews((prev) => [data.data, ...prev]);

            // Reset form
            setFormData({
                name: "",
                review: "",
                rating: 5,
                image: null,
            });
            setShowForm(false);

        } catch (err) {
            console.error(err);
            Swal.fire("Error", "Something went wrong!", "error");
        }
    };
    useEffect(() => {
        console.log("COURSE TABS EVENTS 👉", events);
    }, [events]);

    useEffect(() => {
        const fetchModules = async () => {
            try {
                // const res = await fetch(`${BASE_URL}/modules/?course_id=${course.id}`);
                // const json = await res.json();
                const json = await apiService.getModulesByCourse(course.id);

                const filtered = (json.data || [])

                console.log("Fetched Modules:", filtered);
                // 🔥 sort ascending by id
                const sorted = filtered.sort((a: any, b: any) => a.id - b.id);

                setModules(sorted);
                // console.log(course, "ok")
                setCourses([{ ...course }])
            } catch (e) {
                console.error("module error", e);
            }
        };

        fetchModules();
    }, [course.id]);

    useEffect(() => {
        const fetchFaqs = async () => {
            try {
                // const res = await fetch(
                //   `${BASE_URL}/faqs/`
                // );
                // const json = await res.json();
                const json = await apiService.getFaqs();
                // 👉 FILTER BY COURSE ID
                const filtered = (json.data || []).filter(
                    (f: FaqType) => f.course === course.id
                );

                setFaqs(filtered);
            } catch (err) {
                console.error("FAQ fetch error", err);
            } finally {
                setLoading(false);
            }
        };

        if (course.id) fetchFaqs();
    }, [course.id]);
    // useEffect(() => {
    //     const fetchReviews = async () => {
    //         try {
    //             const res = await fetch(
    //                 `${BASE_URL}/testimonials/?course_id=${course.id}`
    //             );

    //             const json = await res.json();

    //             const list = json.testimonials || [];

    //             setReviews(list);
    //         } catch (err) {
    //             console.error("Review fetch error", err);
    //         } finally {
    //             setLoading(false);
    //         }
    //     };

    //     if (course?.id) fetchReviews();
    // }, [course?.id]);
    useEffect(() => {
        const fetchReviews = async () => {
            try {
                // const res = await fetch(
                //     `${BASE_URL}/course_wise_rating/?course_id=${course.id}`
                // );

                // const json = await res.json();
                const json = await apiService.getCourseReviews(course.id);

                // Check if API returns the new structure
                if (json.reviews) {
                    // New API structure
                    setReviews(json.reviews || []);
                    setApiAvg(json.average_rating || null);
                } else if (json.testimonials) {
                    // Old API structure (fallback)
                    setReviews(json.testimonials || []);
                    setApiAvg(null); // or calculate locally
                } else {
                    // Fallback
                    setReviews(json || []);
                    setApiAvg(null);
                }
            } catch (err) {
                console.error("Review fetch error", err);
            } finally {
                setLoading(false);
            }
        };

        if (course?.id) fetchReviews();
    }, [course?.id]);
    useEffect(() => {
        const sections = ["overview", "content", "faqs", "review"];

        const handleScroll = () => {
            let current = "overview";

            for (let sec of sections) {
                const el = document.getElementById(sec);
                if (!el) continue;

                const rect = el.getBoundingClientRect();

                if (rect.top <= 220) {
                    current = sec;
                }
            }

            // 👇 Lock tab while smooth scrolling
            if (isClickScrolling.current && targetSection.current) {
                if (current === targetSection.current) {
                    isClickScrolling.current = false;
                    targetSection.current = null;
                    setActive(current);
                } else {
                    setActive(targetSection.current);
                }
                return;
            }

            setActive(current);
        };

        window.addEventListener("scroll", handleScroll);
        handleScroll();

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);
    const scrollTo = (id: string) => {
        const el = document.getElementById(id);
        if (!el) return;

        const y =
            el.getBoundingClientRect().top + window.pageYOffset - 200;

        window.scrollTo({
            top: y,
            behavior: "smooth",
        });
    };
    const decodeHtml = (html: string) => {
        if (typeof window === "undefined") return html;
        const txt = document.createElement("textarea");
        txt.innerHTML = html;
        return txt.value;
    };
    // ⭐ STAR COMPONENT
    // const Stars = ({ count }: { count: number }) => {
    //     return (
    //         <div className="flex gap-[2px] text-lg">
    //             {[1, 2, 3, 4, 5].map((i) => (
    //                 <span key={i} className={i <= count ? "text-orange-500" : ""}>
    //                     ★
    //                 </span>
    //             ))}
    //         </div>
    //     );
    // };
    // ⭐ STAR COMPONENT - Handles both integer and fractional ratings
    const Stars = ({ count, rating }: { count?: number; rating?: number }) => {
        // If rating is provided (fractional), use the precise method
        if (rating !== undefined) {
            return (
                <div className="flex gap-[2px] text-lg">
                    {[1, 2, 3, 4, 5].map((i) => {
                        // Calculate fill percentage for this star
                        if (i <= Math.floor(rating)) {
                            // Full star
                            return <span key={i} className="text-orange-500">★</span>;
                        } else if (i === Math.floor(rating) + 1 && rating % 1 > 0) {
                            // Partial star
                            const fillPercent = (rating % 1) * 100;
                            return (
                                <span key={i} className="relative">
                                    <span className="text-gray-300">★</span>
                                    <span
                                        className="absolute top-0 left-0 overflow-hidden text-orange-500"
                                        style={{ width: `${fillPercent}%` }}
                                    >
                                        ★
                                    </span>
                                </span>
                            );
                        } else {
                            // Empty star
                            return <span key={i} className="text-gray-300">★</span>;
                        }
                    })}
                </div>
            );
        }

        // If count is provided (integer), use the simple method
        return (
            <div className="flex gap-[2px] text-lg">
                {[1, 2, 3, 4, 5].map((i) => (
                    <span key={i} className={i <= (count || 0) ? "text-orange-500" : "text-gray-300"}>
                        ★
                    </span>
                ))}
            </div>
        );
    };
    const getFullImageUrl = (img?: string) => {
        if (!img) return "/images/fallback.png";

        // jo already full url hoy
        if (img.startsWith("http")) return img;

        // jo "/media/..." hoy to BASE_URL sathe join karo
        const clean = img.startsWith("/") ? img.slice(1) : img;

        return `${BASE_URL}/${clean}`;
    };
    // 🔥 CALCULATIONS
    const total = reviews.length;

    const starCounts = [5, 4, 3, 2, 1].map(
        (star) => reviews.filter((r) => r.rating === star).length
    );

    const percentages = starCounts.map((c) =>
        total ? Math.round((c / total) * 100) : 0
    );

    const avg =
        total > 0
            ? (
                reviews.reduce((sum, r) => sum + r.rating, 0) / total
            ).toFixed(1)
            : "0.0";

    const featured = [...reviews]
        .sort(
            (a, b) =>
                new Date(b.created_at).getTime() -
                new Date(a.created_at).getTime()
        );



    // const getTopicsByModule = (moduleId: number) => {
    //     const found = modules.find((t) => t.id === moduleId);
    //     return found ? found : [];

    return (
        <div className="">
            {/* Image Section */}
            <div className="mt-12 flex justify-center">
                <div className="relative w-full max-w-3xl xl:max-w-7xl h-[220px] md:h-[400px] lg:h-[450px] rounded overflow-hidden shadow-lg bg-white">
                    {/* Equal padding on all sides around image */}
                    <div className="absolute inset-4 md:inset-6">
                        {/* <Image
                        src={getImageUrl(course.banner_img || course.image)}
                        alt={course.name}
                        fill
                        className="object-contain object-center rounded-lg"
                        priority
                    /> */}
                        <Image
                            src={
                                getImageUrl(course.banner_img || course.image) ||
                                "/images/placeholder-course.jpg"
                            }
                            alt={course.name}
                            fill
                            className="object-contain object-center"
                            priority
                            unoptimized
                        />
                    </div>
                </div>
            </div>
            {/* 🔥 STICKY TABS */}
            <div className="course-tabs-sticky  z-20 bg-[var(--color-bg-light)] py-3">
                {/* <div className="sticky top-[140px] z-20 py-3"> */}

                <div className="flex gap-3 overflow-x-auto px-1">
                    {[
                        { id: "overview", label: "Overview" },
                        { id: "content", label: "Course Content" },
                        { id: "faqs", label: "FAQs" },
                        { id: "review", label: "Review" },
                    ].map((t) => (
                        <button
                            key={t.id}
                            onClick={() => {
                                isClickScrolling.current = true;
                                targetSection.current = t.id;
                                setActive(t.id);
                                scrollTo(t.id);
                            }}
                            style={
                                active === t.id
                                    ? { background: "var(--color-logo-gradient)" }
                                    : {}
                            }
                            className={`py-[10px] px-[25px] rounded-[500px] rounded-full text-sm font-semibold whitespace-nowrap transition-all duration-300
                          ${active === t.id
                                    ? "text-white shadow"
                                    : "bg-[var(--color-light)] text-[var(--color-muted)] hover:bg-gray-300"
                                }`}
                        >
                            {t.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* 🔥 OVERVIEW CARD */}
            <div id="overview" className="pt-4  pb-0">
                <section

                    className="bg-[var(--color-white)] p-6 rounded-xl shadow border space-y-4 scroll-mt-[200px]"
                >
                    <h3 className="mb-6 text-[20px] font-bold text-[var(--color-heading)]">What you'll learn</h3>
                    <div
                        className="prose max-w-none text-[var(--color-text-muted)] "
                        dangerouslySetInnerHTML={{
                            __html: course?.text || "",
                        }}
                    />

                </section>
            </div>
            <div id="content" className="pt-6  pb-0">
                <section

                    className="bg-[var(--color-white)] p-6 rounded-xl shadow border space-y-4 scroll-mt-[200px]"
                >
                    <h3 className="mb-6 text-[20px] font-bold text-[var(--color-heading)]">Course Content</h3>

                    <div className="space-y-4">
                        <Accordion items={accordionItems} scrollOffset={300} />
                    </div>
                </section>
            </div>
            {/* 🔥 FAQ SECTION */}
            <div id="faqs" className="pt-6  pb-0">
                <section

                    className="bg-[var(--color-white)] p-6 rounded-xl shadow border scroll-mt-[200px]"
                >
                    <h3 className=" mb-6 text-[20px] font-bold text-[var(--color-heading)]">Frequently Asked Questions</h3>

                    <Accordion items={faqItems} scrollOffset={300} />
                </section>
            </div>
            {/* 🔥 REVIEW SECTION (UPDATED) */}
            {/* <section
            id="review"
            className="bg-[var(--color-white)] p-6 rounded-xl shadow border space-y-8 scroll-mt-[200px]"
        >
            <div className="flex justify-between items-center">
                <h3 className="mb-6 text-[20px] pb-5 font-bold text-[var(--color-heading)]">Review</h3>

              
                <Button
                    onClick={() => setShowForm(true)}
                    variant="gradient"
                    size="md"
                    className="px-4 py-2 text-sm rounded-lg"
                >
                    Add Review
                </Button>
            </div>

            <div className="flex flex-col md:flex-row gap-6 items-center">
                <div className="bg-[var(--color-bg-light)] p-6 rounded-lg text-center w-[150px]">
                    <p className="text-5xl font-bold text-[var(--color-accent-purple)]">
                        {avg}
                    </p>
                    <Stars count={Math.round(Number(avg))} />
                    <p className="text-sm text-[var(--color-muted)] mt-1">Course Rating</p>
                </div>

                <div className="flex-1 w-full space-y-2">
                    {[5, 4, 3, 2, 1].map((star, i) => (
                        <div key={star} className="flex items-center gap-3 text-sm">
                            <Stars count={star} />
                            <div className="flex-1 h-2 bg-[var(--color-light)] rounded">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${percentages[i]}%` }}
                                    transition={{ duration: 0.6 }}
                                    className="h-2 bg-orange-500 rounded"
                                />
                            </div>
                            <span className="text-[var(--color-muted)] w-[40px] text-right">
                                {percentages[i]}%
                            </span>
                        </div>
                    ))}
                </div>
            </div>
         {showForm && (
  <div className="border p-5 rounded-lg bg-[var(--color-bg-light)] space-y-4">
    <input
      type="text"
      placeholder="Your Name"
      value={formData.name}
      onChange={(e) =>
        setFormData({ ...formData, name: e.target.value })
      }
      className="w-full border rounded px-3 py-2"
    />

    <textarea
      placeholder="Write your review..."
      value={formData.review}
      onChange={(e) =>
        setFormData({ ...formData, review: e.target.value })
      }
      className="w-full border rounded px-3 py-2"
    />

    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        Rating
      </label>
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => setFormData({ ...formData, rating: star })}
            className="focus:outline-none"
          >
            <svg
              className={`w-8 h-8 ${
                star <= formData.rating
                  ? "text-yellow-400"
                  : "text-gray-300"
              } transition-colors`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </button>
        ))}
      </div>
      {formData.rating > 0 && (
        <p className="text-sm text-gray-500">
          Selected: {formData.rating} {formData.rating === 1 ? 'Star' : 'Stars'}
        </p>
      )}
    </div>

    <input
      type="file"
      accept="image/*"
      onChange={(e) =>
        setFormData({
          ...formData,
          image: e.target.files ? e.target.files[0] : null,
        })
      }
      className="w-full border rounded px-3 py-2"
    />

    <div className="flex gap-3">
      <button
        onClick={handleSubmit}
        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
      >
        Submit
      </button>

      <button
        onClick={() => setShowForm(false)}
        className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500 transition-colors"
      >
        Cancel
      </button>
    </div>
  </div>
)}
          
            <EnrollModal
                isOpen={isEnrollOpen}
                onClose={() => setIsEnrollOpen(false)}
                courses={courses}
            />

           
        </section> */}

            <div id="review" className="pt-6 pb-0">
                <section
                    className="bg-[var(--color-white)] p-6 rounded-xl shadow border space-y-8 scroll-mt-[200px]"
                >
                    {/* <div className="flex justify-between items-center">
                        <h3 className="mb-6 text-[20px] pb-5 font-bold text-[var(--color-heading)]">Reviews</h3>
                        <Button
                            onClick={() => {
                                setShowForm(true);

                                // Wait for the form to render
                                setTimeout(() => {
                                    if (formRef.current) {
                                        // Calculate position with offset for sticky header
                                        const elementPosition = formRef.current.getBoundingClientRect().top;
                                        const offsetPosition = elementPosition + window.pageYOffset - 220; // 220px offset for sticky tabs

                                        window.scrollTo({
                                            top: offsetPosition,
                                            behavior: "smooth"
                                        });
                                    }
                                }, 100);
                            }}
                            variant="gradient"
                            size="md"
                            className="px-4 py-2 text-sm rounded-lg"
                        >
                            Add Review
                        </Button>
                    </div> */}
                    {/* <div className="flex justify-between items-center gap-3 sm:gap-4">
                        <h3 className="mb-0 text-[18px] sm:text-[20px] font-bold text-[var(--color-heading)]">Reviews</h3>
                        <Button
                            onClick={() => {
                                setShowForm(true);
                                setTimeout(() => {
                                    if (formRef.current) {
                                        const elementPosition = formRef.current.getBoundingClientRect().top;
                                        const offsetPosition = elementPosition + window.pageYOffset - 220;
                                        window.scrollTo({
                                            top: offsetPosition,
                                            behavior: "smooth"
                                        });
                                    }
                                }, 100);
                            }}
                            variant="gradient"
                            size="md"
                            className="px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm rounded-lg whitespace-nowrap"
                        >
                            Add Review
                        </Button>
                    </div> */}
                    {/* <div className="flex justify-between items-center gap-2 sm:gap-4">
                        <h3 className="mb-0 text-[18px] sm:text-[20px] font-bold text-[var(--color-heading)]">Reviews</h3>
                        <Button
                            onClick={() => {
                                setShowForm(true);
                                setTimeout(() => {
                                    if (formRef.current) {
                                        const elementPosition = formRef.current.getBoundingClientRect().top;
                                        const offsetPosition = elementPosition + window.pageYOffset - 220;
                                        window.scrollTo({
                                            top: offsetPosition,
                                            behavior: "smooth"
                                        });
                                    }
                                }, 100);
                            }}
                            variant="gradient"
                            size="md"
                            className="px-2 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm rounded-lg whitespace-nowrap h-auto min-h-0"
                        >
                            Add Review
                        </Button>
                    </div> */}
                    {/* <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-4">
                        <h3 className="mb-0 text-[18px] sm:text-[20px] font-bold text-[var(--color-heading)]">Reviews</h3>
                        <Button
                            onClick={() => {
                                setShowForm(true);
                                setTimeout(() => {
                                    if (formRef.current) {
                                        const elementPosition = formRef.current.getBoundingClientRect().top;
                                        const offsetPosition = elementPosition + window.pageYOffset - 220;
                                        window.scrollTo({
                                            top: offsetPosition,
                                            behavior: "smooth"
                                        });
                                    }
                                }, 100);
                            }}
                            variant="gradient"
                            size="md"
                            className="px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm rounded-lg whitespace-nowrap w-full sm:w-auto"
                        >
                            Add Review
                        </Button>
                    </div> */}
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-4">
                        <h3 className="mb-0 text-[18px] sm:text-[20px] font-bold text-[var(--color-heading)]">Reviews</h3>
                        <Button
                            onClick={() => {
                                setShowForm(true);
                                setTimeout(() => {
                                    if (formRef.current) {
                                        const elementPosition = formRef.current.getBoundingClientRect().top;
                                        const offsetPosition = elementPosition + window.pageYOffset - 220;
                                        window.scrollTo({
                                            top: offsetPosition,
                                            behavior: "smooth"
                                        });
                                    }
                                }, 100);
                            }}
                            variant="gradient"
                            size="md"
                            className="px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm rounded-lg whitespace-nowrap w-full sm:w-auto"
                        >
                            Add Review
                        </Button>
                    </div>

                    {/* ⭐ SUMMARY FROM API */}
                    <div className="flex flex-col md:flex-row gap-6 items-center">
                        <div className="bg-[var(--color-bg-light)] p-6 rounded-lg text-center w-[150px]">
                            {/* <p className="text-5xl font-bold text-[var(--color-accent-purple)]">
                                {apiAvg !== null ? apiAvg.toFixed(1) : avg}
                            </p> */}
                            <p className="text-5xl font-bold text-[var(--color-accent-purple)]">
                                {formatRating(Number(apiAvg ?? avg))}
                            </p>
                            <Stars rating={apiAvg !== null ? apiAvg : Number(avg)} />
                            <p className="text-sm text-[var(--color-muted)] mt-1">
                                {total} {total === 1 ? 'Rating' : 'Ratings'}
                            </p>
                        </div>

                        <div className="flex-1 w-full space-y-2">
                            {[5, 4, 3, 2, 1].map((star, i) => {
                                const count = starCounts[i] || 0;
                                const percentage = total > 0 ? Math.round((count / total) * 100) : 0;

                                return (
                                    <div key={star} className="flex items-center gap-3 text-sm">
                                        <Stars count={star} />
                                        <div className="flex-1 h-2 bg-[var(--color-light)] rounded">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: `${percentage}%` }}
                                                transition={{ duration: 0.6 }}
                                                className="h-2 bg-orange-500 rounded"
                                            />
                                        </div>
                                        <span className="text-[var(--color-muted)] w-[40px] text-right">
                                            {percentage}%
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* OPTIONAL: Show total reviews count */}
                    {/* <div className="text-sm text-[var(--color-muted)] border-t pt-4">
                        Total {total} {total === 1 ? 'review' : 'reviews'} • Average {apiAvg !== null ? apiAvg.toFixed(1) : avg}/5
                    </div> */}
                    <div className="text-sm text-[var(--color-muted)] border-t pt-4">
                        Total {total} {total === 1 ? 'review' : 'reviews'} • Average {formatRating(Number(apiAvg ?? avg))}/5
                    </div>
                    {/* REVIEW FORM */}

                    {/* REVIEW FORM */}
                    {showForm && (
                        <form ref={formRef} onSubmit={handleSubmit} className="border p-5 rounded-lg bg-[var(--color-bg-light)] space-y-4 scroll-mt-[200px]">
                            <input
                                type="text"
                                name="name"  // ✅ Add this
                                placeholder="Your Name"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="w-full border rounded px-3 py-2"
                                required
                            />

                            <textarea
                                name="review"  // ✅ Add this
                                placeholder="Write your review..."
                                value={formData.review}
                                onChange={(e) => setFormData({ ...formData, review: e.target.value })}
                                className="w-full border rounded px-3 py-2"
                                required
                            />

                            {/* STAR RATING INPUT */}
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">
                                    Rating
                                </label>
                                <div className="flex gap-1">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <button
                                            key={star}
                                            type="button"
                                            onClick={() => setFormData({ ...formData, rating: star })}
                                            className="focus:outline-none"
                                        >
                                            <svg
                                                className={`w-8 h-8 ${star <= formData.rating
                                                    ? "text-yellow-400"
                                                    : "text-gray-300"
                                                    } transition-colors`}
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                            >
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                            </svg>
                                        </button>
                                    ))}
                                </div>
                                <input type="hidden" name="rating" value={formData.rating} /> {/* ✅ Add hidden input for rating */}
                                {formData.rating > 0 && (
                                    <p className="text-sm text-gray-500">
                                        Selected: {formData.rating} {formData.rating === 1 ? 'Star' : 'Stars'}
                                    </p>
                                )}
                            </div>

                            <label className="block text-sm font-medium text-gray-700">
                                Select Image
                            </label>
                            <input
                                type="file"
                                name="image"  // ✅ Add this
                                accept="image/*"
                                onChange={(e) => setFormData({
                                    ...formData,
                                    image: e.target.files ? e.target.files[0] : null,
                                })}
                                className="w-full border rounded px-3 py-2"
                            />

                            <div className="flex gap-2">
                                <Button
                                    type="submit"
                                    variant="gradient"
                                    size="sm"
                                    className="px-2 py-2 rounded text-white transition-colors"
                                >
                                    Submit
                                </Button>
                                <Button
                                    onClick={() => setShowForm(false)}
                                    variant="gradient"
                                    size="sm"
                                    className="px-2 py-2 rounded text-white transition-colors"
                                >
                                    Cancel
                                </Button>
                            </div>
                        </form>
                    )}

                    {/* DISPLAY REVIEWS */}
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <h4 className="font-semibold text-lg">Student Reviews</h4>
                            {featured.length > 3 && (
                                <span className="text-sm text-[var(--color-muted)]">
                                    {featured.length} total reviews
                                </span>
                            )}
                        </div>

                        {loading ? (
                            <p>Loading reviews...</p>
                        ) : featured.length > 0 ? (
                            <div className="max-h-[400px] overflow-y-auto pr-2 space-y-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                                {featured.map((review) => (
                                    <div key={review.id} className="border-b pb-4 last:border-0">
                                        <div className="flex items-start gap-3">
                                            <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden flex-shrink-0">
                                                {review.image ? (
                                                    <img
                                                        src={getFullImageUrl(review.image)}
                                                        alt={review.name}
                                                        className="w-full h-full object-contain"
                                                        onError={(e) => {
                                                            e.currentTarget.onerror = null;
                                                            e.currentTarget.style.display = 'none';
                                                            const parent = e.currentTarget.parentElement;
                                                            if (parent) {
                                                                parent.innerHTML = `<div class="w-full h-full bg-purple-500 flex items-center justify-center text-white font-bold">${review.name?.charAt(0).toUpperCase() || '?'}</div>`;
                                                            }
                                                        }}
                                                    />
                                                ) : (
                                                    <div className="w-full h-full bg-purple-500 flex items-center justify-center text-white font-bold">
                                                        {review.name?.charAt(0).toUpperCase()}
                                                    </div>
                                                )}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center justify-between gap-2 flex-wrap">
                                                    <h5 className="font-semibold truncate">{review.name}</h5>
                                                    <span className="text-xs text-[var(--color-muted)] whitespace-nowrap">
                                                        {new Date(review.created_at).toLocaleDateString()}
                                                    </span>
                                                </div>
                                                <Stars count={review.rating} />
                                                <p className="text-sm mt-2 break-words">{review.review}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-[var(--color-muted)]">No reviews yet. Be the first to review!</p>
                        )}
                    </div>
                    <EnrollModal
                        isOpen={isEnrollOpen}
                        onClose={() => setIsEnrollOpen(false)}
                        courses={courses}
                    />
                </section>
            </div>
            {/* <Button
                onClick={() => setIsEnrollOpen(true)}
                variant="gradient"
                size="md"
                className="px-2 sm:px-4 md:px-6 py-1 sm:py-1.5 md:py-2 text-[10px] sm:text-xs md:text-base rounded-full whitespace-nowrap hover:opacity-90"
            >
                Enroll Now
            </Button> */}



        </div>
    )
}