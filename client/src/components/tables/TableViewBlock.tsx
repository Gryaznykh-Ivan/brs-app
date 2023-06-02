import React, { useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom';
import { useGetTableByIdQuery } from '../../services/tableService';
import { ITable, ITableStudent } from '../../types/api';

type TableViewData = ITable & { students: (ITableStudent & { sumOfMarks: number })[] }

export default function TableBlock() {
    const { id = "" } = useParams()
    const { data } = useGetTableByIdQuery({ id })

    const view = useMemo<TableViewData | undefined>(() => {
        if (data?.data !== undefined) {
            const studentsWithSumOfMarks = data.data.students.map(student => ({
                ...student,
                sumOfMarks: data.data.marks.reduce((result, mark) => mark.userId === student.id ? result + mark?.value : result, 0)
            }))

            return {
                ...data.data,
                students: studentsWithSumOfMarks.sort((a, b) => b.sumOfMarks - a.sumOfMarks),
            }
        }

        return undefined
    }, [data?.data])

    return (
        <div className="space-y-4 bg-white rounded-lg p-6 shadow-sm">
            {view && <>
                <div className="flex space-x-4 overflow-x-auto whitespace-nowrap max-w-[992px] pb-2">
                    <div className="flex flex-col space-y-2">
                        <div className="font-bold p-1">Студент</div>
                        {view.students.map(student => <div key={student.id} className="p-1">{student.FIO}</div>)}
                    </div>
                    {view.columns.map(column => (
                        <div className="flex flex-col space-y-2 justify-center min-w-[35px]" key={column.id}>
                            <div className="font-bold p-1">{column.title}</div>
                            {view.students.map(student =>
                                <div className="p-1 bg-grey rounded-md text-center h-7" key={student.id}>{view.marks.find(mark => mark.columnId === column.id && mark.userId === student.id)?.value}</div>
                            )}

                        </div>
                    ))}
                    <div className="flex flex-col space-y-2 justify-center min-w-[35px]">
                        <div className="font-bold p-1">Итог</div>
                        {view.students.map(student =>
                            <div className="p-1 text-center h-7" key={student.id}>{view.marks.reduce((result, mark) => mark.userId === student.id ? result + mark?.value : result, 0)}</div>
                        )}
                    </div>
                </div>
            </>}
        </div>
    )
}
