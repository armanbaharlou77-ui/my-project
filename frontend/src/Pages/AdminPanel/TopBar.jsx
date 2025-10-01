import React, { useEffect, useState } from 'react'
import { MdAccountCircle } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import { IoMdArrowDropdown } from "react-icons/io";
import { IoMdNotificationsOutline } from "react-icons/io";
import { FiMenu } from "react-icons/fi";

export default function TopBar() {

  const [adminInfo, setAdminInfo] = useState({})
  const [notifications, setNotifications] = useState([])
  const [isShowNotify, setIsShowNotify] = useState(false)


  useEffect(() => {
    const localStorageData = JSON.parse(localStorage.getItem('user'))
    fetch('http://localhost:4000/v1/auth/me', {
      headers: {
        'Authorization': `Bearer ${localStorageData.token}`
      }
    })
      .then(res => res.json())
      .then(result => {
        console.log(result)
        setAdminInfo(result)
        setNotifications(result.notifications)
      }
      )
  }, [])


  return (
    <div className="px-4 w-10/12 fixed  top-0 left-0 p-2 bg-gray-300 pb-7 bg-gradient-to-l from-gray-300 via-gray-300 to-gray-400 z-50">
      <div className="flex justify-between items-center mt-5">

        <div className="flex items-center relative">

          <div className="relative mr-4">
            <input
              type="text"
              placeholder="جستجو..."
              className="bg-[#eef5fd] w-[250px] text-[13px] px-5 py-2 rounded-md placeholder:text-gray-500 focus:outline-none"
            />
          </div>


          <div className="mr-5 mt-2">
            <button type="button" className="bg-transparent border-none" onMouseEnter={() => setIsShowNotify(true)} onMouseLeave={() => setIsShowNotify(false)}>
              <i className="far fa-bell text-[20px] text-black"></i>
            </button>
          </div>


          <div
            className={`absolute top-12 -left-86 w-[250px] rounded-lg bg-white shadow-md  ${isShowNotify ? '' : 'hidden'}`}
            onMouseEnter={() => setIsShowNotify(true)} onMouseLeave={() => setIsShowNotify(false)}
          >
            <ul className="list-none">
              {
                notifications.length === 0 ? (
                  <li
                    className="flex items-center justify-between border-b border-gray-300 p-2.5"
                  >
                    <span className="text-[13px] text-[#313131]">پیامی برای نمایش وجود ندارد</span>


                  </li>

                ) : (
                  <>
                    {
                      notifications.map((notify, index) => (

                        <li
                          className="flex items-center justify-between border-b border-gray-300 p-2.5"
                          key={index}
                        >
                          <span className="text-[13px] text-[#313131]">{notify}</span>

                          <label className="relative inline-block w-[50px] h-[20px]">
                            <input type="checkbox" checked className="hidden peer" />
                            <span
                              className="absolute cursor-pointer inset-0 bg-gray-300 rounded-full transition peer-checked:bg-blue-500"
                            ></span>
                            <span
                              className="absolute h-4 w-4 left-1 bottom-1 bg-white rounded-full transition peer-checked:translate-x-[26px]"
                            ></span>
                          </label>
                        </li>
                      ))
                    }

                  </>
                )
              }


            </ul>
          </div>
        </div>


        <div>
          <div className="flex flex-row-reverse items-center gap-1">
            <div className="ml-2">
              <a href="#">
                <MdAccountCircle className='size-13' />
              </a>
            </div>
            <div className="ml-2">
              <a href="#" className="text-[13px] text-[#313131]">{adminInfo.name}</a>
            </div>
            <div className="ml-1 flex items-center justify-center">
              <i className="fas fa-angle-down text-[#313131]"></i>
            </div>
          </div>
        </div>
      </div>
    </div>

  )

}
