import React from 'react'

export default function CourseDetailBox({ title, desc, icon }) {
    return (
        <div>
            <div className=''>
                <div className="flex items-center rounded-md px-8 py-7 shadow-[0_5px_30px_rgba(70,72,77,0.08)] ">
                    <div className="flex items-center justify-center text-[3.5rem] text-primary">
                        <i className={`fas fa-${icon} text-green-600`}></i>
                    </div>
                    <div className="flex flex-col mr-6">
                        <span className="text-[1.5rem] text-[#858c96]">
                            {title}
                        </span>
                        <span className="text-[1.4rem] text-[#7d7e7f]">
                            {desc}
                        </span>
                    </div>
                </div>
            </div>

        </div>
    )
}
