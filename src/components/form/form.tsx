
"use client"
import { useAppDispatch, useAppSelector } from '@/globalRedux/hooks';
import { saveUserLogged } from '@/globalRedux/modules/userLoggedSlice';
import { loginUserThunk, saveUser } from '@/globalRedux/modules/userSlice';
import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';



// import AlertInfo from '../AlertInfo';

interface FormProps {
    mode: 'signin' | 'signup';
    textButton: string;
}

export default function Form ({ mode, textButton } : FormProps){
    const { push } = useRouter();

    const [emailUser, setEmailUser] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [repassword, setRepassword] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [phone, setPhone] = useState<string>('');
    const [disabled, setDisabled] = useState<boolean>(false);
    const [errorEmail, setErrorEmail] = useState(false);
    const [errorName, setErrorName] = useState(false)
    const [errorPassword, setErrorPassword] = useState(false);
    const [errorPhone, setErrorPhone] = useState(false);
    const [errorRepassword, setErrorRepassword] = useState(false);
    const [alertCreateUser, setAlertCreateUser] = useState<boolean>(false);
    const [alertInfo, setAlertInfo] = useState<boolean>(false);
    const [alertUserError, setAlertUserError] = useState<boolean>(false);
    const { user, token } = useAppSelector((state) => state.user);
    const dispatch = useAppDispatch();
    const userLogged = useAppSelector((state) => state.userLogged);

    // useEffect(() => {
    //     if (sessionStorage.getItem('userLogged')) {
    //         push('/home')      
    //     }
    // }, [push]);

    useEffect(() => {
        if (mode === 'signup') {
            const emailValid = (emailUser.includes('.com') || emailUser.includes('.com.br')) && emailUser.includes('@');

            if (emailUser.length > 0) {
                setErrorEmail(!emailValid);
            }

            const passwordValid =  password.length >= 8;
            if (password.length > 0) {
                setErrorPassword(!passwordValid);
            }

            const nameValid =  name.length >= 3;
            if (password.length > 0) {
                setErrorName(!nameValid);
            }


            const repasswordValid = password === repassword;
            if (repassword.length > 0) {
                setErrorRepassword(!repasswordValid);
            }

            const phoneValid = phone.length == 11;
            if (phone.length > 0) {
                setErrorPhone(!phoneValid);
            }

            setDisabled(!(emailValid && passwordValid && repasswordValid && phoneValid && nameValid));
        }
    }, [emailUser, password, repassword, mode, phone, name]);

   

    useEffect(() => {
        if (user) {dispatch(saveUserLogged(token));}
    }, [user, dispatch, token]);

    useEffect(() => {
        if (userLogged.authorization) {
            sessionStorage.setItem('authToken', userLogged.authorization);

            push('/home')    
           

         

        }
    }, [userLogged, push]);

   

    function addUsers(evento: React.FormEvent<HTMLFormElement>) {
        evento.preventDefault();

        if (mode === 'signup') {
            dispatch(saveUser({id: Date.now().toString(), email: emailUser, password, phone, name}));
            setEmailUser('');
            setPassword('');
            setRepassword('');
        } else {
            const login = { email: emailUser, password };
            dispatch(loginUserThunk(login));
        }
    }

    // const cancelAlert = () => {
    //     if (alertCreateUser) {
    //         setAlertCreateUser(false);
    //     } else if (alertUserError) {
    //         setAlertUserError(false);
    //         return;
    //     }

    //     setAlertInfo(false);
    // };

    return (
        <Box component="form" marginTop={1} onSubmit={(e) => addUsers(e)}>
            {/* <AlertInfo actionCancel={cancelAlert} show={alertCreateUser} msg="Usuário cadastrado com sucesso!" type="success" />
            <AlertInfo actionCancel={cancelAlert} show={alertInfo} msg="Usuário já cadastrado!" type="info" />
            <AlertInfo actionCancel={cancelAlert} show={alertUserError} msg="Conta não cadastrada! Verifique o usuário ou senha." type="error" /> */}

            <TextField
                value={emailUser}
                margin="normal"
                error={errorEmail}
                helperText={errorEmail ? 'E-mail inválido, deve incluir -@- e -.com-' : ''}
                onChange={(e) => setEmailUser(e.target.value)}
                variant="outlined"
                type="text"
                required
                label="E-mail"
                fullWidth
            />
            <TextField
                value={password}
                margin="normal"
                error={errorPassword}
                helperText={errorPassword ? 'A senha deve ter ao menos 8 caracteres' : ''}
                onChange={(e) => setPassword(e.target.value)}
                variant="outlined"
                type="text"
                required
                label="Senha"
                fullWidth
            />

            {mode === 'signup' && (
                <>
                <TextField
                    value={repassword}
                    error={errorRepassword}
                    helperText={errorRepassword ? 'As senhas devem ser iguais' : ''}
                    margin="normal"
                    onChange={(e) => setRepassword(e.target.value)}
                    variant="outlined"
                    type="text"
                    required
                    label="Digite a senha novamente"
                    fullWidth
                />
                <TextField
                    value={name}
                    margin="normal"
                    error={errorName}
                    helperText={errorName ? 'O nome precisa ter ao menos 3 caracteres' : ''}
                    onChange={(e) => setName(e.target.value)}
                    variant="outlined"
                    type="text"
                    required
                    label="Digite seu nome"
                    fullWidth

                />
                <TextField
                    value={phone}
                    error={errorPhone}
                    helperText={errorPhone ? 'O telefone precisa de 11 dígitos' : ''}
                    margin="normal"
                    onChange={(e) => setPhone(e.target.value)}
                    variant="outlined"
                    type="text"
                    required
                    label="Digite seu telefone"
                    fullWidth
                />
                
                </>
                
                
            )}

            <Button
                type="submit"
                disabled={disabled}
                variant="contained"
                fullWidth
                sx={{
                    color: 'black',          
                    backgroundColor: '#e6d343',
                    ':hover': {
                        backgroundColor: '#e6d343',
                    },
                    
                    mt: 3,
                    mb: 2,
                }}
            >
                {textButton}
            </Button>
            <Grid container justifyContent="center">
                <Grid item xs={8} textAlign="end">
                    {mode === 'signin' ? (
                        <Typography textAlign="center" variant="body2">
                            <Link style={{ color: 'inherit', textDecoration: 'none' }} href={"/signup"}>
                                Não tem uma conta? Cadastre-se
                            </Link>
                        </Typography>
                    ) : (
                        <Typography textAlign="center" variant="body2">
                            <Link style={{ color: 'inherit', textDecoration: 'none' }} href={"/signin"}>
                                Já tem uma conta?
                            </Link>
                        </Typography>
                    )}
                </Grid>
            </Grid>
        </Box>
    );
};

