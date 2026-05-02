
"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { FaArrowRight } from "react-icons/fa";
import Button from "@/component/ui/Button";
import Pill from "./ui/Pill";
import { CheckCircle, Target, BookOpen, Rocket } from "lucide-react";
import { useRouter } from "next/navigation";
const points = [
  { text: "Empowering Your Success with IT Training", icon: CheckCircle },
  { text: "Top Priority: Your Career Growth", icon: Target },
  { text: "Comprehensive IT Training Solutions for Success", icon: BookOpen },
  { text: "Unlock Your Potential with Our IT Programs", icon: Rocket },
];
// images (public folder)
const about1 = "/images/about/about-01up.png";
const about2 = "/images/about/about-02up.png";
const about3 = "/images/about/aboutup-03.png";
export default function KnowAboutUs() {
  const router = useRouter();

  const imgTopRef = useRef<HTMLDivElement | null>(null);
  const imgBottomRef = useRef<HTMLDivElement | null>(null);
const imgBottomFloatRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const section = document.querySelector(".about-section");

    let ticking = false;

    const handleScroll = () => {
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // section center distance from viewport center
      const offset =
        rect.top + rect.height / 2 - windowHeight / 2;

      // normalized progress
      const progress = offset / windowHeight;

      // 🔥 SAME MOVEMENT FOR BOTH IMAGES
      const move = Math.max(Math.min(progress * -80, 40), -40);

      if (imgBottomFloatRef.current) {
  imgBottomFloatRef.current.style.transform = `translate3d(0, ${move}px, 0)`;
}
      if (imgTopRef.current) {
        imgTopRef.current.style.transform = `translate3d(0, ${move}px, 0)`;
      }

      if (imgBottomRef.current) {
        imgBottomRef.current.style.transform = `translate3d(0, ${move}px, 0)`;
      }

      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(handleScroll);
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    handleScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  //   useEffect(() => {
  //     const section = document.querySelector(".about-section");

  //     let ticking = false;

  //     const handleScroll = () => {
  //       if (!section) return;

  //       const rect = section.getBoundingClientRect();
  //       const windowHeight = window.innerHeight;

  //       // center based scroll progress
  //       const centerOffset =
  //         rect.top + rect.height / 2 - windowHeight / 2;

  //       const progress = centerOffset / windowHeight;

  //       // 🔥 movement (opposite direction)
  //       const moveTop = Math.max(Math.min(progress * -80, 40), -40);
  //       const moveBottom = Math.max(Math.min(progress * 80, 40), -40);

  //       if (imgTopRef.current) {
  //         imgTopRef.current.style.transform = `translate3d(0, ${moveTop}px, 0)`;
  //       }

  //       if (imgBottomRef.current) {
  //         imgBottomRef.current.style.transform = `translate3d(0, ${moveBottom}px, 0)`;
  //       }

  //       ticking = false;
  //     };

  //     const onScroll = () => {
  //       if (!ticking) {
  //         window.requestAnimationFrame(handleScroll);
  //         ticking = true;
  //       }
  //     };

  //     window.addEventListener("scroll", onScroll, { passive: true });
  //     handleScroll();

  //     return () => window.removeEventListener("scroll", onScroll);
  //   }, []);

  return (
    <section className="container-custom  about-section bg-[var(--color-white)] pb-10 lg:pb-16">
      <div className=" grid grid-cols-1 lg:grid-cols-2 gap-0 lg:gap-10 items-center">

        {/* ================= LEFT IMAGES ================= */}

        {/* <div className="relative overflow-visible min-h-[420px] sm:min-h-[500px] md:min-h-[580px] lg:min-h-[620px] z-20 w-full max-w-5xl mx-auto">

                    <div className="relative flex justify-between items-start w-full gap-4 mb-8">
                        <div className="w-auto">
                            <Image
                                src={about1}
                                alt="About main"
                                width={400}  // Original width
                                height={500} // Original height
                                className="rounded w-[220px] sm:w-[260px] md:w-[320px] lg:w-[380px]"
                            // Height auto rakho to width according adjust thase
                            />
                        </div>

                      
                        <div ref={imgTopRef} className="absolute w-auto hidden lgblock" style={{ right: '80px', top: '30px' }}>
                            <Image
                                src={about2}
                                alt="About top"
                                width={250}
                                height={200}
                                className="rounded w-[120px] sm:w-[140px] md:w-[180px] lg:w-[220px]"
                            />
                        </div>
                       
                        <div
                            ref={imgBottomRef}
                            className="absolute top-[280px] left-[240px] flex-shrink-0"
                        >
                            <Image
                                src={about3}
                                alt=""
                                width={450}
                                height={450}
                                className="rounded"
                                style={{ width: "450px", height: "450px", minWidth: "450px" }}
                            />
                        </div>
                    </div>

                   

                </div> */}
        {/* <div className="relative overflow-visible min-h-[420px] sm:min-h-[500px] md:min-h-[580px] lg:min-h-[620px] z-20 w-full max-w-5xl mx-auto">

  <div className="relative flex justify-between items-start w-full gap-4 mb-8">
    <div className="w-auto">
      <Image
        src={about1}
        alt="About main"
        width={400}
        height={500}
        className="rounded w-[400px] sm:w-[400px] md:w-[320px] lg:w-[380px]"
      />
      
      <div 
        ref={imgBottomRef}
          className="block xl:hidden -mt-[120px] ml-[40px] relative z-10"

      >
        <Image
          src={about3}
          alt=""
          width={450}
          height={450}
          className="rounded"
          style={{ width: "450px", height: "450px", minWidth: "450px" }}
        />
      </div>
    </div>

    <div ref={imgTopRef} className="absolute w-auto hidden xl:block" style={{ right: '80px', top: '30px' }}>
      <Image
        src={about2}
        alt="About top"
        width={250}
        height={200}
        className="rounded w-[120px] sm:w-[140px] md:w-[180px] lg:w-[220px]"
      />
    </div>

    <div
      ref={imgBottomRef}
      className="hidden xl:block xl:absolute xl:top-[280px] xl:left-[240px] xl:flex-shrink-0 "
    >
      <Image
        src={about3}
        alt=""
        width={450}
        height={450}
        className="rounded"
        style={{ width: "450px", height: "450px", minWidth: "450px" }}
      />
    </div>
  </div>
</div> */}
        {/* <div className="relative flex justify-between items-start w-full gap-4 mb-8"> */}
        <div className="relative flex justify-between items-start w-full gap-4 mb-8 min-h-[auto]  sm:min-h-[620px] xl:min-h-[720px]">
          {/* First Image Container */}
          <div className="relative w-auto">
            <Image
              src={about1}
              alt="About main"
              width={400}
              height={500}
              className="rounded w-[400px] sm:w-[400px] md:w-[320px] lg:w-[380px]"
            />

            {/* Third Image - shows below 1240px (inside first image container) */}
            <div
              ref={imgBottomFloatRef}
              className="hidden sm:block xl:hidden -mt-[120px] ml-[60px] relative z-10"            >
              <Image
                src={about3}
                alt=""
                width={400}
                height={400}
                className="rounded"
                style={{ width: "400px", height: "400px", minWidth: "400px" }}
              />
            </div>
          </div>

          {/* Second Image - positioned relative to the main container */}
          {/* <div
    ref={imgTopRef}
    className="absolute w-auto block z-50  hidden xl:block"
    style={{ left: '400px', top: '30px' }}
  >
    <Image
      src={about2}
      alt="About top"
      width={250}
      height={200}
      className="rounded w-[120px] sm:w-[140px] md:w-[180px] lg:w-[220px]"
    />
  </div> */}
          {/* <div
  ref={imgTopRef}
  className="absolute block z-50 hidden xl:block flex-shrink-0 w-[250px] h-[200px] min-w-[250px] min-h-[200px]"
  style={{ left: '360px', top: '30px' }}
>
  <Image
    src={about2}
    alt="About top"
    width={250}
    height={200}
    className="rounded w-full h-full object-contain"
  />
</div> */}
          <div
            ref={imgTopRef}
            className="absolute hidden xl:block z-50 flex-shrink-0"
            style={{ left: '360px', top: '30px' }}
          >
            <div className="inline-block overflow-hidden  ">
              <Image
                src={about2}
                alt="About top"
                width={250}
                height={200}
                className="object-contain rounded"
              />
            </div>
          </div>
          {/* Third Image - absolute positioning above 1240px */}
          {/* <div
  ref={imgBottomRef}
  className="hidden xl:block xl:absolute xl:top-[280px] xl:left-[240px] xl:flex-shrink-0"
>
  <Image
    src={about3}
    alt=""
    width={450}
    height={450}
    className="rounded w-[450px] h-[450px] min-w-[450px]"
  />
</div> */}
          <div
            ref={imgBottomRef}
            className="hidden xl:block xl:absolute xl:top-[280px] xl:left-[190px] xl:flex-shrink-0"          >
            <Image
              src={about3}
              alt=""
              width={450}
              height={450}
              className="rounded w-[450px] h-[450px] min-w-[450px] xl:w-[400px] xl:h-[400px] xl:min-w-[400px] 2xl:w-[450px] 2xl:h-[450px] 2xl:min-w-[450px]"
            />
          </div>
        </div>
        {/* ================= RIGHT CONTENT ================= */}
        <div className="flex flex-col my-auto justify-center mt-6 sm:mt-8 lg:mt-32">
          {/* <span className="bg-amber-100 text-amber-800 px-4 py-1 rounded-full w-fit mb-4 font-semibold">
                        KNOW ABOUT US
                    </span> */}
          <div className="pt-3">
            <Pill text="KNOW ABOUT US" />
          </div>

          <h2 className="text-3xl md:text-5xl font-bold mb-2 lg:mb-6 leading-tight">
            IT TRAINING & PLACEMENT INSTITUTE                    </h2>

          <p className="text-[var(--color-muted)] mb-6">
            We strive to provide you with comprehensive training, cutting-edge resources, and personalized guidance to help you excel in the tech industry. Join us and let us support your journey towards a successful and fulfilling career in IT.


          </p>
          <div className="space-y-3">
            {points.map((item, index) => {
              const Icon = item.icon;

              return (
                <div key={index} className="flex items-center gap-4">
                  <Icon className="w-5 h-5 text-blue-600" />
                  <p className="text-[var(--color-muted)]">{item.text}</p>
                </div>
              );
            })}
          </div>
          {/* BUTTON */}
          {/* <div className="mt-8">
                        <Button icon={FaArrowRight}>
                            More About Us
                        </Button>
                    </div> */}

          {/* <Button
                        onClick={() => router.push("/courses")}
                        className="mt-8 px-6 py-3 rounded-full font-semibold hover:scale-105 transition"
                    >
                        All Course
                    </Button> */}
          <Button
            href="/courses"
            variant="gradient"
            className="mt-4  py-3 w-fit rounded-full font-semibold hover:scale-105 transition"

          >
            All Course →
          </Button>
        </div>

      </div>
    </section>
  );
}
