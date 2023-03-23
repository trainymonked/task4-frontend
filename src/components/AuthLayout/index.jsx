import { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'

import UserContext from '../../api/UserContext'

export default function AuthLayout() {
    const { user } = useContext(UserContext)
    return user ? <Outlet /> : <Navigate to='/signin' />
}
