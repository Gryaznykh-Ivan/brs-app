import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../components/Header'

export default function Empty() {
    return (
        <div className="app bg-bg min-h-screen text-sm">
            <Header />
            <div className="relative">
                <Outlet />
            </div>
        </div>
    )
}
