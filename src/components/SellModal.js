import React, {useContext} from 'react'

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Loader from "../components/Loader";

import { observer } from 'mobx-react-lite';
import { Context } from '..';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: 5,
    p: 4,
};

const SellModal = observer (() => {
    const {proxy} = useContext(Context)

    const handleClose = () => proxy.setModalOn(false);

    return(
        <div>
            <Modal
                open={proxy.modalOn}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div style={{display: "flex", justifyContent: "center"}}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Your proxy:
                        </Typography>
                    </div>
                    <div style={{display: "flex"}}>
                        <div style={{display: "flex", flexDirection: "column", marginRight: "100px"}}>
                            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                Login: 
                            </Typography>
                            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                Password: 
                            </Typography>
                            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                Real IP: 
                            </Typography>
                            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                IP: 
                            </Typography>
                            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                PORT: 
                            </Typography>
                        </div>
                        <div style={{display: "flex", flexDirection: "column"}}>
                            {proxy.sellProxy === null ? <Loader/> : 
                                <div>
                                    <Typography id="modal-modal-description" sx={{ mt: 2, color: "#1776d2" }}>
                                        {proxy.sellProxy.data.login} 
                                    </Typography>
                                    <Typography id="modal-modal-description" sx={{ mt: 2, color: "#1776d2" }}>
                                        {proxy.sellProxy.data.password}
                                    </Typography>
                                    <Typography id="modal-modal-description" sx={{ mt: 2, color: "#1776d2" }}>
                                        {proxy.sellProxy.data.real_ip}
                                    </Typography>
                                    <Typography id="modal-modal-description" sx={{ mt: 2, color: "#1776d2" }}>
                                        {proxy.sellProxy.data.ip}
                                    </Typography>
                                    <Typography id="modal-modal-description" sx={{ mt: 2, color: "#1776d2" }}>
                                        {proxy.sellProxy.data.port}
                                    </Typography> 
                                </div>
                            }
                        </div>
                    </div>
                </Box>
            </Modal>
        </div>
    )
});

export default SellModal;