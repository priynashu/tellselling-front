import React, { Component, useState } from 'react'
import { Col, ListGroup, Row } from 'react-bootstrap';
import '../../../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import { FiPlus, FiDelete } from "react-icons/fi";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import {BsLayers, BsFillGridFill, BsFillLayersFill, BsFillPaletteFill } from "react-icons/bs";

import Button from '@mui/material/Button';
import { TextField } from '@mui/material';
export class ManagePages extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pages: this.props.Pages
        }
    }
    render() {
        const NewPage = () => {
            const [newPageModal, setNewPageModal] = useState(false);
            const [name, setName] = useState('');
            const HandleOpenModal = () => {
                setNewPageModal(true);
            }
            const HandleCloseModal = () => {
                setNewPageModal(false);
            }
            const HandleInput = (e) => {
                setName(e.target.value);
            }
            const Insert = () => {
                this.props.NewPage(name);
            }
            
            const style = {
                position: 'absolute',
                top: '30%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 400,
                bgcolor: 'background.paper',
                border: 'none',
                boxShadow: 24,
                p: 2,
            };
            return (
                <>
                    <ListGroup.Item action onClick={() => { HandleOpenModal() }}>
                        <FiPlus style={{ marginRight: '10px' }} />New Page
                    </ListGroup.Item>
                    <Modal
                        open={newPageModal}
                        onClose={HandleCloseModal}
                        aria-labelledby="modal-modal-title"
                        style={{ border: 'none' }}
                        aria-describedby="modal-modal-description">
                        <Box sx={style} style={{ border: 'none' }}>
                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                Page Manage
                            </Typography>
                            <TextField id="outlined-basic" size="small" onKeyUp={HandleInput} style={{ width: '100%', marginTop: '10px', marginBottom: '10px' }} label="Page Name" variant="outlined" />
                            <Button variant="contained" onClick={Insert}>Save</Button>
                        </Box>
                    </Modal>
                </>
            )
        }
        return (
            <div className='my-3'>
                <h6>Manage Pages</h6>
                <ListGroup>
                    {
                        this.props.Pages.map((data, key) => {
                            return (
                                <ListGroup.Item action>
                                    <Row>
                                        <Col sm={10} onClick={()=>{ this.props.PageTransition(data.name); }}><BsLayers style={{marginRight:'10px'}}/>{data.name}</Col>
                                        <Col sm={2} style={{ cursor: 'pointer' }}><FiDelete onClick={()=>{ this.props.RemovePage(data.name); }}/></Col>
                                    </Row>
                                </ListGroup.Item>
                            )
                        })
                    }
                </ListGroup>
                <NewPage />
            </div>
        )
    }
}

export default ManagePages