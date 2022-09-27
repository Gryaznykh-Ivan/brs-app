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
import Users from './pages/admin/Users';
import UserCreate from './pages/admin/UserCreate';
import UserSettings from './pages/admin/UserSettings';
import User from './pages/User';

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

                    {/* STUDENTS ROUTES */}
                    <Route path="group" element={<PrivateRoute allowedRoles={["STUDENT", "HEADMAN"]} outlet={<Developing />} />} />
                    <Route path="brs" element={<PrivateRoute allowedRoles={["STUDENT", "HEADMAN"]} outlet={<Developing />} />} />
                    <Route path="schedule" element={<PrivateRoute allowedRoles={["STUDENT", "HEADMAN"]} outlet={<Developing />} />} />

                    {/* TEACHER ROUTES */}
                    <Route path="brs" element={<PrivateRoute allowedRoles={["TEACHER"]} outlet={<Developing />} />} />

                    {/* ADMIN ROUTES */}
                    <Route path="users" element={<PrivateRoute allowedRoles={["ADMIN"]} outlet={<Users />} />} />
                    <Route path="users/create" element={<PrivateRoute allowedRoles={["ADMIN"]} outlet={<UserCreate />} />} />
                    <Route path="users/:id" element={<PrivateRoute allowedRoles={["ADMIN"]} outlet={<UserSettings />} />} />
                    <Route path="groups" element={<PrivateRoute allowedRoles={["ADMIN"]} outlet={<Developing />} />} />

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