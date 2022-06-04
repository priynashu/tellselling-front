import React, { Component, useState } from 'react'
import styles from './salescontent.module.scss';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';

import TextField from '@mui/material/TextField';
import { Input } from '@mui/material';
import { getLocalUser } from '../../../utils/GetLocalUser';
import axios from 'axios';
import SectionWiseContents from './SectionWiseContents';
import ContentList from './ContentList';
import { toast } from 'react-toastify';
import TagsInput from 'react-tagsinput'
import 'react-tagsinput/react-tagsinput.css' // If using WebPack and style-loader.
import './style.css'
import { backend_url } from '../../../utils/Config';
import { Col, OverlayTrigger, Popover, Row } from 'react-bootstrap';
import Body from './Publish/Publish'
import Loading from '../../../others/Loading';
export class ContentSelector extends Component {

    constructor(props) {
        super(props);
        /**
         * These state datas could be directly handled from parent component
         * But for simplicity and to avoid component re-render issue
         * kept on the current component
         */
        this.state = {
            contents: this.props.ContentsData,
            availableCategories: [], // To be fetched from backend
            selectedCategories: [],
            selectedTags: [],
            selectedContentArea: '',
            availableTags: [],
            searchKeyword: '',
            contentArea: [],
            sections: this.props.SectionsData,
            filters: {},
            resources: []
        }
    }
    fetchFilters = async () => {
        const localUser = getLocalUser();
        const req = {
            tenantId: localUser.tenantId,
            method: 'GET'
        };
        axios.post(backend_url + 'resources/filters', req).then((res) => {
            //console.log(res.data);
            this.setState({ availableCategories: res.data.categories });
            this.setState({ availableTags: res.data.tags });
            this.setState({ contentArea: res.data.content_areas });
        }).catch((err) => {
            console.log(err)
        })
    }
    /***
 * @name fetchResources
 * @description Fetch all resource data from backend
 */
    fetchResources = async () => {
        const user = getLocalUser();
        const req = {
            tenantId: user.tenantId
        }
        await axios.post(backend_url + 'resources/salesroom_content', req).then((res) => {
            this.setState({ resources: res.data })
        }).catch((err) => {
            console.log(err);
        });
    };
    //Fetch Datas on mount
    componentDidMount() {
        this.fetchFilters();
        this.fetchResources();
    }
    //Custom function for child components to update values
    UpdateContents = (UpdatedContents) => {
        this.setState({ contents: UpdatedContents });
        console.log(UpdatedContents);
    }
    render() {
        const GenerateFilters = () => {
            const filters = {
                categories: this.state.selectedCategories,
                tags: this.state.selectedTags,
                content_area: this.state.selectedContentArea,
                search_keyword: this.state.searchKeyword
            }
            //console.log(filters);
            this.setState({ filters })
        }
        //Save salesroom data
        const SaveSalesroom = () => {
            this.props.Save(); //Pass to parent
        }
        //Stylesheet for New Section Creation Modal
        const style = {
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            border: 'none',
            boxShadow: 24,
            p: 2,
        };
        /***
         * @name NewSection
         * @param null
         * @description 
         * Creates 2 datats, 
         * 1. Insert section_names with new section name in current and parent component
         * 2. Insert a blank section with EMPTY CONTENTS in current and parent component 
         */
        const NewSection = () => {
            //Modal Controls
            const [new_section_modal, set_new_section_modal] = useState(false);
            const handleOpen = () => set_new_section_modal(true);
            const handleClose = () => set_new_section_modal(false);
            const [section_name, set_section_name] = useState('');
            const handleInput = (e) => {
                //Setting temp section name to current component
                set_section_name(e.target.value);
            }
            const submitInput = () => {
                const temp = this.state.contents;
                const temp_sections = this.state.sections;
                //Check if the section with same name already exists or not
                if (!temp_sections.includes(section_name)) {
                    const section = {
                        "section_name": section_name,
                        "contents": []
                    }
                    temp.push(section); //Temp data
                    temp_sections.push(section_name);

                    this.setState({ sections: temp_sections }); //
                    this.setState({ contents: temp }); //

                    this.props.UpdateSections(temp_sections); //Updates Temp Section Names in Parent Component
                    this.props.UpdateContents(this.state.contents); //Updates Temp Section Datas in Parent Component
                } else {
                    toast.error('Section with same name already exists', {
                        position: toast.POSITION.BOTTOM_LEFT,
                    });
                }
            }
            return (
                <>
                    <b style={{ color: '#7d7d7e', fontSize: '15px', cursor: 'pointer', marginTop: 20 }} onClick={handleOpen}>+ Create Content Section</b>
                    <Modal
                        open={new_section_modal}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        style={{ border: 'none' }}
                        aria-describedby="modal-modal-description">
                        <Box sx={style} style={{ border: 'none' }}>
                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                Add a new Section
                            </Typography>
                            <div id="modal-modal-description" sx={{ mt: 2 }}>
                                <Input type='text' onChange={handleInput} value={this.state.section_name} style={{ width: '100%', marginTop: '15', marginBottom: '10' }} placeholder='Enter Section Name' />
                                <Button style={{ marginTop: 10, marginRight: 10 }} onClick={submitInput} variant="contained">
                                    Insert
                                </Button>
                                <Button style={{ marginTop: 10, marginRight: 10 }} onClick={handleClose} variant="outlined">
                                    Dismiss
                                </Button>
                            </div>
                        </Box>
                    </Modal>
                </>
            );
        }
        /**
         * @name SelectCategories
         * @description 
         * Updates Selected Categories in this component and Update Selected Categories 
         * in the parent component, to load the fetch resources
         */
        const SelectCategory = (category) => {
            //temp selected category list
            const updatedCategories = this.state.selectedCategories;
            //check if selected category already exists
            if (updatedCategories.includes(category)) {
                //if category already exists on the selected list - remove  
                updatedCategories.splice(updatedCategories.indexOf(category), 1);
            } else {
                //if category does not exists on the selected list - add
                updatedCategories.push(category);
            }
            //update selectedCategoryList with the temp data
            this.setState({ selectedCategories: updatedCategories })
            //Update Parent Component with new data
            //this.props.UpdateSelectedCategories(updatedCategories);
            GenerateFilters();
        }
        /**
         * @name SelectTags
         * @description 
         * Updates Selected Tags in this component and Update Selected Tags 
         * in the parent component, to load the fetch resources
         */
        const SelectTags = (tag) => {
            const temp = this.state.selectedTags;
            if (temp.includes(tag)) {
                temp.splice(temp.indexOf(tag), 1);
            } else {
                temp.push(tag)
            }
            this.setState({ selectedTags: temp });
            GenerateFilters();
        }
        const setSelectedTag = (selectedTags) => {
            this.setState({ selectedTags });
            GenerateFilters();
        }
        const setSelectedContentArea = (e) => {
            this.setState({ selectedContentArea: e.target.value });
            console.log(e.target.value);
            GenerateFilters();
        }
        const setSearchKeyword = (e) => {
            this.setState({ searchKeyword: e.target.value });
        }



        return (
            <div className={styles.main} style={{ marginBottom: 150 }}>
                
                <div className={styles.header}>
                    <h3 className={styles.title}>Sales Content</h3>
                    <div className={styles.header_buttons}>
                        <Button onClick={() => { this.props.UpdateScreen("INFO") }} variant='outlined'>Info</Button>
                        <Button onClick={() => { (this.state.sections.length != 0) ? this.props.UpdateScreen("PREVIEW") : toast.error('Your section list is empty!', { position: toast.POSITION.BOTTOM_LEFT, }); }} variant='outlined'>Preview</Button>
                        <Button onClick={() => { SaveSalesroom(); }} variant='outlined'>Save</Button>
                        <Body/>
                    </div>
                </div>
                <div className={styles.filter_div}>
                    <p className={styles.filter_by}>Filter by</p>
                    {this.state.availableCategories?.map((topic, key) => {
                        return (
                            <p key={key} onClick={() => { SelectCategory(topic.name); }}
                                className={(this.state.selectedCategories.includes(topic.name) ? styles.filter_select : styles.filter_category)}
                                key={topic.name}>
                                + {topic.name}
                            </p>
                        );
                    })}
                </div>
                <div className={styles.input_fields}>
                    <div className={styles.content_area_tags}>
                        <Row style={{ width: '100%' }}>
                            <Col sm={5}>
                                <TextField
                                    select
                                    size='small'
                                    style={{ width: '100%' }}
                                    className={styles.content_area}
                                    label='Select Content Area'
                                    onChange={setSelectedContentArea}
                                    value={this.state.selectedContentArea} >
                                    {this.state.contentArea.map((option, key) => (
                                        <MenuItem key={key} value={option.name}>
                                            {option.name}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Col>
                            <Col sm={7}>
                                <div className={styles.tags_search_div}>
                                    <TagsInput value={this.state.selectedTags} onChangeInput={setSelectedTag} onChange={setSelectedTag} name='tags' addKeys={[9, 13, 32, 188]} />
                                    <div className={styles.all_tags}>
                                        {this.state.availableTags?.map((tag) => (
                                            <p className={styles.tag} style={(this.state.selectedTags.includes(tag.name) ? { backgroundColor: '#9f85ef', color: '#ffffff' } : {})} onClick={() => { SelectTags(tag.name) }} key={tag}>
                                                {tag.name}
                                            </p>
                                        ))}
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </div>
                {
                    (this.state.selectedCategories.length != 0 || this.state.selectedTags.length != 0) ? <ContentList resources={this.state.resources} sections={this.state.sections} Filters={this.state.filters} UpdateContents={this.UpdateContents} contents={this.state.contents} /> : <></>
                }
                <SectionWiseContents contents={this.state.contents} style={{ marginBottom: 30 }} />
                {
                    (this.state.resources.length!=0)?<></>:<Loading/>
                }
                <NewSection />
            </div>
        )
    }
}

export default ContentSelector;
