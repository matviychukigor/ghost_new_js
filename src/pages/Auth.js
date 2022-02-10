import React, {useState} from 'react';

import { TextField, FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton, Card, CardActions, CardContent, Button, Typography, Grid} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import { NavLink, useLocation, useNavigate } from 'react-router-dom';

import {LOGIN, REGISTRATION, SUCCES_REGISTRATION} from "../utils/const";
import { registration, login } from '../http/userApi';

const Auth = () => {
    let navigate = useNavigate()
    const location = useLocation()
    const isLogin = location.pathname === LOGIN

    const [userName, setUserName] = useState("")
    const [email, setEmail] = useState("")
    const [values, setValues] = useState({
        password: '',
        confirmPassword: '',
        showPassword: false,
        showConfirmPassword: false
    });

    const click = async () => {
        if(isLogin) {
            const response = await login(email, values.password)
            console.log(response)
        } else {
            const response = await registration(userName, email, values.password, values.confirmPassword)
            if(response.data.status === 0 ) {
                navigate(SUCCES_REGISTRATION)
            }
            console.log(response.data.status)
        }
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

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return (
        <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            style={{marginTop: 50}}
        >
            <Card sx={{ maxWidth: 475}}>
                <div style={{display: "flex", justifyContent:"center"}}>
                    <AccountCircleIcon color="action" sx={{fontSize: 100, color: "grey", textAlign: "center"}}/>
                </div>
          <CardContent sx={{paddingY: 0}}>   
                <Typography sx={{ fontSize: 30, textAlign: "center" }} color="text.secondary" gutterBottom>
                    {isLogin ? "Login": "Authorization"}
                </Typography>
                {isLogin ? "" : 
                    <TextField 
                        style={{width: "100%", marginBottom: 10}} 
                        id="outlined-basic" 
                        label="Username" 
                        variant="outlined" 
                        value={userName}
                        onChange={e => setUserName(e.target.value)}
                    />}
                <TextField 
                    style={{width: "100%", marginBottom: 10}} 
                    id="outlined-basic-email" 
                    label="Email" 
                    variant="outlined" 
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
                <FormControl sx={{ width: '100%' }} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                <OutlinedInput
                    id="outlined-adornment-password"
                    type={values.showPassword ? 'text' : 'password'}
                    value={values.password}
                    onChange={handleChange('password')}
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
                </FormControl>
                {isLogin ? "" : 
                <FormControl sx={{mt: 1, width: '100%' }} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">Confirm password</InputLabel>
                <OutlinedInput
                    id="outlined-adornment--confirm-password"
                    type={values.showConfirmPassword ? 'text' : 'password'}
                    value={values.confirmPassword}
                    onChange={handleChange('confirmPassword')}
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
                </FormControl>
                }
            </CardContent>
            <CardActions sx={{display: "flex", alignItems: "center", paddingX: 2, justifyContent: "space-between"}}>
                {isLogin ? 
                    <div style={{marginLeft: "3px"}}>
                        If you don't have account, 
                        <NavLink style={{color: "blue", textDecoration: "none"}} to={REGISTRATION}> register now</NavLink>
                    </div>
                : 
                    <div style={{marginLeft: "3px"}}>
                        If you have account,  
                        <NavLink style={{color: "blue", textDecoration: "none"}} to={LOGIN}> login for you account</NavLink>
                    </div>
                }
                <Button onClick={click} variant="contained">{isLogin ? "Login" : "Sign Up"}</Button>
            </CardActions>
            </Card>
        </Grid>
        
      );
}

export default Auth;