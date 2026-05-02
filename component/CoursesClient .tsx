
"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import CourseCard, { CourseCardSkeleton } from "@/component/ui/CourseCard";
import { API, apiService, BASE_URL } from "@/lib/api";
import { useSearchParams } from "next/navigation";
import FeaturedCoursesSection from "@/component/FeaturedCoursesSection";
// import KidsCoursesSection from "@/component/KidsCoursesSection";


interface Course {
  id: number;
  slug: string;
  name: string;
  banner_img?: string;
  description?: string;
  duration?: string;
  lecture?: string;
  students?: string;
  short_description?: string;
  category_details?: {
    name: string;
  };
  category?: {
    name?: string;
  } | string;
  category_name?: string;
  categories?: Array<{
    name?: string;
  }>;
}

export default function CoursesPage() {
  const searchParams = useSearchParams();
  const type = searchParams.get("type");
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [ratings, setRatings] = useState<Record<number, any>>({});
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [categories, setCategories] = useState<any[]>([]);
  const [kidsCourses, setKidsCourses] = useState<Course[]>([]);


  useEffect(() => {
    const getCourses = async () => {
      try {
        setLoading(true);
        setError(null);

        let endpoint = API.COURSES.NON_KIDS_COURSES;
        if (type === "featured") {
          endpoint = API.COURSES.FEATURED_COURSES;
        } else if (type === "kids") {
          endpoint = API.COURSES.KIDS_COURSES;
        }

        // Fetch categories
        const catRes = await apiService.getCategories();
        const catData = catRes.data || catRes || [];
        setCategories(Array.isArray(catData) ? catData : []);

        // Fetch kids courses separately if type is null
        if (!type) {
          const kidsRes = await fetch(API.COURSES.KIDS_COURSES, {
            cache: "no-store",
            headers: { 'Content-Type': 'application/json' }
          });
          if (kidsRes.ok) {
            const kidsJson = await kidsRes.json();
            let kidsArray: Course[] = [];
            if (Array.isArray(kidsJson)) kidsArray = kidsJson;
            else if (kidsJson.data && Array.isArray(kidsJson.data)) kidsArray = kidsJson.data;
            setKidsCourses(kidsArray);
            if (kidsArray.length > 0) fetchRatings(kidsArray);
          }
        }

        const res = await fetch(endpoint, {
          cache: "no-store",
          headers: {
            'Content-Type': 'application/json',
          }
        });


        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();
        console.log("API Response:", data);

        // Handle different possible response structures
        let coursesArray: Course[] = [];

        if (Array.isArray(data)) {
          coursesArray = data;
        } else if (data.data && Array.isArray(data.data)) {
          coursesArray = data.data;
        } else if (data.results && Array.isArray(data.results)) {
          coursesArray = data.results;
        } else if (data.courses && Array.isArray(data.courses)) {
          coursesArray = data.courses;
        } else if (data && typeof data === 'object') {
          const possibleArray = Object.values(data).find(val => Array.isArray(val));
          if (possibleArray) {
            coursesArray = possibleArray as Course[];
          }
        }

        setCourses(coursesArray);

        // Fetch ratings for all courses
        if (coursesArray.length > 0) {
          fetchRatings(coursesArray);
        }

        if (coursesArray.length === 0) {
          console.warn("No courses found in response");
        }

      } catch (err) {
        console.error("Error fetching courses:", err);
        setError(err instanceof Error ? err.message : "Failed to load courses");
        setCourses([]);
      } finally {
        setLoading(false);
      }
    };

    getCourses();
  }, [type]);


  // Fetch ratings for courses
  const fetchRatings = async (courseList: Course[]) => {
    const ratingData: Record<number, any> = {};

    await Promise.all(
      courseList.map(async (course) => {
        try {
          const json = await apiService.getCourseAverageRating(course.id);
          const data = json.course_average_rating?.[0];
          if (data) {
            ratingData[course.id] = data;
          }
        } catch (err) {
          console.error("Rating error", err);
        }
      })
    );

    setRatings(ratingData);
  };

  // Loading State
  if (loading) {
    return (
      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        {!type && (
          <>
            {/* <FeaturedCoursesSection /> */}
            {/* <KidsCoursesSection /> */}
          </>
        )}
        <h1 className="text-3xl sm:text-4xl font-bold mb-8 sm:mb-10 text-center text-[var(--color-text-strong)] mt-12">
          {type === "kids" ? "Kids Courses" : type === "featured" ? "Featured Courses" : "All Courses"}
        </h1>

        <div className="flex flex-wrap justify-center gap-4 mx-auto w-full">
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <CourseCardSkeleton key={n} />
          ))}
        </div>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        {!type && (
          <>
            {/* <FeaturedCoursesSection /> */}
            {/* <KidsCoursesSection /> */}
          </>
        )}
        <h1 className="text-3xl sm:text-4xl font-bold mb-8 text-center text-[var(--color-text-strong)] mt-12">
          {type === "kids" ? "Kids Courses" : type === "featured" ? "Featured Courses" : "All Courses"}
        </h1>

        <div className="text-center py-12">
          <p className="text-[var(--color-danger)] mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-[var(--color-accent-purple)] text-[var(--color-white)] px-6 py-2 rounded-full hover:opacity-90 transition"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Empty State
  if (!courses || courses.length === 0) {
    return (
      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        {!type && (
          <>
            {/* <FeaturedCoursesSection /> */}
            <h1 className="text-3xl sm:text-4xl font-bold mb-8 text-center text-[var(--color-text-strong)] mt-12">
              Kids Courses
            </h1>
            <div className="flex flex-wrap justify-center gap-4 mx-auto w-full mb-12">
              {kidsCourses.length > 0 ? kidsCourses.map((course, index) => {
                const rating = ratings[course.id]?.average_rating || 0;
                const reviews = ratings[course.id]?.total_reviews || 0;
                return (
                  <CourseCard
                    key={course.id}
                    course={course}
                    rating={rating}
                    reviews={reviews}
                    imageBaseUrl={BASE_URL}
                    index={index}
                    showCategory={true}
                    showRating={true}
                    showStats={true}
                    showDuration={true}
                    showDescription={true}
                  />
                );
              }) : (
                <p className="text-[var(--color-muted)] text-lg">No kids courses available at the moment.</p>
              )}
            </div>
          </>
        )}
        <h1 className="text-3xl sm:text-4xl font-bold mb-8 text-center text-[var(--color-text-strong)] mt-12">
          {type === "kids" ? "Kids Courses" : type === "featured" ? "Featured Courses" : "All Courses"}
        </h1>

        <div className="text-center py-12">
          <p className="text-[var(--color-muted)] text-lg">No courses available at the moment.</p>
        </div>
      </div>
    );
  }

  // Success State with Courses
  return (
    <div className="mx-auto px-4 sm:px-6 lg:px-8 pb-12 sm:pb-16 lg:pb-20 pt-8 sm:pt-4 lg:pt-4">


      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl sm:text-4xl font-bold mb-8 sm:mb-10 text-center text-[var(--color-text-strong)] mt-12"
      >
        {type === "kids" ? "Kids Courses" : type === "featured" ? "Featured Courses" : "All Courses"}
      </motion.h1>

      {/* CATEGORY TABS — only for non-kids pages */}
      {type !== "kids" && (
        <div className="flex flex-wrap justify-center gap-3 mb-10 px-4">
          <button
            onClick={() => setSelectedCategory("All")}
            className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${selectedCategory === "All"
              ? "bg-[var(--color-accent-purple)] text-white shadow-md"
              : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
              }`}
          >
            All
          </button>
          {categories.filter(cat => cat.name !== "Junior Kids Special").map(cat => (
            <button
              key={cat.id || cat.name}
              onClick={() => setSelectedCategory(cat.name)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${selectedCategory === cat.name
                ? "bg-[var(--color-accent-purple)] text-white shadow-md"
                : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
                }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      )}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex flex-wrap justify-center gap-4 mx-auto w-full"
      >
        {/* {(selectedCategory === "All" ? courses : courses.filter(c => c.category_details?.name === selectedCategory)).map((course, index) => {
          const rating = ratings[course.id]?.average_rating || 0;
          const reviews = ratings[course.id]?.total_reviews || 0;

          return (
            <CourseCard
              key={course.id}
              course={course}
              rating={rating}
              reviews={reviews}
              imageBaseUrl={BASE_URL}
              index={index}
              showCategory={true}
              showRating={true}
              showStats={true}
              showDuration={true}
              showDescription={true}
            />
          );
        })} */}
        {(selectedCategory === "All"
          ? courses
          : courses.filter(course => {
            // Try to get category name from multiple possible locations
            let courseCategoryName = null;

            if (course.category_details?.name) {
              courseCategoryName = course.category_details.name;
            } else if (typeof course.category === "object" && course.category?.name) {
              courseCategoryName = course.category.name;
            } else if (course.category_name) {
              courseCategoryName = course.category_name;
            } else if (course.categories && course.categories[0]?.name) {
              courseCategoryName = course.categories[0].name;
            } else if (course.category) {
              // If category is a string directly
              courseCategoryName = typeof course.category === 'string' ? course.category : null;
            }

            return courseCategoryName === selectedCategory;
          })
        ).map((course, index) => {
          const rating = ratings[course.id]?.average_rating || 0;
          const reviews = ratings[course.id]?.total_reviews || 0;

          return (
            <CourseCard
              key={course.id}
              course={course}
              rating={rating}
              reviews={reviews}
              imageBaseUrl={BASE_URL}
              index={index}
              showCategory={true}
              showRating={true}
              showStats={true}
              showDuration={true}
              showDescription={true}
            />
          );
        })}
      </motion.div>
      {!type && (
        <>
          {/* <FeaturedCoursesSection /> */}
          <h1 className="text-3xl sm:text-4xl font-bold mb-8 text-center text-[var(--color-text-strong)] mt-12">
            Kids Courses
          </h1>
          <div className="flex flex-wrap justify-center gap-4 mx-auto w-full mb-12">
            {kidsCourses.length > 0 ? kidsCourses.map((course, index) => {
              const rating = ratings[course.id]?.average_rating || 0;
              const reviews = ratings[course.id]?.total_reviews || 0;
              return (
                <CourseCard
                  key={course.id}
                  course={course}
                  rating={rating}
                  reviews={reviews}
                  imageBaseUrl={BASE_URL}
                  index={index}
                  showCategory={true}
                  showRating={true}
                  showStats={true}
                  showDuration={true}
                  showDescription={true}
                />
              );
            }) : (
              <p className="text-[var(--color-muted)] text-lg">No kids courses available at the moment.</p>
            )}
          </div>
        </>
      )}
    </div>
  );
}