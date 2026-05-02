"use client";

import { useEffect, useState, useRef } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { apiService, BASE_URL } from "@/lib/api";
import { showApiErrors } from "@/utility/apiError";
import Swal from "sweetalert2";
import Button from "@/component/ui/Button";
import contactImg from "@/public/images/contact/contact.jpg";
import { FaFacebookF, FaYoutube, FaInstagram, FaLinkedinIn } from "react-icons/fa";

interface BlogDetail {
  id: number;
  title: string;
  short_description: string;
  content: string;
  featured_image: string;
  slug: string;
  publish_date?: string;
}

export default function BlogDetailPage({ slug }: { slug: string }) {
//   const { slug } = useParams();
  const [blog, setBlog] = useState<BlogDetail | null>(null);
  const [relatedBlogs, setRelatedBlogs] = useState<BlogDetail[]>([]);
  const [loading, setLoading] = useState(true);

  // Form State
  const [form, setForm] = useState({
    name: "",
    email: "",
    mobile: "",
    subject: "",
    message: "",
  });
  const [formLoading, setFormLoading] = useState(false);
  const [errors, setErrors] = useState<any>({});

  // Sticky State
  const [isSticky, setIsSticky] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const data = await apiService.getBlogs("published");

        let blogsArray: BlogDetail[] = [];
        if (data.data) blogsArray = data.data;
        else if (Array.isArray(data)) blogsArray = data;

        blogsArray.sort((a, b) => {
          if (a.publish_date && b.publish_date) {
            return (
              new Date(b.publish_date).getTime() -
              new Date(a.publish_date).getTime()
            );
          }
          return (b.id || 0) - (a.id || 0);
        });

        const found = blogsArray.find((b) => b.slug === slug);
        setBlog(found || null);

        const latest = blogsArray
          .filter((b) => b.slug !== slug)
          .slice(0, 3);
        setRelatedBlogs(latest);
      } catch (err) {
        console.error("Blog detail fetch error", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [slug]);

  // Handle Scroll for Sticky logic
  useEffect(() => {
    // const handleScroll = () => {
    //   if (sidebarRef.current) {
    //     const rect = sidebarRef.current.getBoundingClientRect();
    //     const stickyThreshold = 140; // Same as CourseSidebar

    //     if (rect.top <= stickyThreshold) {
    //       setIsSticky(true);
    //     } else {
    //       setIsSticky(false);
    //     }

    //     if (!isInitialized) {
    //       setIsInitialized(true);
    //     }
    //   }
    // };
    const handleScroll = () => {
      if (sidebarRef.current) {
        const rect = sidebarRef.current.getBoundingClientRect();
        const stickyThreshold = 140;

        // 👇 ONLY apply sticky on large screens
        if (window.innerWidth >= 1024) {
          if (rect.top <= stickyThreshold) {
            setIsSticky(true);
          } else {
            setIsSticky(false);
          }
        } else {
          // 👇 Mobile / stacked layout → always show image
          setIsSticky(false);
        }

        if (!isInitialized) {
          setIsInitialized(true);
        }
      }
    };
    const timer = setTimeout(() => {
      handleScroll();
      setIsInitialized(true);
    }, 100);

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timer);
    };
  }, [isInitialized]);

  const getImage = (img?: string) => {
    if (!img) return "";
    if (img.startsWith("http")) return img;
    return `${BASE_URL}${img}`;
  };

  const handleInputChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    let newErrors: any = {};
    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(form.email)) newErrors.email = "Enter valid email";
    }
    if (!form.mobile.trim()) {
      newErrors.mobile = "Mobile number is required";
    } else {
      const mobileRegex = /^[0-9]{10}$/;
      if (!mobileRegex.test(form.mobile)) newErrors.mobile = "Mobile must be 10 digits";
    }
    if (!form.subject.trim()) newErrors.subject = "Subject is required";
    if (!form.message.trim()) newErrors.message = "Message is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      setFormLoading(true);
      await apiService.submitContact({
        full_name: form.name,
        email: form.email,
        mobile_no: form.mobile,
        subject: form.subject,
        message: form.message,
      });

      Swal.fire({
        icon: "success",
        title: "Message Sent",
        text: "We will contact you soon!",
      });

      setForm({
        name: "",
        email: "",
        mobile: "",
        subject: "",
        message: "",
      });
      setErrors({});
    } catch (err: any) {
      if (err.data) {
        setErrors(err.data);
        showApiErrors(err.data);
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Something went wrong. Please try again.",
        });
      }
    } finally {
      setFormLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container-custom py-20 text-center">
        <div className="flex flex-col items-center gap-6">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-gray-200 border-t-blue-500 border-r-purple-500 border-b-pink-500 border-l-transparent rounded-full animate-spin"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse"></div>
            </div>
          </div>
          <div className="flex items-center gap-1 text-gray-600 font-medium">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent text-lg" style={{ backgroundClip: 'text', WebkitBackgroundClip: 'text' }}>
              Loading blog...
            </span>
            <span className="text-blue-600 animate-bounce [animation-delay:-0.3s] text-lg">.</span>
            <span className="text-purple-600 animate-bounce [animation-delay:-0.15s] text-lg">.</span>
            <span className="text-pink-600 animate-bounce text-lg">.</span>
          </div>
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="container-custom py-20 text-center">
        <p className="text-[var(--color-danger)]">Blog not found</p>
      </div>
    );
  }

  const socialLinks = [
    { id: 1, icon: FaFacebookF, link: "https://www.facebook.com/codingcloudinstitute" },
    { id: 2, icon: FaYoutube, link: "https://www.youtube.com/@CodingHunt" },
    { id: 3, icon: FaInstagram, link: "https://www.instagram.com/codingcloud_institute/" },
    { id: 4, icon: FaLinkedinIn, link: "https://www.linkedin.com/company/coding-cloud/" },
  ];

  return (
    <div className="bg-[var(--color-bg-light)]">
      {/* 🔥 HEADER SECTION (Banner) */}
      <section
        className="pt-16 sm:pb-24 pb-16 container-custom"
        style={{
          backgroundImage: `linear-gradient(rgb(148 179 246) 0%, rgb(79, 130, 240) 45%, rgb(147 173 252) 100%), url(${getImage(blog.featured_image)})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="container-custom mx-auto px-4">
          <div className="max-w-xl xl:max-w-3xl 2xl:max-w-7xl">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-gray-700 mb-4 font-medium">
              <Link href="/" className="hover:text-[var(--color-accent-purple)] transition">
                Home
              </Link>
              <span>›</span>
              <Link href="/blogs" className="hover:text-[var(--color-accent-purple)] transition">
                Blogs
              </Link>
              <span>›</span>
              <span className="text-[var(--color-accent-purple)] truncate max-w-[200px] md:max-w-none">
                {blog.title}
              </span>
            </div>

            {/* Heading */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 sm:mb-6 mb-3 leading-tight">
              <span className="text-[var(--color-black)]">
                {blog.title}
              </span>
            </h1>

            {/* Short Description */}
            <p className="text-[var(--color-black)] text-lg max-w-3xl mb-4 sm:mb-8 opacity-90">
              {blog.short_description}
            </p>

            {/* Blog Info */}
            <div className="flex flex-wrap items-center gap-4 text-md text-[var(--color-heading)] font-medium">
              <span>📅 {blog.publish_date ? new Date(blog.publish_date).toLocaleDateString() : 'N/A'}</span>
              <span>✍️ Published Article</span>
            </div>
          </div>
        </div>
      </section>

      {/* 🔥 MAIN CONTENT SECTION */}
      <div className="mx-auto px-4 py-8 sm:px-8 md:px-4 lg:px-12 xl:px-16 2xl:px-24">
        <div className="flex flex-col lg:grid lg:grid-cols-[1fr_340px] gap-8 lg:gap-12">

          {/* LEFT SIDE: Blog Content */}
          <div className="w-full">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl p-6 md:p-10 shadow-sm"
            >
              <div className="relative w-full h-[250px] sm:h-[350px] md:h-[450px] rounded-xl overflow-hidden mb-8">
                <Image
                  src={getImage(blog.featured_image)}
                  alt={blog.title}
                  fill
                  priority
                  className="object-contain p-2"
                />
              </div>

              <div
                className="prose max-w-none text-[var(--color-text)] blog-content"
                dangerouslySetInnerHTML={{ __html: blog.content }}
              />
            </motion.div>
          </div>

          {/* RIGHT SIDEBAR */}
          <div className="lg:-mt-[280px] lg:sticky lg:top-[140px] self-start h-fit space-y-8">
            {/* Inquiry Form Box */}
            <div
              ref={sidebarRef}
              className="rounded p-[2px] shadow-lg transition-all duration-300"
              style={{
                backgroundImage:
                  "linear-gradient(rgb(148 179 246) 0%, rgb(79, 130, 240) 45%, rgb(147 173 252) 100%)",
              }}
            >
              <div className="bg-white rounded shadow-md overflow-hidden">
                <div className="pb-0 p-6">
                  {/* Hiding Image Section */}
                  <div
                    className={`mb-4 bg-[var(--color-bg-light)] transition-all duration-500 ease-in-out ${!isInitialized ? 'opacity-100 h-auto mb-4' :
                      isSticky
                        ? 'opacity-0 h-0 overflow-hidden mb-0 pointer-events-none'
                        : 'opacity-100 h-auto mb-4'
                      }`}
                  >
                    <Image
                      src={contactImg}
                      alt="Contact Us"
                      className="w-full h-auto rounded object-cover"
                    />
                  </div>

                  {/* Title Section */}
                  <div className="text-center mb-6">
                    {/* <span className="inline-block px-4 py-1 mb-2 text-[12px] font-bold text-[var(--color-accent-purple)] bg-[#F3F4FE] rounded-full uppercase">
                                CONTACT US
                            </span> */}
                    <h3 className="text-[20px] font-bold text-[var(--color-dark)]">
                      Inquire Now
                    </h3>
                  </div>

                  {/* Form */}
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleInputChange}
                        placeholder="Full Name"
                        className="w-full border-b border-[var(--color-border)] p-2 text-sm outline-none focus:border-[var(--color-accent-purple)] bg-transparent placeholder-gray-400"
                      />
                      {errors.name && <p className="text-[var(--color-danger)] text-[10px] mt-1">{errors.name}</p>}
                    </div>

                    <div>
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleInputChange}
                        placeholder="Email Address"
                        className="w-full border-b border-[var(--color-border)] p-2 text-sm outline-none focus:border-[var(--color-accent-purple)] bg-transparent placeholder-gray-400"
                      />
                      {errors.email && <p className="text-[var(--color-danger)] text-[10px] mt-1">{errors.email}</p>}
                    </div>

                    <div>
                      <input
                        type="tel"
                        name="mobile"
                        value={form.mobile}
                        onChange={(e) => {
                          const val = e.target.value.replace(/\D/g, "");
                          setForm({ ...form, mobile: val.slice(0, 10) });
                        }}
                        placeholder="Mobile Number"
                        className="w-full border-b border-[var(--color-border)] p-2 text-sm outline-none focus:border-[var(--color-accent-purple)] bg-transparent placeholder-gray-400"
                      />
                      {errors.mobile && <p className="text-[var(--color-danger)] text-[10px] mt-1">{errors.mobile}</p>}
                    </div>

                    <div>
                      <input
                        type="text"
                        name="subject"
                        value={form.subject}
                        onChange={handleInputChange}
                        placeholder="Subject"
                        className="w-full border-b border-[var(--color-border)] p-2 text-sm outline-none focus:border-[var(--color-accent-purple)] bg-transparent placeholder-gray-400"
                      />
                      {errors.subject && <p className="text-[var(--color-danger)] text-[10px] mt-1">{errors.subject}</p>}
                    </div>

                    <div>
                      <textarea
                        name="message"
                        value={form.message}
                        onChange={handleInputChange}
                        placeholder="Your Message"
                        rows={1}
                        className="w-full border-b border-[var(--color-border)] p-2 text-sm outline-none focus:border-[var(--color-accent-purple)] bg-transparent resize-none placeholder-gray-400"
                      />
                      {errors.message && <p className="text-[var(--color-danger)] text-[10px] mt-1">{errors.message}</p>}
                    </div>

                    <div className="flex justify-center ">
                      <Button
                        type="submit"
                        variant="gradient"
                        className="w-full rounded-lg font-bold text-sm py-3"
                        disabled={formLoading}
                      >
                        {formLoading ? "Sending..." : "Submit Inquiry"}
                      </Button>
                    </div>
                  </form>

                  {/* SOCIAL SECTION */}
                  {/* <div className="border-t mt-6 py-6 flex flex-col items-center">
                    <p className="text-gray-500 text-[13px] mb-4">Follow us on social media</p>
                    <div className="flex justify-center gap-4">
                      {socialLinks.map((data) => {
                        const Icon = data.icon;
                        return (
                          <motion.a
                            key={data.id}
                            href={data.link}
                            target="_blank"
                            whileHover={{ y: -6, scale: 1.08 }}
                            whileTap={{ scale: 0.95 }}
                            className="w-11 h-11 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 shadow-sm hover:[background:var(--color-logo-gradient)] hover:text-white transition-all duration-300"
                          >
                            <Icon size={15} />
                          </motion.a>
                        );
                      })}
                    </div>
                  </div> */}

                  {/* CALL SECTION */}
                  <div className="border-t p-6 text-center">
                    <p className="text-sm text-gray-500 mb-3">
                      For details about the course
                    </p>
                    <div className="bg-purple-200 text-purple-800 rounded-full py-3 font-medium text-sm">
                      📞 Call Us:  +91 95373 44018
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Related Posts in Sidebar */}
            <div className="bg-white rounded shadow-sm border p-6">
              <h3 className="text-xl font-bold text-[var(--color-dark)] mb-6 pb-2 border-b">
                Recent Posts
              </h3>
              <div className="flex flex-col gap-6">
                {relatedBlogs.slice(0, 5).map((item) => (
                  <Link
                    key={item.id}
                    href={`/blogs/${item.slug}`}
                    className="group flex gap-4 items-start"
                  >
                    <div className="relative w-20 h-14 rounded-lg overflow-hidden flex-shrink-0 ">
                      <Image
                        src={getImage(item.featured_image)}
                        alt={item.title}
                        fill
                        className="object-contain transition-transform duration-300 group-hover:scale-110"
                      />
                    </div>
                    <div className="flex flex-col">
                      <h4 className="text-sm font-semibold text-[var(--color-dark)] group-hover:text-[var(--color-accent-purple)] line-clamp-2 transition capitalize">
                        {item.title}
                      </h4>
                      <span className="text-[10px] text-[var(--color-muted)] mt-1">
                        {item.publish_date ? new Date(item.publish_date).toLocaleDateString() : ''}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}