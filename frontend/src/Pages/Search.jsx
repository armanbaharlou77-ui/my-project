import React, { useEffect, useState } from 'react'
import TopBar from '../Components/TopBar'
import Navbar from '../Components/NavBar'
import Footer from '../Components/Footer'
import SectionHeader from '../Components/SectionHeader'
import CourseBox from '../Components/CourseBox'
import ArticleBox from '../Components/ArticleBox'
import { useParams } from 'react-router-dom'

export default function Search() {

    const [courses, setCourses] = useState([])
    const [articles, setArticles] = useState([])
    const { value } = useParams()

    useEffect(() => {
        fetch(`http://localhost:4000/v1/search/${value}`)
            .then(res => res.json())
            .then(result => {
                console.log(result)
                setCourses(result.allResultCourses)
                setArticles(result.allResultArticles)
            })
    }, [])

    console.log(courses);

    return (
        <>
            <TopBar />
            <Navbar />

            <div className="my-16">
                <div className="container mx-auto px-4">
                    <SectionHeader title='دوره های یافت شده مطابق جستجو' desc='سکوی پرتاب شما به سمت موفقیت' />
                    <div className="courses-content">
                        <div className="container">
                            <div className="flex flex-row flex-wrap">

                                {
                                    courses.length === 0 ? (
                                        <>
                                            <div className='w-full bg-gray-200 p-3 rounded-lg shadow-md text-dark mt-6 text-center'>
                                                <h2>دوره ای یافت نشد</h2>
                                            </div>
                                        </>
                                    ) : (
                                        courses.map((course) => (
                                            <CourseBox {...course} key={course._id} />
                                        ))
                                    )
                                }


                            </div>
                        </div>
                    </div>
                </div>
            </div>



            <div className="my-16">
                <div className="container mx-auto px-4">
                    <SectionHeader title='مقاله های یافت شده مطابق جستجو' desc='سکوی پرتاب شما به سمت موفقیت' />
                    <div className="courses-content">
                        <div className="container">
                            <div className="flex flex-row flex-wrap">

                                {
                                    articles.length === 0 ? (
                                        <>
                                            <div className='w-full bg-gray-300 p-3 rounded-lg shadow-md text-dark mt-6 text-center'>
                                                <h2>مقاله ای یافت نشد</h2>
                                            </div>
                                        </>
                                    ) : (
                                        articles.map((article) => (
                                            <ArticleBox {...article} key={article._id} />
                                        ))
                                    )
                                }


                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    )
}
