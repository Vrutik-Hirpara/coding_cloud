

// // src/lib/api.ts

// // 🔥 Base URL (backend)
// export const BASE_URL = "https://codingcloud.pythonanywhere.com";

// // 🔥 All API endpoints
// export const API = {
//   CATEGORY: {
//     LIST: `${BASE_URL}/category/`,
//     DETAIL: (id: number | string) => `${BASE_URL}/category/${id}/`,
//     DETAIL_BY_SLUG: (slug: string) => `${BASE_URL}/course/category/${slug}/`,
//     TOTALS: `${BASE_URL}/category_totals/`,
//   },

//   COURSES: {
//     LIST: `${BASE_URL}/course/`,
//     DETAIL: (id: number | string) => `${BASE_URL}/course/${id}/`,
//   },

//   FAQS: {
//     LIST: `${BASE_URL}/faqs/`,
//     DETAIL: (id: number | string) => `${BASE_URL}/faqs/${id}/`,
//   },

//   MODULES: {
//     LIST: `${BASE_URL}/modules/`,
//     DETAIL: (id: number | string) => `${BASE_URL}/modules/${id}/`,
//   },

//   TOPICS: {
//     LIST: `${BASE_URL}/topics/`,
//     DETAIL: (id: number | string) => `${BASE_URL}/topics/${id}/`,
//   },

//   BANNERS: {
//     LIST: `${BASE_URL}/banners/`,
//     DETAIL: (id: number | string) => `${BASE_URL}/banners/${id}/`,
//   },

//   TESTIMONIALS: {
//     LIST: `${BASE_URL}/testimonials/`,
//     DETAIL: (id: number | string) => `${BASE_URL}/testimonials/${id}/`,
//   },

//   REGISTER_MSG: {
//     LIST: `${BASE_URL}/register_msg/`,
//     DELETE: (id: number | string) => `${BASE_URL}/register_msg/${id}/`,
//   },

//   ARTICLES: {
//     LIST: `${BASE_URL}/articles/`,
//     DETAIL: (id: number | string) => `${BASE_URL}/articles/${id}/`,
//   },

//   BLOGS: {
//     LIST: `${BASE_URL}/blogs/`,
//     DETAIL: (slug: string) => `${BASE_URL}/blogs/${slug}/`,
//   },
// };

// src/lib/api.ts

// // 🔥 Base URL (backend)
// export const BASE_URL = "https://codingcloud.pythonanywhere.com";

// // 🔥 All API endpoints
// export const API = {
//   CATEGORY: {
//     LIST: `${BASE_URL}/category/`,
//     DETAIL: (id: number | string) => `${BASE_URL}/category/${id}/`,
//     DETAIL_BY_SLUG: (slug: string) => `${BASE_URL}/course/category/${slug}/`,
//     TOTALS: `${BASE_URL}/category_totals/`,
//   },

//   COURSES: {
//     LIST: `${BASE_URL}/course/`,
//     DETAIL: (id: number | string) => `${BASE_URL}/course/${id}/`,
//   },

//   FAQS: {
//     LIST: `${BASE_URL}/faqs/`,
//     DETAIL: (id: number | string) => `${BASE_URL}/faqs/${id}/`,
//   },

//   MODULES: {
//     LIST: `${BASE_URL}/modules/`,
//     DETAIL: (id: number | string) => `${BASE_URL}/modules/${id}/`,
//   },

//   TOPICS: {
//     LIST: `${BASE_URL}/topics/`,
//     DETAIL: (id: number | string) => `${BASE_URL}/topics/${id}/`,
//   },

//   BANNERS: {
//     LIST: `${BASE_URL}/banners/`,
//     DETAIL: (id: number | string) => `${BASE_URL}/banners/${id}/`,
//   },

//   TESTIMONIALS: {
//     LIST: `${BASE_URL}/testimonials/`,
//     DETAIL: (id: number | string) => `${BASE_URL}/testimonials/${id}/`,
//   },

//   REGISTER_MSG: {
//     LIST: `${BASE_URL}/register_msg/`,
//     DELETE: (id: number | string) => `${BASE_URL}/register_msg/${id}/`,
//   },

//   ARTICLES: {
//     LIST: `${BASE_URL}/articles/`,
//     DETAIL: (id: number | string) => `${BASE_URL}/articles/${id}/`,
//   },

//   BLOGS: {
//     LIST: `${BASE_URL}/blogs/`,
//     DETAIL: (slug: string) => `${BASE_URL}/blogs/${slug}/`,
//   },
// };

// // 🔥 Fetch functions with types
// export const apiService = {
//   // Categories
//   getCategories: async () => {
//     const res = await fetch(API.CATEGORY.LIST);
//     return res.json();
//   },

//   getCategoryById: async (id: number | string) => {
//     const res = await fetch(API.CATEGORY.DETAIL(id));
//     return res.json();
//   },

//   getCategoryBySlug: async (slug: string) => {
//     const res = await fetch(API.CATEGORY.DETAIL_BY_SLUG(slug));
//     return res.json();
//   },

//   getCategoryTotals: async () => {
//     const res = await fetch(API.CATEGORY.TOTALS);
//     return res.json();
//   },

//   // Courses
//   getCourses: async () => {
//     const res = await fetch(API.COURSES.LIST);
//     return res.json();
//   },

//   getCourseById: async (id: number | string) => {
//     const res = await fetch(API.COURSES.DETAIL(id));
//     return res.json();
//   },

//   // FAQs
//   getFaqs: async () => {
//     const res = await fetch(API.FAQS.LIST);
//     return res.json();
//   },

//   getFaqById: async (id: number | string) => {
//     const res = await fetch(API.FAQS.DETAIL(id));
//     return res.json();
//   },

//   // Modules
//   getModules: async () => {
//     const res = await fetch(API.MODULES.LIST);
//     return res.json();
//   },

//   getModuleById: async (id: number | string) => {
//     const res = await fetch(API.MODULES.DETAIL(id));
//     return res.json();
//   },

//   // Topics
//   getTopics: async () => {
//     const res = await fetch(API.TOPICS.LIST);
//     return res.json();
//   },

//   getTopicById: async (id: number | string) => {
//     const res = await fetch(API.TOPICS.DETAIL(id));
//     return res.json();
//   },

//   // Banners
//   getBanners: async () => {
//     const res = await fetch(API.BANNERS.LIST);
//     return res.json();
//   },

//   getBannerById: async (id: number | string) => {
//     const res = await fetch(API.BANNERS.DETAIL(id));
//     return res.json();
//   },

//   // Testimonials
//   getTestimonials: async () => {
//     const res = await fetch(API.TESTIMONIALS.LIST);
//     return res.json();
//   },

//   getTestimonialById: async (id: number | string) => {
//     const res = await fetch(API.TESTIMONIALS.DETAIL(id));
//     return res.json();
//   },

//   // Register Messages
//   getRegisterMessages: async () => {
//     const res = await fetch(API.REGISTER_MSG.LIST);
//     return res.json();
//   },

//   deleteRegisterMessage: async (id: number | string) => {
//     const res = await fetch(API.REGISTER_MSG.DELETE(id), {
//       method: 'DELETE',
//     });
//     return res.json();
//   },

//   // Articles
//   getArticles: async () => {
//     const res = await fetch(API.ARTICLES.LIST);
//     return res.json();
//   },

//   getArticleById: async (id: number | string) => {
//     const res = await fetch(API.ARTICLES.DETAIL(id));
//     return res.json();
//   },

//   // Blogs
//   getBlogs: async (status?: string) => {
//     const url = status ? `${API.BLOGS.LIST}?status=${status}` : API.BLOGS.LIST;
//     const res = await fetch(url, { cache: "no-store" });
//     return res.json();
//   },

//   getBlogBySlug: async (slug: string) => {
//     const res = await fetch(API.BLOGS.DETAIL(slug), { cache: "no-store" });
//     return res.json();
//   },
// };

// src/lib/api.ts

// 🔥 Base URL (backend)
// export const BASE_URL = "https://codingcloud.pythonanywhere.com";
// export const BASE_URL = "https://codingcloudapi.codingcloud.co.in";
export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;// 🔥 All API endpoints
export const API = {
  CATEGORY: {
    LIST: `${BASE_URL}/category/`,
    DETAIL: (id: number | string) => `${BASE_URL}/category/${id}/`,
    DETAIL_BY_SLUG: (slug: string) => `${BASE_URL}/course/category/${slug}/`,
    TOTALS: `${BASE_URL}/category_totals/`,
  },

  COURSES: {
    LIST: `${BASE_URL}/course/sequence`,
    DETAIL: (id: number | string) => `${BASE_URL}/course/${id}/`,
    KIDS_COURSES: `${BASE_URL}/course/?kids_course=true`,
    NON_KIDS_COURSES: `${BASE_URL}/course/?kids_course=false`, // 👈 add this

    FEATURED_COURSES: `${BASE_URL}/course/?featured=true`, // 👈 new


  },
  COURSE_RATINGS: {
    AVERAGE: (courseId: number | string) => `${BASE_URL}/course_average_rating/?course_id=${courseId}`,
    SUBMIT: `${BASE_URL}/course_wise_rating/`,
    LIST: (courseId: number | string) =>
      `${BASE_URL}/course_wise_rating/?course_id=${courseId}`,
  },

  FAQS: {
    LIST: `${BASE_URL}/faqs/`,
    DETAIL: (id: number | string) => `${BASE_URL}/faqs/${id}/`,
  },

  MODULES: {
    LIST: `${BASE_URL}/modules/`,
    DETAIL: (id: number | string) => `${BASE_URL}/modules/${id}/`,
  },

  TOPICS: {
    LIST: `${BASE_URL}/topics/`,
    DETAIL: (id: number | string) => `${BASE_URL}/topics/${id}/`,
  },
  TAGS: {
    LIST: `${BASE_URL}/tags/`,
    DETAIL: (id: number | string) => `${BASE_URL}/tags/${id}/`,
  },
  BANNERS: {
    LIST: `${BASE_URL}/banners/`,
    DETAIL: (id: number | string) => `${BASE_URL}/banners/${id}/`,
  },

  TESTIMONIALS: {
    LIST: `${BASE_URL}/testimonials/`,
    DETAIL: (id: number | string) => `${BASE_URL}/testimonials/${id}/`,
  },

  REGISTER_MSG: {
    LIST: `${BASE_URL}/register_msg/`,
    DELETE: (id: number | string) => `${BASE_URL}/register_msg/${id}/`,
  },

  ARTICLES: {
    LIST: `${BASE_URL}/articles/`,
    DETAIL: (id: number | string) => `${BASE_URL}/articles/${id}/`,
  },

  BLOGS: {
    LIST: `${BASE_URL}/blogs/`,
    DETAIL: (slug: string) => `${BASE_URL}/blogs/${slug}/`,
  },

  CONTACT: {
    CREATE: `${BASE_URL}/contacts/`,
  },
  ENROLL: {
    CREATE: `${BASE_URL}/enroll/`,
  },
  PAYMENT: {
    CREATE: `${BASE_URL}/create_payment/`,
    VERIFY: `${BASE_URL}/verify_payment/`,
    HISTORY: `${BASE_URL}/payment_history/`,
  },
};

// 🔥 Fetch functions with types
export const apiService = {
  // Categories
  getCategories: async () => {
    const res = await fetch(API.CATEGORY.LIST);
    return res.json();
  },

  getCategoryById: async (id: number | string) => {
    const res = await fetch(API.CATEGORY.DETAIL(id));
    return res.json();
  },

  getCategoryBySlug: async (slug: string) => {
    const res = await fetch(API.CATEGORY.DETAIL_BY_SLUG(slug));
    return res.json();
  },

  getCategoryTotals: async () => {
    const res = await fetch(API.CATEGORY.TOTALS);
    return res.json();
  },

  // Category with courses
  getCategoryWithCourses: async (slug: string) => {
    const res = await fetch(`${API.CATEGORY.DETAIL_BY_SLUG(slug)}?include_courses=true`);
    return res.json();
  },

  getAllCategoriesWithCounts: async () => {
    const res = await fetch(API.CATEGORY.TOTALS);
    return res.json();
  },

  // Courses
  getCourses: async () => {
    const res = await fetch(API.COURSES.LIST);
    return res.json();
  },
  getCourseReviews: async (courseId: number | string) => {
    const res = await fetch(API.COURSE_RATINGS.LIST(courseId));
    return res.json();
  },
  getCourseById: async (id: number | string) => {
    const res = await fetch(API.COURSES.DETAIL(id));
    return res.json();
  },

  getCoursesByCategory: async (categoryId: number | string) => {
    const res = await fetch(`${API.COURSES.LIST}?category=${categoryId}`);
    return res.json();
  },

  // FAQs
  getFaqs: async () => {
    const res = await fetch(API.FAQS.LIST);
    return res.json();
  },
  getCourseBySlug: async (slug: string) => {
    const res = await fetch(`${API.COURSES.LIST}?slug=${slug}`);
    return res.json();
  },
  getFaqById: async (id: number | string) => {
    const res = await fetch(API.FAQS.DETAIL(id));
    return res.json();
  },
  submitRegisterMessage: async (formData: any) => {
    return fetch(`${BASE_URL}/register_msg/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
  },

  // Modules
  getModules: async () => {
    const res = await fetch(API.MODULES.LIST);
    return res.json();
  },

  getModuleById: async (id: number | string) => {
    const res = await fetch(API.MODULES.DETAIL(id));
    return res.json();
  },

  getModulesByCourse: async (courseId: number | string) => {
    const res = await fetch(`${API.MODULES.LIST}?course_id=${courseId}`);
    return res.json();
  },

  // Topics
  getTopics: async () => {
    const res = await fetch(API.TOPICS.LIST);
    return res.json();
  },

  getTopicById: async (id: number | string) => {
    const res = await fetch(API.TOPICS.DETAIL(id));
    return res.json();
  },

  getTopicsByModule: async (moduleId: number | string) => {
    const res = await fetch(`${API.TOPICS.LIST}?module=${moduleId}`);
    return res.json();
  },

  // Banners
  getBanners: async () => {
    const res = await fetch(API.BANNERS.LIST);
    return res.json();
  },

  getBannerById: async (id: number | string) => {
    const res = await fetch(API.BANNERS.DETAIL(id));
    return res.json();
  },

  getActiveBanners: async () => {
    const res = await fetch(`${API.BANNERS.LIST}?is_active=true`);
    return res.json();
  },

  // Testimonials
  getTestimonials: async () => {
    const res = await fetch(API.TESTIMONIALS.LIST);
    return res.json();
  },

  getTestimonialById: async (id: number | string) => {
    const res = await fetch(API.TESTIMONIALS.DETAIL(id));
    return res.json();
  },

  getApprovedTestimonials: async () => {
    const res = await fetch(`${API.TESTIMONIALS.LIST}?status=approved`);
    return res.json();
  },

  // Register Messages
  getRegisterMessages: async () => {
    const res = await fetch(API.REGISTER_MSG.LIST);
    return res.json();
  },

  deleteRegisterMessage: async (id: number | string) => {
    const res = await fetch(API.REGISTER_MSG.DELETE(id), {
      method: 'DELETE',
    });
    return res.json();
  },

  // Articles
  getArticles: async () => {
    const res = await fetch(API.ARTICLES.LIST);
    return res.json();
  },

  getArticleById: async (id: number | string) => {
    const res = await fetch(API.ARTICLES.DETAIL(id));
    return res.json();
  },

  // Blogs
  getBlogs: async (status?: string) => {
    const url = status ? `${API.BLOGS.LIST}?status=${status}` : API.BLOGS.LIST;
    const res = await fetch(url, { cache: "no-store" });
    return res.json();
  },

  getBlogBySlug: async (slug: string) => {
    const res = await fetch(API.BLOGS.DETAIL(slug), { cache: "no-store" });
    return res.json();
  },
  // Add to apiService object
  getCourseAverageRating: async (courseId: number | string) => {
    const res = await fetch(API.COURSE_RATINGS.AVERAGE(courseId));
    return res.json();
  },
  // getCoursesWithRatings: async () => {
  //   try {
  //     const [courseRes, ratingRes] = await Promise.all([
  //       fetch(API.COURSES.LIST),
  //       fetch(`${BASE_URL}/course_average_rating/`)
  //     ]);

  //     const courseData = await courseRes.json();
  //     const ratingData = await ratingRes.json();

  //     // rating map
  //     const ratingMap: Record<number, { rating: number; reviews: number }> = {};

  //     ratingData.course_average_rating.forEach((item: any) => {
  //       ratingMap[item.course_id] = {
  //         rating: item.average_rating,
  //         reviews: item.total_reviews,
  //       };
  //     });

  //     const mergedCourses = courseData.data.map((course: any) => ({
  //       ...course,
  //       rating: ratingMap[course.id]?.rating || 0,
  //       reviews: ratingMap[course.id]?.reviews || 0,
  //     }));

  //     return mergedCourses;

  //   } catch (error) {
  //     console.error("Course API error:", error);
  //     return [];
  //   }
  // },
  getCoursesWithRatings: async () => {
    try {
      const [courseData, ratingData] = await Promise.all([
        apiService.getCourses(),
        fetch(`${BASE_URL}/course_average_rating/`).then(res => res.json())
      ]);

      const courses = courseData.data || courseData;

      // rating map
      const ratingMap: Record<number, { rating: number; reviews: number }> = {};

      ratingData.course_average_rating.forEach((item: any) => {
        ratingMap[item.course_id] = {
          rating: item.average_rating,
          reviews: item.total_reviews,
        };
      });

      const mergedCourses = courses.map((course: any) => ({
        ...course,
        rating: ratingMap[course.id]?.rating || 0,
        reviews: ratingMap[course.id]?.reviews || 0,
      }));

      return mergedCourses;

    } catch (error) {
      console.error("Course API error:", error);
      return [];
    }
  },
  getPublishedBlogs: async () => {
    const res = await fetch(`${API.BLOGS.LIST}?status=published`, {
      cache: "no-store",
    });
    const data = await res.json();
    return data.data || [];
  },
  getMultipleCourseRatings: async (courseIds: (number | string)[]) => {
    const promises = courseIds.map(async (courseId) => {
      try {
        const data = await apiService.getCourseAverageRating(courseId);
        const rating = data.course_average_rating?.[0];
        return { courseId, rating };
      } catch (err) {
        console.error("Rating error", err);
        return { courseId, rating: null };
      }
    });

    const results = await Promise.all(promises);
    const ratingMap: Record<number, any> = {};
    results.forEach(({ courseId, rating }) => {
      if (rating) {
        ratingMap[Number(courseId)] = rating;
      }
    });
    return ratingMap;
  },
  submitCourseRating: async (formData: FormData) => {
    const res = await fetch(API.COURSE_RATINGS.SUBMIT, {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    if (!res.ok) {
      throw data;
    }

    return data;
  },
  // Contact
  submitContact: async (data: {
    full_name: string;
    email: string;
    mobile_no: string;
    subject: string;
    message: string;
  }) => {
    const res = await fetch(API.CONTACT.CREATE, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const responseData = await res.json();

    if (!res.ok) {
      throw { status: res.status, data: responseData };
    }

    return responseData;
  },
  submitEnrollment: async (payload: any) => {
    const res = await fetch(API.ENROLL.CREATE, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (!res.ok) {
      throw data;
    }

    return data;
  },
  createPayment: async (payload: { name: string; email: string; course_id: string }) => {
    const res = await fetch(API.PAYMENT.CREATE, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    if (!res.ok) throw data;
    return data;
  },
  verifyPayment: async (payload: { payment_id: number, razorpay_payment_id: string,razorpay_order_id:string,razorpay_signature:string }) => {
    const res = await fetch(API.PAYMENT.VERIFY, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    if (!res.ok) throw data;
    return data;
  },
};

// 🔥 Category specific service (optional - for better organization)
export const categoryService = {
  getAll: async () => {
    const data = await apiService.getCategories();
    return data.data || data;
  },

  getById: async (id: number | string) => {
    const data = await apiService.getCategoryById(id);
    return data.data || data;
  },

  getBySlug: async (slug: string) => {
    const data = await apiService.getCategoryBySlug(slug);
    return data.data || data;
  },

  getWithCourses: async (slug: string) => {
    const data = await apiService.getCategoryWithCourses(slug);
    return data.data || data;
  },

  getTotals: async () => {
    const data = await apiService.getCategoryTotals();
    return data.data || data;
  },
};



