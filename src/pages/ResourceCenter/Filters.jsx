import { useState, useEffect, Component } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FormGroup from '@mui/material/FormGroup';
import Checkbox from '@mui/material/Checkbox';
import { Row, Col } from "react-bootstrap"
import styles from './resource.module.scss';
import { getLocalUser } from '../../utils/GetLocalUser';
import { backend_url } from '../../utils/Config';
import axios from 'axios';
import { IoSettingsSharp } from 'react-icons/io5'
import Filter from './Filter';


class Filters extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpenTag: false,
            isOpenCategory: false,
            isOpenContentAreas: false,
            isOpenInternalUse: false,
            tags: [],
            categories: [],
            contentAreas: [],
            internalUse: [],
            internal_ext: [{ name: 'Internal', count: 0 }, { name: 'External', count: 0 }],
            public_pvt: [{ name: 'Public', count: 0 }, { name: 'Private', count: 0 }],
            dataLoaded: false,
            appliedFilters: {categories:[],external_internal:[],tags:[],content_areas:[],public_private:[], internal_uses:[]}
        }
    }
    Sync = () => {
        const localUser = getLocalUser();
        const req = {
            tenantId: localUser.tenantId,
            method: 'GET'
        }
        axios.post(backend_url+'resources/filters', req).then((res) => {
            const data = res.data;
            this.setState({ categories:data?.categories })
            this.props.updateCategory(this.state.categories);
            this.setState({ tags: data?.tags })
            this.props.updateTags(this.state.tags);
            this.setState({ contentAreas:data?.content_areas })
            this.props.updateContentAreas(this.state.contentAreas);
            
            this.setState({ internalUse:data?.internal_uses})
            this.props.updateInternalUse(this.state.internalUse);

            this.setState({public_pvt:data?.public_pvt})
            this.props.updatePublic_Pvt(this.state.public_pvt)

            this.setState({internal_ext:data?.internal_ext})
            this.props.updateInternal_Ext(this.state.internal_ext)

            this.setState({ dataLoaded: true })

        }).catch((err) => {
            console.log(err);
        })
    }
    componentDidMount() {
        this.Sync();
    }
    render() {
        // console.log("filters",this.state.public_pvt);
        const setIsOpentag = (isOpenTag) => {
            this.setState({ isOpenTag })
        }
        const setIsOpenCategory = (isOpenCategory) => {
            console.log("inside open categpry");
            this.setState({ isOpenCategory })
        }
        const setIsOpenInternalUse = (isOpenInternalUse) => {
            this.setState({ isOpenInternalUse })
        }
        const setIsOpenContentAreas = (isOpenContentAreas) => {
            this.setState({ isOpenContentAreas });
        }
        const setTags = (tags) => {
            this.setState({ tags })
        }
        const setCategories = (categories) => {
            this.setState({ categories })
        }
        const setContentAreas = (contentAreas) => {
            this.setState(contentAreas);
        }
        const setInternalUse = (internalUse) => {
            this.setState(internalUse);
        }
        const setPublic_Pvt = (public_pvt) => {
            this.setState(public_pvt);
        }
        const setInternal_Ext = (internal_ext) => {
            this.setState(internal_ext);
        }

        //FILTER FUNCTIONALITIES
        //These functions should be passed to child as props and 
        //should be controlled by the child components
        const UpdateTags = async (data) => {
            //update tag database from here
            //processing datas
            const localUser = getLocalUser();
            const temp = [];
            data?.forEach((val, key) => {
                temp.push({name:val.name,count:val.count});
            })
            const req_body = {
                tenantId: localUser.tenantId,
                method: 'UPDATE',
                filter: "tags",
                data: temp
            }
            await axios.post(backend_url+'resources/filters', req_body).then((res) => {
                console.log(res)
            }).catch((err) => { console.log(err) })
            this.props.updateTags(temp);
            // this.props.updateTags
            setTags(data);
        }
        const UpdateCategories = async (data) => {
            //processing datas
            // console.log("add cat",data);
            const localUser = getLocalUser();
            // const cat={name:"",count:0}
            const temp = [];
            data?.forEach((val, key) => {
                temp.push({name:val.name,count:val.count});
            })
            const req_body = {
                tenantId: localUser.tenantId,
                method: 'UPDATE',
                filter: "categories",
                data: temp
            }
            console.log("dd cat",req_body);
            await axios.post(backend_url+'resources/filters', req_body).then((res) => {
                console.log(res)
            }).catch((err) => { console.log(err) })            
            this.props.updateCategory(temp);
            setCategories(data);
        }
        const UpdateContentAreas = async (data) => {
            //processing datas
            // console.log("content areas",data);
            const localUser = getLocalUser();
            const temp = [];
            data?.forEach((val, key) => {
                temp.push({name:val.name,count:val.count});
            })
            const req_body = {
                tenantId: localUser.tenantId,
                method: 'UPDATE',
                filter: "content_areas",
                data: temp
            }
            await axios.post(backend_url+'resources/filters', req_body).then((res) => {
                console.log(res)
            }).catch((err) => { console.log(err) })
            this.props.updateContentAreas(temp);
            setContentAreas(data);
        }
        const UpdateInternalUse = async (data) => {
            //processing datas
            // console.log("internal",data);
            const localUser = getLocalUser();
            const temp = [];
            data?.forEach((val, key) => {
                temp.push({name:val.name,count:val.count});
            })
            const req_body = {
                tenantId: localUser.tenantId,
                method: 'UPDATE',
                filter: "internal_uses",
                data: temp
            }
            await axios.post(backend_url+'resources/filters', req_body).then((res) => {
                console.log(res)
            }).catch((err) => { console.log(err) })
            this.props.updateInternalUse(temp);
            setInternalUse(data);
        }
        
        const FilterComponents = () => {
            return (
                <>
                    <Filter
                        isOpen={this.state.isOpenCategory}
                        onClose={() => { setIsOpenCategory(false) }}
                        data={this.state.categories}
                        updateData={UpdateCategories}
                        title="Categories" />
                    <Filter
                        isOpen={this.state.isOpenTag}
                        onClose={() => { setIsOpentag(false) }}
                        data={this.state.tags}
                        updateData={UpdateTags}
                        title="Tags" />
                    <Filter
                        isOpen={this.state.isOpenInternalUse}
                        onClose={() => { setIsOpenInternalUse(false) }}
                        data={this.state.internalUse}
                        updateData={UpdateInternalUse}
                        title="Internal Use Only" />
                    <Filter
                        isOpen={this.state.isOpenContentAreas}
                        onClose={() => { setIsOpenContentAreas(false) }}
                        data={this.state.contentAreas}
                        updateData={UpdateContentAreas}
                        title="Content Areas" />
                </>
            )
        }
        
        const ApplyFilter=(item, parent )=>{

            // console.log("filters",item);
            const temp=this.state.appliedFilters;
            if(parent=="external_internal"){
                if(temp.external_internal.includes(item)){
                    temp.external_internal.splice(temp.external_internal.indexOf(item),1)
                }else{
                    temp.external_internal.push(item);
                }
            } 
            if(parent=="categories"){
                if(temp.categories.includes(item)){
                    console.log("cat if",temp);
                    temp.categories.splice(temp.categories.indexOf(item),1)
                }else{
                    console.log("cat else",temp);
                    temp.categories.push(item);
                }
            }  
            if(parent=="tags"){
                if(temp.tags.includes(item)){
                    temp.tags.splice(temp.tags.indexOf(item),1)
                }else{
                    temp.tags.push(item);
                }
            }   
            if(parent=="content_areas"){
                if(temp.content_areas.includes(item)){
                    temp.content_areas.splice(temp.content_areas.indexOf(item),1)
                }else{
                    temp.content_areas.push(item);
                }
            }
            if(parent=="public_private"){
                if(temp.public_private.includes(item)){
                    temp.public_private.splice(temp.public_private.indexOf(item),1)
                }else{
                    temp.public_private.push(item);
                }
            }  
            if(parent=="internal_uses"){
                if(temp.internal_uses.includes(item)){
                    temp.internal_uses.splice(temp.internal_uses.indexOf(item),1)
                }else{
                    temp.internal_uses.push(item);
                }
            }   
            this.props.filterUpdate(temp);
        }

        return (
            <div className={styles.filters}>
                <h3 className={styles.filter_title}>Filter Area</h3>
                {/* External/Internal */}
                <Accordion style={{ boxShadow: 'none', paddingTop: '10px', paddingBottom: '10px' }} defaultExpanded>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls='panel1a-content'
                        id='panel1a-header'
                        style={{ minHeight: '0px', height: '10px', paddingTop: '10px', paddingLeft: "0" }}>
                        <p style={{ fontWeight: 400, fontSize: "12px", color: '#58575f', marginTop: "10px" }}>External/Internal &nbsp;</p>
                    </AccordionSummary>
                    <AccordionDetails style={{ paddingTop: '10px', paddingLeft: '0', paddingBottom: "0" }}>
                        <FormGroup>
                            {/* {JSON.stringify(this.state.internal_ext)} */}
                            {this.state.internal_ext?.map((item) => (
                                <Row key={item._id} className={styles.row}>
                                    <Col sm={2}><Checkbox style={{ paddingTop: "4px" }} onChange={()=>{ ApplyFilter(item.name,"external_internal") }} size="small" /></Col>
                                    <Col sm={{ offset: 1, span: 6 }} className=" pr-2"><span className={styles.title}>{item.name}</span></Col>
                                    <Col sm={2} className=" pr-2"><span className={styles.count}>({item.count})</span></Col>
                                </Row>
                            ))}
                        </FormGroup>
                    </AccordionDetails>
                </Accordion>
                {/* Public/Private */}
                <Accordion style={{ boxShadow: 'none', paddingTop: '10px', paddingBottom: '10px' }} defaultExpanded>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls='panel1a-content'
                        id='panel1a-header'
                        style={{ minHeight: '0px', height: '10px', paddingTop: '10px', paddingLeft: "0" }}>
                        <p style={{ fontWeight: 400, fontSize: "12px", color: '#58575f', marginTop: "10px" }}>Public/Private &nbsp;</p>
                    </AccordionSummary>
                    <AccordionDetails style={{ paddingTop: '10px', paddingLeft: '0', paddingBottom: "0" }}>
                        <FormGroup>
                        {/* {JSON.stringify(this.state.public_pvt)} */}
                            {this.state.public_pvt?.map((item) => (
                                <Row key={item._id} className={styles.row}>
                                    <Col sm={2}><Checkbox style={{ paddingTop: "4px" }} onChange={()=>{ ApplyFilter(item.name,"public_private") }} size="small" /></Col>
                                    <Col sm={{ offset: 1, span: 6 }} className=" pr-2"><span className={styles.title}>{item.name}</span></Col>
                                    <Col sm={2} className=" pr-2"><span className={styles.count}>({item.count})</span></Col>
                                </Row>
                            ))}
                        </FormGroup>
                    </AccordionDetails>
                </Accordion>
                {/* Categories*/}
                <Accordion style={{ boxShadow: 'none', paddingTop: '10px', paddingBottom: '10px' }} defaultExpanded>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls='panel1a-content'
                        id='panel1a-header'
                        style={{ minHeight: '0px', height: '10px', paddingTop: '10px', paddingLeft: "0" }}>
                        <p style={{ fontWeight: 400, fontSize: "12px", color: '#58575f', marginTop: "10px" }}>Categories &nbsp;<IoSettingsSharp onClick={() => setIsOpenCategory(true)} /></p>
                    </AccordionSummary>
                    <AccordionDetails style={{ paddingTop: '10px', paddingLeft: '0', paddingBottom: "0" }}>
                        <FormGroup>
                            {this.state.categories?.map((item) => (
                                <Row key={item._id} className={styles.row}>
                                    <Col sm={2}><Checkbox style={{ paddingTop: "4px" }} onChange={()=>{ ApplyFilter(item.name,"categories") }} size="small" /></Col>
                                    <Col sm={{ offset: 1, span: 6 }} className=" pr-2"><span className={styles.title}>{item.name}</span></Col>
                                    <Col sm={2} className=" pr-2"><span className={styles.count}>({item.count})</span></Col>
                                </Row>
                            ))}
                        </FormGroup>
                    </AccordionDetails>
                </Accordion>
                {/* Tags*/}
                <Accordion style={{ boxShadow: 'none', paddingTop: '10px', paddingBottom: '10px' }} defaultExpanded>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls='panel1a-content'
                        id='panel1a-header'
                        style={{ minHeight: '0px', height: '10px', paddingTop: '10px', paddingLeft: "0" }}>
                        <p style={{ fontWeight: 400, fontSize: "12px", color: '#58575f', marginTop: "10px" }}>Tags &nbsp;<IoSettingsSharp onClick={() => setIsOpentag(true)} /></p>
                    </AccordionSummary>
                    <AccordionDetails style={{ paddingTop: '10px', paddingLeft: '0', paddingBottom: "0" }}>
                        <FormGroup>
                            {this.state.tags?.map((item) => (
                                <Row key={item._id} className={styles.row}>
                                    <Col sm={2}><Checkbox style={{ paddingTop: "4px" }} onChange={()=>{ ApplyFilter(item.name,"tags") }} size="small" /></Col>
                                    <Col sm={{ offset: 1, span: 6 }} className=" pr-2"><span className={styles.title}>{item.name}</span></Col>
                                    <Col sm={2} className=" pr-2"><span className={styles.count}>({item.count})</span></Col>
                                </Row>
                            ))}
                        </FormGroup>
                    </AccordionDetails>
                </Accordion>
                {/* ContentAreas */}
                <Accordion style={{ boxShadow: 'none', paddingTop: '10px', paddingBottom: '10px', width:'100%' }} defaultExpanded>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls='panel1a-content'
                        id='panel1a-header'
                        style={{ minHeight: '0px', height: '10px', paddingTop: '10px', paddingLeft: "0" }}>
                        <p style={{ fontWeight: 400, fontSize: "12px", color: '#58575f', marginTop: "10px" }}>Content Area <IoSettingsSharp onClick={() => setIsOpenContentAreas(true)} /></p>
                    </AccordionSummary>
                    <AccordionDetails style={{ paddingTop: '10px', paddingLeft: '0', paddingBottom: "0" }}>
                        <FormGroup>
                            {this.state.contentAreas?.map((item) => (
                                <Row key={item._id} className={styles.row}>
                                    <Col sm={2}><Checkbox onChange={()=>{ ApplyFilter(item.name,"content_areas") }} style={{ paddingTop: "4px" }} size="small" /></Col>
                                    <Col sm={{ offset: 1, span: 6 }} className=" pr-2"><span className={styles.title}>{item.name}</span></Col>
                                    <Col sm={2} className=" pr-2"><span className={styles.count}>({item.count})</span></Col>
                                </Row>
                            ))}
                        </FormGroup>
                    </AccordionDetails>
                </Accordion>
                {/* Internal Use */}
                <Accordion style={{ boxShadow: 'none', paddingTop: '10px', paddingBottom: '10px' }} defaultExpanded>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls='panel1a-content'
                        id='panel1a-header'
                        style={{ minHeight: '0px', height: '10px', paddingTop: '10px', paddingLeft: "0" }}>
                        <p style={{ fontWeight: 400, fontSize: "12px", color: '#58575f', marginTop: "10px" }}>Internal Use &nbsp;<IoSettingsSharp onClick={() => setIsOpenInternalUse(true)} /></p>
                    </AccordionSummary>
                    <AccordionDetails style={{ paddingTop: '10px', paddingLeft: '0', paddingBottom: "0" }}>
                        <FormGroup>
                            {this.state.internalUse?.map((item) => (
                                <Row key={item._id} className={styles.row}>
                                    <Col sm={2}><Checkbox onChange={()=>{ ApplyFilter(item.name,"internal_uses") }} style={{ paddingTop: "4px" }} size="small" /></Col>
                                    <Col sm={{ offset: 1, span: 6 }} className=" pr-2"><span className={styles.title}>{item.name}</span></Col>
                                    <Col sm={2} className=" pr-2"><span className={styles.count}>({item.count})</span></Col>
                                </Row>
                            ))}
                        </FormGroup>
                    </AccordionDetails>
                </Accordion>


                {/* // ))} */}
                {
                    (this.state.dataLoaded) ? <FilterComponents /> : <></>
                }

            </div>

        );
    };
}
export default Filters;
