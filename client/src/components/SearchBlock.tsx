/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import useDebounce from '../hooks/useDebounce';
import useDidMount from '../hooks/useDidMount';

interface IButton {
    name: string;
    color: string;
    link: string;
}

interface IProps {
    name: string;
    buttons: IButton[];
    onSearch: (q: string) => void
}

export default function SearchBlock({ name, buttons, onSearch }: IProps) {
    const [q, setQ] = useState<string>("");
    const debounced = useDebounce(q)

    useEffect(() => {
        onSearch(debounced)
    }, [debounced])

    return (
        <div className="bg-white rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
                <div className="font-bold text-2xl">{name}</div>
                <div className="flex items-center space-x-2">
                    {buttons.map((button, index) =>
                        <Link to={button.link} key={index} className={`${button.color} rounded-lg text-white px-3 h-8 text-sm font-bold leading-8`}>{button.name}</Link>
                    )}
                </div>
            </div>
            <div className="relative">
                <svg className="absolute w-3 h-3 inset-y-1/2 -translate-y-1/2 left-3" width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11.8125 11.5391L8.67188 8.39844C9.35156 7.57812 9.72656 6.52344 9.72656 5.375C9.72656 2.70312 7.52344 0.5 4.85156 0.5C2.15625 0.5 0 2.70312 0 5.375C0 8.07031 2.17969 10.25 4.85156 10.25C5.97656 10.25 7.03125 9.875 7.875 9.19531L11.0156 12.3359C11.1328 12.4531 11.2734 12.5 11.4375 12.5C11.5781 12.5 11.7188 12.4531 11.8125 12.3359C12.0469 12.125 12.0469 11.7734 11.8125 11.5391ZM1.125 5.375C1.125 3.3125 2.78906 1.625 4.875 1.625C6.9375 1.625 8.625 3.3125 8.625 5.375C8.625 7.46094 6.9375 9.125 4.875 9.125C2.78906 9.125 1.125 7.46094 1.125 5.375Z" fill="#262F35" />
                </svg>
                <input className="bg-grey w-full h-8 rounded-lg pl-8 pb-px outline-none placeholder-black" type="text" placeholder='Поиск' name="" id="" value={q} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setQ(e.target.value)} />
            </div>
        </div>
    )
}
