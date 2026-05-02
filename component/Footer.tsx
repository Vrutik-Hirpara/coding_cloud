

// "use client";

// import Link from "next/link";
// import Image from "next/image";
// import { FaFacebookF, FaYoutube, FaInstagram, FaLinkedinIn, FaArrowRight } from "react-icons/fa";
// import { motion } from "framer-motion";
// import Button from "./ui/Button";

// const Footer = () => {
//   const our = [
//     { id: 1, name: "Contact Us", link: "/contact" },
//     { id: 2, name: "Blog", link: "/blogs" },
//   ];

//   const linkIcon = [
//     { id: 1, icon: FaFacebookF, link: "https://www.facebook.com/codingcloudinstitute" },
//     { id: 2, icon: FaYoutube, link: "https://www.youtube.com/@CodingHunt" },
//     { id: 3, icon: FaInstagram, link: "https://www.instagram.com/codingcloud_institute/" },
//     { id: 4, icon: FaLinkedinIn, link: "https://www.linkedin.com/company/coding-cloud/" },
//   ];

//   return (
//     <footer className="bg-[var(--color-bg-light)] border-t border-[var(--color-border)]">
//       <div className="max-w-7xl mx-auto px-5 pt-24 pb-12">

//         {/* MAIN */}
//         <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-20">

//           {/* BRAND */}
//           <motion.div
//             initial={{ opacity: 0, y: 40 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//             viewport={{ once: true }}
//             className="lg:col-span-4"
//           >
//             <Image
//               src="/logos/logo.png"
//               alt="Coding Cloud"
//               width={170}
//               height={50}
//               className="mb-6"
//             />

//             <p className="text-[var(--color-text)] leading-relaxed mb-10 max-w-sm">
//               We’re always in search for talented and motivated people. Don’t be shy introduce yourself!
//             </p>

//             <Button href="/contact" icon={FaArrowRight}>
//               Contact With Us
//             </Button>
//           </motion.div>

//           {/* LINKS */}
//           <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-2">

//             {/* COURSES */}
//             <motion.div
//               initial={{ opacity: 0, y: 40 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.1, duration: 0.6 }}
//               viewport={{ once: true }}
//             >
//               <h3 className="text-lg font-bold text-[var(--color-text)] mb-7">
//                 Top Course
//               </h3>

//               <ul className="space-y-4 text-[var(--color-text)]">
//                 {["Java Programming", "MERN Stack ", "Data Science", "Machine Learnign", "Data Analytics"].map(
//                   (item) => (
//                     <li key={item}>
//                       <Link
//                         href="#"
//                         className="relative group transition-colors duration-300 hover:text-[var(--color-primary)]"
//                       >
//                         {item}
//                         <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-[var(--color-primary)] transition-all duration-300 group-hover:w-full" />
//                       </Link>
//                     </li>
//                   )
//                 )}
//               </ul>
//             </motion.div>

//             {/* COMPANY */}
//             <motion.div
//               initial={{ opacity: 0, y: 40 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.1, duration: 0.6 }}
//               viewport={{ once: true }}
//             >
//               <h3 className="text-lg font-bold text-[var(--color-text)] mb-7">
//                 Our Company
//               </h3>

//               <ul className="space-y-4 text-[var(--color-text)]">
//                 {our.map((item) => (
//                   <li key={item.id}>
//                     <Link
//                       href={item.link}
//                       className="relative group transition-colors duration-300 hover:text-[var(--color-primary)]"
//                     >
//                       {item.name}
//                       <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-[var(--color-primary)] transition-all duration-300 group-hover:w-full" />
//                     </Link>
//                   </li>
//                 ))}
//               </ul>
//             </motion.div>

//             {/* CONTACT */}
//             <motion.div
//               initial={{ opacity: 0, y: 40 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.3, duration: 0.6 }}
//               viewport={{ once: true }}
//               className="col-span-2 sm:col-span-1"
//             >
//               <h3 className="text-lg font-bold text-[var(--color-text)] mb-7">
//                 Get Contact
//               </h3>

//               <div className="space-y-4 text-sm text-[var(--color-text)] mb-8">
//                 <p className="hover:text-[var(--color-primary)] cursor-pointer">
//                   Phone: +91 95373 44018
//                 </p>
//                 <p className="hover:text-[var(--color-primary)] cursor-pointer break-all">
//                   E-mail: pune@codingcloudinstitute.com
//                 </p>
//                 <p>
//                   Office No. 201, 2nd Floor, Polaris Building, Nr. Noble
//                   Hospital Hadapsar, Pune, 411028
//                 </p>
//               </div>

//               {/* SOCIAL */}
//            <div className="flex gap-4">
//   {linkIcon.map((data) => {
//     const Icon = data.icon;
//     return (
//       <motion.a
//         key={data.id}
//         href={data.link}
//         target="_blank"
//         initial={{ y: 0, scale: 1 }}
//         whileHover={{ y: -6, scale: 1.08 }}
//         whileTap={{ scale: 0.95 }}
//         transition={{
//           type: "spring",
//           stiffness: 300,
//           damping: 18,
//         }}
//         className="w-11 h-11 rounded-full bg-[var(--color-white)] border border-[var(--color-border)] flex items-center justify-center text-[var(--color-text)] shadow-sm hover:bg-[var(--color-primary)] hover:text-[var(--color-white)] hover:shadow-lg"
//       >
//         <Icon size={15} />
//       </motion.a>
//     );
//   })}
// </div>
//             </motion.div>

//           </div>
//         </div>

//         {/* BOTTOM */}

// <motion.div
//   initial={{ opacity: 0, y: 20 }}
//   whileInView={{ opacity: 1, y: 0 }}
//   transition={{ delay: 0.4, duration: 0.6 }}
//   viewport={{ once: true }}
//   className="border-t border-[var(--color-border)] pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-[var(--color-text)]"
// >
//   <p>
//     Copyright © 2025 <span className="font-semibold">Coding Cloud</span>. All Rights Reserved
//   </p>

//   <div className="flex items-center gap-6">
//     <Link href="#" className="hover:text-[var(--color-primary)]">
//       Terms of service
//     </Link>
//     <Link href="/privacy" className="hover:text-[var(--color-primary)]">
//       Privacy policy
//     </Link>
//   </div>
// </motion.div>

//       </div>
//     </footer>
//   );
// };

// export default Footer;



"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
  FaFacebookF,
  FaYoutube,
  FaInstagram,
  FaLinkedinIn,
  FaArrowRight,
} from "react-icons/fa";
import { motion } from "framer-motion";
import Button from "./ui/Button";
import { API } from "@/lib/api";

interface Course {
  id: number;
  name: string;
  slug: string;
}

const Footer = () => {
  const [courses, setCourses] = useState<Course[]>([]);

  const our = [
    { id: 1, name: "Contact Us", link: "/contact" },
    { id: 2, name: "Blog", link: "/blogs" },
  ];

  const linkIcon = [
    {
      id: 1,
      icon: FaFacebookF,
      link: "https://www.facebook.com/codingcloudinstitute",
    },
    {
      id: 2,
      icon: FaYoutube,
      link: "https://www.youtube.com/@CodingHunt",
    },
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

  // 🔥 FETCH COURSES FROM API (FIXED)
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetch(`${API.COURSES.LIST}?featured=true`, {
          cache: "no-store",
        });

        if (!res.ok) throw new Error("Failed to fetch courses");

        const data = await res.json();

        let arr: Course[] = [];

        if (Array.isArray(data)) arr = data;
        else if (data.data && Array.isArray(data.data)) arr = data.data;
        else if (data.results && Array.isArray(data.results)) arr = data.results;
        else {
          const possible = Object.values(data).find((v) => Array.isArray(v));
          if (possible) arr = possible as Course[];
        }

        setCourses(arr.slice(0, 5));
      } catch (err) {
        console.error("Course fetch error:", err);
      }
    };

    fetchCourses();
  }, []);

  return (
    <footer className="bg-[var(--color-bg-light)] border-t border-[var(--color-border)]">
      <div className=" mx-auto px-5 pt-12 pb-4 sm:px-8 md:px-12 lg:px-16">

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-2">

          {/* BRAND */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="lg:col-span-3 flex flex-col items-start mb-4"
          >
            {/* LOGO */}
            {/* <div className="relative w-[150px] sm:w-[170px] h-[45px] sm:h-[50px] mb-6">
              <Image
                src="/logos/logo.png"
                alt="Coding Cloud"
                fill
                sizes="(max-width: 640px) 150px, 170px"
                className="object-contain"
                priority
              />
            </div> */}

            <Link href="/" className="inline-block">
              <div className="relative w-[150px] sm:w-[170px] h-[45px] sm:h-[50px] mb-6">
                <Image
                  src="/logos/logo.png"
                  alt="Coding Cloud"
                  fill
                  sizes="(max-width: 640px) 150px, 170px"
                  className="object-contain"
                  priority
                />
              </div>
            </Link>

            {/* DESCRIPTION */}
            <p className="text-[var(--color-text)] text-sm sm:text-base leading-relaxed mb-8 sm:mb-10 mr-4 2xl:mr-8">
              Master in-demand technologies with expert guidance and real-world experience.
            </p>

            {/* BUTTON */}
            <Button
              href="/contact"
              // icon={FaArrowRight}
              variant="gradient"
              size="md"
              className="rounded-lg   transition-all duration-300"
            >
              Contact With Us →
            </Button>
            {/* SOCIAL */}
            <div className="flex gap-4 mt-7">
              {linkIcon.map((data) => {
                const Icon = data.icon;
                return (
                  // <motion.a
                  //   key={data.id}
                  //   href={data.link}
                  //   target="_blank"
                  //   initial={{ y: 0, scale: 1 }}
                  //   whileHover={{ y: -6, scale: 1.08 }}
                  //   whileTap={{ scale: 0.95 }}
                  //   transition={{
                  //     type: "spring",
                  //     stiffness: 300,
                  //     damping: 18,
                  //   }}
                  //   className="w-11 h-11 rounded-full bg-[var(--color-white)] border border-[var(--color-border)] flex items-center justify-center text-[var(--color-text)] shadow-sm hover:bg-[var(--color-accent-purple)] hover:text-[var(--color-white)] hover:shadow-lg"
                  // >
                  //   <Icon size={15} />
                  // </motion.a>
                  <motion.a
                    key={data.id}
                    href={data.link}
                    target="_blank"
                    initial={{ y: 0, scale: 1 }}
                    whileHover={{ y: -6, scale: 1.08 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 18,
                    }}
                    className="w-11 h-11 rounded-full bg-[var(--color-white)] border border-[var(--color-border)] 
  flex items-center justify-center text-[var(--color-text)] shadow-sm hover:shadow-lg
hover:[background:var(--color-logo-gradient)]  hover:text-white"
                  >
                    <data.icon />
                  </motion.a>
                );
              })}
            </div>
          </motion.div>

          {/* LINKS */}
          <div className="lg:col-span-9 grid grid-cols-2 sm:grid-cols-3 gap-6">

            {/* COURSES */}
            <motion.div
              className="hidden sm:block"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 className="text-lg font-bold text-[var(--color-text)] mb-2 sm:mb-7">
                Top Course
              </h3>

              <ul className="space-y-2 sm:space-y-4 text-md text-[var(--color-text)]">
                {courses.map((course) => (
                  <li key={course.id}>
                    <Link
                      href={`/courses/${course.slug}`}
                      className="relative text-md group hover:text-[var(--color-accent-purple)]"
                    >
                      {course.name}
                      <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-[var(--color-accent-purple)] transition-all duration-500 group-hover:w-full " />
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* COMPANY + CONTACT same as before ... */}


            {/* COMPANY */}
            {/* AHMEDABAD OFFICE */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 className="text-lg font-bold text-[var(--color-text)] mb-2 sm:mb-7">
                Ahmedabad Office
              </h3>

              <ul className="space-y-2 sm:space-y-4 text-[var(--color-text)] text-md">
                {/* <li className="hover:text-[var(--color-accent-purple)] cursor-pointer">
                  Phone:9998031661
                </li> */}
                <li className="hover:text-[var(--color-accent-purple)] cursor-pointer">
                  <a href="tel:9998031661">
                    Phone:+91 9998031661
                  </a>
                </li>
                 <li className="hover:text-[var(--color-accent-purple)] cursor-pointer">
                  <a href="tel:6356723490">
                    Phone:+91 6356723490
                  </a>
                </li>
                <li className="space-y-0 sm:space-y-1">


                  <a
                    href="mailto:komal@codingcloudinstitute.com"
                    className="block hover:text-[var(--color-accent-purple)] cursor-pointer break-all"
                  >
                    komal@codingcloudinstitute.com
                  </a>
                  <a
                    href="mailto:info@codingcloudinstitute.com"
                    className="block hover:text-[var(--color-accent-purple)] cursor-pointer break-all"
                  >
                    info@codingcloudinstitute.com
                  </a>
                </li>
                {/* <li>
                  <a
                    href="https://maps.app.goo.gl/HtXAGaK1jPQzcqhe6"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[var(--color-accent-purple)] cursor-pointer break-word 2xl:max-w-sm"
                  >
                    401, 4th Floor, Sapphire Complex, Chimanlal Girdharlal Rd, near Yes Bank,
                    Ellisbridge, Ahmedabad, Gujarat 380009
                  </a>
                </li> */}
                <li>
                  <a
                    href="https://maps.app.goo.gl/HtXAGaK1jPQzcqhe6"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[var(--color-accent-purple)] cursor-pointer break-words block 2xl:max-w-sm"
                  >
                    401, 4th Floor, Sapphire Complex, Chimanlal Girdharlal Rd, near Yes Bank,
                    Ellisbridge, Ahmedabad, Gujarat 380009
                  </a>
                </li>
              </ul>
            </motion.div>

            {/* PUNE OFFICE */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 className="text-lg font-bold text-[var(--color-text)] mb-2 sm:mb-7">
                Pune Office
              </h3>

              <ul className="space-y-2 sm:space-y-4 text-md text-[var(--color-text)] mb-8">

                {/* <li className="hover:text-[var(--color-accent-purple)] cursor-pointer">
                  Phone:9328944018
                </li> */}
                <li>
                  <a
                    href="tel:9998937931"
                    className="hover:text-[var(--color-accent-purple)] cursor-pointer"
                  >
                    Phone:+91 9998937931
                  </a>
                </li>
                <li className="space-y-0 sm:space-y-1">


                  <a
                    href="mailto:komal@codingcloudinstitute.com"
                    className="block hover:text-[var(--color-accent-purple)] cursor-pointer break-all"
                  >
                    pune@codingcloudinstitute.com
                  </a>
                  <a
                    href="mailto:info@codingcloudinstitute.com"
                    className="block hover:text-[var(--color-accent-purple)] cursor-pointer break-all"
                  >
                    info@codingcloudinstitute.com
                  </a>
                </li>

                {/* <li>
                  <a
                    href="https://maps.app.goo.gl/CEnMtxg8EzRNjNQBA"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[var(--color-accent-purple)] cursor-pointer break-word"
                  >
                    Office No. 201, 2nd Floor, Polaris Building, Nr. Noble Hospital Hadapsar,
                    Pune, 411028
                  </a>
                </li> */}
                <li>
                  <a
                    href="https://maps.app.goo.gl/CEnMtxg8EzRNjNQBA"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[var(--color-accent-purple)] cursor-pointer break-words block 2xl:max-w-xs"  >
                    Office No. 201, 2nd Floor, Polaris Building, Nr. Noble Hospital Hadapsar,
                    Pune, 411028
                  </a>
                </li>

              </ul>
            </motion.div>

            {/* <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              viewport={{ once: true }}
              className="col-span-2 sm:col-span-1"
            >
              <h3 className="text-lg font-bold text-[var(--color-text)] mb-7">
                Our Offices
              </h3>

              <div className="space-y-4 text-sm text-[var(--color-text)] mb-8">

                <div>
                  <p className="hover:text-[var(--color-accent-purple)] cursor-pointer">
                    <span className="font-semibold">Mobile:</span> +91 95373 44018
                  </p>
                </div>

                <div>
                  <p className="font-semibold">Emails:</p>

                  <div className="space-y-1 ml-4">
                     <a
                      href="mailto:komal@codingcloudinstitute.com"
                      className="block hover:text-[var(--color-accent-purple)] cursor-pointer break-all"
                    >
                      komal@codingcloudinstitute.com
                    </a>
                    <a
                      href="mailto:pune@codingcloudinstitute.com"
                      className="block hover:text-[var(--color-accent-purple)] cursor-pointer break-all"
                    >
                      pune@codingcloudinstitute.com
                    </a>

                   

                    <a
                      href="mailto:info@codingcloudinstitute.com"
                      className="block hover:text-[var(--color-accent-purple)] cursor-pointer break-all"
                    >
                      info@codingcloudinstitute.com
                    </a>
                  </div>
                </div>

                <div>
                  <p className="font-semibold">Addresses:</p>

                  <div className="space-y-3 ml-4">
                    

                    <p>
                      <a
                        href="https://www.google.com/maps?q=401,+4th+Floor,+Sapphire+Complex,+Chimanlal+Girdharlal+Rd,+near+Yes+Bank,+Ellisbridge,+Ahmedabad,+Gujarat+380009"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-[var(--color-accent-purple)] cursor-pointer break-all"
                      >
                        Office No. 401, 4th Floor, Sapphire Complex, Chimanlal Girdharlal Rd, near Yes Bank, Ellisbridge, Ahmedabad, Gujarat 380009
                      </a>
                    </p>
                    <p>
                      <a
                        href="https://maps.app.goo.gl/CEnMtxg8EzRNjNQBA"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-[var(--color-accent-purple)] cursor-pointer break-all"
                      >
                        Office No. 201, 2nd Floor, Polaris Building, Nr. Noble Hospital Hadapsar, Pune, 411028
                      </a>
                    </p>
                  </div>
                </div>

              </div>
            </motion.div> */}

          </div>
        </div>

        {/* BOTTOM same as before */}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          viewport={{ once: true }}
          className="border-t border-[var(--color-border)] md:pt-8 pt-4 flex flex-col md:flex-row justify-between items-center gap-1 text-md text-[var(--color-text)]"
        >
          <div className="flex items-center gap-6">
            <Link href="/terms-of-service" className="hover:text-[var(--color-accent-purple)]">
              Terms of service
            </Link>
            <Link href="/privacy-policy" className="hover:text-[var(--color-accent-purple)]">
              Privacy policy
            </Link>
          </div>
          <p className="">
            Copyright © 2023 by Coding Cloud
            {/* <span className="font-semibold">
              Coding Cloud</span>
             All Rights Reserved */}
          </p>


        </motion.div>

      </div>
    </footer>
  );
};

export default Footer;