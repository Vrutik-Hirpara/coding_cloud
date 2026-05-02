

 
"use client";
 
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
 
export default function TermsOfService() {
  return (
    <div className="bg-[var(--color-bg-light)] min-h-screen overflow-hidden">
 
      {/* HERO HEADER */}
      <section
        className="relative pt-16 md:pt-20 pb-32 md:pb-36 text-center overflow-hidden"
        style={{
          backgroundImage: "url('/images/hero/background.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
 
        <div className="max-w-5xl mx-auto px-4">
 
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-[var(--color-text)]"
          >
            Terms of Service
          </motion.h1>
 
          <p className="mt-4 text-sm md:text-base text-[var(--color-muted)]">
            Coding Cloud Terms & Conditions
          </p>
 
          {/* Breadcrumb */}
          <div className="mt-3 text-sm text-[var(--color-muted)]">
 
            <Link
              href="/"
              className="hover:text-[var(--color-accent-purple)] transition"
            >
              Home
            </Link>
 
            <span className="mx-2">›</span>
 
            Terms of Service
 
          </div>
 
        </div>
      </section>
 
 
      {/* BANNER IMAGE */}
      <section className="max-w-6xl mx-auto px-4 -mt-24 md:-mt-28">
 
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="relative h-[200px] sm:h-[260px] md:h-[420px] rounded-2xl overflow-hidden"
        >
 
          <Image
            src="/images/about/learn.jpeg"
            alt="Terms of Service"
            fill
            className="object-contain"
          />
 
        </motion.div>
 
      </section>
 
 
      {/* CONTENT CARD */}
      <section className="max-w-5xl mx-auto px-4 py-14 md:py-16">
 
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 md:p-12"
        >
 
          <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-6 text-[var(--color-dark)]">
            Welcome to Coding Cloud Terms of Service
          </h2>
 
          <p className="text-[var(--color-muted)] mb-8 leading-relaxed text-sm md:text-base">
            These Terms of Service govern your use of Coding Cloud’s website,
            courses, and services. By accessing our platform, you agree to
            follow the terms outlined below.
          </p>
 
          <ol className="space-y-8 text-[var(--color-muted)] leading-relaxed list-decimal pl-5 text-sm md:text-base">
 
            <li>
              <span className="font-semibold text-[var(--color-dark)]">
                Acceptance of Terms
              </span>
 
              <p className="mt-2">
                By accessing and using Coding Cloud courses and services, you
                agree to comply with these Terms of Service and all applicable
                laws and regulations.
              </p>
            </li>
 
            <li>
              <span className="font-semibold text-[var(--color-dark)]">
                Use of Platform
              </span>
 
              <p className="mt-2">
                Users must not misuse the platform, copy course materials, or
                distribute content without permission from Coding Cloud.
              </p>
            </li>
 
            <li>
              <span className="font-semibold text-[var(--color-dark)]">
                Course Access
              </span>
 
              <p className="mt-2">
                Course purchases are non-transferable. Access is granted only
                to the registered user.
              </p>
            </li>
 
            <li>
              <span className="font-semibold text-[var(--color-dark)]">
                Policy Updates
              </span>
 
              <p className="mt-2">
                Coding Cloud reserves the right to modify courses, pricing, and
                policies at any time without prior notice.
              </p>
            </li>
 
            <li>
              <span className="font-semibold text-[var(--color-dark)]">
                Agreement
              </span>
 
              <p className="mt-2">
                Continued use of our services indicates acceptance of any
                updates to these terms.
              </p>
            </li>
 
          </ol>
 
        </motion.div>
 
      </section>
 
    </div>
  );
}
 