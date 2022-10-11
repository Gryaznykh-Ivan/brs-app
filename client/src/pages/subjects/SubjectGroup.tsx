import React from 'react'
import { useParams } from 'react-router-dom'
import BackBlock from '../../components/BackBlock'
import SubjectHeaderBlock from '../../components/subjects/SubjectHeaderBlock'
import TableCreateBlock from '../../components/tables/TableCreateBlock'
import TableSelectBlock from '../../components/tables/TableSelectBlock'
import { useGetSubjectQuery } from '../../services/subjectService'

export default function SubjectGroup() {
    const { subjectId = "", groupId = "" } = useParams()
    const { data } = useGetSubjectQuery({ id: subjectId })

    return (
        <div className="flex-1 space-y-4">
            <BackBlock />
            {data &&
                <>
                    <SubjectHeaderBlock
                        key={data.data.id}
                        id={data.data.id}
                        title={data.data.title}
                        description={`Группа ${groupId}`}
                        isButtons={false}
                        onDelete={() => { }}
                    />
                    <div className="grid grid-cols-2 gap-4">
                        <TableCreateBlock />
                        <TableSelectBlock />
                    </div>
                </>
            }
        </div>
    )
}
