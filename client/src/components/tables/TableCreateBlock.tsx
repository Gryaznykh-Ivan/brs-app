import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useCreateTableMutation } from '../../services/tableService';
import { IErrorResponse, ITableCreateRequest } from '../../types/api';

export default function TableCreateBlock() {
    const { groupId = "", subjectId = "" } = useParams()
    const [createTable, { isSuccess, error }] = useCreateTableMutation();
    const [tableData, setTableData] = useState<ITableCreateRequest>({
        title: "",
        groupId,
        subjectId
    });

    useEffect(() => {
        if (isSuccess === true) {
            toast.success("Таблца успешно создана");
            setTableData(prev => ({ ...prev, title: "" }))
        }
    }, [isSuccess])

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTableData(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const onCreate = () => {
        createTable(tableData);
    }

    return (
        <div className="space-y-4 bg-white rounded-lg p-6 shadow-sm">
            <div className="font-bold text-2xl ml-1">Создание таблицы</div>
            <div className="flex flex-col">
                <div className="flex items-center mb-1">
                    <label className="font-bold ml-2 text-sm" htmlFor="">Название таблицы</label>
                </div>
                <input type="text" name="title" className="bg-grey rounded-lg px-3 outline-none h-8 placeholder-black" placeholder="Название таблицы" value={tableData.title} onChange={onInputChange} />
            </div>
            {(error && "status" in error) &&
                <div className="text-mred font-semibold">{(error.data as IErrorResponse).error}</div>
            }
            <button className="bg-green-600 rounded-lg text-white px-3 h-8 text-sm font-bold leading-8" onClick={onCreate}>Создать таблицу</button>
        </div>
    )
}
