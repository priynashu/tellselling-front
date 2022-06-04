import React, {useState} from 'react'
import {
    Container,
    Row,
    Col,
    InputGroup,
    Form,
    Image,
    Button,    
    Accordion
} from 'react-bootstrap'
import styles from "./createRoom3.module.scss"
import "./try.css"

import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {red} from '@mui/material/colors';
import {MdOutlineEdit, MdGroup, MdOutlineRotateRight} from 'react-icons/md'
import {HiOutlineMail} from 'react-icons/hi'
import {BiCopy, BiCylinder} from 'react-icons/bi'
import {BsFillCameraVideoFill,BsCheckCircle} from 'react-icons/bs'
import {AiOutlinePicture, AiFillYoutube,AiOutlinePlus} from 'react-icons/ai'
import {RiDeleteBin6Line} from 'react-icons/ri'
import {FaRegCalendarAlt} from 'react-icons/fa'
import {GrEdit} from 'react-icons/gr'
import ReactQuill from 'react-quill';
import "../../../../../../node_modules/react-quill/dist/quill.snow.css"
const outerTheme = createTheme({
    palette: {
        secondary: {
            main: red[500]
        }
    }
});
const modules={toolbar:[
    [{header:"1"},{header:"2"}],    
    ["bold","italic","underline"],
    [{list:"ordered"},{list:"bullet"}],
    ["link","image"],    
    ["code-block"]
],
};

const formats=["header","bold","italic","underline","list","bullet","link","image","code-block"]
const Info = ({Data,UpdatemeetingUrl,UpdateEventPlace}) => {
    // iamge upload
    console.log("data from info",Data.link);
    const [thumbnail,setThumbnail] = useState(Data.thumbnail);
    const handleImage = () => {
        document.getElementById('imgChange').click();
     };
    const handleImgUpload =(e)=>{
        const selectedFile = e.target.files[0];
        console.log("img change",selectedFile);
    }

    const [link,
        setLink] = useState(Data.link);
    const [title,
        setTitle] = useState("Sales Demo Webinar");
    const copy = async() => {
        await navigator
            .clipboard
            .writeText(link);
        // console.log("text is",link);
    }
    // streamProvider
    const [streamProvider,setStreamProvider] = useState();
    const handleStreamProvider =(e)=>{
        setStreamProvider(e.target.value)
        console.log("stream provider: ",e.target.value);
    }

    //stream identifier
    const [streamIdentifier,setStreamIdentifier] = useState();
    const handleStreamIdentifier=(e)=>{
        setStreamIdentifier(e.target.value)
    }
    
    const [value,
        setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    }
    const [body,setBody] =useState("")
    const handleBody=(e)=>{
        setBody(e.target.value)
        console.log("body is",body);
    }

    // UpdatemeetingUrl("123456")
    const [meetingUrl,setMeetingUrl] = useState(Data.meetingValues.meetingUrl);
    const handleMeetingUrlChange=()=>{
        // console.log("props",this.props);
        UpdatemeetingUrl(meetingUrl)
    }
    const handleMeetingEventChange=(e)=>{
        UpdateEventPlace(e.target.value)
    }
    
    return ( <>
     
     < Container> <Row className="h-5" fluid style={{
        backgroundColor: "#f2f2f2"
    }}>
        <Col sm={12} className={styles.img_manage}>
        <Image
                    className='w-100'
                    style={{
                    height: '300px'
                }}
                    src={thumbnail}></Image>
                    <Form.Control
                            style={{display:"none"}}
                            type="file"
                            size="sm"                                          
                            id="imgChange"
                            onChange={handleImgUpload}
                            />
                    <Button
                    style={{fontSize: "15px"}}
                    onClick={handleImage}
                    className="mt-3"
                    variant="secondary"><AiOutlinePicture/>
                    &nbsp;&nbsp;Change Cover Photo</Button>
            <Form>
                <Row className='mt-3'>
                    <Col sm={9}>

                        <Form.Label
                            style={{
                            fontWeight: "bold",
                            color: "#333333"
                        }}>Event Name</Form.Label>
                        {/* <Form.Control className={styles.event_form}  type="text" ></Form.Control> */}
                        <InputGroup className="mb-3">
                            <Form.Control className={styles.event_form_manage} value={title}/>
                        </InputGroup>

                    </Col>
                </Row>
                <Row>
                    <Col sm={6}>
                        <p className={styles.event_details}><FaRegCalendarAlt/>&nbsp;Event Details</p>
                        <p
                            style={{
                            fontWeight: "bold",
                            color: "#333333",
                            marginBottom: "3px"
                        }}>Guests can register for</p>
                        <Form.Select>
                            <option>Full series or Sessions</option>
                        </Form.Select>
                    </Col>
                </Row>
                <Row className="mt-3">
                    <Col>
                        <p
                            style={{
                            fontWeight: "bold",
                            color: "#333333",
                            marginBottom: "3px"
                        }}>Sessions</p>
                    </Col>
                    <Col sm={11}>
                        <Accordion defaultActiveKey="0">
                            <Accordion.Item eventKey="0">
                                <div className={styles.panel_header}>
                                    <Accordion.Header>{new Date(Data.fullDate).toDateString()}
                                    {/* <span className={styles.date} style={{fontWeight: "bold"}}>&nbsp;&nbsp;SATURDAY&nbsp;&nbsp;
                                            <BsFillCameraVideoFill/></span> */}
                                    </Accordion.Header>
                                    <Accordion.Body>
                                        <Row className="mt-2">
                                            <Col sm={6}>
                                                <Form.Label className={styles.stream_text}>Stream provider</Form.Label>
                                                <Form.Select aria-label="Default select example" onChange={handleMeetingEventChange} value={Data.eventPlace} name="streamProvider">
                                                    <option value="Zoom">Zoom</option>
                                                    <option value="Virtual">Virtual</option>                                                    
                                                </Form.Select>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col sm={12} className="my-4">
                                                {/* <div
                                                    style={{background: "#ccddff"}}
                                                    className={styles.stream_box}>
                                                    <p className={styles.stream_link}><AiFillYoutube style={{fontSize: "30px",color: "red"}}/>
                                                        &nbsp;Youtube, nice! Please Copy the video ID below - eg.
                                                        https://www.youtube.com/watch?v=<span style={{fontWeight: "bold",color: "blue"}}>LXb3EKWsinQ</span>
                                                    </p>
                                                </div> */}
                                                <Form.Label className={styles.stream_identifier}>Meeting Url</Form.Label>
                                                <Form.Control placeholder="https://zoom.us/5555555" value={meetingUrl} onChange={(e)=>{setMeetingUrl(e.target.value)}} name="meetingUrl"/>
                                            </Col>
                                        </Row>
                                        {/* <Row className="mb-4">
                                            <Col sm={12}>
                                                <Form.Label className={styles.stream_identifier}>Stream Identifier</Form.Label>
                                                <Form.Control placeholder="Stream ID e.g. XXXXXXXX" value={Data.link}/>
                                            </Col>
                                        </Row> */}
                                        <Row>
                                            <Col sm={12}>
                                            <Button variant="custom" style={{padding:"8px 20px"}} className={styles.update_btn} onClick={handleMeetingUrlChange}><BsCheckCircle/>&nbsp; Update</Button>
                                            <Button variant="custom" style={{padding:"8px 20px"}} className={styles.cancel_btn} ><RiDeleteBin6Line/> Cancel Session</Button>
                                            </Col>
                                        </Row>
                                    </Accordion.Body>
                                </div>
                            </Accordion.Item>
                            {/* <Accordion.Item eventKey="1">
                            <div className={styles.panel_header}>
                                    <Accordion.Header>5 Dec, 18:30 GMT-6<span className={styles.date} style={{fontWeight: "bold"}}>&nbsp;&nbsp;SUNDAY&nbsp;&nbsp;
                                            <BsFillCameraVideoFill/></span>
                                    </Accordion.Header>
                                    <Accordion.Body>
                                        <Row className="mt-2">
                                            <Col sm={6}>
                                                <Form.Label className={styles.stream_text}>Stream provider</Form.Label>
                                                <Form.Select aria-label="Default select example">
                                                    <option value="Zoom">Zoom</option>
                                                    <option value="Virtual">Virtual</option>                                                    
                                                </Form.Select>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col sm={12} className="mt-4">
                                                <div
                                                    style={{background: "#ccddff"}}
                                                    className={styles.stream_box}>
                                                    <p className={styles.stream_link}><AiFillYoutube style={{fontSize: "30px",color: "red"}}/>
                                                        &nbsp;Youtube, nice! Please Copy the video ID below - eg.
                                                        https://www.youtube.com/watch?v=<span style={{fontWeight: "bold",color: "blue"}}>LXb3EKWsinQ</span>
                                                    </p>
                                                </div>
                                            </Col>
                                        </Row>
                                        <Row className="mb-4">
                                            <Col sm={12}>
                                                <Form.Label className={styles.stream_identifier}>Stream Identifier</Form.Label>
                                                <Form.Control placeholder="Stream ID e.g. XXXXXXXX" onChange={handleStreamIdentifier} value={streamIdentifier}/>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col sm={12}>
                                            <Button variant="custom" style={{padding:"8px 20px"}} className={styles.update_btn} onClick={handleUpload} ><BsCheckCircle/>&nbsp; Update</Button>
                                            <Button variant="custom" style={{padding:"8px 20px"}} className={styles.cancel_btn} ><RiDeleteBin6Line/> Cancel Session</Button>
                                            </Col>
                                        </Row>
                                    </Accordion.Body>
                                </div>
                            </Accordion.Item> */}
                        </Accordion>
                    </Col>
                    <Col className="mt-3" sm={8}>
                    <Button variant="custom" className={styles.add_edit_btn}><AiOutlinePlus/>&nbsp; Add Session</Button>
                    <Button variant="custom" className={styles.add_edit_btn}><GrEdit/>&nbsp; Edit All Sessions</Button>
                    </Col>
                    <Col sm={8} className="mt-3">
                        <Form.Label style={{fontWeight: "bold",color: "#333333",marginBottom: "3px"}}>Description</Form.Label>
                    <ReactQuill
                    className={styles.react_quill}
                    placeholder='Add lots of description ...'
                    modules={modules}
                    formats={formats}
                    value={body}
                    onChange={handleBody}/>
                    </Col>
                </Row>
                <Row>
                    <Col sm={5} className="mt-3">
                    <Form.Label style={{fontWeight: "bold",color: "#333333",marginBottom: "3px"}}>Public Url</Form.Label>
                <InputGroup size="sm" className="mb-2">
                    <InputGroup.Text>tellselling.tech/salesroom/</InputGroup.Text>
                    <Form.Control size="sm" placeholder='form control' value={link}/>
                </InputGroup>
                    </Col>
                </Row>
            </Form>
        </Col>

    </Row> </Container>
     </>)

}
export default Info