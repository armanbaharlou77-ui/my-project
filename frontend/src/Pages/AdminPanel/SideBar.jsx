import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import AuthContext from '../../Context/AuthContext'
import swal from 'sweetalert'



export default function SideBar() {

    const context = useContext(AuthContext)
    const navigate = useNavigate()


    const logoutHandler = event => {
        event.preventDefault()
        context.logout
        swal({
            title: 'با موفقیت خارج شدید',
            icon: 'success',
            buttons: 'تایید'
        }).then(() => {
            context.logout()
            navigate('/')
        })

    }

    return (
        <div id="sidebar" className="fixed right-0 top-0 w-2/12 h-full bg-[#17203f]">
            <div className="flex items-center justify-between border-b border-gray-500/60">
                <div className="p-5.5">
                    <a href="#">
                        <img src="/images/logo/Logo.png" alt="Logo" className="w-[70px]" />
                    </a>
                </div>
                <div className="p-4">
                    <i className="fas fa-bars text-white text-lg cursor-pointer"></i>
                </div>
            </div>


            <div className="mt-10">
                <ul>
                    <li
                        className="relative bg-gradient-to-r from-[#353c50] to-transparent active"
                    >
                        <Link
                            to="/admin-p"
                            className="block px-6 py-4 text-white text-[15px] transition-colors"
                        >
                            <span>صفحه اصلی</span>
                        </Link>
                        <span className="absolute top-0 left-0 h-full w-[5px] bg-[#4869ff]"></span>
                    </li>

                    <li className="hover:bg-gradient-to-r hover:from-[#353c50] hover:to-transparent">
                        <Link
                            to="courses"
                            className="block px-6 py-4 text-[#8c90a0] hover:text-white text-[15px] transition-colors"
                        >
                            <span>دوره ها</span>
                        </Link>
                    </li>

                    <li className="hover:bg-gradient-to-r hover:from-[#353c50] hover:to-transparent">
                        <Link
                            to="menus"
                            className="block px-6 py-4 text-[#8c90a0] hover:text-white text-[15px] transition-colors"
                        >
                            <span>منو ها</span>
                        </Link>
                    </li>

                    <li className="hover:bg-gradient-to-r hover:from-[#353c50] hover:to-transparent">
                        <Link
                            to="articles"
                            className="block px-6 py-4 text-[#8c90a0] hover:text-white text-[15px] transition-colors"
                        >
                            <span>مقاله ها</span>
                        </Link>
                    </li>

                    <li className="hover:bg-gradient-to-r hover:from-[#353c50] hover:to-transparent">
                        <Link
                            to="users"
                            className="block px-6 py-4 text-[#8c90a0] hover:text-white text-[15px] transition-colors"
                        >
                            <span>کاربران</span>
                        </Link>
                    </li>

                    <li className="hover:bg-gradient-to-r hover:from-[#353c50] hover:to-transparent">
                        <Link
                            to="#"
                            className="block px-6 py-4 text-[#8c90a0] hover:text-white text-[15px] transition-colors"
                        >
                            <span>کدهای تخفیف</span>
                        </Link>
                    </li>

                    <li className="hover:bg-gradient-to-r hover:from-[#353c50] hover:to-transparent">
                        <Link
                            to="category"
                            className="block px-6 py-4 text-[#8c90a0] hover:text-white text-[15px] transition-colors"
                        >
                            <span>دسته‌بندی‌ها</span>
                        </Link>
                    </li>
                    <li className="hover:bg-gradient-to-r hover:from-[#353c50] hover:to-transparent">
                        <Link
                            to=""
                            className="block px-6 py-4 text-[#8c90a0] hover:text-white text-[15px] transition-colors"
                            onClick={logoutHandler}
                        >
                            <span>خروج</span>
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    )
    // return (
    //     <aside className="w-56 bg-[#0d1b3d] text-white h-full fixed right-0 top-0 pt-4">
    //         {/* لوگو */}
    //         <div className="flex items-center justify-center mb-6">
    //             <img src="/logo.png" alt="logo" className="h-10" />
    //         </div>

    //         {/* منو */}
    //         <nav className="flex flex-col space-y-4 px-4 text-sm">
    //             {links.map((item, idx) => (
    //                 <Link
    //                     key={idx}
    //                     to="/"
    //                     className={`hover:text-green-400 hover:border-r-4 hover:border-green-400 pr-2 transition ${idx === 0 ? "border-r-4 border-blue-500 text-blue-300" : ""
    //                         }`}
    //                 >
    //                     {item}
    //                 </Link>
    //             ))}
    //         </nav>
    //     </aside>
    // );
}
