import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppSelector } from '../../hooks/store'
import { useRefs } from '../../hooks/useRefs';
import { useTimer } from '../../hooks/useTimer';
import { useLoginThroughEmailMutation, useSendVerificationCodeMutation } from '../../services/authService';
import { IAuthErrorResponse } from '../../types/api';
import { AUTH_VERIFYING } from '../../types/store'

interface ICellField {
    cursor: number;
    code: string[]
}

export default function Confirm() {
    const navigate = useNavigate();
    const [login, { error: loginError }] = useLoginThroughEmailMutation()
    const [sendCode, { error: sendCodeError }] = useSendVerificationCodeMutation()
    const auth = useAppSelector(state => state.auth)
    const [isSendAgainAvailable, setIsSendAgainAvailable] = useState<boolean>(false);
    const { refs, setRefFromKey } = useRefs()
    const { count, startTimer, clearTimer, resetTimer } = useTimer(onTimerOff, 30);
    const [cellField, setCellField] = useState<ICellField>({
        cursor: 0,
        code: ["", "", "", ""]
    })

    useEffect(() => {
        startTimer();

        return clearTimer;
    }, [])

    useEffect(() => {
        if (auth.stage !== AUTH_VERIFYING) {
            navigate("/");
        }
    }, [auth, navigate])

    useEffect(() => {

        refs[cellField.cursor]?.focus();
        refs[cellField.cursor]?.select();

    }, [cellField.cursor, refs])

    useEffect(() => {
        const code = cellField.code.join("");
        if (code.length === 4) {
            login({
                email: auth.email,
                code: code
            });
        }
    }, [cellField, auth, login])

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const addition = value === "" ? -1 : 0;

        setCellField(prev => {
            const state = { ...prev };
            state.code[prev.cursor] = value;

            const id = state.code.join("").length;
            if (id + addition < cellField.code.length && id + addition >= 0) {
                state.cursor = id + addition;
            }

            return state;
        });
    }

    const onInputKeyUp = (e: React.KeyboardEvent<HTMLInputElement> & React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value === "" && e.key === "Backspace") {
            setCellField(prev => ({ ...prev, cursor: prev.cursor + (prev.cursor - 1 >= 0 ? -1 : 0) }))
        } 
    }

    function onTimerOff() {
        setIsSendAgainAvailable(true);
    }

    function onSendCodeAgain() {
        setIsSendAgainAvailable(false);
        resetTimer(30);
        sendCode({ email: auth.email });
    }

    return (
        <div className="flex items-center justify-center min-h-screen py-4 text-sm">
            <div className="w-5/6 lg:w-2/3 xl:w-1/2 2xl:w-5/12 bg-white rounded-2xl flex overflow-hidden">
                <div className="relative flex flex-col justify-center flex-1 px-12 lg:px-32 xl:px-48 2xl:px-52 py-24">
                    <div className="text-xl font-bold">Подтвердить данные</div>
                    <div className="text-tblack mt-4">На ваш email {auth.email} было отправлено сообщение с кодом подтверждания.</div>
                    <div className="mt-4 space-y-4">
                        <div className="flex space-x-2">
                            {cellField.code.map((elem, index) =>
                                <input
                                    key={index}
                                    className="bg-grey rounded-lg w-16 h-20 font-extrabold text-2xl text-center"
                                    type="text"
                                    maxLength={1}
                                    value={elem}
                                    ref={setRefFromKey(index)}
                                    onInput={onInputChange}
                                    onKeyUp={onInputKeyUp}
                                />
                            )}
                        </div>
                        {(loginError && "status" in loginError) &&
                            <div className="text-red font-semibold">{(loginError.data as IAuthErrorResponse).error}</div>
                        }
                        {count !== 0 && <div className="text-tblack">Запросить код повторно можно через <span className="text-red">{count}</span> секунд</div>}
                        <button className={`bg-${isSendAgainAvailable ? "red" : "grey"} text-${isSendAgainAvailable ? "white" : "tgrey"} font-bold rounded-lg py-2 w-2/3`} disabled={!isSendAgainAvailable} onClick={onSendCodeAgain}>Отправить повторно</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
