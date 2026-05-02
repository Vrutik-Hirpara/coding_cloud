
// "use client";

// import { useState, useEffect } from "react";
// import { FaTimes } from "react-icons/fa";
// import { BASE_URL } from "@/lib/api";
// import { createPortal } from "react-dom";
// import Button from "./ui/Button";

// interface EnrollModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   courses: any[];
// }

// type MessageType = {
//   text: string;
//   type: "success" | "error" | "warning" | "";
// };

// export default function EnrollModal({ isOpen, onClose, courses }: EnrollModalProps) {
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState<MessageType>({ text: "", type: "" });
// useEffect(() => {
//   if (isOpen) {
//     document.body.style.overflow = "hidden";
//   } else {
//     document.body.style.overflow = "auto";
//   }

//   return () => {
//     document.body.style.overflow = "auto";
//   };
// }, [isOpen]);
//   // Auto-hide message after 3 seconds
//   useEffect(() => {
//     if (message.text) {
//       const timer = setTimeout(() => {
//         setMessage({ text: "", type: "" });
//       }, 3000);
//       return () => clearTimeout(timer);
//     }
//   }, [message.text]);

//   if (!isOpen) return null;

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     const formData = new FormData(e.currentTarget);

//     const first_name = (formData.get("first_name") as string).trim();
//     const last_name = (formData.get("last_name") as string).trim();
//     const email = (formData.get("email") as string).trim();
//     const mobile = (formData.get("mobile") as string).trim();
//     const city = (formData.get("city") as string).trim();
//     const course_id = Number(formData.get("course_id"));
//     const course_name = (formData.get("course_name") as string).trim();

//     // Validation with inline messages
//     if (!first_name || !last_name || !email || !mobile || !city || !course_id) {
//       setMessage({
//         text: "⚠️ Please fill all fields",
//         type: "warning"
//       });
//       return;
//     }

//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(email)) {
//       setMessage({
//         text: "📧 Invalid Email Address",
//         type: "warning"
//       });
//       return;
//     }

//     if (!/^[0-9]{10}$/.test(mobile)) {
//       setMessage({
//         text: "📱 Enter valid 10 digit mobile number",
//         type: "warning"
//       });
//       return;
//     }

//     setLoading(true);
//     setMessage({ text: "", type: "" }); // Clear previous messages

//     const payload = {
//       first_name,
//       last_name,
//       email,
//       mobile,
//       city,
//       course_id,
//       course_name,
//     };

//     try {
//       const res = await fetch(`${BASE_URL}/enroll/`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload),
//       });

//       if (res.ok) {
//         setMessage({
//           text: "🎉 Enrollment Successful!",
//           type: "success"
//         });

//         // Close modal after 3 seconds
//         setTimeout(() => {
//           onClose();
//         }, 3000);
//       } else {
//         setMessage({
//           text: "❌ Failed to enroll",
//           type: "error"
//         });
//       }
//     } catch (err) {
//       console.error(err);
//       setMessage({
//         text: "Server error ❌ Please try again",
//         type: "error"
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Message styles based on type
//   const getMessageStyles = () => {
//     switch (message.type) {
//       case "success":
//         return "bg-green-100 text-green-700 border-green-300";
//       case "error":
//         return "bg-red-100 text-red-700 border-red-300";
//       case "warning":
//         return "bg-yellow-100 text-yellow-700 border-yellow-300";
//       default:
//         return "";
//     }
//   };


// return createPortal(
//   <div className="fixed inset-0 z-[9999] bg-black/50 flex items-center justify-center p-4 backdrop-blur-sm overflow-y-auto">   
//      <div className="bg-[var(--color-white)]  rounded-2xl w-full max-w-lg p-6 relative shadow-2xl animate-fadeIn">

//         {/* CLOSE BUTTON */}
//         <button
//           onClick={onClose}
//           className="absolute top-3 right-3 text-[var(--color-muted)] hover:text-black text-xl hover:rotate-90 transition-transform duration-300"
//         >
//           <FaTimes />
//         </button>

//         {/* HEADER */}
//         <div className="mb-6">
//           <h2 className="text-2xl font-bold mb-1 text-[var(--color-text-strong)]">
//             🎓 Enroll Now
//           </h2>
//           <p className="text-sm text-[var(--color-muted)] mt-1">
//             Fill the form below to enroll in your desired course. Our team will contact you shortly 🚀
//           </p>
//           <p className="text-xs text-[var(--color-muted-light)] mt-2">* All fields are required</p>
//         </div>

//         {/* FORM */}
//         <form onSubmit={handleSubmit} className="grid gap-4">

//           {message.text && (
//             <div className={`p-3 rounded-lg border ${getMessageStyles()} transition-all duration-300 animate-fadeIn`}>
//               {message.text}
//             </div>
//           )}

//           <div className="grid grid-cols-2 gap-3">
//             <input
//               name="first_name"
//               placeholder="First Name"
//               required
//               className="border border-gray-200 p-3 rounded-lg focus:ring-2 focus:ring-purple-400 outline-none transition-all"
//             />
//             <input
//               name="last_name"
//               placeholder="Last Name"
//               required
//               className="border border-gray-200 p-3 rounded-lg focus:ring-2 focus:ring-purple-400 outline-none transition-all"
//             />
//           </div>

//           <input
//             name="email"
//             type="email"
//             placeholder="Email"
//             required
//             className="border border-gray-200 p-3 rounded-lg focus:ring-2 focus:ring-purple-400 outline-none transition-all"
//           />

//           <input
//             name="mobile"
//             placeholder="Mobile Number"
//             required
//             className="border border-gray-200 p-3 rounded-lg focus:ring-2 focus:ring-purple-400 outline-none transition-all"
//           />

//           <input
//             name="city"
//             placeholder="City"
//             required
//             className="border border-gray-200 p-3 rounded-lg focus:ring-2 focus:ring-purple-400 outline-none transition-all"
//           />

//           <select
//             name="course_id"
//             required
//             className="border border-gray-200 p-3 rounded-lg focus:ring-2 focus:ring-purple-400 outline-none transition-all"
//             onChange={(e) => {
//               const selected = courses.find((c: any) => c.id == e.target.value);
//               const input = document.querySelector('input[name="course_name"]') as HTMLInputElement;
//               if (input) input.value = selected?.name || "";
//             }}
//           >
//             <option value="">Select Course</option>
//             {courses.map((c: any) => (
//               <option key={c.id} value={c.id}>{c.name}</option>
//             ))}
//           </select>

//           <input type="hidden" name="course_name" />


//           <div className="mt-2">
//   <Button
//     type="submit"
//     variant="gradient"
//     size="lg"
//     className="w-full flex items-center justify-center gap-2"
//   >
//     {loading ? (
//       <>
//         <span>Processing...</span>
//       </>
//     ) : (
//       <>
//         <span>🎓 Enroll Now</span>
//       </>
//     )}
//   </Button>
// </div>
//         </form>
//       </div>
//     </div>,
//   document.body
//   );
// }



"use client";

import { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import { apiService, BASE_URL } from "@/lib/api";
import { createPortal } from "react-dom";
import Button from "./ui/Button";
import { showApiErrors } from "@/utility/apiError";
import Swal from "sweetalert2";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { isValidPhoneNumber } from "libphonenumber-js";

interface EnrollModalProps {
  isOpen: boolean;
  onClose: () => void;
  courses: any[];
  onSuccess?: (response: any) => void;  // Add this
  mode?: "enroll" | "book_demo" | "download_brochure";

}

type MessageType = {
  text: string;
  type: "success" | "error" | "warning" | "";
};

const SLOT_CHOICES = [
  { value: "9-10", label: "9:00 AM to 10:00 AM" },
  { value: "10-11", label: "10:00 AM to 11:00 AM" },
  { value: "11-12", label: "11:00 AM to 12:00 PM" },
  { value: "12-1", label: "12:00 PM to 1:00 PM" },
  { value: "1-2", label: "1:00 PM to 2:00 PM" },
  { value: "2-3", label: "2:00 PM to 3:00 PM" },
  { value: "3-4", label: "3:00 PM to 4:00 PM" },
  { value: "4-5", label: "4:00 PM to 5:00 PM" },
  { value: "5-6", label: "5:00 PM to 6:00 PM" },
];

export default function EnrollModal({
  isOpen,
  onClose,
  courses,
  onSuccess,
  mode = "enroll",
}: EnrollModalProps) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<MessageType>({ text: "", type: "" });
  const [phone, setPhone] = useState("");

  const getModalText = () => {
    switch (mode) {
      case "book_demo":
        return {
          heading: "📅 Book a Demo",
          submit: "📅 Book a Demo",
          subtext: "Fill the form below to book a free demo for your desired course. 🚀",
        };
      case "download_brochure":
        return {
          heading: "📚 Download Brochure",
          submit: "📚 Download Brochure",
          subtext: "Fill the form below to download the brochure. Our team will contact you shortly 🚀",
        };
      case "enroll":
      default:
        return {
          heading: "🎟️ Secure Your Seat",
          submit: "🎟️ Secure Your Seat",
          subtext: "Fill the form below to enroll in your desired course. Our team will contact you shortly 🚀",
        };
    }
  };

  const modalText = getModalText();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);
  useEffect(() => {
    if (courses.length === 1) {
      const input = document.querySelector('input[name="course_name"]') as HTMLInputElement;
      if (input) input.value = courses[0].name;
    }
  }, [courses]);
  // Auto-hide message after 3 seconds
  useEffect(() => {
    if (message.text) {
      const timer = setTimeout(() => {
        setMessage({ text: "", type: "" });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [message.text]);

  if (!isOpen) return null;

  const formatPhoneNumber = (mobile: string) => {
    if (!mobile) return "";

    // remove all except digits
    const digits = mobile.replace(/\D/g, "");

    // last 10 digits (India number)
    const number = digits.slice(-10);

    // country code (rest)
    const countryCode = digits.slice(0, digits.length - 10);

    if (!number) return "";

    return `+${countryCode} ${number.slice(0, 5)} ${number.slice(5)}`;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();



    const formData = new FormData(e.currentTarget);

    const first_name = (formData.get("first_name") as string).trim();
    const last_name = (formData.get("last_name") as string).trim();
    const email = (formData.get("email") as string).trim();
    const mobile = (formData.get("mobile") as string).trim();
    const city = (formData.get("city") as string).trim();
    const course_id = Number(formData.get("course_id"));
    const course_name = (formData.get("course_name") as string).trim();
    // const address = (formData.get("address") as string).trim();
    const date = mode === "book_demo" ? (formData.get("date") as string) : null;
    const slot = mode === "book_demo" ? (formData.get("slot") as string) : null;

    // Validation with inline messages
    if (!first_name || !last_name || !email || !mobile || !city || !course_id ) {
      setMessage({
        text: "⚠️ Please fill all fields",
        type: "warning"
      });
      return;
    }

    if (mode === "book_demo" && (!date || !slot)) {
      setMessage({
        text: "⚠️ Please select a date and slot",
        type: "warning"
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setMessage({
        text: "📧 Invalid Email Address",
        type: "warning"
      });
      return;
    }

    // if (!/^[0-9]{10}$/.test(mobile)) {
    //   setMessage({
    //     text: "📱 Enter valid 10 digit mobile number",
    //     type: "warning"
    //   });
    //   return;
    // }

    setMessage({ text: "", type: "" }); // Clear previous messages
    // clean + add + in one go
    const cleanNumber = phone.replace(/[^\d+]/g, "");
    const finalNumber = cleanNumber.startsWith("+")
      ? cleanNumber
      : "+" + cleanNumber;

    // validation
    if (!isValidPhoneNumber(finalNumber)) {
      setMessage({
        text: "📱 Invalid phone number",
        type: "warning"
      });
      return;
    }
    
    const payload = {
      first_name,
      last_name,
      email,
      // mobile,
      mobile: finalNumber, // ✅ use this

      city,
      course_id,
      course_name,
   

      ...(mode === "book_demo" && { date, slot }),
    };

    setLoading(true);

    // try {
    //   const res = await fetch(`${BASE_URL}/enroll/`, {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify(payload),
    //   });

    //   const data = await res.json();

    //   if (!res.ok || data.status === "error") {
    //     showApiErrors(data || data);
    //     return;
    //   }

    //   // ✅ SUCCESS
    //   Swal.fire({
    //     icon: "success",
    //     title: "Enrollment Successful",
    //     text: "We will contact you soon!",
    //   });

    //   setMessage({
    //     text: "🎉 Enrollment Successful!",
    //     type: "success"
    //   });

    //   setTimeout(() => {
    //     onClose();
    //   }, 3000);

    // } catch (err) {
    //   console.error(err);

    //   Swal.fire({
    //     icon: "error",
    //     title: "Server Error",
    //     text: "Please try again later",
    //   });

    // } finally {
    //   setLoading(false); // 🔥 ALWAYS RUNS
    // }
    // try {
    //   const data = await apiService.submitEnrollment(payload);

    //   if (data.status === "error") {
    //     showApiErrors(data || data);
    //     return;
    //   }

    //   // SUCCESS
    //   Swal.fire({
    //     icon: "success",
    //     title: "Enrollment Successful",
    //     text: "We will contact you soon!",
    //   });

    //   setMessage({
    //     text: "🎉 Enrollment Successful!",
    //     type: "success"
    //   });

    //   setTimeout(() => {
    //     onClose();
    //   }, 3000);

    // } catch (err: any) {
    //   console.error(err);

    //   // 🔥 THIS IS IMPORTANT
    //   if (err) {
    //     showApiErrors(err);
    //   } else {
    //     Swal.fire({
    //       icon: "error",
    //       title: "Server Error",
    //       text: "Please try again later",
    //     });
    //   }

    // } finally {
    //   setLoading(false);
    // }
    try {
      const data = await apiService.submitEnrollment(payload);

      // 🔥 backend response ma success false hoy to error
      if (!data.success) {
        showApiErrors(data.message || "Enrollment failed");
        return;
      }

      // ✅ SUCCESS - backend message show karo
      Swal.fire({
        icon: "success",
        title: "Enrollment Successful",
        text: data.message || "We will contact you soon!",
      });
      if (onSuccess) {
        onSuccess(data);  // Pass the entire response which contains pdf_download_url
      }
      setMessage({
        text: `🎉 ${data.message}`,
        type: "success"
      });

      // 🔥 RESET FORM AFTER SUCCESS
      setPhone("");
      if (e.target instanceof HTMLFormElement) {
        e.target.reset();
      }

      setTimeout(() => {
        onClose();
      }, 3000);

    } catch (err: any) {
      console.error(err);

      if (err?.response?.data?.message) {
        showApiErrors(err.response.data.message);
      } else if (err?.message) {
        showApiErrors(err.message);
      } else {
        showApiErrors("Please try again later");
      }
    } finally {
      setLoading(false);
    }
  };

  // Message styles based on type
  const getMessageStyles = () => {
    switch (message.type) {
      case "success":
        return "bg-green-100 text-green-700 border-green-300";
      case "error":
        return "bg-red-100 text-red-700 border-red-300";
      case "warning":
        return "bg-yellow-100 text-yellow-700 border-yellow-300";
      default:
        return "";
    }
  };


  // return createPortal(
  //   <div className="fixed inset-0 z-[9999] bg-black/50 flex items-center justify-center p-4 backdrop-blur-sm overflow-y-auto">   
  //      <div className="bg-[var(--color-white)]  rounded-2xl w-full max-w-lg p-6 relative shadow-2xl animate-fadeIn">

  //         {/* CLOSE BUTTON */}
  //         <button
  //           onClick={onClose}
  //           className="absolute top-3 right-3 text-[var(--color-muted)] hover:text-black text-xl hover:rotate-90 transition-transform duration-300"
  //         >
  //           <FaTimes />
  //         </button>

  //         {/* HEADER */}
  //         <div className="mb-6">
  //           <h2 className="text-2xl font-bold mb-1 text-[var(--color-text-strong)]">
  //             🎓 Enroll Now
  //           </h2>
  //           <p className="text-sm text-[var(--color-muted)] mt-1">
  //             Fill the form below to enroll in your desired course. Our team will contact you shortly 🚀
  //           </p>
  //           <p className="text-xs text-[var(--color-muted-light)] mt-2">* All fields are required</p>
  //         </div>

  //         {/* FORM */}
  //         <form onSubmit={handleSubmit} className="grid gap-4">

  //           {message.text && (
  //             <div className={`p-3 rounded-lg border ${getMessageStyles()} transition-all duration-300 animate-fadeIn`}>
  //               {message.text}
  //             </div>
  //           )}

  //           <div className="grid grid-cols-2 gap-3">
  //             <input
  //               name="first_name"
  //               placeholder="First Name"
  //               required
  //               className="border border-gray-200 p-3 rounded-lg focus:ring-2 focus:ring-purple-400 outline-none transition-all"
  //             />
  //             <input
  //               name="last_name"
  //               placeholder="Last Name"
  //               required
  //               className="border border-gray-200 p-3 rounded-lg focus:ring-2 focus:ring-purple-400 outline-none transition-all"
  //             />
  //           </div>

  //           <input
  //             name="email"
  //             type="email"
  //             placeholder="Email"
  //             required
  //             className="border border-gray-200 p-3 rounded-lg focus:ring-2 focus:ring-purple-400 outline-none transition-all"
  //           />

  //           <input
  //             name="mobile"
  //             placeholder="Mobile Number"
  //             required
  //             className="border border-gray-200 p-3 rounded-lg focus:ring-2 focus:ring-purple-400 outline-none transition-all"
  //           />

  //           <input
  //             name="city"
  //             placeholder="City"
  //             required
  //             className="border border-gray-200 p-3 rounded-lg focus:ring-2 focus:ring-purple-400 outline-none transition-all"
  //           />

  //           <select
  //             name="course_id"
  //             required
  //             className="border border-gray-200 p-3 rounded-lg focus:ring-2 focus:ring-purple-400 outline-none transition-all"
  //             onChange={(e) => {
  //               const selected = courses.find((c: any) => c.id == e.target.value);
  //               const input = document.querySelector('input[name="course_name"]') as HTMLInputElement;
  //               if (input) input.value = selected?.name || "";
  //             }}
  //           >
  //             <option value="">Select Course</option>
  //             {courses.map((c: any) => (
  //               <option key={c.id} value={c.id}>{c.name}</option>
  //             ))}
  //           </select>

  //           <input type="hidden" name="course_name" />


  //           <div className="mt-2">
  //   <Button
  //     type="submit"
  //     variant="gradient"
  //     size="lg"
  //     className="w-full flex items-center justify-center gap-2"
  //   >
  //     {loading ? (
  //       <>
  //         <span>Processing...</span>
  //       </>
  //     ) : (
  //       <>
  //         <span>🎓 Enroll Now</span>
  //       </>
  //     )}
  //   </Button>
  // </div>
  //         </form>
  //       </div>
  //     </div>,
  //   document.body
  //   );
  return createPortal(
    <div className="fixed inset-0 z-[999] bg-black/50 flex items-center justify-center p-4 backdrop-blur-sm overflow-y-auto">
      <div className="bg-[var(--color-white)] rounded-2xl w-full max-w-lg max-h-[90vh]  hide-scrollbar overflow-y-auto p-6 relative shadow-2xl animate-fadeIn my-4">
        {/* my-4 adds vertical margin, max-h-[90vh] and overflow-y-auto ensures content scrolls if needed */}

        {/* CLOSE BUTTON */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          className="absolute top-3 right-3 text-[var(--color-muted)] hover:text-black text-xl hover:rotate-90 transition-transform duration-300 z-10"
        >
          <FaTimes />
        </button>

        {/* HEADER - Fixed padding to ensure content stays within bounds */}
        <div className="mb-6 pr-8"> {/* pr-8 prevents text from going under close button */}
          <h2 className="text-xl sm:text-2xl font-bold mb-1 text-[var(--color-text-strong)] break-words">
            {modalText.heading}
          </h2>
          <p className="text-xs sm:text-sm text-[var(--color-muted)] mt-1 break-words">
            {modalText.subtext}
          </p>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-4"> {/* Changed from grid gap-4 to space-y-4 for better control */}

          {message.text && (
            <div className={`p-3 rounded-lg border text-sm break-words ${getMessageStyles()} transition-all duration-300 animate-fadeIn`}>
              {message.text}
            </div>
          )}

          {/* On very small screens, stack the name fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input
              name="first_name"
              placeholder="First Name"
              required
              className="w-full border border-gray-200 p-3 rounded-lg focus:ring-2 focus:ring-purple-400 outline-none transition-all text-sm"
            />
            <input
              name="last_name"
              placeholder="Last Name"
              required
              className="w-full border border-gray-200 p-3 rounded-lg focus:ring-2 focus:ring-purple-400 outline-none transition-all text-sm"
            />
          </div>

          <input
            name="email"
            type="email"
            placeholder="Email"
            required
            className="w-full border border-gray-200 p-3 rounded-lg focus:ring-2 focus:ring-purple-400 outline-none transition-all text-sm"
          />

          {/* <input
            name="mobile"
            placeholder="Mobile Number"
            required
            className="w-full border border-gray-200 p-3 rounded-lg focus:ring-2 focus:ring-purple-400 outline-none transition-all text-sm"
          /> */}

          {/* <div className="relative z-[9999]">
  <PhoneInput
    country={"in"}
    value={phone}
    onChange={(value) => setPhone(value)}
    inputProps={{
      name: "mobile",
      required: true,
    }}
    containerClass="w-full"
    inputClass="!w-full !p-3 !rounded-lg !border !border-gray-200"
    dropdownClass="!z-[9999]"
  />
</div> */}

          <div className="relative z-[9999] w-full">
            <PhoneInput
              country={"in"}
              value={phone}
              onChange={(value: string, data: any) => {
                if (value.length < data.dialCode.length) return;
                setPhone(value);
              }}
              inputProps={{
                name: "mobile",
                required: true,
              }}
              countryCodeEditable={false}   // 🔥 IMPORTANT (fix for backspace)
              containerClass="!w-full"
              inputClass="!w-full !pl-14 !py-3 !rounded-lg !border !border-gray-200 !text-sm"
              buttonClass="!border-none !bg-transparent"
              dropdownClass="!z-[9999]"
            />
          </div>

          <input
            name="city"
            placeholder="City"
            required
            className="w-full border border-gray-200 p-3 rounded-lg focus:ring-2 focus:ring-purple-400 outline-none transition-all text-sm"
          />

          {/* <textarea
            name="address"
            placeholder="Full Address"
            required
            rows={2}
            className="w-full border border-gray-200 p-3 rounded-lg focus:ring-2 focus:ring-purple-400 outline-none transition-all text-sm resize-none"
          /> */}

          {mode === "book_demo" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                type="date"
                name="date"
                required
                className="w-full border border-gray-200 p-3 rounded-lg focus:ring-2 focus:ring-purple-400 outline-none transition-all text-sm text-gray-700"
              />
              <select
                name="slot"
                required
                className="w-full border border-gray-200 p-3 rounded-lg focus:ring-2 focus:ring-purple-400 outline-none transition-all text-sm text-gray-700"
              >
                <option value="">Select Slot</option>
                {SLOT_CHOICES.map((slot) => (
                  <option key={slot.value} value={slot.value}>
                    {slot.label}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* <select
            name="course_id"
            required
            className="w-full border border-gray-200 p-3 rounded-lg focus:ring-2 focus:ring-purple-400 outline-none transition-all text-sm"
            onChange={(e) => {
              const selected = courses.find((c: any) => c.id == e.target.value);
              const input = document.querySelector('input[name="course_name"]') as HTMLInputElement;
              if (input) input.value = selected?.name || "";
            }}
          >
            <option value="">Select Course</option>
            {courses.map((c: any) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select> */}
          {courses.length > 1 ? (
            <select
              name="course_id"
              required
              className="w-full border border-gray-200 p-3 rounded-lg focus:ring-2 focus:ring-purple-400 outline-none transition-all text-sm"
              onChange={(e) => {
                const selected = courses.find((c: any) => c.id == e.target.value);
                const input = document.querySelector('input[name="course_name"]') as HTMLInputElement;
                if (input) input.value = selected?.name || "";
              }}
            >
              <option value="">Select Course</option>
              {courses.map((c: any) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          ) : (
            <>
              {/* Hidden course id */}
              <input type="hidden" name="course_id" value={courses[0]?.id || ""} />

              {/* Show course name */}
              <input
                type="text"
                name="course_name"
                value={courses[0]?.name || ""}
                readOnly
                className="w-full border border-gray-200 p-3 rounded-lg focus:ring-2 focus:ring-purple-400 outline-none transition-all text-sm"
              />
            </>
          )}
          <input type="hidden" name="course_name" />

          {/* <div className="pt-2">
          <Button
            type="submit"
            variant="gradient"
            size="lg"
            className="w-full flex items-center justify-center gap-2 whitespace-normal break-words"
            disabled={loading}
          >
            {loading ? (
              <>
                <span>Processing...</span>
              </>
            ) : (
              <>
                <span>🎓 Enroll Now</span>
              </>
            )}
          </Button>
        </div> */}
          <div className="pt-2">
            <Button
              type="submit"
              variant="gradient"
              size="lg"
              className={`w-full flex items-center justify-center gap-2 ${loading ? 'opacity-50 pointer-events-none' : ''
                }`}
            >
              {loading ? (
                <span>Processing...</span>
              ) : (
                <span>{modalText.submit}</span>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );

}