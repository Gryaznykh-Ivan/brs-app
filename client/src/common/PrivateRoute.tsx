import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { AppState } from "../store";
import { UserRoles } from "../types/api";

interface IProps {
    redirectTo?: string;
    allowedRoles?: Array<keyof typeof UserRoles>;
    outlet: JSX.Element;
}

// by default private route designed for STUDENT
const PrivateRoute = ({ redirectTo = "/intro", allowedRoles = [], outlet }: IProps) => {
    const auth = useSelector((state: AppState) => state.auth);

    if (auth.isAuth === true) {
        if (allowedRoles.length !== 0 && auth.payload?.role !== undefined && allowedRoles.includes(auth.payload?.role) === false) {
            return <Navigate to="/" />
        }

        return outlet
    } else {
        return <Navigate to={ redirectTo } />
    }
};

export default PrivateRoute;