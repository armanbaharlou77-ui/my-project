import React, { useEffect, useState, memo } from "react";
import { Link } from "react-router-dom";

export default memo(function Topbar() {

  const [allTopBarLinks, setAllTopBarLinks] = useState([])

  useEffect(() => {
    fetch('http://localhost:4000/v1/menus/topbar')
      .then((res) => res.json())
      .then((data) => setAllTopBarLinks(data))
  }, [])
  

  const getRandomItemsFromArray = (array, count) => {

    const shuffled = [...array].sort(() => 0.5 - Math.random())
    return shuffled.slice(0, count)

  }


  return (
    <div className="bg-gray-100 text-gray-800 py-8 text-3xl">
      <div className=" mx-auto">
        <div className="flex justify-between px-6">
          <div className="flex">
            <ul className="flex">
              {
                (getRandomItemsFromArray(allTopBarLinks, 5).map((link) => (
                  <li key={link.id} className="px-4">
                    <Link to={link.href} className="text-gray-800 hover:text-gray-800 transition-all duration-400 text-2xl">
                      {link.title}
                    </Link>
                  </li>
                )
                ))

              }
            </ul>
          </div>
          <div className="flex">
            <div className="flex items-center">
              <a href="#" className="text-gray-800 hover:text-gray-800 transition-all duration-400 text-2xl px-2">
                sabzlearn@gmail.com
              </a>
              <i className="fas fa-envelope text-green-500 text-2xl"></i>
            </div>
            <div className="flex items-center mr-4">
              <a href="#" className="text-gray-800 hover:text-gray-800 transition-all duration-400 text-2xl px-2">
                09921558293
              </a>
              <i className="fas fa-phone text-green-500 text-2xl"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
)