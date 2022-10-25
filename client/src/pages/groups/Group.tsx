import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import BackBlock from '../../components/BackBlock'
import GroupHeaderBlock from '../../components/groups/GroupHeaderBlock'
import GroupSettingsBlock from '../../components/groups/GroupSettingsBlock'
import UserCard from '../../components/users/UserCard'
import { useAppSelector } from '../../hooks/store'
import { useGetGroupQuery, useRemoveGroupMutation, useRemoveStudentFromGroupMutation } from '../../services/groupService'
import { UserRoles } from '../../types/api'

export default function Group() {
    const auth = useAppSelector(state => state.auth.payload)
    const navigate = useNavigate()
    const { id = "" } = useParams()
    const { data } = useGetGroupQuery({ id })

    const [removeGroup, { isSuccess: isGroupRemoved }] = useRemoveGroupMutation()
    const [removeStudentFromGroup, { isSuccess: isStudentRemovedFromGroup }] = useRemoveStudentFromGroupMutation()

    useEffect(() => {
        if (isGroupRemoved === true) {
            navigate("/groups")
            toast.success("Группа успешно удалена")
        }
    }, [isGroupRemoved])

    useEffect(() => {
        if (isStudentRemovedFromGroup === true) {
            toast.success("Стедент успешно удалена из группы")
        }
    }, [isStudentRemovedFromGroup])

    const onStudentRemoveFromGroup = (userId: string) => {
        removeStudentFromGroup({ id, userId })
    }
    const onDelete = (id: string) => {
        removeGroup({ id })
    }

    return (
        <div className="flex-1 space-y-4">
            <BackBlock />
            {data && auth && <>
                <GroupHeaderBlock
                    id={id}
                    studentsCount={data?.data.students.length}
                    isAddable={auth.role === UserRoles.ADMIN}
                    isDeletable={auth.role === UserRoles.ADMIN}
                    onDelete={onDelete}
                />
                <div className="bg-white rounded-lg p-4 shadow-md space-y-2">
                    {data.data.students.length === 0 && <div className="text-xl text-center">В этой группе еще нет студентов</div>}
                    {data.data.students.map(student => <UserCard
                        key={student.id}
                        id={student.id}
                        position={student.role}
                        FIO={student.FIO}
                        group={student.groupId}
                        isDeletable={auth.role === UserRoles.ADMIN}
                        isEditable={false}
                        onDelete={onStudentRemoveFromGroup}
                    />)}
                </div>
                {auth.role === UserRoles.ADMIN &&
                    <GroupSettingsBlock />
                }
            </>}
        </div>
    )
}
