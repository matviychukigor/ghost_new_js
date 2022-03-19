import React, {useState, useContext} from "react";

import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

import LtePlusMobiledataIcon from '@mui/icons-material/LtePlusMobiledata';
import Looks5Icon from '@mui/icons-material/Looks5';

import {Context} from "..";

const WithoutAuth = () => {
    const {withoutProxy} = useContext(Context)
    const [selectedId, setSelectedID] = useState(null)

    const onClickProxyHandler = (id, rowProxy) => {
        withoutProxy.setSelecteProxyWithout(rowProxy)
        setSelectedID(id)
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
                            <TableCell align="center">ISP</TableCell>
                            <TableCell align="left">State</TableCell>
                            <TableCell align="left">City</TableCell>
                            <TableCell align="left">Speed</TableCell>
                            <TableCell align="left">Version</TableCell>
                            <TableCell align="center">Price</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {withoutProxy.proxyWithoutInfo.map((row) => (
                            <TableRow hover selected={selectedId === row.id}
                                      onClick={() => onClickProxyHandler(row.id, row)} key={row.id}>
                                <TableCell component="th" scope="row">
                                    {row.ip}
                                </TableCell>
                                <TableCell align="left">
                                    {row.hostname}
                                </TableCell>
                                <TableCell sx={{minWidth: 100}} align="left">
                                    {row.country}
                                </TableCell>
                                <TableCell align="center">
                                    {row.isp}
                                </TableCell>
                                <TableCell align="left">
                                    {row.state === "-" ? "---" : row.state}
                                </TableCell>
                                <TableCell align="left">
                                    {row.city === "-" || row.city === "" ? "---" : row.city}
                                </TableCell>
                                <TableCell align="center">
                                    {row.speed === "Fast" ? <LtePlusMobiledataIcon sx={{color: "green", fontSize: 30}}/> : row.speed}
                                </TableCell>
                                <TableCell align="center">
                                    {row.version == "5" ? <Looks5Icon sx={{color: "#1776d2", fontSize: 30}}/> : row.version}
                                </TableCell>
                                <TableCell sx={{minWidth: 100}} align="center">
                                    <Button variant="outlined">{row.price} $</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper> 
    )
}

export default WithoutAuth;