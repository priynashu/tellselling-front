import {Col, Card, Row} from 'react-bootstrap'
import {TiArrowForward} from 'react-icons/ti'
import {AiFillEye} from 'react-icons/ai'
import styles from './resource.module.scss';
import {Component} from 'react';
import {FaUserAlt, FaEye, FaShare, FaDownload, FaEdit} from "react-icons/fa";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import {MdDeleteForever} from 'react-icons/md'
import "./DisplayCard.css";
import axios from 'axios';
import { toast } from 'react-toastify';
import { getLocalUser } from '../../utils/GetLocalUser';
// import { EditContentDrawer } from './EditContentDrawer';
class DisplayCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: this.props.displayData,
            preview_mode: false,
            edit_mode: false,
            fileCdnLink:""
        }
    }
    
    render() {
        
        // console.log("display card data",this.props.data);
        const countForward = this.props.displayData.sharedBy.length;
        const countEye = this.props.displayData.viewedBy.length;
        const contentAreas = this.props.displayData.content_areas?.map((area) => {
                return area.value;
            })
            .join(", ");
        // console.log(this.props.displayData);

        const OnPreview = () => {
            this.setState({preview_mode: true});
        }
        const OffPreview = () => {
            this.setState({preview_mode: false});
        }
        const UpdateTags = async (data) => {
            //update tag database from here
            //processing datas
            // console.log(" add tags",data);
            const localUser = getLocalUser();
            const temp = [];
            data.forEach((val, key) => {
                temp.push({name:val.name,count:val.count});
            })
            const req_body = {
                tenantId: localUser.tenantId,
                method: 'UPDATE',
                filter: "tags",
                data: temp
            }
            await axios.post('http://localhost:5000/resources/filters', req_body).then((res) => {
                // console.log(res)
            }).catch((err) => { console.log(err) })
            this.props.updateTags(temp);
            
            // setTags(data);
        }
        const UpdateCategories = async (data) => {
            //processing datas
            // console.log("add cat",data);
            const localUser = getLocalUser();
            // const cat={name:"",count:0}
            const temp = [];
            data.forEach((val, key) => {
                temp.push({name:val.name,count:val.count});
            })
            const req_body = {
                tenantId: localUser.tenantId,
                method: 'UPDATE',
                filter: "categories",
                data: temp
            }
            await axios.post('http://localhost:5000/resources/filters', req_body).then((res) => {
                // console.log(res)
            }).catch((err) => { console.log(err) })
            this.props.updateCategories(temp);
        }
        const UpdateContentAreas = async (data) => {
            //processing datas
            // console.log("content areas",data);
            const localUser = getLocalUser();
            const temp = [];
            data.forEach((val, key) => {
                temp.push({name:val.name,count:val.count});
            })
            const req_body = {
                tenantId: localUser.tenantId,
                method: 'UPDATE',
                filter: "content_areas",
                data: temp
            }
            await axios.post('http://localhost:5000/resources/filters', req_body).then((res) => {
                // console.log(res)
            }).catch((err) => { console.log(err) })
            this.props.updateContentAreas(temp);
            
        }
        const UpdateInternalUse = async (data) => {
            //processing datas
            console.log("internal",data);
            const localUser = getLocalUser();
            const temp = [];
            data.forEach((val, key) => {
                temp.push({name:val.name,count:val.count});
            })
            const req_body = {
                tenantId: localUser.tenantId,
                method: 'UPDATE',
                filter: "internal_uses",
                data: temp
            }
            await axios.post('http://localhost:5000/resources/filters', req_body).then((res) => {
                // console.log(res)
            }).catch((err) => { console.log(err) })
            this.props.updateInternalUses(temp);
            
        }
        const UpdatePublic_Pvt = async (data) => {
            //processing datas
            // console.log("internal",data);
            const localUser = getLocalUser();
            const temp = [];
            data.forEach((val, key) => {
                temp.push({name:val.name,count:val.count});
            })
            const req_body = {
                tenantId: localUser.tenantId,
                method: 'UPDATE',
                filter: "public_pvt",
                data: temp
            }
            await axios.post('http://localhost:5000/resources/filters', req_body).then((res) => {
                console.log(res)
            }).catch((err) => { console.log(err) })
            this.props.updatePublic_Pvt(temp)
            // this.props.updatePublic_Pvt(temp);
            // setPublic_Pvt(data);
        }
        const UpdateInternal_Ext = async (data) => {
            //processing datas
            // console.log("internal",data);
            const localUser = getLocalUser();
            const temp = [];
            data.forEach((val, key) => {
                temp.push({name:val.name,count:val.count});
            })
            const req_body = {
                tenantId: localUser.tenantId,
                method: 'UPDATE',
                filter: "internal_ext",
                data: temp
            }
            await axios.post('http://localhost:5000/resources/filters', req_body).then((res) => {
                console.log(res)
            }).catch((err) => { console.log(err) })
            this.props.updateInternal_Ext(temp)
            // this.props.updatePublic_Pvt(temp);
            // setPublic_Pvt(data);
        }
        const updateAllFilters = (categories,tags,content_areas,internal_uses,public_pvt,internal_ext)=>{
            // count tags
            this.props.allTags?.map((item,i)=>{
                tags?.map((index)=>{
                    if(item.name==index.label){
                        this.props.allTags[i].count -= 1;
                        // console.log(allTags[i].name," ",allTags[i].count);
                        // console.log("tags name",item.name);
                    }
    
                })
            })
            UpdateTags(this.props.allTags)
    
            // count cats
            console.log("cats selected",categories);
            this.props.allCategories?.map((item,i)=>{
                categories?.map((index)=>{
                    if(item.name==index.label){
                        this.props.allCategories[i].count -= 1;
                        // console.log(allCategories[i].name," ",allCategories[i].count);
                        // console.log("tags name",item.name);
                    }
    
                })
            })
            UpdateCategories(this.props.allCategories)
    
            //count areas
            this.props.allContentAreas?.map((item,i)=>{
                content_areas?.map((index)=>{
                    if(item.name==index.label){
                        this.props.allContentAreas[i].count -= 1;
                        // console.log(allContentAreas[i].name," ",allContentAreas[i].count);
                        // console.log("tags name",item.name);
                    }
    
                })
            })
            UpdateContentAreas(this.props.allContentAreas)
    
            //count internal_use
            this.props.allInternalUses?.map((item,i)=>{
                internal_uses?.map((index)=>{
                    if(item.name==index.label){
                        this.props.allInternalUses[i].count -= 1;
                        // console.log(allInternalUses[i].name," ",allInternalUses[i].count);
                        // console.log("tags name",item.name);
                    }
    
                })
            })
            UpdateInternalUse(this.props.allInternalUses)
            // console.log("internal use",allInternalUses);
    
            //count public_pvt
            
            if(public_pvt=="Public")
            {
                this.props.allPublic_Pvt[0].count-=1;
            }
            else if(public_pvt=="Private"){
                this.props.allPublic_Pvt[1].count-=1;
            }
            UpdatePublic_Pvt(this.props.allPublic_Pvt)
            console.log("public private",this.props.allPublic_Pvt,public_pvt);
    
            //count internal_ext
            if(internal_ext=="Internal")
            {
                this.props.allInternal_Ext[0].count-=1;
            }
            else if(internal_ext=="External"){
                this.props.allInternal_Ext[1].count-=1;
            }
            UpdateInternal_Ext(this.props.allInternal_Ext)
            // console.log("Internal External",allInternal_Ext);
    
        }
        const OnDeleteMode = () => {
            console.log("id to delete is ",this.props.displayData);
            updateAllFilters(this.props.displayData.categories,this.props.displayData.tags,this.props.displayData.content_areas,this.props.displayData.internal_uses,this.props.displayData.private_public,this.props.displayData.external_internal)
            axios
                .post("http://localhost:5000/resources/delete", {deleteId:this.props.displayData._id})
                .then((res) => {
                    console.log("deleted data",res.data);
                    toast.success('Content deleted successfully !', { position: toast.POSITION.BOTTOM_LEFT });
                    window.location.reload(true);
                    this.props.fetchData();
                })
                .catch((err) => {
                    console.log("err in deleting content",err);
                    toast.error('Failed to delete the content !', { position: toast.POSITION.BOTTOM_LEFT });
                })
        }
        const OnEditMode = () => {
            this
                .props
                .isOpen(true)
            // console.log("inside card",this.props.displayData);
            this
                .props
                .getResourceData(this.props.displayData);
            // console.log("isOpen",this.props.isOpen(true));
            this.setState({edit_mode: true});
            OffPreview();
        }
        const OffEditMode = () => {
            this.setState({edit_mode: false});
        }

        const DownloadResource = (link) => {
            window.open(link, '_blank');
        }

        const Preview = () => {
            const style = {
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 550,
                bgcolor: 'background.paper',
                border: 'none',
                boxShadow: 18,
                p: 2
            };
            return (
                <Modal
                    open={this.state.preview_mode}
                    onClose={OffPreview}
                    aria-labelledby="modal-modal-title"
                    style={{
                    border: 'none'
                }}
                    aria-describedby="modal-modal-description">
                    <Box
                        sx={style}
                        style={{
                        border: 'none'
                    }}>
                        <Typography id="modal-modal-title" style={{textOverflow:"ellipsis",width:"200px"}} variant="h6" component="h2">
                            {this.props.displayData.resourceTitle}
                        </Typography>
                        <div
                            style={{
                            width: '100%',
                            fontSize: '14px',
                            color: 'gray'
                        }}>
                            <div
                                style={{
                                float: 'left'
                            }}>
                                <FaEye
                                    style={{
                                    float: 'left'
                                }}/>
                                <small
                                    style={{
                                    float: 'left',
                                    marginLeft: '8px',
                                    marginRight: '10px'
                                }}>{countEye}</small>
                            </div>
                            <div
                                style={{
                                float: 'left'
                            }}>
                                <FaShare
                                    style={{
                                    float: 'left'
                                }}/>
                                <small
                                    style={{
                                    float: 'left',
                                    marginLeft: '8px',
                                    marginRight: '10px'
                                }}>{countForward}</small>
                            </div>
                            <div
                                style={{
                                float: 'right'
                            }}>
                                <FaUserAlt
                                    style={{
                                    float: 'left'
                                }}/>
                                <small
                                    style={{
                                    float: 'left',
                                    marginLeft: '10px'
                                }}>{this.props.displayData.createdBy}</small>
                            </div>
                        </div>
                        <div
                            id="modal-modal-description"
                            style={{
                            width: '100%',
                            marginTop: '20px',
                            borderTop: '0.5px solid #f1f1f1'
                        }}>
                            <iframe
                                style={{
                                width: '100%',
                                height: '450px',
                                backgroundPosition: 'center', backgroundSize: 'cover', backgroundImage: `url(${this.props.displayData.fileCdnLink})`
                            }}
                                ></iframe>
                        </div>
                        <div
                            style={{
                            width: '100%',
                            fontSize: '14px',
                            color: 'gray'
                        }}>
                            <Button
                                varient='text'
                                style={{
                                float: 'left'
                            }}
                                onClick={() => {
                                DownloadResource(this.props.displayData.fileCdnLink)
                            }}>
                                <FaDownload
                                    style={{
                                    float: 'left'
                                }}/>
                                &nbsp; Download
                            </Button>
                            <Button
                                varient='text'
                                style={{
                                float: 'right'
                            }}
                                onClick={OnDeleteMode}>
                                <MdDeleteForever
                                    style={{
                                    float: 'left',
                                    fontSize: "20px"
                                }}/>
                                &nbsp;Delete
                            </Button>
                            <Button
                                varient='text'
                                style={{
                                float: 'right'
                            }}
                                onClick={OnEditMode}>
                                <FaEdit
                                    style={{
                                    float: 'left'
                                }}/>
                                &nbsp; Edit
                            </Button>

                        </div>
                    </Box>
                </Modal>
            )
        }
        return ( <> 
            <Card
                onClick={OnPreview}
                style={{
                width: '100%',
                marginTop: '25px',
                position: 'relative'
            }}
                className='resource_card'>
                <Card.Img
                    style={{border:'none !important', height: '150px', width: '100%', backgroundPosition: 'center', backgroundSize: 'cover', backgroundImage: `url(${this.props.displayData.thumbnail})`, cursor: 'pointer' }}
                    />
                <Card.Body className={styles.CardBody}>
                    <Card.Text className={styles.CardText}>{contentAreas}</Card.Text>
                    <Card.Title className={styles.CardTitle}>{this.props.displayData.resourceTitle}</Card.Title>
                    <Card.Text><TiArrowForward style={{
            color: "gray"
        }}/>&nbsp;<span className={styles.icontext}>{countForward}</span>
                        &nbsp;&nbsp;&nbsp;
                        <AiFillEye
                            style={{
                            color: "gray"
                        }}/>
                        <span className={styles.icontext}>&nbsp;{countEye}</span>
                    </Card.Text>
                    <div
                        style={{
                        width: '100%'
                    }}
                        className='info'>
                        <div
                            style={{
                            float: 'left',
                            fontSize: '12px',
                            color: 'gray'
                        }}>
                            <FaUserAlt
                                style={{
                                float: 'left'
                            }}/>
                            <small
                                style={{
                                float: 'left',
                                marginLeft: '6px'
                            }}>
                                {this.props.displayData.createdBy}</small>
                        </div>
                        <div
                            style={{
                            float: 'right'
                        }}>
                            <FaEye
                                style={{
                                fontSize: '15px',
                                float: 'right',
                                color: 'gray'
                            }}/>
                        </div>
                    </div>
                </Card.Body>
            </Card>
         < Preview /> </>)
    }
}
export default DisplayCard;