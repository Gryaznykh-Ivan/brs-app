import React from 'react'
import { NavLink } from 'react-router-dom'
import { useAppSelector } from '../../hooks/store'

export default function SideBar() {
    const user = useAppSelector(state => state.auth.payload)
    if (user === null) return <></>

    return (
        <div className="bg-white rounded-xl p-4 flex flex-col space-y-2 sticky top-4 text-sm shadow-md">
            <NavLink to="/" className={({ isActive }) => `flex space-x-2 items-center p-2 rounded-lg ${isActive && "bg-mred text-white fill-white"}`}>
                <div className="flex justify-center items-center w-5 h-5">
                    <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8 3.5C6.46875 3.5 5.25 4.75 5.25 6.25C5.25 7.78125 6.46875 9 8 9C9.5 9 10.75 7.78125 10.75 6.25C10.75 4.75 9.5 3.5 8 3.5ZM8 7.5C7.28125 7.5 6.75 6.96875 6.75 6.25C6.75 5.5625 7.28125 5 8 5C8.6875 5 9.25 5.5625 9.25 6.25C9.25 6.96875 8.6875 7.5 8 7.5ZM8 0C3.5625 0 0 3.59375 0 8C0 12.4375 3.5625 16 8 16C12.4062 16 16 12.4375 16 8C16 3.59375 12.4062 0 8 0ZM8 14.5C6.53125 14.5 5.1875 14.0312 4.09375 13.2188C4.625 12.1562 5.6875 11.5 6.875 11.5H9.09375C10.2812 11.5 11.3438 12.1875 11.875 13.2188C10.7812 14.0312 9.4375 14.5 8 14.5ZM13 12.1562C12.1562 10.8438 10.7188 10 9.09375 10H6.875C5.25 10 3.8125 10.8438 2.96875 12.1562C2.03125 11.0312 1.5 9.59375 1.5 8C1.5 4.4375 4.40625 1.5 8 1.5C11.5625 1.5 14.5 4.4375 14.5 8C14.5 9.59375 13.9375 11.0312 13 12.1562Z" fill="inherit" />
                    </svg>
                </div>
                <div className="font-bold">Моя страница</div>
            </NavLink>

            {(["STUDENT", "HEADMAN"]).includes(user.role) === true &&
                <>
                    <NavLink to="/group" className={({ isActive }) => `flex space-x-2 items-center p-2 rounded-lg ${isActive && "bg-mred text-white fill-white"}`}>
                        <div className="flex justify-center items-center w-5 h-5">
                            <svg width="20" height="16" viewBox="0 0 20 16" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9.96875 10C11.7812 10 13.2188 8.5625 13.2188 6.75C13.2188 4.96875 11.75 3.5 9.96875 3.5C8.1875 3.5 6.75 4.96875 6.75 6.75C6.71875 8.5625 8.1875 10 9.96875 10ZM9.96875 5C10.9375 5 11.7188 5.8125 11.7188 6.75C11.7188 7.71875 10.9375 8.5 9.96875 8.5C9.03125 8.5 8.21875 7.71875 8.21875 6.75C8.21875 5.8125 9.03125 5 9.96875 5ZM16 5C17.375 5 18.5 3.90625 18.5 2.5C18.5 1.125 17.375 0 16 0C14.5938 0 13.5 1.125 13.5 2.5C13.5 3.90625 14.5938 5 16 5ZM11.5312 11H8.4375C5.96875 11 4 12.875 4 15.1875C4 15.6562 4.375 16 4.875 16H15.0938C15.5938 16 16 15.6562 16 15.1875C16 12.875 14 11 11.5312 11ZM5.5625 14.5C5.875 13.375 7.03125 12.5 8.40625 12.5H11.5312C12.9062 12.5 14.0625 13.375 14.4062 14.5H5.5625ZM17.2188 6H15.3125C14.9062 6 14.5312 6.125 14.1875 6.28125C14.1875 6.4375 14.2188 6.59375 14.2188 6.75C14.2188 7.8125 13.8438 8.78125 13.1875 9.5H19.4375C19.75 9.5 20 9.25 20 8.9375C20 7.3125 18.75 6 17.2188 6ZM5.71875 6.75C5.71875 6.59375 5.75 6.4375 5.78125 6.28125C5.4375 6.09375 5.0625 6 4.65625 6H2.75C1.21875 6 0 7.3125 0 8.9375C0 9.25 0.21875 9.5 0.53125 9.5H6.78125C6.125 8.78125 5.71875 7.8125 5.71875 6.75ZM4 5C5.375 5 6.5 3.90625 6.5 2.5C6.5 1.125 5.375 0 4 0C2.59375 0 1.5 1.125 1.5 2.5C1.5 3.90625 2.59375 5 4 5Z" fill="inherit" />
                            </svg>

                        </div>
                        <div className="font-bold">Группа</div>
                    </NavLink>
                    <NavLink to="/brs" className={({ isActive }) => `flex space-x-2 items-center p-2 rounded-lg ${isActive && "bg-mred text-white fill-white"}`}>
                        <div className="flex justify-center items-center w-5 h-5">
                            <svg width="16" height="14" viewBox="0 0 16 14" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 6.25C12.4062 6.25 12.75 6.59375 12.75 7C12.75 7.4375 12.4062 7.75 12 7.75H4C3.5625 7.75 3.25 7.4375 3.25 7C3.25 6.59375 3.5625 6.25 4 6.25H12ZM12 9.25C12.4062 9.25 12.75 9.59375 12.75 10C12.75 10.4375 12.4062 10.75 12 10.75H4C3.5625 10.75 3.25 10.4375 3.25 10C3.25 9.59375 3.5625 9.25 4 9.25H12ZM0 2C0 0.90625 0.875 0 2 0H14C15.0938 0 16 0.90625 16 2V12C16 13.125 15.0938 14 14 14H2C0.875 14 0 13.125 0 12V2ZM1.5 5V12C1.5 12.2812 1.71875 12.5 2 12.5H14C14.25 12.5 14.5 12.2812 14.5 12V5H1.5ZM13.625 2H11.3438C11.125 2 11 2.28125 11.1562 2.4375L12.3125 3.59375C12.4062 3.6875 12.5625 3.6875 12.6562 3.59375L13.8125 2.4375C13.9688 2.28125 13.8438 2 13.625 2Z" fill="inherit" />
                            </svg>
                        </div>
                        <div className="font-bold">БРС</div>
                    </NavLink>
                    <NavLink to="/schedule" className={({ isActive }) => `flex space-x-2 items-center p-2 rounded-lg ${isActive && "bg-mred text-white fill-white"}`}>
                        <div className="flex justify-center items-center w-5 h-5">
                            <svg width="20" height="14" viewBox="0 0 20 14" xmlns="http://www.w3.org/2000/svg">
                                <path d="M19.4688 3.28125L10.625 0.125C10.4375 0.0625 10.2188 0 10 0C9.75 0 9.53125 0.0625 9.3125 0.125L0.5 3.28125C0.1875 3.40625 0 3.6875 0 4C0 4.34375 0.1875 4.625 0.5 4.75L2.375 5.40625C2 5.90625 1.71875 6.46875 1.59375 7.09375C1.25 7.25 1 7.59375 1 8C1 8.3125 1.125 8.59375 1.34375 8.78125L0.59375 13.4375C0.53125 13.75 0.78125 14 1.0625 14H2.90625C3.1875 14 3.4375 13.75 3.375 13.4375L2.625 8.78125C2.84375 8.59375 3 8.3125 3 8C3 7.6875 2.8125 7.40625 2.59375 7.25C2.71875 6.6875 3 6.1875 3.375 5.78125L9.3125 7.90625C9.53125 7.96875 9.75 8 10 8C10.2188 8 10.4375 7.96875 10.6562 7.90625L19.4688 4.75C19.7812 4.625 20 4.34375 20 4C20 3.6875 19.7812 3.40625 19.4688 3.28125ZM10.1562 6.5C10 6.53125 9.875 6.5 9.84375 6.5L5.46875 4.9375L10.125 3.5C10.4062 3.40625 10.5312 3.125 10.4688 2.875C10.375 2.59375 10.0938 2.4375 9.84375 2.53125L3.90625 4.375L2.90625 4L9.8125 1.53125C9.9375 1.5 10.0625 1.53125 10.125 1.53125L17.0625 4L10.1562 6.5ZM14.125 7.71875L14.5 11.2188C14.5 11.5625 12.9375 12.5 10 12.5C7.03125 12.5 5.5 11.5625 5.5 11.2188L5.84375 7.71875L4.40625 7.21875L4 11.1562C4 13.0625 7 14 10 14C12.9688 14 16 13.0625 15.9688 11.1562L15.5625 7.21875L14.125 7.71875Z" fill="inherit" />
                            </svg>
                        </div>
                        <div className="font-bold">Расписание</div>
                    </NavLink>
                </>
            }

            {user.role === "TEACHER" &&
                <>
                    <NavLink to="/brs" className={({ isActive }) => `flex space-x-2 items-center p-2 rounded-lg ${isActive && "bg-mred text-white fill-white"}`}>
                        <div className="flex justify-center items-center w-5 h-5">
                            <svg width="16" height="14" viewBox="0 0 16 14" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 6.25C12.4062 6.25 12.75 6.59375 12.75 7C12.75 7.4375 12.4062 7.75 12 7.75H4C3.5625 7.75 3.25 7.4375 3.25 7C3.25 6.59375 3.5625 6.25 4 6.25H12ZM12 9.25C12.4062 9.25 12.75 9.59375 12.75 10C12.75 10.4375 12.4062 10.75 12 10.75H4C3.5625 10.75 3.25 10.4375 3.25 10C3.25 9.59375 3.5625 9.25 4 9.25H12ZM0 2C0 0.90625 0.875 0 2 0H14C15.0938 0 16 0.90625 16 2V12C16 13.125 15.0938 14 14 14H2C0.875 14 0 13.125 0 12V2ZM1.5 5V12C1.5 12.2812 1.71875 12.5 2 12.5H14C14.25 12.5 14.5 12.2812 14.5 12V5H1.5ZM13.625 2H11.3438C11.125 2 11 2.28125 11.1562 2.4375L12.3125 3.59375C12.4062 3.6875 12.5625 3.6875 12.6562 3.59375L13.8125 2.4375C13.9688 2.28125 13.8438 2 13.625 2Z" fill="inherit" />
                            </svg>
                        </div>
                        <div className="font-bold">БРС</div>
                    </NavLink>
                </>
            }


            {user.role === "ADMIN" &&
                <>
                    <NavLink to="/users" className={({ isActive }) => `flex space-x-2 items-center p-2 rounded-lg ${isActive && "bg-mred text-white fill-white"}`}>
                        <div className="flex justify-center items-center w-5 h-5">
                            <svg width="18" height="18" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path d="M7 10C9.1875 10 11 8.21875 11 6C11 3.8125 9.1875 2 7 2C4.78125 2 3 3.8125 3 6C3 8.21875 4.78125 10 7 10ZM7 3.5C8.375 3.5 9.5 4.625 9.5 6C9.5 7.40625 8.375 8.5 7 8.5C5.59375 8.5 4.5 7.40625 4.5 6C4.5 4.625 5.59375 3.5 7 3.5ZM8.5625 11.5H5.40625C2.40625 11.5 0 13.9375 0 16.9375C0 17.5312 0.46875 18 1.0625 18H12.9062C13.5 18 14 17.5312 14 16.9375C14 13.9375 11.5625 11.5 8.5625 11.5ZM1.5 16.5C1.71875 14.5625 3.375 13 5.40625 13H8.5625C10.5938 13 12.2188 14.5625 12.4688 16.5H1.5ZM14.9688 12H12.6562C14.0938 13.1875 15 14.9688 15 16.9375C15 17.3438 14.875 17.6875 14.6875 18H19C19.5312 18 20 17.5625 20 17C20 14.25 17.75 12 14.9688 12ZM13.5 10C15.4062 10 17 8.4375 17 6.5C17 4.59375 15.4062 3 13.5 3C12.6875 3 11.9688 3.28125 11.4062 3.71875C11.75 4.40625 12 5.1875 12 6C12 7.125 11.625 8.15625 11 8.96875C11.625 9.625 12.5 10 13.5 10Z" fill="inherit" />
                            </svg>
                        </div>
                        <div className="font-bold">Пользователи</div>
                    </NavLink>
                    <NavLink to="/groups" className={({ isActive }) => `flex space-x-2 items-center p-2 rounded-lg ${isActive && "bg-mred text-white fill-white"}`}>
                        <div className="flex justify-center items-center w-5 h-5">
                            <svg width="20" height="16" viewBox="0 0 20 16" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9.96875 10C11.7812 10 13.2188 8.5625 13.2188 6.75C13.2188 4.96875 11.75 3.5 9.96875 3.5C8.1875 3.5 6.75 4.96875 6.75 6.75C6.71875 8.5625 8.1875 10 9.96875 10ZM9.96875 5C10.9375 5 11.7188 5.8125 11.7188 6.75C11.7188 7.71875 10.9375 8.5 9.96875 8.5C9.03125 8.5 8.21875 7.71875 8.21875 6.75C8.21875 5.8125 9.03125 5 9.96875 5ZM16 5C17.375 5 18.5 3.90625 18.5 2.5C18.5 1.125 17.375 0 16 0C14.5938 0 13.5 1.125 13.5 2.5C13.5 3.90625 14.5938 5 16 5ZM11.5312 11H8.4375C5.96875 11 4 12.875 4 15.1875C4 15.6562 4.375 16 4.875 16H15.0938C15.5938 16 16 15.6562 16 15.1875C16 12.875 14 11 11.5312 11ZM5.5625 14.5C5.875 13.375 7.03125 12.5 8.40625 12.5H11.5312C12.9062 12.5 14.0625 13.375 14.4062 14.5H5.5625ZM17.2188 6H15.3125C14.9062 6 14.5312 6.125 14.1875 6.28125C14.1875 6.4375 14.2188 6.59375 14.2188 6.75C14.2188 7.8125 13.8438 8.78125 13.1875 9.5H19.4375C19.75 9.5 20 9.25 20 8.9375C20 7.3125 18.75 6 17.2188 6ZM5.71875 6.75C5.71875 6.59375 5.75 6.4375 5.78125 6.28125C5.4375 6.09375 5.0625 6 4.65625 6H2.75C1.21875 6 0 7.3125 0 8.9375C0 9.25 0.21875 9.5 0.53125 9.5H6.78125C6.125 8.78125 5.71875 7.8125 5.71875 6.75ZM4 5C5.375 5 6.5 3.90625 6.5 2.5C6.5 1.125 5.375 0 4 0C2.59375 0 1.5 1.125 1.5 2.5C1.5 3.90625 2.59375 5 4 5Z" fill="inherit" />
                            </svg>

                        </div>
                        <div className="font-bold">Группы</div>
                    </NavLink>
                    <NavLink to="/subjects" className={({ isActive }) => `flex space-x-2 items-center p-2 rounded-lg ${isActive && "bg-mred text-white fill-white"}`}>
                        <div className="flex justify-center items-center w-5 h-5">
                            <svg width="16" height="14" viewBox="0 0 16 14" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 6.25C12.4062 6.25 12.75 6.59375 12.75 7C12.75 7.4375 12.4062 7.75 12 7.75H4C3.5625 7.75 3.25 7.4375 3.25 7C3.25 6.59375 3.5625 6.25 4 6.25H12ZM12 9.25C12.4062 9.25 12.75 9.59375 12.75 10C12.75 10.4375 12.4062 10.75 12 10.75H4C3.5625 10.75 3.25 10.4375 3.25 10C3.25 9.59375 3.5625 9.25 4 9.25H12ZM0 2C0 0.90625 0.875 0 2 0H14C15.0938 0 16 0.90625 16 2V12C16 13.125 15.0938 14 14 14H2C0.875 14 0 13.125 0 12V2ZM1.5 5V12C1.5 12.2812 1.71875 12.5 2 12.5H14C14.25 12.5 14.5 12.2812 14.5 12V5H1.5ZM13.625 2H11.3438C11.125 2 11 2.28125 11.1562 2.4375L12.3125 3.59375C12.4062 3.6875 12.5625 3.6875 12.6562 3.59375L13.8125 2.4375C13.9688 2.28125 13.8438 2 13.625 2Z" fill="inherit" />
                            </svg>
                        </div>
                        <div className="font-bold">Дисциплины</div>
                    </NavLink>
                </>
            }

            <NavLink to="/settings" className={({ isActive }) => `flex space-x-2 items-center p-2 rounded-lg ${isActive && "bg-mred text-white fill-white"}`}>
                <div className="flex justify-center items-center w-5 h-5">
                    <svg width="20" height="20" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6.375 8.75C6.375 7.30078 7.52344 6.125 9 6.125C10.4492 6.125 11.625 7.30078 11.625 8.75C11.625 10.1992 10.4492 11.375 9 11.375C7.52344 11.375 6.375 10.1992 6.375 8.75ZM9 7.4375C8.26172 7.4375 7.6875 8.03906 7.6875 8.75C7.6875 9.48828 8.26172 10.0625 9 10.0625C9.71094 10.0625 10.3125 9.48828 10.3125 8.75C10.3125 8.03906 9.71094 7.4375 9 7.4375ZM10.0117 1.75C10.6133 1.75 11.1328 2.1875 11.2695 2.76172L11.4883 3.66406C11.7344 3.77344 11.9531 3.91016 12.1445 4.04688L13.0469 3.77344C13.6211 3.60938 14.25 3.85547 14.5508 4.375L15.5625 6.15234C15.8633 6.67188 15.7539 7.32812 15.3164 7.73828L14.6602 8.36719C14.6602 8.50391 14.6875 8.64062 14.6875 8.75C14.6875 8.88672 14.6602 9.02344 14.6602 9.13281L15.3164 9.78906C15.7539 10.1992 15.8633 10.8555 15.5625 11.375L14.5508 13.1523C14.25 13.6719 13.6211 13.918 13.0469 13.7539L12.1445 13.4805C11.9531 13.6172 11.7344 13.7539 11.4883 13.8633L11.2695 14.7656C11.1328 15.3398 10.6133 15.75 10.0117 15.75H7.96094C7.35938 15.75 6.83984 15.3398 6.70312 14.7656L6.48438 13.8633C6.23828 13.7539 6.01953 13.6172 5.82812 13.4805L4.92578 13.7539C4.35156 13.918 3.72266 13.6719 3.42188 13.1523L2.41016 11.375C2.10938 10.8555 2.21875 10.1992 2.65625 9.78906L3.3125 9.13281C3.3125 9.02344 3.3125 8.88672 3.3125 8.75C3.3125 8.64062 3.3125 8.50391 3.3125 8.36719L2.65625 7.73828C2.21875 7.32812 2.10938 6.67188 2.41016 6.15234L3.42188 4.375C3.72266 3.85547 4.35156 3.60938 4.92578 3.77344L5.82812 4.04688C6.01953 3.91016 6.23828 3.77344 6.48438 3.66406L6.70312 2.76172C6.83984 2.1875 7.35938 1.75 7.96094 1.75H10.0117ZM7.60547 4.59375L7.30469 4.73047C6.94922 4.86719 6.62109 5.05859 6.34766 5.27734L6.07422 5.49609L4.57031 5.03125L3.55859 6.80859L4.67969 7.875L4.65234 8.20312C4.625 8.39453 4.625 8.58594 4.625 8.75C4.625 8.94141 4.625 9.13281 4.65234 9.32422L4.67969 9.65234L3.55859 10.7188L4.57031 12.4961L6.07422 12.0312L6.34766 12.25C6.62109 12.4688 6.94922 12.6602 7.30469 12.7969L7.60547 12.9336L7.96094 14.4375H10.0117L10.3672 12.9336L10.668 12.7969C11.0234 12.6602 11.3516 12.4688 11.625 12.25L11.8984 12.0312L13.4023 12.4961L14.4141 10.7188L13.293 9.65234L13.3203 9.32422C13.3477 9.13281 13.375 8.94141 13.375 8.75C13.375 8.58594 13.3477 8.39453 13.3203 8.20312L13.293 7.875L14.4141 6.80859L13.4023 5.03125L11.8984 5.49609L11.625 5.27734C11.3516 5.05859 11.0234 4.86719 10.668 4.73047L10.3672 4.59375L10.0117 3.0625H7.96094L7.60547 4.59375Z" fill="inherit" />
                    </svg>

                </div>
                <div className="font-bold">Настройки</div>
            </NavLink>
            <NavLink to="/auth/logout" className={({ isActive }) => `flex space-x-2 items-center p-2 rounded-lg ${isActive && "bg-mred text-white fill-white"}`}>
                <div className="flex justify-center items-center w-5 h-5">
                    <svg width="18" height="18" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.25 14.2188C7.25 14.6016 6.94922 14.875 6.59375 14.875H4.625C3.14844 14.875 2 13.7266 2 12.25V5.25C2 3.80078 3.14844 2.625 4.625 2.625H6.59375C6.94922 2.625 7.25 2.92578 7.25 3.28125C7.25 3.66406 6.94922 3.9375 6.59375 3.9375H4.625C3.88672 3.9375 3.3125 4.53906 3.3125 5.25V12.25C3.3125 12.9883 3.88672 13.5625 4.625 13.5625H6.59375C6.94922 13.5625 7.25 13.8633 7.25 14.2188ZM15.8086 8.3125L12.3359 4.59375C12.0898 4.32031 11.6797 4.32031 11.4062 4.56641C11.1328 4.8125 11.1328 5.22266 11.3789 5.49609L13.8125 8.09375H7.00391C6.64844 8.09375 6.375 8.39453 6.375 8.75C6.375 9.13281 6.64844 9.40625 7.00391 9.40625H13.7852L11.3242 12.0312C11.0781 12.3047 11.0781 12.7148 11.3516 12.9609C11.5156 13.0703 11.6797 13.125 11.8164 13.125C11.9805 13.125 12.1445 13.0703 12.2812 12.9336L15.7539 9.21484C16.0547 8.96875 16.0547 8.55859 15.8086 8.3125Z" fill="inherit" />
                    </svg>

                </div>
                <div className="font-bold">Выйти</div>
            </NavLink>
        </div>
    )
}
