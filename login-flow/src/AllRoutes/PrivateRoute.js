import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, Navigate } from 'react-router-dom'
import { singleuser } from '../redux/Auth/auth.action'

const PrivateRoute = ({ children }) => {
    const location = useLocation()
    const isAuth = useSelector((store) => store.auth.isAuth);
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        if (!isAuth) {
            const token = localStorage.getItem("token")
            if (token) {
                dispatch(singleuser())
                    .then(() => setIsLoading(false))
                    .catch(() => setIsLoading(false))
            } else {
                setIsLoading(false)
            }
        } else {
            setIsLoading(false)
        }
    }, [dispatch, isAuth])

    console.log(isAuth)

    if (isLoading) {
        return <div>Loading...</div>
    }
    if (!isAuth) {
        return <Navigate to="/login" state={{ from: location }}></Navigate>
    }

    return children
}

export default PrivateRoute 