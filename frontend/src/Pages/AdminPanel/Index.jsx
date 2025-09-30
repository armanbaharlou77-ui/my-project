import React from 'react'
import SideBar from './SideBar'
import TopBar from './TopBar'
import { Outlet } from 'react-router-dom'

export default function Index() {
    return (
        <>
            <div className="flex h-screen">
                {/* بخش اصلی */}
                <div className="flex flex-col flex-1 ">

                    <TopBar />

                    {/* محتوا */}
                    <main className="flex-1 p-4 bg-white overflow-auto">
                        <Outlet />
                    </main>
                </div>


                <SideBar />
            </div>

        </>
    )
}
