import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import BackBlock from '../../components/BackBlock'
import SearchBlock from '../../components/SearchBlock';
import UserCard from '../../components/users/UserCard';
import { useAddStudentToGroupMutation } from '../../services/groupService';
import { useLazyGetUserSearchQuery } from '../../services/userService';
import { IErrorResponse, UserRoles } from '../../types/api';

export default function GroupAddStudents() {
    const { id="" } = useParams()
    const [getUserSearch, { data }] = useLazyGetUserSearchQuery();
    const [addStudentToGroup, { error: addStudentToGroupError }] = useAddStudentToGroupMutation();
    const [query, setQuery] = useState({
        q: "",
        limit: 10,
        skip: 0
    })

    useEffect(() => {
        getUserSearch(query)
    }, [query])

    useEffect(() => {
        if (addStudentToGroupError && "status" in addStudentToGroupError) {
            toast.error((addStudentToGroupError.data as IErrorResponse).error)
        }
    }, [addStudentToGroupError])

    const onSearch = (q: string) => {
        setQuery(prev => ({ ...prev, q, skip: 0 }))
    }

    const onAddStudentToGroup = (userId: string) => {
        addStudentToGroup({ id, userId })
    }

    const onLoadMore = () => {
        setQuery(prev => ({ ...prev, skip: prev.limit + prev.skip }))
    }

    return (
        <div className="flex-1 space-y-4">
            <BackBlock />
            <SearchBlock
                name="Добавление в группу"
                buttons={[]}
                onSearch={onSearch}
            />
            {data && <>
                <div className="bg-white rounded-lg p-4 shadow-md space-y-2">
                    {data.data.length === 0 && <div className="text-xl text-center">По вашему запросу ничего не найдено</div>}
                    {data.data.map(user =>
                        <UserCard
                            key={user.id}
                            id={user.id}
                            position={user.role}
                            FIO={user.FIO}
                            group={user.group}
                            isDeletable={false}
                            isEditable={false}
                            onDelete={() => { }}
                            buttons={
                                user.group === null
                                    ? user.role !== UserRoles.TEACHER 
                                        ? [{
                                            name: "Добавить",
                                            color: "bg-green-600",
                                            callback: onAddStudentToGroup
                                        }]
                                        : []
                                    : [{
                                        name: "Уже имеет группу",
                                        color: "bg-gray-400",
                                        disabled: true
                                    }]
                            }
                        />
                    )}
                </div>

                {data.data.length === query.limit && <button className="w-full h-10 text-xl text-tgrey hover:bg-gray-200 transition-colors rounded-xl" onClick={onLoadMore}>Показать другие результаты</button>}
            </>}
        </div>
    )
} 
