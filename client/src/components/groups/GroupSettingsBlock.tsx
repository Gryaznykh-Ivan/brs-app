import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import useDidMount from '../../hooks/useDidMount';
import { useChangeGroupSettingsMutation, useGetGroupQuery } from '../../services/groupService';
import { IErrorResponse, IGroupSettingsChangeRequest } from '../../types/api';

export default function GroupSettingsBlock() {
    const { id="" } = useParams();
    const didMount = useDidMount();
    const navigate = useNavigate();
    const [groupData, setGroupData] = useState<IGroupSettingsChangeRequest>({
        initialId: id,
        id: id || "",
        faculty: "",
        foundingDate: ""
    });

    const [changeGroupSettings, { isSuccess: isChangeGroupSuccess, error }] = useChangeGroupSettingsMutation();
    const { isSuccess: isGroupGetSuccess, isError: isGroupGetError, data } = useGetGroupQuery({ id: id || "" });

    const getGroupInfo = useCallback(() => {
        return {
            initialId: id,
            id: id,
            faculty: data?.data.faculty || "",
            foundingDate: data?.data.foundingDate?.slice(0, 10) || "",
        }
    }, [data]);

    const memmorizedUserInfo = useMemo(getGroupInfo, [data, getGroupInfo]);

    useEffect(() => {
        if (isGroupGetSuccess === true) {
            setGroupData(getGroupInfo())
        }
    }, [isGroupGetSuccess, data, getGroupInfo])

    useEffect(() => {
        if (isGroupGetError === true && didMount === true) {
            toast.error(`Группа ${ id } не найдена`);
            navigate("/groups");
        }
    }, [isGroupGetError])

    useEffect(() => {
        if (isChangeGroupSuccess === true) {
            navigate(`/groups/${ groupData.id }`, { replace: true });
            toast.success("Данные успешно изменены");
        }
    }, [isChangeGroupSuccess])


    const isButtonActive = Object.values(memmorizedUserInfo).join("") !== Object.values(groupData).join("")

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setGroupData(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const onChangeUserSettings = () => {
        changeGroupSettings(groupData);
    }

    return (
        <div className="relative bg-white rounded-lg p-6 divide-y-[1px] shadow-md">
            <div className="space-y-4 mb-4">
                <div className="text-2xl font-bold">Настройки группы { id }</div>

                <div className="grid grid-cols-3 gap-4">
                    <div className="flex flex-col">
                        <div className="flex items-center mb-1">
                            <label className="font-bold ml-2 text-sm" htmlFor="">Группа</label>
                        </div>
                        <input type="text" name="id" className="bg-grey rounded-lg px-3 outline-none h-8 placeholder-black" placeholder="Группа" value={groupData.id} onChange={onInputChange} />
                    </div>
                    <div className="flex flex-col">
                        <div className="flex items-center mb-1">
                            <label className="font-bold ml-2 text-sm" htmlFor="">Факультет</label>
                        </div>
                        <input type="number" name="faculty" className="bg-grey rounded-lg px-3 outline-none h-8 placeholder-black" min={1} max={6} placeholder="Факультет" value={groupData.faculty} onChange={onInputChange} />
                    </div>
                    <div className="flex flex-col">
                        <div className="flex items-center mb-1">
                            <label className="font-bold ml-2 text-sm" htmlFor="">Дата формирования</label>
                        </div>
                        <input type="date" name="foundingDate" className="bg-grey rounded-lg px-3 outline-none h-8 placeholder-black" placeholder="Дата формирования" value={groupData.foundingDate} onChange={onInputChange} />
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
