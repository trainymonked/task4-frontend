import { useContext } from 'react'
import { AppBar, Button, Toolbar, Typography } from '@mui/material'

import CommonContext from '../../api/CommonContext'

export default function Header() {
    const { user } = useContext(CommonContext)
    return (
        <AppBar position='static'>
            <Toolbar>
                <Typography component='div' sx={{ flexGrow: 1 }}>
                    <Button href='/' color='inherit'>Home</Button>
                    {!user && <Button href='/signup' color='inherit'>Sign Up</Button>}
                    {!user && <Button href='/signin'color='inherit'>Sign In</Button>}
                </Typography>
                {user && user.user.name && <p>Hello, {user.user.name} •</p>}
                {user && <Button href='/dashboard' color='inherit'>Dashboard</Button>}
                {user && <Button href='/signout' color='inherit'>Sign Out</Button>}
            </Toolbar>
        </AppBar>
    )
}
