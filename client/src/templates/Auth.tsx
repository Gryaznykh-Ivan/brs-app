import React from 'react'
import { Outlet } from 'react-router-dom'

export default function Auth() {
    return (
        <div className="app bg-bg min-h-screen text-sm">
            <div className="relative">
                <Outlet />
            </div>
        </div>
    )
}
