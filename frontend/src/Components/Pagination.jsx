import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

export default function Pagination({ items, itemsCount, pathname, setShowCourses }) {

    const { page } = useParams()
    const [pageCount, setPageCount] = useState(null)

    useEffect(() => {
        let endIndex = page * itemsCount
        let startIndex = endIndex - itemsCount
        let paginateItems = items.slice(startIndex, endIndex)
        setShowCourses(paginateItems)

        let pagesNumber = Math.ceil(items.length / itemsCount)
        setPageCount(pagesNumber)
        window.scrollTo(0, 0)

    }, [page, items])






    return (
        <div className="my-12">
            <ul className="flex items-center justify-center">

                <li className="mx-2">
                    <a href="#" className="w-16 h-16 flex items-center justify-center text-xl bg-gray-100 rounded-lg hover:bg-green-500 hover:text-white transition-colors">
                        <i className="fas fa-long-arrow-alt-right"></i>
                    </a>
                </li>

                {
                    Array(pageCount).fill(0).map((item, index) => (
                        <li className="mx-2">
                            {
                                index + 1 === Number(page) ? (
                                    <Link to={`${pathname}/${index + 1}`} className="w-16 h-16 flex items-center justify-center text-xl bg-green-400 text-white rounded-lg hover:bg-green-500 transition-colors">
                                        {index + 1}
                                    </Link>

                                ) : (
                                    <Link to={`${pathname}/${index + 1}`} className="w-16 h-16 flex items-center justify-center text-xl bg-gray-100 rounded-lg hover:bg-green-500 transition-colors">
                                        {index + 1}
                                    </Link>
                                )
                            }
                        </li>

                    ))
                }




                <li className="mx-2">
                    <a href="#" className="w-16 h-16 flex items-center justify-center text-xl bg-gray-100 rounded-lg hover:bg-green-500 hover:text-white transition-colors">
                        <i className="fas fa-long-arrow-alt-left"></i>
                    </a>
                </li>
            </ul>
        </div>

    )
}
