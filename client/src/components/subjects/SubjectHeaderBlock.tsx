import React from 'react'
import { Link } from 'react-router-dom';

interface IProps {
    id: string;
    title: string;
    description: string;
    onDelete: (id: string) => void
}

export default function SubjectHeaderBlock({ id, title, description, onDelete }: IProps) {
    return (
        <div className="flex bg-white rounded-lg p-4 shadow-sm">
            <div className="flex flex-col justify-center ml-2 space-y-1">
                <div className="font-bold text-2xl">{title}</div>
                <div className="text-tgrey">{description}</div>
            </div>
            <div className="flex flex-1 justify-end space-x-2">
                <Link to={`/subjects/${id}/addGroups`} className="bg-green-600 rounded-lg text-white px-3 h-8 text-sm font-bold leading-8">Добавить группу</Link>
                <button className="bg-red-600 rounded-lg text-white px-3 h-8 text-sm font-bold leading-8" onClick={() => onDelete(id)}>Удалить</button>
            </div>
        </div>
    )
}
