import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAppSelector } from '../../hooks/store';
import { useChangeUserSettingsMutation, useGetUserQuery } from '../../services/userService';
import { IErrorResponse, IUserSettingsChangeRequest } from '../../types/api';


export default function UserSettingsBlock() {
    const { id } = useParams();
    const [userData, setUserData] = useState<IUserSettingsChangeRequest>({
        id: id ? id : "",
        birthday: "",
        lastName: "",
        email: "",
        group: "",
        name: "",
        password: "",
        role: "STUDENT"
    });

    const [changeUserSettings, { isSuccess: isChangeGeneralSuccess, error }] = useChangeUserSettingsMutation();
    const { isSuccess: isGetUserSuccess, data } = useGetUserQuery({ id: id || "" });

    const getUserInfo = useCallback(() => {
        return {
            id: id ? id : "",
            birthday: data?.data.birthday?.slice(0, 10) || "",
            lastName: data?.data.lastName || "",
            email: data?.data.email || "",
            group: data?.data.groupId || "",
            name: data?.data.name || "",
            password: "",
            role: data?.data.role || "STUDENT"
        }
    }, [data]);

    const memmorizedUserInfo = useMemo(getUserInfo, [data, getUserInfo]);

    useEffect(() => {
        if (isGetUserSuccess === true) {
            setUserData(getUserInfo())
        }
    }, [isGetUserSuccess, data, getUserInfo])

    useEffect(() => {
        if (isChangeGeneralSuccess === true) {
            toast.success("Данные успешно изменены");
        }
    }, [isChangeGeneralSuccess])


    const isButtonActive = Object.values(memmorizedUserInfo).join("") !== Object.values(userData).join("")

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserData(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const onChangeUserSettings = () => {
        changeUserSettings(userData);
    }

    return (
        <div className="relative bg-white rounded-lg p-6 divide-y-[1px] shadow-md">
            <div className="space-y-4 mb-4">
                <div className="text-2xl font-bold">Настройки пользователя</div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col">
                        <div className="flex items-center mb-1">
                            <label className="font-bold ml-2 text-sm" htmlFor="">Имя</label>
                        </div>
                        <input type="text" name="name" className="bg-grey rounded-lg px-3 outline-none h-8 placeholder-black" placeholder="Имя" value={userData.name} onChange={onInputChange} />
                    </div>
                    <div className="flex flex-col">
                        <div className="flex items-center mb-1">
                            <label className="font-bold ml-2 text-sm" htmlFor="">Фамилия</label>
                        </div>
                        <input type="text" name="lastName" className="bg-grey rounded-lg px-3 outline-none h-8 placeholder-black" placeholder="Фамилия" value={userData.lastName} onChange={onInputChange} />
                    </div>
                    <div className="flex flex-col">
                        <div className="flex items-center mb-1">
                            <label className="font-bold ml-2 text-sm" htmlFor="">email</label>
                        </div>
                        <input type="text" name="email" className="bg-grey rounded-lg px-3 outline-none h-8 placeholder-black" placeholder="Email" value={userData.email} onChange={onInputChange} />
                    </div>
                    <div className="flex flex-col">
                        <div className="flex items-center mb-1">
                            <label className="font-bold ml-2 text-sm" htmlFor="">Группа</label>
                        </div>
                        <input type="text" name="group" maxLength={4} className="bg-grey rounded-lg px-3 outline-none h-8 placeholder-black" placeholder="Группа" value={userData.group} onChange={onInputChange} />
                    </div>
                    <div className="flex flex-col">
                        <div className="flex items-center mb-1">
                            <label className="font-bold ml-2 text-sm" htmlFor="">День рождения</label>
                        </div>
                        <input type="date" name="birthday" className="bg-grey rounded-lg px-3 outline-none h-8 placeholder-black" value={userData.birthday} onChange={onInputChange} />
                    </div>
                    <div className="flex flex-col">
                        <div className="flex items-center mb-1">
                            <label className="font-bold ml-2 text-sm" htmlFor="">Роль</label>
                        </div>
                        <input type="text" name="role" className="bg-grey rounded-lg px-3 outline-none h-8 placeholder-black" value={userData.role} onChange={onInputChange} />
                    </div>
                    <div className="flex flex-col">
                        <div className="flex items-center mb-1">
                            <label className="font-bold ml-2 text-sm" htmlFor="">Пароль</label>
                        </div>
                        <input type="text" name="password" className="bg-grey rounded-lg px-3 outline-none h-8 placeholder-black" placeholder="Пароль" value={userData.password} onChange={onInputChange} />
                    </div>
                </div>
                {(error && "status" in error) &&
                    <div className="text-mred font-semibold">{(error.data as IErrorResponse).error}</div>
                }
            </div>
            <div className="flex h-8 pt-4 box-content">
                <button className={`bg-${isButtonActive ? "mred" : "grey"} rounded-lg text-${isButtonActive ? "white" : "tgrey"} font-bold px-3 text-sm`} disabled={!isButtonActive} onClick={onChangeUserSettings}>Применить</button>
            </div>
        </div>
    )
}
