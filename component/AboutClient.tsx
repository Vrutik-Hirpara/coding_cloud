

"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import aboutBg from '@/public/images/about/about-bg.jpeg'
import KnowAboutUs from "@/component/KnowAboutUs";
import learn from '@/public/images/about/learn.jpeg'
import Button from "@/component/ui/Button";
import TestimonialSection from "@/component/TestimonialSection";
import RegisterPage from "@/component/RegisterClient";
import Accreditation from "@/component/Accreditation";
import Pill from "@/component/ui/Pill";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[var(--color-white)] overflow-x-hidden">

      {/* ================= HERO SECTION ================= */}
      <section className="relative h-[50vh] md:h-[67vh] flex items-center justify-center text-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={aboutBg}
            alt="About Coding Cloud"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center opacity-60"
            style={{ objectPosition: 'center' }}
          />
        </div>

        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/70"></div>

        <div className="relative z-10 max-w-4xl px-4 sm:px-6">
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-white leading-tight drop-shadow-lg">
            <span className="block text-blue-400 animate-pulse">
              About Us
            </span>
          </h1>

          <p className="text-gray-200 mt-4 sm:mt-6 text-sm sm:text-base md:text-lg max-w-xl mx-auto">
            Start your journey in IT with expert training and guaranteed career growth.
          </p>

          <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
            <Button
              href="/courses"
              variant="gradient"
              className="w-full sm:w-auto flex justify-center"
            >
              Explore Courses
            </Button>

            <Button
              href="/contact"
              variant="outlineWhite"
              className="w-full sm:w-auto flex justify-center"
            >
              Contact Us
            </Button>
          </div>
        </div>
      </section>

      {/* ================= REST OF ABOUT PAGE ================= */}
      <section className="py-12 sm:py-20">
        <KnowAboutUs />
      </section>

      <RegisterPage />

      {/* ================= HOW WE WORK SECTION ================= */}
      <section className="py-12 sm:py-20 md:py-24 bg-gradient-to-br from-[var(--color-bg-light)] via-white to-[var(--color-bg-light)] relative overflow-hidden">
        {/* Decorative background elements - hidden on small screens */}
        <div className="hidden md:block absolute inset-0 w-full h-full">
          <div className="absolute top-20 left-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-yellow-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
        </div>

        <div className="container-custom relative z-10">
          {/* ===== HEADER CENTER ===== */}
          <div className="text-center mb-12 sm:mb-16">
            <motion.span
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-block px-4 sm:px-6 py-1.5 sm:py-2 mb-4 sm:mb-5 text-xs sm:text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-accent-purple)] to-purple-600 rounded-full border-2 border-purple-200 shadow-lg"
            >
              ⚡ HOW WE WORK ⚡
            </motion.span>

            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black leading-tight">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-accent-purple)] to-purple-800">
                Discover yourself
              </span>
              <br />
              <span className="text-[var(--color-text)] relative inline-block">
                with coding cloud
                <motion.div
                  className="absolute -bottom-2 left-1/2 -translate-x-1/2 h-1 w-full bg-gradient-to-r from-[var(--color-accent-purple)] to-purple-600 rounded-full"
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                />
              </span>
            </h2>
          </div>

          {/* <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center"> */}
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center max-w-[2000px] mx-auto min-w-0">
            {/* LEFT CONTENT */}
            <motion.div
              initial={{ opacity: 0, x: -80 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              className="order-2 md:order-1"
            >
              <div className="space-y-4 sm:space-y-6">
                {[
                  {
                    num: "01",
                    title: "For Creative learning",
                    desc: "Developing the creative innovators of tomorrow",
                    gradient: "from-blue-500 to-cyan-500"
                  },
                  {
                    num: "02",
                    title: "For a better tomorrow",
                    desc: "A Success-oriented learning environment.",
                    gradient: "from-purple-500 to-pink-500"
                  },
                  {
                    num: "03",
                    title: "Ignite young minds",
                    desc: "Learning to lead with technology",
                    gradient: "from-orange-500 to-red-500"
                  },
                  {
                    num: "04",
                    title: "Technology that inspires",
                    desc: "Looking to the future with hope",
                    gradient: "from-green-500 to-emerald-500"
                  }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="group relative bg-white rounded-2xl p-4 sm:p-5 pt-12 sm:pt-5 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 text-center sm:text-left"
                  >
                    {/* Number badge - responsive positioning */}
                    <div
                      className={`absolute 
                        left-1/2 -translate-x-1/2 -top-2
                        sm:left-[12px] sm:top-1/2 sm:-translate-y-1/2 sm:translate-x-0
                        w-10 h-10 sm:w-12 sm:h-12 
                        bg-gradient-to-r ${item.gradient} 
                        rounded-full flex items-center justify-center 
                        text-white font-bold text-base sm:text-lg 
                        shadow-lg group-hover:scale-110 transition-transform duration-300`}
                    >
                      {item.num}
                    </div>

                    {/* Content */}
                    <div className="sm:pl-12">
                      <h4 className="font-bold text-base sm:text-lg md:text-xl mb-1 sm:mb-2 text-gray-800 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[var(--color-accent-purple)] group-hover:to-purple-600 transition-all duration-300">
                        {item.title}
                      </h4>

                      <p className="text-gray-600 flex items-center justify-center sm:justify-start gap-2 text-xs sm:text-sm">
                        <span className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${item.gradient}`}></span>
                        {item.desc}
                      </p>
                    </div>

                    {/* Decorative corner - hidden on mobile */}
                    <div
                      className={`hidden sm:block absolute bottom-2 right-2 w-6 h-6 sm:w-8 sm:h-8 border-b-2 border-r-2 rounded-br-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                    ></div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* RIGHT VIDEO IMAGE - Only 1 image shown on mobile */}
            <motion.div
              initial={{ opacity: 0, x: 80, scale: 0.9 }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              className="relative order-1 md:order-2 mb-8 md:mb-0"
            >
              <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl group max-w-full mx-auto">
                {/* Animated border - hidden on small screens */}
                <div className="hidden md:block absolute inset-0 bg-gradient-to-r from-[var(--color-accent-purple)] via-purple-500 to-pink-500 rounded-3xl animate-spin-slow opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ padding: '3px' }}></div>

                {/* Image container */}
                <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden transform group-hover:scale-105 transition-transform duration-700">
                  <div className="relative w-full" style={{ aspectRatio: '600/400' }}>
                    <Image
                      src={learn}
                      alt="How we work"
                      fill
                      className="object-contain sm:object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      priority
                    />
                  </div>

                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-purple-900/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  {/* Floating badge - responsive */}
                  <motion.div
                    animate={{
                      y: [0, -10, 0],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      repeatType: "reverse"
                    }}
                    className="absolute top-2 sm:top-4 right-2 sm:right-4 bg-white/90 backdrop-blur-sm rounded-full px-2 sm:px-4 py-1 sm:py-2 shadow-lg"
                  >
                    <span className="text-xs sm:text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-accent-purple)] to-purple-600 whitespace-nowrap">
                      ✨ Interactive Learning
                    </span>
                  </motion.div>
                </div>
              </div>

              {/* Decorative elements - hidden on mobile */}
              <div className="hidden md:block">
                <motion.div
                  animate={{
                    rotate: [0, 360],
                  }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                  className="absolute -bottom-6 -left-6 w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-r from-purple-300 to-pink-300 rounded-full opacity-30 blur-xl"
                />
                <motion.div
                  animate={{
                    rotate: [360, 0],
                  }}
                  transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                  className="absolute -top-6 -right-6 w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-r from-blue-300 to-cyan-300 rounded-full opacity-30 blur-xl"
                />
              </div>
            </motion.div>
          </div>
        </div>

        {/* <style jsx>{`
          @keyframes blob {
            0% { transform: translate(0px, 0px) scale(1); }
            33% { transform: translate(30px, -50px) scale(1.1); }
            66% { transform: translate(-20px, 20px) scale(0.9); }
            100% { transform: translate(0px, 0px) scale(1); }
          }
          .animate-blob {
            animation: blob 7s infinite;
          }
          .animation-delay-2000 {
            animation-delay: 2s;
          }
          .animation-delay-4000 {
            animation-delay: 4s;
          }
          @keyframes spin-slow {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          .animate-spin-slow {
            animation: spin-slow 3s linear infinite;
          }
        `}</style> */}
      </section>

      {/* ================= TESTIMONIAL SECTION ================= */}
      <section className="relative pt-8 sm:pt-12 lg:pt-24 pb-4 sm:pb-6 overflow-hidden bg-[var(--color-bg-soft)]">
        <div className="relative container-custom">
          {/* MAIN GRID */}
          <div className="grid grid-cols-1 lg:grid-cols-10 gap-6 lg:gap-10 items-start">
            {/* ================= LEFT SIDE CARD ================= */}
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="lg:col-span-3 relative z-20 text-center lg:text-left"
            >
              <div className="rounded-2xl p-6 sm:p-8 lg:p-10 pl-0 sm:pl-0 lg:pl-0 backdrop-blur-md">
                {/* <div className="inline-block  py-1 sm:py-2 mb-3 sm:mb-4 lg:mb-5 text-xs sm:text-sm font-semibold text-[var(--color-accent-purple)] rounded-full">
                  LEARNERS FEEDBACK
                </div> */}
                <div className="pt-3">
                  <Pill text="LEARNERS FEEDBACK" />
                </div>
                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-extrabold text-[var(--color-text)] leading-tight mb-3 sm:mb-4 lg:mb-6">
                  What Our <br className="hidden sm:block" /> Learners Say
                </h2>

                <p className="text-[var(--color-muted)] mb-4 sm:mb-6 lg:mb-8 text-xs sm:text-sm lg:text-base max-w-md mx-auto lg:mx-0">
                  At Coding Cloud, we don’t just teach — we build careers. 
Our learners gain hands-on experience, industry-relevant skills, 
and the confidence to succeed in today’s competitive tech world.
                </p>

                <div className="flex justify-center lg:justify-start">
                  <Button
                    href="/contact"
                    variant="gradient"
                    className="w-auto  py-1.5 sm:py-2 lg:py-3 text-xs sm:text-sm lg:text-base"
                  >
                    Contact Us
                  </Button>
                </div>
              </div>
            </motion.div>

            {/* ================= RIGHT SIDE TESTIMONIALS ================= */}
            <div className="lg:col-span-7 relative">
              {/* LEFT FADE SHADOW - hidden on mobile and tablet */}
              <div className="hidden lg:block absolute left-0 top-0 h-full w-16 sm:w-32 bg-gradient-to-r from-[var(--color-bg-soft)] to-transparent z-10 pointer-events-none" />

              <motion.div
                initial={{ opacity: 0, x: 80 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7 }}
                viewport={{ once: true }}
                className="relative z-0"
              >
                <TestimonialSection />
              </motion.div>
            </div>
          </div>
        </div>
        <Accreditation />
      </section>
    </div>
  );
}