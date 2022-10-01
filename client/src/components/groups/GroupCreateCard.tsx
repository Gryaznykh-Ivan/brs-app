import React, { useState } from 'react'

interface IProps {
    onCreate: (id: string) => void
}

export default function GroupCreateCard({ onCreate }: IProps) {
    const [id, setId] = useState<string>("")

    const onCreateEvent = () => {
        onCreate(id);
        setId("");
    }

    return (
        <div className="flex bg-white rounded-lg p-2 shadow-sm">
            <img className="w-12 h-12 bg-grey rounded-full" src={process.env.PUBLIC_URL + `/static/images/group.png`} alt="" />
            <div className="ml-4 flex flex-col justify-center">
                <input type="text" className="bg-grey rounded-lg px-2 py-1 outline-none" placeholder="Введите номер группу" maxLength={4} value={ id } onChange={ e => setId(e.target.value) } />
            </div>
            <div className="flex flex-1 justify-end items-center space-x-2">
                <button className="bg-green-600 rounded-lg text-white px-3 h-8 text-sm font-bold leading-8" onClick={onCreateEvent}>Создать</button>
            </div>
        </div>
    )
}
