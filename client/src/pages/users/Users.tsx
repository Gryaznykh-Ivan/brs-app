import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import SearchBlock from '../../components/SearchBlock'
import UserCard from '../../components/users/UserCard'
import { useLazyGetUserSearchQuery, useRemoveUserMutation } from '../../services/userService'

export default function Users() {
    const [removeUser, { isSuccess: isUserRemoved }] = useRemoveUserMutation()
    const [getUserSearch, { data }] = useLazyGetUserSearchQuery();
    const [query, setQuery] = useState({
        q: "",
        limit: 10,
        skip: 0
    })

    useEffect(() => {
        if (isUserRemoved) {
            toast.success("Пользователь успешно удален")
        }
    }, [isUserRemoved])


    useEffect(() => {
        getUserSearch(query)
    }, [query])

    const onUserDelete = (id: string) => {
        removeUser({ id });
    }

    const onSearch = (q: string) => {
        setQuery(prev => ({ ...prev, q, skip: 0 }))
    }

    const onLoadMore = () => {
        setQuery(prev => ({ ...prev, skip: prev.limit + prev.skip }))
    }

    return (
        <div className="flex-1 space-y-4">
            <SearchBlock
                name="Пользователи"
                buttons={[{
                    name: "Создать",
                    color: "bg-green-600",
                    link: "/users/create"
                }]}
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
                            group={user.groupId}
                            isDeletable={true}
                            isEditable={true}
                            onDelete={onUserDelete}
                        />
                    )}
                </div>

                {data.data.length === query.limit && <button className="w-full h-10 text-xl text-tgrey hover:bg-gray-200 transition-colors rounded-xl" onClick={onLoadMore}>Показать другие результаты</button>}
            </>}
        </div>
    )
}
