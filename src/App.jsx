import { useContext, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import Dashboard from './pages/Dashboard'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import SignOut from './pages/SignOut'
import CommonContext from './api/CommonContext'
import Header from './components/Header'

function App() {
    const { user, setUser, tokenCheck, getUser } = useContext(CommonContext)

    useEffect(() => {
        (async () => {
            let token = localStorage.getItem('auth-token')
            if (token === null) {
                localStorage.setItem('auth-token', '')
                token = ''
            } else {
                const tokenResponse = await tokenCheck(token)
                if (tokenResponse) {
                    const userResponse = await getUser(token)
                    setUser({ token: token, user: userResponse })
                }
            }
        })()
    }, [])

    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path='/' element={'Please sign in or sign up'} />
                <Route path='/dashboard' element={user ? <Dashboard /> : <Navigate to='/signin' />} />
                <Route path='/signup' element={!user ? <SignUp /> : <Navigate to='/dashboard' />} />
                <Route path='/signin' element={!user ? <SignIn /> : <Navigate to='/dashboard' />} />
                <Route path='/signout' element={<SignOut />} />
                <Route path='*' element={<Navigate to='/' />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
