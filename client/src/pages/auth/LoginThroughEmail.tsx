import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSendVerificationCodeMutation } from '../../services/authService';
import { IErrorResponse, ISendVerificationCodeRequest } from '../../types/api';

export default function Login() {
    const navigate = useNavigate();
    const [sendVerificationCode, { isSuccess, error }] = useSendVerificationCodeMutation();
    const [sendVerificationCodeData, setSendVerificationCodeData] = useState<ISendVerificationCodeRequest>({
        email: ""
    });

    useEffect(() => {
        if (isSuccess === true) {
            navigate("/auth/confirm");
        }
    }, [isSuccess, navigate])

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSendVerificationCodeData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    }

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        sendVerificationCode(sendVerificationCodeData);
    }

    return (
        <div className="flex items-center justify-center min-h-screen py-4 text-sm">
            <div className="w-5/6 lg:w-2/3 xl:w-1/2 2xl:w-5/12 bg-white rounded-2xl flex overflow-hidden">
                <div className="relative flex flex-col justify-center flex-1 pt-24 pb-10">
                    <div className="absolute inset-x-0 top-4 flex justify-center text-sm">
                        <div className="text-tgrey">Еще не зарегистрировался?</div>
                        <Link to="/auth/register" className="text-mred underline ml-2 font-bold">Зарегистрироваться</Link>
                    </div>
                    <div className="w-80 m-auto">

                        <div className="text-xl font-bold">Вход через Email</div>
                        <form className="mt-4 space-y-4" onSubmit={onSubmit}>
                            <div className="flex flex-col ">
                                <label className="font-bold px-3 mb-1" htmlFor="">Email</label>
                                <input type="text" name="email" className="bg-grey rounded-lg p-2 outline-none" autoComplete="email" value={sendVerificationCodeData.email} onChange={onInputChange} />
                            </div>
                            { (error && "status" in error) && 
                                <div className="text-mred font-semibold">{ (error.data as IErrorResponse).error }</div>
                            }
                            <button className="bg-mred text-white rounded-lg py-2 w-2/3 font-bold">Войти</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
