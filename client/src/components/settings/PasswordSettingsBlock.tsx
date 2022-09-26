import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { useChangePasswordMutation } from '../../services/userService';
import { IAuthErrorResponse } from '../../types/api';

interface IPasswordChangeData {
    newPassword0: string;
    newPassword1: string;
    oldPassword: string;
}

export default function PasswordSettingsBlock() {
    const [changePassword, { isSuccess, error }] = useChangePasswordMutation();
    const [passwordData, setPasswordData] = useState<IPasswordChangeData>({
        newPassword0: "",
        newPassword1: "",
        oldPassword: ""
    });

    const isPasswordDataEmpty =
        passwordData.newPassword0 === ""
        || passwordData.newPassword1 === "";
    const isPasswordsEqual = passwordData.newPassword1 === passwordData.newPassword0;
    const isButtonActive = !isPasswordDataEmpty && isPasswordsEqual;

    useEffect(() => {
        if (isSuccess === true) {
            setPasswordData({ newPassword0: "", newPassword1: "", oldPassword: "" });
            toast.success("Пароль успешно изменен");
        }
    }, [isSuccess])


    const onChangePassword = () => {
        changePassword({ oldPassword: passwordData.oldPassword, newPassword: passwordData.newPassword0 });
    }

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPasswordData(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    return (
        <div className="flex-1">
            <div className="relative bg-white rounded-lg p-6 divide-y-[1px] shadow-lg">
                <div className="space-y-4 mb-4">
                    <div className="text-2xl font-bold">Управление паролем</div>


                    <div className="flex flex-col">
                        <div className="flex items-center mb-1">
                            <label className="font-bold ml-2 text-sm" htmlFor="">Старый пароль<br /><span className="text-tgrey font-semibold">Оставляйте поле пустым, если у вас еще нет пароля</span></label>
                        </div>
                        <input type="password" name="oldPassword" className="bg-grey rounded-lg px-3 outline-none w-1/2 h-8 placeholder-black" placeholder="Старый пароль" value={passwordData.oldPassword} onChange={onInputChange} />
                    </div>

                    <div className="flex flex-col">
                        <div className="flex items-center mb-1">
                            <svg className="mb-1" width="7" height="7" viewBox="0 0 5 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1.95 0.274999L2.325 0.904999L2.595 1.745L2.91 0.89L3.27 0.289999L3.99 0.68L3.6 1.325L2.91 2.045L3.93 1.865H4.65V2.705H3.96L3 2.525L3.69 3.245L4.035 3.83L3.33 4.25L2.94 3.62L2.595 2.705L2.31 3.575L1.935 4.205L1.185 3.785L1.59 3.155L2.22 2.525L1.35 2.705H0.6V1.865H1.35L2.28 2.045L1.605 1.385L1.215 0.694999L1.95 0.274999Z" fill="#FF3131" />
                            </svg>
                            <label className="font-bold ml-2 text-sm" htmlFor="">Новый пароль</label>
                        </div>
                        <input type="password" name="newPassword0" className="bg-grey rounded-lg px-3 outline-none w-1/2 h-8 placeholder-black" placeholder="Новый пароль" value={passwordData.newPassword0} onChange={onInputChange} />
                    </div>
                    <div className="flex flex-col">
                        <div className="flex items-center mb-1">
                            <svg className="mb-1" width="7" height="7" viewBox="0 0 5 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1.95 0.274999L2.325 0.904999L2.595 1.745L2.91 0.89L3.27 0.289999L3.99 0.68L3.6 1.325L2.91 2.045L3.93 1.865H4.65V2.705H3.96L3 2.525L3.69 3.245L4.035 3.83L3.33 4.25L2.94 3.62L2.595 2.705L2.31 3.575L1.935 4.205L1.185 3.785L1.59 3.155L2.22 2.525L1.35 2.705H0.6V1.865H1.35L2.28 2.045L1.605 1.385L1.215 0.694999L1.95 0.274999Z" fill="#FF3131" />
                            </svg>
                            <label className="font-bold ml-2 text-sm" htmlFor="">Новый пароль</label>
                        </div>
                        <input type="password" name="newPassword1" className="bg-grey rounded-lg px-3 outline-none w-1/2 h-8 placeholder-black" placeholder="Новый пароль" value={passwordData.newPassword1} onChange={onInputChange} />
                    </div>
                    <div className="ml-1 text-tgrey font-semibold text-sm">Формат пароля: Минимальная длина 8. Минимум 1 буква в нижнем регистре. Минимум 1 буква в верхнем регистре. Минимум 1 символ. Минимум 1 число.</div>
                    {(!isPasswordDataEmpty && !isPasswordsEqual) &&
                        <div className="ml-1 text-red font-semibold text-sm">Пароли не совпадают</div>
                    }
                    {(error && "status" in error) &&
                        <div className="text-red font-semibold">{(error.data as IAuthErrorResponse).error}</div>
                    }
                </div>
                <div className="flex h-8 pt-4 box-content">
                    <button className={`bg-${isButtonActive ? "red" : "grey"} rounded-lg text-${isButtonActive ? "white" : "tgrey"} font-bold px-3 text-sm`} disabled={!isButtonActive} onClick={onChangePassword}>Применить</button>
                </div>
            </div>
        </div >
    )
}
