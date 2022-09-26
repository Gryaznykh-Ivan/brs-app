import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export default function NewsMenu() {
    const [filter, setFilter] = useState({
        isOpened: false
    });

    const onFilterOpen = (e: React.MouseEvent<HTMLButtonElement>) => {
        setFilter(prev => ({ ...prev, isOpened: !prev.isOpened }));
    }

    return (
        <div className="bg-white rounded-lg p-4 divide-y-[1px]">
            <div className={ `flex items-center space-x-2 ${ (filter.isOpened === true) && "pb-4" }` }>
                <button className={ `p-2 h-8 rounded-lg hover:bg-lblue ${ (filter.isOpened === true) && "bg-lblue" }` } onClick={ onFilterOpen }>
                    <svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 1.3125C0 0.59375 0.5625 0 1.28125 0H14.6875C15.4062 0 16 0.59375 16 1.3125C16 1.625 15.875 1.90625 15.6875 2.125L10.5 8.53125V13C10.5 13.5625 10.0312 14 9.46875 14C9.25 14 9.03125 13.9375 8.84375 13.7812L5.96875 11.5C5.65625 11.25 5.5 10.9062 5.5 10.5312V8.53125L0.28125 2.125C0.09375 1.90625 0 1.625 0 1.3125ZM1.6875 1.5L6.8125 7.78125C6.9375 7.9375 7 8.09375 7 8.25V10.4062L9 12V8.25C9 8.09375 9.03125 7.9375 9.15625 7.78125L14.2812 1.5H1.6875Z" fill="#262F35" />
                    </svg>
                </button>
                <Link to="/news/create" className="bg-blue rounded-lg text-white px-3 h-8 text-sm leading-8 font-bold">Создать</Link>
            </div>
            <div className={ `divide-y-[1px] ${ (filter.isOpened === false) && "hidden" }` }>
                <div className="py-4 space-y-4">
                    
                    <div className="flex space-x-4 h-8">

                    </div>
                    <div className="tags flex flex-wrap gap-2 pt-2">
                        
                    </div>
                </div>
                <div className="flex justify-end items-center space-x-2 pt-4">
                    <button className="bg-lblue rounded-lg text-blue font-bold px-3 h-8 text-sm">Сбросить</button>
                </div>
            </div>
        </div>
    )
}
