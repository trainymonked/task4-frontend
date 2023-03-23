import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import CommonContext from '../../api/CommonContext'

export default function SignOut() {
    localStorage.removeItem('auth-token')
    const { user, setUser } = useContext(CommonContext)
    const navigate = useNavigate()
    useEffect(() => {
        setUser(null)
        if (!user) navigate('/signin')
    }, [user, setUser, navigate])
}
