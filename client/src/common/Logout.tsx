import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../hooks/store'
import { logout } from '../store/reducers/authSlice'

export default function Logout() {
    const isAuth = useAppSelector(state => state.auth.isAuth)
    const dispatch = useAppDispatch()
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuth === true) {
            dispatch(logout());
        } else {
            navigate("/")
        }
    }, [isAuth, dispatch, navigate])

    return <></>
}
