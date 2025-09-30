import React, { useEffect, useState } from 'react'
import SectionHeader from './SectionHeader'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import CourseBox from './CourseBox';

export default function PopularCourses() {
    const [popularCourses, setPopularCourses] = useState([])


    useEffect(() => {
        fetch(`http://localhost:4000/v1/courses/popular`)
            .then(res => res.json())
            .then(item => {
                setPopularCourses(item)
            })
    }, [])


    return (
        <div className="mx-24">
            <div className="container m-auto">
                <SectionHeader title={'محبوب ترین دوره ها'} desc={'بر اساس نظرات کاربران سبزلرن'} />
            </div>
            <div className=' container m-auto'>

                <Swiper
                    spaceBetween={20}
                    slidesPerView={3}
                    onSlideChange={() => console.log('slide change')}
                    onSwiper={(swiper) => console.log(swiper)}
                >
                    {
                        popularCourses.map(item => (
                            <SwiperSlide>
                                <CourseBox {...item} isSlider={true} />
                            </SwiperSlide>
                        ))
                    }
                </Swiper>
            </div>


        </div>
    )
}
