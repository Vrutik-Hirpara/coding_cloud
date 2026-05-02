

"use client";

import { motion } from "framer-motion";
import { FaHeadphonesAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import Image from "next/image";
import contactImg from '@/public/images/contact/contact.jpg'
import { useState } from "react";
import { BASE_URL, API, apiService } from "@/lib/api";
import Button from "@/component/ui/Button";
import { showApiErrors } from "@/utility/apiError";
import Swal from "sweetalert2"; // (for success alert)
export default function ContactPage() {
  const contactData = [
    {
      title: "Contact Phone Number",
      icon: <FaHeadphonesAlt />,
      items: [
        { label: "Ahmedabad: +91 9998031661", link: "tel:+919998031661" },
        { label: "Ahmedabad: +91 6356723490", link: "tel:+916356723490" },
        { label: "Pune: +91 9998937931", link: "tel:+919998937931" },
      ],
    }
    ,
    {
      title: "Our Email Address",
      icon: <FaEnvelope />,
      items: [
        { label: "komal@codingcloudinstitute.com", link: "mailto:komal@codingcloudinstitute.com" },
        { label: "pune@codingcloudinstitute.com", link: "mailto:pune@codingcloudinstitute.com" },
        { label: "info@codingcloudinstitute.com", link: "mailto:info@codingcloudinstitute.com" },
      ],
    },

    {
      title: "Head Office",
      icon: <FaMapMarkerAlt />,
      items: [
        {
          label:
            "Office No. 401, 4th Floor, Sapphire Complex, C.G Road, Ahmedabad, Gujarat, 380009",
          link:
            "https://www.google.com/maps/search/?api=1&query=Sapphire%20Complex%20CG%20Road%20Ahmedabad",
        },
      ],
    },
    {
      title: "Branch",
      icon: <FaMapMarkerAlt />,
      items: [
        {
          label:
            "Unit No, 201, 2nd Floor, Polaris, Near Noble Hospital, Hadapsar, Pune, Maharashtra 411060",
          link:
            "https://www.google.com/maps/search/?api=1&query=Unit%20No%20201%20Polaris%20Hadapsar%20Pune",
        },
      ],
    },
  ];

  const [form, setForm] = useState({
    name: "",
    email: "",
    mobile: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState<any>({});
  const [globalError, setGlobalError] = useState("");

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    let newErrors: any = {};

    if (!form.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(form.email)) {
        newErrors.email = "Enter valid email";
      }
    }

    if (!form.mobile.trim()) {
      newErrors.mobile = "Mobile number is required";
    } else {
      const mobileRegex = /^[0-9]{10}$/;
      if (!mobileRegex.test(form.mobile)) {
        newErrors.mobile = "Mobile must be 10 digits";
      }
    }

    if (!form.subject.trim()) {
      newErrors.subject = "Subject is required";
    }

    if (!form.message.trim()) {
      newErrors.message = "Message is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // const handleSubmit = async (e: any) => {
  //   e.preventDefault();

  //   setGlobalError("");
  //   setSuccess(false);

  //   if (!validateForm()) {
  //     setGlobalError("⚠️ Please fix the errors below");
  //     setTimeout(() => setGlobalError(""), 4000);
  //     return;
  //   }

  //   try {
  //     setLoading(true);

  //     const res = await fetch(`${BASE_URL}/contacts/`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         full_name: form.name,
  //         email: form.email,
  //         mobile_no: form.mobile,
  //         subject: form.subject,
  //         message: form.message,
  //       }),
  //     });

  //     if (res.ok) {
  //       setSuccess(true);
  //       setForm({
  //         name: "",
  //         email: "",
  //         mobile: "",
  //         subject: "",
  //         message: "",
  //       });
  //       setErrors({});
  //       setTimeout(() => setSuccess(false), 4000);
  //     } else {
  //       setGlobalError("❌ Something went wrong");
  //       setTimeout(() => setGlobalError(""), 4000);
  //     }
  //   } catch (err) {
  //     setGlobalError("❌ Server error");
  //     setTimeout(() => setGlobalError(""), 4000);
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    setGlobalError("");
    setSuccess(false);

    if (!validateForm()) {
      setGlobalError("⚠️ Please fix the errors below");
      setTimeout(() => setGlobalError(""), 4000);
      return;
    }

    // try {
    //   setLoading(true);

    //   const res = await fetch(`${BASE_URL}/contacts/`, {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({
    //       full_name: form.name,
    //       email: form.email,
    //       mobile_no: form.mobile,
    //       subject: form.subject,
    //       message: form.message,
    //     }),
    //   });

    //   const data = await res.json(); // ✅ IMPORTANT

    //   if (!res.ok) {
    //     setErrors(data);
    //     showApiErrors(data); // 🔥 HERE
    //     return;
    //   }

    //   // ✅ SUCCESS
    //   Swal.fire({
    //     icon: "success",
    //     title: "Message Sent",
    //     text: "We will contact you soon!",
    //   });

    //   setSuccess(true);

    //   setForm({
    //     name: "",
    //     email: "",
    //     mobile: "",
    //     subject: "",
    //     message: "",
    //   });

    //   setErrors({});

    //   setTimeout(() => setSuccess(false), 4000);

    // } catch (err) {
    //   console.error(err);

    //   Swal.fire({
    //     icon: "error",
    //     title: "Server Error",
    //     text: "Please try again later",
    //   });
    // } 
    try {
      setLoading(true);

      await apiService.submitContact({
        full_name: form.name,
        email: form.email,
        mobile_no: form.mobile,
        subject: form.subject,
        message: form.message,
      });

      // ✅ SUCCESS
      Swal.fire({
        icon: "success",
        title: "Message Sent",
        text: "We will contact you soon!",
      });

      setSuccess(true);

      setForm({
        name: "",
        email: "",
        mobile: "",
        subject: "",
        message: "",
      });

      setErrors({});

      setTimeout(() => setSuccess(false), 4000);

    } catch (err: any) {
      // Handle errors from apiService
      if (err.data) {
        setErrors(err.data);
        showApiErrors(err.data);
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: err.data?.message || "Something went wrong. Please try again.",
        });
      }
    }
    finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen bg-soft-gradient w-full max-w-full overflow-x-hidden">
      {/* ================= HEADER ================= */}
      <section className="py-20 md:py-10 text-center w-full">
        <div className="container-custom px-4 sm:px-6 mx-auto">
          <span className="inline-block px-4 py-1 mb-4 text-sm font-semibold text-[var(--color-accent-purple)] rounded-full break-words">
            CONTACT US
          </span>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[var(--color-text)] break-words">
            Reach Our Training Center
          </h1>
        </div>
      </section>

      {/* ================= CONTACT CARDS ================= */}
      <section className="pb-16 md:pb-24 w-full">
        <div className="container-custom px-4 sm:px-6 mx-auto">
          <div className="grid grid-cols-1 max-w-7xl mx-auto sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-4">
            {contactData.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.2 }}
                viewport={{ once: true }}
                className="bg-[var(--color-white)] border border-[var(--color-border)] p-6 rounded-2xl text-center shadow-sm hover:shadow-lg transition-all duration-300 w-full max-w-full"
              >
                <div className="w-14 h-14 md:w-16 md:h-16 mx-auto mb-4 md:mb-5 flex items-center justify-center rounded-xl text-[var(--color-white)] text-xl md:text-2xl bg-[var(--color-accent-purple)] shadow">
                  {item.icon}
                </div>

                <h3 className="font-bold text-base md:text-lg text-[var(--color-text)] mb-2 md:mb-3 break-words">
                  {item.title}
                </h3>

                {item.items.map((entry, idx) => (
                  <a
                    key={idx}
                    href={entry.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-[var(--color-muted)] text-xs md:text-sm mb-1 hover:text-[var(--color-accent-purple)]"
                  >
                    {entry.label}
                  </a>
                ))}
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* <section className="pb-16 md:pb-24 w-full">
  <div className="container-custom px-4 sm:px-6 mx-auto">
    <div className="grid grid-cols-1 max-w-7xl mx-auto sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-4">

      {contactData.map((item, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: i * 0.2 }}
          viewport={{ once: true }}
          className="bg-[var(--color-white)] border border-[var(--color-border)] p-6 rounded-2xl text-center shadow-sm hover:shadow-lg transition-all duration-300 w-full max-w-full"
        >
          
          <div className="w-14 h-14 md:w-16 md:h-16 mx-auto mb-4 md:mb-5 flex items-center justify-center rounded-full bg-blue-50 text-blue-500 text-xl md:text-2xl">
            {item.icon}
          </div>

          <h3 className="font-bold text-base md:text-lg text-[var(--color-text)] mb-2 md:mb-3 break-words">
            {item.title}
          </h3>

          {item.items.map((entry, idx) => (
            <a
              key={idx}
              href={entry.link}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-[var(--color-muted)] text-xs md:text-sm mb-1 hover:text-[var(--color-accent-purple)]"
            >
              {entry.label}
            </a>
          ))}

        </motion.div>
      ))}

    </div>
  </div>
</section> */}
      {/* <section className="pb-16 md:pb-24 w-full bg-[#f8fafc]">
  <div className="container-custom px-4 sm:px-6 mx-auto">
    <div className="grid grid-cols-1 max-w-7xl mx-auto sm:grid-cols-2 lg:grid-cols-4 gap-5">

      {contactData.map((item, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: i * 0.15 }}
          viewport={{ once: true }}
          className="bg-white border border-gray-100 p-6 rounded-2xl text-center shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
        >
          
          <div className="w-14 h-14 md:w-16 md:h-16 mx-auto mb-4 flex items-center justify-center rounded-full bg-blue-50 text-blue-500 text-xl md:text-2xl">
            {item.icon}
          </div>

          <h3 className="font-semibold text-base md:text-lg text-gray-800 mb-2">
            {item.title}
          </h3>

          <div className="w-10 h-[2px] bg-blue-500 mx-auto mb-4 rounded-full"></div>

          <div className="space-y-2">
            {item.items.map((entry, idx) => (
              <a
                key={idx}
                href={entry.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-sm text-gray-500 hover:text-blue-600 transition"
              >
                {entry.label}
              </a>
            ))}
          </div>

        </motion.div>
      ))}

    </div>
  </div>
</section> */}

      {/* <section className="pb-16 md:pb-24 w-full bg-[#f8fafc]">
  <div className="container-custom px-4 sm:px-6 mx-auto">
    <div className="grid grid-cols-1 max-w-7xl mx-auto sm:grid-cols-2 lg:grid-cols-4 gap-5">

      {contactData.map((item, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: i * 0.15 }}
          viewport={{ once: true }}
          className="bg-white border border-gray-100 p-4 rounded-2xl text-center shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
        >
          
          <div className="w-14 h-14 md:w-16 md:h-16 mx-auto mb-4 flex items-center justify-center rounded-full bg-blue-50 text-blue-500 text-xl md:text-2xl">
            {item.icon}
          </div>

          <h3 className="font-semibold text-base md:text-lg text-gray-800 mb-2">
            {item.title}
          </h3>

          <div className="w-10 h-[2px] bg-blue-500 mx-auto mb-4 rounded-full"></div>

          <div className="space-y-3">
            {item.items.map((entry, idx) => (
              <a
                key={idx}
                href={entry.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 border border-gray-200 rounded-xl px-2 py-2 text-sm text-gray-700 hover:border-blue-400 hover:shadow-sm transition"
              >
                <span className="text-blue-500 text-base">📧</span>

                <span className="">{entry.label}</span>
              </a>
            ))}
          </div>

        </motion.div>
      ))}

    </div>
  </div>
</section> */}
      {/* <section className="pb-16 md:pb-24 w-full bg-[#f8fafc]">
  <div className="container-custom px-4 sm:px-6 mx-auto">
    <div className="grid grid-cols-1 max-w-7xl mx-auto sm:grid-cols-2 lg:grid-cols-4 gap-5">

      {contactData.map((item, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: i * 0.15 }}
          viewport={{ once: true }}
          className="bg-white border border-gray-100 p-5 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full flex flex-col"
        >
          
          <div className="text-center">
            <div className="w-14 h-14 md:w-16 md:h-16 mx-auto mb-4 flex items-center justify-center rounded-full bg-blue-50 text-blue-500 text-xl md:text-2xl">
              {item.icon}
            </div>

            <h3 className="font-semibold text-base md:text-lg text-gray-800 mb-2">
              {item.title}
            </h3>

            <div className="w-10 h-[2px] bg-blue-500 mx-auto mb-4 rounded-full"></div>
          </div>

          <div className="space-y-3 flex-1">
            {item.items.map((entry, idx) => (
              <a
                key={idx}
                href={entry.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 border border-gray-200 rounded-xl px-3 py-3 text-sm text-gray-700 hover:border-blue-400 hover:shadow-sm transition"
              >
                <span className="text-blue-500 mt-1 shrink-0">📧</span>
                <span className="break-words text-left">{entry.label}</span>
              </a>
            ))}
          </div>

        </motion.div>
      ))}

    </div>
  </div>
</section> */}

      {/* ================= CONTACT FORM SECTION ================= */}
      <section className="pb-20 md:pb-24 w-full">
        <div className="container-custom px-4 sm:px-6 mx-auto">
          <div className="grid md:grid-cols-2 max-w-7xl mx-auto gap-6 md:gap-8 lg:gap-10 items-stretch">
            {/* LEFT IMAGE */}
            {/* <motion.div
              initial={{ opacity: 0, x: -80 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              className="relative w-full h-full min-h-[300px] sm:min-h-[380px] md:min-h-[500px] lg:min-h-[550px] rounded-2xl overflow-hidden shadow-lg"
            >
              <Image
                src={contactImg}
                alt="Contact"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
                className="object-contain w-full h-full transition-transform duration-500 hover:scale-105" />
              <div className="absolute inset-0 bg-black/10 pointer-events-none" />
            </motion.div> */}
            <motion.div
              initial={{ opacity: 0, x: -80 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              className="relative w-full rounded-2xl overflow-hidden shadow-lg"
              style={{ aspectRatio: "10/11" }}
            >
              <Image
                src={contactImg}
                alt="Contact"
                fill
                sizes="100vw"
                priority
                className="object-cover"
              />
            </motion.div>
            {/* RIGHT FORM */}
            {/* <motion.div
              initial={{ opacity: 0, x: 80 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              className="bg-[var(--color-white)] p-5 md:p-6 lg:p-8 rounded-2xl shadow-lg flex flex-col justify-start w-full max-w-full overflow-hidden h-full"
            >
              <span className="inline-block w-fit px-3 md:px-4 py-1 mb-2 md:mb-3 text-xs font-semibold text-[var(--color-accent-purple)] bg-[var(--color-accent-purple-10)] rounded-full uppercase">
                We are always ready to help you
              </span>


              {success && (
                <p className="text-green-600 text-sm font-medium mb-2 break-words">
                  ✅ Message sent successfully!
                </p>
              )}

              {globalError && (
                <p className="text-[var(--color-danger)] text-sm font-medium mb-2 break-words">
                  {globalError}
                </p>
              )}

              <form onSubmit={handleSubmit} className="space-y-3 md:space-y-4 w-full">
                <div className="w-full">
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Name"
                    className="w-full border-b border-[var(--color-border)] py-2 text-sm md:text-base outline-none focus:border-[var(--color-accent-purple)] bg-transparent"
                  />
                  {errors.name && <p className="text-[var(--color-danger)] text-xs mt-1">{errors.name}</p>}
                </div>

                <div className="w-full">
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Email"
                    className="w-full border-b border-[var(--color-border)] py-2 text-sm md:text-base outline-none focus:border-[var(--color-accent-purple)] bg-transparent"
                  />
                  {errors.email && <p className="text-[var(--color-danger)] text-xs mt-1">{errors.email}</p>}
                </div>

                <div className="w-full">
                  <input
                    type="tel"
                    name="mobile"
                    value={form.mobile}
                    onChange={(e) => {
                      const val = e.target.value.replace(/\D/g, "");
                      setForm({ ...form, mobile: val.slice(0, 10) });
                    }}
                    placeholder="Mobile Number"
                    className="w-full border-b border-[var(--color-border)] py-2 text-sm md:text-base outline-none focus:border-[var(--color-accent-purple)] bg-transparent"
                  />
                  {errors.mobile && <p className="text-[var(--color-danger)] text-xs mt-1">{errors.mobile}</p>}
                </div>

                <div className="w-full">
                  <input
                    type="text"
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    placeholder="Your Subject"
                    className="w-full border-b border-[var(--color-border)] py-2 text-sm md:text-base outline-none focus:border-[var(--color-accent-purple)] bg-transparent"
                  />
                  {errors.subject && <p className="text-[var(--color-danger)] text-xs mt-1">{errors.subject}</p>}
                </div>

                <div className="w-full">
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Message"
                    rows={2}
                    className="w-full border-b border-[var(--color-border)] py-2 text-sm md:text-base outline-none focus:border-[var(--color-accent-purple)] bg-transparent resize-none"
                  />
                  {errors.message && <p className="text-[var(--color-danger)] text-xs mt-1">{errors.message}</p>}
                </div>

              
                <div className="w-full mt-4">
                  <Button
                    type="submit"
                    variant="gradient"
                    size="lg"
                    className="w-full"
                    disabled={loading}
                  >
                    {loading ? "Sending..." : "GET IT NOW →"}
                  </Button>
                </div>
              </form>
            </motion.div> */}

            <motion.div
              initial={{ opacity: 0, x: 80 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              className="bg-[var(--color-white)] p-5 md:p-6 lg:p-8 rounded-2xl shadow-lg flex flex-col w-full max-w-full overflow-hidden h-full"
            >
              <span className="inline-block w-fit px-3 md:px-4 py-1 mb-2 md:mb-3 text-md font-semibold text-[var(--color-accent-purple)] bg-[var(--color-accent-purple-10)] rounded-full uppercase">
                We are always ready to help you
              </span>

              {success && (
                <p className="text-green-600 text-sm font-medium mb-2 break-words">
                  ✅ Message sent successfully!
                </p>
              )}

              {globalError && (
                <p className="text-[var(--color-danger)] text-sm font-medium mb-2 break-words">
                  {globalError}
                </p>
              )}

              {/* FORM */}
              <form onSubmit={handleSubmit} className="space-y-8 xl:space-y-8 mt-4 w-full flex-1 flex flex-col">
                <div className="w-full">
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Name"
                    className="w-full border-b border-[var(--color-border)] py-2 text-sm md:text-base outline-none focus:border-[var(--color-accent-purple)] bg-transparent"
                  />
                  {errors.name && <p className="text-[var(--color-danger)] text-xs mt-1">{errors.name}</p>}
                </div>

                <div className="w-full">
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Email"
                    className="w-full border-b border-[var(--color-border)] py-2 text-sm md:text-base outline-none focus:border-[var(--color-accent-purple)] bg-transparent"
                  />
                  {errors.email && <p className="text-[var(--color-danger)] text-xs mt-1">{errors.email}</p>}
                </div>

                <div className="w-full">
                  <input
                    type="tel"
                    name="mobile"
                    value={form.mobile}
                    onChange={(e) => {
                      const val = e.target.value.replace(/\D/g, "");
                      setForm({ ...form, mobile: val.slice(0, 10) });
                    }}
                    placeholder="Mobile Number"
                    className="w-full border-b border-[var(--color-border)] py-2 text-sm md:text-base outline-none focus:border-[var(--color-accent-purple)] bg-transparent"
                  />
                  {errors.mobile && <p className="text-[var(--color-danger)] text-xs mt-1">{errors.mobile}</p>}
                </div>

                <div className="w-full">
                  <input
                    type="text"
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    placeholder="Your Subject"
                    className="w-full border-b border-[var(--color-border)] py-2 text-sm md:text-base outline-none focus:border-[var(--color-accent-purple)] bg-transparent"
                  />
                  {errors.subject && <p className="text-[var(--color-danger)] text-xs mt-1">{errors.subject}</p>}
                </div>

                <div className="w-full flex-1">
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Message"
                    rows={3}
                    className="w-full border-b border-[var(--color-border)] py-2 text-sm md:text-base outline-none focus:border-[var(--color-accent-purple)] bg-transparent resize-none"
                  />
                  {errors.message && <p className="text-[var(--color-danger)] text-xs mt-1">{errors.message}</p>}
                </div>

                <div className="w-full mt-4">
                  <Button
                    type="submit"
                    variant="gradient"
                    size="lg"
                    className="w-full"
                    disabled={loading}
                  >
                    {loading ? "Sending..." : "GET IT NOW →"}
                  </Button>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ================= GOOGLE MAP SECTION ================= */}
      {/* <section className="pb-20 md:pb-24 w-full">
        <div className="container-custom px-4 sm:px-6 mx-auto">
          <div className="rounded-2xl overflow-hidden shadow-lg border border-[var(--color-border)] w-full">
            <iframe
              src="https://www.google.com/maps?q=Office%20No.%20201%2C%202nd%20Floor%2C%20Polaris%20Building%2C%20Near%20Noble%20Hospital%2C%20Hadapsar%2C%20Pune%20411028&output=embed"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-[300px] sm:h-[350px] md:h-[400px] lg:h-[450px]"
            ></iframe>
          </div>
        </div>
      </section> */}
      <section className="pb-20 md:pb-24 w-full">
        <div className="container-custom px-4 sm:px-6 mx-auto">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Ahmedabad Map */}
            <div className="rounded-2xl overflow-hidden shadow-lg border border-[var(--color-border)] w-full">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3671.886669550655!2d72.55469997455533!3d23.027933016129584!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e837ae22fe273%3A0xe6c960874031d0f2!2sCODING%20CLOUD%20INSTITUTE%20%7C%20React%20js%20%2C%20Mern%20Stack%20%2C%20Data%20Science%20%2C%20Java%20%2CData%20Analyst%2CPython%20Training%20Classes%20in%20Ahmedabad!5e0!3m2!1sen!2sus!4v1773741546816!5m2!1sen!2sus"
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-[300px] sm:h-[350px] md:h-[400px] lg:h-[450px]"
              ></iframe>
            </div>


            {/* Pune Map */}
            <div className="rounded-2xl overflow-hidden shadow-lg border border-[var(--color-border)] w-full">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3783.5146829681908!2d73.9254148!3d18.505629700000004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2ebbf356e2f3f%3A0x4ef27a8683922201!2sCoding%20Cloud%20Institute%20%7C%20Data%20Science%20%2C%20Data%20Analyst%20%2CMern%20Stack%20%2CJava%20%2C%20Python%2CAWS%20%2C%20React%20js%20%2CTraining%20Institute%20in%20Pune!5e0!3m2!1sen!2sin!4v1773307199781!5m2!1sen!2sin"
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-[300px] sm:h-[350px] md:h-[400px] lg:h-[450px]"
              ></iframe>
            </div>



          </div>

        </div>
      </section>
    </div>
  );
}