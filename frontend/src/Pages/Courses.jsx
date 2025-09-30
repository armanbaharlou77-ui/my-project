import React, { useEffect, useState } from 'react'
import TopBar from './../Components/TopBar'
import NavBar from './../Components/NavBar'
import Footer from '../Components/Footer'
import BreadCrumb from '../Components/BreadCrumb'
import Pagination from '../Components/Pagination'
import CourseBox from '../Components/CourseBox'
import SectionHeader from '../Components/SectionHeader'

export default function Courses() {

    const [courses, setCourses] = useState([])
    const [showCourses, setShowCourses] = useState([])

    useEffect(() => {
        fetch('http://localhost:4000/v1/courses')
            .then(res => res.json())
            .then(data => setCourses(data))
    }, [])


    return (
        <div>
            <TopBar />
            <NavBar />
            <BreadCrumb links={[
                { id: 1, title: 'خانه', to: '/' },
                { id: 2, title: 'تمامی دوره ها', to: '/courses' },

            ]} />

            <div className="my-16">
                <div className="container mx-auto px-4">
                    <SectionHeader title='تمامی دوره ها' desc='سکوی پرتاپ شما به سمت موفقیت' />
                    <div className="courses-content">
                        <div className="container">
                            <div className="flex flex-row flex-wrap">
                                {
                                    showCourses.map((course) => (
                                        <CourseBox {...course} />
                                    ))
                                }

                            </div>

                            <Pagination
                                items={courses}
                                itemsCount={6}
                                pathname={'/courses'}
                                setShowCourses={setShowCourses}
                            />
                        </div>
                    </div>
                </div>
            </div>


            <Footer></Footer>
        </div>
    )
}
