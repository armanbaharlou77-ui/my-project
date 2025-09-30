import React from 'react'

export default function DataTable({ children, title }) {
    return (
        <div className=" w-2/3 absolute left-48 scale-105 top-50">
            <div className="bg-white shadow-md rounded-md ">
                {/* عنوان */}
                <div className="px-4 py-1 border-b border-gray-200">
                    <span className="text-lg font-lalezar">
                        لیست <span className="text-blue-600">{title}</span>
                    </span>
                </div>

                {/* جدول یا محتوای داخلی */}
                <div className="">
                    {children}
                </div>
            </div>
        </div>

    )
}
