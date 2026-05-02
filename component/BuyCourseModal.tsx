
// "use client";

// import { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { FaTimes, FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";

// type Props = {
//   isOpen: boolean;
//   onClose: () => void;
//   onSuccess: (data: any) => void;
// };

// export default function BuyCourseModal({
//   isOpen,
//   onClose,
//   onSuccess,
// }: Props) {
//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     mobile: "",
//     address: "",
//   });

//   const [loading, setLoading] = useState(false);

//   const handleChange = (e: any) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const validate = () => {
//     if (!form.name || !form.email || !form.mobile || !form.address) {
//       alert("Please fill all fields");
//       return false;
//     }
//     return true;
//   };

//   const handleSubmit = async () => {
//     if (!validate()) return;

//     setLoading(true);
//     onSuccess(form); // send to CartPage
//     setLoading(false);
//   };

//   return (
//     <AnimatePresence>
//       {isOpen && (
//         <motion.div
//           className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           exit={{ opacity: 0 }}
//         >
//           <motion.div
//             className="w-full max-w-md bg-white rounded-3xl p-6 shadow-xl relative"
//             initial={{ scale: 0.9 }}
//             animate={{ scale: 1 }}
//             exit={{ scale: 0.9 }}
//           >
//             {/* Close */}
//             <button
//               onClick={onClose}
//               className="absolute top-4 right-4 text-gray-400 hover:text-red-500"
//             >
//               <FaTimes />
//             </button>

//             <h2 className="text-2xl font-bold mb-6">Payment Details</h2>

//             <div className="space-y-4">
//               <div className="flex items-center gap-3 border p-3 rounded-xl">
//                 <FaUser />
//                 <input
//                   type="text"
//                   name="name"
//                   placeholder="Full Name"
//                   value={form.name}
//                   onChange={handleChange}
//                   className="w-full outline-none"
//                 />
//               </div>

//               <div className="flex items-center gap-3 border p-3 rounded-xl">
//                 <FaEnvelope />
//                 <input
//                   type="email"
//                   name="email"
//                   placeholder="Email"
//                   value={form.email}
//                   onChange={handleChange}
//                   className="w-full outline-none"
//                 />
//               </div>

//               <div className="flex items-center gap-3 border p-3 rounded-xl">
//                 <FaPhone />
//                 <input
//                   type="tel"
//                   name="mobile"
//                   placeholder="Mobile"
//                   value={form.mobile}
//                   onChange={handleChange}
//                   className="w-full outline-none"
//                 />
//               </div>

//               <div className="flex items-center gap-3 border p-3 rounded-xl">
//                 <FaMapMarkerAlt />
//                 <input
//                   type="text"
//                   name="address"
//                   placeholder="Address"
//                   value={form.address}
//                   onChange={handleChange}
//                   className="w-full outline-none"
//                 />
//               </div>
//             </div>

//             <button
//               onClick={handleSubmit}
//               disabled={loading}
//               className="w-full mt-6 py-4 bg-blue-600 text-white rounded-2xl font-bold"
//             >
//               {loading ? "Processing..." : "Continue to Payment"}
//             </button>
//           </motion.div>
//         </motion.div>
//       )}
//     </AnimatePresence>
//   );
// }

// "use client";

// import { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   FaTimes,
//   FaUser,
//   FaEnvelope,
//   FaPhone,
//   FaMapMarkerAlt,
//   FaLock,
//   FaCreditCard,
//   FaShieldAlt
// } from "react-icons/fa";

// type Props = {
//   isOpen: boolean;
//   onClose: () => void;
//   onSuccess: (data: any) => void;
// };

// export default function BuyCourseModal({
//   isOpen,
//   onClose,
//   onSuccess,
// }: Props) {
//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     mobile: "",
//     address: "",
//   });

//   const [loading, setLoading] = useState(false);
//   const [errors, setErrors] = useState<Record<string, string>>({});

//   // Prevent body scroll when modal is open
//   useEffect(() => {
//     if (isOpen) {
//       document.body.style.overflow = "hidden";
//     } else {
//       document.body.style.overflow = "unset";
//     }
//     return () => {
//       document.body.style.overflow = "unset";
//     };
//   }, [isOpen]);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//     if (errors[e.target.name]) {
//       setErrors({ ...errors, [e.target.name]: "" });
//     }
//   };

//   const validate = () => {
//     const newErrors: Record<string, string> = {};

//     if (!form.name.trim()) newErrors.name = "Full name is required";
//     if (!form.email.trim()) newErrors.email = "Email is required";
//     else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = "Email is invalid";
//     if (!form.mobile.trim()) newErrors.mobile = "Mobile number is required";
//     else if (!/^[0-9]{10}$/.test(form.mobile.replace(/\D/g, ''))) newErrors.mobile = "Mobile number must be 10 digits";
//     if (!form.address.trim()) newErrors.address = "Address is required";

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async () => {
//     if (!validate()) return;

//     setLoading(true);
//     await new Promise(resolve => setTimeout(resolve, 1000));
//     onSuccess(form);
//     setLoading(false);
//   };

//   return (
//     <AnimatePresence>
//       {isOpen && (
//         <>
//           {/* Backdrop */}
//           <motion.div
//             className="fixed inset-0 z-[9998] bg-black/60 backdrop-blur-sm"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             onClick={onClose}
//           />

//           {/* Modal Container - Responsive with safe margins */}
//           <motion.div
//             className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//           >
//             <motion.div
//               className="relative w-full max-w-[92%] sm:max-w-md md:max-w-lg hide-scrollbar bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-2xl overflow-y-auto max-h-[95vh] sm:max-h-[90vh] my-auto"
//               initial={{ scale: 0.95, y: 20 }}
//               animate={{ scale: 1, y: 0 }}
//               exit={{ scale: 0.95, y: 20 }}
//               transition={{ type: "spring", damping: 25, stiffness: 300 }}
//               onClick={(e) => e.stopPropagation()}
//             >
//               {/* Decorative Header */}
//               <div className="absolute top-0 left-0 right-0 h-28 sm:h-32 bg-gradient-to-r from-blue-600 to-indigo-600 opacity-10 rounded-t-2xl" />

//               {/* Close Button */}
//               <button
//                 onClick={onClose}
//                 className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10 p-1.5 sm:p-2 rounded-full bg-white/80 hover:bg-white text-gray-500 hover:text-red-500 transition-all duration-200 shadow-sm"
//               >
//                 <FaTimes className="w-3 h-3 sm:w-4 sm:h-4" />
//               </button>

//               {/* Content */}
//               <div className="relative p-5 sm:p-6 pt-6 sm:pt-8">
//                 {/* Header */}
//                 <div className="text-center mb-5 sm:mb-6">
//                   <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl shadow-lg mb-3">
//                     <FaCreditCard className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
//                   </div>
//                   <h2 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
//                     Complete Your Purchase
//                   </h2>
//                   <p className="text-xs sm:text-sm text-gray-500 mt-1">
//                     Secure checkout powered by SSL encryption
//                   </p>
//                 </div>

//                 {/* Form Fields */}
//                 <div className="space-y-3 sm:space-y-4">
//                   {/* Name Field */}
//                   <div className="group">
//                     <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 ml-1">
//                       Full Name
//                     </label>
//                     <div className={`flex items-center gap-2 sm:gap-3 border-2 rounded-xl p-1 sm:p-3 transition-all duration-200 ${errors.name ? "border-red-400 bg-red-50" : "border-gray-200 group-focus-within:border-blue-400 bg-white"
//                       }`}>
//                       <FaUser className={`text-sm sm:text-base ${errors.name ? "text-red-400" : "text-gray-400 group-focus-within:text-blue-500"}`} />
//                       <input
//                         type="text"
//                         name="name"
//                         placeholder="Enter your full name"
//                         value={form.name}
//                         onChange={handleChange}
//                         className="w-full outline-none bg-transparent text-gray-700 text-sm sm:text-base placeholder:text-gray-400"
//                       />
//                     </div>
//                     {errors.name && (
//                       <p className="text-xs text-red-500 mt-1 ml-1">{errors.name}</p>
//                     )}
//                   </div>

//                   {/* Email Field */}
//                   <div className="group">
//                     <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 ml-1">
//                       Email Address
//                     </label>
//                     <div className={`flex items-center gap-2 sm:gap-3 border-2 rounded-xl p-1 sm:p-3 transition-all duration-200 ${errors.email ? "border-red-400 bg-red-50" : "border-gray-200 group-focus-within:border-blue-400 bg-white"
//                       }`}>
//                       <FaEnvelope className={`text-sm sm:text-base ${errors.email ? "text-red-400" : "text-gray-400 group-focus-within:text-blue-500"}`} />
//                       <input
//                         type="email"
//                         name="email"
//                         placeholder="your@email.com"
//                         value={form.email}
//                         onChange={handleChange}
//                         className="w-full outline-none bg-transparent text-gray-700 text-sm sm:text-base placeholder:text-gray-400"
//                       />
//                     </div>
//                     {errors.email && (
//                       <p className="text-xs text-red-500 mt-1 ml-1">{errors.email}</p>
//                     )}
//                   </div>

//                   {/* Mobile Field */}
//                   <div className="group">
//                     <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 ml-1">
//                       Mobile Number
//                     </label>
//                     <div className={`flex items-center gap-2 sm:gap-3 border-2 rounded-xl p-1 sm:p-3 transition-all duration-200 ${errors.mobile ? "border-red-400 bg-red-50" : "border-gray-200 group-focus-within:border-blue-400 bg-white"
//                       }`}>
//                       <FaPhone className={`text-sm sm:text-base ${errors.mobile ? "text-red-400" : "text-gray-400 group-focus-within:text-blue-500"}`} />
//                       <input
//                         type="tel"
//                         name="mobile"
//                         placeholder="10-digit mobile number"
//                         value={form.mobile}
//                         onChange={handleChange}
//                         className="w-full outline-none bg-transparent text-gray-700 text-sm sm:text-base placeholder:text-gray-400"
//                       />
//                     </div>
//                     {errors.mobile && (
//                       <p className="text-xs text-red-500 mt-1 ml-1">{errors.mobile}</p>
//                     )}
//                   </div>

//                   {/* Address Field */}
//                   <div className="group">
//                     <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 ml-1">
//                       Delivery Address
//                     </label>
//                     <div className={`flex items-center gap-2 sm:gap-3 border-2 rounded-xl p-1 sm:p-3 transition-all duration-200 ${errors.address ? "border-red-400 bg-red-50" : "border-gray-200 group-focus-within:border-blue-400 bg-white"
//                       }`}>
//                       <FaMapMarkerAlt className={`text-sm sm:text-base ${errors.address ? "text-red-400" : "text-gray-400 group-focus-within:text-blue-500"}`} />
//                       <input
//                         type="text"
//                         name="address"
//                         placeholder="Your complete address"
//                         value={form.address}
//                         onChange={handleChange}
//                         className="w-full outline-none bg-transparent text-gray-700 text-sm sm:text-base placeholder:text-gray-400"
//                       />
//                     </div>
//                     {errors.address && (
//                       <p className="text-xs text-red-500 mt-1 ml-1">{errors.address}</p>
//                     )}
//                   </div>
//                 </div>

//                 {/* Security Notice */}
//                 <div className="flex items-center justify-center gap-2 mt-5 sm:mt-6 text-xs text-gray-400 flex-wrap">
//                   <FaLock className="w-3 h-3" />
//                   <span>Your information is secure and encrypted</span>
//                   <FaShieldAlt className="w-3 h-3" />
//                 </div>

//                 {/* Submit Button */}
//                 <button
//                   onClick={handleSubmit}
//                   disabled={loading}
//                   className="relative w-full mt-4 sm:mt-5 py-3 sm:py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100 overflow-hidden group text-sm sm:text-base"
//                 >
//                   <span className={`relative z-10 flex items-center justify-center gap-2 ${loading ? "opacity-0" : "opacity-100"}`}>
//                     <FaCreditCard className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
//                     Proceed to Payment
//                   </span>
//                   {loading && (
//                     <div className="absolute inset-0 flex items-center justify-center">
//                       <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
//                     </div>
//                   )}
//                   <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-indigo-700 transform translate-y-full group-hover:translate-y-0 transition-transform duration-200" />
//                 </button>


//               </div>
//             </motion.div>
//           </motion.div>
//         </>
//       )}
//     </AnimatePresence>
//   );
// }


"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { isValidPhoneNumber } from "libphonenumber-js";
import {
  FaTimes,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaLock,
  FaCreditCard,
  FaShieldAlt,
} from "react-icons/fa";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (data: any) => void;
};

const inputFields = [
  { name: "name", label: "Full Name", type: "text", icon: FaUser, placeholder: "Enter your full name" },
  { name: "email", label: "Email Address", type: "email", icon: FaEnvelope, placeholder: "your@email.com" },
  { name: "mobile", label: "Mobile Number", type: "tel", icon: FaPhone, placeholder: "Enter phone number" },
  { name: "address", label: "Address", type: "text", icon: FaMapMarkerAlt, placeholder: "Your complete address" },
];

export default function BuyCourseModal({ isOpen, onClose, onSuccess }: Props) {
  const [form, setForm] = useState({ name: "", email: "", mobile: "", address: "" });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [phone, setPhone] = useState("");
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
    return () => { document.body.style.overflow = "unset"; };
  }, [isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!form.name.trim()) newErrors.name = "Full name is required";
    if (!form.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = "Email is invalid";
    const cleanNumber = phone.replace(/[^\d+]/g, "");
    const finalNumber = cleanNumber.startsWith("+")
      ? cleanNumber
      : "+" + cleanNumber;

    if (!phone) {
      newErrors.mobile = "Mobile number is required";
    } else if (!isValidPhoneNumber(finalNumber)) {
      newErrors.mobile = "Invalid phone number";
    }
    if (!form.address.trim()) newErrors.address = "Address is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const cleanNumber = phone.replace(/[^\d+]/g, "");
    const finalNumber = cleanNumber.startsWith("+")
      ? cleanNumber
      : "+" + cleanNumber;

    onSuccess({
      ...form,
      mobile: Number(finalNumber), // ✅ correct number
    });
    setLoading(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 z-[9998] bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="relative w-full max-w-[92%] sm:max-w-md md:max-w-lg hide-scrollbar bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-2xl overflow-y-auto max-h-[95vh] sm:max-h-[90vh] my-auto"
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="absolute top-0 left-0 right-0 h-28 sm:h-32 bg-gradient-to-r from-blue-600 to-indigo-600 opacity-10 rounded-t-2xl" />
              <button
                onClick={onClose}
                className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10 p-1.5 sm:p-2 rounded-full bg-white/80 hover:bg-white text-gray-500 hover:text-red-500 transition-all duration-200 shadow-sm"
              >
                <FaTimes className="w-3 h-3 sm:w-4 sm:h-4" />
              </button>
              <div className="relative p-5 sm:p-6 pt-6 sm:pt-8">
                <div className="text-center mb-5 sm:mb-6">
                  <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl shadow-lg mb-3">
                    <FaCreditCard className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                    Complete Your Purchase
                  </h2>
                  <p className="text-xs sm:text-sm text-gray-500 mt-1">Secure checkout powered by SSL encryption</p>
                </div>
                <div className="space-y-3 sm:space-y-4">
                  {inputFields.map(({ name, label, type, icon: Icon, placeholder }) => (
                    <div key={name} className="group">
                      <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 ml-1">{label}</label>
                      <div
                        className={`flex items-center gap-2 sm:gap-3 border-2 rounded-xl p-2 sm:p-2 transition-all duration-200 ${errors[name]
                          ? "border-red-400 bg-red-50"
                          : "border-gray-200 group-focus-within:border-blue-400 bg-white"
                          }`}
                      >
                        {/* <Icon className={`text-sm sm:text-base ${errors[name] ? "text-red-400" : "text-gray-400 group-focus-within:text-blue-500"}`} /> */}
                        {name !== "mobile" && (
  <Icon
    className={`text-sm sm:text-base ${
      errors[name]
        ? "text-red-400"
        : "text-gray-400 group-focus-within:text-blue-500"
    }`}
  />
)}
                        {name === "mobile" ? (
                          <PhoneInput
                            country={"in"}
                            value={phone}
                            onChange={(value) => setPhone(value)}
                            enableSearch
                            inputClass="!w-full !bg-transparent !border-none !outline-none text-gray-700 text-sm sm:text-base"
                            containerClass="!w-full"
                            buttonClass="!border-none !bg-transparent"
                          />
                        ) : (
                          <input
                            type={type}
                            name={name}
                            placeholder={placeholder}
                            value={form[name as keyof typeof form]}
                            onChange={handleChange}
                            className="w-full outline-none bg-transparent text-gray-700 text-sm sm:text-base placeholder:text-gray-400"
                          />
                        )}
                      </div>
                      {errors[name] && <p className="text-xs text-red-500 mt-1 ml-1">{errors[name]}</p>}
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-center gap-2 mt-5 sm:mt-6 text-xs text-gray-400 flex-wrap">
                  <FaLock className="w-3 h-3" />
                  <span>Your information is secure and encrypted</span>
                  <FaShieldAlt className="w-3 h-3" />
                </div>
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="relative w-full mt-4 sm:mt-5 py-3 sm:py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100 overflow-hidden group text-sm sm:text-base"
                >
                  <span className={`relative z-10 flex items-center justify-center gap-2 ${loading ? "opacity-0" : "opacity-100"}`}>
                    <FaCreditCard className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    Proceed to Payment
                  </span>
                  {loading && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-indigo-700 transform translate-y-full group-hover:translate-y-0 transition-transform duration-200" />
                </button>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}