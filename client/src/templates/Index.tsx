import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../components/Header'
import SideBar from '../components/sideBars/NavBar'

export default function Index() {
    return (
        <div className="app bg-bg min-h-screen text-sm">
            <Header />
            <div className="relative">
                <div className=" container flex py-4">
                    <div className="max-w-[228px] w-full mr-4">
                        <SideBar />
                    </div>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}
