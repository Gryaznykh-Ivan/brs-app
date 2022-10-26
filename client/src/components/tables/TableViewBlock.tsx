import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { useGetTableByIdQuery } from '../../services/tableService';


export default function TableBlock() {
    const { id = "" } = useParams()
    const { data } = useGetTableByIdQuery({ id })

    return (
        <div className="space-y-4 bg-white rounded-lg p-6 shadow-sm">
            {data && <>

                <div className="flex space-x-4 overflow-x-auto whitespace-nowrap max-w-[992px] pb-2">
                    <div className="flex flex-col space-y-2">
                        <div className="font-bold p-1">Студент</div>
                        {data.data.students.map(student => <div key={student.id} className="p-1">{student.FIO}</div>)}
                    </div>
                    {data.data.columns.map(column => (
                        <div className="flex flex-col space-y-2 justify-center min-w-[35px]" key={column.id}>
                            <div className="font-bold p-1">{ column.title }</div>
                            {data.data.students.map(student =>
                                <div className="p-1 bg-grey rounded-md text-center h-7" key={ student.id }>{ data.data.marks.find(mark => mark.columnId === column.id && mark.userId === student.id)?.value }</div>
                            )}
                        </div>
                    ))}
                </div>
            </>}
        </div>
    )
}
