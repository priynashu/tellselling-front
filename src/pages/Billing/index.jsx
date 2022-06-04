import React, {useState,useEffect} from 'react';
import {AccountTopbar} from '../../components';
import styles from './Billing.module.scss'
import {
    Row,
    Col,
    Container,
    Button,
    Card,
    Form
} from 'react-bootstrap'
import {RiMastercardFill} from 'react-icons/ri'
import UpgradePlan from "./UpgradePlan"
import axios from "axios"
import { getLocalUser } from '../../utils/GetLocalUser';
import {backend_url} from "../../utils/Config"
import StripeCheckout from "react-stripe-checkout"
import { HistoryTable } from './HistoryTable';

const Billing = () => {
useEffect(()=>{
    
    getPlan();    
    getHistoryData();
    console.log("inside effect");
},[])

    const [planDetails,setPlanDetails] = useState();
    const [previousCost,setPreviousCost] = useState();
    const [historyData,setHistoryData] = useState()
    
    const getPlan = async()=>{
        const localUser = getLocalUser();
        const tenantId = localUser.tenantId;
        await axios.get(backend_url+`billing/${tenantId}`).then((res)=>{
            const data=res.data;
            console.log("billing data fetched is",data[0]);
            setPlanDetails(data[0])
            setExpiryDate(data[0].expiryDate)
            setPlanType(data[0].planType)
            setPreviousCost(data[0].cost)
        })
        
    }
    const getHistoryData = async()=>{
        const localUser = getLocalUser();
        const tenantId = localUser.tenantId;
        await axios.get(backend_url+`billing/bills/last/${tenantId}`).then((res)=>{
            const data=res.data;
            console.log("history Data fetched",data.data);
            setHistoryData(data)
        })
    }
    // console.log("plan details is ",planDetails);
    const [planType,setPlanType] = useState("Basic");
    const [date,
        setDate] = useState(new Date());
    
    const setExpDate = (date) => {

        //  console.log();
        const dateParts = date
            .toDateString()
            .split(" ");
        const day = dateParts[2];
        const month = dateParts[1];
        const year = dateParts[3];
        const newDate = month + " " + day + ", " + year;
        // console.log("new date is",newDate);
        
        return newDate;
    }
    const [expiryDate,
        // setExpiryDate] = useState(planDetails.expiryDate);
        setExpiryDate] = useState(planDetails?planDetails.expiryDate:setExpDate(date));
        
    const [cardHolderName,
        setCardHolderName] = useState("Tom McBride");
    const [cardNumber,
        setCardNumber] = useState("123456789999");
    const [cardExpiry,
        setCardExpiry] = useState("12/24");

    // console.log(cardNumberString);

    const [open,
        setOpen] = useState(false);
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handleClick = () => {
        // console.log("inside handle Click");
        handleOpen();
        return <UpgradePlan open={open} setOpen={setOpen} setExpDate={setExpDate} setPlanType={setPlanType} planType={planType} expiryDate={expiryDate} setExpiryDate={setExpiryDate} />
    }
     
    return <>
    <UpgradePlan open={open} handleClose={handleClose}setExpDate={setExpDate} setPlanType={setPlanType} planType={planType} expiryDate={expiryDate} setExpiryDate={setExpiryDate} previousCost={previousCost} setPreviousCost={setPreviousCost} getHistoryData={getHistoryData}/>
     < AccountTopbar /> <div className={styles.account_wrapper}>
        <div className={styles.profile_details}>
            <h2 className={styles.title}>Current Plan</h2>
            <hr/>
            <Container className="py-3">
                <Row>
                    <Col className="px-3" sm={6} style={{paddingLeft:"0"}}>
                        <h5 className={styles.current_plan}>Your Current Plan is <strong>{planType}</strong></h5>
                        <p className={styles.text_plan}>A simple start to everyone</p>
                        <br/>
                        <h5 className={styles.current_plan}>Active until {expiryDate}</h5>
                        <p className={styles.text_plan}>We will send you a notification upon Subscription expiration</p>
                        <br/>
                        <br/>
                        <div>
                            <Button className={styles.upgrade_plan} onClick={handleClick}>Upgrade Plan</Button>
                            &nbsp;&nbsp;<Button variant="custom" className={styles.cancel_btn}>Cancel Subscription</Button>
                        </div>
                    </Col>
                    <Col className="px-4" sm={6}>
                        <h6 className={styles.card_text}>My cards</h6>
                        <Card className="py-2 px-3">
                            <Row>
                                <Col sm={6}>
                                    <RiMastercardFill size={40}/>
                                    <br/>

                                    <Card.Text className={styles.card_name}>{cardHolderName}
                                        <Button size="sm" variant='custom' className={styles.cardNameBtn}>Primary</Button>
                                    </Card.Text>
                                    <Card.Text>
                                        <span className={styles.card_number}>∗∗∗∗ ∗∗∗∗ &nbsp;{cardNumber.substring(8, 12)}</span>
                                        </Card.Text>
                                </Col>
                                <Col sm={6} className="py-2">
                                    <Button variant="custom" className={styles.delete}>Delete</Button>
                                    <Button variant="custom" className={styles.edit}>Edit</Button>
                                    <br/>
                                    <p className={styles.cardExpiry}>Card expires at {cardExpiry}</p>
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                </Row>

            </Container>

        </div>
    </div> < div className = {
        styles.account_wrapper
    } > <div className={styles.profile_details}>
        <h2 className={styles.title}>Invoice Info</h2>
        <hr/>
        <Form className="p-4">
            <Row className="mt-2">
                <Col style={{paddingLeft:"0"}}>
                    <Form.Label  className={styles.label_form}>First Name</Form.Label>
                    <Form.Control className={styles.input_form}placeholder="First Name"></Form.Control>
                </Col>
                <Col style={{paddingLeft:"0"}}>
                    <Form.Label className={styles.label_form}>Last Name</Form.Label>
                    <Form.Control className={styles.input_form}placeholder="Last Name"></Form.Control>
                </Col>
            </Row>
            <Row className="mt-3">
                <Col style={{paddingLeft:"0"}}>
                    <Form.Label className={styles.label_form}>Company Name</Form.Label>
                    <Form.Control className={styles.input_form}placeholder="Company Name"></Form.Control>
                </Col>
                <Col style={{paddingLeft:"0"}}>
                    <Form.Label className={styles.label_form}>VAT Number</Form.Label>
                    <Form.Control className={styles.input_form} placeholder="VAT Number"></Form.Control>
                </Col>
            </Row>
            <Row className="mt-3">
                <Form.Label className={styles.label_form}>Billing Address</Form.Label>
                <Form.Control className={styles.input_form}placeholder="Billing Address"></Form.Control>
            </Row>
        </Form>
        <br/>

        <div className="m-3">
            <Button className={styles.upgrade_plan}>Save Changes</Button>&nbsp;&nbsp;
            <Button variant='custom' className={styles.discard_btn}>Discard</Button>
        </div>
        {/* <StripeCheckout
        className="center"
        stripeKey='pk_test_eibAhYcqbWgf5bbM4JSGyJjs00bxqSvPNH'
        token={handleToken}
        amount={product.price * 100}
        name={product.name}
        /> */}
        
    </div> </div>     
          <HistoryTable historyData={historyData?.data} />
     </>;
};

export {Billing};