import React, { useContext, useState } from 'react'
import AuthContext from '../Context/AuthContext'
import { Link } from 'react-router-dom'
import swal from 'sweetalert'

export default function CommentBox({ submitComment }) {

    const context = useContext(AuthContext)

    const [commentsBody, setCommentBody] = useState('')
    const [rating, setRating] = useState(0) // امتیاز انتخاب شده
    const [hover, setHover] = useState(0)   // امتیاز hover برای هایلایت

    return (
        <>
            {
                context.isLoggedIn ? (
                    <div className="flex flex-col mt-6 bg-white rounded-2xl shadow-md p-6 border border-gray-200">
                        <span className="text-[1.3rem] text-gray-800 font-semibold mb-4">
                            دیدگاهتان را بنویسید
                        </span>

                        <span className="my-4 text-[1.1rem] text-gray-700 leading-relaxed">
                            <a href="#" className="hover:underline font-medium text-gray-900">
                                با عنوان محمدامین سعیدی راد وارد شده‌اید.
                            </a>
                            <a href="#" className="text-red-600 hover:underline mx-2 font-medium">
                                خارج می‌شوید؟
                            </a>
                            بخش‌های موردنیاز علامت‌ گذاری شده‌اند *
                        </span>

                        {/* بخش امتیاز */}
                        <div className="flex flex-col space-y-2 mb-6">
                            <span className="text-[1.1rem] text-gray-600 font-medium">امتیاز شما *</span>
                            <div className="flex space-x-2 space-x-reverse text-3xl cursor-pointer">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <span
                                        key={star}
                                        onClick={() => setRating(star)}
                                        onMouseEnter={() => setHover(star)}
                                        onMouseLeave={() => setHover(0)}
                                        className={`transition-colors duration-200 ${(hover || rating) >= star
                                                ? "text-yellow-400"
                                                : "text-gray-300"
                                            }`}
                                    >
                                        ★
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* بخش کامنت */}
                        <div className="flex flex-col space-y-2">
                            <span className="text-[1.1rem] text-gray-600 font-medium">دیدگاه *</span>
                            <textarea
                                className="h-[14rem] rounded-xl border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400 p-4 text-[1rem] resize-none"
                                onChange={(event) => setCommentBody(event.target.value)}
                                value={commentsBody}
                            />
                        </div>

                        <button
                            type="submit"
                            className="mt-8 max-w-[15rem] px-6 py-3 bg-green-500 text-white rounded-xl text-[1.2rem] font-medium hover:bg-green-600 shadow-md hover:shadow-lg transition-all duration-200"
                            onClick={() => submitComment(commentsBody, rating)}
                        >
                            فرستادن دیدگاه
                        </button>
                    </div>
                )
                    :
                    (
                        <div className='bg-yellow-100 text-center rounded-xl my-6 p-4 border border-yellow-300'>
                            <h2 className="text-[1.2rem] text-gray-800 font-medium">
                                برای ثبت کامنت باید{" "}
                                <Link to={'/login'} className='text-blue-600 hover:underline'>
                                    وارد
                                </Link>{" "}
                                سایت شوید
                            </h2>
                        </div>
                    )
            }
        </>
    )
}
