import React, { useEffect, useState } from 'react'
import SearchBlock from '../../components/SearchBlock';
import SubjectCard from '../../components/subjects/SubjectCard';
import { useLazyGetSubjectSearchQuery } from '../../services/subjectService';

export default function Subjects() {
    const [getSubjectSearch, { data }] = useLazyGetSubjectSearchQuery();
    const [query, setQuery] = useState({
        q: "",
        limit: 10,
        skip: 0
    })

    useEffect(() => {
        getSubjectSearch(query)
    }, [query])

    const onSearch = (q: string) => {
        setQuery(prev => ({ ...prev, q, skip: 0 }))
    }

    const onLoadMore = () => {
        setQuery(prev => ({ ...prev, skip: prev.limit + prev.skip }))
    }

    return (
        <div className="flex-1 space-y-4">
            <SearchBlock
                name="Дисциплины"
                buttons={[{
                    name: "Создать",
                    color: "bg-green-600",
                    link: "/subjects/create"
                }]}
                onSearch={onSearch}
            />
            {data && <>
                {data.data.length === 0 && <div className="bg-white rounded-lg p-4 shadow-md text-xl text-center">По вашему запросу ничего не найдено</div>}
                {data.data.length !== 0 &&
                    <div className="grid grid-cols-2 gap-4">
                        {data.data.map(subject =>
                            <SubjectCard
                                key={subject.id}
                                id={subject.id}
                                createdByFIO={subject.createdByFIO}
                                title={subject.title}
                                type={subject.type}
                                updatedAt={subject.updatedAt}
                            />

                        )}
                    </div>
                }
                {data.data.length === query.limit && <button className="w-full h-10 text-xl text-tgrey hover:bg-gray-200 transition-colors rounded-xl" onClick={onLoadMore}>Показать другие результаты</button>}
            </>}
        </div>
    )
}
