import React from 'react'
import { useNavigate } from 'react-router-dom';
import { TranslatedUserRoles, UserRoles } from '../../types/api';

interface IProps {
    fullname: string;
    birthday: string | null;
    email: string;
    group: string | null;
    position: keyof typeof UserRoles;
}

export default function UserProfile({ fullname, birthday, position, email, group }: IProps) {
    return (
        <div className="bg-white rounded-lg p-6 shadow-md">
            <div className="flex space-x-6">
                <div className="flex-1">
                    <div className="font-bold text-xl">{ fullname }</div>
                    <div className="space-y-1 mt-3">
                        { birthday !== null && <div className={ `text-sm text-tblack` }>{ birthday }</div>}
                        <div className={ `text-sm text-tblack` }>{ TranslatedUserRoles[position] }</div>
                        <div className={ `text-sm text-tblack` }>{ group !== null ? `Группа ${ group }` : "Нет группы" }</div>
                        <div className={ `text-sm underline text-blue-700 font-bold` }>{ email }</div>
                    </div>
                </div>
                <img className="w-[120px] h-[120px] self-center rounded-full bg-grey" src={process.env.PUBLIC_URL + `/static/images/${ position }.png`} alt="" />
            </div>
        </div>
    )
}
