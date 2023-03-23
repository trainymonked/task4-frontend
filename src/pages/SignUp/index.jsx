import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, Button, Container, TextField, Typography } from '@mui/material'

import CommonContext from '../../api/CommonContext'

export default function SignUp() {
    const [formState, setFormState] = useState({
        fields: {
            email: {
                type: 'email',
                label: 'E-mail',
                value: '',
                validation: {
                    required: true,
                    email: true,
                },
                valid: false,
                touched: false,
            },
            name: {
                type: 'name',
                label: 'Name (optional)',
                value: '',
                validation: {},
                valid: true,
                touched: false,
            },
            password: {
                type: 'password',
                label: 'Password',
                value: '',
                validation: {
                    required: true,
                    minLength: 1,
                },
                valid: false,
                touched: false,
            },
        },
        isFormValid: false,
    })

    const { setUser, signIn, signUp } = useContext(CommonContext)
    const navigate = useNavigate()

    const handleChange = ({ target: { value } }, key) => {
        const updatedForm = { ...formState.fields }
        const updatedFormElem = {
            ...updatedForm[key],
        }
        updatedFormElem.value = value
        const valid = checkValidity(updatedFormElem.value, updatedFormElem.validation)
        updatedFormElem.valid = valid
        updatedFormElem.touched = true
        updatedForm[key] = updatedFormElem

        let isFormValid = true
        for (const id in updatedForm) {
            if (Object.prototype.hasOwnProperty.call(updatedForm, id)) {
                isFormValid = updatedForm[id].valid && isFormValid
            }
        }

        setFormState({ ...formState, fields: updatedForm, isFormValid })
    }

    async function onSubmit(e) {
        e.preventDefault()

        const user = {
            email: formState.fields.email.value,
            password: formState.fields.password.value,
        }
        const username = formState.fields.name.value || null

        const responseRegister = await signUp({ ...user, name: username })
        if (responseRegister.msg) {
            return console.error(responseRegister.msg)
        }

        const responseLogin = await signIn(user)
        if (responseLogin.msg) {
            return console.error(responseLogin.msg)
        }

        setUser({
            token: responseLogin.token,
            user: responseLogin.user,
        })

        localStorage.setItem('auth-token', responseLogin.token)
        navigate('/dashboard')
    }

    const checkValidity = (value, rules) => {
        let isValid = true

        if (rules.required) {
            isValid = value.trim() !== '' && isValid
        }

        if (rules.email) {
            isValid =
                /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(
                    value
                ) && isValid
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }

        return isValid
    }

    const formElementsArray = []
    for (const key in formState.fields) {
        if (Object.prototype.hasOwnProperty.call(formState.fields, key)) {
            formElementsArray.push({
                id: key,
                config: formState.fields[key],
            })
        }
    }

    return (
        <Container maxWidth='xs'>
            <Box
                sx={{
                    marginTop: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Typography component='h1' variant='h5'>
                    Sign Up
                </Typography>
                <Box component='form' onSubmit={onSubmit} sx={{ mt: 1 }}>
                    {formElementsArray.map((formElem) => (
                        <TextField
                            key={formElem.id}
                            label={formElem.config.label}
                            type={formElem.config.type}
                            value={formElem.config.value}
                            error={!formElem.config.valid && formElem.config.touched}
                            autoFocus={formElem.config.type === 'email'}
                            onChange={(e) => handleChange(e, formElem.id)}
                            variant='outlined'
                            margin='dense'
                            fullWidth
                        />
                    ))}
                    <Button
                        type='submit'
                        disabled={!formState.isFormValid}
                        fullWidth
                        variant='contained'
                        sx={{ mt: 2, mb: 2, py: 1.66 }}
                    >
                        Sign Up
                    </Button>
                </Box>
            </Box>
        </Container>
    )
}
