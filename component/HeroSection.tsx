
//mansi

// "use client";

// import Image from "next/image";
// import { FaArrowRight } from "react-icons/fa";
// import Button from "@/component/ui/Button";
// import CardSlider from "@/component/CardSlider";
// import { motion } from "framer-motion";
// import { useRouter } from "next/navigation";
// type HeroData = {

//   description: string;
//   students: number;
//   image: string;
// };

// const defaultData: HeroData = {
//   description:
//     "Join over 3000+ students to boost your skills and build a successful professional career.",
//   students: 3000,
//   image: "/images/hero/banner-01.png",
// };

// const blobImg = "/images/hero/blob2.png";

// export default function HeroSection({ data = defaultData, courses = [] }: { data?: HeroData, courses?: any[] }) {
//   const router = useRouter();
//   return (
//     <>
//       <section
//         className="pt-12 md:pt-16 lg:pt-20 pb-36 overflow-hidden relative"
//         style={{
//           backgroundImage: "url('/images/hero/background.webp')",
//           backgroundSize: "cover",
//           backgroundPosition: "center",
//         }}
//       >
//         <div className="container-custom grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-0 items-center">

//           {/* ================= LEFT CONTENT ================= */}
//           <motion.div
//             initial={{ opacity: 0, x: -60 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.6 }}
//             className="lg:col-span-5 space-y-5 lg:space-y-6 text-center lg:text-left z-10"
//           >
//             <span className="hero-badge mx-auto lg:mx-0 text-lg lg:text-2xl">
//               Ignite Young Minds
//             </span>

//             <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[45px] font-extrabold leading-tight text-[var(--color-text)]">
//               Learn New Things Daily
//             </h1>

//             <p className="text-[var(--color-text-light)] text-base md:text-lg max-w-md mx-auto lg:mx-0">
//               {/* Join over <strong>{data.students}+</strong> students to boost your skills
//             and build a successful professional career. */}
//               Transform your career with us! IT Training and Placement Institute for exceptional learning experience. Join now!
//             </p>

//             <div className="flex justify-center lg:justify-start">
//               <Button
//                 href="/courses"
//                 variant="gradient"
//                 size="md"
//               >
//                 View Course →
//               </Button>               {/* <Button
//               onClick={() => router.push("/courses")}
//               className="mt-8 px-6 py-3 rounded-full bg-gradient-to-r from-[var(--color-accent-purple)] to-[var(--color-primary-dark)] text-[var(--color-white)] font-semibold hover:scale-105 transition"
//             >
//               All Course
//             </Button> */}
//             </div>
//           </motion.div>

//           {/* ================= RIGHT SIDE ================= */}
//           <motion.div
//             initial={{ opacity: 0, x: 60 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.7 }}
//             className="
//   lg:col-span-7
//   flex flex-col md:flex-row
//   items-center md:items-end
//   justify-center md:justify-center lg:justify-start
//   gap-4
//   relative
//   md:px-4
//   lg:px-0
//   lg:-ml-20
// "
//           >

//             {/* ===== IMAGE BLOCK (RIGHT ALIGNED ALWAYS) ===== */}
//             <div
//               className="
//               relative
//               w-[260px] sm:w-[340px] md:w-[380px] lg:w-[420px]
//               h-full
//               flex items-end
//               justify-center lg:justify-end
//             "
//             >
//               {/* BLOB */}
//               <Image
//                 src={blobImg}
//                 alt="blob"
//                 width={420}
//                 height={420}
//                 className="
//                 absolute
// bottom-0
//                 right-0
//                 w-full
//                 opacity-80
//                 z-0
//               "
//               />

//               {/* GIRL IMAGE */}
//               <Image
//                 src={data.image}
//                 alt="student"
//                 width={420}
//                 height={600}
//                 className="relative z-10 object-contain w-full h-auto"
//                 priority
//               />
//             </div>

//             {/* ===== CARD SLIDER ===== */}
//             <div
//               className="
// relative md:static lg:absolute
//     absolute lg:absolute
//     md:static
//     lg:right-0 lg:bottom-8
//     z-20
//     mt-6 md:mt-0
//     px-5 md:px-0
//   "
//             >
//               <CardSlider courses={courses} />

//             </div>

//           </motion.div>

//         </div>
//         <Image
//           src="/images/hero/bg-2.svg"
//           alt="wave"
//           width={1920}
//           height={145}
//           className="absolute bottom-[-2px] left-0 w-full h-[145px] object-cover pointer-events-none"
//         />
//       </section>

//     </>
//   );
// }

"use client";

import Image from "next/image";
import { FaArrowRight } from "react-icons/fa";
import Button from "@/component/ui/Button";
import CardSlider from "@/component/CardSlider";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
type HeroData = {

  description: string;
  students: number;
  image: string;
};

const defaultData: HeroData = {
  description:
    "Join over 3000+ students to boost your skills and build a successful professional career.",
  students: 3000,
  image: "/images/hero/banner-01.png",
};

const blobImg = "/images/hero/blob2.png";

export default function HeroSection({ data = defaultData, courses = [] }: { data?: HeroData, courses?: any[] }) {
  const router = useRouter();
  return (
    <>
      <section
        className="pt-12 z-[99] md:pt-16 lg:pt-20 pb-8 sm:pb-12 md:pb-16 lg:pb-20 xl:pb-24 2xl:pb-28 3xl:pb-32 overflow-hidden relative"
        style={{
          backgroundImage: "url('/images/hero/background.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="
    w-full container-custom mx-auto grid grid-cols-1 xl:grid-cols-12 gap-6 items-center
  ">
          {/* ================= LEFT CONTENT ================= */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className=" space-y-5  text-center xl:col-span-5 xl:text-left xl:space-y-6  3xl:col-span-5 3xl:text-left 3xl:space-y-6 z-10"
          >
            <span className="hero-badge mx-auto xl:mx-0 text-lg xl:text-2xl 2xl:text-3xl 3xl:text-4xl">
              Ignite Young Minds
            </span>
            <h1
              className="
text-2xl sm:text-3xl md:text-4xl
xl:text-5xl
2xl:text-6xl
3xl:text-7xl
font-extrabold
leading-snug md:leading-tight
xl:leading-tight
text-[var(--color-text)]
"
            >
              Learn New Things Daily
            </h1>

            <p className="
        text-[var(--color-text-light)] 
        text-base md:text-lg 
        xl:text-xl 
        2xl:text-2xl 
        3xl:text-3xl
max-w-md md:max-w-lg xl:max-w-xl 2xl:max-w-2xl 3xl:max-w-3xl mx-auto xl:mx-0            ">
              Transform your career with us! IT Training and Placement Institute for exceptional learning experience. Join now!
            </p>

            <div className="flex justify-center xl:justify-start">
              <Button
                href="/courses"
                variant="gradient"
                size="md"
              >
                View Course →
              </Button>
            </div>
          </motion.div>

          {/* ================= RIGHT SIDE ================= */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="
        xl:col-span-7
        flex flex-col md:flex-row
        items-center md:items-end
        justify-center md:justify-center xl:justify-start
        gap-4 xl:gap-2 2xl:gap-6 3xl:gap-3
        relative
        md:px-4
        
        xl:-ml-12 2xl:-ml-6 3xl:-ml-10
      "
          >

            {/* ===== IMAGE BLOCK (RIGHT ALIGNED ALWAYS) ===== */}
            <div
              className="
          relative
          w-full
          xl:ml-[-30px]
max-w-[260px]
sm:max-w-[340px]
md:max-w-[380px]
xl:max-w-[420px]
2xl:max-w-[480px]
3xl:max-w-[560px]
          3xl:pr-4
          h-full
          flex items-end
          justify-center xl:justify-end
          z-[0]
        "
            >
              {/* BLOB */}
              <Image
                src={blobImg}
                alt="blob"
                width={420}
                height={420}
                className="
            absolute
            bottom-4
            right-[40px] 
sm:right-[30px] 
md:right-[40px] 
xl:right-[20px] 
2xl:right-[20px] 
3xl:right-[4  0px]
            w-full
            opacity-80
            z-0
            xl:w-[420px] 
            2xl:w-[480px] 
            3xl:w-[540px]
          "
              />

              {/* GIRL IMAGE */}
              <Image
                src={data.image}
                alt="student"
                width={420}
                height={600}
                className="
            relative z-10 object-contain 
            w-full h-auto
            xl:w-[420px] 
            2xl:w-[480px] 
            3xl:w-[540px]
          "
                priority
              />
            </div>

            {/* ===== CARD SLIDER ===== */}
            <div
              className="
relative md:static xl:absolute
xl:right-[10px]
2xl:right-[-5px]
3xl:right-[-20px]

xl:bottom-4
2xl:bottom-8
3xl:bottom-8

z-20
mt-6 md:mt-0
px-5 md:px-0

2xl:scale-110
3xl:scale-125

origin-bottom-right
"
            >
              <CardSlider courses={courses} />
            </div>

          </motion.div>

        </div>
        <Image
          src="/images/hero/bg-2.svg"
          alt="wave"
          width={1920}
          height={145}
          className="
      absolute bottom-[-2px] left-0 
      w-full 
      h-[80px] sm:h-[100px] md:h-[120px] lg:h-[145px]
      xl:h-[160px] 
      2xl:h-[180px] 
      3xl:h-[200px] 
      object-cover pointer-events-none
    "
        />
      </section>

    </>
  );
}