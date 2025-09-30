import React from 'react'

export default function AboutUsBox({ title, desc, icon }) {
    return (
        <div className="w-full md:w-1/2 px-4">
            <div
                className="flex items-center shadow-[0_0_10px_rgba(0,0,0,0.1)] rounded-lg my-8 py-8 px-6"
            >
                <div className="text-gray-600 text-[6.5rem]">
                    <i className={icon}></i>
                </div>

                <div className="flex flex-col mr-4">
                    <span className="font-bold text-[1.8rem]">{title}</span>
                    <span className="text-gray-700">{desc}</span>
                </div>
            </div>
        </div>

    )
}
