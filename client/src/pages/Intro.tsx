import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAppSelector } from '../hooks/store';

export default function Intro() {
    const isAuth = useAppSelector(state => state.auth.isAuth);
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuth === true) {
            navigate("/");
        }
    }, [isAuth, navigate]);

    return (
        <>
            <div className="relative">
                <img className="w-full" src={process.env.PUBLIC_URL + "/static/images/intro.png"} alt="" />
                <div className="bg-black absolute inset-0 opacity-30"></div>
                <div className="absolute inset-0">
                    <h1 className="flex h-full items-center max-w-4xl mx-auto text-center text-white font-medium text-[40px] leading-[50px]">Балльно-рейтинговая система для студентов СПБГТИ(ТУ)</h1>
                </div>
            </div>
            <div className="py-8 text-center space-y-5">
                <h2 className="text-2xl font-bold">Для продолжения работы с системой необходимо авторизоваться</h2>
                <div className="text-xl text-tgrey">Выберите один из предложенных вариантов</div>
                <div className="flex h-12 space-x-8 justify-center items-center">
                    <Link to="/auth/login" className="flex flex-col justify-center bg-mred text-white text-xl w-48 rounded-xl h-full">Войти</Link>
                    <div>ИЛИ</div>
                    <Link to="/auth/register" className="flex flex-col justify-center bg-mred text-white text-xl w-48 rounded-xl h-full">Зарегистрироваться</Link>
                </div>
            </div>
        </>
    )
}
