import React, { Component } from 'react'
import { Accordion, FormControl, InputGroup, ListGroup } from 'react-bootstrap'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { BiWorld, BiLaptop,BiCopy } from "react-icons/bi";
import urlParser from "url-parse"
import { toast } from 'react-toastify';
export class Publish extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            domains:this.props.domains,
            custom_url:''
        }
    }
    render() {
        // console.log("publish domains",this.state.domains);
        const style = {
            position: 'absolute',
            top: '40%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 500,
            bgcolor: 'background.paper',
            border: 'none',
            boxShadow: 24,
            p: 2,
        };
        const handleClose = () => {
            this.setState({ isOpen: false });
        }
        const handleOpen = () => {
            this.setState({ isOpen: true });
        }
        const query=urlParser(window.location.href).query;

        const link='https://hardcore-jepsen-9da589.netlify.app/salesrooms/'+query.substring(1,query.length);
        const Copy=()=>{
            navigator.clipboard.writeText(link);
            toast.success('Link Copied to clipbord', {
                position: toast.POSITION.BOTTOM_RIGHT,
            });
        }
        const handleCustomURL=(e)=>{
            // console.log("custom url",e.target.value);
            this.setState({custom_url:e.target.value});
        }
        const AddCustomURL=()=>{
            const temp=this.state.domains;
            temp.push(this.state.custom_url);
            this.setState({custom_url:''});
            // console.log("domains",this.state.domains);
            this.props.updateDomains(temp)
            document.getElementById("custom_domain").value='';
        }
        return (
            <>
                <Button onClick={handleOpen} variant='outlined'>Publish</Button>
                <Modal
                    open={this.state.isOpen}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    style={{ border: 'none' }}
                    aria-describedby="modal-modal-description">
                    <Box sx={style} style={{ border: 'none' }}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Publishing
                        </Typography>
                        <div id="modal-modal-description" sx={{ mt: 2 }}>
                            <Accordion style={{ marginTop: '10px' }}>
                                <Accordion.Item eventKey="0">
                                    <Accordion.Header style={{ color: '#6158dc' }}><BiWorld /> &nbsp; Custom Domain</Accordion.Header>
                                    <Accordion.Body>
                                        <InputGroup className="mb-3">
                                            <InputGroup.Text id="basic-addon1">https://.</InputGroup.Text>
                                            <FormControl
                                                placeholder="Domain"
                                                onKeyUp={handleCustomURL}
                                                aria-label="Domain Name"
                                                id='custom_domain'
                                                aria-describedby="basic-addon1"
                                            />
                                        </InputGroup>
                                        <Button variant='outlined' onClick={()=>{ AddCustomURL() }}>Add</Button>
                                        <ul style={{marginTop:'10px'}}>
                                            {
                                                this.state.domains.map((item,key)=>{
                                                    return ( <li>{item}</li> )
                                                })
                                            }
                                        </ul>
                                    </Accordion.Body>
                                </Accordion.Item>
                                <Accordion.Item eventKey="1">
                                    <Accordion.Header style={{ color: '#6158dc' }}>
                                        <BiLaptop /> &nbsp; Demo Page
                                    </Accordion.Header>
                                    <Accordion.Body>
                                        <InputGroup className="mb-3">
                                            <FormControl aria-label="Tellselling URL" value={link}/>
                                            <InputGroup.Text className='copy' onClick={()=>{ Copy(); }}><BiCopy/></InputGroup.Text>
                                        </InputGroup>
                                    </Accordion.Body>
                                </Accordion.Item>
                            </Accordion>
                        </div>
                    </Box>
                </Modal>
            </>
        )
    }
}

export default Publish