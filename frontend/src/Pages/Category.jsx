import React, { useEffect, useState } from 'react'
import TopBar from './../Components/TopBar'
import NavBar from './../Components/NavBar'
import Footer from '../Components/Footer'
import CourseBox from '../Components/CourseBox'
import Pagination from '../Components/Pagination'
import BreadCrumb from '../Components/BreadCrumb'
import { Link, useParams } from 'react-router-dom'

export default function Category() {

  const { categoryName } = useParams()
  const [courses, setCourses] = useState([])
  const [showCourses, setShowCourses] = useState([])
  const [status, setStatus] = useState('default')
  const [statusTitle, setStatusTitle] = useState('مرتب سازی پیش فرض')
  const [orderedCourses, setOrderedCourses] = useState([])
  const [searchValue, setSearchValue] = useState('')
  const [showCourseStyle, setShowCourseStyle] = useState('row')


  const statusTitleChangeHandler = event => {

    setStatusTitle(event.target.textContent)

  }
  const searchValueChangeHandler = event => {

    setSearchValue(event.target.value)
    const filteredCourses = courses.filter(course => course.name.toLowerCase().includes(event.target.value))
    setOrderedCourses(filteredCourses)

  }

  useEffect(() => {
    fetch(`http://localhost:4000/v1/courses/category/${categoryName}`)
      .then(res => res.json())
      .then(allCourses => {
        setCourses(allCourses)
        setOrderedCourses(allCourses)
      })
  }, [categoryName])

  useEffect(() => {
    switch (status) {
      case 'free': {
        setOrderedCourses(courses.filter(course => course.price === 0))
        break
      }
      case 'non-free': {
        setOrderedCourses(courses.filter(course => course.price !== 0))
        break
      }
      case 'first': {
        setOrderedCourses(courses.slice().reverse())
        break
      }
      case 'last': {
        setOrderedCourses(courses)
        break
      }
      case 'first': {
        setOrderedCourses(courses.filter(course => course.price !== 0))
        break
      }
      default: {
        setOrderedCourses(courses)
      }
    }

  }, [status])

  return (
    <>
      <TopBar></TopBar>
      <NavBar></NavBar>
      <BreadCrumb links={[
        { id: 1, title: 'خانه', to: '/' },
        { id: 2, title: 'آموزش برنامه نویسی فرانت اند', to: '/category-info/frontend' }
      ]} />
      <section className="my-10">
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row justify-between items-stretch lg:items-center gap-4 p-6 shadow-[0_0_6px_rgba(168,172,185,0.3)] rounded-xl">

            {/* آیکون‌ها و مرتب‌سازی */}
            <div className="flex items-center gap-4 flex-wrap">
              <div className={`w-12 h-12 flex items-center justify-center rounded border border-gray-300 text-black cursor-pointer ${showCourseStyle === 'row' ? 'bg-green-500 text-white' : ''}`} onClick={() => setShowCourseStyle('row')}>
                <i className="fas fa-border-all text-lg"></i>
              </div>

              <div className={`w-12 h-12 flex items-center justify-center rounded border border-gray-300 text-black cursor-pointer ${showCourseStyle === 'column' ? 'bg-green-500 text-white' : ''} `} onClick={() => setShowCourseStyle('column')}>
                <i className="fas fa-align-left text-lg"></i>
              </div>

              <div className="relative group cursor-pointer w-full sm:w-auto">
                <span className="flex items-center justify-between sm:justify-start gap-2 h-12 px-4 sm:px-6 py-2 rounded border border-gray-300 text-gray-500 transition-all group-hover:bg-green-500 group-hover:text-white">
                  {statusTitle}
                  <i className="fas fa-angle-down ml-2"></i>
                </span>

                <ul className="absolute left-0 mt-1 w-full bg-white rounded-b border-b-4 border-green-500 shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                  <li className="text-[1.3rem]  text-gray-700 px-4 py-2 hover:bg-gray-200 bg-gray-200" onClick={event => {
                    setStatus('default')
                    statusTitleChangeHandler(event)

                  }
                  }>مرتب سازی پیش فرض</li>
                  <li className="text-[1.3rem]  text-gray-700 px-4 py-2 hover:bg-gray-200" onClick={event => {
                    setStatus('free')
                    statusTitleChangeHandler(event)

                  }
                  }>مرتب سازی بر اساس رایگان</li>
                  <li className="text-[1.3rem]  text-gray-700 px-4 py-2 hover:bg-gray-200" onClick={event => {
                    setStatus('non-free')
                    statusTitleChangeHandler(event)
                  }
                  }>مرتب سازی بر اساس غیر رایگان</li>
                  <li className="text-[1.3rem]  text-gray-700 px-4 py-2 hover:bg-gray-200" onClick={event => {
                    setStatus('first')
                    statusTitleChangeHandler(event)
                  }
                  }>مرتب سازی بر اساس اولین دوره ها</li>
                  <li className="text-[1.3rem]  text-gray-700 px-4 py-2 hover:bg-gray-200" onClick={event => {
                    setStatus('cheap')
                    statusTitleChangeHandler(event)
                  }
                  }>مرتب سازی بر اساس ارزان ترین</li>
                  <li className="text-[1.3rem]  text-gray-700 px-4 py-2 hover:bg-gray-200" onClick={event => {
                    setStatus('expensive')
                    statusTitleChangeHandler(event)
                  }}>مرتب سازی بر اساس گران ترین</li>
                </ul>
              </div>
            </div>

            {/* سرچ */}
            <div className="w-full lg:w-[30rem]">
              <form action="#" className="relative w-full">
                <input
                  type="text"
                  placeholder="جستجوی دوره ..."
                  className="w-full border border-gray-300 px-6 py-2 pr-12 rounded-lg"
                  value={searchValue}
                  onChange={searchValueChangeHandler}
                />
                <i className="fas fa-search absolute right-4 top-5 text-gray-500 text-xl cursor-pointer"></i>
              </form>
            </div>
          </div>

          <div className="courses-content">
            <div className="container">
              <div className="flex flex-row flex-wrap">



                {orderedCourses.length > 0 ? (
                  <>
                    {showCourseStyle === 'row' ? (
                      showCourses.map((course) => (
                        <CourseBox {...course} />
                      ))

                    ) : (
                      <>
                        {
                          showCourses.map((course) => (

                            <div className="col-span-12 w-full">
                              <div className="shadow-md rounded-xl overflow-hidden my-8">
                                <div className="flex">
                                  {/* بخش راست: تصویر */}
                                  <div className="flex-shrink-0">
                                    <Link to={`/course-info/${course.shortName}`}>
                                      <img
                                        src={course.cover}
                                        alt="course cover"
                                        className="max-w-[350px] h-full object-cover"
                                      />
                                    </Link>
                                  </div>

                                  {/* بخش چپ: محتوا */}
                                  <div className="flex flex-col justify-between p-4 flex-grow">
                                    {/* عنوان دوره */}
                                    <div>
                                      <Link to={`/course-info/${course.shortName}`} className="text-2xl font-bold block py-2">
                                        {course.name}
                                      </Link>
                                    </div>

                                    {/* استاد و ستاره‌ها */}
                                    <div className="flex items-center justify-between">
                                      <div className="flex items-center text-gray-500">
                                        <i className="fa fa-chalkboard-teacher mr-1"></i>
                                        <span className="text-[1.2rem]">{course.creator}</span>
                                      </div>
                                      <div className="flex items-center space-x-1">
                                        {[...Array(5)].map((_, index) => (
                                          <span key={index}>
                                            <img src="/images/svgs/star_fill.svg" className="w-5 h-5" />
                                          </span>
                                        ))}
                                      </div>
                                    </div>

                                    {/* توضیحات */}
                                    <div className="mt-3">
                                      <p className="text-[1.3rem] text-gray-700">{course.description}</p>
                                    </div>

                                    {/* فوتر */}
                                    <div className="flex items-center justify-between mt-4 text-gray-500">
                                      <div className="flex items-center gap-1.5">
                                        <i className="fa fa-users mr-1"></i>
                                        <span>202</span>
                                      </div>
                                      <span>
                                        {course.price === 0 ? "رایگان" : course.price.toLocaleString()}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>

                          ))
                        }
                      </>
                    )

                    }

                  </>

                ) :
                  (
                    <div className='shadow-sm w-full p-5 text-center mt-7 rounded-xl'>
                      <h1>دوره ای یافت نشد</h1>
                    </div>
                  )
                }

              </div>
            </div>
          </div>
        </div>
      </section>
      {
        orderedCourses.length > 0 &&
        (
          <Pagination
            items={orderedCourses}
            itemsCount={6}
            pathname={`/category-info/${categoryName}`}
            setShowCourses={setShowCourses}
          />
        )

      }

      <Footer></Footer>
    </>
  )
}
