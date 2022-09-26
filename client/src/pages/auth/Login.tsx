import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useLoginMutation } from '../../services/authService';
import { IAuthErrorResponse, ILoginRequest } from '../../types/api';

export default function Login() {
    const navigate = useNavigate();
    const [login, { isSuccess, error }] = useLoginMutation();
    const [loginData, setLoginData] = useState<ILoginRequest>({
        email: "",
        password: ""
    });

    useEffect(() => {
        if (isSuccess === true) {
            navigate("/");
        }
    }, [isSuccess, navigate])

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLoginData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    }

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        login(loginData);
    }

    return (
        <div className="flex items-center justify-center min-h-screen py-4 text-sm">
            <div className="w-5/6 lg:w-2/3 xl:w-1/2 2xl:w-5/12 bg-white rounded-2xl flex overflow-hidden">
                <div className="relative flex flex-col justify-center flex-1 pt-24 pb-10">
                    <div className="absolute inset-x-0 top-4 flex justify-center text-sm">
                        <div className="text-tgrey">Еще не зарегистрировался?</div>
                        <Link to="/auth/register" className="text-red underline ml-2 font-bold">Зарегистрироваться</Link>
                    </div>
                    <div className="w-80 m-auto">

                        <div className="text-xl font-bold">Вход в систему</div>
                        <div className="flex space-x-3 mt-6">
                            <Link to="/auth/loginThroughEmail" className="bg-grey text-red rounded-lg font-bold py-2 w-full text-center">Через email</Link>
                        </div>
                        <div className="flex items-center mt-4">
                            <div className="h-px bg-grey flex-1"></div>
                            <div className="px-4 text-tgrey">Или</div>
                            <div className="h-px bg-grey flex-1"></div>
                        </div>
                        <form className="mt-4 space-y-4" action="" onSubmit={onSubmit}>
                            <div className="flex flex-col ">
                                <label className="font-bold px-3 mb-1" htmlFor="">Email</label>
                                <input type="text" name="email" className="bg-grey rounded-lg p-2 outline-none" autoComplete="email" value={ loginData.email } onChange={onInputChange} />
                            </div>
                            <div className="flex flex-col">
                                <div className="flex justify-between px-3 mb-1">
                                    <label className="font-bold" htmlFor="">Пароль</label>
                                </div>
                                <input type="password" name="password" className="bg-grey rounded-lg p-2 outline-none" autoComplete="current-password" value={ loginData.password } onChange={onInputChange} />
                            </div>
                            { (error && "status" in error) && 
                                <div className="text-red font-semibold">{ (error.data as IAuthErrorResponse).error }</div>
                            }
                            <button className="bg-red text-white rounded-lg py-2 w-2/3 font-bold">Войти</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
