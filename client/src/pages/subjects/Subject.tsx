import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import BackBlock from '../../components/BackBlock'
import GroupCard from '../../components/groups/GroupCard'
import SubjectHeaderBlock from '../../components/subjects/SubjectHeaderBlock'
import { useGetSubjectQuery, useRemoveGroupFromSubjectMutation, useRemoveSubjectMutation } from '../../services/subjectService'

export default function Subject() {
    const navigate = useNavigate()
    const { id = "" } = useParams()
    const { data } = useGetSubjectQuery({ id })

    const [removeSubject, { isSuccess: isSubjectRemoved }] = useRemoveSubjectMutation()
    const [removeGroupFromSubject, { isSuccess: isGroupRemovedFromSubject }] = useRemoveGroupFromSubjectMutation()

    useEffect(() => {
        if (isSubjectRemoved === true) {
            navigate("/subjects")
            toast.success("Дисциплина успешно удалена")
        }
    }, [isSubjectRemoved])

    useEffect(() => {
        if (isGroupRemovedFromSubject === true) {
            toast.success("Группа успешно удалена из дисциплины")
        }
    }, [isGroupRemovedFromSubject])

    const onGroupRemoveFromSubject = (groupId: string) => {
        removeGroupFromSubject({ id, groupId })
    }
    const onDelete = (id: string) => {
        removeSubject({ id })
    }

    return (
        <div className="flex-1 space-y-4">
            <BackBlock />
            {data && <>
                <SubjectHeaderBlock
                    key={data.data.id}
                    id={data.data.id}
                    title={data.data.title}
                    createdByFIO={data.data.createdByFIO}
                    onDelete={onDelete}
                />
                <div className="grid grid-cols-2 gap-2">

                    {data.data.Groups.map(group => <GroupCard
                        key={ group.id }
                        id={ group.id }
                        studentCount={ group.studentsCount }
                        isDeletable={ true }
                        onDelete={onGroupRemoveFromSubject}
                    />)}
                </div>
            </>}
        </div>
    )
}
