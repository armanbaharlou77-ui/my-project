import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../Context/AuthContext";

export default function Navbar() {
  const [allMenus, setAllMenus] = useState([]);
  const authContext = useContext(AuthContext);

  useEffect(() => {
    fetch("http://localhost:4000/v1/menus")
      .then((res) => res.json())
      .then((menus) => {
        setAllMenus(menus);
      })
      .catch((err) => console.error("Error fetching menus:", err));
  }, []);

  return (
    <div className="bg-white shadow-sm">
      <div className="mx-auto">
        <div className="flex items-center justify-between py-8 px-6">

          <div className="flex items-center">
            <Link to={'/'}>
              <img
                src="/images/logo/Logo.png"
                className="h-20"
                alt="لوگوی سبزلرن"
              />
            </Link>


            <ul className="flex items-center mr-6">
              <li className="relative px-4">
                <Link
                  to="/"
                  className="flex items-center text-gray-500 hover:text-gray-700"
                >
                  صفحه اصلی
                </Link>
              </li>

              {allMenus.map((menu) => (
                
                
                <li key={menu.id} className="relative px-4 group">
                  {menu.submenus?.length > 0 ? (
                    <>

                      <Link
                        to={`/category-info/${menu.href}/1`}
                        type="button"
                        className="flex items-center text-gray-500 hover:text-gray-700"
                      // onClick={() => {
                      //   setTimeout(() => {
                      //     window.location.reload();
                      //   }, 0)
                      // }}
                      >
                        {menu.title}
                        <i className="fas fa-angle-down mr-2"></i>
                      </Link>


                      <ul className="absolute top-16 left-0 bg-white shadow-lg rounded-md w-96 opacity-0 invisible group-hover:opacity-100 group-hover:visible group-hover:top-20 transition-all duration-200 z-10 border-b-2 border-green-500 py-4">
                        {menu.submenus.map((sub) => (


                          <li key={sub.id} className="px-4 py-2">
                            <Link
                              to={sub.href}
                              className="block text-gray-800 hover:text-green-500 transition-colors duration-300"
                            >
                              {sub.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </>
                  ) : (

                    <Link
                      to={menu.href}
                      className="flex items-center text-gray-500 hover:text-gray-700"
                    >
                      {menu.title}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>


          <div className="flex items-center">
            <button className="flex items-center justify-center w-12 h-12 rounded-md bg-green-500 ml-2">
              <i className="fas fa-search text-white text-xl"></i>
            </button>
            <button className="flex items-center justify-center w-12 h-12 rounded-md bg-gray-100 ml-2 hover:text-green-500">
              <i className="fas fa-shopping-cart text-gray-800 text-xl hover:text-green-500 transition-colors duration-300"></i>
            </button>
            {authContext.isLoggedIn ? (
              <Link
                to="/profile"
                className="flex items-center px-6 h-11 border-2 border-green-500 hover:text-white rounded-md hover:bg-green-600 transition-colors duration-300 ml-2"
              >
                <span>{authContext.userInfos.name}</span>
              </Link>
            ) : (
              <Link
                to="/login"
                className="flex items-center px-6 h-11 border-2 border-green-500 rounded-md hover:bg-green-600 transition-colors duration-300 ml-2"
              >
                <span>ثبت نام / ورود</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
