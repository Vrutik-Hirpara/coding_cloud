//maru

// "use client";

// import { Clock, Folder, User, Flag, Languages, Award } from "lucide-react";
// import { motion } from "framer-motion";
// import { useEffect, useState } from "react";

// export default function CourseSidebar({ course }: any) {
//   const [isMobile, setIsMobile] = useState(false);

//   useEffect(() => {
//     const checkMobile = () => {
//       setIsMobile(window.innerWidth < 1024);
//     };

//     checkMobile();
//     window.addEventListener("resize", checkMobile);
//     return () => window.removeEventListener("resize", checkMobile);
//   }, []);

//   const items = [
//     {
//       icon: <Clock size={isMobile ? 16 : 18} />,
//       label: "Duration",
//       value: course.duration || "8 weeks",
//     },
//     {
//       icon: <Folder size={isMobile ? 16 : 18} />,
//       label: "Lectures",
//       value: course.lecture || "75",
//     },
//     {
//       icon: <User size={isMobile ? 16 : 18} />,
//       label: "Students",
//       value: `Max ${course.students || "5"}`,
//     },
//     {
//       icon: <Flag size={isMobile ? 16 : 18} />,
//       label: "Level",
//       value: course.level || "All Levels",
//     },
//     {
//       icon: <Languages size={isMobile ? 16 : 18} />,
//       label: "Language",
//       value: course.language || "English",
//     },
//     {
//       icon: <Award size={isMobile ? 16 : 18} />,
//       label: "Certificate",
// value:
//   course.certificate === true
//     ? "Yes"
//     : course.certificate === false
//     ? "No"
//     : "No",    },
//   ];

//   // Mobile: Horizontal scrollable bar
//   if (isMobile) {
//     return (
//       <div className="w-full mb-6 overflow-x-auto scrollbar-hide">
//         <div className="flex gap-3 pb-2">
//           {items.map((item, i) => (
//             <motion.div
//               key={i}
//               initial={{ opacity: 0, x: -20 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ delay: i * 0.1 }}
//               className="flex-shrink-0 bg-[var(--color-bg-primary)] rounded-lg shadow-[var(--shadow-sm)] border border-[var(--color-border)] p-3 min-w-[140px]"
//             >
//               <div className="flex items-center gap-2">
//                 <div className="w-8 h-8 rounded-full bg-[var(--color-bg-light)] flex items-center justify-center text-[var(--color-accent-purple)]">
//                   {item.icon}
//                 </div>
//                 <div>
//                   <p className="text-xs text-[var(--color-text-light)]">{item.label}</p>
//                   <p className="text-sm font-semibold text-[var(--color-text-primary)]">
//                     {item.value}
//                   </p>

//                 </div>
//               </div>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     );
//   }

//   // Desktop: Vertical sticky sidebar
//   return (
//     <motion.div 
//       initial={{ opacity: 0, x: -20 }}
//       animate={{ opacity: 1, x: 0 }}
//       className="bg-[var(--color-bg-primary)] rounded-xl shadow-[var(--shadow-md)] border border-[var(--color-border)] sticky top-[140px] overflow-hidden w-full"
//     >
//       <div className="divide-y divide-[var(--color-border)]">
//         {items.map((item, i) => (
//           <motion.div
//             key={i}
//             initial={{ opacity: 0, x: -10 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ delay: i * 0.05 }}
//             className="flex items-center gap-3 px-4 py-3 hover:bg-[var(--color-bg-light)] transition-colors"
//           >
//             {/* ICON */}
//             <div className="w-9 h-9 rounded-full bg-[var(--color-bg-light)] flex items-center justify-center text-[var(--color-accent-purple)]">
//               {item.icon}
//             </div>

//             {/* TEXT */}
//             <div className="text-sm">
//               <span className="text-[var(--color-text-light)]">{item.label}: </span>
//               <span className="font-semibold text-[var(--color-text-primary)]">
//                 {item.value}
//               </span>
//             </div>
//           </motion.div>
//         ))}
//       </div>
//     </motion.div>
//   );
// }


//updated

// "use client";

// import { useState } from "react";
// import { motion } from "framer-motion";
// import { FaFacebookF, FaYoutube, FaInstagram, FaLinkedinIn } from "react-icons/fa";
// import EnrollModal from "./EnrollModal";
// import Button from "./ui/Button";
// import { BASE_URL } from "@/lib/api";

// export default function CourseSidebar({
//     course,
//     riverEnter,
//     riverLeave,
// }: any) {
//     const [isEnrollOpen, setIsEnrollOpen] = useState(false);
//     console.log("CourseSidebar rendered with course:", course);
//     const social = [
//         { id: 1, icon: FaFacebookF, link: "https://www.facebook.com/codingcloudinstitute" },
//         { id: 2, icon: FaYoutube, link: "https://www.youtube.com/@CodingHunt" },
//         { id: 3, icon: FaInstagram, link: "https://www.instagram.com/codingcloud_institute/" },
//         { id: 4, icon: FaLinkedinIn, link: "https://www.linkedin.com/company/coding-cloud/" },
//     ];
//     const getImage = (img?: string) => {
//         console.log("getImage called with:", img);
//         if (!img) return "";
//         if (img.startsWith("http")) return img;
//         return `${BASE_URL}${img}`;
//     };
//     return (
//         <>
//             <EnrollModal
//                 isOpen={isEnrollOpen}
//                 onClose={() => setIsEnrollOpen(false)}
//                 courses={[course]}
//             />
//             {/* Gradient border wrapper matching hero background */}
//             <div
//                 className="rounded p-[2px] shadow-lg"
//                 style={{
//                     backgroundImage:
//                         "linear-gradient(rgb(148 179 246) 0%, rgb(79, 130, 240) 45%, rgb(147 173 252) 100%)",
//                 }}
//             >
//                 <div className="bg-white rounded shadow-md overflow-visible">
//                     {/* PRICE */}
//                     <div className="p-6">
//                         <div className="mb-4 bg-[var(--color-bg-light)]">
//                             {course?.image2 && (
//                                 <img
//                                     src={getImage(course.image2)}
//                                     alt={course.name}
//                                     className="w-full h-full rounded object-contain"
//                                 />
//                             )}
//                         </div>
//                         <div className="flex justify-center">
//                             <Button
//                                 variant="gradient"
//                                 size="lg"
//                                 onClick={() => {
//                                     setIsEnrollOpen(true);
//                                 }}
//                             >
//                                 Enroll Now
//                             </Button>
//                         </div>


//                         <div className="divide-y mt-4">

//                             {[
//                                 { label: "Duration ", value: course.duration || "5 Hrs 20 Min" },
//                                 { label: "Students", value: `${course.students || "100"}` },
//                                 { label: "Lectures", value: course.lecture || "50" },
//                                 { label: "Level", value: course.level || "Basic" },
//                                 { label: "Language", value: course.language || "English" },
//                                 { label: "Certificate", value: course.certificate ? "Yes" : "No" },
//                             ].map((item, i) => (
//                                 <motion.div
//                                     key={i}
//                                     initial={{ opacity: 0, x: -10 }}
//                                     animate={{ opacity: 1, x: 0 }}
//                                     transition={{ delay: i * 0.05 }}
//                                     className="flex justify-between items-center py-2 text-sm"
//                                 >
//                                     <span className="text-[16px] leading-[26px] font-medium">{item.label}</span>
//                                     <span className="font-medium text-[12px] leading-[26px]">{item.value}</span>
//                                 </motion.div>
//                             ))}

//                         </div>

//                         {/* SOCIAL */}
//                         <div className="border-t py-6 flex justify-center gap-4">

//                             {social.map((data) => {
//                                 const Icon = data.icon;

//                                 return (
//                                     <motion.a
//                                         key={data.id}
//                                         href={data.link}
//                                         target="_blank"
//                                         whileHover={{ y: -6, scale: 1.08 }}
//                                         whileTap={{ scale: 0.95 }}
//                                         className="w-11 h-11 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 shadow-sm hover:[background:var(--color-logo-gradient)] hover:text-white"
//                                     >
//                                         <Icon size={15} />
//                                     </motion.a>
//                                 );
//                             })}

//                         </div>

//                         {/* CALL SECTION */}
//                         <div className="border-t p-6 text-center">

//                             <p className="text-sm text-gray-500 mb-3">
//                                 For details about the course
//                             </p>

//                             <div className="bg-purple-200 text-purple-800 rounded-full py-3 font-medium">
//                                 📞 Call Us:  +91 95373 44018
//                             </div>

//                         </div>
//                     </div>
//                 </div>
//             </div>

//         </>
//     );
// }

// function Info({ label, value }: any) {
//     return (
//         <div className="flex justify-between border-b pb-2">
//             <span className="text-gray-500">{label}</span>
//             <span className="font-semibold text-gray-700">{value}</span>
//         </div>

//     );
// }



"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { FaFacebookF, FaYoutube, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import EnrollModal from "./EnrollModal";
import Button from "./ui/Button";
import { BASE_URL } from "@/lib/api";
import { addCourseToCart } from "@/lib/cart";

export default function CourseSidebar({
    course,
    riverEnter,
    riverLeave,
}: any) {
    const [isEnrollOpen, setIsEnrollOpen] = useState(false);
    const [enrollModalMode, setEnrollModalMode] = useState<"enroll" | "book_demo" | "download_brochure">("enroll");
    const [isSticky, setIsSticky] = useState(false);
    const [isInitialized, setIsInitialized] = useState(false);
    const sidebarRef = useRef<HTMLDivElement>(null);
    const [isMobile, setIsMobile] = useState(false);
    const [isDownloading, setIsDownloading] = useState(false);
    const [isAddedToCart, setIsAddedToCart] = useState(false);

    const showPrice = Boolean(course?.show_price || course?.showPrice);
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

    const parsedPrice = parsePrice(course?.price || course?.old_price || course?.oldPrice);

    const handleAddToCart = () => {
        const result = addCourseToCart({
            id: course.id,
            slug: course.slug,
            name: course.name,
            image: course.image,
            duration: course.duration,
            lecture: course.lecture,
            students: course.students,
            price: parsedPrice || 0,
            discount_price: parsePrice(course?.discount_price || course?.discounted_price) || 0,
        });

        if (result.added) {
            setIsAddedToCart(true);
            setTimeout(() => setIsAddedToCart(false), 1500);
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

    const downloadPDF = async (pdfUrl: string, studentName: string) => {
        setIsDownloading(true);
        try {
            const response = await fetch(pdfUrl);
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            const originalFileName = pdfUrl.split('/').pop() || 'course_material.pdf';
            link.download = originalFileName;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error("PDF download error:", error);
        } finally {
            setIsDownloading(false);
        }
    };

    const handleEnrollmentSuccess = (responseData: any) => {
        if (responseData.pdf_download_url) {
            downloadPDF(responseData.pdf_download_url, responseData.data?.first_name || "Student");
        }
    };

    useEffect(() => {
        const checkScreen = () => {
            setIsMobile(window.innerWidth < 640);
        };
        checkScreen();
        window.addEventListener("resize", checkScreen);
        return () => window.removeEventListener("resize", checkScreen);
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            if (sidebarRef.current) {
                const rect = sidebarRef.current.getBoundingClientRect();
                const stickyThreshold = 140;
                if (rect.top <= stickyThreshold) {
                    setIsSticky(true);
                } else {
                    setIsSticky(false);
                }
                if (!isInitialized) {
                    setIsInitialized(true);
                }
            }
        };
        setTimeout(() => {
            handleScroll();
            setIsInitialized(true);
        }, 100);
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [isInitialized]);

    const social = [
        { id: 1, icon: FaFacebookF, link: "https://www.facebook.com/codingcloudinstitute" },
        { id: 2, icon: FaYoutube, link: "https://www.youtube.com/@CodingHunt" },
        { id: 3, icon: FaInstagram, link: "https://www.instagram.com/codingcloud_institute/" },
        { id: 4, icon: FaLinkedinIn, link: "https://www.linkedin.com/company/coding-cloud/" },
    ];

    const getImage = (img?: string) => {
        if (!img) return "";
        if (img.startsWith("http")) return img;
        return `${BASE_URL}${img}`;
    };

    return (
        <>
            <EnrollModal
                isOpen={isEnrollOpen}
                onClose={() => setIsEnrollOpen(false)}
                courses={[course]}
                mode={enrollModalMode}
                onSuccess={handleEnrollmentSuccess}
            />
            {isDownloading && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-8 text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                        <p className="text-gray-700">Downloading course material...</p>
                    </div>
                </div>
            )}
            <div
                ref={sidebarRef}
                className="rounded p-[2px] shadow-lg transition-all duration-300"
                style={{
                    backgroundImage:
                        "linear-gradient(rgb(148 179 246) 0%, rgb(79, 130, 240) 45%, rgb(147 173 252) 100%)",
                }}
            >
                <div className="bg-white rounded shadow-md overflow-visible">
                    <div className="p-6">
                        <div
                            className={`mb-4 bg-[var(--color-bg-light)] transition-all duration-500 ease-in-out ${!isInitialized ? 'opacity-100 h-auto mb-4' : 
                                isSticky
                                    ? 'opacity-0 h-0 overflow-hidden mb-0 pointer-events-none'
                                    : 'opacity-100 h-auto mb-4'
                                }`}
                        >
                            {course?.image2 && (
                                <img
                                    src={getImage(course.image2)}
                                    alt={course.name}
                                    className="w-full h-full rounded object-contain"
                                />
                            )}
                        </div>

                        <div className="flex justify-center mb-6">
                            {showPrice ? (
                                <Button
                                    variant="gradient"
                                    size={isMobile ? "md" : "lg"}
                                    onClick={handleAddToCart}
                                    className="w-full"
                                >
                                    {isAddedToCart ? (
                                        "Added to Cart"
                                    ) : (
                                        <span className="flex items-center gap-2">
                                            Add to Cart <span className="font-bold"></span>
                                        </span>
                                    )}
                                </Button>
                            ) : (
                                <Button
                                    variant="gradient"
                                    size={isMobile ? "md" : "lg"}
                                    onClick={() => {
                                        setEnrollModalMode("enroll");
                                        setIsEnrollOpen(true);
                                    }}
                                    className="w-full"
                                >
                                    🎓 Enroll Now
                                </Button>
                            )}
                        </div>

                        <div className="divide-y mt-4">
                            {[
                                { label: "Course Duration", value: course.duration || "-" },
                                { label: "Students", value: `${course.students || "-"}` },
                                { label: "Lectures", value: course.lecture || "-" },
                                { label: "Level", value: course.level || "-" },
                                { label: "Language", value: course.language || "-" },
                                { label: "Certificate", value: course.certificate ? "Yes" : "No" },
                            ].map((item, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.05 }}
                                    className="flex justify-between items-center py-2 text-sm"
                                >
                                    <span className="text-[16px] leading-[26px] font-medium">{item.label}</span>
                                    <span className="font-medium text-[12px] leading-[26px]">{item.value}</span>
                                </motion.div>
                            ))}
                        </div>

                        <div className="flex justify-center mt-6">
                            <Button
                                variant="gradient"
                                size={isMobile ? "md" : "md"}
                                onClick={() => {
                                    setEnrollModalMode("download_brochure");
                                    setIsEnrollOpen(true);
                                }}
                                className="w-full"
                            >
                                {isDownloading ? "Downloading..." : "📚 Download Brochure"}
                            </Button>
                        </div>
                    </div>

                    <div className="border-t py-6 flex justify-center gap-4">
                        {social.map((data) => {
                            const Icon = data.icon;
                            return (
                                <motion.a
                                    key={data.id}
                                    href={data.link}
                                    target="_blank"
                                    whileHover={{ y: -6, scale: 1.08 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="w-11 h-11 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 shadow-sm hover:[background:var(--color-logo-gradient)] hover:text-white"
                                >
                                    <Icon size={15} />
                                </motion.a>
                            );
                        })}
                    </div>

                    <div className="border-t p-6 text-center">
                        <p className="text-sm text-gray-500 mb-3">
                            For details about the course
                        </p>
                        <div className="bg-purple-200 text-purple-800 rounded-full py-3 font-medium">
                            📞 Call Us:  +91 95373 44018
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}