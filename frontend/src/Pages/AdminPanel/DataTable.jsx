import React from 'react'

export default function DataTable({ children, title }) {
    return (
        <div className="mb-20 w-full">
            <div className="bg-white shadow-md rounded-md ">
                {/* عنوان */}
                <div className="px-4 py-1 border-b border-gray-200">
                    <span className="text-xl font-lalezar">
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
