 
"use client";
 
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
 
export default function PrivacyPolicy() {
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
            Privacy Policy
          </motion.h1>
 
          <p className="mt-4 text-sm md:text-base text-[var(--color-muted)]">
            Coding Cloud Privacy Policy
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
 
            Privacy Policy
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
            alt="Privacy Policy"
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
            Welcome to Coding Cloud Privacy Policy
          </h2>
 
          <p className="text-[var(--color-muted)] mb-8 leading-relaxed text-sm md:text-base">
            At Coding Cloud, we value your privacy and are committed to protecting
            your personal information. This privacy policy explains how we collect,
            use, and safeguard your information when you visit our website or use
            our services.
          </p>
 
          <ol className="space-y-8 text-[var(--color-muted)] leading-relaxed list-decimal pl-5 text-sm md:text-base">
 
            <li>
              <span className="font-semibold text-[var(--color-dark)]">
                Information We Collect
              </span>
 
              <p className="mt-2">
                We may collect personal details such as your name, email address,
                phone number, and other information when you register for courses
                or contact us through forms.
              </p>
            </li>
 
            <li>
              <span className="font-semibold text-[var(--color-dark)]">
                How We Use Your Information
              </span>
 
              <p className="mt-2">
                The collected information helps us improve our services, provide
                better support, and communicate important updates regarding
                courses, training programs, or promotions.
              </p>
            </li>
 
            <li>
              <span className="font-semibold text-[var(--color-dark)]">
                Data Protection
              </span>
 
              <p className="mt-2">
                We implement strong security measures to protect your personal
                information from unauthorized access, disclosure, or misuse.
              </p>
            </li>
 
            <li>
              <span className="font-semibold text-[var(--color-dark)]">
                Third Party Services
              </span>
 
              <p className="mt-2">
                In certain cases, we may use third-party tools and analytics
                services to improve our website performance and user experience.
              </p>
            </li>
 
            <li>
              <span className="font-semibold text-[var(--color-dark)]">
                Your Consent
              </span>
 
              <p className="mt-2">
                By using our website, you consent to our privacy policy and agree
                to its terms.
              </p>
            </li>
 
          </ol>
 
        </motion.div>
 
      </section>
 
    </div>
  );
}
 