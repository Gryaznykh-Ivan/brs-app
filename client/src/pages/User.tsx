import React from 'react'
import { useParams } from 'react-router-dom';
import BackBlock from '../components/BackBlock';
import UserProfile from '../components/users/UserProfile';
import { useGetUserQuery } from '../services/userService';

export default function User() {
    const { id } = useParams()
    const { data } = useGetUserQuery({ id: id || "" });
    if (data === undefined) return <></>

    const { data: user } = data;

    return (
        <div className="flex-1 space-y-4">
            <BackBlock />
            <UserProfile
                fullname={user.FIO}
                birthday={user.birthday && new Date(user.birthday).toLocaleDateString()}
                email={user.email}
                image={process.env.PUBLIC_URL + "/static/images/profile.png"}
                group={user.group}
                position={user.role}
            />
        </div>
    )
}
