import React, { Component } from 'react'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import { toast } from 'react-toastify';
import Button from '@mui/material/Button';
import { TextField } from '@mui/material';
import { BiPencil, BiAddToQueue, BiCalendarEdit, BiTrash } from "react-icons/bi";
import { Row, Col, Card, ListGroup } from 'react-bootstrap';

import './PageEditor.css'

export class ManagePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            section_select_modal: false,
            delete_page_modal: false,
            current_text: '',
            old_text: '',
            selected_name: '',
            contents: this.props.Contents,
            current_content: {},
            action_type: ''
        }
    }
    render() {
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
        const handleOpen = () => this.setState({ section_select_modal: true });
        const handleClose = () => this.setState({ section_select_modal: false });

        const handleDeleteOpen = () => this.setState({ delete_page_modal: true });
        const handleDeleteClose = () => this.setState({ delete_page_modal: false });

        const HandleText = (e) => {
            this.setState({ current_text: e.target.value });
        }
        const UpdateParentComponent = () => {
            this.props.UpdateContents(this.state.contents);
        }
        const New = () => {
            this.setState({ action_type: 'NEW' });
            handleOpen();
        }

        const Delete = () => {
            const temp = [];
            this.state.contents.map((data, key) => {
                if (data.name != this.state.selected_name) {
                    temp.push(data);
                }
            })
            this.props.UpdateContents(temp);
            handleDeleteClose();
        }
        const Save = () => {
            const temp = this.state.contents;
            //check if already exists
            // if exits rename the page
            if (this.state.action_type == 'RENAME') {
                temp.forEach((item, i) => {
                    if (item.name === this.state.old_text) {
                        item.name = this.state.current_text;
                    }
                })
                this.setState({ contents: temp });
                this.setState({ current_text: '' });
                handleClose();
                console.log(this.state.contents);
            }
            //else create a new page
            if (this.state.action_type == 'NEW') {
                const html = `
                <script src="https://code.jquery.com/jquery-3.6.0.min.js" integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=" crossorigin="anonymous"></script>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/tailwindcss/2.2.19/tailwind.min.css" integrity="sha512-wnea99uKIC3TJF7v4eKk4Y+lMz2Mklv18+r4na2Gn1abDRPPOeef95xTzdwGD9e6zXJBteMIhZ1+68QC5byJZw==" crossorigin="anonymous" referrerpolicy="no-referrer" />
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/assets/owl.carousel.min.css" integrity="sha512-tS3S5qG0BlhnQROyJXvNjeEM4UpMXHrQfTGmbQ1gKmelCxlSEBUaxhRBj/EFTzpbP4RVSrpEikbmdJobCvhE3g==" crossorigin="anonymous" referrerpolicy="no-referrer" />
                <script src="https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/owl.carousel.min.js" integrity="sha512-bPs7Ae6pVvhOSiIcyUClR7/q2OAsRiovw4vAkX+zJbw3ShAeeqezq50RIIcIURq7Oa20rW2n2q+fyXBNcU9lrw==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
                `+ ` <p>New Page</p>`;

                const obj = {
                    name: this.state.current_text,
                    contents: html
                };
                temp.push(obj);
                this.setState({ contents: temp });
                this.setState({ current_text: '' });
                handleClose();
            }
            UpdateParentComponent();
        }

        return (
            <>
                <div className="my-2 d-flex flex-column">
                    <button type='button' className="btn btn-outline-secondary" onClick={New}><BiAddToQueue /> &nbsp; Add Page</button>
                    <ul className="list-group pages mt-2" style={{ fontSize: '15px' }}>
                        {
                            this.props.Contents.map((item, key) => {
                                return (
                                    <li onClick={() => { this.props.SelectPage(item); }} className="list-group-item d-flex"><BiTrash onClick={() => { this.setState({ delete_page_modal: true }); this.setState({ selected_name: item.name }) }} className='edit' style={{ float: 'left' }} /> &nbsp; {item.name}</li>
                                )
                            })
                        }
                    </ul>
                </div>

                <Modal
                    open={this.state.section_select_modal}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    style={{ border: 'none' }}
                    aria-describedby="modal-modal-description">
                    <Box sx={style} style={{ border: 'none' }}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Page Manage
                        </Typography>
                        <TextField id="outlined-basic" size="small" onKeyUp={(e) => { this.setState({ current_text: e.target.value }) }} style={{ width: '100%', marginTop: '10px', marginBottom: '10px' }} label="Page Name" variant="outlined" />
                        <Button variant="contained" onClick={Save}>Save</Button>
                        <Button variant="outlined" style={{ marginLeft: '5px' }}>Remove</Button>
                    </Box>
                </Modal>
                <Modal
                    open={this.state.delete_page_modal}
                    onClose={handleDeleteClose}
                    aria-labelledby="modal-modal-title"
                    style={{ border: 'none' }}
                    aria-describedby="modal-modal-description">
                    <Box sx={style} style={{ border: 'none' }}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Are you sure want to delete this page?
                        </Typography>
                        <Button variant="outlined" style={{ marginLeft: '5px' }} onClick={() => { Delete(); }}>Remove</Button>
                    </Box>
                </Modal>
            </>
        );

    }
}

export default ManagePage