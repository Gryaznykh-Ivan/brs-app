import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { toast } from 'react-toastify';
import { useCreateUserMutation } from '../../services/userService';
import { IUserCreateRequest, IErrorResponse } from '../../types/api';

export default function UserCreateBlock() {
    const [userData, setUserData] = useState<IUserCreateRequest>({
        birthday: "",
        lastName: "",
        email: "",
        group: "",
        name: "",
        password: "",
        role: "STUDENT"
    });

    const [createUser, { isSuccess: isUserCreated, error }] = useCreateUserMutation();

    useEffect(() => {
        if (isUserCreated === true) {
            toast.success("Пользователь успешно создан");
        }
    }, [isUserCreated])


    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserData(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const onCreateUser = () => {
        createUser(userData);
    }

    return (
        <div className="relative bg-white rounded-lg p-6 divide-y-[1px] shadow-md">
            <div className="space-y-4 mb-4">
                <div className="text-2xl font-bold">Создание пользователя</div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col">
                        <div className="flex items-center mb-1">
                            <svg className="mb-1" width="7" height="7" viewBox="0 0 5 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1.95 0.274999L2.325 0.904999L2.595 1.745L2.91 0.89L3.27 0.289999L3.99 0.68L3.6 1.325L2.91 2.045L3.93 1.865H4.65V2.705H3.96L3 2.525L3.69 3.245L4.035 3.83L3.33 4.25L2.94 3.62L2.595 2.705L2.31 3.575L1.935 4.205L1.185 3.785L1.59 3.155L2.22 2.525L1.35 2.705H0.6V1.865H1.35L2.28 2.045L1.605 1.385L1.215 0.694999L1.95 0.274999Z" fill="#FF3131" />
                            </svg>
                            <label className="font-bold ml-2 text-sm" htmlFor="">Имя</label>
                        </div>
                        <input type="text" name="name" className="bg-grey rounded-lg px-3 outline-none h-8 placeholder-black" placeholder="Имя" value={userData.name} onChange={onInputChange} />
                    </div>
                    <div className="flex flex-col">
                        <div className="flex items-center mb-1">
                            <svg className="mb-1" width="7" height="7" viewBox="0 0 5 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1.95 0.274999L2.325 0.904999L2.595 1.745L2.91 0.89L3.27 0.289999L3.99 0.68L3.6 1.325L2.91 2.045L3.93 1.865H4.65V2.705H3.96L3 2.525L3.69 3.245L4.035 3.83L3.33 4.25L2.94 3.62L2.595 2.705L2.31 3.575L1.935 4.205L1.185 3.785L1.59 3.155L2.22 2.525L1.35 2.705H0.6V1.865H1.35L2.28 2.045L1.605 1.385L1.215 0.694999L1.95 0.274999Z" fill="#FF3131" />
                            </svg>
                            <label className="font-bold ml-2 text-sm" htmlFor="">Фамилия</label>
                        </div>
                        <input type="text" name="lastName" className="bg-grey rounded-lg px-3 outline-none h-8 placeholder-black" placeholder="Фамилия" value={userData.lastName} onChange={onInputChange} />
                    </div>
                    <div className="flex flex-col">
                        <div className="flex items-center mb-1">
                            <svg className="mb-1" width="7" height="7" viewBox="0 0 5 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1.95 0.274999L2.325 0.904999L2.595 1.745L2.91 0.89L3.27 0.289999L3.99 0.68L3.6 1.325L2.91 2.045L3.93 1.865H4.65V2.705H3.96L3 2.525L3.69 3.245L4.035 3.83L3.33 4.25L2.94 3.62L2.595 2.705L2.31 3.575L1.935 4.205L1.185 3.785L1.59 3.155L2.22 2.525L1.35 2.705H0.6V1.865H1.35L2.28 2.045L1.605 1.385L1.215 0.694999L1.95 0.274999Z" fill="#FF3131" />
                            </svg>
                            <label className="font-bold ml-2 text-sm" htmlFor="">email</label>
                        </div>
                        <input type="text" name="email" className="bg-grey rounded-lg px-3 outline-none h-8 placeholder-black" placeholder="Email" value={userData.email} onChange={onInputChange} />
                    </div>
                    <div className="flex flex-col">
                        <div className="flex items-center mb-1">
                            <svg className="mb-1" width="7" height="7" viewBox="0 0 5 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1.95 0.274999L2.325 0.904999L2.595 1.745L2.91 0.89L3.27 0.289999L3.99 0.68L3.6 1.325L2.91 2.045L3.93 1.865H4.65V2.705H3.96L3 2.525L3.69 3.245L4.035 3.83L3.33 4.25L2.94 3.62L2.595 2.705L2.31 3.575L1.935 4.205L1.185 3.785L1.59 3.155L2.22 2.525L1.35 2.705H0.6V1.865H1.35L2.28 2.045L1.605 1.385L1.215 0.694999L1.95 0.274999Z" fill="#FF3131" />
                            </svg>
                            <label className="font-bold ml-2 text-sm" htmlFor="">Роль</label>
                        </div>
                        <input type="text" list="role" name="role" className="bg-grey rounded-lg px-3 outline-none h-8 placeholder-black" value={userData.role} onChange={onInputChange} />
                        <datalist id="role">
                            <option value="STUDENT" />
                            <option value="HEADMAN" />
                            <option value="TEACHER" />
                            <option value="ADMIN" />
                        </datalist>
                    </div>
                </div>
                <div className="pt-4">
                    <div className="text-xl  text-tgrey font-medium text-center">Необязательные поля</div>
                    <div className="text-md  text-tgrey text-center">Поля указанные ниже необязательны к заполнению</div>
                </div>
                <div className="grid grid-cols-2 gap-4">
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
                <button className={`bg-mred rounded-lg text-white font-bold px-3 text-sm`} onClick={onCreateUser}>Создать</button>
            </div>
        </div>
    )
}
