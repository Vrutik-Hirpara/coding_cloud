"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Script from "next/script";
import { apiService, BASE_URL } from "@/lib/api";
import { CartCourse, getCartItems, removeCourseFromCart } from "@/lib/cart";
import { motion, AnimatePresence } from "framer-motion";
import { FaTrash, FaShoppingCart, FaArrowRight, FaLock, FaBookOpen } from "react-icons/fa";
import Swal from "sweetalert2";
import BuyCourseModal from "@/component/BuyCourseModal";

// Constants
const RAZORPAY_KEY_ID = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "";

const getImageUrl = (image?: string) => {
  if (!image) return null;
  if (image.startsWith("http://") || image.startsWith("https://")) return image;
  const cleanPath = image.startsWith("/") ? image.slice(1) : image;
  return `${BASE_URL}/${cleanPath}`;
};

const formatPrice = (p: number) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(p);
};

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartCourse[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isEnrollOpen, setIsEnrollOpen] = useState(false);

  useEffect(() => {
    setCartItems(getCartItems());
    setIsLoaded(true);
  }, []);

  const { subtotal, totalDiscount, finalTotal } = useMemo(() => {
    let actualSubtotal = 0;
    let actualDiscount = 0;

    cartItems.forEach(item => {
      let p = Number(item.price) || 0;
      let dp = Number(item.discount_price) || 0;

      // Ensure we always have a base subtotal
      if (dp > 0 && p > 0) {
        // Case where both are present (likely original vs discounted)
        actualSubtotal += Math.max(p, dp);
        actualDiscount += Math.max(0, Math.max(p, dp) - dp);
      } else if (dp > 0) {
        actualSubtotal += dp;
      } else {
        actualSubtotal += p;
      }
    });

    const final = actualSubtotal - actualDiscount;

    return {
      subtotal: actualSubtotal,
      totalDiscount: actualDiscount,
      finalTotal: final
    };
  }, [cartItems]);

  const handleRemove = (courseId: number) => {
    const updated = removeCourseFromCart(courseId);
    setCartItems(updated);
  };

  const handleProceedToPayment = () => {
    if (finalTotal <= 0 && cartItems.length > 0) {
      // alert("Free courses can be enrolled directly from the course page.");
      return;
    }
    setIsEnrollOpen(true);
  };

  const handleEnrollSuccess = async (formData: any) => {
    setIsEnrollOpen(false);
    setIsProcessing(true);

    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        mobile: Number(formData.mobile),
        address: formData.address,
        course_id: JSON.stringify(cartItems)
      };

      // console.log("payload", payload);

      const paymentData = await apiService.createPayment(payload);

      // console.log("paymentData", paymentData);

      if (!paymentData || !paymentData.data) {
        throw new Error("Invalid payment response");
      }

      const data = paymentData.data;


      if (data.checkout_order_id) {
        startRazorpay(data, formData);
        return;
      }

      throw new Error("No valid payment method found");

    } catch (error) {
      console.error(error);
      alert("Payment failed");
      setIsProcessing(false);
    }
  };

  const startRazorpay = (paymentData: any, formData: any) => {
    try {
      const options = {
        key: RAZORPAY_KEY_ID,
        amount: finalTotal * 100, // Amount in paise
        currency: "INR",
        name: "Coding Cloud",
        description: "Course Enrollment",
        image: "/logos/logo.png",
        order_id: paymentData.checkout_order_id, // Pass the order_id from backend
        handler: async function (response: any) {
          // console.log("Payment Successful:", response, paymentData);

          try {
            // Verify payment on backend
            // Using paymentData.id as per user's verify_payment api format
            const verifyResult = await apiService.verifyPayment({
              payment_id: paymentData.payment_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature
            });

            // console.log("verifyResult", verifyResult);

            if (verifyResult.success) {
              Swal.fire({
                icon: "success",
                title: "Payment Successful!",
                text: "Your enrollment has been confirmed.",
              });

              localStorage.removeItem("coding_cloud_cart");
              localStorage.removeItem("rzp_checkout_anon_id");
              localStorage.removeItem("rzp_device_id");
              localStorage.removeItem("rzp_stored_checkout_id");

              setCartItems([]);
              window.dispatchEvent(new Event("storage"));

              // redirect AFTER success
              setTimeout(() => {
                window.location.href = "https://codingcloud.co.in/";
              }, 3000);



            } else {
              setTimeout(() => {
                window.location.href = "https://codingcloud.co.in/cart/";
              }, 3000);
            }


            // Trigger storage event for other components
            window.dispatchEvent(new Event("storage"));

          } catch (error) {
            console.error("Verification Error:", error);
            Swal.fire({
              icon: "warning",
              title: "Payment Pending Verification",
              text: "Your payment was successful but we couldn't verify it immediately. We will update your status shortly.",
            });
          } finally {
            setIsProcessing(false);
          }
        },
        prefill: {
          name: `${formData.first_name || ""} ${formData.last_name || ""}`.trim() || formData.name,
          email: formData.email,
          contact: formData.mobile || formData.phone,
        },
        notes: {
          address: "Coding Cloud Institute",
          courses: cartItems.map(c => c.name).join(", "),
          payment_record_id: paymentData.id || "N/A",
        },
        theme: {
          color: "#2563EB",
        },
        modal: {
          ondismiss: function () {
            setIsProcessing(false);
          }
        },
        method: {
    upi: true,
    card: true,
    netbanking: true,
    wallet: true,
  },
  config: {
    display: {
      blocks: {
        upi: {
          name: "Pay via UPI",
          instruments: [
            {
              method: "upi",
              flows: ["collect", "intent"], // 🔥 BOTH
            },
          ],
        },
      },
      sequence: ["block.upi", "block.card", "block.netbanking"],
      preferences: {
        show_default_blocks: false,
      },
    },
  },
      };

      const rzp1 = new (window as any).Razorpay(options);
      rzp1.open();
    } catch (error) {
      console.error("Razorpay Modal Error:", error);
      Swal.fire({
        icon: 'error',
        title: 'Checkout Error',
        text: 'Failed to open payment gateway. Please try again.'
      });
      setIsProcessing(false);
    }
  };

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--color-logo-main)]"></div>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-[var(--color-bg-light)] py-12 md:py-20">
      <Script
        id="razorpay-checkout"
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="lazyOnload"
      />

      {isEnrollOpen && (
        <BuyCourseModal
          isOpen={isEnrollOpen}
          onClose={() => setIsEnrollOpen(false)}
          // courses={cartItems}
          onSuccess={handleEnrollSuccess}
        // mode="enroll"
        />
      )}

      <div className="container-custom">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* LEFT: CART ITEMS */}
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 bg-blue-100 text-blue-600 rounded-2xl">
                <FaShoppingCart size={24} />
              </div>
              <h1 className="text-3xl font-bold text-gray-900">Your Shopping Cart</h1>
            </div>

            {cartItems.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-3xl p-10 text-center shadow-sm border border-gray-100"
              >
                <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-300">
                  <FaShoppingCart size={40} />
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-3">Your cart is empty</h2>
                <p className="text-gray-500 mb-8 max-w-sm mx-auto">
                  Looks like you haven't added any courses to your cart yet. Explore our top-rated courses and start learning today!
                </p>
                <Link
                  href="/courses"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-[var(--color-logo-gradient)] text-white font-bold rounded-2xl hover:shadow-lg transition-all hover:-translate-y-1"
                >
                  Browse All Courses <FaArrowRight />
                </Link>
              </motion.div>
            ) : (
              <div className="flex flex-col gap-5">
                <AnimatePresence mode="popLayout">
                  {cartItems.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="group bg-white rounded-3xl p-4 sm:p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all flex flex-col sm:flex-row gap-5 items-center"
                    >
                      {/* Image */}
                      <div className="w-full sm:w-32 h-32 rounded-2xl bg-gray-50 overflow-hidden flex-shrink-0 relative">
                        {getImageUrl(item.image) ? (
                          <img
                            src={getImageUrl(item.image)!}
                            alt={item.name}
                            className="w-full h-full object-contain p-2"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-400">
                            No Image
                          </div>
                        )}
                      </div>

                      {/* Content */}
                      <div className="flex-1 text-center sm:text-left">
                        <Link
                          href={`/courses/${item.slug}`}
                          className="text-xl font-bold text-gray-900 hover:text-blue-600 transition-colors line-clamp-1"
                        >
                          {item.name}
                        </Link>
                        <div className="mt-2 flex flex-wrap justify-center sm:justify-start gap-4 text-sm text-gray-500">
                          {item.duration && <span>⏱️ {item.duration}</span>}
                          {item.lecture && <span>📘 {item.lecture} Lessons</span>}
                        </div>
                        <div className="mt-4 flex items-center justify-center sm:justify-start gap-3">
                          <span className="text-xl font-bold text-[var(--color-logo-main)]">
                            {formatPrice(Number(item.discount_price) || Number(item.price) || 0)}
                          </span>
                          {/* Updated condition to show strikethrough if prices are different */}
                          {item.discount_price && item.price && Number(item.price) !== Number(item.discount_price) && (
                            <span className="text-sm text-gray-400 line-through">
                              {formatPrice(Number(item.price))}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Action */}
                      <button
                        onClick={() => handleRemove(item.id)}
                        className="p-4 rounded-2xl bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition-all duration-300 group-hover:rotate-3"
                        title="Remove from cart"
                      >
                        <FaTrash size={18} />
                      </button>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </div>

          {/* RIGHT: SUMMARY */}
          {cartItems.length > 0 && (
            <div className="w-full lg:w-[400px]">
              <div className="sticky top-32">
                {/* Price Summary */}
                <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-xl">
                  <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <FaShoppingCart size={20} className="text-blue-600" />
                    Order Summary
                  </h3>

                  {/* List of courses in summary */}
                  <div className="mb-6 space-y-4">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Courses in Cart</p>
                    <div className="max-h-[200px] overflow-y-auto pr-2 custom-scrollbar">
                      {cartItems.map((item) => (
                        <div key={item.id} className="flex justify-between items-center gap-4 py-3 border-b border-gray-50 last:border-0">
                          <div className="flex gap-3 items-center">
                            <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
                              <FaBookOpen className="text-blue-500" size={14} />
                            </div>
                            <span className="text-sm font-medium text-gray-700 line-clamp-2 leading-tight">{item.name}</span>
                          </div>
                          <div className="text-right flex-shrink-0">
                            <div className="text-sm font-bold text-gray-900">
                              {formatPrice(Number(item.discount_price) || Number(item.price) || 0)}
                            </div>
                            {item.discount_price && item.price && Number(item.price) !== Number(item.discount_price) && (
                              <div className="text-[10px] text-gray-400 line-through">
                                {formatPrice(Number(item.price))}
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4 mb-8 pt-6 border-t border-gray-50">
                    <div className="flex justify-between text-gray-600">
                      <span>Subtotal</span>
                      <span className="font-semibold">{formatPrice(subtotal)}</span>
                    </div>
                    {totalDiscount > 0 && (
                      <div className="flex justify-between text-green-600">
                        <span>Discount</span>
                        <span className="font-semibold">-{formatPrice(totalDiscount)}</span>
                      </div>
                    )}
                    {/* <div className="flex justify-between text-gray-600 pb-4 border-b border-gray-100">
                      <span>Tax (Included)</span>
                      <span className="font-semibold">₹0</span>
                    </div> */}
                    <div className="flex justify-between items-center pt-2">
                      <span className="text-lg font-bold text-gray-900">Total Amount</span>
                      <span className="text-3xl font-extrabold text-blue-600">{formatPrice(finalTotal)}</span>
                    </div>
                  </div>

                  <button
                    onClick={handleProceedToPayment}
                    disabled={isProcessing}
                    className="w-full py-5 bg-[var(--color-logo-gradient)] text-white bg-blue-500 font-bold rounded-2xl shadow-lg hover:shadow-2xl transition-all hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-3 disabled:opacity-70 disabled:pointer-events-none"
                  >
                    {isProcessing ? (
                      <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    ) : (
                      <>
                        <FaLock size={16} />
                        Proceed to Payment
                      </>
                    )}
                  </button>

                  <p className="mt-4 text-center text-xs text-gray-400 flex items-center justify-center gap-1">
                    <FaLock size={10} /> Secure SSL Encrypted Checkout
                  </p>
                </div>


              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
