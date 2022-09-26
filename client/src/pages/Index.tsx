import UserProfile from '../components/UserProfile'
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
                isMe={true}
                fullname={`${user.name} ${user.lastName}`}
                dateOfBirth={user.birthday && new Date(user.birthday).toLocaleDateString()}
                email={user.email}
                image={process.env.PUBLIC_URL + "/static/images/profile.png"}
                group={user.group && `Группа ${user.group}`}
                position={user.role}
            />
        </div>
    )
}
