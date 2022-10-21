import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAddColumnMutation, useChangeColumnNameMutation, useGetTableByIdQuery, useRemoveColumnMutation, useSetMarkMutation } from '../../services/tableService';
import { IErrorResponse } from '../../types/api';

type ColumnInputsType = {
    [key: string]: string;
}

type MarkInputsType = {
    [key: string]: number | null;
}

export default function TableBlock() {
    const { id = "" } = useParams()
    const { data } = useGetTableByIdQuery({ id })
    const [addColumn, { error: addColumnError, isSuccess: isAddColumnSuccess }] = useAddColumnMutation()
    const [removeColumn, { error: removeColumnError, isSuccess: isRemoveColumnSuccess }] = useRemoveColumnMutation()
    const [changeColumnName, { error: changeColumnNameError, isSuccess: isChangeColumnNameSuccess }] = useChangeColumnNameMutation()
    const [setMark, { error: setMarkError, isSuccess: isSetMarkSuccess }] = useSetMarkMutation()

    const [columnInputs, setColumnInputs] = useState<ColumnInputsType>({})
    const [markInputs, setMarkInputs] = useState<MarkInputsType>({})

    useEffect(() => {
        if (isAddColumnSuccess === true) {
            toast.success("Столбец успешно добавлен")
        } else {
            if (addColumnError && "status" in addColumnError) {
                toast.error((addColumnError.data as IErrorResponse).error)
            }
        }
    }, [isAddColumnSuccess, addColumnError])

    useEffect(() => {
        if (isRemoveColumnSuccess === true) {
            toast.success("Столбец успешно удален")
        } else {
            if (removeColumnError && "status" in removeColumnError) {
                toast.error((removeColumnError.data as IErrorResponse).error)
            }
        }
    }, [isRemoveColumnSuccess, removeColumnError])

    useEffect(() => {
        if (isChangeColumnNameSuccess === true) {
            toast.success("Название столбца успешно изменено")
        } else {
            if (changeColumnNameError && "status" in changeColumnNameError) {
                toast.error((changeColumnNameError.data as IErrorResponse).error)
            }
        }
    }, [isChangeColumnNameSuccess, changeColumnNameError])

    useEffect(() => {
        if (isSetMarkSuccess === true) {
            toast.success("Оценка успешно обновлена")
        } else {
            if (setMarkError && "status" in setMarkError) {
                toast.error((setMarkError.data as IErrorResponse).error)
            }
        }
    }, [isSetMarkSuccess, setMarkError])

    useEffect(() => {
        if (data) {
            setColumnInputs(data.data.columns.reduce<ColumnInputsType>((a, c) => {
                a[c.id] = c.title;
                return a
            }, {}))

            setMarkInputs(data.data.marks.reduce<MarkInputsType>((a, c) => {
                a[`${c.userId}${c.columnId}`] = c.value;
                return a
            }, {}))
        }
    }, [data])

    const onAddColumn = () => {
        addColumn({ tableId: id, title: "Название" })
    }

    const onRemoveColumn = (id: string) => {
        removeColumn({ id })
    }

    const onChangeColumnName = (columnId: string) => {
        changeColumnName({ tableId: id, columnId, title: columnInputs[columnId] })
    }

    const onSetMark = (columnId: string, userId: string) => {
        if (markInputs[`${userId}${columnId}`] === undefined) return;

        setMark({ tableId: id, columnId, userId, value: markInputs[`${userId}${columnId}`] })
    }

    const onMarkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (isNaN(+e.target.value) === true) return;

        if (e.target.value.length === 0) {
            setMarkInputs(prev => ({ ...prev, [e.target.name]: null }))
            return;
        }

        setMarkInputs(prev => ({ ...prev, [e.target.name]: +e.target.value }))
    }

    const onColumnNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setColumnInputs(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    return (
        <div className="space-y-4 bg-white rounded-lg p-6 shadow-sm">
            {data && <>

                <div className="flex space-x-4 overflow-x-auto whitespace-nowrap max-w-[992px] pb-2">
                    <div className="flex flex-col space-y-2">
                        <div className="font-bold p-1">Студент</div>
                        {data.data.students.map(student => <div key={student.id} className="p-1">{student.FIO}</div>)}
                        <div className="font-bold p-1">Редактирование</div>
                    </div>
                    {data.data.columns.map(column => (
                        <div className="flex flex-col space-y-2 justify-center" key={column.id}>
                            <input
                                type="text"
                                className="font-bold p-1"
                                size={columnInputs[column.id]?.length > 1 ? columnInputs[column.id].length - 1 : 1}
                                name={column.id}
                                value={columnInputs[column.id] || ""}
                                onChange={onColumnNameChange}
                                onBlur={() => onChangeColumnName(column.id)}
                            />
                            {data.data.students.map(student =>
                                <input
                                    key={student.id}
                                    type="text"
                                    className="p-1 bg-grey rounded-md text-center"
                                    size={1}
                                    name={`${student.id}${column.id}`}
                                    onChange={onMarkChange}
                                    value={markInputs[`${student.id}${column.id}`] || ""}
                                    onBlur={() => onSetMark(column.id, student.id)}
                                />
                            )}
                            <button className="flex h-full items-center justify-center hover:bg-grey rounded-md" onClick={() => onRemoveColumn(column.id)}>
                                <svg width="10" height="11" viewBox="0 0 10 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M2 3.5V9.5C2 10.0523 2.44772 10.5 3 10.5H4.75M7.5 3.5V9.5C7.5 10.0523 7.05228 10.5 6.5 10.5H4.75M4.75 10.5V5.5M0 2.5H2.5M9.5 2.5H7M2.5 2.5V2C2.5 1.44772 2.94772 1 3.5 1H6C6.55228 1 7 1.44772 7 2V2.5M2.5 2.5H7" stroke="#C02525" />
                                </svg>
                            </button>
                        </div>
                    ))}
                    <div className="flex flex-col">
                        <button className="flex h-full items-center justify-center w-10 hover:bg-grey rounded-xl" onClick={onAddColumn}>
                            <svg width="20" height="20" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="6" cy="6" r="6" fill="#00D154" />
                                <path d="M3 6L9 6" stroke="white" />
                                <path d="M6 3V9" stroke="white" />
                            </svg>
                        </button>
                    </div>
                </div>
            </>}
        </div>
    )
}
