import React, { Component, Fragment, useEffect } from 'react'
import { ListGroup } from 'react-bootstrap'
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import { Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import styles from './drawerstyles.module.scss';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { getLocalUser } from '../../../../utils/GetLocalUser';
import axios from 'axios';
import { useState } from 'react';
import TextField from '@mui/material/TextField'
import { backend_url } from '../../../../utils/Config';

export class SalesActions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            signup_action_drawer: false,
            meeting_action_drawer: false,
            forms: [],
            cta: this.props.CTA,
            //temp data
            selected_form: '',
            selected_link: ''
        }
    }
    fetchForms = () => {
        const localUser = getLocalUser();
        const url = backend_url+'forms/' + localUser.tenantId;
        axios.get(url)
            .then((res) => {
                const temp = [];
                res.data.forEach((val) => {
                    temp.push(val.formTitle);
                })
                if (this.state.forms.length == 0) {
                    this.setState({ forms: temp });
                }
            }).catch((err) => {
                console.log(err);
            })
    }
    componentDidMount() {
        this.fetchForms();
    }
    render() {
        //Set Existing data after parent render
        /**IMPORTANT**/

        //signup drawer
        const open_signup_drawer = () => {
            this.setState({ signup_action_drawer: true });
        }
        const close_signup_drawer = () => {
            this.setState({ signup_action_drawer: false });
        }
        //meeting drawer
        const open_meeting_drawer = () => {
            this.setState({ meeting_action_drawer: true });
        }
        const close_meeting_drawer = () => {
            this.setState({ meeting_action_drawer: false });
        }
        const Signup = () => {
            const data = [this.state.selected_form];

            if (this.state.cta.length != 0) {
                const ob = this.state.cta.filter((item) => {
                    if (item.type == 'SIGNUP') {
                        if (item.form.length != 0) {
                            data.pop();
                            data.push(item.form);
                        }
                        return item;
                    }
                })       
            }
            const [selectedForm, setSelectedForm] = useState(data[0]);
            const AddCTA = () => {
                this.setState({ selected_form: '' });
                const temp = [];
                this.state.cta.forEach((ob) => {
                    if (ob.type != "SIGNUP") {
                        temp.push(ob);
                    }
                })

                if (selectedForm.length != 0) {
                    const cta = {
                        type: "SIGNUP",
                        form: selectedForm
                    }
                    temp.push(cta);
                    this.setState({ selected_form: selectedForm });
                }
                this.setState({ cta: temp });
                console.log(temp);
                this.props.UpdateCTA(temp);
                close_signup_drawer();
            }
            return (
                <>
                    <ListGroup.Item onClick={open_signup_drawer}>
                        <FormControlLabel control={<Checkbox checked={(selectedForm.length != 0) ? true : false} />} label='Sign up' />
                    </ListGroup.Item>
                    <Fragment>
                        <Drawer anchor='right' open={this.state.signup_action_drawer} onClose={close_signup_drawer}>
                            <Box className={styles.drawer_wrapper}>
                                <div className={styles.header}>
                                    <h4 className={styles.title}>Signup Form</h4>
                                    <span className={styles.close_icon} onClick={close_signup_drawer}>
                                        <CloseIcon />
                                    </span>
                                </div>

                                <Box style={{ padding: '10px' }}>
                                    <label htmlFor='category'>Select Form</label>
                                    <Select
                                        size='small'
                                        style={{ width: '100%', marginTop: '10px' }}
                                        label="Select Form"
                                        value={selectedForm}
                                        onChange={(e) => setSelectedForm(e.target.value)}
                                    >
                                        {this.state.forms.map((val) => (
                                            <MenuItem value={val} key={val}>
                                                {val}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                    <Button style={{ marginTop: '10px' }} variant="outlined" onClick={AddCTA} size="full">Save</Button>
                                    <Button style={{ marginTop: '10px', marginLeft: '10px' }} variant="outlined"
                                        onClick={() => {
                                            const temp = [];
                                            this.state.cta.forEach((ob) => {
                                                if (ob.type != "SIGNUP") {
                                                    temp.push(ob);
                                                }
                                            })
                                            this.setState({ cta: temp });
                                            this.setState({ selected_form: '' })
                                            setSelectedForm('');
                                            close_signup_drawer();
                                            this.props.UpdateCTA(temp);
                                        }} size="full">Remove</Button>
                                </Box>
                            </Box>
                        </Drawer>
                    </Fragment>
                </>
            );
        }
        const Meeting = () => {

            const data = [this.state.selected_link];

            if (this.state.cta.length != 0) {
                const ob = this.state.cta.filter((item) => {
                    if (item.type == 'MEETING') {
                        if (item.link.length != 0) {
                            data.pop();
                            data.push(item.link);
                        }
                        return item;
                    }
                })
            }
            const [selectedLink, setSelectedLink] = useState(data[0]);


            const HandleLink = (e) => {
                setSelectedLink(e.target.value);
            }
            const AddCTA = () => {
                this.setState({ selected_link: '' });
                const temp = [];
                this.state.cta.forEach((ob) => {
                    if (ob.type != "MEETING") {
                        temp.push(ob);
                    }
                })

                if (selectedLink.length != 0) {
                    const cta = {
                        type: "MEETING",
                        link: selectedLink
                    }
                    temp.push(cta);
                    this.setState({ selected_link: selectedLink });
                }
                this.setState({ cta: temp });
                this.props.UpdateCTA(temp);
                close_meeting_drawer();
            }

            return (
                <>
                    <ListGroup.Item>
                        <FormControlLabel onClick={open_meeting_drawer} control={<Checkbox checked={(selectedLink.length != 0) ? true : false} />} label='Book a meeting' />
                    </ListGroup.Item>

                    <Fragment>
                        <Drawer anchor='right' open={this.state.meeting_action_drawer} onClose={close_meeting_drawer}>
                            <Box className={styles.drawer_wrapper}>
                                <div className={styles.header}>
                                    <h4 className={styles.title}>Meeting Booking</h4>
                                    <span className={styles.close_icon} onClick={close_meeting_drawer}>
                                        <CloseIcon />
                                    </span>
                                </div>

                                <Box style={{ padding: '10px' }}>
                                    <TextField label="Calendly Link" variant="outlined"
                                        size='small'
                                        style={{ width: '100%', marginTop: '10px' }}
                                        value={selectedLink}
                                        onChange={HandleLink} />
                                    <Button style={{ marginTop: '10px' }} variant="outlined" onClick={AddCTA} size="full">Save</Button>
                                    <Button style={{ marginTop: '10px', marginLeft: '10px' }} variant="outlined"
                                        onClick={() => {
                                            const temp = [];
                                            this.state.cta.forEach((ob) => {
                                                if (ob.type != "MEETING") {
                                                    temp.push(ob);
                                                }
                                            })
                                            this.setState({ cta: temp });
                                            this.setState({ selected_link: '' })
                                            close_meeting_drawer();
                                            this.props.UpdateCTA(temp);
                                        }} size="full">Remove</Button>
                                </Box>
                            </Box>

                        </Drawer>
                    </Fragment>
                </>
            );
        }
        return (
            <>
                <ListGroup>

                    <Meeting />

                    <Signup />
                    <ListGroup.Item>
                        <FormControlLabel control={<Checkbox />} label='Check out Solution X' />
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <FormControlLabel control={<Checkbox />} label='Call me back' />
                    </ListGroup.Item>
                </ListGroup>
            </>

        )
    }
}

export default SalesActions
