import React from 'react'
import { Link } from 'react-router-dom'
export default function SectionHeader({ title, desc, btnTitle, btnHref }) {
    return (

        <div className="flex items-center justify-between 
                bg-gradient-to-r from-green-400 via-green-400 to-green-600 
                rounded-3xl p-3 shadow-xl relative overflow-hidden">

            {/* افکت شیشه‌ای روی متن */}
            <div className="flex flex-col text-right bg-white/20 backdrop-blur-md p-3 rounded-2xl mr-2">
                <span className="text-[1.6rem] font-extrabold text-white drop-shadow-md">
                    {title}
                </span>
                <span className="text-white/90 text-[1.1rem] mt-1">{desc}</span>
            </div>

            {/* دکمه متفاوت */}
            {btnTitle && (
                <div>
                    <Link
                        to={`/${btnHref}`}
                        className="flex items-center justify-center gap-2 px-6 py-3 
                   bg-white/20 backdrop-blur-lg border border-white/30
                   text-white font-semibold rounded-full 
                   transition-all duration-300 ease-in-out 
                   hover:bg-white hover:text-green-600 hover:scale-105"
                    >
                        {btnTitle}
                        <i className="fas fa-arrow-left text-xl"></i>
                    </Link>
                </div>
            )}

            {/* افکت‌های تزئینی */}
            <span className="absolute w-24 h-24 bg-white/20 rounded-full top-0 right-0 blur-2xl"></span>
            <span className="absolute w-32 h-32 bg-white/10 rounded-full bottom-0 left-0 blur-3xl"></span>
        </div>




    )
}
