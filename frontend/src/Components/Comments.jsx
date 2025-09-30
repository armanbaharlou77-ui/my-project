import React, { useState } from "react";

const CommentBox = ({ comments }) => {




    return (
        <>
            {comments.length === 0 ? (
                <div>
                    <h2 className="bg-orange-400 text-white rounded-xl text-center my-6 p-3">کامنتی یافت نشد</h2>
                </div>
            ) : (
                <>
                    {
                        comments.map((comment) => (

                            <div className="w-full p-4 mt-5 rounded-lg bg-gray-100 shadow-[0_0_13px_1px_rgba(70,72,77,0.08)]">

                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <span className="font-medium text-gray-800">{comment.creator.name}</span>
                                        <span className="bg-green-500 text-white text-sm px-2 py-0.5 rounded-md">
                                            {comment.creator.role === 'ADMIN' ? 'مدیر' : 'کاربر وبسایت'}
                                        </span>
                                    </div>
                                    <span className="text-gray-400 text-[1.1rem]">{comment.createdAt.slice(0, 10)}</span>
                                </div>


                                <p className="text-gray-600 text-[1.2rem] mt-2">{comment.body}</p>


                                <div className="mt-3">
                                    <button className="px-3 py-1 text-[1.2rem] bg-green-600 text-white rounded-md hover:bg-green-700" >
                                        پاسخ
                                    </button>
                                </div>
                            </div>
                        ))

                    }



                </>
            )
            }

        </>
    )
}


export default CommentBox;
