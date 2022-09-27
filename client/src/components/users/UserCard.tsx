import React from 'react'
import { Link } from 'react-router-dom'
import { UserRoles } from '../../types/api';

interface IProps {
    id: string;
    FIO: string;
    position: keyof typeof UserRoles;
    group: string | null;
    isEditable: boolean;
    isDeletable: boolean;
    onDelete: (id: string) => void
}

export default function UserCard({ id, FIO, group, position, isEditable, isDeletable, onDelete }: IProps) {
    return (
        <div className="flex p-2 rounded-xl hover:bg-grey transition-colors">
            <Link to={ `/user/${ id }` } className="flex">
                <img className="w-12 h-12 bg-grey rounded-full" src={process.env.PUBLIC_URL + `/static/images/${ position }.png`} alt="" />
                <div className="ml-4 flex flex-col justify-center">
                    <div className="font-bold text-xl">{FIO}</div>
                    <div className="text-tgrey">{ group === null ? `Нет группы` : `Группа ${group}` }</div>
                </div>

            </Link>
            <div className="flex flex-1 justify-end items-center space-x-2">
                {isEditable && <Link to={ `/users/${ id }` } className="bg-blue-600 rounded-lg text-white px-3 h-8 text-sm font-bold leading-8">Редактировать</Link>}
                {isDeletable && <button className="bg-red-600 rounded-lg text-white px-3 h-8 text-sm font-bold leading-8" onClick={ () => onDelete(id) }>Удалить</button>}
            </div>
        </div>
    )
}
