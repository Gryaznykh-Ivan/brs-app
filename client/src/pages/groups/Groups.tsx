import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import GroupCard from '../../components/groups/GroupCard'
import GroupCreateCard from '../../components/groups/GroupCreateCard'
import SearchBlock from '../../components/SearchBlock'
import { useAppSelector } from '../../hooks/store'
import { useCreateGroupMutation, useLazyGetGroupSearchQuery, useRemoveGroupMutation } from '../../services/groupService'
import { IErrorResponse, UserRoles } from '../../types/api'

export default function Groups() {
    const auth = useAppSelector(state => state.auth.payload)
    const [createGroup, { isSuccess: isGroupCreated, error }] = useCreateGroupMutation()
    const [removeGroup, { isSuccess: isGroupRemoved }] = useRemoveGroupMutation()
    const [getGroupSearch, { data }] = useLazyGetGroupSearchQuery();
    const [query, setQuery] = useState({
        q: "",
        limit: 9,
        skip: 0
    })

    useEffect(() => {
        if (isGroupRemoved === true) {
            toast.success("Группа успешно удалена")
        }
    }, [isGroupRemoved])

    useEffect(() => {
        if (isGroupCreated === true) {
            toast.success("Группа успешно создана")
        } else if (error !== undefined) {
            if ("status" in error) {
                toast.error((error.data as IErrorResponse).error)
            }
        }
    }, [isGroupCreated, error])


    useEffect(() => {
        getGroupSearch(query)
    }, [query])

    const onDelete = (id: string) => {
        removeGroup({ id });
    }

    const onCreate = (id: string) => {
        createGroup({ id });
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
                name="Группы"
                buttons={[]}
                onSearch={onSearch}
            />
            {data && auth && <>
                <div className="grid grid-cols-2 gap-2">

                    {auth.role === UserRoles.ADMIN &&
                        <GroupCreateCard
                            onCreate={onCreate}
                        />
                    }

                    {data.data.map(group => <GroupCard
                        key={group.id}
                        id={group.id}
                        studentCount={group.studentsCount}
                        isDeletable={ auth.role === UserRoles.ADMIN }
                        onDelete={onDelete}
                    />)}

                </div>
                {data.data.length === query.limit && <button className="w-full h-10 text-xl text-tgrey hover:bg-gray-200 transition-colors rounded-xl" onClick={onLoadMore}>Показать другие результаты</button>}
            </>}
        </div>
    )
}
