import React from 'react'
import { useNavigate } from 'react-router-dom';

interface Props {
    isMe: boolean;
    fullname: string;
    dateOfBirth?: string;
    position?: string;
    email?: string;
    image?: string;
    description?: string;
    group?: string;
}

const roleToPosition = (role: string): string => {
    const positions: { [key: string]: string } = {
        STUDENT: "Студент",
        HEADMAN: "Староста",
        TEACHER: "Учитель",
        ADMIN: "Администратор"
    }

    return positions[role]
}


export default function UserProfile({ isMe, fullname, dateOfBirth, position, email, description, image, group }: Props) {
    const navigate = useNavigate();

    return (
        <div className="bg-white rounded-lg p-6">
            {(isMe === false) &&
                (
                    <button className="flex items-center pb-2" onClick={ () => navigate(-1) }>
                        <div className="px-2 py-1">
                            <svg width="5" height="9" viewBox="0 0 5 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M3.89062 8.46094L0.539062 4.89844C0.445312 4.78125 0.375 4.64062 0.375 4.5C0.375 4.38281 0.445312 4.24219 0.539062 4.125L3.89062 0.5625C4.10156 0.328125 4.45312 0.328125 4.6875 0.539062C4.92188 0.75 4.92188 1.10156 4.71094 1.33594L1.6875 4.52344L4.71094 7.6875C4.92188 7.92188 4.92188 8.27344 4.6875 8.48438C4.45312 8.69531 4.10156 8.69531 3.89062 8.46094Z" fill="#262F35" />
                            </svg>
                        </div>
                        <div className="text-blue underline font-bold text-sm">Назад</div>
                    </button>
                )
            }
            <div className="flex space-x-6">
                <div className="flex-1">
                    <div className="font-bold text-xl">{ fullname }</div>
                    <div className="space-y-1 mt-3">
                        { dateOfBirth !== undefined && <div className={ `text-sm text-tblack` }>{ dateOfBirth }</div>}
                        { position !== undefined && <div className={ `text-sm text-tblack` }>{ roleToPosition(position) }</div>}
                        { group !== undefined && <div className={ `text-sm text-tblack` }>{ group }</div>}
                        { description !== undefined && <div className={ `text-sm text-tblack` }>{ description }</div>}
                        { email !== undefined && <div className={ `text-sm underline text-blue font-bold` }>{ email }</div>}
                    </div>
                </div>
                <img className="w-[120px] h-[120px] self-center rounded-full bg-grey" src={ image } alt="" />
            </div>
            {(isMe === false) &&
                (
                    <div className="flex space-x-4 mt-4">
                        <button className="text-white font-medium bg-blue rounded-lg text-sm px-3 h-8">Подписаться</button>
                        <button className="text-white font-medium bg-blue rounded-lg text-sm px-3 h-8">Сообщение</button>
                    </div>
                )
            }
        </div>
    )
}
