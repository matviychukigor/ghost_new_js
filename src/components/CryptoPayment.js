import React, {useState, forwardRef} from "react";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import PaymentsIcon from '@mui/icons-material/Payments';
import LoadingButton from '@mui/lab/LoadingButton';

import {getCryptoLinkPay} from "../http/payments"

import NumberFormat from 'react-number-format';
import PropTypes from 'prop-types';


import bitcoin from "../img/bitcoin.png"

const NumberFormatCustom = forwardRef(function NumberFormatCustom(props, ref) {
    const { onChange, ...other } = props;
  
    return (
      <NumberFormat
        {...other}
        getInputRef={ref}
        onValueChange={(values) => {
          onChange({
            target: {
              name: props.name,
              value: values.value,
            },
          });
        }}
        thousandSeparator
        isNumericString
        prefix="$"
      />
    );
});
  
NumberFormatCustom.propTypes = {
name: PropTypes.string.isRequired,
onChange: PropTypes.func.isRequired,
};

const CryptoPayment = () => {
    
    const [inputValue, setInputValue] = useState(10)
    const [loading, setLoading] = useState(false)

    const changeSumCrypto = (e) => {
        setInputValue(e.target.value)
    }

    const handleClick = () => {
        setLoading(true)
        getCryptoLinkPay(inputValue).then(link => {
            console.log(link)
            window.open(link.data, '_blank');
            setLoading(false)
        })
    }

    return(
        <Card sx={{ maxWidth: "30%", marginTop: 5 }}>
            <div style={{display: "flex", justifyContent: "center", marginTop: "20px"}}>
                <Typography gutterBottom variant="h5" component="div" sx={{fontWeight: 800, fontSize: "30px", fontFamily: "sans-serif", color: "#1776d2"}}>
                    Cryptocurrensy payment
                </Typography>
            </div>
            <div style={{width: "100%"}}>
                <CardMedia
                    component="img"
                    height="100%"
                    image={bitcoin}
                    alt="green iguana"
                />
            </div>
            
            <CardContent>
                <Typography variant="body2" color="text.secondary" sx={{textAlign: "justify", fontFamily: "sans-serif", color: "#1776d2", fontWeight: 600, fontSize: 15, height: 100}}>
                    We've done our best to allow you to send your payments with maximum anonymity. You can pay for our services with such cryptocurrencies as Bitcoin Dash Litecoin Dogecoin, Etherium
                </Typography>
                <div style={{marginTop: 15, display: "flex", justifyContent: "center"}}>
                <TextField
                    sx={{width: "50%"}}
                    label="amount"
                    value={inputValue}
                    onChange={e => changeSumCrypto(e)}
                    name="numberformat"
                    id="outlined-multiline-flexible"
                    InputProps={{
                    inputComponent: NumberFormatCustom,
                    }}
                    variant="outlined"
                />
                </div>
            </CardContent>
            <CardActions sx={{display: "flex", justifyContent: "center", paddingBottom: 5}}>
            <LoadingButton
                sx={{width:"50%"}}
                onClick={handleClick}
                endIcon={<PaymentsIcon />}
                loading={loading}
                loadingPosition="end"
                variant="contained"
            >
                Pay
            </LoadingButton>
            </CardActions>
        </Card>
    )
}

export default CryptoPayment;