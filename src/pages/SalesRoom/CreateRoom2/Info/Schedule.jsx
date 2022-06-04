import React, { Component, useState } from 'react'
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import { BsVimeo, BsCalendar, BsArrowRepeat } from 'react-icons/bs';
import EventNoteIcon from '@mui/icons-material/EventNote';
import DateTimePicker from 'react-datetime-picker';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { orange } from '@mui/material/colors';
import Table from 'react-bootstrap/Table'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import { BiTrash } from "react-icons/bi";
import './style.css';
import {
    Form,
    Button
} from 'react-bootstrap';
const outerTheme = createTheme({
    palette: {
        primary: {
            main: orange[500],
        },
        secondary: {
            main: "#333333",
            darker: '#053e85',
        }
    },
});
export class Schedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            alignment: 'left',
            dateValue: new Date(),
            events: [],
            event_type: this.props.Type
        }
    }
    render() {

        const setAlignment = (alignment) => {
            this.setState({ alignment })
        }
        const setDateValue = (dateValue) => {
            this.setState({ dateValue })
        }
        const handleAlignment = (event, newAlignment) => {
            setAlignment(newAlignment);
        };
        const SingleEvent = () => {
            const [startTime, setStartTime] = useState(new Date());
            const [duration, setDuration] = useState('');
            const updateTime = (e) =>{
                setStartTime(e);
            }
            const updateDuration = (e)=>{
                setDuration(e.target.value);
            }
            const SubmitEvent = (e)=> {
                //e.preventDefault();
                const d = new Date(startTime);
                const date = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
                const time = d.getHours() + ":" + d.getMinutes();
                const obj = [{
                    date: date,
                    time: time,
                    duration: duration
                }]
                this.props.SetEventDates(obj);
                console.log(obj);
            }
            return (
                <>
                    <br />
                    <Form type='POST'>
                        <br/>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Start Time</Form.Label>
                            <DateTimePicker onChange={updateTime} className={'form-control'} style={{ border: 'none' }} value={this.state.dateValue} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Duration</Form.Label>
                            <Form.Control onChange={updateDuration} type="number" placeholder="Duration in Minutes" />
                        </Form.Group>
                        <Form.Group>
                            <Button className={'m-1'} onClick={SubmitEvent} variant={'success'} size={'small'}>Save</Button>
                        </Form.Group>
                    </Form>
                </>
            )
        }
        const MultipleEvent = () => {
            const [MultipleEvents, setMultipleEvents] = useState(this.props.Dates);
            const [insertEvent, setInsertEvent] = useState(false);
            const [startTime, setStartTime] = useState(new Date());
            const [duration, setDuration] = useState('');

            const handleClose = () => {
                setInsertEvent(false);
            }
            const handleOpen = () => {
                setInsertEvent(true);
            }
            const updateTime = (e) => {
                setStartTime(e);

            }
            const updateDuration = (e) => {
                setDuration(e.target.value);
            }
            const style = {
                position: 'absolute',
                top: '30%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 400,
                bgcolor: 'background.paper',
                border: 'none',
                boxShadow: 40,
                p: 2,
            };
            const SubmitNew = (e) => {
                e.preventDefault();
                const d = new Date(startTime);
                const date = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
                const time = d.getHours() + ":" + d.getMinutes();
                const obj = {
                    date: date,
                    time: time,
                    duration: duration
                }
                const temp = MultipleEvents;
                temp.push(obj);
                setMultipleEvents(temp);
                this.props.SetEventDates(temp);
                handleClose();
            }
            const Delete = (data) => {
                const temp = [];
                MultipleEvents.map((val, key) => {
                    if (data != val) {
                        temp.push(val);
                    }
                });
                setMultipleEvents(temp);
                this.props.SetEventDates(temp);
            }
            return (
                <>
                    <br />
                    <Table striped bordered hover variant="dark">
                        <tbody>
                            <tr>
                                <td>Sl</td>
                                <td>Date</td>
                                <td>Start Time</td>
                                <td>Duration</td>
                                <td>Actions</td>
                            </tr>
                            {
                                MultipleEvents.map((data, key) => {
                                    return (
                                        <tr>
                                            <td>{(key + 1)}</td>
                                            <td>{data.date}</td>
                                            <td>{data.time}</td>
                                            <td>{data.duration} min</td>
                                            <td><BiTrash style={{ cursor: 'pointer' }} onClick={() => { Delete(data); }} /></td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </Table>
                    <Button className={'m-1'} onClick={handleOpen} variant={'primary'} size={'small'}>Insert New</Button>
                    <Modal
                        open={insertEvent}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        style={{ border: 'none' }}
                        aria-describedby="modal-modal-description">
                        <Box sx={style} style={{ border: 'none' }}>
                            <Typography id="modal-modal-title" style={{ marginBottom: '10px' }} variant="h6" component="h2">
                                New Event
                            </Typography>
                            <Form onSubmit={SubmitNew}>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label>Start Time</Form.Label>
                                    <DateTimePicker onChange={updateTime} className={'form-control'} style={{ border: 'none' }} value={this.state.dateValue} />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                    <Form.Label>Duration</Form.Label>
                                    <Form.Control onChange={updateDuration} type="number" placeholder="Duration in Minutes" />
                                </Form.Group>
                                <Form.Group>
                                    <Button className={'m-1'} type='submit' variant={'success'} size={'small'}>Save</Button>
                                </Form.Group>
                            </Form>

                        </Box>
                    </Modal>
                    <br /><br />
                </>
            )
        }
        return (
            <>
                <Form>
                    <Form.Label className="text-danger fw-bold"><EventNoteIcon />
                        When will it happen?</Form.Label>
                    <br />
                    { /*}
                    <ThemeProvider theme={outerTheme}>
                        <ToggleButtonGroup
                            value={this.state.alignment}
                            exclusive
                            color="secondary"
                            onChange={handleAlignment}
                            aria-label="text alignment">
                            <ToggleButton value="left" onClick={() => { this.props.SetEventType('Single') }} size="small" checked style={{ fontWeight: "bold", borderRadius: "5px" }}>
                                <BsCalendar />&nbsp;Single Event
                            </ToggleButton>
                            <ToggleButton value="center" onClick={() => { this.props.SetEventType('Multiple') }} size="small" style={{ fontWeight: "bold", borderRadius: "5px" }}>
                                <BsArrowRepeat style={{ fontSize: "15px" }} />&nbsp;
                                Event Series
                            </ToggleButton> 

                        </ToggleButtonGroup>
                    </ThemeProvider> */}
                    {
                        //(this.props.Type == 'Single') ? <SingleEvent /> : <MultipleEvent />
                    }
                    <MultipleEvent />
                    <Form.Label className="mt-2">This is in the Central European Time-Stockholm timezone.</Form.Label>
                    <br />
                </Form>
            </>
        )
    }
}

export default Schedule