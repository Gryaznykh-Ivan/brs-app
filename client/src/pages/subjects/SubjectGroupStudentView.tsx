import React from 'react'
import { useParams } from 'react-router-dom'
import BackBlock from '../../components/BackBlock'
import SubjectHeaderBlock from '../../components/subjects/SubjectHeaderBlock'
import TableSelectStudentViewBlock from '../../components/tables/TableSelectStudentViewBlock'
import { useGetSubjectQuery } from '../../services/subjectService'
import { TranslatedSubjectTypes } from '../../types/api'

export default function SubjectGroupStudentView() {
    const { subjectId = "" } = useParams()
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
                        description={TranslatedSubjectTypes[data.data.type]}
                        isButtons={false}
                        onDelete={() => { }}
                    />
                    <TableSelectStudentViewBlock />
                </>
            }
        </div>
    )
}
