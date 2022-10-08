import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import BackBlock from '../../components/BackBlock';
import GroupCard from '../../components/groups/GroupCard';
import SearchBlock from '../../components/SearchBlock';
import { useLazyGetGroupSearchQuery } from '../../services/groupService';
import { useAddGroupToSubjectMutation } from '../../services/subjectService';
import { IErrorResponse } from '../../types/api';

export default function SubjectAddGroups() {
    const { id = "" } = useParams()
    const [getGroupSearch, { data }] = useLazyGetGroupSearchQuery();
    const [addGroupToSubject, { error: addGroupToSubjectError }] = useAddGroupToSubjectMutation();
    const [query, setQuery] = useState({
        q: "",
        limit: 10,
        skip: 0,
        exclude: id
    })

    useEffect(() => {
        getGroupSearch(query)
    }, [query])

    useEffect(() => {
        if (addGroupToSubjectError && "status" in addGroupToSubjectError) {
            toast.error((addGroupToSubjectError.data as IErrorResponse).error)
        }
    }, [addGroupToSubjectError])

    const onSearch = (q: string) => {
        setQuery(prev => ({ ...prev, q, skip: 0 }))
    }

    const onAddGroupToSubject = (groupId: string) => {
        addGroupToSubject({ id, groupId })
    }

    const onLoadMore = () => {
        setQuery(prev => ({ ...prev, skip: prev.limit + prev.skip }))
    }

    return (
        <div className="flex-1 space-y-4">
            <BackBlock />
            <SearchBlock
                name="Добавление группы"
                buttons={[]}
                onSearch={onSearch}
            />
            {data && <>
                {data.data.length === 0 && <div className="bg-white rounded-lg p-4 shadow-md text-xl text-center">Нет групп доступных к добавлению</div>}

                <div className="grid grid-cols-2 gap-2">
                    {data.data.map(group => <GroupCard
                        key={group.id}
                        id={group.id}
                        studentCount={group.studentsCount}
                        isDeletable={false}
                        onDelete={() => { }}
                        buttons={
                            [{
                                name: "Добавить",
                                color: "bg-green-600",
                                callback: onAddGroupToSubject
                            }]
                        }
                    />)}
                </div>

                {data.data.length === query.limit && <button className="w-full h-10 text-xl text-tgrey hover:bg-gray-200 transition-colors rounded-xl" onClick={onLoadMore}>Показать другие результаты</button>}
            </>}
        </div>
    )
}
