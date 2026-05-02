

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { API, BASE_URL } from "@/lib/api";
import { motion, AnimatePresence } from "framer-motion";
import EnrollModal from "@/component/EnrollModal";  // Add this import
import {
  FaInstagram,
  FaFacebookSquare,
  FaLinkedinIn,
  FaChevronUp,
  FaShoppingCart,
  FaSearch,
  FaBars,
  FaTimes,
  FaPython,
  FaJava,
  FaReact,
  FaNodeJs,
  FaAndroid,
  FaAws,
  FaPhp,
  FaCheckCircle,
  FaFacebookF,
  FaYoutube,
  FaTh,
} from "react-icons/fa";
import {
  SiDjango,
  SiJavascript,
  SiFlutter,
  SiHtml5,
  SiC,
} from "react-icons/si";
import { TbBrandCpp } from "react-icons/tb";
import { IoCallOutline } from "react-icons/io5";
import { BrainCircuit } from "lucide-react";
import { BsGraphUp } from "react-icons/bs";
import { MdOutlineScience } from "react-icons/md";
import Button from "./ui/Button";
import { useSearchParams } from "next/navigation";

 

const getCourseIcon = (name: string) => {
  const n = name.toLowerCase();
  if (n.includes("python django"))
    return <SiDjango className="text-green-900 text-xl" />;
  if (n.includes("python"))
    return <FaPython className="text-yellow-500 text-2xl" />;
  if (n.includes("machine learning"))
    return <BrainCircuit className="text-[var(--color-accent-pink)] text-xl" />;
  if (n.includes("data science"))
    return (
      <MdOutlineScience className="text-[var(--color-accent-purple)] text-2xl" />
    );
  if (n.includes("data analytics"))
    return <BsGraphUp className="text-yellow-600 text-xl" />;
  if (n.includes("testing"))
    return <FaCheckCircle className="text-[var(--color-danger)] text-xl" />;
  if (n.includes("javascript"))
    return (
      <SiJavascript className="text-[var(--color-accent-yellow-light)] text-xl" />
    );
  if (n.includes("react"))
    return <FaReact className="text-[var(--color-accent-purple)] text-2xl" />;
  if (n.includes("node"))
    return <FaNodeJs className="text-green-600 text-2xl" />;
  if (n.includes("mern"))
    return (
      <div className="flex text-xs">
        <FaReact />
        <FaNodeJs />
      </div>
    );
  if (n.includes("android"))
    return <FaAndroid className="text-green-500 text-2xl" />;
  if (n.includes("flutter"))
    return <SiFlutter className="text-[var(--color-accent-purple)] text-xl" />;
  if (n.includes("c++"))
    return <TbBrandCpp className="text-blue-700 text-2xl" />;
  if (n.includes("c programming"))
    return <SiC className="text-blue-500 text-2xl" />;
  if (n.includes("php"))
    return <FaPhp className="text-[var(--color-accent-indigo)] text-2xl" />;
  if (n.includes("java"))
    return <FaJava className="text-[var(--color-danger)] text-2xl" />;
  if (n.includes("web design"))
    return <SiHtml5 className="text-orange-500 text-xl" />;
  if (n.includes("aws")) return <FaAws className="text-orange-400 text-2xl" />;
  return <FaCheckCircle className="text-[var(--color-muted-light)] text-xl" />;
};

export default function Navbar() {
  const searchParams = useSearchParams();
const type = searchParams.get("type");
  const pathname = usePathname();
  const router = useRouter();
  const [isResourceOpen, setIsResourceOpen] = useState(false);
  const [isEnrollOpen, setIsEnrollOpen] = useState<boolean>(false);
  const [enrollModalMode, setEnrollModalMode] = useState<"enroll" | "book_demo" | "download_brochure">("book_demo");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [courses, setCourses] = useState<any[]>([]);
  const [isMobileKidsOpen, setIsMobileKidsOpen] = useState(false);
  const [kidsCourses,setKidsCourses]=useState<any[]>([]);
const [loadingCourses, setLoadingCourses] = useState(true);
const [loadingKids, setLoadingKids] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [isCoursesDropdownOpen, setIsCoursesDropdownOpen] = useState(false);
const [isKidsDropdownOpen, setIsKidsDropdownOpen] = useState(false);
  const [isMobileCoursesOpen, setIsMobileCoursesOpen] = useState(false);
  const [isMobileResourcesOpen, setIsMobileResourcesOpen] = useState(false);
  const [marqueeMessages, setMarqueeMessages] = useState<string[]>([]);
  const [cartCount, setCartCount] = useState(0);
const [nonKidsCourses, setNonKidsCourses] = useState<any[]>([]);
const [loadingNonKids, setLoadingNonKids] = useState(true);


  const isActive = (path: string) => {
    if (path === "/") return pathname === "/";
    return pathname.startsWith(path);
  };

  const linkIcon = [
    {
      id: 1,
      icon: FaFacebookF,
      link: "https://www.facebook.com/codingcloudinstitute",
    },
    { id: 2, icon: FaYoutube, link: "https://www.youtube.com/@CodingHunt" },
    {
      id: 3,
      icon: FaInstagram,
      link: "https://www.instagram.com/codingcloud_institute/",
    },
    {
      id: 4,
      icon: FaLinkedinIn,
      link: "https://www.linkedin.com/company/coding-cloud/",
    },
  ];

  useEffect(() => {
    const getFeaturedCourses = async () => {
      try {
        const res = await fetch(API.COURSES.NON_KIDS_COURSES, { 
          cache: "no-store" });
        const json = await res.json();
        setCourses(Array.isArray(json.data) ? json.data : []);
      } catch (err) {
        console.log(err);
      } finally {
      setLoadingCourses(false); // ✅ FIX
      }
    };
    getFeaturedCourses();
  }, []);

  useEffect(() => {
    const getKidsCourses = async () => {
      try {
        const res = await fetch(API.COURSES.KIDS_COURSES, { cache: "no-store" });
        const json = await res.json();
        setKidsCourses(Array.isArray(json.data) ? json.data : []);
      } catch (err) {
        console.log(err);
      } finally {
      setLoadingKids(false); // ✅ FIX
      }
    };
    getKidsCourses();
  }, []);

  useEffect(() => {
  const getNonKidsCourses = async () => {
    try {
      const res = await fetch(API.COURSES.NON_KIDS_COURSES, {
        cache: "no-store",
      });
      const json = await res.json();
      setNonKidsCourses(Array.isArray(json.data) ? json.data : []);
    } catch (err) {
      console.log(err);
    } finally {
      setLoadingNonKids(false);
    }
  };

  getNonKidsCourses();
}, []);

  useEffect(() => {
    const fetchMarquee = async () => {
      try {
        const res = await fetch(API.TAGS.LIST, { cache: "no-store" });
        const json = await res.json();
        // Assuming the data is an array of objects with a 'msg' or 'message' property
const messages = (json.data || json)
  .map((item: any) => 
    item.tag_line || item.msg || item.message || item.text
  )
  .filter(Boolean);     
     setMarqueeMessages(messages);
      } catch (err) {
        console.error("Marquee fetch error:", err);
      }
    };
    fetchMarquee();
  }, []);
console.log("marquee",marqueeMessages)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Cart count logic
  useEffect(() => {
    const updateCount = () => {
      const { getCartItems } = require("@/lib/cart");
      const items = getCartItems();
      setCartCount(items.length);
    };

    updateCount(); // Initial count
    window.addEventListener("cart-updated", updateCount);
    return () => window.removeEventListener("cart-updated", updateCount);
  }, []);

useEffect(() => {
  setIsCoursesDropdownOpen(false);
  setIsKidsDropdownOpen(false);
  setIsMenuOpen(false);
  setIsMobileCoursesOpen(false);
}, [pathname]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
const handleCoursesMouseEnter = () => {
  setIsCoursesDropdownOpen(true);
  setIsKidsDropdownOpen(false); // 👈 add this
};const handleCoursesMouseLeave = () => setIsCoursesDropdownOpen(false);

const handleKidsMouseEnter = () => {
  setIsKidsDropdownOpen(true);
  setIsCoursesDropdownOpen(false); // 👈 add this
};const handleKidsMouseLeave = () => setIsKidsDropdownOpen(false);

const handleCourseClick = (slug: string, type: "featured" | "kids") => {
  setIsCoursesDropdownOpen(false);
  setIsKidsDropdownOpen(false);
  setIsMenuOpen(false);
  setIsMobileCoursesOpen(false);
 if (type === "kids") {
    router.push(`/courses/${slug}?type=kids`); // ✅ add this
  } else {
    router.push(`/courses/${slug}`);
  }};

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 w-full z-[999] bg-[var(--color-white)] transition-shadow duration-300 ${scrolled ? "shadow-lg" : "shadow-sm"
        }`}
    >
      {/* ── TOP BAR ── */}
      <div className="flex h-10 sm:h-12 bg-[#1a1a2e] text-[var(--color-muted-light)] text-xs sm:text-sm justify-between items-center px-4 sm:px-8 md:px-4 lg:px-12 xl:px-8 2xl:px-24">
        <div className="flex gap-3 sm:gap-6 min-w-max">
          <a
            href="https://www.instagram.com/codingcloud_institute/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-1 sm:gap-2 hover:text-[var(--color-white)] cursor-pointer transition-colors"
            >
              <FaInstagram className="text-xs sm:text-base" />
              <span className="text-[10px] sm:text-sm">100K</span>
            </motion.div>
          </a>
          <a
            href="https://www.facebook.com/codingcloudinstitute"
            target="_blank"
            rel="noopener noreferrer"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-1 sm:gap-2 hover:text-[var(--color-white)] cursor-pointer transition-colors"
            >
              <FaFacebookSquare className="text-xs sm:text-base" />
              <span className="text-[10px] sm:text-sm">500K</span>
            </motion.div>
          </a>
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-1 sm:gap-2 hover:text-[var(--color-white)] cursor-pointer transition-colors"
          >
            {/* <IoCallOutline className="text-xs sm:text-base" /> */}
            {/* <span className="text-[10px] sm:text-sm">+91 95373 44018</span> */}
            {/* <a href="tel:+919998031661" className="text-[10px] sm:text-sm">
              +91 95373 44018
            </a> */}
          </motion.div>
        </div>

        {/* ── CENTRAL MARQUEE ── */}
        {marqueeMessages.length > 0 && (
          <div className="flex-1 overflow-hidden relative mx-4 sm:mx-8 md:mx-12 h-full flex items-center">
            <div className="animate-marquee whitespace-nowrap flex gap-12 text-white font-medium uppercase tracking-wider text-[10px] sm:text-xs" style={{ animationDuration: "50s" }}>
              {marqueeMessages.map((msg, i) => (
                <span key={i} className="flex items-center gap-4">
                  {msg}
                  
                  <span className="text-[var(--color-accent-purple)]">•</span>
                </span>
              ))}
              {/* Duplicate for seamless loop */}
              {marqueeMessages.map((msg, i) => (
                <span key={`dup-${i}`} className="flex items-center gap-4">
                  {msg}
                  <span className="text-[var(--color-accent-purple)]">•</span>
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="hidden sm:flex gap-2 sm:gap-4 min-w-max">

          {linkIcon.map((item) => {
            const Icon = item.icon;
            return (
              <motion.a
                key={item.id}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
              >
                <Icon className="text-xs sm:text-base hover:text-[var(--color-white)] cursor-pointer transition-colors" />
              </motion.a>
            );
          })}
        </div>
      </div>

      {/* ── MAIN NAV ── */}
      <nav className="relative border-b border-gray-100">
        {/* <div className="w-full px-4 sm:px-8 md:px-4 lg:px-6  h-14 sm:h-16 md:h-20 flex items-center justify-between gap-4"> */}
        <div className="w-full px-4 sm:px-8 md:px-4 lg:px-12 xl:px-8 2xl:px-24 h-14 sm:h-16 md:h-20 flex items-center justify-between gap-4">
          {/* ── LEFT: Logo + Category pill ── */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
<Link href="/" onClick={() => {
  setIsCoursesDropdownOpen(false);
  setIsKidsDropdownOpen(false);
}}>                <Image
                  src="/logos/logo.png"
                  alt="logo"
                  width={130}
                  height={40}
                  className="w-[130px] h-auto object-contain"
                  priority
                />
              </Link>
            </motion.div>

          </div>

          {/* ── CENTER: Nav links ── */}
          <ul className="hidden lg:flex items-center gap-4 sm:gap-6 md:gap-7 font-bold text-[var(--color-text-medium)] flex-1 justify-center">
            <motion.li whileHover={{ y: -2 }} whileTap={{ y: 0 }}>
              <Link
                href="/"
onClick={() => {
  setIsCoursesDropdownOpen(false);
  setIsKidsDropdownOpen(false);
}}                className={`transition-colors text-xs sm:text-sm md:text-base whitespace-nowrap ${isActive("/") && pathname === "/"
                  ? "text-[var(--color-accent-purple)] font-bold border-b-2 border-[var(--color-accent-purple)] pb-1"
                  : "hover:text-[var(--color-accent-purple)]"
                  }`}
              >
                Home
              </Link>
            </motion.li>

            {/* COURSES with scrollable dropdown */}
            <li
              className="relative py-3 sm:py-4 md:py-6"
              onMouseEnter={handleCoursesMouseEnter}
              onMouseLeave={handleCoursesMouseLeave}
            >
              <motion.span
                whileHover={{ y: -2 }}
                className={`flex items-center gap-1 text-xs sm:text-sm md:text-base whitespace-nowrap cursor-pointer ${isActive("/courses") && type !== "kids"
                  ? "text-[var(--color-accent-purple)] font-bold"
                  : "hover:text-[var(--color-accent-purple)]"
                  }`}
              >
                Courses
                <FaChevronUp
                  className={`transition-transform duration-300 text-[10px] sm:text-xs ${isCoursesDropdownOpen  ? "rotate-180" : ""}`}
                />
              </motion.span>

              {/* ── SCROLLABLE DROPDOWN ── */}
              <AnimatePresence>
                {isCoursesDropdownOpen  && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2 }}
                    className="fixed left-0 w-full bg-[var(--color-white)] shadow-2xl border-t border-gray-100 z-50"
                    style={{ top: "120px" }}
                  >
                    {/* Header row */}
                    <div className="flex items-center justify-between px-6 lg:px-10 pt-4 pb-3 border-b border-gray-100">
                      <p className="text-sm font-bold text-[var(--color-text-strong)]">
                        All Courses
                        <span className="ml-2 text-xs font-normal text-[var(--color-muted-light)]">
                          ({courses.length} available)
                        </span>
                      </p>
                      <Link
                        href="/courses?kids_course=false"
  onClick={() => setIsCoursesDropdownOpen(false)}
                        className="text-xs font-semibold hover:underline transition-colors"
                        style={{ color: "var(--color-accent-purple)" }}
                      >
                        View All →
                      </Link>

                    </div>

                    {/* ── Scrollable grid ── */}
                    <div className="overflow-y-auto max-h-[55vh] px-6 lg:px-10 py-4 scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent">
                      {loadingCourses  ? (
                        <div className="text-center text-[var(--color-muted-light)] py-8">
                          Loading courses...
                        </div>
                      ) : (
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                          {courses.map((course: any, i: number) => (
                            <motion.div
                              key={course.id}
                              initial={{ opacity: 0, y: 8 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.15, delay: i * 0.02 }}
                              whileHover={{ scale: 1.03 }}
                              whileTap={{ scale: 0.97 }}
                            >
                              <button
onClick={() => handleCourseClick(course.slug, "featured")}                                className="w-full text-left flex items-center gap-3 p-3 rounded-xl bg-[var(--color-white)] hover:bg-[var(--color-bg-softest)] transition-all border border-transparent hover:border-[var(--color-border-light)] hover:shadow-md"
                              >
                                <div className="w-9 h-9 flex items-center justify-center bg-[var(--color-bg-softest)] rounded-lg overflow-hidden flex-shrink-0">
                                  {course.icon ? (
                                    <Image
                                      src={`${BASE_URL}${course.icon}`}
                                      alt={course.name}
                                      width={36}
                                      height={36}
                                      className="object-cover w-full h-full"
                                    />
                                  ) : (
                                    getCourseIcon(course.name)
                                  )}
                                </div>
                                <span className="text-sm font-semibold text-[var(--color-text-medium)] line-clamp-2">
                                  {course.name}
                                </span>
                              </button>
                            </motion.div>
                          ))}
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>


            {/* KIDS COURSE */}


            <li
              className="relative py-3 sm:py-4 md:py-6"
              onMouseEnter={handleKidsMouseEnter}
              onMouseLeave={handleKidsMouseLeave}
            >
              <motion.span
                whileHover={{ y: -2 }}
                className={`flex items-center gap-1 text-xs sm:text-sm md:text-base whitespace-nowrap cursor-pointer ${isActive("/courses") && type === "kids"
                  ? "text-[var(--color-accent-purple)] font-bold"
                  : "hover:text-[var(--color-accent-purple)]"
                  }`}
              >
                Kids Courses
                <FaChevronUp
                  className={`transition-transform duration-300 text-[10px] sm:text-xs ${isKidsDropdownOpen  ? "rotate-180" : ""}`}
                />
              </motion.span>

              {/* ── SCROLLABLE DROPDOWN ── */}
              <AnimatePresence>
                {isKidsDropdownOpen  && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2 }}
                    className="fixed left-0 w-full bg-[var(--color-white)] shadow-2xl border-t border-gray-100 z-50"
                    style={{ top: "120px" }}
                  >
                    {/* Header row */}
                    <div className="flex items-center justify-between px-6 lg:px-10 pt-4 pb-3 border-b border-gray-100">
                      <p className="text-sm font-bold text-[var(--color-text-strong)]">
                        All Courses
                        <span className="ml-2 text-xs font-normal text-[var(--color-muted-light)]">
                          ({kidsCourses.length} available)
                        </span>
                      </p>
                      <Link
  href="/courses?type=kids"
                        onClick={() => setIsKidsDropdownOpen(false)}
                        className="text-xs font-semibold hover:underline transition-colors"
                        style={{ color: "var(--color-accent-purple)" }}
                      >
                        View All →
                      </Link>
                    </div>

                    {/* ── Scrollable grid ── */}
                    <div className="overflow-y-auto max-h-[55vh] px-6 lg:px-10 py-4 scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent">
                      {loadingKids ? (
                        <div className="text-center text-[var(--color-muted-light)] py-8">
                          Loading courses...
                        </div>
                      ) : (
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                          {kidsCourses.map((course: any, i: number) => (
                            <motion.div
                              key={course.id}
                              initial={{ opacity: 0, y: 8 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.15, delay: i * 0.02 }}
                              whileHover={{ scale: 1.03 }}
                              whileTap={{ scale: 0.97 }}
                            >
                              <button
onClick={() => handleCourseClick(course.slug, "kids")}
                                className="w-full text-left flex items-center gap-3 p-3 rounded-xl bg-[var(--color-white)] hover:bg-[var(--color-bg-softest)] transition-all border border-transparent hover:border-[var(--color-border-light)] hover:shadow-md"
                              >
                                <div className="w-9 h-9 flex items-center justify-center bg-[var(--color-bg-softest)] rounded-lg overflow-hidden flex-shrink-0">
                                  {course.icon ? (
                                    <Image
                                      src={`${BASE_URL}${course.icon}`}
                                      alt={course.name}
                                      width={36}
                                      height={36}
                                      className="object-cover w-full h-full"
                                    />
                                  ) : (
                                    getCourseIcon(course.name)
                                  )}
                                </div>
                                <span className="text-sm font-semibold text-[var(--color-text-medium)] line-clamp-2">
                                  {course.name}
                                </span>
                              </button>
                            </motion.div>
                          ))}
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>

            <motion.li whileHover={{ y: -2 }} whileTap={{ y: 0 }}>
              <Link
                href="/about"
                onClick={() => {
      setIsCoursesDropdownOpen(false);
      setIsKidsDropdownOpen(false);
    }}
                className={`transition-colors text-xs sm:text-sm md:text-base whitespace-nowrap ${isActive("/about")
                  ? "text-[var(--color-accent-purple)] font-bold border-b-2 border-[var(--color-accent-purple)] pb-1"
                  : "hover:text-[var(--color-accent-purple)]"
                  }`}
              >
                About
              </Link>
            </motion.li>







            <li
              className="relative py-3 sm:py-4 md:py-6"
              onMouseEnter={() => setIsResourceOpen(true)}
              onMouseLeave={() => setIsResourceOpen(false)}
            >
              <motion.span
                whileHover={{ y: -2 }}
                className="flex items-center gap-1 text-xs sm:text-sm md:text-base whitespace-nowrap cursor-pointer hover:text-[var(--color-accent-purple)]"
              >
                Resources
                <FaChevronUp
                  className={`transition-transform duration-300 text-[10px] sm:text-xs ${isResourceOpen ? "rotate-180" : ""
                    }`}
                />
              </motion.span>

              <AnimatePresence>
                {isResourceOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2 }}
                    className="absolute  mt-2 w-44 bg-white shadow-xl rounded-xl border border-gray-100 z-50"
                  >
                    <Link
                      href="/blogs"
                      className="block px-4 py-3 text-sm font-semibold text-[var(--color-text-medium)] hover:bg-[var(--color-bg-softest)] rounded-xl"
                    >
                      Blogs
                    </Link>

                    <Link
                      href="/coursefaqs"
                      className="block px-4 py-3 text-sm font-semibold text-[var(--color-text-medium)] hover:bg-[var(--color-bg-softest)] rounded-xl"
                    >
                      FAQ
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
            <motion.li whileHover={{ y: -2 }} whileTap={{ y: 0 }}>
              <Link
                href="/contact"
                 onClick={() => {
      setIsCoursesDropdownOpen(false);
      setIsKidsDropdownOpen(false);
    }}
                className={`transition-colors text-xs sm:text-sm md:text-base whitespace-nowrap ${isActive("/contact")
                  ? "text-[var(--color-accent-purple)] font-bold border-b-2 border-[var(--color-accent-purple)] pb-1"
                  : "hover:text-[var(--color-accent-purple)]"
                  }`}
              >
                Contact
              </Link>
            </motion.li>
            <motion.li whileHover={{ y: -2 }} whileTap={{ y: 0 }}>
              <Link
                href="/cart"
                className={`transition-colors text-xs sm:text-sm md:text-base whitespace-nowrap inline-flex items-center gap-1 ${isActive("/cart")
                  ? "text-[var(--color-accent-purple)] font-bold border-b-2 border-[var(--color-accent-purple)] pb-1"
                  : "hover:text-[var(--color-accent-purple)]"
                  }`}
              >
                <div className="relative">
                  <FaShoppingCart className="text-sm md:text-lg" />
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-[var(--color-accent-purple)] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                      {cartCount}
                    </span>
                  )}
                </div>
                Cart
              </Link>
            </motion.li>
          </ul>

          {/* ── RIGHT: Search + Cart + Admin + Enroll ── */}
          <div className="hidden lg:flex items-center gap-1 flex-shrink-0 border-l border-gray-200 pl-4">
            {/* Enroll marquee pill */}
            <button
              onClick={() => {
                setIsCoursesDropdownOpen(false);
    setIsKidsDropdownOpen(false);
                setEnrollModalMode("book_demo");
                setIsEnrollOpen(true);
              }}
              className="relative ml-1 overflow-hidden px-6 py-2 rounded-full border-2 font-semibold text-sm whitespace-nowrap cursor-pointer"
              style={{ borderColor: "var(--color-accent-purple)" }}
            >
              <span
                // className="animate-marquee-text block"
style={{ 
  color: "var(--color-accent-purple)", 
  animationDuration: "10s" 
}}              >
                BOOK A DEMO CLASS
              </span>
            </button>
          </div>

          {/* ── MOBILE RIGHT ── */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => {
                setIsCoursesDropdownOpen(false);
    setIsKidsDropdownOpen(false);
                setEnrollModalMode("book_demo");
                setIsEnrollOpen(true);
              }}
              className="hidden  min-[360px]:block relative overflow-hidden px-4 py-1.5 rounded-full border-2 font-semibold text-xs cursor-pointer"
              style={{ borderColor: "var(--color-accent-purple)" }}
            >
              <span
                // className="animate-marquee-text block"
                style={{ color: "var(--color-accent-purple)" }}
              >
                BOOK A DEMO CLASS
              </span>
            </button>
            <button
              onClick={toggleMenu}
              className="p-2 text-[var(--color-text-medium)] hover:text-[var(--color-accent-purple)] transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>

        {/* ── MOBILE MENU ── */}
        {/* <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden absolute top-full left-0 w-full bg-[var(--color-white)] shadow-lg border-t z-50 overflow-hidden"
            >
              <div className="px-4 py-4 flex flex-col gap-2">
                <Link
                  href="/"
                  onClick={() => setIsMenuOpen(false)}
                  className={`py-3 px-4 rounded-lg transition-colors ${isActive("/") && pathname === "/"
                    ? "bg-[var(--color-accent-purple)] text-white font-bold"
                    : "hover:bg-[var(--color-bg-softest)] text-[var(--color-text-medium)]"
                    }`}
                >
                  Home
                </Link>

                <div className="py-1">
                  <button
                    onClick={() => setIsMobileCoursesOpen(!isMobileCoursesOpen)}
                    className={`w-full flex items-center justify-between py-3 px-4 rounded-lg transition-colors ${isActive("/courses")
                      ? "bg-[var(--color-accent-purple)] text-white font-bold"
                      : "hover:bg-[var(--color-bg-softest)] text-[var(--color-text-medium)]"
                      }`}
                  >
                    <span>Courses</span>
                    <FaChevronUp
                      className={`transition-transform duration-300 ${isMobileCoursesOpen ? "rotate-180" : ""}`}
                    />
                  </button>

                  <AnimatePresence>
                    {isMobileCoursesOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        {loading ? (
                          <div className="text-center text-[var(--color-muted-light)] py-4">
                            Loading courses...
                          </div>
                        ) : (
                          <div className="max-h-[40vh] overflow-y-auto">
                            <div className="grid grid-cols-2 gap-2 p-2">
                              {courses.map((course: any) => (
                                <motion.div
                                  key={course.id}
                                  whileHover={{ scale: 1.02 }}
                                  whileTap={{ scale: 0.98 }}
                                >
                                  <button
                                    onClick={() =>
                                      handleCourseClick(course.slug)
                                    }
                                    className="w-full text-left flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-[var(--color-bg-softest)] transition-colors border border-transparent hover:border-[var(--color-border-light)]"
                                  >
                                    <div className="w-12 h-12 flex items-center justify-center bg-[var(--color-bg-softest)] rounded-lg overflow-hidden flex-shrink-0">
                                      {course.image ? (
                                        <Image
                                          src={`${BASE_URL}${course.image}`}
                                          alt={course.name}
                                          width={40}
                                          height={40}
                                          className="object-cover w-full h-full"
                                        />
                                      ) : (
                                        getCourseIcon(course.name)
                                      )}
                                    </div>
                                    <span className="text-xs font-medium text-[var(--color-text-medium)] text-center line-clamp-2">
                                      {course.name}
                                    </span>
                                  </button>
                                </motion.div>
                              ))}
                            </div>
                          </div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <Link
                  href="/about"
                  onClick={() => setIsMenuOpen(false)}
                  className={`py-3 px-4 rounded-lg transition-colors ${isActive("/about")
                    ? "bg-[var(--color-accent-purple)] text-white font-bold"
                    : "hover:bg-[var(--color-bg-softest)] text-[var(--color-text-medium)]"
                    }`}
                >
                  About
                </Link>

                <Link
                  href="/contact"
                  onClick={() => setIsMenuOpen(false)}
                  className={`py-3 px-4 rounded-lg transition-colors ${isActive("/contact")
                    ? "bg-[var(--color-accent-purple)] text-white font-bold"
                    : "hover:bg-[var(--color-bg-softest)] text-[var(--color-text-medium)]"
                    }`}
                >
                  Contact
                </Link>

                
                <div className="py-0">
                  <button
                    onClick={() => setIsMobileResourcesOpen(!isMobileResourcesOpen)}
                    className="w-full flex items-center justify-between py-0 px-4 rounded-lg transition-colors hover:bg-[var(--color-bg-softest)] text-[var(--color-text-medium)]"
                  >
                    <span>Resources</span>
                    <FaChevronUp
                      className={`transition-transform duration-300 ${isMobileResourcesOpen ? "rotate-180" : ""
                        }`}
                    />
                  </button>

                  <AnimatePresence>
                    {isMobileResourcesOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <Link
                          href="/blogs"
                          onClick={() => setIsMenuOpen(false)}
                          className="block py-2 px-6 text-sm text-[var(--color-text-medium)] hover:bg-[var(--color-bg-softest)]"
                        >
                          Blogs
                        </Link>

                        <Link
                          href="/coursefaqs"
                          onClick={() => setIsMenuOpen(false)}
                          className="block py-2 px-6 text-sm text-[var(--color-text-medium)] hover:bg-[var(--color-bg-softest)]"
                        >
                          FAQ
                        </Link>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>


                <div className="flex justify-center gap-4 mt-4 pt-4 border-t border-gray-200">
                  {linkIcon.map((item) => {
                    const Icon = item.icon;
                    return (
                      <motion.a
                        key={item.id}
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                        className="text-[var(--color-text-medium)] hover:text-[var(--color-accent-purple)]"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <Icon size={20} />
                      </motion.a>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence> */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden absolute top-full left-0 w-full bg-[var(--color-white)] shadow-lg border-t z-50 overflow-hidden"
            >
              <div className="px-4 py-3 flex flex-col gap-1">
                {/* Home */}
                <Link
                  href="/"
                  onClick={() => setIsMenuOpen(false)}
                  className={`py-2.5 px-4 rounded-lg transition-colors ${isActive("/") && pathname === "/"
                      ? "bg-[var(--color-accent-purple)] text-white font-bold"
                      : "hover:bg-[var(--color-bg-softest)] text-[var(--color-text-medium)]"
                    }`}
                >
                  Home
                </Link>

                {/* Courses Dropdown */}
                <div>
                  <button
  onClick={() => {
    setIsMobileCoursesOpen(!isMobileCoursesOpen);
     setIsMobileKidsOpen(false);      // 👈 Close Kids dropdown
    setIsMobileResourcesOpen(false); // 👈 Close Resources dropdown
  }}
                    className={`w-full flex items-center justify-between py-2.5 px-4 rounded-lg transition-colors ${isActive("/courses") && type === "kids"
                        ? "bg-[var(--color-accent-purple)] text-white font-bold"
                        : "hover:bg-[var(--color-bg-softest)] text-[var(--color-text-medium)]"
                      }`}
                  >
                    <span>Courses</span>
                    <FaChevronUp
                      className={`transition-transform duration-300 text-sm ${isMobileCoursesOpen ? "rotate-180" : ""
                        }`}
                    />
                  </button>

                  <AnimatePresence>
                    {isMobileCoursesOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        {loadingCourses  ? (
                          <div className="text-center text-[var(--color-muted-light)] py-3 text-sm">
                            Loading...
                          </div>
                        ) : (
                          <div className="max-h-[40vh] overflow-y-auto">
                            <div className="grid grid-cols-2 gap-2 p-2">
                              {courses.map((course: any) => (
                                <button
                                  key={course.id}
onClick={() => handleCourseClick(course.slug, "featured")}
                                  className="flex flex-col items-center gap-1.5 p-2 rounded-lg hover:bg-[var(--color-bg-softest)] transition-colors"
                                >
                                  <div className="w-10 h-10 flex items-center justify-center bg-[var(--color-bg-softest)] rounded-lg overflow-hidden">
                                    {course.image ? (
                                      <Image
                                        src={`${BASE_URL}${course.image}`}
                                        alt={course.name}
                                        width={36}
                                        height={36}
                                        className="object-cover w-full h-full"
                                      />
                                    ) : (
                                      getCourseIcon(course.name)
                                    )}
                                  </div>
                                  <span className="text-xs font-medium text-[var(--color-text-medium)] text-center line-clamp-2">
                                    {course.name}
                                  </span>
                                </button>
                              ))}
                            </div>
                            <div className="px-4 pb-3 border-t border-gray-100 pt-2">
                              <Link
                                href="/courses?type=featured"
                                onClick={() => setIsMenuOpen(false)}
                                className="text-xs font-bold hover:underline"
                                style={{ color: "var(--color-accent-purple)" }}
                              >
                                View All →
                              </Link>
                            </div>
                          </div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
{/* Kids Courses Dropdown */}
<div>
  <button
     onClick={() => {
    setIsMobileKidsOpen(!isMobileKidsOpen);
        setIsMobileCoursesOpen(false);   // 👈 Close Courses dropdown
    setIsMobileResourcesOpen(false); // 👈 Close Resources dropdown
    
  }}
    className={`w-full flex items-center justify-between py-2.5 px-4 rounded-lg transition-colors ${
      isActive("/courses") && type === "kids"
        ? "bg-[var(--color-accent-purple)] text-white font-bold"
        : "hover:bg-[var(--color-bg-softest)] text-[var(--color-text-medium)]"
    }`}
  >
    <span>Kids Courses</span>
    <FaChevronUp
      className={`transition-transform duration-300 text-sm ${
        isMobileKidsOpen ? "rotate-180" : ""
      }`}
    />
  </button>

  <AnimatePresence>
    {isMobileKidsOpen && (
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: "auto" }}
        exit={{ opacity: 0, height: 0 }}
        transition={{ duration: 0.2 }}
      >
        {loadingKids ? (
          <div className="text-center text-[var(--color-muted-light)] py-3 text-sm">
            Loading...
          </div>
        ) : (
          <div className="max-h-[40vh] overflow-y-auto">
            <div className="grid grid-cols-2 gap-2 p-2">
              {kidsCourses.map((course: any) => (
                <button
                  key={course.id}
                  onClick={() => {
                    handleCourseClick(course.slug, "kids");
                    setIsMenuOpen(false); // 👈 close menu
                  }}
                  className="flex flex-col items-center gap-1.5 p-2 rounded-lg hover:bg-[var(--color-bg-softest)] transition-colors"
                >
                  <div className="w-10 h-10 flex items-center justify-center bg-[var(--color-bg-softest)] rounded-lg overflow-hidden">
                    {course.icon ? (
                      <Image
                        src={`${BASE_URL}${course.icon}`}
                        alt={course.name}
                        width={36}
                        height={36}
                        className="object-cover w-full h-full"
                      />
                    ) : (
                      getCourseIcon(course.name)
                    )}
                  </div>
                  <span className="text-xs font-medium text-[var(--color-text-medium)] text-center line-clamp-2">
                    {course.name}
                  </span>
                </button>
              ))}
            </div>
            <div className="px-4 pb-3 border-t border-gray-100 pt-2">
              <Link
                href="/courses?type=kids"
                onClick={() => setIsMenuOpen(false)}
                className="text-xs font-bold hover:underline"
                style={{ color: "var(--color-accent-purple)" }}
              >
                View All →
              </Link>
            </div>

          </div>
        )}
      </motion.div>
    )}
  </AnimatePresence>
</div>
                {/* About */}
                <Link
                  href="/about"
                  onClick={() => setIsMenuOpen(false)}
                  className={`py-2.5 px-4 rounded-lg transition-colors ${isActive("/about")
                      ? "bg-[var(--color-accent-purple)] text-white font-bold"
                      : "hover:bg-[var(--color-bg-softest)] text-[var(--color-text-medium)]"
                    }`}
                >
                  About
                </Link>

                {/* Resources Dropdown */}
                <div>
                  <button
  onClick={() => {
    setIsMobileResourcesOpen(!isMobileResourcesOpen);
    setIsMobileCoursesOpen(false); // 👈 Close Courses dropdown
    setIsMobileKidsOpen(false);    // 👈 Close Kids dropdown
  }}
                    className="w-full flex items-center justify-between py-2.5 px-4 rounded-lg transition-colors hover:bg-[var(--color-bg-softest)] text-[var(--color-text-medium)]"
                  >
                    <span>Resources</span>
                    <FaChevronUp
                      className={`transition-transform duration-300 text-sm ${isMobileResourcesOpen ? "rotate-180" : ""
                        }`}
                    />
                  </button>

                  <AnimatePresence>
                    {isMobileResourcesOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="pl-4"
                      >
                        <Link
                          href="/blogs"
                          onClick={() => setIsMenuOpen(false)}
                          className="block py-2 px-4 text-sm text-[var(--color-text-medium)] hover:bg-[var(--color-bg-softest)] rounded-lg"
                        >
                          Blogs
                        </Link>
                        <Link
                          href="/coursefaqs"
                          onClick={() => setIsMenuOpen(false)}
                          className="block py-2 px-4 text-sm text-[var(--color-text-medium)] hover:bg-[var(--color-bg-softest)] rounded-lg"
                        >
                          FAQ
                        </Link>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Contact */}
                <Link
                  href="/contact"
                  onClick={() => setIsMenuOpen(false)}
                  className={`py-2.5 px-4 rounded-lg transition-colors ${isActive("/contact")
                      ? "bg-[var(--color-accent-purple)] text-white font-bold"
                      : "hover:bg-[var(--color-bg-softest)] text-[var(--color-text-medium)]"
                    }`}
                >
                  Contact
                </Link>

                <Link
                  href="/cart"
                  onClick={() => setIsMenuOpen(false)}
                  className={`py-2.5 px-4 rounded-lg transition-colors inline-flex items-center gap-2 ${isActive("/cart")
                      ? "bg-[var(--color-accent-purple)] text-white font-bold"
                      : "hover:bg-[var(--color-bg-softest)] text-[var(--color-text-medium)]"
                    }`}
                >
                  <div className="relative">
                    <FaShoppingCart className="text-sm" />
                    {cartCount > 0 && (
                      <span className="absolute -top-2 -right-2 bg-[var(--color-accent-purple)] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                        {cartCount}
                      </span>
                    )}
                  </div>
                  Cart
                </Link>

                {/* Social Icons */}
                <div className="flex justify-center gap-5 mt-3 pt-3 border-t border-gray-200">
                  {linkIcon.map((item) => {
                    const Icon = item.icon;
                    return (
                      <motion.a
                        key={item.id}
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="text-[var(--color-text-medium)] hover:text-[var(--color-accent-purple)] transition-colors"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <Icon size={18} />
                      </motion.a>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* ── ENROLL MODAL ── */}
      <EnrollModal
        isOpen={isEnrollOpen}
        onClose={() => setIsEnrollOpen(false)}
        courses={nonKidsCourses}
        mode={enrollModalMode}
      />
    </motion.header>
  );
}

// "use client";

// import { useState, useEffect } from "react";
// import Link from "next/link";
// import Image from "next/image";
// import { usePathname, useRouter } from "next/navigation";
// import { API, BASE_URL } from "@/lib/api";
// import { motion, AnimatePresence } from "framer-motion";
// import EnrollModal from "@/component/EnrollModal";  // Add this import
// import {
//   FaInstagram,
//   FaFacebookSquare,
//   FaLinkedinIn,
//   FaChevronUp,
//   FaSearch,
//   FaBars,
//   FaTimes,
//   FaPython,
//   FaJava,
//   FaReact,
//   FaNodeJs,
//   FaAndroid,
//   FaAws,
//   FaPhp,
//   FaCheckCircle,
//   FaFacebookF,
//   FaYoutube,
//   FaTh,
// } from "react-icons/fa";
// import {
//   SiDjango,
//   SiJavascript,
//   SiFlutter,
//   SiHtml5,
//   SiC,
// } from "react-icons/si";
// import { TbBrandCpp } from "react-icons/tb";
// import { IoCallOutline } from "react-icons/io5";
// import { BrainCircuit } from "lucide-react";
// import { BsGraphUp } from "react-icons/bs";
// import { MdOutlineScience } from "react-icons/md";
// import Button from "./ui/Button";

// const getCourseIcon = (name: string) => {
//   const n = name.toLowerCase();
//   if (n.includes("python django"))
//     return <SiDjango className="text-green-900 text-xl" />;
//   if (n.includes("python"))
//     return <FaPython className="text-yellow-500 text-2xl" />;
//   if (n.includes("machine learning"))
//     return <BrainCircuit className="text-[var(--color-accent-pink)] text-xl" />;
//   if (n.includes("data science"))
//     return (
//       <MdOutlineScience className="text-[var(--color-accent-purple)] text-2xl" />
//     );
//   if (n.includes("data analytics"))
//     return <BsGraphUp className="text-yellow-600 text-xl" />;
//   if (n.includes("testing"))
//     return <FaCheckCircle className="text-[var(--color-danger)] text-xl" />;
//   if (n.includes("javascript"))
//     return (
//       <SiJavascript className="text-[var(--color-accent-yellow-light)] text-xl" />
//     );
//   if (n.includes("react"))
//     return <FaReact className="text-[var(--color-accent-purple)] text-2xl" />;
//   if (n.includes("node"))
//     return <FaNodeJs className="text-green-600 text-2xl" />;
//   if (n.includes("mern"))
//     return (
//       <div className="flex text-xs">
//         <FaReact />
//         <FaNodeJs />
//       </div>
//     );
//   if (n.includes("android"))
//     return <FaAndroid className="text-green-500 text-2xl" />;
//   if (n.includes("flutter"))
//     return <SiFlutter className="text-[var(--color-accent-purple)] text-xl" />;
//   if (n.includes("c++"))
//     return <TbBrandCpp className="text-blue-700 text-2xl" />;
//   if (n.includes("c programming"))
//     return <SiC className="text-blue-500 text-2xl" />;
//   if (n.includes("php"))
//     return <FaPhp className="text-[var(--color-accent-indigo)] text-2xl" />;
//   if (n.includes("java"))
//     return <FaJava className="text-[var(--color-danger)] text-2xl" />;
//   if (n.includes("web design"))
//     return <SiHtml5 className="text-orange-500 text-xl" />;
//   if (n.includes("aws")) return <FaAws className="text-orange-400 text-2xl" />;
//   return <FaCheckCircle className="text-[var(--color-muted-light)] text-xl" />;
// };

// export default function Navbar() {
//   const pathname = usePathname();
//   const router = useRouter();
//   const [isResourceOpen, setIsResourceOpen] = useState(false);
//   const [isEnrollOpen, setIsEnrollOpen] = useState<boolean>(false);
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [courses, setCourses] = useState<any[]>([]);
  
//   const [kidsCourses,setKidsCourses]=useState<any[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [scrolled, setScrolled] = useState(false);
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const [isMobileCoursesOpen, setIsMobileCoursesOpen] = useState(false);
//   const [isMobileResourcesOpen, setIsMobileResourcesOpen] = useState(false);
//   const isActive = (path: string) => {
//     if (path === "/") return pathname === "/";
//     return pathname.startsWith(path);
//   };

//   const linkIcon = [
//     {
//       id: 1,
//       icon: FaFacebookF,
//       link: "https://www.facebook.com/codingcloudinstitute",
//     },
//     { id: 2, icon: FaYoutube, link: "https://www.youtube.com/@CodingHunt" },
//     {
//       id: 3,
//       icon: FaInstagram,
//       link: "https://www.instagram.com/codingcloud_institute/",
//     },
//     {
//       id: 4,
//       icon: FaLinkedinIn,
//       link: "https://www.linkedin.com/company/coding-cloud/",
//     },
//   ];

//   useEffect(() => {
//     const getFeaturedCourses = async () => {
//       try {
//         const res = await fetch(API.COURSES.FEATURED_COURSES, { cache: "no-store" });
//         const json = await res.json();
//         setCourses(Array.isArray(json.data) ? json.data : []);
//       } catch (err) {
//         console.log(err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     getFeaturedCourses();
//   }, []);

//   useEffect(() => {
//     const getKidsCourses = async () => {
//       try {
//         const res = await fetch(API.COURSES.KIDS_COURSES, { cache: "no-store" });
//         const json = await res.json();
//         setKidsCourses(Array.isArray(json.data) ? json.data : []);
//       } catch (err) {
//         console.log(err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     getKidsCourses();
//   }, []);

//   useEffect(() => {
//     const handleScroll = () => setScrolled(window.scrollY > 20);
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   useEffect(() => {
//     setIsDropdownOpen(false);
//     setIsMenuOpen(false);
//     setIsMobileCoursesOpen(false);
//   }, [pathname]);

//   const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
//   const handleDropdownMouseEnter = () => setIsDropdownOpen(true);
//   const handleDropdownMouseLeave = () => setIsDropdownOpen(false);

//   const handleCourseClick = (slug: string) => {
//     setIsDropdownOpen(false);
//     setIsMenuOpen(false);
//     setIsMobileCoursesOpen(false);
//     router.push(`/courses/${slug}`);
//   };

//   return (
//     <motion.header
//       initial={{ y: -100 }}
//       animate={{ y: 0 }}
//       transition={{ duration: 0.5 }}
//       className={`fixed top-0 left-0 right-0 w-full z-[999] bg-[var(--color-white)] transition-shadow duration-300 ${scrolled ? "shadow-lg" : "shadow-sm"
//         }`}
//     >
//       {/* ── TOP BAR ── */}
//       <div className="flex h-10 sm:h-12 bg-[#1a1a2e] text-[var(--color-muted-light)] text-xs sm:text-sm justify-between items-center px-4 sm:px-8 md:px-4 lg:px-12 xl:px-8 2xl:px-24">
//         <div className="flex gap-3 sm:gap-6 min-w-max">
//           <a
//             href="https://www.instagram.com/codingcloud_institute/"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             <motion.div
//               whileHover={{ scale: 1.05 }}
//               className="flex items-center gap-1 sm:gap-2 hover:text-[var(--color-white)] cursor-pointer transition-colors"
//             >
//               <FaInstagram className="text-xs sm:text-base" />
//               <span className="text-[10px] sm:text-sm">100K</span>
//             </motion.div>
//           </a>
//           <a
//             href="https://www.facebook.com/codingcloudinstitute"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             <motion.div
//               whileHover={{ scale: 1.05 }}
//               className="flex items-center gap-1 sm:gap-2 hover:text-[var(--color-white)] cursor-pointer transition-colors"
//             >
//               <FaFacebookSquare className="text-xs sm:text-base" />
//               <span className="text-[10px] sm:text-sm">500K</span>
//             </motion.div>
//           </a>
//           <motion.div
//             whileHover={{ scale: 1.05 }}
//             className="flex items-center gap-1 sm:gap-2 hover:text-[var(--color-white)] cursor-pointer transition-colors"
//           >
//             <IoCallOutline className="text-xs sm:text-base" />
//             {/* <span className="text-[10px] sm:text-sm">+91 95373 44018</span> */}
//             <a href="tel:+919998031661" className="text-[10px] sm:text-sm">
//               +91 95373 44018
//             </a>
//           </motion.div>
//         </div>
//         {/* <div className="flex gap-2 sm:gap-4 min-w-max"> */}
//         <div className="hidden sm:flex gap-2 sm:gap-4 min-w-max">
//           {linkIcon.map((item) => {
//             const Icon = item.icon;
//             return (
//               <motion.a
//                 key={item.id}
//                 href={item.link}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 whileHover={{ scale: 1.2, rotate: 5 }}
//                 whileTap={{ scale: 0.9 }}
//               >
//                 <Icon className="text-xs sm:text-base hover:text-[var(--color-white)] cursor-pointer transition-colors" />
//               </motion.a>
//             );
//           })}
//         </div>
//       </div>

//       {/* ── MAIN NAV ── */}
//       <nav className="relative border-b border-gray-100">
//         {/* <div className="w-full px-4 sm:px-8 md:px-4 lg:px-6  h-14 sm:h-16 md:h-20 flex items-center justify-between gap-4"> */}
//         <div className="w-full px-4 sm:px-8 md:px-4 lg:px-12 xl:px-8 2xl:px-24 h-14 sm:h-16 md:h-20 flex items-center justify-between gap-4">
//           {/* ── LEFT: Logo + Category pill ── */}
//           <div className="flex items-center gap-3 flex-shrink-0">
//             <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
//               <Link href="/" onClick={() => setIsDropdownOpen(false)}>
//                 <Image
//                   src="/logos/logo.png"
//                   alt="logo"
//                   width={130}
//                   height={40}
//                   className="w-[130px] h-auto object-contain"
//                   priority
//                 />
//               </Link>
//             </motion.div>

//           </div>

//           {/* ── CENTER: Nav links ── */}
//           <ul className="hidden md:flex items-center gap-2 sm:gap-4 md:gap-6 font-bold text-[var(--color-text-medium)] flex-1 justify-center">
//             <motion.li whileHover={{ y: -2 }} whileTap={{ y: 0 }}>
//               <Link
//                 href="/"
//                 onClick={() => setIsDropdownOpen(false)}
//                 className={`transition-colors text-xs sm:text-sm md:text-base whitespace-nowrap ${isActive("/") && pathname === "/"
//                   ? "text-[var(--color-accent-purple)] font-bold border-b-2 border-[var(--color-accent-purple)] pb-1"
//                   : "hover:text-[var(--color-accent-purple)]"
//                   }`}
//               >
//                 Home
//               </Link>
//             </motion.li>

//             {/* COURSES with scrollable dropdown */}
//             <li
//               className="relative py-3 sm:py-4 md:py-6"
//               onMouseEnter={handleDropdownMouseEnter}
//               onMouseLeave={handleDropdownMouseLeave}
//             >
//               <motion.span
//                 whileHover={{ y: -2 }}
//                 className={`flex items-center gap-1 text-xs sm:text-sm md:text-base whitespace-nowrap cursor-pointer ${isActive("/courses")
//                   ? "text-[var(--color-accent-purple)] font-bold"
//                   : "hover:text-[var(--color-accent-purple)]"
//                   }`}
//               >
//                 Courses
//                 <FaChevronUp
//                   className={`transition-transform duration-300 text-[10px] sm:text-xs ${isDropdownOpen ? "rotate-180" : ""}`}
//                 />
//               </motion.span>

//               {/* ── SCROLLABLE DROPDOWN ── */}
//               <AnimatePresence>
//                 {isDropdownOpen && (
//                   <motion.div
//                     initial={{ opacity: 0, y: -8 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     exit={{ opacity: 0, y: -8 }}
//                     transition={{ duration: 0.2 }}
//                     className="fixed left-0 w-full bg-[var(--color-white)] shadow-2xl border-t border-gray-100 z-50"
//                     style={{ top: "120px" }}
//                   >
//                     {/* Header row */}
//                     <div className="flex items-center justify-between px-6 lg:px-10 pt-4 pb-3 border-b border-gray-100">
//                       <p className="text-sm font-bold text-[var(--color-text-strong)]">
//                         All Courses
//                         <span className="ml-2 text-xs font-normal text-[var(--color-muted-light)]">
//                           ({courses.length} available)
//                         </span>
//                       </p>
//                       <Link
//                         href="/courses"
//                         onClick={() => setIsDropdownOpen(false)}
//                         className="text-xs font-semibold hover:underline transition-colors"
//                         style={{ color: "var(--color-accent-purple)" }}
//                       >
//                         View All →
//                       </Link>
//                     </div>

//                     {/* ── Scrollable grid ── */}
//                     <div className="overflow-y-auto max-h-[55vh] px-6 lg:px-10 py-4 scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent">
//                       {loading ? (
//                         <div className="text-center text-[var(--color-muted-light)] py-8">
//                           Loading courses...
//                         </div>
//                       ) : (
//                         <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
//                           {courses.map((course: any, i: number) => (
//                             <motion.div
//                               key={course.id}
//                               initial={{ opacity: 0, y: 8 }}
//                               animate={{ opacity: 1, y: 0 }}
//                               transition={{ duration: 0.15, delay: i * 0.02 }}
//                               whileHover={{ scale: 1.03 }}
//                               whileTap={{ scale: 0.97 }}
//                             >
//                               <button
//                                 onClick={() => handleCourseClick(course.slug)}
//                                 className="w-full text-left flex items-center gap-3 p-3 rounded-xl bg-[var(--color-white)] hover:bg-[var(--color-bg-softest)] transition-all border border-transparent hover:border-[var(--color-border-light)] hover:shadow-md"
//                               >
//                                 <div className="w-9 h-9 flex items-center justify-center bg-[var(--color-bg-softest)] rounded-lg overflow-hidden flex-shrink-0">
//                                   {course.icon ? (
//                                     <Image
//                                       src={`${BASE_URL}${course.icon}`}
//                                       alt={course.name}
//                                       width={36}
//                                       height={36}
//                                       className="object-cover w-full h-full"
//                                     />
//                                   ) : (
//                                     getCourseIcon(course.name)
//                                   )}
//                                 </div>
//                                 <span className="text-sm font-semibold text-[var(--color-text-medium)] line-clamp-2">
//                                   {course.name}
//                                 </span>
//                               </button>
//                             </motion.div>
//                           ))}
//                         </div>
//                       )}
//                     </div>
//                   </motion.div>
//                 )}
//               </AnimatePresence>
//             </li>


//             {/* KIDS COURSE */}


//             <li
//               className="relative py-3 sm:py-4 md:py-6"
//               onMouseEnter={handleDropdownMouseEnter}
//               onMouseLeave={handleDropdownMouseLeave}
//             >
//               <motion.span
//                 whileHover={{ y: -2 }}
//                 className={`flex items-center gap-1 text-xs sm:text-sm md:text-base whitespace-nowrap cursor-pointer ${isActive("/courses")
//                   ? "text-[var(--color-accent-purple)] font-bold"
//                   : "hover:text-[var(--color-accent-purple)]"
//                   }`}
//               >
//                 Kids Courses
//                 <FaChevronUp
//                   className={`transition-transform duration-300 text-[10px] sm:text-xs ${isDropdownOpen ? "rotate-180" : ""}`}
//                 />
//               </motion.span>

//               {/* ── SCROLLABLE DROPDOWN ── */}
//               <AnimatePresence>
//                 {isDropdownOpen && (
//                   <motion.div
//                     initial={{ opacity: 0, y: -8 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     exit={{ opacity: 0, y: -8 }}
//                     transition={{ duration: 0.2 }}
//                     className="fixed left-0 w-full bg-[var(--color-white)] shadow-2xl border-t border-gray-100 z-50"
//                     style={{ top: "120px" }}
//                   >
//                     {/* Header row */}
//                     <div className="flex items-center justify-between px-6 lg:px-10 pt-4 pb-3 border-b border-gray-100">
//                       <p className="text-sm font-bold text-[var(--color-text-strong)]">
//                         All Courses
//                         <span className="ml-2 text-xs font-normal text-[var(--color-muted-light)]">
//                           ({courses.length} available)
//                         </span>
//                       </p>
//                       <Link
//                         href="/courses"
//                         onClick={() => setIsDropdownOpen(false)}
//                         className="text-xs font-semibold hover:underline transition-colors"
//                         style={{ color: "var(--color-accent-purple)" }}
//                       >
//                         View All →
//                       </Link>
//                     </div>

//                     {/* ── Scrollable grid ── */}
//                     <div className="overflow-y-auto max-h-[55vh] px-6 lg:px-10 py-4 scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent">
//                       {loading ? (
//                         <div className="text-center text-[var(--color-muted-light)] py-8">
//                           Loading courses...
//                         </div>
//                       ) : (
//                         <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
//                           {kidsCourses.map((course: any, i: number) => (
//                             <motion.div
//                               key={course.id}
//                               initial={{ opacity: 0, y: 8 }}
//                               animate={{ opacity: 1, y: 0 }}
//                               transition={{ duration: 0.15, delay: i * 0.02 }}
//                               whileHover={{ scale: 1.03 }}
//                               whileTap={{ scale: 0.97 }}
//                             >
//                               <button
//                                 onClick={() => handleCourseClick(course.slug)}
//                                 className="w-full text-left flex items-center gap-3 p-3 rounded-xl bg-[var(--color-white)] hover:bg-[var(--color-bg-softest)] transition-all border border-transparent hover:border-[var(--color-border-light)] hover:shadow-md"
//                               >
//                                 <div className="w-9 h-9 flex items-center justify-center bg-[var(--color-bg-softest)] rounded-lg overflow-hidden flex-shrink-0">
//                                   {course.icon ? (
//                                     <Image
//                                       src={`${BASE_URL}${course.icon}`}
//                                       alt={course.name}
//                                       width={36}
//                                       height={36}
//                                       className="object-cover w-full h-full"
//                                     />
//                                   ) : (
//                                     getCourseIcon(course.name)
//                                   )}
//                                 </div>
//                                 <span className="text-sm font-semibold text-[var(--color-text-medium)] line-clamp-2">
//                                   {course.name}
//                                 </span>
//                               </button>
//                             </motion.div>
//                           ))}
//                         </div>
//                       )}
//                     </div>
//                   </motion.div>
//                 )}
//               </AnimatePresence>
//             </li>

//             <motion.li whileHover={{ y: -2 }} whileTap={{ y: 0 }}>
//               <Link
//                 href="/about"
//                 onClick={() => setIsDropdownOpen(false)}
//                 className={`transition-colors text-xs sm:text-sm md:text-base whitespace-nowrap ${isActive("/about")
//                   ? "text-[var(--color-accent-purple)] font-bold border-b-2 border-[var(--color-accent-purple)] pb-1"
//                   : "hover:text-[var(--color-accent-purple)]"
//                   }`}
//               >
//                 About
//               </Link>
//             </motion.li>







//             <li
//               className="relative py-3 sm:py-4 md:py-6"
//               onMouseEnter={() => setIsResourceOpen(true)}
//               onMouseLeave={() => setIsResourceOpen(false)}
//             >
//               <motion.span
//                 whileHover={{ y: -2 }}
//                 className="flex items-center gap-1 text-xs sm:text-sm md:text-base whitespace-nowrap cursor-pointer hover:text-[var(--color-accent-purple)]"
//               >
//                 Resources
//                 <FaChevronUp
//                   className={`transition-transform duration-300 text-[10px] sm:text-xs ${isResourceOpen ? "rotate-180" : ""
//                     }`}
//                 />
//               </motion.span>

//               <AnimatePresence>
//                 {isResourceOpen && (
//                   <motion.div
//                     initial={{ opacity: 0, y: -8 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     exit={{ opacity: 0, y: -8 }}
//                     transition={{ duration: 0.2 }}
//                     className="absolute  mt-2 w-44 bg-white shadow-xl rounded-xl border border-gray-100 z-50"
//                   >
//                     <Link
//                       href="/blogs"
//                       className="block px-4 py-3 text-sm font-semibold text-[var(--color-text-medium)] hover:bg-[var(--color-bg-softest)] rounded-xl"
//                     >
//                       Blogs
//                     </Link>

//                     <Link
//                       href="/coursefaqs"
//                       className="block px-4 py-3 text-sm font-semibold text-[var(--color-text-medium)] hover:bg-[var(--color-bg-softest)] rounded-xl"
//                     >
//                       FAQ
//                     </Link>
//                   </motion.div>
//                 )}
//               </AnimatePresence>
//             </li>
//             <motion.li whileHover={{ y: -2 }} whileTap={{ y: 0 }}>
//               <Link
//                 href="/contact"
//                 onClick={() => setIsDropdownOpen(false)}
//                 className={`transition-colors text-xs sm:text-sm md:text-base whitespace-nowrap ${isActive("/contact")
//                   ? "text-[var(--color-accent-purple)] font-bold border-b-2 border-[var(--color-accent-purple)] pb-1"
//                   : "hover:text-[var(--color-accent-purple)]"
//                   }`}
//               >
//                 Contact
//               </Link>
//             </motion.li>
//           </ul>

//           {/* ── RIGHT: Search + Cart + Admin + Enroll ── */}
//           <div className="hidden md:flex items-center gap-1 flex-shrink-0 border-l border-gray-200 pl-4">
//             {/* Enroll marquee pill */}
//             <button
//               onClick={() => {
//                 setIsDropdownOpen(false);
//                 setIsEnrollOpen(true);
//               }}
//               className="relative ml-1 overflow-hidden px-6 py-2 rounded-full border-2 font-semibold text-sm whitespace-nowrap cursor-pointer"
//               style={{ borderColor: "var(--color-accent-purple)" }}
//             >
//               <span
//                 className="animate-marquee-text block"
//                 style={{ color: "var(--color-accent-purple)" }}
//               >
//                 Enroll Now
//               </span>
//             </button>
//           </div>

//           {/* ── MOBILE RIGHT ── */}
//           <div className="flex md:hidden items-center gap-2">
//             <button
//               onClick={() => {
//                 setIsDropdownOpen(false);
//                 setIsEnrollOpen(true);
//               }}
//               className="hidden sm:block relative overflow-hidden px-4 py-1.5 rounded-full border-2 font-semibold text-xs cursor-pointer"
//               style={{ borderColor: "var(--color-accent-purple)" }}
//             >
//               <span
//                 className="animate-marquee-text block"
//                 style={{ color: "var(--color-accent-purple)" }}
//               >
//                 Enroll Now
//               </span>
//             </button>
//             <button
//               onClick={toggleMenu}
//               className="p-2 text-[var(--color-text-medium)] hover:text-[var(--color-accent-purple)] transition-colors"
//               aria-label="Toggle menu"
//             >
//               {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
//             </button>
//           </div>
//         </div>

//         {/* ── MOBILE MENU ── */}
//         {/* <AnimatePresence>
//           {isMenuOpen && (
//             <motion.div
//               initial={{ opacity: 0, height: 0 }}
//               animate={{ opacity: 1, height: "auto" }}
//               exit={{ opacity: 0, height: 0 }}
//               transition={{ duration: 0.3 }}
//               className="md:hidden absolute top-full left-0 w-full bg-[var(--color-white)] shadow-lg border-t z-50 overflow-hidden"
//             >
//               <div className="px-4 py-4 flex flex-col gap-2">
//                 <Link
//                   href="/"
//                   onClick={() => setIsMenuOpen(false)}
//                   className={`py-3 px-4 rounded-lg transition-colors ${isActive("/") && pathname === "/"
//                     ? "bg-[var(--color-accent-purple)] text-white font-bold"
//                     : "hover:bg-[var(--color-bg-softest)] text-[var(--color-text-medium)]"
//                     }`}
//                 >
//                   Home
//                 </Link>

//                 <div className="py-1">
//                   <button
//                     onClick={() => setIsMobileCoursesOpen(!isMobileCoursesOpen)}
//                     className={`w-full flex items-center justify-between py-3 px-4 rounded-lg transition-colors ${isActive("/courses")
//                       ? "bg-[var(--color-accent-purple)] text-white font-bold"
//                       : "hover:bg-[var(--color-bg-softest)] text-[var(--color-text-medium)]"
//                       }`}
//                   >
//                     <span>Courses</span>
//                     <FaChevronUp
//                       className={`transition-transform duration-300 ${isMobileCoursesOpen ? "rotate-180" : ""}`}
//                     />
//                   </button>

//                   <AnimatePresence>
//                     {isMobileCoursesOpen && (
//                       <motion.div
//                         initial={{ opacity: 0, height: 0 }}
//                         animate={{ opacity: 1, height: "auto" }}
//                         exit={{ opacity: 0, height: 0 }}
//                         transition={{ duration: 0.2 }}
//                         className="overflow-hidden"
//                       >
//                         {loading ? (
//                           <div className="text-center text-[var(--color-muted-light)] py-4">
//                             Loading courses...
//                           </div>
//                         ) : (
//                           <div className="max-h-[40vh] overflow-y-auto">
//                             <div className="grid grid-cols-2 gap-2 p-2">
//                               {courses.map((course: any) => (
//                                 <motion.div
//                                   key={course.id}
//                                   whileHover={{ scale: 1.02 }}
//                                   whileTap={{ scale: 0.98 }}
//                                 >
//                                   <button
//                                     onClick={() =>
//                                       handleCourseClick(course.slug)
//                                     }
//                                     className="w-full text-left flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-[var(--color-bg-softest)] transition-colors border border-transparent hover:border-[var(--color-border-light)]"
//                                   >
//                                     <div className="w-12 h-12 flex items-center justify-center bg-[var(--color-bg-softest)] rounded-lg overflow-hidden flex-shrink-0">
//                                       {course.image ? (
//                                         <Image
//                                           src={`${BASE_URL}${course.image}`}
//                                           alt={course.name}
//                                           width={40}
//                                           height={40}
//                                           className="object-cover w-full h-full"
//                                         />
//                                       ) : (
//                                         getCourseIcon(course.name)
//                                       )}
//                                     </div>
//                                     <span className="text-xs font-medium text-[var(--color-text-medium)] text-center line-clamp-2">
//                                       {course.name}
//                                     </span>
//                                   </button>
//                                 </motion.div>
//                               ))}
//                             </div>
//                           </div>
//                         )}
//                       </motion.div>
//                     )}
//                   </AnimatePresence>
//                 </div>

//                 <Link
//                   href="/about"
//                   onClick={() => setIsMenuOpen(false)}
//                   className={`py-3 px-4 rounded-lg transition-colors ${isActive("/about")
//                     ? "bg-[var(--color-accent-purple)] text-white font-bold"
//                     : "hover:bg-[var(--color-bg-softest)] text-[var(--color-text-medium)]"
//                     }`}
//                 >
//                   About
//                 </Link>

//                 <Link
//                   href="/contact"
//                   onClick={() => setIsMenuOpen(false)}
//                   className={`py-3 px-4 rounded-lg transition-colors ${isActive("/contact")
//                     ? "bg-[var(--color-accent-purple)] text-white font-bold"
//                     : "hover:bg-[var(--color-bg-softest)] text-[var(--color-text-medium)]"
//                     }`}
//                 >
//                   Contact
//                 </Link>

                
//                 <div className="py-0">
//                   <button
//                     onClick={() => setIsMobileResourcesOpen(!isMobileResourcesOpen)}
//                     className="w-full flex items-center justify-between py-0 px-4 rounded-lg transition-colors hover:bg-[var(--color-bg-softest)] text-[var(--color-text-medium)]"
//                   >
//                     <span>Resources</span>
//                     <FaChevronUp
//                       className={`transition-transform duration-300 ${isMobileResourcesOpen ? "rotate-180" : ""
//                         }`}
//                     />
//                   </button>

//                   <AnimatePresence>
//                     {isMobileResourcesOpen && (
//                       <motion.div
//                         initial={{ opacity: 0, height: 0 }}
//                         animate={{ opacity: 1, height: "auto" }}
//                         exit={{ opacity: 0, height: 0 }}
//                         transition={{ duration: 0.2 }}
//                         className="overflow-hidden"
//                       >
//                         <Link
//                           href="/blogs"
//                           onClick={() => setIsMenuOpen(false)}
//                           className="block py-2 px-6 text-sm text-[var(--color-text-medium)] hover:bg-[var(--color-bg-softest)]"
//                         >
//                           Blogs
//                         </Link>

//                         <Link
//                           href="/coursefaqs"
//                           onClick={() => setIsMenuOpen(false)}
//                           className="block py-2 px-6 text-sm text-[var(--color-text-medium)] hover:bg-[var(--color-bg-softest)]"
//                         >
//                           FAQ
//                         </Link>
//                       </motion.div>
//                     )}
//                   </AnimatePresence>
//                 </div>


//                 <div className="flex justify-center gap-4 mt-4 pt-4 border-t border-gray-200">
//                   {linkIcon.map((item) => {
//                     const Icon = item.icon;
//                     return (
//                       <motion.a
//                         key={item.id}
//                         href={item.link}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         whileHover={{ scale: 1.2 }}
//                         whileTap={{ scale: 0.9 }}
//                         className="text-[var(--color-text-medium)] hover:text-[var(--color-accent-purple)]"
//                         onClick={() => setIsMenuOpen(false)}
//                       >
//                         <Icon size={20} />
//                       </motion.a>
//                     );
//                   })}
//                 </div>
//               </div>
//             </motion.div>
//           )}
//         </AnimatePresence> */}
//         <AnimatePresence>
//           {isMenuOpen && (
//             <motion.div
//               initial={{ opacity: 0, height: 0 }}
//               animate={{ opacity: 1, height: "auto" }}
//               exit={{ opacity: 0, height: 0 }}
//               transition={{ duration: 0.3 }}
//               className="md:hidden absolute top-full left-0 w-full bg-[var(--color-white)] shadow-lg border-t z-50 overflow-hidden"
//             >
//               <div className="px-4 py-3 flex flex-col gap-1">
//                 {/* Home */}
//                 <Link
//                   href="/"
//                   onClick={() => setIsMenuOpen(false)}
//                   className={`py-2.5 px-4 rounded-lg transition-colors ${isActive("/") && pathname === "/"
//                       ? "bg-[var(--color-accent-purple)] text-white font-bold"
//                       : "hover:bg-[var(--color-bg-softest)] text-[var(--color-text-medium)]"
//                     }`}
//                 >
//                   Home
//                 </Link>

//                 {/* Courses Dropdown */}
//                 <div>
//                   <button
//                     onClick={() => setIsMobileCoursesOpen(!isMobileCoursesOpen)}
//                     className={`w-full flex items-center justify-between py-2.5 px-4 rounded-lg transition-colors ${isActive("/courses")
//                         ? "bg-[var(--color-accent-purple)] text-white font-bold"
//                         : "hover:bg-[var(--color-bg-softest)] text-[var(--color-text-medium)]"
//                       }`}
//                   >
//                     <span>Courses</span>
//                     <FaChevronUp
//                       className={`transition-transform duration-300 text-sm ${isMobileCoursesOpen ? "rotate-180" : ""
//                         }`}
//                     />
//                   </button>

//                   <AnimatePresence>
//                     {isMobileCoursesOpen && (
//                       <motion.div
//                         initial={{ opacity: 0, height: 0 }}
//                         animate={{ opacity: 1, height: "auto" }}
//                         exit={{ opacity: 0, height: 0 }}
//                         transition={{ duration: 0.2 }}
//                       >
//                         {loading ? (
//                           <div className="text-center text-[var(--color-muted-light)] py-3 text-sm">
//                             Loading...
//                           </div>
//                         ) : (
//                           <div className="max-h-[40vh] overflow-y-auto">
//                             <div className="grid grid-cols-2 gap-2 p-2">
//                               {courses.map((course: any) => (
//                                 <button
//                                   key={course.id}
//                                   onClick={() => handleCourseClick(course.slug)}
//                                   className="flex flex-col items-center gap-1.5 p-2 rounded-lg hover:bg-[var(--color-bg-softest)] transition-colors"
//                                 >
//                                   <div className="w-10 h-10 flex items-center justify-center bg-[var(--color-bg-softest)] rounded-lg overflow-hidden">
//                                     {course.image ? (
//                                       <Image
//                                         src={`${BASE_URL}${course.image}`}
//                                         alt={course.name}
//                                         width={36}
//                                         height={36}
//                                         className="object-cover w-full h-full"
//                                       />
//                                     ) : (
//                                       getCourseIcon(course.name)
//                                     )}
//                                   </div>
//                                   <span className="text-xs font-medium text-[var(--color-text-medium)] text-center line-clamp-2">
//                                     {course.name}
//                                   </span>
//                                 </button>
//                               ))}
//                             </div>
//                           </div>
//                         )}
//                       </motion.div>
//                     )}
//                   </AnimatePresence>
//                 </div>

//                 {/* About */}
//                 <Link
//                   href="/about"
//                   onClick={() => setIsMenuOpen(false)}
//                   className={`py-2.5 px-4 rounded-lg transition-colors ${isActive("/about")
//                       ? "bg-[var(--color-accent-purple)] text-white font-bold"
//                       : "hover:bg-[var(--color-bg-softest)] text-[var(--color-text-medium)]"
//                     }`}
//                 >
//                   About
//                 </Link>

//                 {/* Resources Dropdown */}
//                 <div>
//                   <button
//                     onClick={() => setIsMobileResourcesOpen(!isMobileResourcesOpen)}
//                     className="w-full flex items-center justify-between py-2.5 px-4 rounded-lg transition-colors hover:bg-[var(--color-bg-softest)] text-[var(--color-text-medium)]"
//                   >
//                     <span>Resources</span>
//                     <FaChevronUp
//                       className={`transition-transform duration-300 text-sm ${isMobileResourcesOpen ? "rotate-180" : ""
//                         }`}
//                     />
//                   </button>

//                   <AnimatePresence>
//                     {isMobileResourcesOpen && (
//                       <motion.div
//                         initial={{ opacity: 0, height: 0 }}
//                         animate={{ opacity: 1, height: "auto" }}
//                         exit={{ opacity: 0, height: 0 }}
//                         transition={{ duration: 0.2 }}
//                         className="pl-4"
//                       >
//                         <Link
//                           href="/blogs"
//                           onClick={() => setIsMenuOpen(false)}
//                           className="block py-2 px-4 text-sm text-[var(--color-text-medium)] hover:bg-[var(--color-bg-softest)] rounded-lg"
//                         >
//                           Blogs
//                         </Link>
//                         <Link
//                           href="/coursefaqs"
//                           onClick={() => setIsMenuOpen(false)}
//                           className="block py-2 px-4 text-sm text-[var(--color-text-medium)] hover:bg-[var(--color-bg-softest)] rounded-lg"
//                         >
//                           FAQ
//                         </Link>
//                       </motion.div>
//                     )}
//                   </AnimatePresence>
//                 </div>

//                 {/* Contact */}
//                 <Link
//                   href="/contact"
//                   onClick={() => setIsMenuOpen(false)}
//                   className={`py-2.5 px-4 rounded-lg transition-colors ${isActive("/contact")
//                       ? "bg-[var(--color-accent-purple)] text-white font-bold"
//                       : "hover:bg-[var(--color-bg-softest)] text-[var(--color-text-medium)]"
//                     }`}
//                 >
//                   Contact
//                 </Link>

//                 {/* Social Icons */}
//                 <div className="flex justify-center gap-5 mt-3 pt-3 border-t border-gray-200">
//                   {linkIcon.map((item) => {
//                     const Icon = item.icon;
//                     return (
//                       <motion.a
//                         key={item.id}
//                         href={item.link}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         whileHover={{ scale: 1.1 }}
//                         whileTap={{ scale: 0.95 }}
//                         className="text-[var(--color-text-medium)] hover:text-[var(--color-accent-purple)] transition-colors"
//                         onClick={() => setIsMenuOpen(false)}
//                       >
//                         <Icon size={18} />
//                       </motion.a>
//                     );
//                   })}
//                 </div>
//               </div>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </nav>

//       {/* ── ENROLL MODAL ── */}
//       <EnrollModal
//         isOpen={isEnrollOpen}
//         onClose={() => setIsEnrollOpen(false)}
//         courses={courses}
//       />
//     </motion.header>
//   );
// }