import React, {useState, forwardRef, useContext} from "react";

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import PaymentsIcon from '@mui/icons-material/Payments';
import LoadingButton from '@mui/lab/LoadingButton';
import ChekerInput from "./Cheker_input";

import { getCardLinkPay } from "../http/payments";

import NumberFormat from 'react-number-format';
import PropTypes from 'prop-types';

import { observer } from 'mobx-react-lite';
import { Context } from '..';

import visa from "../img/Visa.png"

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

const CardPayment = observer (() => {

    const {payment} = useContext(Context)

    const [loading, setLoading] = useState(false)
    const [inputCard, setInputCard] = useState(10)

    const changeSumCard = (e) => {
        setInputCard(e.target.value)
    }

    const handleClick = () =>{
        setLoading(true)
        getCardLinkPay(inputCard, payment.selectCardCountry.code).then(link => {
            console.log(link.data.url)
            window.open(link.data.url, '_blank');
            setLoading(false)
        })
    }

    return(
        <Card sx={{ maxWidth: "30%", marginTop: 5 }}>
            <div style={{display: "flex", justifyContent: "center", marginTop: "20px"}}>
                <Typography gutterBottom variant="h5" component="div" sx={{fontWeight: 800, fontSize: "30px", fontFamily: "sans-serif", color: "#1776d2"}}>
                    VISA MasterCard  payment
                </Typography>
            </div>
            <div style={{width: "100%"}}>
                <CardMedia
                    component="img"
                    height="350px"
                    image={visa}
                    alt="green iguana"
                />
            </div>
            
            <CardContent>
                <Typography variant="body2" color="text.secondary" sx={{textAlign: "justify", fontFamily: "sans-serif", color: "#1776d2", fontWeight: 600, fontSize: 15, height: 100}}>
                    For the sake of transparency with our service, we added payment with a visa card or a mastercard, Ukrainian or Russian banking. Collect the country of your card, pay the sum, pay and claim with our service.
                </Typography>
                <div style={{marginTop: 15, display: "flex", justifyContent: "center"}}>
                <TextField
                    sx={{width: "50%"}}
                    label="amount"
                    value={inputCard}
                    onChange={e => changeSumCard(e)}
                    name="numberformat"
                    id="outlined-multiline-flexible"
                    InputProps={{
                    inputComponent: NumberFormatCustom,
                    }}
                    variant="outlined"
                />
                
                </div>
                <div style={{marginTop: 15, display: "flex", justifyContent: "center"}}>
                    <ChekerInput sx={{width: "30%"}} countries={payment.countryCardStore}/>
                </div>
            </CardContent>
            <CardActions sx={{display: "flex", justifyContent: "center", paddingBottom: 5}}>
            <LoadingButton
                sx={{width: "50%"}}
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
});


export default CardPayment;