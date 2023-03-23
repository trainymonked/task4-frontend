import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, Button, Container } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'

import CommonContext from '../../api/CommonContext'

const columns = [
    { field: 'id', headerName: 'ID', width: 50 },
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'email', headerName: 'E-mail', width: 200 },
    {
        field: 'regdate',
        headerName: 'Registration Date',
        type: 'date',
        width: 180,
        valueGetter: ({ value }) => new Date(Math.floor(value)),
    },
    {
        field: 'lastlogin',
        headerName: 'Last Login',
        width: 200,
        valueGetter: ({ value }) => (value ? new Date(Math.floor(value)).toLocaleString() : 'Never'),
    },
    {
        field: 'status',
        headerName: 'Status',
        width: 120,
        valueGetter: ({ value }) => (value === true ? 'Blocked' : 'Active'),
    },
]

export default function Dashboard() {
    const { user, users, getUsers, blockUsers, unBlockUsers, deleteUsers } = useContext(CommonContext)
    const [rows, setRows] = useState([])
    const [rowSelectionModel, setRowSelectionModel] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        getUsers()
    }, [getUsers])

    useEffect(() => {
        setRows(users)
    }, [users])

    const handleBlock = async () => {
        if (rowSelectionModel.length) {
            await blockUsers(rowSelectionModel)
        }
        if (rowSelectionModel.includes(user.user.id)) {
            navigate('/signout')
        }
    }

    const handleUnblock = async () => {
        if (rowSelectionModel.length) {
            await unBlockUsers(rowSelectionModel)
        }
    }

    const handleDelete = async () => {
        if (rowSelectionModel.length) {
            await deleteUsers(rowSelectionModel)
        }
        if (rowSelectionModel.includes(user.user.id)) {
            navigate('/signout')
        }
    }

    return (
        <Container>
            <Box sx={{ my: '20px', display: 'flex', gap: '5px' }}>
                <Button color='warning' variant='contained' onClick={handleBlock}>
                    Block
                </Button>
                <Button color='success' variant='contained' onClick={handleUnblock}>
                    Unblock
                </Button>
                <Button color='error' variant='contained' onClick={handleDelete}>
                    Delete
                </Button>
            </Box>
            <DataGrid
                sx={{ my: '20px' }}
                autoHeight
                hideFooter
                rows={rows}
                columns={columns}
                checkboxSelection
                rowSelectionModel={rowSelectionModel}
                onRowSelectionModelChange={(newRowSelectionModel) => {
                    setRowSelectionModel(newRowSelectionModel)
                }}
            />
        </Container>
    )
}
