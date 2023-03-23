let serverUri = 'https://task-4-backend.onrender.com'
if (process.env.NODE_ENV === 'development') {
    console.log('development')
    serverUri = 'http://127.0.0.1:8000'
}

export { serverUri }

export const authUri = `${serverUri}/auth`
export const usersUri = `${serverUri}/users`
