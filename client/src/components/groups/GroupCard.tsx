import React from 'react'
import { Link } from 'react-router-dom'

interface IProps {
    id: string;
    studentCount: number;
    onDelete: (id: string) => void
}

export default function GroupCard({ id, studentCount, onDelete }: IProps) {
    return (
        <div className="flex bg-white rounded-lg p-2 shadow-sm">
            <Link to={`/groups/${id}`} className="flex flex-1">
                <img className="w-12 h-12 bg-grey rounded-full" src={process.env.PUBLIC_URL + `/static/images/group.png`} alt="" />
                <div className="ml-4 flex flex-col justify-center">
                    <div className="font-bold text-xl">Группа {id}</div>
                    <div className="text-tgrey">{studentCount > 0 ? `Студентов: ${studentCount}` : "Студентов нет"}</div>
                </div>
            </Link>
            <div className="flex items-center space-x-2">
                <button className="bg-red-600 rounded-lg text-white px-3 h-8 text-sm font-bold leading-8" onClick={() => onDelete(id)}>Удалить</button>
            </div>
        </div>
    )
}
