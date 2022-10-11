import React, { useState } from 'react'
import { ITableSelectRequest } from '../../types/api';

export default function TableSelectBlock() {
    const [tableData, setTableData] = useState<ITableSelectRequest>({
        id: ""
    });

    const onSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setTableData(prev => ({ ...prev, id: e.target.value }))
    }

    const onCreate = () => {

    }

    return (
        <div className="space-y-4 bg-white rounded-lg p-6 shadow-sm">
            <div className="font-bold text-2xl ml-1">Выберите таблицу</div>
            <div className="flex flex-col">
                <div className="flex items-center mb-1">
                    <label className="font-bold ml-2 text-sm" htmlFor="">Таблица</label>
                </div>
                <div className="bg-grey pr-2 rounded-lg overflow-hidden">
                    <select name="title" className="w-full bg-grey px-3 outline-none h-8 placeholder-black" value={tableData.id} onChange={onSelectChange}>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                    </select>
                </div>
            </div>
            <button className="bg-mred rounded-lg text-white px-3 h-8 text-sm font-bold leading-8" onClick={onCreate}>Открыть таблицу</button>
        </div>
    )
}
