import React from 'react'
import ImageLoader from './ImageLoader'
import { useState } from 'react'
import CircleSpinner from './CircleSpinner/CircleSpinner'
import { Link } from 'react-router-dom'

export default function CourseBox(props) {


    const [isImgShow, setIsImgShow] = useState(false)

    const loaderHandler = () => {
        setIsImgShow(true)
    }

    return (
        <>
            <div className="w-full sm:w-1/2 md:w-1/3 px-4" style={{ width: `${props.isSlider && '100%'}` }}>
                <div className="bg-white shadow-[0_0_19px_rgba(168,172,185,0.3)] rounded-2xl my-8 transition-all duration-400 ease-in-out hover:-translate-y-2.5">
                    <Link to={`/course-info/${props.shortName}`}>
                        <img
                            src={`http://localhost:4000/courses/covers/${props.cover}`}
                            alt="Course img"
                            className="w-full rounded-t-2xl"
                            onLoad={loaderHandler}
                        />
                    </Link>
                    {!isImgShow && <CircleSpinner />}

                    <div className="px-5">
                        <Link
                            to={`/course-info/${props.shortName}`}
                            className="block py-4 my-2 text-xl font-semibold text-gray-800"
                        >
                            {props.name}
                        </Link>

                        <div className="flex flex-wrap items-center justify-between gap-2">
                            <div className="flex items-center">
                                <i className="fas fa-chalkboard-teacher text-gray-500 text-[1.8rem]"></i>
                                <a
                                    href="#"
                                    className="mr-2 text-[1.2rem] text-gray-500 hover:text-gray-700 transition-colors"
                                >
                                    {props.creator}
                                </a>
                            </div>
                            <div className="flex items-center">
                                <img src="/images/svgs/star.svg" alt="rating" className="m-[-2px]" />
                                <img src="/images/svgs/star_fill.svg" alt="rating" className="m-[-2px]" />
                                <img src="/images/svgs/star_fill.svg" alt="rating" className="m-[-2px]" />
                                <img src="/images/svgs/star_fill.svg" alt="rating" className="m-[-2px]" />
                                <img src="/images/svgs/star_fill.svg" alt="rating" className="m-[-2px]" />
                            </div>
                        </div>

                        <div className="flex flex-wrap items-center justify-between py-4 gap-2">
                            <div className="flex items-center gap-2">
                                <i className="fas fa-users text-gray-500 text-[1.6rem]"></i>
                                <span className="ml-2 text-[1.4rem] text-gray-500">500</span>
                            </div>
                            <span className="text-[1.8rem] text-gray-400">
                                {props.price === 0 ? "رایگان" : props.price.toLocaleString()}
                            </span>
                        </div>
                    </div>

                    <div className="flex items-center justify-center border-t border-gray-200 py-5">
                        <Link
                            to={`/course-info/${props.shortName}`}
                            className="flex my-2 items-center text-[1.4rem] text-primary font-bold hover:text-primary/80 transition-colors"
                        >
                            مشاهده اطلاعات
                            <i className="fas fa-arrow-left text-[1.9rem] mr-2"></i>
                        </Link>
                    </div>
                </div>
            </div>




        </>


    )
}

