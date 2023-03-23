import { createContext, useState } from 'react'

import { authUri, usersUri } from '../Constants'

const CommonContext = createContext()

export const CommonProvider = (props) => {
    const [user, setUser] = useState(null)
    const [users, setUsers] = useState([])

    const signIn = async (user) => {
        const response = await fetch(`${authUri}/signin`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        }).then((res) => res.json())

        return response
    }

    const signUp = async (user) => {
        const response = await fetch(`${authUri}/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        }).then((res) => res.json())

        return response
    }

    const tokenCheck = async (token) => {
        const response = await fetch(`${authUri}/token`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': token,
            },
        }).then((res) => res.json())

        return response
    }

    const getUser = async (token) => {
        const response = await fetch(`${authUri}/`, {
            headers: {
                'Content-Type': 'application/json',
                'auth-token': token,
            },
        }).then((res) => res.json())

        return response
    }

    const getUsers = async () => {
        const response = await fetch(`${usersUri}/`, {
            headers: {
                'Content-Type': 'application/json',
                'auth-token': user.token,
            },
        })
            .then((res) => {
                if (res.status === 403) setUser(null)
                return res
            })
            .then((res) => res.json())
            .then((users) => setUsers(users))

        return response
    }

    const blockUsers = async (userIds) => {
        const response = await fetch(`${usersUri}/block`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': user.token,
            },
            body: JSON.stringify(userIds),
        })
            .then((res) => {
                if (res.status === 403) setUser(null)
                return res
            })
            .then((res) => res.json())
        if (response) {
            getUsers()
        }
    }

    const unBlockUsers = async (userIds) => {
        const response = await fetch(`${usersUri}/unblock`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': user.token,
            },
            body: JSON.stringify(userIds),
        })
            .then((res) => {
                if (res.status === 403) setUser(null)
                return res
            })
            .then((res) => res.json())
        if (response) {
            getUsers()
        }
    }

    const deleteUsers = async (userIds) => {
        const response = await fetch(`${usersUri}/`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': user.token,
            },
            body: JSON.stringify(userIds),
        })
            .then((res) => {
                if (res.status === 403) setUser(null)
                return res
            })
            .then((res) => res.json())
        if (response) {
            getUsers()
        }
    }

    return (
        <CommonContext.Provider
            value={{
                user,
                setUser,
                signIn,
                signUp,
                tokenCheck,
                getUser,
                getUsers,
                users,
                setUsers,
                blockUsers,
                unBlockUsers,
                deleteUsers,
            }}
        >
            {props.children}
        </CommonContext.Provider>
    )
}

export default CommonContext
