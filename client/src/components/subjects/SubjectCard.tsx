import React from 'react'
import { Link } from 'react-router-dom'
import { SubjectTypes, TranslatedSubjectTypes } from '../../types/api';

interface IProps {
    id: string;
    type: keyof typeof SubjectTypes;
    createdByFIO: string;
    title: string;
    updatedAt: string;
}

export default function SubjectCard({ id, type, createdByFIO, title, updatedAt }: IProps) {
    return (
        <div className="flex bg-white rounded-lg p-4 shadow-sm">
            <Link to={`/subjects/${id}`} className="flex-1" >
                <div className="flex">
                    <div className="flex justify-center items-center w-16 h-16 bg-grey rounded-full" >
                        <svg width="36" height="35" viewBox="0 0 36 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M2.96154 34V25.2449M2.96154 25.2449H1M2.96154 25.2449H33.0385M33.0385 25.2449V34M33.0385 25.2449H35M8.19231 23.2245V22.2041C8.19231 21.6518 7.74459 21.2041 7.19231 21.2041H6.88462M2.30769 21.2041V23.2245M2.30769 21.2041H2C1.44772 21.2041 1 20.7564 1 20.2041V20.1837C1 19.6314 1.44772 19.1837 2 19.1837H5.88462C6.4369 19.1837 6.88462 19.6314 6.88462 20.1837V21.2041M2.30769 21.2041H6.88462M29.1154 23.2245V22.2041C29.1154 21.6518 29.5631 21.2041 30.1154 21.2041H31.4038M29.1154 23.2245H33.6923M29.1154 23.2245H25.1923M33.6923 23.2245H34C34.5523 23.2245 35 23.6722 35 24.2245V33C35 33.5523 34.5523 34 34 34H2C1.44772 34 1 33.5523 1 33V24.2245C1 23.6722 1.44772 23.2245 2 23.2245H10.8077M33.6923 23.2245V22.2041C33.6923 21.6518 33.2446 21.2041 32.6923 21.2041H31.4038M31.4038 21.2041L33.4327 16.4275C33.59 16.0572 33.5101 15.6287 33.2298 15.34L31.0769 13.1225M29.7692 13.796L29.4555 14.1191C28.9722 14.6169 28.1414 14.4833 27.8384 13.8592L27.1974 12.5388C26.875 11.8746 27.3588 11.1021 28.097 11.1021H28.4615M29.7692 13.796L28.4615 11.1021M29.7692 13.796L31.996 12.0758C32.2411 11.8864 32.3846 11.5942 32.3846 11.2844V11.0384C32.3846 10.664 32.1754 10.3209 31.8425 10.1494L31.5348 9.99095C31.2475 9.84299 30.9064 9.84299 30.6191 9.99095L28.4615 11.1021M10.8077 23.2245V18.9681C10.8077 18.6774 10.9326 18.402 11.1629 18.2245C12.0459 17.5444 14.388 15.9267 16.0385 16.4898M10.8077 23.2245H12.7692M16.0385 16.4898C16.9124 16.788 17.0793 17.8368 18 17.8368C18.9207 17.8368 19.0876 16.788 19.9615 16.4898M16.0385 16.4898V14.4694M19.9615 16.4898C21.612 15.9267 23.9541 17.5444 24.8371 18.2245C25.0674 18.402 25.1923 18.6774 25.1923 18.9681V23.2245M19.9615 16.4898V14.4694M25.1923 23.2245H23.2308M12.7692 23.2245V21.1405C12.7692 20.766 12.9785 20.4229 13.3114 20.2514L13.6977 20.0525C13.94 19.9277 14.2226 19.9072 14.4803 19.9957L18 21.2041M12.7692 23.2245H18M18 21.2041L21.5197 19.9957C21.7774 19.9072 22.06 19.9277 22.3023 20.0525L22.6886 20.2514C23.0215 20.4229 23.2308 20.766 23.2308 21.1405V23.2245M18 21.2041V23.2245M23.2308 23.2245H18M16.0385 14.4694H19.9615M16.0385 14.4694L14.5109 13.4205C14.2392 13.234 14.0769 12.9256 14.0769 12.5961V11.7756M19.9615 14.4694L21.4891 13.4205C21.7608 13.234 21.9231 12.9256 21.9231 12.5961V11.7756M14.0769 8.40822C14.0769 8.40822 14.0187 11.8154 14.0677 7.97322C14.1167 4.131 21.9355 4.03499 21.9138 7.97322C21.8922 11.9114 21.9231 8.40822 21.9231 8.40822M14.0769 8.40822V11.7756M14.0769 8.40822H12.1154M14.0769 11.7756H12.4615C11.9093 11.7756 11.4615 11.3278 11.4615 10.7756V9.06207C11.4615 8.70096 11.7543 8.40822 12.1154 8.40822V8.40822M21.9231 8.40822V11.7756M21.9231 8.40822H23.8846M21.9231 11.7756H23.5385C24.0907 11.7756 24.5385 11.3278 24.5385 10.7756V9.06207C24.5385 8.70096 24.2457 8.40822 23.8846 8.40822V8.40822M19.3077 10.4286V9.08169M16.6923 10.4286V9.08169M16.6923 12.449H19.3077M12.1154 8.40822C12.1154 8.40822 12.1154 7.73468 12.1154 5.71428C12.1154 2.86944 15.238 1 18 1C20.762 1 23.8846 2.86944 23.8846 5.71428C23.8846 7.73468 23.8846 8.40822 23.8846 8.40822" stroke="black" />
                        </svg>
                    </div>
                    <div className="ml-4 flex flex-col justify-center">
                        <div className="font-bold text-xl">{TranslatedSubjectTypes[type]}</div>
                        <div className="text-tgrey">{createdByFIO}</div>
                    </div>
                </div>
                <div className="mt-2">
                    <div className="font-medium text-xl">{title}</div>
                    <div className="text-tgrey mt-1">{`Последнее обновление: ${new Date(updatedAt).toLocaleString()}`}</div>
                </div>
            </Link>
        </div>
    )
}
