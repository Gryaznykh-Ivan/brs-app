import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useChangeSubjectSettingsMutation, useGetSubjectQuery } from '../../services/subjectService';
import { IErrorResponse, ISubjectSettingsChangeRequest } from '../../types/api';

export default function SubjectSettingsBlock() {
    const { id = "" } = useParams();
    const [subjectData, setSubjectData] = useState<ISubjectSettingsChangeRequest>({
        initialId: id,
        title: "",
        type: "DISCIPLINE"
    });

    const [changeSubjectSettings, { isSuccess: isChangeSubjectSuccess, error }] = useChangeSubjectSettingsMutation();
    const { isSuccess: isSubjectGetSuccess, data } = useGetSubjectQuery({ id: id || "" });

    const getSubjectInfo = useCallback(() => {
        return {
            initialId: id,
            title: data?.data.title || "",
            type: data?.data.type || "DISCIPLINE",
        }
    }, [data]);

    const memmorizedUserInfo = useMemo(getSubjectInfo, [data, getSubjectInfo]);

    useEffect(() => {
        if (isSubjectGetSuccess === true) {
            setSubjectData(getSubjectInfo())
        }
    }, [isSubjectGetSuccess, data, getSubjectInfo])

    useEffect(() => {
        if (isChangeSubjectSuccess === true) {
            toast.success("Данные успешно изменены");
        }
    }, [isChangeSubjectSuccess])


    const isButtonActive = Object.values(memmorizedUserInfo).join("") !== Object.values(subjectData).join("")

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSubjectData(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const onChangeUserSettings = () => {
        changeSubjectSettings(subjectData);
    }

    return (
        <div className="relative bg-white rounded-lg p-6 divide-y-[1px] shadow-md">
            <div className="space-y-4 mb-4">
                <div className="text-2xl font-bold">Настройки дисциплины</div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col">
                        <div className="flex items-center mb-1">
                            <label className="font-bold ml-2 text-sm" htmlFor="">Тип дисциплины</label>
                        </div>
                        <input type="text" list="type" name="type" className="bg-grey rounded-lg px-3 outline-none h-8 placeholder-black" placeholder="Тип дисциплины" value={subjectData.type} onChange={onInputChange} />
                        <datalist id="type">
                            <option value="ELECTIVE_COURSE" />
                            <option value="DISCIPLINE" />
                        </datalist>
                    </div>
                    <div className="flex flex-col">
                        <div className="flex items-center mb-1">
                            <label className="font-bold ml-2 text-sm" htmlFor="">Название</label>
                        </div>
                        <input type="text" name="title" className="bg-grey rounded-lg px-3 outline-none h-8 placeholder-black" min={1} max={6} placeholder="Название" value={subjectData.title} onChange={onInputChange} />
                    </div>
                </div>
                {(error && "status" in error) &&
                    <div className="text-mred font-semibold">{(error.data as IErrorResponse).error}</div>
                }
            </div>
            <div className="flex h-8 pt-4 box-content">
                <button className={`bg-${isButtonActive ? "mred" : "grey"} rounded-lg text-${isButtonActive ? "white" : "tgrey"} font-bold px-3 text-sm`} disabled={!isButtonActive} onClick={onChangeUserSettings}>Применить</button>
            </div>
        </div>
    )
}
