
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { toast } from 'react-toastify';
import { useAppSelector } from '../../hooks/store';
import { useChangeGeneralSettingsMutation, useGetUserQuery } from '../../services/userService';
import { IErrorResponse, IGeneralSettingsChangeRequest } from '../../types/api';

export default function GeneralSettingsBlock() {
    const { payload } = useAppSelector(state => state.auth);
    const [generalData, setGeneralData] = useState<IGeneralSettingsChangeRequest>({
        birthday: "",
        lastName: "",
        email: "",
        group: "",
        name: ""
    });

    const [changeGeneralSettings, { isSuccess: isChangeGeneralSuccess, error }] = useChangeGeneralSettingsMutation();
    const { isSuccess: isGetUserSuccess, data } = useGetUserQuery({ id: payload?.id as string });

    const getUserInfo = useCallback(() => {
        return {
            birthday: data?.data.birthday?.slice(0, 10) || "",
            lastName: data?.data.lastName || "",
            email: data?.data.email || "",
            group: data?.data.groupId || "",
            name: data?.data.name || "",
        }
    }, [data]);

    const memmorizedUserInfo = useMemo(getUserInfo, [data, getUserInfo]);

    useEffect(() => {
        if (isGetUserSuccess === true) {
            setGeneralData(getUserInfo())
        }
    }, [isGetUserSuccess, data, getUserInfo])

    useEffect(() => {
        if (isChangeGeneralSuccess === true) {
            toast.success("Данные успешно изменены");
        }
    }, [isChangeGeneralSuccess])


    const isButtonActive = Object.values(memmorizedUserInfo).join("") !== Object.values(generalData).join("")

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setGeneralData(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const onChangeGeneralSettings = () => {
        changeGeneralSettings(generalData);
    }

    return (
        <div className="flex-1">
            <div className="relative bg-white rounded-lg p-6 divide-y-[1px] shadow-md">
                <div className="space-y-4 mb-4">
                    <div className="text-2xl font-bold">Общие настройки</div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col">
                            <div className="flex items-center mb-1">
                                <label className="font-bold ml-2 text-sm" htmlFor="">Имя</label>
                            </div>
                            <input type="text" name="name" className="bg-grey rounded-lg px-3 outline-none h-8 placeholder-black" placeholder="Имя" value={generalData.name} onChange={onInputChange} />
                        </div>
                        <div className="flex flex-col">
                            <div className="flex items-center mb-1">
                                <label className="font-bold ml-2 text-sm" htmlFor="">Фамилия</label>
                            </div>
                            <input type="text" name="lastName" className="bg-grey rounded-lg px-3 outline-none h-8 placeholder-black" placeholder="Фамилия" value={generalData.lastName} onChange={onInputChange} />
                        </div>
                        <div className="flex flex-col">
                            <div className="flex items-center mb-1">
                                <label className="font-bold ml-2 text-sm" htmlFor="">email</label>
                            </div>
                            <input type="text" name="email" className="bg-grey rounded-lg px-3 outline-none h-8 placeholder-black" placeholder="Email" value={generalData.email} onChange={onInputChange} />
                        </div>
                        <div className="flex flex-col">
                            <div className="flex items-center mb-1">
                                <label className="font-bold ml-2 text-sm" htmlFor="">Группа</label>
                            </div>
                            <input type="text" name="group" maxLength={4} className="bg-grey rounded-lg px-3 outline-none h-8 placeholder-black" placeholder="Группа" value={generalData.group} onChange={onInputChange} />
                        </div>
                        <div className="flex flex-col">
                            <div className="flex items-center mb-1">
                                <label className="font-bold ml-2 text-sm" htmlFor="">День рождения</label>
                            </div>
                            <input type="date" name="birthday" className="bg-grey rounded-lg px-3 outline-none h-8 placeholder-black" value={generalData.birthday} onChange={onInputChange} />
                        </div>
                    </div>
                    {(error && "status" in error) &&
                        <div className="text-mred font-semibold">{(error.data as IErrorResponse).error}</div>
                    }
                </div>
                <div className="flex h-8 pt-4 box-content">
                    <button className={`bg-${isButtonActive ? "mred" : "grey"} rounded-lg text-${isButtonActive ? "white" : "tgrey"} font-bold px-3 text-sm`} disabled={!isButtonActive} onClick={onChangeGeneralSettings}>Применить</button>
                </div>
            </div>
        </div >
    )
}
