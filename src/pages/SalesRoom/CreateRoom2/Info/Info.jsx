import React, {useState} from 'react';
import Container from 'react-bootstrap/Container';
import {
    Row,
    Col,
    Image,
    Form,
    Button,
    ButtonGroup,
    InputGroup
} from 'react-bootstrap';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import styles from "./createRoom2.module.scss"

import {BsCameraVideoFill, BsCalendar, BsArrowRepeat, BsLaptopFill} from 'react-icons/bs';
import EventNoteIcon from '@mui/icons-material/EventNote';
import FlipCameraAndroidIcon from '@mui/icons-material/FlipCameraAndroid';
import QueryBuilderIcon from '@mui/icons-material/QueryBuilder';
// import DatePicker from 'react-date-picker'; import TimePicker from
// 'react-time-picker';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {FaKey} from 'react-icons/fa'
import {FiFastForward} from 'react-icons/fi'
import {MdOutlineRotateRight} from 'react-icons/md'
import {AiOutlinePicture} from 'react-icons/ai'
import {orange, grey} from '@mui/material/colors';
import TimePicker from '@mui/lab/TimePicker';
import DatePicker from '@mui/lab/DatePicker';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import DateAdapter from '@mui/lab/AdapterDayjs';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import {FcGlobe} from 'react-icons/fc'
import axios from 'axios'
import { getLocalUser } from '../../../../utils/GetLocalUser';
import "./style.css"
import { DefaultThumbnails } from './DefaultThumbnails'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import { backend_url } from '../../../../utils/Config';

// import Manage from '../Manage/Manage';
// import Preview from '../Preview/Preview';
// import Info from '../Info/Info'
const outerTheme = createTheme({
    palette: {
        primary: {
            main: grey[900],
            darker: "#607d8b"
        },
        secondary: {
            main: "#333333",
            darker: '#053e85'
        }
    }
});
const Info = ({UpdateScreen,UpdateInfo}) => {
    //Thumbnail Image upload
    // const [imageFile,setImageFile] = useState();
    
    const localUser = getLocalUser();
    const tenantId = localUser.tenantId;
    const sales_person = localUser.firstName + " " +  localUser.lastName;
    // console.log("local user is ",localUser);
    const handleImage = () => {
        document.getElementById('imgChange').click();
     };
    const handleImgUpload =(e)=>{
        const selectedFile = e.target.files[0];
        // setImageFile(selectedFile)
        console.log("img change",selectedFile);
        cloudinaryUpload(selectedFile)
        handleClose()
    }
    // thumbnail
    const [thumbnailModal, setThumbnailModal] = useState(false);
    const [imageSelect,setImageSelect] = useState("https://images.unsplash.com/photo-1579547621706-1a9c79d5c9f1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fHBsYW4lMjBncmFkaWVudHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60")
            const handleClose = () => {
                setThumbnailModal(false);
            }
            const handleOpen = () => {
                setThumbnailModal(true);
            }
            const style = {
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 600,
                bgcolor: 'background.paper',
                border: 'none',
                boxShadow: 40,
                p: 2,
            };
            const SelectImage = (image) => {
                console.log("images",image);
                setImageSelect(image)
                handleClose()
            }
    

        // eventName
        const [eventName,setEventName] = useState("");
        const handleEventName=(e)=>{
            // console.log("event name",e.target.value);
            setEventName(e.target.value)        
        }
        // meeting values
    const [meetingValues,setMeetingValues] = useState({meetingUrl: "", meetingId: "", meetingPassword: ""})
    const {meetingUrl, meetingId, meetingPassword} = meetingValues;
    const handleMeeting=(e)=>{
        setMeetingValues({...meetingValues,[e.target.name]:e.target.value})
        // console.log("meeting values",meetingValues);
    }

    const [eventPlace,
        setEventPlace] = useState("Zoom");
    const handleAlignment = (event, newEvent) => {
        setEventPlace(newEvent)
        console.log("new event is", newEvent);
    };
    // date and time
    let date = new Date();
    const [currentDate,setCurrentDate] = useState(new Date());
    const [endTime,setEndTime] = useState(new Date())
    // access
    const [access,setAccess] = useState({"registration": false, "registrationApproval": false});
    const handleAccessChange = (e) => {
        console.log("access change",e.target.checked,e.target.name);
        setAccess({
            ...access,
            [e.target.name]: e.target.checked
        })
    }
    // handle time functions
    const handleTimeDateChange = (newValue) => {
        
        console.log("handleDate change",newValue.$d);
        let nDate = newValue.$d.toLocaleString()
        console.log("nDate :",nDate);
        setCurrentDate(nDate);
    };
    const setTimeDate = () => {
        // console.log("current date",currentDate);
        setCurrentDate(currentDate);
    }
    // handle end time date
    const handleEndTimeDateChange=(value)=>{
        setEndTime(value)
        
        console.log("inside end time",new Date(value.$d).getTime());
    }
    //eventType
    const [eventType,setEventType]=useState('singleEvent');
    const handleEventType=(event, newEvent)=>{
        setEventType(newEvent);
    }
    
    const cloudinaryUpload = (item) => {
        // console.log("File is",item.type);
        const formData = new FormData();
            formData.append("file", item);
        formData.append("upload_preset", "ce0qpcmg");
        // console.log("upload item",item);
        axios.post("https://api.cloudinary.com/v1_1/tellselling/image/upload", formData).then((res) => {
            const url = res.data.secure_url;
            // console.log(url);
            setImageSelect(url)
        }).catch((err) => {
            console.log(err.message);
        });

    }
    // const submitData = async(formData)=>{
    //     await axios.post(`${backend_url}salesroom-webinar/create`,formData).then((res)=>{
    //         const data = res.data
    //         console.log("response data",data);

    //     }).catch((err)=>{
    //         console.log("error in submit data of webinar",err);
    //     })
    // }
    // onSubmit event
    const handleCreateEvent =(e)=>{
        
        e.preventDefault();
        let fulldate = new Date(currentDate)
        const data={
            tenantId:tenantId,
            thumbnail:imageSelect,
            eventName:eventName,
            eventPlace:eventPlace,
            meetingValues:meetingValues,
            eventType:eventType,
            dateTime:currentDate,
            endTime:new Date(endTime.$d).getTime()||new Date().getTime(),
            access:access,   
            sales_person:sales_person,
            link:Math.random().toString(36).slice(2),
            fullDate:fulldate
        }
        UpdateInfo(data)
        
        console.log("data to sent is",data);

        UpdateScreen('SALESROOM');
    }
    return <Container className={styles.container}>
        <Form onSubmit={handleCreateEvent}>
        <Row className="h-5" fluid>
            <Col sm={12} className={styles.img_col}>
                <Image
                    className='w-100'
                    style={{
                    height: '300px'
                }}
                    src={imageSelect}></Image>
                    <Button onClick={handleOpen} style={{ fontSize: "15px" }} className="mt-3" variant="secondary">
                        <AiOutlinePicture style={{ marginRight: '5px' }} />Change Cover Photo
                    </Button>
                    
                <Row className='mt-3'>
                    <Col sm={9}>
                        <Form.Label
                                style={{
                                fontWeight: "bold"
                            }}>Event Name</Form.Label>
                            {/* <Form.Control className={styles.event_form}  type="text" ></Form.Control> */}
                            <InputGroup className="mb-3">
                                <Form.Control placeholder="Sales Demo Webminar" value={eventName} onChange={handleEventName}   className={styles.event_form}/>
                                <MdOutlineRotateRight className={styles.event_btn}/>
                            </InputGroup>
                    </Col>
                </Row>
            </Col>

        </Row>
        <br/>
        <Row className="px-3">
            <Col>
                
                    <Form.Label
                        style={{
                        color: "blue",
                        fontWeight: "bold"
                    }}><BsCameraVideoFill/>
                        &nbsp; Where is the event taking place?</Form.Label>
                    <br/>
                    <br/>
                    <ThemeProvider theme={outerTheme}>
                        <ToggleButtonGroup                            
                            exclusive
                            color="primary"
                            onChange={handleAlignment}
                            value={eventPlace}
                            variant="contained"
                            aria-label="text alignment">
                            <ToggleButton
                                value="Zoom"
                                size="small"
                                variant="contained"
                                checked
                                style={{
                                fontSize: "14px",
                                fontWeight: "bold",
                                borderRadius: "2px",
                                paddingLeft: "15px",
                                paddingRight: "15px"
                            }}>
                                <BsCameraVideoFill/>&nbsp;Zoom
                            </ToggleButton>
                            <ToggleButton
                                value="Virtual"
                                size="small"                                
                                style={{
                                fontSize: "14px",
                                fontWeight: "bold",
                                borderRadius: "2px",
                                paddingLeft: "15px",
                                paddingRight: "15px"
                            }}>
                                <BsLaptopFill
                                    style={{
                                    fontSize: "15px"
                                }}/>&nbsp;Virtual
                            </ToggleButton>
                            <ToggleButton
                                value="In Person"
                                size="small"
                                style={{
                                fontSize: "14px",
                                fontWeight: "bold",
                                borderRadius: "2px",
                                paddingLeft: "15px",
                                paddingRight: "15px"
                            }}>
                                <FcGlobe
                                    style={{
                                    fontSize: "15px"
                                }}/>&nbsp;In Person
                            </ToggleButton>

                        </ToggleButtonGroup>
                    </ThemeProvider>
                    <br/>
                    <Form.Label
                        className="mt-3"
                        style={{
                        fontWeight: "bold"
                    }}>Once
                        you link your Zoom account, we can automatically generate Zoom meetings for you.</Form.Label>
                    <Button><BsCameraVideoFill/>&nbsp;&nbsp;Link {eventPlace} Account</Button>
                    <br/>
                    <br/>
                    <Form.Label
                        style={{
                        fontWeight: "bold"
                    }}>Or you can enter the meeting information:</Form.Label>
                    <br/>
                    <Form.Label>{eventPlace} meeting URL</Form.Label>
                    <Form.Control
                        className="form-control-md"
                        onChange={handleMeeting}
                        name="meetingUrl"
                        value={meetingUrl}
                        
                        style={{
                        width: "40%"
                    }}
                        type="text"
                        placeholder='https://zoom.us/5555555'></Form.Control>
                    <br/>
                    <Form.Label>{eventPlace} meeting ID</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder='123456789'
                        onChange={handleMeeting}
                        name="meetingId"
                        value={meetingId}
                        
                        style={{
                        width: "40%"
                    }}></Form.Control>
                    <br/>
                    <Form.Label>{eventPlace} meeting Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder='Enter your password'
                        onChange={handleMeeting}
                        name="meetingPassword"
                        value={meetingPassword}
                        
                        style={{
                        width: "40%"
                    }}></Form.Control>
                
            </Col>
        </Row>
        <hr/>
        <Row>
            <Col>
                
                    <Form.Label className="text-danger fw-bold"><EventNoteIcon/>
                        When will it happen?</Form.Label>
                    <br/>
                    <ThemeProvider theme={outerTheme}>
                        <ToggleButtonGroup
                            value={eventType}
                            exclusive
                            color="secondary"
                            onChange={handleEventType}
                            aria-label="text alignment">
                            <ToggleButton
                                value="singleEvent"
                                size="small"
                                checked
                                style={{
                                fontWeight: "bold",
                                borderRadius: "5px"
                            }}>
                                <BsCalendar/>&nbsp;Single Event
                            </ToggleButton>
                            <ToggleButton
                                value="eventSeries"
                                size="small"
                                style={{
                                fontWeight: "bold",
                                borderRadius: "5px"
                            }}>
                                <BsArrowRepeat
                                    style={{
                                    fontSize: "15px"
                                }}/>&nbsp; Event Series
                            </ToggleButton>

                        </ToggleButtonGroup>
                    </ThemeProvider>

                    <br/>
                    <Form.Label className='mt-3'>Start Time</Form.Label>
                    <Row>
                        <Col>
                            <LocalizationProvider dateAdapter={DateAdapter}>
                                <Stack spacing={3}>
                                    <Row>
                                        <Col sm={3}>
                                            <TimePicker
                                                label="Time"
                                                value={currentDate}
                                                onChange={handleTimeDateChange}
                                                disablePast
                                                renderInput={(params) => <TextField {...params}/>}/>
                                        </Col>
                                        <Col sm={3} className="">
                                            <DatePicker
                                                label="Date"
                                                openTo="year"
                                                views={['year', 'month', 'day']}
                                                className="date-picker"
                                                value={currentDate}
                                                disablePast
                                                onChange={handleTimeDateChange}
                                                renderInput={(params) => <TextField {...params}/>}/>
                                        </Col>
                                    </Row>
                                </Stack>
                            </LocalizationProvider>
                            <Form.Label className='my-3'>End Time</Form.Label>
                            <LocalizationProvider dateAdapter={DateAdapter}>
                                <Stack spacing={3}>
                                    <Row>
                                        <Col sm={3}>
                                            <TimePicker
                                                label="Time"
                                                value={endTime}
                                                onChange={handleEndTimeDateChange}
                                                disablePast
                                                renderInput={(params) => <TextField {...params}/>}/>
                                        </Col>
                                    </Row>
                                </Stack>
                            </LocalizationProvider>
                        </Col>
                    </Row>

                    <Form.Label className="mt-2">This is in the Central European Time-Stockholm timezone.
                        <span
                            style={{
                            cursor: "pointer"
                        }}className="text-danger fw-bold">
                            Change</span>
                    </Form.Label>
                    <br/>
                    <Button variant="custom" onClick={setTimeDate} className={styles.duration_btn}><QueryBuilderIcon style={{
        fontSize: "15px"
    }}/>&nbsp;Set Duration</Button>
                
                <br/>
                <br/>
                <Row>
                    <p className={styles.access_text}>
                        <span><FaKey className={styles.key}/></span>&nbsp;Access</p>
                    <br/>
                    <br/>
                    <Row className="mb-3">
                        <Col sm={1}>
                            <Form.Check type="checkbox" name="registration" onChange={handleAccessChange}></Form.Check>
                        </Col>
                        <Col sm={9} className={styles.checkbox_require}>
                            <Form.Text
                                className="fw-bold"
                                style={{
                                fontSize: "15px"
                            }}>Require Registration</Form.Text>
                            <br/>
                            <Form.Text
                                style={{
                                opacity: "0.5"
                            }}>If selected, guests must register to receive meeting details.</Form.Text>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={1}>
                            <Form.Check
                                type="checkbox"
                                name="registrationApproval"
                                onChange={handleAccessChange}></Form.Check>
                        </Col>
                        <Col sm={10} className={styles.checkbox_require}>
                            <Form.Text
                                className="fw-bold"
                                style={{
                                fontSize: "15px"
                            }}>Require Registration Approval</Form.Text>
                            <br/>
                            <Form.Text
                                style={{
                                opacity: "0.5"
                            }}>If selected, meeting information will only be sent to manually approved guests.</Form.Text>
                        </Col>
                    </Row>
                    <br/>
                    <br/>
                    <br/>

                    <div className="mb-2">
                        <Button variant="secondary" type="submit"  size="md"><FiFastForward className={styles.createEvent_icon}/>
                            &nbsp;Create Event</Button>
                            
                    </div>
                    <br/>
                    <p
                        style={{
                        color: "red",
                        fontSize: "13px",
                        fontWeight: "700"
                    }}>There are errors that need to be fixed before submitting.</p>
                </Row>

            </Col>

        </Row>
        </Form>
        <Modal
                        open={thumbnailModal}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        style={{ border: 'none' }}
                        aria-describedby="modal-modal-description">
                        <Box sx={style} style={{ border: 'none' }}>
                            <Typography id="modal-modal-title" style={{ marginBottom: '10px' }} variant="h6" component="h2">
                                Select Cover Image &nbsp;&nbsp;&nbsp;    <Form.Control
                            style={{display:"none"}}
                            type="file"
                            size="sm"                                          
                            id="imgChange"
                            onChange={handleImgUpload}
                             />
                    <Button
                    style={{fontSize: "15px",marginBottom:"10px"}}
                    onClick={handleImage}
                    className="mt-3"
                    variant="primary">Browse</Button>
                            </Typography>
                            
                            <Row>
                                {
                                    DefaultThumbnails.map((thumb, key) => {
                                        return (
                                            <Col sm={4} key={key}>
                                                <img className={'thumbnail-choose'} style={{ width: '100%', height: ' 100px', marginBottom: '15px', cursor: 'pointer' }} onClick={() => { SelectImage(thumb); }} src={thumb} />
                                            </Col>
                                        )
                                    })
                                }
                            </Row>
                        </Box>
                    </Modal>
    </Container>
}
export {Info};