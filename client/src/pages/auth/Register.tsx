import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { useRegisterMutation } from '../../services/authService';
import { IErrorResponse, IRegisterRequest } from '../../types/api'

export default function Register() {
    const navigate = useNavigate();
    const [login, { isSuccess, error }] = useRegisterMutation(); 
    const [registerData, setRegisterData] = useState<IRegisterRequest>({
        email: "",
        birthday: "",
        group: "",
        lastName: "",
        name: "",
        password: ""
    });

    useEffect(() => {
        if (isSuccess === true) {
            toast.success("Вы успешно зарегистрировались!");
            navigate("/auth/login");
        }
    }, [isSuccess, navigate])

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRegisterData(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        login(registerData);
    }

    return (
        <div className="flex items-center justify-center min-h-screen py-4 text-sm">
            <div className="w-5/6 lg:w-2/3 xl:w-1/2 2xl:w-5/12 bg-white rounded-2xl flex overflow-hidden">
                <div className="relative flex flex-col justify-center flex-1 pt-24 pb-10">
                    <div className="absolute inset-x-0 top-4 flex justify-center text-sm">
                        <div className="text-tgrey">Есть аккаунт?</div>
                        <Link to="/auth/login" className="text-mred underline ml-2 font-bold">Войти</Link>
                    </div>
                    <div className="w-80 m-auto">
                        <div className="text-xl font-bold">Регистрация</div>
                        <form className="mt-4 space-y-4" action="" onSubmit={onSubmit}>
                            <div className="flex flex-col">
                                <div className="flex items-center mb-1">
                                    <svg className="mb-1" width="7" height="7" viewBox="0 0 5 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M1.95 0.274999L2.325 0.904999L2.595 1.745L2.91 0.89L3.27 0.289999L3.99 0.68L3.6 1.325L2.91 2.045L3.93 1.865H4.65V2.705H3.96L3 2.525L3.69 3.245L4.035 3.83L3.33 4.25L2.94 3.62L2.595 2.705L2.31 3.575L1.935 4.205L1.185 3.785L1.59 3.155L2.22 2.525L1.35 2.705H0.6V1.865H1.35L2.28 2.045L1.605 1.385L1.215 0.694999L1.95 0.274999Z" fill="#FF3131" />
                                    </svg>
                                    <label className="font-bold ml-2 text-sm" htmlFor="">Имя</label>
                                </div>
                                <input type="text" className="bg-grey rounded-lg p-2 outline-none" name="name" onChange={ onInputChange } value={ registerData.name } />
                            </div>
                            <div className="flex flex-col">
                                <div className="flex items-center mb-1">
                                    <svg className="mb-1" width="7" height="7" viewBox="0 0 5 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M1.95 0.274999L2.325 0.904999L2.595 1.745L2.91 0.89L3.27 0.289999L3.99 0.68L3.6 1.325L2.91 2.045L3.93 1.865H4.65V2.705H3.96L3 2.525L3.69 3.245L4.035 3.83L3.33 4.25L2.94 3.62L2.595 2.705L2.31 3.575L1.935 4.205L1.185 3.785L1.59 3.155L2.22 2.525L1.35 2.705H0.6V1.865H1.35L2.28 2.045L1.605 1.385L1.215 0.694999L1.95 0.274999Z" fill="#FF3131" />
                                    </svg>
                                    <label className="font-bold ml-2 text-sm" htmlFor="">Фамилия</label>
                                </div>
                                <input type="text" className="bg-grey rounded-lg p-2 outline-none" name="lastName" onChange={ onInputChange } value={ registerData.lastName } />
                            </div>
                            <div className="flex flex-col">
                                <div className="flex items-center mb-1">
                                    <svg className="mb-1" width="7" height="7" viewBox="0 0 5 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M1.95 0.274999L2.325 0.904999L2.595 1.745L2.91 0.89L3.27 0.289999L3.99 0.68L3.6 1.325L2.91 2.045L3.93 1.865H4.65V2.705H3.96L3 2.525L3.69 3.245L4.035 3.83L3.33 4.25L2.94 3.62L2.595 2.705L2.31 3.575L1.935 4.205L1.185 3.785L1.59 3.155L2.22 2.525L1.35 2.705H0.6V1.865H1.35L2.28 2.045L1.605 1.385L1.215 0.694999L1.95 0.274999Z" fill="#FF3131" />
                                    </svg>
                                    <label className="font-bold ml-2 text-sm" htmlFor="">Дата рождения</label>
                                </div>
                                <input type="date" className="bg-grey rounded-lg p-2 outline-none" name="birthday" onChange={ onInputChange } value={ registerData.birthday } />
                            </div>
                            <div className="flex flex-col">
                                <div className="flex items-center mb-1">
                                    <svg className="mb-1" width="7" height="7" viewBox="0 0 5 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M1.95 0.274999L2.325 0.904999L2.595 1.745L2.91 0.89L3.27 0.289999L3.99 0.68L3.6 1.325L2.91 2.045L3.93 1.865H4.65V2.705H3.96L3 2.525L3.69 3.245L4.035 3.83L3.33 4.25L2.94 3.62L2.595 2.705L2.31 3.575L1.935 4.205L1.185 3.785L1.59 3.155L2.22 2.525L1.35 2.705H0.6V1.865H1.35L2.28 2.045L1.605 1.385L1.215 0.694999L1.95 0.274999Z" fill="#FF3131" />
                                    </svg>
                                    <label className="font-bold ml-2 text-sm" htmlFor="">Email</label>
                                </div>
                                <input type="text" className="bg-grey rounded-lg p-2 outline-none" name="email" autoComplete="email" onChange={ onInputChange } value={ registerData.email } />
                            </div>
                            <div className="flex flex-col">
                                <div className="flex items-center mb-1">
                                    <svg className="mb-1" width="7" height="7" viewBox="0 0 5 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M1.95 0.274999L2.325 0.904999L2.595 1.745L2.91 0.89L3.27 0.289999L3.99 0.68L3.6 1.325L2.91 2.045L3.93 1.865H4.65V2.705H3.96L3 2.525L3.69 3.245L4.035 3.83L3.33 4.25L2.94 3.62L2.595 2.705L2.31 3.575L1.935 4.205L1.185 3.785L1.59 3.155L2.22 2.525L1.35 2.705H0.6V1.865H1.35L2.28 2.045L1.605 1.385L1.215 0.694999L1.95 0.274999Z" fill="#FF3131" />
                                    </svg>
                                    <label className="font-bold ml-2 text-sm" htmlFor="">Группа</label>
                                </div>
                                <input type="text" className="bg-grey rounded-lg p-2 outline-none" name="group" onChange={ onInputChange } value={ registerData.group } />
                            </div>
                            <div className="flex flex-col">
                                <div className="flex items-center mb-1">
                                    <svg className="mb-1" width="7" height="7" viewBox="0 0 5 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M1.95 0.274999L2.325 0.904999L2.595 1.745L2.91 0.89L3.27 0.289999L3.99 0.68L3.6 1.325L2.91 2.045L3.93 1.865H4.65V2.705H3.96L3 2.525L3.69 3.245L4.035 3.83L3.33 4.25L2.94 3.62L2.595 2.705L2.31 3.575L1.935 4.205L1.185 3.785L1.59 3.155L2.22 2.525L1.35 2.705H0.6V1.865H1.35L2.28 2.045L1.605 1.385L1.215 0.694999L1.95 0.274999Z" fill="#FF3131" />
                                    </svg>
                                    <label className="font-bold ml-2 text-sm" htmlFor="">Пароль</label>
                                </div>
                                <input type="password" className="bg-grey rounded-lg p-2 outline-none" autoComplete="new-password" name="password" placeholder="Пароль" onChange={ onInputChange } value={ registerData.password } />
                            </div>
                            { (error && "status" in error) &&
                                <div className="text-mred font-semibold">{ (error.data as IErrorResponse).error }</div>
                            }
                            <button className=" bg-mred text-white rounded-lg py-2 w-2/3 font-bold">Регистрация</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
