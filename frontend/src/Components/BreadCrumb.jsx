import React from 'react'
import { Link } from 'react-router-dom'


export default function BreadCrumb({ links }) {
    return (

        <section className="m-8">
            <div className="container mx-auto">
                <div className="flex items-center bg-[#f0f2f7] p-6 rounded-xl">


                    <div className="w-14 h-14 flex items-center justify-center bg-white rounded-xl">
                        <i className="fas fa-home text-[1.8rem] text-[#909aa7]"></i>
                    </div>


                    <ul className="flex items-center mr-6 space-x-0 space-x-reverse">
                        {links.map(link => (
                            <li key={link.id} className="list-none ml-4">
                                <Link to={link.to} className="flex items-center text-[1.5rem] text-[#7f8187] hover:text-[#7f8187]">
                                    {link.title}

                                    {link.id !== links.length ? (
                                        <i className="fas fa-angle-left text-[1.5rem] mx-2"></i>

                                    ) : null}
                                </Link>
                            </li>

                        ))}

                    </ul>

                </div>
            </div>
        </section>


    )
}
