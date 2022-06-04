import * as React from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import { Col, Row } from 'react-bootstrap';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { InlineWidget, PopupButton } from "react-calendly";
import { BiPhoneCall, BiComment } from "react-icons/bi";
import { FaFacebook, FaTwitter, FaLinkedin, FaHome } from "react-icons/fa";
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
const drawerWidth = 240;
function Content({ Contents }) {
    const [mobileOpen, setMobileOpen] = React.useState(false);
    console.log(Contents);
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };
    const [selectedSection, setSelectedSection] = useState('Home');
    const curr_url = window.location.href;
    const drawer = (
        <div>
            <Toolbar />
            <List>
                <ListItem onClick={() => { setSelectedSection('Home') }} button key={'Home'}>
                    <ListItemIcon>
                        <FaHome />
                    </ListItemIcon>
                    <ListItemText primary={'Home'} />
                </ListItem>
                {Contents[0].contents.map((text, index) => (
                    <ListItem onClick={() => { setSelectedSection(text.section_name) }} button key={text.section_name}>
                        <ListItemIcon>
                            {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                        </ListItemIcon>
                        <ListItemText primary={text.section_name} />
                    </ListItem>
                ))}
            </List>
        </div>
    );

    // const container = window !== undefined ? () => window().document.body : undefined;
    const CTA = () => {
        const cta = JSON.parse(Contents[0].cta);
        return (
            <>
                <small><b>Contact :</b> {Contents[0].sales_person}</small>
                <video controls style={{ marginTop: '5', width: '100%', height: 'auto', borderRadius: '20' }}>
                    <source src={Contents[0].welcome_message.url} type='video/webm' />
                </video>
                {
                    cta.map((action, key) => {
                        if (action.type == 'MEETING') {
                            return (
                                <>
                                    <PopupButton
                                        className="btn btn-success"
                                        pageSettings={{
                                            backgroundColor: 'ffffff',
                                            hideEventTypeDetails: false,
                                            hideGdprBanner: true,
                                            hideLandingPageDetails: false,
                                            primaryColor: '00a2ff',
                                            textColor: '4d5055'
                                        }}
                                        prefill={{
                                            customAnswers: {
                                                a1: 'a1',
                                                a10: 'a10',
                                                a2: 'a2',
                                                a3: 'a3',
                                                a4: 'a4',
                                                a5: 'a5',
                                                a6: 'a6',
                                                a7: 'a7',
                                                a8: 'a8',
                                                a9: 'a9'
                                            },
                                            date: new Date('2022-02-01T18:03:09.767Z'),
                                            email: 'test@test.com',
                                            firstName: 'Jon',
                                            guests: [
                                                'janedoe@example.com',
                                                'johndoe@example.com'
                                            ],
                                            lastName: 'Snow',
                                            name: 'Jon Snow'
                                        }}
                                        styles={{ width: '100%' }}
                                        text="Book a Meeting"
                                        url="https://calendly.com/utpalendu"
                                        utm={{
                                            utmCampaign: 'Spring Sale 2019',
                                            utmContent: 'Shoe and Shirts',
                                            utmMedium: 'Ad',
                                            utmSource: 'Facebook',
                                            utmTerm: 'Spring'
                                        }}
                                    />
                                </>
                            )
                        }
                        if (action.type == 'SIGNUP') {
                            return (
                                <Button variant="contained" style={{ width: '100%', marginTop: '10px' }}>Signup</Button>
                            )
                        }
                    })
                }

            </>
        )
    }
    const Register = () => {

        const [openRegister, setOpenRegister] = useState(false);
        const handleOpenRegister = () => {
            setOpenRegister(true);
        }
        const handleCloseRegister = () => {
            setOpenRegister(false);
        }
        const style = {
            position: 'absolute',
            top: '40%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
        };
        const [firstName, setFirstName] = useState('');
        const [lastName, setLastName] = useState('');
        const [email, setEmail] = useState('');
        const handleFirstName = (e) =>{
            setFirstName(e.target.value);
        }
        const handleLastName = (e) =>{
            setLastName(e.target.value);
        }
        const handleEmail = (e) =>{
            setEmail(e.target.value);
        }
        const Entry = () => {

            alert('Your registration is complete!');
            handleCloseRegister();
        }
        return (
            <>
                <Button onClick={handleOpenRegister} variant="outlined" style={{ width: '100%', marginTop: '10px' }} startIcon={<BiComment />}>
                    Register for the event
                </Button>
                <Modal
                    open={openRegister}
                    onClose={handleCloseRegister}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description">
                    <Box sx={style}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Event Registration
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            <TextField type="text" onChange={handleFirstName} style={{ width: '100%', marginBottom: '10px' }} label='First Name' />
                            <TextField type="text" onChange={handleLastName} style={{ width: '100%', marginBottom: '10px' }} label='Last Name' />
                            <TextField type="text" onChange={handleEmail} style={{ width: '100%', marginBottom: '10px' }} label='Email' />
                            <button className='btn btn-success' onClick={Entry}>Submit</button>
                        </Typography>
                    </Box>
                </Modal>
            </>
        );
    }
    const Home = () => {
        return (
            <>
                <br />
                <Card sx={{ maxWidth: '100%' }}>
                    <CardActionArea>
                        <CardMedia
                            component="img"
                            height="140"
                            image={Contents[0].thumbnail}
                            alt="green iguana"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                {Contents[0].title}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {
                                    Contents[0].events.map((data, key) => {
                                        return (
                                            <small>Date : {data.date} , Time : {data.time} </small>
                                        )
                                    })
                                }
                                <br />
                                <small>Hosted By : {Contents[0].sales_person}</small>
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                    <CardActions>
                        <Button size="small" color="primary">
                            Register
                        </Button>
                    </CardActions>
                </Card>
            </>
        );
    }
    const Resources = ({ SectionName }) => {
        const temp = [];
        Contents[0].contents.map((data, key) => {
            if (data.section_name == SectionName) {
                data.contents.map((res, i) => {
                    temp.push(res);
                })
            }
        })
        return (
            <>
                <h4>{SectionName}</h4>
                {
                    temp.map((data, key) => {
                        return (
                            <>
                            <br/>
                            <p>{data.resourceTitle}</p>
                            <iframe src={data.fileCdnLink} style={{width:'90%',height:'400px'}}></iframe>
                            </>
                            
                        )
                    })
                }

            </>
        )
    }
    return (
        <Box sx={{ display: 'flex' }}>
            <h1>test</h1>
            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                aria-label="mailbox folders">
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Drawer
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}>
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>
            <Box
                component="main"
                sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}>
                <Toolbar />
                <Row>
                    <Col sm={8} style={{ padding: '30px' }}>
                        {
                            (selectedSection == 'Home') ? <Home /> : <Resources SectionName={selectedSection} />
                        }
                    </Col>
                    <Col sm={4} style={{ padding: '30px' }}>
                        <CTA />
                        <Row className={'mt-2'}>
                            <Col sm={6}>
                                <Button variant="outlined" size={'small'} startIcon={<BiPhoneCall />}>
                                    Phone Call
                                </Button>
                            </Col>
                            <Col sm={6}>
                                <Button variant="outlined" size={'small'} startIcon={<BiComment />}>
                                    Ask Queries
                                </Button>
                            </Col>
                        </Row>
                        <Register />
                        <hr />
                        <small>Share this deal room</small>
                        <Row className={'mt-1'}>
                            <Col sm={2}>
                                <a href={'https://www.facebook.com/sharer/sharer.php?u=' + curr_url} target='blank'><FaFacebook style={{ cursor: 'pointer' }} /></a>
                            </Col>
                            <Col sm={2}>
                                <a href={'https://twitter.com/intent/tweet?text=' + curr_url} target='blank'><FaTwitter style={{ cursor: 'pointer' }} /></a>
                            </Col>
                            <Col sm={2}>
                                <a href={'https://www.linkedin.com/shareArticle?mini=true&url=' + curr_url + '&title=&summary=&source='} target='blank'><FaLinkedin style={{ cursor: 'pointer' }} /></a>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Box>
        </Box>
    );
}

/*ResponsiveDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   *
  window: PropTypes.func,
};*/

export default Content;