import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { AppState } from "../store";

interface Props {
    redirectTo?: string;
    outlet: JSX.Element;
}

const PrivateRoute = ({ redirectTo = "/intro", outlet }: Props) => {
    const auth = useSelector((state: AppState) => state.auth);

    return auth.isAuth ? outlet : <Navigate to={ redirectTo } />
};

export default PrivateRoute;