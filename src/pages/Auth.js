import React, {useContext, useState} from 'react';

import { Alert, TextField, FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton, Card, CardActions, CardContent, Typography, Grid} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import LoginIcon from '@mui/icons-material/Login';

import { NavLink, useLocation, useNavigate } from 'react-router-dom';

import {LOGIN, REGISTRATION, SUCCES_REGISTRATION, SHOP_ROUTE} from "../utils/const";
import { registration, login } from '../http/userApi';
import { observer } from 'mobx-react-lite';
import { Context } from '..';

const Auth = observer (() => {
    const {user} = useContext(Context)

    let navigate = useNavigate()
    const location = useLocation()
    const isLogin = location.pathname === LOGIN

    const [userName, setUserName] = useState("")
    const [email, setEmail] = useState("")
    const [loading, setLoading] = useState(false);
    const [values, setValues] = useState({
        password: '',
        confirmPassword: '',
        showPassword: false,
        showConfirmPassword: false
    });

    const [validationValues, setValidation] = useState({
        emailDirty: false,
        emailError: "Email can't be empty",
        nickDirty: false,
        nickError: "Username can't be empty", 
        passwordDirty: false,
        passwordError: "Password can't be empty",
        confirmPasswordDirty: false,
        confirmPasswordError: "This field can't be empty",
    })

    const click = async () => {
        setLoading(true)
        if(isLogin) {
            if(validationValues.passwordError.length === 0 && validationValues.emailError.length === 0){
                const response = await login(email, values.password)
                user.setUser(user)
                user.setIsAuth(true)
                console.log(response)
                setLoading(false)
                navigate(SHOP_ROUTE)
            } else {
                setLoading(false)
            }
        } else {
            if(values.password === values.confirmPassword && validationValues.emailError.length  === 0 && validationValues.nickError.length  === 0 && validationValues.passwordError.length ===0 && validationValues.confirmPasswordError.length ===0) {
                const response = await registration(userName, email, values.password, values.confirmPassword)
                if(response.data.status === 0 ) {
                    navigate(SUCCES_REGISTRATION)
                    setLoading(false)
                }
                console.log(response.data.status)
            } else if(values.password !==values.confirmPassword) {
                setLoading(false)
                setValidation({...validationValues, confirmPasswordError: "passwords do not match", confirmPasswordDirty: true})
            } else{
                setLoading(false)
            }
        }
    }

    const emailHandler = (e) => {
        setEmail(e.target.value)
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        if(!re.test(String(e.target.value).toLowerCase())){
            setValidation({...validationValues, emailError: "Incorrect email"})
        } else {
            setValidation({...validationValues, emailError: "", emailDirty: false})
        }
    }

    const nickHandler = (e) => {
        setUserName(e.target.value)
        setValidation({...validationValues, nickError: "", nickDirty: false})
    }

    const passHandler = (e) => {
        setValues({...values, password: e.target.value})
        if(e.target.value.length < 6) {
            setValidation({...validationValues, passwordError: "Password must have 6 symbols"})
        } else {
            setValidation({...validationValues, passwordError: "", passwordDirty: false})
        }
    }

    const confirmPassHandler = (e) => {
        setValues({...values, confirmPassword: e.target.value})
        setValidation({...validationValues, confirmPasswordError: "", confirmPasswordDirty: false})
    }

    const handleClickShowPassword = () => {
        setValues({
          ...values,
          showPassword: !values.showPassword,
        });
    };

    const handleClickShowConfirmPassword = () => {
        setValues({
          ...values,
          showConfirmPassword: !values.showConfirmPassword,
        });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const blurHandle = (e) => {
        switch (e.target.name) {
            case "email":
                setValidation({...validationValues, emailDirty: true})
                break
            case "nick":
                setValidation({...validationValues, nickDirty: true})
                break
            case "password":
                setValidation({...validationValues, passwordDirty: true})
                break
            case "confirmPassword":
                setValidation({...validationValues, confirmPasswordDirty: true})
                break
            default:
                console.log("Some error")
        }
    }

    return (
        <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            style={{marginTop: 50}}
        >
            <Card sx={{ width: 475}}>
                <div style={{display: "flex", justifyContent:"center"}}>
                    <AccountCircleIcon color="action" sx={{fontSize: 100, color: "grey", textAlign: "center"}}/>
                </div>
          <CardContent sx={{paddingY: 0}}>   
                <Typography sx={{ fontSize: 30, textAlign: "center" }} color="text.secondary" gutterBottom>
                    {isLogin ? "Login": "Authorization"}
                </Typography>
                {isLogin ? "" : 
                    <>
                    <TextField 
                        name="nick"
                        error={validationValues.nickDirty && validationValues.nickError.length > 0 ? true : false}
                        style={{width: "100%"}} 
                        id="outlined-basic" 
                        label="Username" 
                        variant="outlined" 
                        value={userName}
                        onBlur={e => blurHandle(e)}
                        onChange={e => nickHandler(e)}
                    />
                    {validationValues.nickDirty && validationValues.nickError.length > 0 ? <Alert severity="error">{validationValues.nickError}</Alert> : ""}
                    </>
                    }
                <TextField 
                    name="email"
                    error={validationValues.emailDirty && validationValues.emailError.length > 0 ? true : false}
                    style={{width: "100%", marginTop: 10}} 
                    id="outlined-basic-email" 
                    label="Email" 
                    variant="outlined" 
                    value={email}
                    onBlur={e => blurHandle(e)}
                    onChange={e => emailHandler(e)}
                />
                {validationValues.emailDirty && validationValues.emailError.length > 0 ? <Alert severity="error">{validationValues.emailError}</Alert> : ""}
                <FormControl sx={{ width: '100%', mt: 1}} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                <OutlinedInput
                    error={validationValues.passwordDirty && validationValues.passwordError.length > 0 ? true : false}
                    name="password"
                    id="outlined-adornment-password"
                    type={values.showPassword ? 'text' : 'password'}
                    value={values.password}
                    onBlur={e => blurHandle(e)}
                    onChange={e => passHandler(e)}
                    endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                        >
                        {values.showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </InputAdornment>
                    }
                    label="Password"
                />
                {validationValues.passwordDirty && validationValues.passwordError.length > 0 ? <Alert severity="error">{validationValues.passwordError}</Alert>  : ""}
                
                </FormControl>
                {isLogin ? "" : 
                <FormControl sx={{mt: 1, width: '100%' }} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">Confirm password</InputLabel>
                <OutlinedInput
                    error={validationValues.confirmPasswordDirty && validationValues.confirmPasswordError.length > 0 ? true: false}
                    name="confirmPassword"
                    id="outlined-adornment--confirm-password"
                    type={values.showConfirmPassword ? 'text' : 'password'}
                    value={values.confirmPassword}
                    onBlur={e => blurHandle(e)}
                    onChange={e => confirmPassHandler(e)}
                    endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowConfirmPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                        >
                        {values.showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </InputAdornment>
                    }
                    label="Confirm password"
                />
                {validationValues.confirmPasswordDirty && validationValues.confirmPasswordError.length > 0 ? <Alert severity="error">{validationValues.confirmPasswordError}</Alert>  : ""}
                </FormControl>
                }
            </CardContent>
            <CardActions sx={{display: "flex", alignItems: "center", paddingX: 2, justifyContent: "space-between"}}>
                {isLogin ? 
                    <div style={{marginLeft: "3px"}}>
                        Don't have account, 
                        <NavLink style={{color: "blue", textDecoration: "none"}} to={REGISTRATION}> register now</NavLink>
                    </div>
                : 
                    <div style={{marginLeft: "3px"}}>
                        Have account,  
                        <NavLink style={{color: "blue", textDecoration: "none"}} to={LOGIN}> login for you account</NavLink>
                    </div>
                }
                <LoadingButton 
                    sx={{width: "120px"}}
                    onClick={click} 
                    endIcon={<LoginIcon />}
                    loading={loading} 
                    loadingPosition="end" 
                    variant="contained">
                        {isLogin ? "Login" : "Sign Up"}
                </LoadingButton>
            </CardActions>
            </Card>
        </Grid>
        
      );
})

export default Auth;