import React, { useEffect, useState } from 'react'
import SectionHeader from './SectionHeader'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import CourseBox from './CourseBox';

export default function PresellCourses() {
    const [presellCourses, setPresellCourses] = useState([])

    useEffect(() => {
        fetch(`http://localhost:4000/v1/courses/presell`)
            .then(res => res.json())
            .then(item => {
                setPresellCourses(item)
            })
    }, [])
    return (
        <div>
            <div className="mx-24">
                <div className="container m-auto">
                    <div class="presell__header">
                        <SectionHeader title={'دوره های در حال پیش فروش'} desc={'بر اساس دوره های درحال پیش فروش'} />
                    </div>

                    <Swiper
                        spaceBetween={20}
                        slidesPerView={3}
                        onSlideChange={() => console.log('slide change')}
                        onSwiper={(swiper) => console.log(swiper)}
                    >
                        {
                            presellCourses.map(item => (
                                <SwiperSlide>
                                    <CourseBox {...item} isSlider={true} />
                                </SwiperSlide>
                            ))
                        }
                    </Swiper>


                </div>
            </div>
        </div>
    )
}
