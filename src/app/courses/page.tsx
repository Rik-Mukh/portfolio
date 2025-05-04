'use client';
import Course from "@/components/course";
import coursesData from "@/data/courses.json";

// TODO: Replace with my actual courses
export default function Courses() {
  return (
    <div className="mb-8 px-2 sm:px-4 md:px-6 lg:px-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-5 md:gap-6 auto-rows-fr">
        {coursesData.map(({ code, title, description, details }) => (
          <Course key={code} data={[code, title, description, details]} />
        ))}
      </div>
    </div>
  );
}
