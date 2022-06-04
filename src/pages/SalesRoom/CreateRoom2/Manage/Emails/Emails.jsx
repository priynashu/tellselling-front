import React,{useState,useEffect} from 'react'
import "./createRoom3.email.scss"
import Container from 'react-bootstrap/Container';
import './email.css'
import {
    Row,
    Col,
    Image,
    Form,
    Button,
    InputGroup
} from 'react-bootstrap';
import {FiMail,FiSend} from 'react-icons/fi'
import {FaRegClock} from 'react-icons/fa'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import ToggleButton from '@mui/material/ToggleButton';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import TimePicker from '@mui/lab/TimePicker';
import DatePicker from '@mui/lab/DatePicker';
import Stack from '@mui/material/Stack';
import DateAdapter from '@mui/lab/AdapterDayjs';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import {BsThreeDots} from 'react-icons/bs'
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {AiOutlinePlus} from 'react-icons/ai'
import axios from 'axios'
import { getLocalUser } from '../../../../../utils/GetLocalUser';
import ReactQuill from 'react-quill';
import "../../../../../../node_modules/react-quill/dist/quill.snow.css"
import { backend_url } from '../../../../../utils/Config';
const outerTheme = createTheme({
    palette: {
        secondary: {
            main: "#333333",
            darker: '#053e85'
        }
    }
});
const Emails =({Data})=>{

    useEffect(()=>{
        getAllDates();
    },[])
    // send grid mail
    // const sgMail = require('@sendgrid/mail')
    // sgMail.setApiKey('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');
    const localUser = getLocalUser()
    const tenantId = localUser.tenantId
    const [subject,setSubject] = useState("");
    const handleSubjectChange=(e)=>{
        // console.log("sub is",e.target.value);
        setSubject(e.target.value)
    }
    const [email,setEmail] = useState("");
    const handleEmailIdChange =(e)=>{
        setEmail(e.target.value)
    }
    // const dates=["24 February, 2022","25 February, 2022"]
    const getMonth=(no)=>{
        const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];    
        return monthNames[no];
    }
    const propsDates = JSON.stringify(Data.dateTime).split(",")[0].substring(1,10).split("/")
    const dayNumber = propsDates[1]?.length==1?`0${propsDates[1]}`: propsDates[1]
    const dates = dayNumber + " " + getMonth(propsDates[0]-1) + ", "+ propsDates[2]
    console.log("dates",dates);
    const [open, setOpen] = useState(false);
            const handleClose = () => {
                setOpen(false);
            }
            const handleOpen = () => {
                setOpen(true);
            }
    const [dateSchedule,setDateSchedule] = useState();
    const [eventDate,setEventDate] = useState("");
    const handleAlignment = (event, newDate) => {        
        setEventDate(newDate)
        console.log("all dates inside alignment",allDates);
        const eventdates=allDates.filter((item)=>{return (item.date==newDate)})
        console.log("new event date is",eventdates);
        setDateSchedule(eventdates)
    };
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
    // get all dates
    const [allDates,setAllDates] = useState([])
    const getAllDates = async ()=>{
        await axios.get(backend_url+`emailSchedule/${tenantId}`).then((res)=>setAllDates(res.data))
        console.log("all the dates are",allDates);
    }
    
    // date and time
    let date = new Date();
    const [currentDate,
        setCurrentDate] = useState(date.toLocaleString("en-US", {timeZone: "Europe/Stockholm"}));

        // handle time functions
    const handleTimeDateChange = (newValue) => {
        setCurrentDate(newValue);
        console.log("new date",newValue.$d);
        // console.log("handleDate change",newValue.$d.toLocaleString());
    };
  
    const handleSubmit = (e)=>{
        e.preventDefault();
        const presentDate = new Date(currentDate)
        // console.log(new Date(date),date);
        const dateTime=currentDate?.$d || presentDate
        const dateParts = dateTime.toDateString().split(" ");
    const day = dateParts[2];
    const year = dateParts[3];
    const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];
    const EDate = day + " " + monthNames[dateTime.getMonth()] + ", " + year;
    const ETime = dateTime.getHours()+ ":"+dateTime.getMinutes()
    
        const formData = {
            tenantId:tenantId,
            subject:subject,
            date:EDate,
            time:ETime,
            fullDate:dateTime,
            to:email,
            from:"support@tellselling.tech",
            text:body

        }
        // console.log("data set is ",formData);
        
    
        axios.post(backend_url+"emailSchedule/upload",formData).then((res)=>{
            const data = res.data
            console.log("email upload",data);
            getAllDates();
        }).catch((err)=>{
            console.log(err);
        })
        setSubject("")        
        setCurrentDate(date.toLocaleString("en-US", {timeZone: "Europe/Stockholm"}));
        
        handleClose();
    }   
    const [body,setBody] =useState("")
    const handleBody=(value)=>{
        setBody(value)
        // console.log("body is",value);
    }
    const [body2,setBody2] =useState("")
    const handleBody2=(value)=>{
        setBody2(value)
        // console.log("body is",value);
    }
    const modules={toolbar:[
        [{header:"1"},{header:"2"}],    
        ["bold","italic","underline"],
        [{list:"ordered"},{list:"bullet"}],
        ["link","image"],    
        ["code-block"]
    ],
    };
    
    const formats=["header","bold","italic","underline","list","bullet","link","image","code-block"]

    const allStatuses = ['Approved','Invited','Pending Approval','Declined','Rejected','Session Guest']
    const [statusClass,setStatusClass] = useState('statuses');
    const handleStatus=(e)=>{        
        const classes=e.target.className.split(" ")
        // console.log("status click",classes[0]);
        // if(classes[0]==='statuses'){
        //     setStatusClass("statuses_selected")
        // }
        // else if(classes[0]==='statuses_selected'){
        //     setStatusClass("statuses")
        // }
        
    }
    const printSchedule=(dateSchedule)=>{
        // console.log("dateScedule",dateSchedule.map(item=>item));
        
        return(dateSchedule?.map(item=><Row  className="schedule_row">
        <Col sm="auto" className="" style={{padding:'7px'}}>
        <FaRegClock style={{fontSize:"20px"}}/>    
        </Col>
        <Col sm={8} style={{padding:0}}>
            <p className="schedule_text">{item.subject}</p>
            <p className="bottom_schedule_text">To: Aprroved</p>
        </Col>
        <Col sm="auto">
            <Row>
                <Col>
                <p className="schedule_date">{item.date} </p>
                <p className="schedule_date">{item.time} GMT+6</p>
                </Col>
            </Row>                        
            </Col>
        <Col sm="auto" style={{paddingTop:"5px"}}>
        <span> <BsThreeDots style={{fontSize:"20px",color:"grey"}}/></span>
        </Col>
        </Row>))
        // dateSchedule?.map((item,index)=>{
        //     return()
        // })
    }
    return <>
    <Container className="container1">
    <h3 style={{fontSize:"20px",fontWeight:"bold"}}>Registration</h3>        
            <Row className="registration_row">
            <Col sm="auto" className="" style={{padding:'10px'}}>
            <FiMail style={{fontSize:"20px"}}/>    
            </Col>
            <Col sm={8} style={{padding:0}}>
                <p className="registration_text">Registration confirmed for Sales Demo Live Streaming</p>
                <p className="bottom_registration_text">To: All Guests</p>
            </Col>
            <Col sm="auto">
                <p className="guests_register">As Guests Register <span> &nbsp;&nbsp;<BsThreeDots style={{fontSize:"20px"}}/></span></p>
                </Col>
            </Row>
            <br />
            <Row>
                <Col><h3 style={{fontSize:"20px",fontWeight:"bold"}}>Scheduled Emails</h3></Col>
                <Col>
                <Button variant="custom" className="new_reminder" onClick={handleOpen}><AiOutlinePlus/>&nbsp;New Reminder</Button>
                </Col>                
            </Row>
            <Row>
            <ThemeProvider theme={outerTheme}>
                        
                        <ToggleButtonGroup
                            value={eventDate}
                            exclusive
                            color="secondary"
                            onChange={handleAlignment}
                            aria-label="text alignment">
                                {/* {dates.map((item,index)=>{ */}
                            {/* return( */}
                                <ToggleButton
                                key={dates}
                                value={dates}
                                size="small"
                                checked
                                style={{borderRadius: "70px",fontSize:"10px"}}>{dates}
                            </ToggleButton>
                            {/* ) */}
                            
                        {/* })} */}
                            
                            

                        </ToggleButtonGroup>
                    </ThemeProvider>
            </Row>            
            <Row className="pt-3">
                {printSchedule(dateSchedule)}
            
            </Row>
            
    </Container>
    <Container className="container1">
        <Row>
        <h3 style={{fontSize:"20px",fontWeight:"bold"}}>Send Email</h3>
        <p className="attending_text">Send to guests attending:</p>
        </Row>
        <Container className="container2">
                <Row>
                <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon1">Subject:</InputGroup.Text>
                <Form.Control
                placeholder="Message from Sales Demo Webinar organizer"
                className="subject_control"
                aria-label="Username"
                aria-describedby="basic-addon1"
                />
                </InputGroup>
                <Col sm={12} className="" style={{height:"150px"}}>
                    <ReactQuill              
                    className="react_quill"      
                    placeholder='What you would like to say'
                    modules={modules}
                    formats={formats}
                    value={body2}
                    onChange={handleBody2}/>
                    </Col>
                </Row>
                <Row>
                    <p className="statuses_text">Send to guests in the following statuses:</p>
                </Row>
                <Row>
                <Col>
                    {allStatuses.map((item)=>{
                        return(
                            <Button variant="custom" onClick={handleStatus} className={statusClass}>{item}</Button>
                            )
                    })}
                    </Col>                    
                </Row>
                <Row className="mt-3">
                    <Col>
                    <Button variant="custom" className="send_btn"><span><FiSend/></span> Send Email</Button>
                    </Col>
                    <br />
                    
                </Row>
                <Row className="mt-2">
                <Col>
                    <p className="send_text">Guests will not see each other's email address. Replies will go 123@mail.com</p>
                </Col>
                </Row>
        </Container>
    </Container>
                <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        style={{ border: 'none' }}
                        aria-describedby="modal-modal-description">
                        <Box sx={style} style={{ border: 'none' }}>
                            <Typography id="modal-modal-title" style={{ marginBottom: '10px' }} variant="h6" component="h2">
                                Schedule an email
                            </Typography>
                            <Form onSubmit={handleSubmit}>
                            <Row>
                                <Col>
                                    <Form.Label>To</Form.Label>
                                    <Form.Control type="email" placeholder='enter emailId to send' value={email} onChange={handleEmailIdChange} required/>
                                </Col>                                
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Label>Subject</Form.Label>
                                    <Form.Control placeholder='enter subject for email' value={subject} onChange={handleSubjectChange} required/>
                                </Col>
                            </Row>
                            
                            <Row className="pt-4">
                        <Col>
                        <Form.Label>Set Date and Time</Form.Label>
                            <LocalizationProvider dateAdapter={DateAdapter}>
                                <Stack spacing={3}>
                                    <Row>
                                        <Col sm={4}>
                                            <TimePicker
                                            style={{fontSize:"10px"}}
                                                label="Time"
                                                value={currentDate}
                                                onChange={handleTimeDateChange}                                                
                                                renderInput={(params) => <TextField  {...params}/>}/>
                                        </Col>
                                        <Col sm={4}>
                                            <DatePicker
                                                label="Date"
                                                openTo="year"
                                                views={['year', 'month', 'day']}
                                                value={currentDate}
                                                disablePast
                                                onChange={handleTimeDateChange}
                                                renderInput={(params) => <TextField {...params}/>}/>
                                        </Col>
                                    </Row>
                                </Stack>
                            </LocalizationProvider>
                        </Col>
                    </Row>
                    <Row className='mt-3 mb-3'>
                    <Col sm={12} className="" style={{height:"100px"}}>
                    <ReactQuill              
                    className="react_quill"      
                    placeholder='What you would like to say'
                    modules={modules}
                    formats={formats}
                    value={body}
                    onChange={handleBody}/>
                    </Col>
                    </Row>
                    <Row className="justify-content-md-center py-4">
                                <Col md="auto">
                                    <Button
                                        className="submit"
                                        variant="custom"
                                        type="submit"
                                        >Submit</Button>&nbsp;&nbsp;
                                    <Button variant="outline-secondary" onClick ={handleClose}className="px-3 mx-3">Discard</Button>
                                </Col>
                            </Row>
                    </Form>
                        </Box>
                    </Modal> 
    </>

}

export default Emails
