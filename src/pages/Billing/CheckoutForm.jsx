import React, {useState,useEffect} from 'react';
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import StripeCheckout from "react-stripe-checkout"
import styles from './Billing.module.scss'
import {Button,Card} from 'react-bootstrap'
import axios from 'axios'
import { backend_url } from '../../utils/Config';
const CheckoutForm=()=>{
    const stripe = useStripe();
const elements = useElements();
const [product,setProduct] = useState({
    name:"standard",
    price:10,    
})
const handleSubmit= async(event)=>{
    event.preventDefault();
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });
    console.log("paymentMethod is",paymentMethod);
    const body={paymentMethod,product}
    await axios.post(backend_url+"billing/payment",body).then((res)=>{
            console.log("response stripe",res.data);
            }).catch((err)=>{
            console.log("error in stripe payment",err);
        })
    
}
    const handleStripePayment = async (token)=>{
        console.log("inside stripe payment");
        const { error, paymentMethod } = await stripe.createPaymentMethod({
          type: 'card',          
          card: elements.getElement(StripeCheckout),          
        })
        // 4242 4242 4242 4242
          console.log("paymentMethod is",paymentMethod);
        //   if (!error) {
        //     console.log("Stripe 23 | token generated!", paymentMethod);
        //     const body ={product,token,paymentMethod}
        //     await axios.post("http://localhost:5000/billing/payment",body).then((res)=>{
        //     console.log("response stripe",res.data);
        //     }).catch((err)=>{
        //     console.log("error in stripe payment",err);
        // })
        //   } else {
        //     console.log(error.message);
        //   }
        
        
        console.log("inside stripe payment",token);
    }
    return(<>
    <StripeCheckout
        stripeKey='pk_test_51KZUNUSJJzWspg9OxEjMUXfFyOv5WICmHILLCmFH8ihCGDv2hFg6W7N65VVmBPluVE6U5vU8JXoRzICbsWp8UFOu00DzARu3vO'
        token={handleStripePayment}
        name="buy react"
        amount={product.price * 100}
        ><Button className={styles.upgrade_plan}>Buy something</Button></StripeCheckout>
        <Card className={styles.pay_card} >
        <form onSubmit={handleSubmit} style={{ maxWidth: 400 }}>
      <CardElement  className="m-3" style={{fontSize:"15px"}}/>
      <Button className={styles.upgrade_plan} type="submit" >Pay</Button>
    </form>
        </Card>
        
    </>)
}
export default CheckoutForm