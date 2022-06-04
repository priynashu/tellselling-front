import React, { Component, useState } from 'react'
import { Row, Col, Card, ListGroup } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Checkbox } from '@mui/material';
import { getLocalUser } from '../../../utils/GetLocalUser';
import axios from 'axios';
import Button from '@mui/material/Button';
import { BiAddToQueue } from "react-icons/bi";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import { FiTarget } from "react-icons/fi";
import { toast } from 'react-toastify';
import ReactPaginate from 'react-paginate';
import TextField from '@mui/material/TextField';
import '../../../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './style.css'
import { backend_url } from '../../../utils/Config';
export class ContentList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            resources: this.props.resources,
            filters: [],
            contents: this.props.contents,
            selectedResources: [],
            sections: this.props.sections,
            section_select_modal: false,
            filters: this.props.Filters,
        }
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
    componentDidMount() {
        //this.fetchResources();
    }
    render() {
        //Filtering Resources
        console.log(this.state.filters);
        const filtered = [];
        const category_wise_contents = [];
        const tag_wise_contents = [];
        const setSearchKeyword=(e)=>{
            console.log(e.target.value);
        }
        this.state.resources.map((val, key) => {
            //make sure no resource duplicay
            //console.log(val);
            //make sure no resource duplicay
            if (!filtered.includes(val)) {
                //match filters
                const categories = []
                val.categories.filter((item) => {
                    categories.push(item.value);
                })
                const tags = [];
                val.tags.filter((item) => {
                    tags.push(item.value);
                })
                if (this.state.filters.tags.length != 0) {
                    tags.some(element => {
                        if (this.state.filters.tags.includes(element)) {
                            tag_wise_contents.push(val);
                        }
                    });
                }
                if (this.state.filters.categories.length != 0) {
                    categories.some(element => {
                        if (this.state.filters.categories.includes(element)) {
                            category_wise_contents.push(val);
                        }
                    });
                }
            }
            //if both filters are applied
            if (this.state.filters.tags.length != 0 && this.state.filters.categories.length != 0) {
                const filtered_temp = category_wise_contents.filter(value => tag_wise_contents.includes(value));
                filtered_temp.forEach((val, key) => {
                    if (!filtered.includes(val)) {
                        filtered.push(val);
                    }
                })
            } else {
                //if any of the two filter is empty
                //if category filter is empty push all tag contents
                if (this.state.filters.categories.length == 0) {
                    tag_wise_contents.forEach((val, key) => {
                        if (!filtered.includes(val)) {
                            filtered.push(val);
                        }
                    })
                }
                //if tag filter is empty push all category contents
                if (this.state.filters.tags.length == 0) {
                    category_wise_contents.forEach((val, key) => {
                        if (!filtered.includes(val)) {
                            filtered.push(val);
                        }
                    })
                }
            }
        })
        /**
         * @name selectResources
         */
        const SelectResource = (resource) => {
            const selected_resources = this.state.selectedResources;
            if (selected_resources.includes(resource)) {
                selected_resources.splice(selected_resources.indexOf(resource), 1)
            } else {
                selected_resources.push(resource);
            }
            this.setState({ selected_resources: selected_resources });
        }
        /**
         * @name ContentInsert
         */
        const ContentInsert = (section) => {
            const temp = this.state.contents;
            //search for selected section
            temp.forEach((data, key) => {
                if (data.section_name == section) {
                    this.state.selectedResources.forEach((val, k) => {
                        data.contents.push(val);
                    })
                }
            })
            this.setState({ selectedResources: [] })
            this.props.UpdateContents(temp);
            toast.success('Content added to ' + section, {
                position: toast.POSITION.BOTTOM_LEFT,
            });
        }
        /***
         * @name AddToSection
         */
        const AddToSection = () => {
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
            const handleOpen = () => this.setState({ section_select_modal: true });
            const handleClose = () => this.setState({ section_select_modal: false });
            return (
                <>
                    <Button onClick={handleOpen} style={{ float: 'right' }}><BiAddToQueue style={{ marginRight: 5 }} /> Add to Section</Button>
                    <Modal
                        open={this.state.section_select_modal}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        style={{ border: 'none' }}
                        aria-describedby="modal-modal-description">
                        <Box sx={style} style={{ border: 'none' }}>
                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                Add to section
                            </Typography>
                            <div id="modal-modal-description" sx={{ mt: 2 }}>
                                <ListGroup style={{ marginTop: 5 }}>
                                    {
                                        (this.props.sections.length == 0) ? <small>No section</small> :
                                            this.props.sections.map((section, j) => {
                                                return (
                                                    <ListGroup.Item key={j + "_"} action onClick={() => { ContentInsert(section); handleClose(); }}>
                                                        <FiTarget style={{ marginRight: 8 }} />{section}
                                                    </ListGroup.Item>
                                                );
                                            })
                                    }
                                </ListGroup>
                            </div>
                        </Box>
                    </Modal>
                </>
            );
        }

        const Resources = () => {
            const content_per_page = 9;
            const no_of_page = filtered.length / content_per_page;
            const [pageContents, setPageContents] = useState(filtered.slice(0, content_per_page));
            const handlePageChange = (data) => {
                const temp = [];
                filtered.slice(data.selected, data.selected + content_per_page).map((obj) => {
                    temp.push(obj);
                })
                setPageContents(temp);
                console.log("handle contentList", pageContents);
            }
            return (
                <>
                    <Row style={{ width: '100%' }}>
                        <Col sm={12}>
                            <TextField
                                variant='outlined'
                                fullWidth
                                size='small'
                                label='Search'
                                style={{ width: '100%', marginTop: '10px', backgroundColor:'#ffffff' }}
                                onKeyUp={setSearchKeyword}
                                placeholder='Search by content name, description, subcategory or owner' />
                        </Col>
                    </Row>
                    <Row style={{ marginTop: 10, marginBottom: 10, width: '100%' }}>
                        {pageContents.filter((data) => {
                            if (this.props.Filters.search_keyword.length > 1) {
                                if (data.resourceTitle.toLowerCase().match(this.props.Filters.search_keyword.toLowerCase())) {
                                    return data;
                                }
                            } else {
                                return data;
                            }
                        }).map((data, key) => {
                            const create_date = new Date(data.createdAt);
                            return (
                                <Col key={key + "_data"} sm={4}>
                                    <Card onClick={() => { SelectResource(data) }} style={{ marginBottom: 10, cursor: 'pointer', width: '100%' }}>
                                        <Card.Body style={{ padding: 5, height: '100px', width: '100%', backgroundPosition: 'center', backgroundSize: 'cover', backgroundImage: `url(${data.thumbnail})`, cursor: 'pointer' }} variant="top" >
                                            <Checkbox style={{ backgroundColor: '#eee', padding: 5 }} onClick={() => { SelectResource(data) }} checked={(this.state.selectedResources.includes(data)) ? true : false} />
                                        </Card.Body>
                                        <Card.Body style={{ padding: '0.5rem 0.5rem' }}>
                                            <b style={{ fontSize: 12, overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', lineClamp: 2, boxOrient: 'vertical' }} className={'single_line'}>
                                                {data.resourceTitle}
                                            </b>
                                            <div>
                                                <small style={{ fontSize: 10, display: 'block', color: '#9d9b9b' }} className={'single_line'}>Created at {create_date.getDay() + "-" + (create_date.getMonth() + 1) + "-" + create_date.getFullYear()}</small>
                                                <small style={{ fontSize: 10, display: 'block', color: '#9d9b9b' }} className={'single_line'}>Created by {data.createdBy} </small>
                                            </div>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            )
                        })}
                    </Row>
                    <ReactPaginate
                        onPageChange={handlePageChange}
                        previousLabel={'Previous'}
                        nextLabel={'Next'}
                        pageCount={no_of_page}
                        containerClassName='pagination justify-content-center'
                        pageClassName='page-item'
                        pageLinkClassName='page-link'
                        previousClassName='page-item'
                        previousLinkClassName='page-link'
                        nextClassName='page-item'
                        nextLinkClassName='page-link'
                        breakLinkClassName='page-link'
                        activeClassName='active'
                    />
                </>
            )
        }
        return (
            <div style={{ width: '100%', backgroundColor: "#f1f0f0", marginTop: '10px', borderRadius: '5px', padding: '15px' }}>
                <div style={{ width: '100%', marginBottom: 20, marginTop: '10px' }}>
                    <b>Filter Results</b>
                    <AddToSection />
                </div>
                <Resources />

            </div >
        )
    }
}

export default ContentList


