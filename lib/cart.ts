"use client";

export const CART_STORAGE_KEY = "coding_cloud_cart";

export interface CartCourse {
  id: number;
  slug: string;
  name: string;
  image?: string;
  duration?: string;
  lecture?: string;
  students?: string;
  price?: number;
  discount_price?: number;
}

const isBrowser = () => typeof window !== "undefined";

export const getCartItems = (): CartCourse[] => {
  if (!isBrowser()) return [];

  try {
    const raw = window.localStorage.getItem(CART_STORAGE_KEY);
    if (!raw) return [];

    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

export const saveCartItems = (items: CartCourse[]) => {
  if (!isBrowser()) return;
  window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  // Dispatch custom event to notify other components (like Navbar)
  window.dispatchEvent(new Event("cart-updated"));
};

export const addCourseToCart = (course: CartCourse) => {
  const current = getCartItems();
  const exists = current.some((item) => item.id === course.id);

  if (exists) {
    return { updatedCart: current, added: false, alreadyInCart: true };
  }

  // 🔥 RESTRICT TO 1 COURSE
  if (current.length >= 1) {
    return { updatedCart: current, added: false, limitReached: true };
  }

  const updatedCart = [...current, course];
  saveCartItems(updatedCart);
  return { updatedCart, added: true };
};

export const removeCourseFromCart = (courseId: number) => {
  const updatedCart = getCartItems().filter((item) => item.id !== courseId);
  saveCartItems(updatedCart);
  return updatedCart;
};
