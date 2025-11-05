import React, { useEffect, useState } from 'react'
import DataTable from './DataTable'
import swal from 'sweetalert'

export default function Courses() {
  const [courses, setCourses] = useState([])
  const [categories, setCategories] = useState([])
  const [courseCover, setCourseCover] = useState('')
  const [courseCategoryId, setCourseCategoryId] = useState('')
  const [courseStatus, setCourseStatus] = useState('start')

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    shortName: '',
    price: ''
  })

  useEffect(() => {
    refreshCourses()
    getCategories()
  }, [])

  // تغییر مقادیر ورودی فرم
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  // دریافت دسته‌بندی‌ها از سرور
  const getCategories = () => {
    fetch('http://localhost:4000/v1/category')
      .then(res => res.json())
      .then(data => {
        setCategories(data)
      })
      .catch(err => console.error('Error fetching categories:', err))
  }

  // انتخاب دسته‌بندی
  const selectCategory = (event) => {
    setCourseCategoryId(event.target.value)
  }

  // حذف دوره
  const removeCourse = (id) => {
    swal({
      title: 'آیا از حذف دوره مطمئنید؟',
      icon: 'warning',
      buttons: ['خیر', 'بله']
    }).then(result => {
      if (result) {
        const localStorageData = JSON.parse(localStorage.getItem('user'))
        fetch(`http://localhost:4000/v1/courses/${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${localStorageData.token}`
          }
        })
          .then(res => res.json())
          .then(() => {
            swal('حذف شد!', 'دوره با موفقیت حذف شد.', 'success')
            refreshCourses()
          })
          .catch(() => swal('خطا!', 'مشکلی در حذف دوره پیش آمد.', 'error'))
      }
    })
  }

  // دریافت لیست دوره‌ها
  const refreshCourses = () => {
    const localStorageData = JSON.parse(localStorage.getItem('user'))
    fetch('http://localhost:4000/v1/courses', {
      headers: {
        'Authorization': `Bearer ${localStorageData.token}`
      }
    })
      .then(res => res.json())
      .then(data => setCourses(data))
      .catch(err => console.error('Error fetching courses:', err))
  }

  // ارسال فرم برای ساخت دوره جدید
  const submitHandler = async (event) => {
    event.preventDefault()

    const localStorageData = JSON.parse(localStorage.getItem('user'))

    const formDataToSend = new FormData()
    formDataToSend.append('name', formData.name)
    formDataToSend.append('description', formData.description)
    formDataToSend.append('shortName', formData.shortName)
    formDataToSend.append('price', formData.price)
    formDataToSend.append('status', courseStatus)
    formDataToSend.append('categoryID', courseCategoryId)
    formDataToSend.append('cover', courseCover)

    try {
      const response = await fetch('http://localhost:4000/v1/courses', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorageData.token}`
        },
        body: formDataToSend
      })

      if (!response.ok) {
        const text = await response.text()
        console.error('Error:', text)
        swal('خطا', 'ارسال اطلاعات ناموفق بود.', 'error')
        return
      }

      await response.json()
      swal('موفق!', 'دوره با موفقیت اضافه شد.', 'success')
      refreshCourses()

      // پاک کردن فرم
      setFormData({
        name: '',
        description: '',
        shortName: '',
        price: ''
      })
      setCourseCover('')
      setCourseCategoryId('')
      setCourseStatus('start')

    } catch (err) {
      console.error('Error:', err)
      swal('خطا', 'مشکلی در ارسال داده‌ها پیش آمد.', 'error')
    }
  } 
  console.log(courses);
  

  return (
    <div>
      <div className="w-full mb-10 p-4" id="home-content">
        <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-md p-6">
          <div className="border-b border-gray-200 mb-6 pb-2">
            <h2 className="text-2xl font-bold text-gray-800 font-vazir text-right">
              افزودن دوره جدید
            </h2>
          </div>

          <form className="grid grid-cols-1 md:grid-cols-2 gap-6 text-right" onSubmit={submitHandler}>
            {/* نام دوره */}
            <div>
              <label className="block font-semibold mb-1 text-gray-700">
                نام دوره
              </label>
              <input
                onChange={handleChange}
                type="text"
                name="name"
                value={formData.name}
                placeholder="لطفا نام دوره را وارد کنید..."
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:border-blue-500 focus:ring focus:ring-blue-100 outline-none"
              />
            </div>

            {/* قیمت */}
            <div>
              <label className="block font-semibold mb-1 text-gray-700">
                قیمت دوره
              </label>
              <input
                onChange={handleChange}
                type="text"
                name="price"
                value={formData.price}
                placeholder="لطفا قیمت دوره را وارد کنید..."
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:border-blue-500 focus:ring focus:ring-blue-100 outline-none"
              />
            </div>

            {/* توضیحات */}
            <div>
              <label className="block font-semibold mb-1 text-gray-700">
                توضیحات دوره
              </label>
              <input
                onChange={handleChange}
                type="text"
                name="description"
                value={formData.description}
                placeholder="لطفا توضیحات دوره را وارد کنید..."
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:border-blue-500 focus:ring focus:ring-blue-100 outline-none"
              />
            </div>

            {/* URL */}
            <div>
              <label className="block font-semibold mb-1 text-gray-700">
                URL دوره
              </label>
              <input
                onChange={handleChange}
                type="text"
                name="shortName"
                value={formData.shortName}
                placeholder="لطفا URL دوره را وارد کنید..."
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:border-blue-500 focus:ring focus:ring-blue-100 outline-none"
              />
            </div>

            {/* دسته‌بندی */}
            <div>
              <label className="block font-semibold mb-1 text-gray-700">
                دسته‌بندی دوره
              </label>
              <select
                onChange={selectCategory}
                value={courseCategoryId}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white focus:border-blue-500 focus:ring focus:ring-blue-100 outline-none"
              >
                <option value="">انتخاب کنید...</option>
                {categories.map(category => (
                  <option key={category._id} value={category._id}>
                    {category.title}
                  </option>
                ))}
              </select>
            </div>

            {/* عکس دوره */}
            <div>
              <label className="block font-semibold mb-1 text-gray-700">
                عکس دوره
              </label>
              <input
                type="file"
                className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4
                file:rounded-lg file:border-0 file:text-sm file:font-semibold
                file:bg-blue-50 file:text-blue-600 hover:file:bg-blue-100"
                onChange={e => setCourseCover(e.target.files[0])}
              />
            </div>

            {/* وضعیت دوره */}
            <div>
              <label className="block font-semibold mb-1 text-gray-700">
                وضعیت دوره
              </label>
              <div className="flex gap-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="status"
                    value="start"
                    checked={courseStatus === 'start'}
                    onChange={e => setCourseStatus(e.target.value)}
                  />
                  <span>پیش‌فروش</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="status"
                    value="presell"
                    checked={courseStatus === 'presell'}
                    onChange={e => setCourseStatus(e.target.value)}
                  />
                  <span>در حال برگزاری</span>
                </label>
              </div>
            </div>

            {/* دکمه ثبت */}
            <div className="md:col-span-2 flex justify-end">
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-all duration-200"
              >
                افزودن
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* جدول دوره‌ها */}
      <DataTable title={'دوره‌ها'}>
        <table className="border border-gray-200 rounded-md overflow-hidden w-full">
          <thead className="bg-gray-1">
            <tr>
              <th className="px-4 py-4 text-center text-[1.1rem] font-lalezar text-gray-600">شناسه</th>
              <th className="px-4 py-4 text-center text-[1.1rem] font-lalezar text-gray-600">عنوان</th>
              <th className="px-4 py-4 text-center text-[1.1rem] font-lalezar text-gray-600">مبلغ</th>
              <th className="px-4 py-4 text-center text-[1.1rem] font-lalezar text-gray-600">وضعیت</th>
              <th className="px-4 py-4 text-center text-[1.1rem] font-lalezar text-gray-600">لینک</th>
              <th className="px-4 py-4 text-center text-[1.1rem] font-lalezar text-gray-600">مدرس</th>
              <th className="px-4 py-4 text-center text-[1.1rem] font-lalezar text-gray-600">دسته‌بندی</th>
              <th className="px-4 py-4 text-center text-[1.1rem] font-lalezar text-gray-600">ویرایش</th>
              <th className="px-4 py-4 text-center text-[1.1rem] font-lalezar text-gray-600">حذف</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course, index) => (
              <tr className="border-t" key={course._id}>
                <td className="px-4 py-4 text-center text-[1.1rem]">{index + 1}</td>
                <td className="px-4 py-4 text-center text-[1.1rem]">{course.name}</td>
                <td className="px-4 py-4 text-center text-[1.1rem]">
                  {course.price === 0 ? 'رایگان' : course.price}
                </td>
                <td className="px-4 py-4 text-center text-[1.1rem]">
                  {course.isComplete === 0 ? 'در حال برگزاری' : 'اتمام دوره'}
                </td>
                <td className="px-4 py-4 text-center text-[1.1rem]">{course.shortName}</td>
                <td className="px-4 py-4 text-center text-[1.1rem]">{course.creator}</td>
                <td className="px-4 py-4 text-center text-[1.1rem]">
                  {course.category ?.title || 'نامشخص'}
                </td>
                <td className="text-center">
                  <button className="bg-blue-600 hover:bg-blue-700 text-white text-[1.1rem] px-3 py-1 rounded-md transition">
                    ویرایش
                  </button>
                </td>
                <td className="text-center">
                  <button
                    className="bg-red-600 hover:bg-red-700 text-white text-[1.1rem] px-3 py-1 rounded-md transition"
                    onClick={() => removeCourse(course._id)}
                  >
                    حذف
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </DataTable>
    </div>
  )
}
