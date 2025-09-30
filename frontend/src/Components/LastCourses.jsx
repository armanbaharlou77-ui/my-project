import React, { useEffect, useState } from 'react'
import SectionHeader from './SectionHeader'
import CourseBox from './CourseBox'

export default function LastCourses() {

  const [courses, setCourses] = useState([])
  console.log(courses);


  useEffect(() => {
    fetch('http://localhost:4000/v1/courses')
      .then(res => res.json())
      .then(allcourses => setCourses(allcourses))
  }, [])

  return (
    <div className="my-16">
      <div className="container mx-auto px-4">
        <SectionHeader title='جدیدترین دوره ها' desc='سکوی پرتاپ شما به سمت موفقیت' btnTitle='تمامی دوره ها' btnHref={'courses/1'} />
        <div className="courses-content">
          <div className="container">
            <div className="flex flex-row flex-wrap">

              {courses.splice(0, 6).map((course) => (
                <CourseBox {...course} />
              ))}

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
