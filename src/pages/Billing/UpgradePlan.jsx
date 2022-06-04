import $ from "jquery";
import {
    Container,
    Row,
    Col,
    Card,
    Button,
    ToggleButton,
    ToggleButtonGroup
} from 'react-bootstrap';
import React, {useState} from 'react'
import styles from './Billing.module.scss'
import {Modal, Box, Switch} from '@mui/material';
import {CgClose} from 'react-icons/cg'
import { getLocalUser } from '../../utils/GetLocalUser';
import axios from 'axios'
import {GiPlantSeed,GiPlantsAndAnimals} from "react-icons/gi"
import {RiPlantFill} from 'react-icons/ri'
import { backend_url } from '../../utils/Config';
import StripeCheckout from "react-stripe-checkout"
import './styles.css'
window.jQuery = $;
window.$ = $;
const UpgradePlan = ({handleClose, open,setPlanType,planType,setExpDate,setExpiryDate,expiryDate,previousCost,setPreviousCost}) => {
    // console.log("inside upgrade");
    const localUser = getLocalUser();
            const tenantId = localUser.tenantId;
    const [product,setProduct]=useState({name:"select one plan",price:"0.99",description:"Select one plan"})
    
    const handleToken= async(token)=>{
    //    console.log("plan type",planType);
       const response = await axios.post(backend_url+"billing/payment",{token,product,tenantId})
       console.log("token is",response.status); 
        if(response.status===200)
        {
       
        const data = {
            planType:planType,
            tenantId:tenantId,
            features:features,
            cost:cost,
            expiryDate:expiryDate,
            validity:validity,
            customerId:response.data.customerId
        }
        setPreviousCost(cost)
        console.log("data to upgrade ",data);
        axios.post(backend_url+"billing/create",data).then((res)=>{
            console.log("response",res.data);
            handleClose();

        }).catch((err)=>{
            console.log("error in upgrade billing",err);
        })
        handleClose();
        console.log("data to upgrade",data);
    }
    else{
        console.log("payment failed");
    }
    }

    const [validity,setValidity] = useState("1 Month");
    const [cost,setCost] = useState("");
    const [features,setFeatures] = useState([]);
    const [manualAnnual,setManualAnnual] = useState(false)
    const handleChange = (e)=>{
        // console.log("switch",e.target.checked);
        setManualAnnual(e.target.checked)
            if(e.target.checked)
            {
                document.getElementById("usd_year").style.display="block"
                document.getElementById("usd1_year").style.display="block"
                document.getElementById("enterprise_value").innerHTML="80"
                document.getElementById("standard_value").innerHTML="40"
                document.getElementById("enterprise_annual").style.display="block"
                document.getElementById("enterprise_month").style.display="none"
                document.getElementById("standard_month").style.display="none"
                document.getElementById("standard_annual").style.display="block"
                setValidity("1 Year")
            }
            else {
                document.getElementById("usd_year").style.display="none";
                document.getElementById("usd1_year").style.display="none";
                document.getElementById("standard_value").innerHTML="49"
                document.getElementById("enterprise_value").innerHTML="99"
                document.getElementById("standard_month").style.display="block"
                document.getElementById("standard_annual").style.display="none"
                document.getElementById("enterprise_month").style.display="block"
                document.getElementById("enterprise_annual").style.display="none"
                setValidity("1 Month")
            }
            
            
    }
    const fillValues = async(name)=>{
        
        var myPromise = new Promise(function(resolve,reject){
            setTimeout(()=>{
                const date = new Date();                

                if(manualAnnual){
                    var newDate = new Date(date.setFullYear(date.getFullYear()+1));
                    
                setExpiryDate(setExpDate(newDate));
                }
                else{
                    var newDate = new Date(date.setMonth(date.getMonth()+1));
                    setExpiryDate(setExpDate(newDate));
                }
                
                if(name=="Standard"){
                    setPlanType(name);
                    setCost(manualAnnual?"480":"49")
                    setProduct({ ...product, ["price"]: manualAnnual?"480":"49",["name"]:name  });
                    setFeatures(["Unlimited responses","Unlimited forms and rooms","Instagram profile page","Google docs integration",'Custom "Thank You" page'])
                }
                else if(name=="Enterprise"){
                     setPlanType(name);
                     setCost(manualAnnual?"960":"99")
                     setProduct({ ...product, ["price"]: manualAnnual?"960":"99",["name"]:name });
                     setFeatures(["PayPal payments","Logic Jumps","File upload with 5GB storage","Custom domain support","Stripe Intergration"])
                }
                else if(name=="Basic")  
                {
                    setPlanType(name);
                     setCost(manualAnnual?"2":"2")
                     setProduct({ ...product, ["price"]: manualAnnual?"2":"2",["name"]:name  });
                     setFeatures(["PayPal payments","Logic Jumps","File upload with 5GB storage","Custom domain support","Stripe Intergration"])
                }
            resolve();
            ;},1000)
            
        })
        await myPromise;
            
    }
    const handleClick= async(e)=>{
            // console.log("handle upgrade");
            const name = e.target.name;
            const className = e.target.className
            if(className.includes("clicked"))
            {
                e.target.className = `${className.substring(0,className.length-8)}`
            }
            else {
                e.target.className = `${className} clicked`
            }
            console.log("type",e.target.className.split(" ")[0],e);
            fillValues(name);
            
            console.log(e.target.innerHTML="Upgrade <RiPlantFill />");
            // $(this).addClass('clicked');

            
    }
    const handleConfirmClick= ()=>{
        document.getElementsByClassName('stripeBtn')[0].click();
        
        // console.log(planType,features,cost,expiryDate);
    }
    return <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">

        <Box className={styles.box}>
            <Container className="">
                <CgClose className={styles.customizedButton} onClick={handleClose} style={{cursor:"pointer"}}/>
                <Row className="justify-content-md-center">
                    <Col>
                        <h3 className="text-center">Subscription Plan</h3>
                        <p className="text-center">All plans include 10+ advanced tools and features to
                            boost your digital sales. Choose the best plan to fit your needs.</p>
                    </Col>
                    <p className="text-center" style={{marginBottom:"5px"}}>Monthly<Switch
                        color="secondary"
                        style={{color: "white"}}
                        label="label"                        
                        size="large"
                        onChange={handleChange}
                        ></Switch>Annually</p>

                </Row>
                <Row className="justify-content-md-center" style={{width:"900px"}}>
                    <Card
                        style={{
                        width: '16rem'
                    }}
                        className={styles.UpgradeCard}>
                        {/* <Card.Img variant="top" src="holder.js/100px180?text=Image cap"/> */}
                        <Card.Body
                            style={{padding: "0",paddingTop:"10px",textAlign:"center"}}>
                        <GiPlantSeed size={60} style={{color:"#008000",textAlign:"center",paddingBottom:"10px"}}/>
                            <Card.Title className="text-center" style={{fontSize:"15px"}}>Basic</Card.Title>
                            <Card.Text className="text-center" style={{fontSize:"15px"}} >
                            A simple start for everyone
                            </Card.Text>
                        </Card.Body>
                        <div className={styles.price}>
                            <span className={styles.currency}>$</span>
                            <span  className={styles.value}>2</span>
                            <span className={styles.duration}>month</span>
                        </div>
                        <ul>
                            <li>100 responses a month</li>
                            <li>Unlimited forms and rooms</li>
                            <li>Unlimited fields</li>
                            <li>Basic form creation tools</li>
                            <li>Up to 2 subdomains</li>
                        </ul>
                        {/* previous Cost:{previousCost} */}
                         <Card.Body className="text-center">
                         {previousCost=="2"?<Button className={styles.currentPlanBtn} name="Basic" >Current Plan</Button>:<Button className={styles.UpgradeBtn} name="Basic" onClick={handleClick}>Upgrade</Button>}                           
                            
                        </Card.Body>
                    </Card>
                    <Card
                        style={{
                        width: '16rem'
                    }}
                        className={styles.UpgradeCard}>
                        {/* <Card.Img variant="top" src="holder.js/100px180?text=Image cap"/> */}
                        <Card.Body
                            style={{padding: "0",paddingTop:"10px",textAlign:"center"}}>
                        <GiPlantsAndAnimals size={60} style={{color:"#008000",textAlign:"center",paddingBottom:"10px"}}/>    
                            <Card.Title className="text-center" style={{fontSize:"15px"}}>Standard</Card.Title>
                            <Card.Text className="text-center" style={{fontSize:"15px"}} >
                                For small to medium business
                            </Card.Text>
                        </Card.Body>
                        <div className={styles.price}>
                            <span className={styles.currency}>$</span>
                            <span id ="standard_value" className={styles.value}>49</span>
                            <span className={styles.duration}>month</span>
                            <p className={styles.usd_year} style={{display:"none"}} id="usd_year">USD 480/year</p>
                        </div>

                        <ul>
                            <li>Unlimited responses</li>
                            <li>Unlimited forms and rooms</li>
                            <li>Instagram profile page</li>
                            <li>Google docs integration</li>
                            <li>Custom "Thank You" page</li>
                        </ul>
                        <Card.Body className="text-center">
                        {previousCost=="49"?<Button className={styles.currentPlanBtn} id="standard_month" name="Standard" >Current Plan</Button>:<Button id="standard_month" className={styles.UpgradeBtn} name="Standard" onClick={handleClick}>Upgrade</Button>}
                        {previousCost=="480"?<Button className={styles.currentPlanBtn} style={{display:"none"}} id="standard_annual" name="Standard" >Current Plan</Button>:<Button style={{display:"none"}}className={styles.UpgradeBtn} id="standard_annual" name="Standard" onClick={handleClick}>Upgrade</Button>}
                            {/* <Button className={styles.UpgradeBtn} name="Standard" onClick={handleClick}>Upgrade</Button> */}
                        </Card.Body>
                    </Card>
                    <Card
                        style={{
                        width: '16rem'
                    }}
                        className={styles.UpgradeCard}>
                        {/* <Card.Img variant="top" src="holder.js/100px180?text=Image cap"/> */}
                        <Card.Body
                            style={{padding: "0",paddingTop:"10px",textAlign:"center"}}>
                        <RiPlantFill size={60} style={{color:"#008000",textAlign:"center",paddingBottom:"10px"}}/>    
                            <Card.Title className="text-center" style={{fontSize:"15px"}}>Enterprise</Card.Title>
                            <Card.Text className="text-center" style={{fontSize:"15px"}} >
                                Solution for Big Organizations
                            </Card.Text>
                        </Card.Body>
                        <div className={styles.price}>
                            <span className={styles.currency}>$</span>
                            <span id="enterprise_value"className={styles.value}>99</span>
                            <span className={styles.duration}>month</span>
                            <p className={styles.usd_year} id="usd1_year" style={{display:"none"}}>USD 960/year</p>
                        </div>
                        <ul>
                            <li>PayPal payments</li>
                            <li>Logic Jumps</li>
                            <li>File upload with 5GB storage</li>
                            <li>Custom domain support</li>
                            <li>Stripe Intergration</li>
                        </ul>
                        <Card.Body className="text-center">
                        {previousCost=="99"?<Button className={styles.currentPlanBtn} id="enterprise_month" name="Enterprise" >Current Plan</Button>:<Button id="enterprise_month" className={styles.UpgradeBtn} name="Enterprise" onClick={handleClick}>Upgrade</Button>}
                        {previousCost=="960"?<Button className={styles.currentPlanBtn} style={{display:"none"}} id="enterprise_annual" name="Enterprise" >Current Plan</Button>:<Button style={{display:"none"}}className={styles.UpgradeBtn} id="enterprise_annual" name="Enterprise" onClick={handleClick}>Upgrade</Button>}
                            {/* <Button className={styles.UpgradeBtn} name="Enterprise" onClick={handleClick}>Upgrade</Button> */}
                        </Card.Body>
                    </Card>
                    <p className="text-center mt-3">Still not convinced?Start with a 7-day FREE trial!</p>
                    <div className="text-center" variant="custom">
                    <Button className={styles.trialBtn} >Start your trial</Button>&nbsp;&nbsp;                    
                    <Button className={styles.trialBtn} onClick={handleConfirmClick}>Confirm Upgrade</Button>&nbsp;&nbsp;                    
                    <StripeCheckout
                    className="stripeBtn"
                    id="stripeBtn"
                    stripeKey='pk_test_eibAhYcqbWgf5bbM4JSGyJjs00bxqSvPNH'
                    token={handleToken}
                    amount={product.price * 100}
                    name={product.name}
                    style={{display:"none"}}                    
                    />
                    </div>
                </Row>
                
            </Container>
        </Box>
    </Modal>

}
export default UpgradePlan;