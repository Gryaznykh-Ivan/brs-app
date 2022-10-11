import React from 'react';
import {
    Routes,
    Route,
} from "react-router-dom";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import ScaleLoader from 'react-spinners/ScaleLoader'

import IndexTemplate from './templates/Index'
import AuthTemplate from './templates/Auth'
import EmptyTemplate from './templates/Empty'

import Intro from './pages/Intro';

import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Confirm from './pages/auth/Confirm';
import Index from './pages/Index';
import NotFound from './components/NotFound';
import LoginThroughEmail from './pages/auth/LoginThroughEmail';
import PrivateRoute from './common/PrivateRoute';
import Logout from './common/Logout';

import { useAppSelector } from './hooks/store';

import Settings from './pages/Settings';
import Developing from './components/Developing';
import Users from './pages/users/Users';
import UserCreate from './pages/users/UserCreate';
import UserSettings from './pages/users/UserSettings';
import User from './pages/User';
import { UserRoles } from './types/api';
import Groups from './pages/groups/Groups';
import GroupSettings from './pages/groups/GroupSettings';
import GroupAddStudents from './pages/groups/GroupAddStudents';
import Subjects from './pages/subjects/Subjects';
import SubjectCreate from './pages/subjects/SubjectCreate';
import Subject from './pages/subjects/Subject';
import SubjectAddGroup from './pages/subjects/SubjectAddGroups';
import SubjectGroup from './pages/subjects/SubjectGroup';

function App() {
    const isLoading = useAppSelector(state => state.loader.isLoading)

    return (
        <>
            {isLoading &&
                <div className="absolute inset-0 bg-black z-10 bg-opacity-20">
                    <div className="flex flex-col items-center justify-center h-full">
                        <ScaleLoader
                            color="#67000A"
                            height={100}
                            width={8}
                            loading={isLoading}
                        />
                    </div>
                </div>
            }
            <ToastContainer
                position="bottom-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            <Routes>
                <Route path="/" element={<IndexTemplate />}>
                    <Route path="/" element={<PrivateRoute outlet={<Index />} />} />

                    <Route path="user/:id" element={<PrivateRoute outlet={<User />} />} />

                    {/* <Route path="group" element={<PrivateRoute allowedRoles={[UserRoles.STUDENT, UserRoles.HEADMAN]} outlet={<Developing />} />} />
                    <Route path="brs" element={<PrivateRoute allowedRoles={[UserRoles.STUDENT, UserRoles.HEADMAN]} outlet={<Developing />} />} />
                    <Route path="schedule" element={<PrivateRoute allowedRoles={[UserRoles.STUDENT, UserRoles.HEADMAN]} outlet={<Developing />} />} /> */}

                    <Route path="subjects" element={<PrivateRoute allowedRoles={[UserRoles.ADMIN]} outlet={<Subjects />} />} />
                    <Route path="subjects/create" element={<PrivateRoute allowedRoles={[UserRoles.ADMIN]} outlet={<SubjectCreate />} />} />
                    <Route path="subjects/:id" element={<PrivateRoute allowedRoles={[UserRoles.ADMIN]} outlet={<Subject />} />} />
                    <Route path="subjects/:id/addGroups" element={<PrivateRoute allowedRoles={[UserRoles.ADMIN]} outlet={<SubjectAddGroup />} />} />
                    <Route path="subjects/:subjectId/:groupId" element={<PrivateRoute allowedRoles={[UserRoles.ADMIN]} outlet={<SubjectGroup />} />} />

                    <Route path="users" element={<PrivateRoute allowedRoles={[UserRoles.ADMIN]} outlet={<Users />} />} />
                    <Route path="users/create" element={<PrivateRoute allowedRoles={[UserRoles.ADMIN]} outlet={<UserCreate />} />} />
                    <Route path="users/:id" element={<PrivateRoute allowedRoles={[UserRoles.ADMIN]} outlet={<UserSettings />} />} />

                    <Route path="groups" element={<PrivateRoute allowedRoles={[UserRoles.ADMIN]} outlet={<Groups />} />} />
                    <Route path="groups/:id" element={<PrivateRoute allowedRoles={[UserRoles.ADMIN]} outlet={<GroupSettings />} />} />
                    <Route path="groups/:id/addStudents" element={<PrivateRoute allowedRoles={[UserRoles.ADMIN]} outlet={<GroupAddStudents />} />} />

                    <Route path="settings" element={<PrivateRoute outlet={<Settings />} />} />


                    
                </Route>
                <Route path="/intro" element={<EmptyTemplate />}>
                    <Route path="" element={<Intro />} />
                </Route>
                <Route path="/auth" element={<AuthTemplate />}>
                    <Route path="login" element={<Login />} />
                    <Route path="loginThroughEmail" element={<LoginThroughEmail />} />
                    <Route path="register" element={<Register />} />
                    <Route path="confirm" element={<Confirm />} />
                    <Route path="logout" element={<Logout />} />

                </Route>
                <Route path="*" element={<EmptyTemplate />}>
                    <Route path="*" element={<NotFound />} />
                </Route>
            </Routes>
        </>
    );
}

export default App;