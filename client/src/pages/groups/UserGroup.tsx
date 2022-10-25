import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import GroupHeaderBlock from '../../components/groups/GroupHeaderBlock'
import UserCard from '../../components/users/UserCard'
import { useAppSelector } from '../../hooks/store'
import { useGetUserGroupQuery, useRemoveStudentFromGroupMutation } from '../../services/groupService'
import { UserRoles } from '../../types/api'

export default function Group() {
    const auth = useAppSelector(state => state.auth.payload)
    const { data, isError } = useGetUserGroupQuery({ id: auth?.id || "" })

    const [removeStudentFromGroup, { isSuccess: isStudentRemovedFromGroup }] = useRemoveStudentFromGroupMutation()

    useEffect(() => {
        if (isStudentRemovedFromGroup === true) {
            toast.success("Стедент успешно удалена из группы")
        }
    }, [isStudentRemovedFromGroup])

    const onStudentRemoveFromGroup = (userId: string) => {
        if (data !== undefined) {
            removeStudentFromGroup({ id: data.data.id, userId })
        }
    }

    return (
        <div className="flex-1 space-y-4">
            {(!data || isError === true) && <div className="bg-white rounded-lg p-4 shadow-md space-y-2"><div className="text-xl text-center">У вас еще нет группы</div></div>}
            {(data && isError === false) && auth && <>
                <GroupHeaderBlock
                    id={data.data.id}
                    studentsCount={data.data.students.length}
                    isAddable={auth.role === UserRoles.HEADMAN}
                    isDeletable={false}
                    onDelete={() => { }}
                />
                <div className="bg-white rounded-lg p-4 shadow-md space-y-2">
                    {data.data.students.length === 0 && <div className="text-xl text-center">В этой группе еще нет студентов</div>}
                    {data.data.students.map(student => <UserCard
                        key={student.id}
                        id={student.id}
                        position={student.role}
                        FIO={student.FIO}
                        group={student.groupId}
                        isDeletable={auth.role === UserRoles.HEADMAN}
                        isEditable={false}
                        onDelete={onStudentRemoveFromGroup}
                    />)}
                </div>
            </>}
        </div>
    )
}
