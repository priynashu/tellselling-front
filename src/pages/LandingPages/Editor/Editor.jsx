import React, { Component } from 'react';
import grapesjs from 'grapesjs'
import "grapesjs/dist/css/grapes.min.css";
import gjsPresetWebpage from "grapesjs-preset-webpage";
import gjsBlocksBasic from 'grapesjs-blocks-basic'
import gjsTemplateManager from "grapesjs-template-manager"
import "grapesjs-template-manager/dist/grapesjs-template-manager.min.css"
import '../../../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './style.css'
import axios from 'axios';
import { getLocalUser } from '../../../utils/GetLocalUser'
import { backend_url } from '../../../utils/Config'
import { Col, Row, Tabs } from 'react-bootstrap';
import { Tab } from 'bootstrap';
import { toast } from 'react-toastify';
import ManagePages from './ManagePages'
import { GenerateCustomComponent } from './GenerateCustomComponent';
import { Button, TextField, Select, MenuItem } from '@mui/material';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import Header from '../../../components/Header';
export class Editor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contents: [{ name: `Home`, contents: `` }],
            selected_page: { name: `Home`, contents: `` },
            most_viewed_resources: [],
            type: 'NEW',
            title: '',
            link: Math.random().toString(36).slice(2),
            custom_domain: '',
            header_code: '',
            body_code: '',
            footer_code: '',
            cookie_time: ''
        }
    }
    UpdateContents = (contents) => {
        this.setState({ contents });
    }
    Instance = null;
    Setup = (data) => {
        console.log('setup started');
        const blocks = GenerateCustomComponent(data);
        console.log("blocks data",blocks);
        this.Instance = grapesjs.init({
            container: "#editor",
            fromElement: true,
            width: 'auto',
            storageManager: false,
            layerManager: {
                appendTo: "#layer",
            },
            styleManager: {
                appendTo: "#style"
            },
            panels: {
                defaults: [
                    {
                        id: "basic-actions",
                        el: ".panel__basic-action",
                        buttons: [
                            {
                                id: "visibility",
                                active: true,
                                className: 'btn-toggle-borders',
                                label: '<i class="gjs-pn-btn fa fa-square-o gjs-pn-active gjs-four-color"></i>',
                                command: "sw-visibility"
                            },
                        ]
                    },
                    {
                        id: "panel-devices",
                        el: ".panel__devices",
                        buttons: [
                            {
                                id: "device-desktop",
                                label: "<i class='gjs-pn-btn fa fa-desktop'></i>",
                                command: "set-device-desktop",
                                active: true,
                                togglable: false,
                            },
                            {
                                id: "device-mobile",
                                label: "<i class='gjs-pn-btn fa fa-mobile'></i>",
                                command: "set-device-mobile",
                                togglable: false,
                            }
                        ]
                    }
                ]
            },
            deviceManager: {
                devices: [
                    {
                        name: "Desktop",
                        width: '',
                    }, {
                        name: "Mobile",
                        width: '320px',
                        widthMedia: "480px"
                    }
                ]
            },
            plugins: [gjsTemplateManager],
            pluginsOpts: {
                "gjsTemplateManager": {}
            },
            blockManager: {
                appendTo: "#block",
                custom: true,
                blocks,
            },
        });
        const html = `
        <script src="https://code.jquery.com/jquery-3.6.0.min.js" integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=" crossorigin="anonymous"></script>
        <!-- CSS only -->
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
        <!-- JavaScript Bundle with Popper -->
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/assets/owl.carousel.min.css" integrity="sha512-tS3S5qG0BlhnQROyJXvNjeEM4UpMXHrQfTGmbQ1gKmelCxlSEBUaxhRBj/EFTzpbP4RVSrpEikbmdJobCvhE3g==" crossorigin="anonymous" referrerpolicy="no-referrer" />
        <script src="https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/owl.carousel.min.js" integrity="sha512-bPs7Ae6pVvhOSiIcyUClR7/q2OAsRiovw4vAkX+zJbw3ShAeeqezq50RIIcIURq7Oa20rW2n2q+fyXBNcU9lrw==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
        `+ this.state.selected_page.contents + ` <p>` + this.state.selected_page.name + `</p>`;

        this.Instance.setComponents(html);
        this.Instance.on('update', (some, argument) => {
            // do something
            const html = this.Instance.getHtml();
            const page = {
                name: this.state.selected_page.name,
                contents: html
            }
            //console.log(page);
            this.setState({ selected_page: page });

            const curr = this.state.selected_page;
            const temp = [];
            this.state.contents.forEach((data, key) => {
                if (data.name == curr.name) {
                    temp.push(curr);
                } else {
                    temp.push(data);
                }
            });

            //console.log(this.state.selected_page);
        })
    }
    SelectPage = (content) => {
        console.log(content);
        console.log(this.state.selected_page);
        this.Instance.DomComponents.clear();
        this.Instance.CssComposer.clear();
        const temp = [];

        const html = `
        <script src="https://code.jquery.com/jquery-3.6.0.min.js" integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=" crossorigin="anonymous"></script>
        <!-- CSS only -->
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
        <!-- JavaScript Bundle with Popper -->
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/assets/owl.carousel.min.css" integrity="sha512-tS3S5qG0BlhnQROyJXvNjeEM4UpMXHrQfTGmbQ1gKmelCxlSEBUaxhRBj/EFTzpbP4RVSrpEikbmdJobCvhE3g==" crossorigin="anonymous" referrerpolicy="no-referrer" />
        <script src="https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/owl.carousel.min.js" integrity="sha512-bPs7Ae6pVvhOSiIcyUClR7/q2OAsRiovw4vAkX+zJbw3ShAeeqezq50RIIcIURq7Oa20rW2n2q+fyXBNcU9lrw==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
        `+ ` <p>` + this.state.selected_page.name + `</p>`;

        this.Instance.setComponents(html);
    }
    CheckExisting = () => {
        const localUser = getLocalUser();
        const u = backend_url+'landing-pages/get-landing-pages/' + localUser.tenantId
        axios.get(u)
            .then((res) => {
                const data = res.data;
                console.log(data);
                if (data != null) {
                    this.setState({ type: 'EXISTING' })
                    this.setState({ contents: data.contents });
                    this.setState({ title: data.title });
                    this.setState({ link: data.link });
                    this.setState({ cookie_expiry: data.cookie_expiry });
                    this.setState({ custom_domain: data.custom_domain });
                }
                const url = backend_url+"landing_page_componenets/" + localUser.tenantId;
                console.log("URL : " + url);
                fetch(url)
                    .then(response => response.json())
                    .then((data) => {
                        console.log(data);
                        this.setState({ most_viewed_resources: data });
                        this.Setup(this.state.most_viewed_resources);
                    });
            }).catch((err) => {
                console.log(err);
            })
    }
    componentDidMount() {
        this.CheckExisting();
    }
    PageTransition = (page_name) => {
        //const html=`<p>`+page_name+`</p>`;
        //this.Instance.setComponents(html); 
        const curr = this.state.selected_page;
        const temp = [];
        this.state.contents.forEach((data, key) => {
            if (data.name == curr.name) {
                temp.push(curr);
            } else {
                temp.push(data);
            }
        });
        this.setState({ contents: temp });
        console.log(this.state.contents);
        temp.forEach((data, key) => {
            if (data.name == page_name) {
                console.log(data);
                this.Instance.setComponents(data.contents);
                this.setState({ selected_page: data });
            }
        });
    }
    NewPage = (name) => {
        const html = `
        <script src="https://code.jquery.com/jquery-3.6.0.min.js" integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=" crossorigin="anonymous"></script>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/tailwindcss/2.2.19/tailwind.min.css" integrity="sha512-wnea99uKIC3TJF7v4eKk4Y+lMz2Mklv18+r4na2Gn1abDRPPOeef95xTzdwGD9e6zXJBteMIhZ1+68QC5byJZw==" crossorigin="anonymous" referrerpolicy="no-referrer" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/assets/owl.carousel.min.css" integrity="sha512-tS3S5qG0BlhnQROyJXvNjeEM4UpMXHrQfTGmbQ1gKmelCxlSEBUaxhRBj/EFTzpbP4RVSrpEikbmdJobCvhE3g==" crossorigin="anonymous" referrerpolicy="no-referrer" />
        <script src="https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/owl.carousel.min.js" integrity="sha512-bPs7Ae6pVvhOSiIcyUClR7/q2OAsRiovw4vAkX+zJbw3ShAeeqezq50RIIcIURq7Oa20rW2n2q+fyXBNcU9lrw==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
        `+ ` <p>` + name + `</p>`;
        const temp = this.state.contents;
        const obj = {
            name: name,
            contents: html
        }
        temp.push(obj);
        this.setState({ contents: temp });
    }

    RemovePage = (name) => {
        const temp = [];
        this.state.contents.map((data, key) => {
            if (data.name != name) {
                temp.push(data);
            }
        });
        this.setState({ contents: temp });
    }

    SaveNew = () => {

        const style = {
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 600,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
        };
        const [open, setOpen] = React.useState(false);
        const handleOpen = () => setOpen(true);
        const handleClose = () => setOpen(false);
        const cookie_times = ['2 hours', '12 hours', '24 hours', '48 hours', '72 hours'];
        const [selected_cookie_time, set_selected_cookie_time] = React.useState(cookie_times[0]);

        const SelectCookieTime = (e) => {
            set_selected_cookie_time(e.target.value);
        }

        const handleTitle = (e) => {
            this.setState({ title: e.target.value });
        }

        const HandleDomain = (e) => {
            this.setState({ custom_domain: e.target.value });
        }

        const HandleHeaderCode = (e) => {
            this.setState({ header_code: e.target.value });
        }

        const HandleBodyCode = (e) => {
            this.setState({ body_code: e.target.value });
        }

        const HandleFooterCode = (e) => {
            this.setState({ footer_code: e.target.value });
        }

        const Publish = (method) => {
            const localUser = getLocalUser();
            const curr = this.state.selected_page;
            const temp = [];
            this.state.contents.forEach((data, key) => {
                if (data.name == curr.name) {
                    temp.push(curr);
                } else {
                    temp.push(data);
                }
            });
            this.setState({ contents: temp });
            const post_data = {
                tenantId: localUser.tenantId, //String
                title: this.state.title, //Titile Of the Website
                link: this.state.link, //Link Of the Website
                contents: this.state.contents, // JSON in String 
                header_code: this.state.header_code,
                body_code: this.state.body_code,
                footer_code: this.state.footer_code,
                custom_domain: this.state.custom_domain,
                cookie_expiry: selected_cookie_time
            }
            if (this.state.type == 'NEW') {
                axios.post(backend_url+'landing-pages/create', post_data)
                    .then((res) => {
                        toast.success('Landing page successfully saved!', { position: toast.POSITION.BOTTOM_LEFT });
                        console.log(res);
                        handleClose();
                        if(method=='PREVIEW'){
                            window.open(backend_url+'landing-page/' + localUser.tenantId, '_blank', 'location=yes,height=600,width=920,scrollbars=yes,status=yes');
                        }
                    }).catch((err) => {
                        console.log(err);
                    })
            } else if (this.state.type == 'EXISTING') {
                axios.post(backend_url+'landing-pages/update', post_data)
                    .then((res) => {
                        toast.success('Landing page successfully saved!', { position: toast.POSITION.BOTTOM_LEFT });
                        console.log(res);
                        handleClose();
                        if(method=='PREVIEW'){
                            window.open(backend_url+'landing-page/' + localUser.tenantId, '_blank', 'location=yes,height=600,width=920,scrollbars=yes,status=yes');
                        }
                    }).catch((err) => {
                        console.log(err);
                    })
            }
            
        }

        return (
            <div>
                <Row style={{marginTop:'10px'}}>
                    <Col sm={6}>
                        <Button variant='outlined' onClick={handleOpen} style={{width:'100%'}}>Save</Button>
                    </Col>
                    <Col sm={6}>
                        <Button variant='outlined' onClick={() => {
                            Publish('PREVIEW');
                        }} style={{width:'100%'}}>Preview</Button>
                    </Col>
                </Row>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description">
                    <Box sx={style}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Publish Landing Page
                        </Typography>
                        <Tabs defaultActiveKey="home" id="uncontrolled-tab-example" className="mb-2 mt-3">
                            <Tab eventKey="home" title="Publish">
                                <Typography id="modal-modal-description" sx={{ mt: 3 }}>
                                    <TextField style={{ width: '100%' }} onChange={handleTitle} value={this.state.title} label='Landing Page Title' />
                                    <TextField className='mt-3' style={{ width: '100%' }} value={this.state.link} label='Link' />
                                    <TextField className='mt-3' style={{ width: '100%' }} value={this.state.custom_domain} onChange={HandleDomain} label='Custom Domain (if any)' />
                                </Typography>
                            </Tab>
                            <Tab eventKey="profile" title="Custom Code">
                                <Typography id="modal-modal-description" sx={{ mt: 3 }}>
                                    <TextField style={{ width: '100%' }} onChange={HandleHeaderCode} value={this.state.header_code} label='Header' />
                                    <TextField className='mt-3' style={{ width: '100%' }} value={this.state.body_code} onChange={HandleBodyCode} label='Body' />
                                    <TextField className='mt-3' style={{ width: '100%' }} value={this.state.footer_code} onChange={HandleFooterCode} label='Footer' />
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        style={{ width: '100%' }}
                                        className='mt-3'
                                        value={selected_cookie_time}
                                        onChange={SelectCookieTime}
                                        label="Cookie Expiry Time">
                                        {
                                            cookie_times.map((val, key) => {
                                                return (<MenuItem value={val}>{val}</MenuItem>);
                                            })
                                        }
                                    </Select>
                                </Typography>
                            </Tab>
                        </Tabs>
                        <Typography id="modal-modal-description" sx={{ mt: 3 }}>
                            <Button variant='outlined' onClick={Publish} className='mt-3'>Save &amp; Publish</Button>
                        </Typography>
                    </Box>
                </Modal>
            </div>
        );
    }

    render() {
        return (
            <div>
                <Header title={"Landing Pages"} links={['Page Editor']} />
                <Row>
                    <Col sm={3} style={{ paddingRight: '0px' }}>
                        <div id="navbar" className="sidenav d-flex flex-column overflow-scroll">
                            <this.SaveNew />
                            <ManagePages PageTransition={this.PageTransition} NewPage={this.NewPage} RemovePage={this.RemovePage} Pages={this.state.contents} />
                            <div>
                                <div className="tab-content">
                                    <Tabs defaultActiveKey="block" id="uncontrolled-tab-example" className="mb-3">
                                        <Tab eventKey="block" title="Block">
                                            <div id="block">
                                            </div>
                                        </Tab>
                                        <Tab eventKey="layer" title="layer">
                                            <div id="layer">
                                            </div>
                                        </Tab>
                                        <Tab eventKey="style" title="Style">
                                            <div id="style">
                                            </div>
                                        </Tab>
                                    </Tabs>
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col sm={9} style={{ paddingLeft: '0px' }}>
                        <div className="main-content">
                            <nav className="navbar navbar-light">
                                <div className="container-fluid">
                                    <div className="panel__devices"> </div>
                                    <div className="panel__basic-action"></div>
                                </div>
                            </nav>
                            <div id="editor"></div>
                        </div>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Editor;
