import React from 'react';
import {
    Routes,
    Route,
} from "react-router-dom";

import { ToastContainer } from 'react-toastify';
import ScaleLoader from 'react-spinners/ScaleLoader'

import IndexTemplate from './templates/Index'
import AuthTemplate from './templates/Auth'
import EmptyTemplate from './templates/Empty'

import Intro from './pages/Intro';

import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Confirm from './pages/auth/Confirm';
import Index from './pages/Index';
import NotFound from './pages/NotFound';
import LoginThroughEmail from './pages/auth/LoginThroughEmail';
import PrivateRoute from './common/PrivateRoute';
import Logout from './common/Logout';

import { useAppSelector } from './hooks/store';

import 'react-toastify/dist/ReactToastify.css';
import Settings from './pages/Settings';

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
                    <Route path="group" element={<PrivateRoute outlet={<NotFound />} />} />
                    <Route path="brs" element={<PrivateRoute outlet={<NotFound />} />} />
                    <Route path="schedule" element={<PrivateRoute outlet={<NotFound />} />} />
                    <Route path="settings" element={<PrivateRoute outlet={<Settings />} />} />
                    <Route path="logout" element={<PrivateRoute outlet={<NotFound />} />} />
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