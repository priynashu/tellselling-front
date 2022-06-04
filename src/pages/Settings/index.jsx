import React, {useState} from 'react';
import {AccountTopbar} from '../../components';
import axios from 'axios';
import {    
    Container,
    Button,
    Form
} from 'react-bootstrap'
import styles from './Settings.module.scss'
const Settings = () => {
    const initialState={
        companyName:"Tellselling",
        header:"",
        body:"",
        footer:"",
        expiryTime:"2 hours"
    }
    
    const [settingValue,setSettingValue] = useState(initialState);
    const {companyName,header,body,footer,expiryTime} = settingValue;
    const handleChange=(e)=>{
        const {name,value} =e.target;
        setSettingValue({...settingValue,[name]:value})
            // console.log(e.target.value);
    }
    const handleSubmit= async(e)=>{
        e.preventDefault();
        console.log(settingValue);
        
        try{
            const res = await axios.post(`${process.env.REACT_APP_API}/settings`,settingValue);
            console.log("res received is",res);
        }
        catch(err){
                console.log("err in setting",err);
        }
        setSettingValue(initialState);
    }



    return <> 
    <AccountTopbar/> 
    <div className = {styles.account_wrapper}>
         <div className={styles.profile_details}>
        <h3 className={styles.title}>Settings</h3>
        <hr />
        <Container className={styles.main_container}>
            <Form onSubmit={handleSubmit}>
        <Container className={styles.company}>
            <h3>Tenant</h3>
            <br />
            <Form.Label>Company Name</Form.Label>
            <Form.Control placeholder='Company Name' name="companyName" value={companyName} onChange={handleChange} type='text'></Form.Control>
        </Container>
        <Container className={styles.tracking_code}>
            <h3>Analytics Tracking Code</h3>
            <br />
            <Form.Label>Header</Form.Label>
            <Form.Control as="textarea" rows={5} placeholder='<!-- javascript-->' name="header" value={header} onChange={handleChange} type='text'></Form.Control>
            <br />
            <Form.Label>Body</Form.Label>
            <Form.Control as="textarea" rows={5} placeholder='<!-- javascript-->'name="body" value={body} onChange={handleChange}  type='text'></Form.Control>
            <br />
            <Form.Label>Footer</Form.Label>
            <Form.Control as="textarea" rows={5} placeholder='<!-- javascript-->'name="footer" value={footer} onChange={handleChange}  type='text'></Form.Control>
            
        </Container>
        <Container className={styles.download}>
            <h3>Download From Setting</h3>
            <br />
            <p className={styles.required_field}>
            <label>Required field</label>
            </p>
            <Form.Select aria-label="Cookie Expiry Time" name="expiryTime" value={expiryTime} onChange={handleChange} required={true}>                
                <option value="2 hours">2 hours</option>
                <option value="12 hours">12 hours</option>
                <option value="24 hours">24 hours</option>
                <option value="48 hours">48 hours</option>
                <option value="72 hours">72 hours</option>
                <option value="1 week">1 week</option>
                <option value="2 weeks">2 weeks</option>
                <option value="4 weeks">4 weeks</option>
            </Form.Select>
        </Container>
        <div className="m-3">
         <Button type="submit" variant='custom' className={styles.save_changes}>Save Changes</Button>&nbsp;&nbsp;
         <Button variant="outline-secondary" className="px-3 mx-3">Discard</Button>
         </div>
        </Form>

        </Container>
        
        
        </div>
     </div>

  </>;
};

export {Settings};
