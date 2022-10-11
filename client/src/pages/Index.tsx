import UserProfile from '../components/users/UserProfile'
import { useAppSelector } from '../hooks/store';
import { useGetUserQuery } from '../services/userService'

export default function Index() {
    const { payload } = useAppSelector(state => state.auth);
    const { data } = useGetUserQuery({ id: payload?.id as string });
    if (data === undefined) return <></>

    const { data: user } = data;

    return (
        <div className="flex-1 space-y-4">
            <UserProfile
                fullname={user.FIO}
                birthday={user.birthday && new Date(user.birthday).toLocaleDateString()}
                email={user.email}
                group={user.groupId}
                position={user.role}
            />
        </div>
    )
}
