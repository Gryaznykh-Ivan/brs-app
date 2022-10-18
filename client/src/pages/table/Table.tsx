import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import BackBlock from '../../components/BackBlock'
import TableBlock from '../../components/tables/TableBlock'
import TableHeaderBlock from '../../components/tables/TableHeaderBlock'
import { useGetTableByIdQuery, useRemoveTableMutation } from '../../services/tableService'

export default function Table() {
    const { id = "" } = useParams()
    const navigate = useNavigate()
    const { data } = useGetTableByIdQuery({ id })
    const [removeTable, { isSuccess: isRemoveTableSuccess }] = useRemoveTableMutation()

    useEffect(() => {
        if (isRemoveTableSuccess === true) {
            navigate(-1)
            toast.success("Таблица успешно удалена")
        }
    }, [isRemoveTableSuccess])

    const onDelete = (id: string) => {
        removeTable({ id })
    }

    return (
        <div className="relative">
            <div className=" container flex py-4">
                <div className="flex-1 space-y-4">
                    <BackBlock />
                    {data && <>
                        <TableHeaderBlock
                            id={data.data.id}
                            title={data.data.title}
                            description={`${ data.data.subjectTitle }: Группа ${data.data.groupId}`}
                            isButtons={true}
                            onDelete={onDelete}
                        />
                        <TableBlock />
                    </>}
                </div>
            </div>
        </div>
    )
}
