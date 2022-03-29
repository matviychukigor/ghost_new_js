import React, {useState, useContext} from 'react';
import { Typography } from "@mui/material";
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';

import ErrorOutline from '@mui/icons-material/ErrorOutline';
import FilterListIcon from '@mui/icons-material/FilterList';

import {Context} from "..";


const Residential = () => {
    const {proxy} = useContext(Context)
    const [selectedId, setSelectedID] = useState(null);

    const onClickProxyHandler = (id, rowProxy) => {
        proxy.setInfoLoading(true)
        proxy.setSelecteProxy(rowProxy)
        proxy.setSpeedProxy(rowProxy.speed)
        setSelectedID(id)
        console.log(id)
    }

    if(proxy.proxyInfo[0] === "In this country proxy not found"){
        return(
            <div>
                <div style={{display: "flex", justifyContent: "center", marginTop: "15px"}}>
                    <ErrorOutline sx={{mr: 1, color: "red", fontSize: 70}}/>
                </div>
                <div style={{display: "flex", flexDirection: "row", justifyContent: "center"}}>
                    <Typography sx={{ fontSize: 18, textAlign: "center", color: "red" }} color="text.secondary" gutterBottom>
                        {proxy.proxyInfo[0]}
                    </Typography>
                </div>
            </div>
        )
    }

    return (
        <Paper sx={{overflow: 'hidden'}}>
            <TableContainer sx={{maxHeight:'72vh'}}>
                <Table stickyHeader>
                    <TableHead>
                        <TableRow>
                            <TableCell>IP</TableCell>
                            <TableCell align="left">HostName</TableCell>
                            <TableCell align="left">Country</TableCell>
                            <TableCell align="left">State</TableCell>
                            <TableCell align="left">City</TableCell>
                            <TableCell align="left">ZIP</TableCell>
                            <TableCell align="center">Speed</TableCell>
                            <TableCell align="center">Type</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {proxy.proxyInfo.map((row) => (
                            <TableRow hover selected={selectedId === row.id_proxy}
                                      onClick={() => onClickProxyHandler(row.id_proxy, row)} key={row.id_proxy}>
                                <TableCell style={{width: "15%"}} component="th" scope="row">
                                    {row.ip}
                                </TableCell>
                                <TableCell style={{width: "15%"}} align="left">
                                    {row.domain}
                                </TableCell>
                                <TableCell style={{width: "17%"}} align="left">
                                    {row.country}
                                </TableCell>
                                <TableCell style={{width: "15%"}} align="left">
                                    {row.state === "" ? "---" : row.state}
                                </TableCell>
                                <TableCell style={{width: "15%"}} align="left">
                                    {row.city === "-" || row.city === "" ? "---" : row.city}
                                </TableCell>
                                <TableCell style={{width: "10%"}} align="left">
                                    {row.zip === "" ? "---" : row.zip}
                                </TableCell>
                                <TableCell style={{width: "10%"}} align="left">
                                    {row.speed}
                                </TableCell>
                                <TableCell style={{width: "10%"}} align="left">
                                    {row.type}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
}

export default Residential;