import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { useAppSelector } from '../../hooks/store';
import { useCreateSubjectMutation } from '../../services/subjectService';
import { IErrorResponse, ISubjectCreateRequest } from '../../types/api';

export default function SubjectCreateBlock() {
    const auth = useAppSelector(state => state.auth.payload)
    const [subjectData, setSubjectData] = useState<ISubjectCreateRequest>({
        createdById: auth?.id || "",
        title: "",
        type: "DISCIPLINE"
    });

    const [createSubject, { isSuccess: isSubjectCreated, error }] = useCreateSubjectMutation();

    useEffect(() => {
        if (isSubjectCreated === true) {
            toast.success("Дисциплина успешно создан");
        }
    }, [isSubjectCreated])


    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSubjectData(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const onSubjectUser = () => {
        createSubject(subjectData);
    }

    return (
        <div className="relative bg-white rounded-lg p-6 divide-y-[1px] shadow-md">
            <div className="space-y-4 mb-4">
                <div className="text-2xl font-bold">Создание дисциплины</div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col">
                        <div className="flex items-center mb-1">
                            <svg className="mb-1" width="7" height="7" viewBox="0 0 5 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1.95 0.274999L2.325 0.904999L2.595 1.745L2.91 0.89L3.27 0.289999L3.99 0.68L3.6 1.325L2.91 2.045L3.93 1.865H4.65V2.705H3.96L3 2.525L3.69 3.245L4.035 3.83L3.33 4.25L2.94 3.62L2.595 2.705L2.31 3.575L1.935 4.205L1.185 3.785L1.59 3.155L2.22 2.525L1.35 2.705H0.6V1.865H1.35L2.28 2.045L1.605 1.385L1.215 0.694999L1.95 0.274999Z" fill="#FF3131" />
                            </svg>
                            <label className="font-bold ml-2 text-sm" htmlFor="">Тип курса</label>
                        </div>
                        <input type="text" list="type" name="type" className="bg-grey rounded-lg px-3 outline-none h-8 placeholder-black" placeholder="Тип курса" value={subjectData.type} onChange={onInputChange} />
                        <datalist id="type">
                            <option value="ELECTIVE_COURSE" />
                            <option value="DISCIPLINE" />
                        </datalist>
                    </div>
                    <div className="flex flex-col">
                        <div className="flex items-center mb-1">
                            <svg className="mb-1" width="7" height="7" viewBox="0 0 5 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1.95 0.274999L2.325 0.904999L2.595 1.745L2.91 0.89L3.27 0.289999L3.99 0.68L3.6 1.325L2.91 2.045L3.93 1.865H4.65V2.705H3.96L3 2.525L3.69 3.245L4.035 3.83L3.33 4.25L2.94 3.62L2.595 2.705L2.31 3.575L1.935 4.205L1.185 3.785L1.59 3.155L2.22 2.525L1.35 2.705H0.6V1.865H1.35L2.28 2.045L1.605 1.385L1.215 0.694999L1.95 0.274999Z" fill="#FF3131" />
                            </svg>
                            <label className="font-bold ml-2 text-sm" htmlFor="">Название</label>
                        </div>
                        <input type="text" name="title" className="bg-grey rounded-lg px-3 outline-none h-8 placeholder-black" placeholder="Название" value={subjectData.title} onChange={onInputChange} />
                    </div>
                    <div className="flex flex-col">
                        <div className="flex items-center mb-1">
                            <label className="font-bold ml-2 text-sm" htmlFor="">Id создателя (автозаполнение)</label>
                        </div>
                        <input type="text" name="createdById" className="bg-grey rounded-lg px-3 outline-none h-8 placeholder-black" placeholder="Email" value={subjectData.createdById} onChange={onInputChange} disabled={ true }/>
                    </div>
                </div>
                {(error && "status" in error) &&
                    <div className="text-mred font-semibold">{(error.data as IErrorResponse).error}</div>
                }
            </div>
            <div className="flex h-8 pt-4 box-content">
                <button className={`bg-mred rounded-lg text-white font-bold px-3 text-sm`} onClick={onSubjectUser}>Создать</button>
            </div>
        </div>
    )
}
