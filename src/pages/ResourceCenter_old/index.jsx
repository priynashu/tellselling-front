import { useState, useEffect } from 'react';
import axios from 'axios';
import { FormControl } from 'react-bootstrap'
import { UploadContentDrawer } from './UploadContentDrawer';
import { EditContentDrawer } from './EditContentDrawer';
import styles from './resource.module.scss';
import DisplayCard from "./DisplayCard"
import { Row, Col, Button, InputGroup, Container, Card } from 'react-bootstrap'
import { getLocalUser } from '../../utils/GetLocalUser';
import { backend_url } from '../../utils/Config';
import { AiOutlineSearch } from "react-icons/ai"
import { Link } from 'react-router-dom';
import Filters from './Filters';
import { Component } from 'react';
import ReactPaginate from 'react-paginate';
import Loading from '../../others/Loading';
import Header from '../../components/Header';
import Empty from '../../components/Empty';
class ResourceCenter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            resourceData: [],
            status: 'INIT',
            searchText: '',
            datas: [],
            categories: [],
            tags: [],
            contentAreas: [],
            internalUse: [],
            public_pvt: [{ name: 'Public', count: 0 }, { name: 'Private', count: 0 }],
            internal_ext: [{ name: 'Internal', count: 0 }, { name: 'External', count: 0 }],
            forms: [],
            filterData: [],
            filteredResources: [],
            searchedData: [],
            isDrawerOpen: false,
            isEditDrawerOpen: false,
            selectedData: {},
            page: []
        }
    }
    GetAllForms = async () => {
        //fetch all form data from server
        const localUser = getLocalUser();
        const url = backend_url + 'forms/' + localUser.tenantId;
        await axios.get(url)
            .then((res) => {
                const forms = res.data;
                const temp = [];
                //picking just title/names
                forms?.map((val, key) => {
                    temp.push(val.formTitle);
                })
                this.setState({ forms: temp })
            }).catch((err) => {
                console.log(err);
            })
    }

    fetchData = async () => {
        const user = getLocalUser();
        await axios.get(backend_url + 'resources/' + user.tenantId)
            .then((res) => {
                //console.log(res.data);
                if (res.data.length == 0) {
                    this.setState({ status: 'NULL' })
                } else {
                    this.setState({ status: 'LOADED' })
                }
                this.setState({ datas: res.data });
                this.setState({ filteredResources: res.data });
                this.setState({ searchedData: res.data });
            }).catch((err) => {
                console.log(err);
            });
    };
    componentDidMount() {
        this.fetchData();
        this.GetAllForms();
    }
    render() {
        const user = getLocalUser();
        const setIsDrawerOpen = (isDrawerOpen) => {
            this.setState({ isDrawerOpen })
        }
        const setIsEditDrawerOpen = (isEditDrawerOpen) => {
            this.setState({ isEditDrawerOpen })
        }
        const Intersection = (arr1, arr2, arr3, arr4, arr5, arr6) => {
            const setA = new Set(arr1);
            const setB = new Set(arr2);
            const setC = new Set(arr3);
            const setD = new Set(arr4);
            const setE = new Set(arr5);
            const setF = new Set(arr6);
            let intersectionResult = [];
            for (let i of setB) {
                if (setA.has(i) && setC.has(i) && setD.has(i) && setE.has(i) && setF.has(i)) {
                    intersectionResult.push(i);
                }
            }
            return intersectionResult;
        }
        const setFilterData = (filterData) => {
            const selected_ext = [];
            this.state.datas?.map((item, key) => {
                //iteration through all external_internal
                item.external_internal?.map((val, i) => {
                    if (filterData.external_internal.length != 0) {
                        filterData.external_internal?.map((cat, j) => {
                            // console.log("inside ext",val);
                            if (val == cat) {
                                if (!selected_ext.includes(item)) {
                                    selected_ext.push(item);
                                }
                            }
                        })
                    } else {
                        if (!selected_ext.includes(item)) {
                            selected_ext.push(item);
                        }
                    }
                })
            })
            // filter private_public
            const selected_pvt = [];
            this.state.datas?.map((item, key) => {
                //iteration through all private_public
                item.private_public?.map((val, i) => {
                    if (filterData.public_private.length != 0) {
                        filterData.public_private?.map((cat, j) => {
                            // console.log("inside ext",val);
                            if (val == cat) {
                                if (!selected_pvt.includes(item)) {
                                    selected_pvt.push(item);
                                }
                            }
                        })
                    } else {
                        if (!selected_pvt.includes(item)) {
                            selected_pvt.push(item);
                        }
                    }
                })
            })
            // console.log("selected pvt",selected_pvt);
            const selected_categories = [];
            this.state.datas?.map((item, key) => {
                //iteration through all categories
                item.categories?.map((val, i) => {
                    if (filterData.categories.length != 0) {
                        filterData.categories?.map((cat, j) => {
                            if (val.value == cat) {
                                if (!selected_categories.includes(item)) {
                                    selected_categories.push(item);
                                }
                            }
                        })
                    } else {
                        if (!selected_categories.includes(item)) {
                            selected_categories.push(item);
                        }
                    }
                })
            })
            // console.log("selected cats",selected_categories);

            //filter out tags
            const selected_tags = [];
            this.state.datas?.map((item, key) => {
                //iteration through all categories
                item.tags?.map((val, i) => {
                    if (filterData.tags.length != 0) {
                        filterData.tags?.map((cat, j) => {
                            if (val.value == cat) {
                                if (!selected_tags.includes(item)) {
                                    selected_tags.push(item);
                                }
                            }
                        })
                    } else {
                        if (!selected_tags.includes(item)) {
                            selected_tags.push(item);
                        }
                    }
                })
            })

            //filter out content areas
            const selected_areas = [];
            this.state.datas?.map((item, key) => {
                //iteration through all categories
                item.content_areas?.map((val, i) => {
                    if (filterData.content_areas.length != 0) {
                        filterData.content_areas?.map((cat, j) => {
                            if (val.value == cat) {
                                console.log();
                                if (!selected_areas.includes(item)) {
                                    selected_areas.push(item);
                                }
                            }
                        })
                    } else {
                        if (!selected_areas.includes(item)) {
                            selected_areas.push(item);
                        }
                    }
                })
            })

            //filter out internal use only
            const selected_iuses = [];
            this.state.datas?.map((item, key) => {
                //iteration through all categories
                item.internal_use?.map((val, i) => {
                    if (filterData.internal_uses.length != 0) {
                        filterData.internal_uses?.map((cat, j) => {
                            if (val.value == cat) {

                                if (!selected_iuses.includes(item)) {

                                    selected_iuses.push(item);
                                }
                            }
                        })
                    } else {
                        if (!selected_iuses.includes(item)) {
                            selected_iuses.push(item);
                        }
                    }
                })
            })
            const layer1 = Intersection(selected_categories, selected_tags, selected_areas, selected_iuses, selected_ext, selected_pvt);

            const temp = layer1;

            this.setState({ filteredResources: temp });
            this.setState({ searchedData: temp });
        }
        const setSearchText = (searchText) => {
            this.setState({ searchText })
        }
        const setCategories = (categories) => {
            this.setState({ categories })
        }
        const setTags = (tags) => {
            this.setState({ tags })
        }
        const setContentAreas = (contentAreas) => {
            this.setState({ contentAreas })
        }
        const setInternalUse = (internalUse) => {
            this.setState({ internalUse })
        }
        const setPublic_Pvt = (public_pvt) => {
            this.setState({ public_pvt })
        }
        const setInternal_Ext = (internal_ext) => {
            this.setState({ internal_ext })
        }

        const UpdateCategories = (data) => {
            const cats = [];
            data?.map((val, key) => {
                const obj = {
                    name: val,
                    key
                }
                cats.push(obj)
            })
            setCategories(data);
        }
        const UpdateTags = (data) => {
            setTags(data);
        }
        const UpdateContentAreas = (data) => {
            const temp = [];
            data?.map((val, key) => {
                const obj = {
                    name: val,
                    count: 0
                }
                temp.push(obj)
            })
            setContentAreas(data);
        }
        const UpdateSetInternalUse = (data) => {
            const temp = [];
            data?.map((val, key) => {
                const obj = {
                    name: val,
                    count: 0
                }
                temp.push(obj)
            })
            setInternalUse(data);
        }
        const UpdatePublic_Pvt = (data) => {
            const temp = [];
            data?.map((val, key) => {
                const obj = {
                    name: val,
                    count: 0
                }
                temp.push(obj)
            })
            setPublic_Pvt(data);
        }
        const UpdateInternal_Ext = (data) => {
            setInternal_Ext(data);
        }

        const getResourceData = (data) => {
            this.setState({ selectedData: data })
        }
        const searched = (keyword) => (c) => {
            return c.resourceTitle.toLowerCase().includes(keyword.toString().toLowerCase());
        };
        const handleChange = (text) => {
            setSearchText(text);
            let searchedText = text;
            const searchedResources = [];
            this.state.searchedData.filter(searched(searchedText))?.map((item) => {
                searchedResources.push(item)
            })
            this.setState({ filteredResources: searchedResources })
        };

        const Resources = () => {
            const content_per_page = 12;
            const no_of_page = this.state.filteredResources.length / content_per_page;
            const [pageContents, setPageContents] = useState(this.state.filteredResources.slice(0, content_per_page))
            const handlePageChange = (data) => {
                const temp = [];
                this.state.filteredResources.slice(data.selected * content_per_page, (data.selected + 1) * content_per_page).map((obj) => {
                    temp.push(obj);
                })
                // pageContents=temp;
                setPageContents(temp)
            }
            return (
                <>
                    <Row style={{ marginTop: 10, marginBottom: 10, width: '100%' }}>

                        {pageContents.map((item, i) => {
                            return (
                                <Col key={i + "_data"} sm={3}>
                                    <DisplayCard
                                        allCategories={this.state.categories}
                                        allTags={this.state.tags}
                                        allContentAreas={this.state.contentAreas}
                                        allInternalUses={this.state.internalUse}
                                        allPublic_Pvt={this.state.public_pvt}
                                        allInternal_Ext={this.state.internal_ext}
                                        title={item.resourceTitle}
                                        fetchData={this.fetchData}
                                        getResourceData={getResourceData}
                                        displayData={item}
                                        isOpen={setIsEditDrawerOpen}
                                        url={item.thumbnail} data={item}
                                        updateTags={UpdateTags}
                                        updateCategories={UpdateCategories}
                                        updateInternalUses={UpdateSetInternalUse}
                                        updateContentAreas={UpdateContentAreas}
                                        updatePublic_Pvt={UpdatePublic_Pvt}
                                        updateInternal_Ext={UpdateInternal_Ext} />
                                </Col>
                            )
                        })

                        }
                        {
                            (pageContents.length == 0 && this.state.status!='INIT') ? <Empty/> : <></>
                        }


                    </Row>
                    <ReactPaginate
                        onPageChange={handlePageChange}
                        previousLabel={'Previous'}
                        nextLabel={'Next'}
                        pageCount={no_of_page}
                        style={{ marginTop: '50px' }}
                        containerClassName='pagination justify-content-center'
                        pageClassName='page-item'
                        pageLinkClassName='page-link'
                        previousClassName='page-item'
                        previousLinkClassName='page-link'
                        nextClassName='page-item'
                        nextLinkClassName='page-link'
                        breakLinkClassName='page-link'
                        activeClassName='active' />
                </>
            )
        }

        return (
            <div className={styles.resource}>
                <Header title={'Resource Center'} links={['Resource Center']} />
                <div className={styles.wrapper}>
                    <Filters
                        updateCategory={UpdateCategories}
                        updateTags={UpdateTags}
                        updateContentAreas={UpdateContentAreas}
                        updateInternalUse={UpdateSetInternalUse}
                        updatePublic_Pvt={UpdatePublic_Pvt}
                        updateInternal_Ext={UpdateInternal_Ext}
                        filterUpdate={setFilterData} />
                    <div className={styles.content}>
                        <div>
                            <Row>
                                <Col md={6}>
                                    <InputGroup className="mb-3">
                                        <FormControl
                                            placeholder='Search by content name, description or owner'
                                            size='small'
                                            style={{
                                                background: 'white'
                                            }}
                                            value={this.state.searchText}
                                            onChange={(e) => { return handleChange(e.target.value) }}
                                            aria-label="Search"
                                            aria-describedby="basic-addon2" />
                                        <InputGroup.Text><AiOutlineSearch /></InputGroup.Text>
                                    </InputGroup>
                                </Col>
                                <Col
                                    md={{
                                        span: 5,
                                        offset: 1
                                    }}>
                                    <Button
                                        className={styles.uploadBtn}
                                        onClick={(e) => setIsDrawerOpen(true)}
                                        variant="outline-primary">UPLOAD CONTENT</Button>&nbsp;&nbsp;
                                    <Button
                                        className={styles.uploadBtn}
                                        component={Link}
                                        to="/select-room-type"
                                        variant="outline-primary">CREATE DEAL ROOM</Button>
                                </Col>
                            </Row>
                        </div>
                        {
                            (this.state.status == 'INIT') ? <Loading /> : <></>
                        }
                        <Resources />
                    </div>
                </div>
                <EditContentDrawer
                    isOpen={this.state.isEditDrawerOpen}
                    onClose={() => setIsEditDrawerOpen(false)}
                    onSuccess={() => this.fetchData()}
                    filterData={this.state.filterData}
                    setFilterData={setFilterData}
                    allForms={this.state.forms}
                    allCategories={this.state.categories}
                    allTags={this.state.tags}
                    allContentAreas={this.state.contentAreas}
                    allInternalUses={this.state.internalUse}
                    allPublic_Pvt={this.state.public_pvt}
                    allInternal_Ext={this.state.internal_ext}
                    data={this.state.selectedData}
                    updateTags={UpdateTags}
                    updateCategories={UpdateCategories}
                    updateInternalUses={UpdateSetInternalUse}
                    updateContentAreas={UpdateContentAreas}
                    updatePublic_Pvt={UpdatePublic_Pvt}
                    updateInternal_Ext={UpdateInternal_Ext} />
                <UploadContentDrawer
                    isOpen={this.state.isDrawerOpen}
                    onClose={() => setIsDrawerOpen(false)}
                    onSuccess={() => this.fetchData()}
                    filterData={this.state.filterData}
                    setFilterData={setFilterData}
                    allForms={this.state.forms}
                    allCategories={this.state.categories}
                    allTags={this.state.tags}
                    allContentAreas={this.state.contentAreas}
                    allInternalUses={this.state.internalUse}
                    allPublic_Pvt={this.state.public_pvt}
                    allInternal_Ext={this.state.internal_ext}
                    updateTags={UpdateTags}
                    updateCategories={UpdateCategories}
                    updateInternalUses={UpdateSetInternalUse}
                    updateContentAreas={UpdateContentAreas}
                    updatePublic_Pvt={UpdatePublic_Pvt}
                    updateInternal_Ext={UpdateInternal_Ext} />
            </div>
        );
    };
}
export { ResourceCenter };
