import React, { useContext, useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./components/AppRoutes";
import NavBar from "./components/NavBar"
import {CircularProgress, Box} from '@mui/material/';
import "./App.css"
import { observer } from 'mobx-react-lite';
import { Context } from ".";
import { getMe } from "./http/userApi";

const App = observer(() => {
  const {user} = useContext(Context)
  const [loadin, setLoading] = useState(true)

  useEffect(() => {
    getMe().then(data => {
      user.setUser(true)
      user.setIsAuth(true)
    }).finally(() => setLoading(false))
  }, [])

  if(loadin){
    return(
      <Box sx={{ 
        display: 'flex', 
        justifyContent: "center", 
        height: "100%", 
        alignItems: "center", 
        top: 0, 
        left: 0, 
        right: 0, 
        bottom: 0, 
        position: "fixed" }}>
        <CircularProgress />
      </Box>
    )
  }

  return (
    <BrowserRouter>
      <NavBar/>
      <>
        <AppRouter/>
      </>
    </BrowserRouter>
  );
})

export default App;
