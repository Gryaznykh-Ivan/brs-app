import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useGetTableNamesQuery } from '../../services/tableService';
import { ITableSelectRequest } from '../../types/api';

export default function TableSelectBlock() {
    const navigate = useNavigate()
    const { groupId = "", subjectId = "" } = useParams()
    const { data } = useGetTableNamesQuery({ groupId, subjectId })
    const [tableData, setTableData] = useState<ITableSelectRequest>({
        id: ""
    });

    useEffect(() => {
        setTableData(prev => ({ ...prev, id: data?.data[0]?.id || "" }))
    }, [data])

    const onSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setTableData(prev => ({ ...prev, id: e.target.value }))
    }

    const onOpen = () => {
        if (tableData.id !== "") {
            navigate(`/table/${ tableData.id }`)
        } else {
            toast.error("Таблица не выбрана")
        }
    }

    return (
        <div className="space-y-4 bg-white rounded-lg p-6 shadow-sm">
            {data && <>
                <div className="font-bold text-2xl ml-1">Выберите таблицу</div>
                <div className="flex flex-col">
                    <div className="flex items-center mb-1">
                        <label className="font-bold ml-2 text-sm" htmlFor="">Таблица</label>
                    </div>
                    <div className="bg-grey pr-2 rounded-lg overflow-hidden">
                        <select name="title" className="w-full bg-grey px-3 outline-none h-8 placeholder-black" value={tableData.id} onChange={onSelectChange}>
                            { data.data.map(option => (<option key={ option.id } value={ option.id }>{ option.title }</option>)) }
                            { data.data.length === 0 && <option value="" disabled hidden>Нет ни одной таблицы</option> }
                        </select>
                    </div>
                </div>
                <button className="bg-mred rounded-lg text-white px-3 h-8 text-sm font-bold leading-8" onClick={onOpen}>Открыть таблицу</button>
            </>}
        </div>
    )
}
