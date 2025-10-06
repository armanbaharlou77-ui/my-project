import React, { useEffect, useState } from 'react'
import DataTable from './DataTable'

export default function Courses() {
  const [courses, setCourses] = useState([])

  useEffect(() => {
    const localStorageData = localStorage.getItem('user')
    fetch('http://localhost:4000/v1/courses', {
      headers: {
        'Authorization': `Bearer ${localStorageData.token}`
      }
    }).then(res => res.json())
      .then(allCourses => {
        setCourses(allCourses)
        console.log(allCourses);

      })
  } ,[])
  return (
    <div>
      <DataTable title={'دوره ها'}>
        <table className=" border border-gray-200 rounded-md overflow-hidden w-full" >
          <thead className="bg-gray-1">
            <tr>
              <th className="px-4 py-4 text-center text-[1.1rem] font-lalezar text-gray-600">شناسه</th>
              <th className="px-4 py-4 text-center text-[1.1rem] font-lalezar text-gray-600">عنوان</th>
              <th className="px-4 py-4 text-center text-[1.1rem] font-lalezar text-gray-600">مبلغ</th>
              <th className="px-4 py-4 text-center text-[1.1rem] font-lalezar text-gray-600">وضعیت</th>
              <th className="px-4 py-4 text-center text-[1.1rem] font-lalezar text-gray-600">لینک</th>
              <th className="px-4 py-4 text-center text-[1.1rem] font-lalezar text-gray-600">مدرس</th>
              <th className="px-4 py-4 text-center text-[1.1rem] font-lalezar text-gray-600">دسته بندی</th>
              <th className="px-4 py-4 text-center text-[1.1rem] font-lalezar text-gray-600">ویرایش</th>
              <th className="px-4 py-4 text-center text-[1.1rem] font-lalezar text-gray-600">حذف</th>
            </tr>
          </thead>
          <tbody>
            {
              courses.map((course, index) => (
                <tr className="border-t" key={course._id}>
                  <td className="px-4 py-4 text-center text-[1.1rem]">{index + 1}</td>
                  <td className="px-4 py-4 text-center text-[1.1rem]">{course.name}</td>

                  <td className="px-4 py-4 text-center text-[1.1rem]">{course.price === 0 ? ('رایگان') : (course.price)}</td>
                  <td className="px-4 py-4 text-center text-[1.1rem]">{course.isComplete === 0 ? ('در حال برگذاری') : ('اتمام دوره')}</td>
                  <td className="px-4 py-4 text-center text-[1.1rem]">{course.shortName}</td>
                  <td className="px-4 py-4 text-center text-[1.1rem]">{course.creator}</td>
                  <td className="px-4 py-4 text-center text-[1.1rem]">{course.categoryID.title}</td>
                  <td className=" text-center">
                    <button className="bg-blue-600 hover:bg-blue-700 text-white text-[1.1rem] px-3 py-1 rounded-md transition">
                      ویرایش
                    </button>
                  </td>
                  <td className=" text-center" >
                    <button className="bg-red-600 hover:bg-red-700 text-white text-[1.1rem] px-3 py-1 rounded-md transition" onClick={() => removeUser(course._id)}>
                      حذف
                    </button>
                  </td>
                  
                </tr>

              ))
            }
          </tbody>
        </table>
      </DataTable>
    </div>
  )
}
