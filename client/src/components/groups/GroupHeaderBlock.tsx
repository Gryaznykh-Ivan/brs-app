import React from 'react'
import { Link } from 'react-router-dom'

interface IProps {
    id: string;
    studentsCount?: number;
    isDeletable: boolean;
    isAddable: boolean;
    onDelete: (id: string) => void
}

export default function GroupHeaderBlock({ id, studentsCount, isDeletable, isAddable, onDelete }: IProps) {
    return (
        <div className="flex bg-white rounded-lg p-4 shadow-sm">
            <div className="flex flex-col justify-center ml-2 space-y-1">
                <div className="font-bold text-2xl">Группа { id }</div>
                <div className="text-xl text-tgrey">Студентов: { studentsCount || 0 }</div>
            </div>
            <div className="flex flex-1 justify-end space-x-2">
                { isAddable && <Link to={`/groups/${id}/addStudents`} className="bg-green-600 rounded-lg text-white px-3 h-8 text-sm font-bold leading-8">Добавить студента</Link> }
                { isDeletable && <button className="bg-red-600 rounded-lg text-white px-3 h-8 text-sm font-bold leading-8" onClick={() => onDelete(id)}>Удалить</button> }
            </div>
        </div>
    )
}
