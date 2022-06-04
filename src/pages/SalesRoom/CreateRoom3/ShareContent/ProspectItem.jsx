import React, { Component } from 'react'
import { Col, Row } from 'react-bootstrap'
import { FormText } from 'react-bootstrap';
import Avatar from 'react-avatar';
import 'bootstrap/dist/css/bootstrap.css';
import Button from '@mui/material/Button';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Edit from '@mui/icons-material/Edit';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export class ProspectItem extends Component {
    constructor(props) {
        super(props);
        this.state={
            email:'',
            first_name:'',
            last_name:'',
            organization:'',
            deal_name:'',
            amount:''
        }
    }
    render() {

        const HandleInput = (e) =>{
            this.setState({...this.state, [e.target.name] : e.target.value})
        }

        const SetTemp = (email, organization) => {
            this.props.ProspectsData.forEach((data,key)=>{
                if(data.email==email && data.organization==organization){
                    this.setState({
                        email: data.email,
                        first_name: data.first_name,
                        last_name: data.last_name,
                        organization: data.organization,
                        deal_name:data.deal_name,
                        amount:data.amount
                    })
                    console.log(data);
                }
            })
        }
        //Editing prospect
        const Save = (e) => {
            e.preventDefault();
            const save_data = {
                email: e.target.email.value,
                first_name: e.target.first_name.value,
                last_name: e.target.last_name.value,
                organization: e.target.organization.value,
                deal_name: e.target.deal_name.value,
                amount: e.target.amount.value
            }
            const old_val={
                email: e.target.old_email.value,
                organization: e.target.old_organization.value
            }
            const temp=this.props.ProspectsData;
            temp.forEach((data,key)=>{
                if(data.email==old_val.email && data.organization==old_val.organization){
                    data.email=save_data.email;
                    data.first_name=save_data.first_name;
                    data.last_name=save_data.last_name;
                    data.organization=save_data.organization;
                    data.deal_name=save_data.deal_name;
                    data.amount=save_data.amount;
                }
            })
            this.props.EditProspects(temp);
            
        }
        const Remove=(email,organization)=>{
            const temp=this.props.ProspectsData;
            temp.forEach((data,key)=>{
                if(data.email==email && data.organization==organization){
                    temp.splice(temp.indexOf(data),1);
                }
            })
            this.props.EditProspects(temp);
        }
        return (
            <div style={{ marginTop: 20 }}>
                {
                    this.props.ProspectsData.map((data, key) => {
                        return (
                            <Accordion>
                                <AccordionSummary
                                    expandIcon={<Edit style={{ fontSize: '18px' }} />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                    onClick={()=>{ SetTemp(data.email, data.organization) }}
                                    style={{ backgroundColor: '#eee' }}
                                >
                                    <Row style={{ width: '100%' }} className="align-items-center">
                                        <Col xs={2} md={2} sm={2}><Avatar name={data.first_name + " " + data.last_name} size="45" round={true} /></Col>
                                        <Col xs={10} md={10} sm={10} style={{ paddingLeft: 30 }}>
                                            <p style={{ fontSize: 12, marginBottom: '1px' }}><b>{data.first_name} {data.last_name}</b></p>
                                            <p style={{ fontSize: 11, marginBottom: '1px' }}>{data.email}</p>
                                            <p style={{ fontSize: 11, marginBottom: '1px' }}><b>{data.organization}</b></p>
                                        </Col>
                                    </Row>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Box component='form' style={{ paddingTop: 10 }} onSubmit={Save}>
                                        <TextField type='email' onChange={HandleInput} label='Email' name='email' value={this.state.email} fullWidth variant='outlined' size='small' style={{ marginBottom: '20px' }} required />
                                        <TextField type='text' onChange={HandleInput} label='First Name' value={this.state.first_name} name='first_name' fullWidth variant='outlined' size='small' style={{ marginBottom: '20px' }} required />
                                        <TextField type='text' onChange={HandleInput} label='Last Name' value={this.state.last_name} name='last_name' fullWidth variant='outlined' size='small' style={{ marginBottom: '20px' }} required />
                                        <TextField type='text' onChange={HandleInput} label='Organization' value={this.state.organization} name='organization' fullWidth variant='outlined' size='small' style={{ marginBottom: '20px' }} required />
                                        <TextField type='text' style={{display:'none'}} name='old_email' value={data.email}/>
                                        <TextField type='text' style={{display:'none'}} name='old_organization' value={data.organization}/>
                                        <TextField type='text' onChange={HandleInput} label='Deal Name' value={this.state.deal_name} name='deal_name' fullWidth variant='outlined' size='small' style={{ marginBottom: '20px' }} />
                                        <TextField type='text' onChange={HandleInput} label='Amount' value={this.state.amount} name='amount' fullWidth variant='outlined' size='small' style={{ marginBottom: '20px' }} />
                                        <Button type='submit' variant='outlined' color='success' style={{ marginBottom: 15, marginRight: 8 }}>Save</Button>
                                        <Button variant='outlined' onClick={()=>{ Remove(data.email, data.organization) }} color='error' style={{ marginBottom: 15 }}>Remove</Button>
                                    </Box>
                                </AccordionDetails>
                            </Accordion>
                        )
                    })
                }
            </div>

        )
    }
}

export default ProspectItem;


