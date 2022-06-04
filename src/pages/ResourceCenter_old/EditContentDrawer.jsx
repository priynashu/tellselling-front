import { useState, Fragment,useEffect } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import { MultiSelect } from "react-multi-select-component";
import CloseIcon from '@mui/icons-material/Close';
import CircularProgress from '@mui/material/CircularProgress';
import ReactTagInput from '@pathofdev/react-tag-input';
import '@pathofdev/react-tag-input/build/index.css';
import { toast } from 'react-toastify';
import Form from "react-bootstrap/Form"
import { UploadFileButton } from './UploadFileButton';
import styles from './drawerstyles.module.scss';
import { getLocalUser } from '../../utils/GetLocalUser';
import { backend_url } from '../../utils/Config';


export const EditContentDrawer = ({ isOpen, onClose, onSuccess, filterData, allCategories, allTags, allContentAreas, allInternalUses, allForms,data,allPublic_Pvt,allInternal_Ext,updateTags,updateCategories,updateInternalUses,updateContentAreas,updatePublic_Pvt,updateInternal_Ext }) => {

    // console.log("edit",allCategories);
    const [formData, setFormData] = useState({ title: '', category: [], tags: [], description: '', contentAreas: [], internalUse: [], form: '', external_internal: '' });
    const [file, setFile] = useState(data.fileCdnLink);
    const [thumb, setThumb] = useState(data.thumbnail);
    const [isLoading, setIsloading] = useState(false);
    const [resourceData,setResourceData] = useState([]);
    const [selectedForm, setSelectedForm] = useState('');
    const [externalInternal, setExternalInternal] = useState("");
    const [public_pvt, setPublic_Pvt] = useState("");
    const [selectedCategory, setSelectedCategory] = useState([]);
    const [selectedArea, setSelectedArea] = useState([]);
    const [selectedInternalUse, setSelectedInternalUse] = useState([]);
    const [selectedTag, setSelectedTag] = useState([]);
    const [title,setTitle] = useState("")
    const [resourceId,setResourceId] = useState("");
    const [description,setDescription] = useState("");
    // const [filters,setFilters] = useState();
    // console.log("all cats",allCategories);
    const filters=[data.categories,data.tags,data.content_areas,data.internal_use];
    console.log("data edit is",data);
    
    const handleChange = (e) => {
        // console.log(e.target.value,e.target.name);
        // setFormData({ ...formData, [e.target.name]: e.target.value });
        setTitle(e.target.value)
    };
    const handleDescChange = (e)=>{

        setDescription(e.target.value)
    }
    // console.log("name to update",name);
    useEffect(()=>{
      updateData();
    },[isOpen]);
    
    
    const updateData =()=>{
      isOpen==true?setResourceData(data):console.log("nothing");
    //   console.log('data to update',data);
      setSelectedCategory(data.categories)
      setSelectedArea(data.content_areas)
      setSelectedTag(data.tags)
      setSelectedInternalUse(data.internal_use)
      setTitle(data.resourceTitle)
      setPublic_Pvt(data.private_public)
      setExternalInternal(data.external_internal)
      setDescription(data.description);
    //   setFilters()
    //   console.log("all filters are",filters);
      setResourceId(data._id);
    }
    const handleFileUpload = (e) => {
        // console.log(e.target.files[0]);
        const selectedFile = e.target.files[0];
        cloudinaryUpload(selectedFile, "file")
    };

    const handleThumbUpload = (e) => {
        const selectedThumb = e.target.files[0];
        cloudinaryUpload(selectedThumb, "thumb")
    };

    
    const cloudinaryUpload = (item, name) => {
        // console.log("File is",fil);
        const formData = new FormData();
        formData.append("file", item);
        formData.append("upload_preset", "ce0qpcmg");

        axios.post("https://api.cloudinary.com/v1_1/tellselling/image/upload", formData).then((res) => {
            const url = res.data.secure_url;
            // console.log(url);
            if (name === "file") {
                setFile(res.data.secure_url)
            }
            else if (name === "thumb") {
                setThumb(res.data.secure_url)
            }
        }).catch((err) => {
            console.log(err.message);
        });

    }
    const decreaseFilterCount =(filters)=>{
        // console.log("filters are",filters);
        allTags?.map((item,i)=>{
            filters[1]?.map((index)=>{
                if(item.name==index.label){
                    allTags[i].count -= 1;
                    
                }

            })
        })
        console.log("decrease",allTags);
        allCategories?.map((item,i)=>{
            filters[0]?.map((index)=>{
                if(item.name==index.label){
                    allCategories[i].count -= 1;
                    // console.log(allCategories[i].name," ",allCategories[i].count);
                    // console.log("tags name",item.name);
                }

            })
        })
        allContentAreas?.map((item,i)=>{
            filters[2]?.map((index)=>{
                if(item.name==index.label){
                    allContentAreas[i].count -= 1;
                    // console.log(allContentAreas[i].name," ",allContentAreas[i].count);
                    // console.log("tags name",item.name);
                }

            })
        })
        allInternalUses?.map((item,i)=>{
            filters[3]?.map((index)=>{
                if(item.name==index.label){
                    allInternalUses[i].count -= 1;
                    console.log(allInternalUses[i].name," ",allInternalUses[i].count);
                    // console.log("tags name",item.name);
                }

            })
        })
        
    }
    const increaseFilterCount =(categories,tags,internalUses,contentAreas)=>{

        console.log("increase tags",tags);
        allTags?.map((item,i)=>{
            tags?.map((index)=>{
                if(item.name==index.label){
                    allTags[i].count += 1;
                    
                }

            })
        })
        
        allCategories?.map((item,i)=>{
            categories?.map((index)=>{
                if(item.name==index.label){
                    allCategories[i].count += 1;
                    // console.log(allCategories[i].name," ",allCategories[i].count);
                    // console.log("tags name",item.name);
                }

            })
        })
        allContentAreas?.map((item,i)=>{
            contentAreas?.map((index)=>{
                if(item.name==index.label){
                    allContentAreas[i].count += 1;
                    // console.log(allContentAreas[i].name," ",allContentAreas[i].count);
                    // console.log("tags name",item.name);
                }

            })
        })
        allInternalUses?.map((item,i)=>{
            internalUses?.map((index)=>{
                if(item.name==index.label){
                    allInternalUses[i].count += 1;
                    console.log(allInternalUses[i].name," ",allInternalUses[i].count);
                    // console.log("tags name",item.name);
                }

            })
        })
        
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
        await axios.post(backend_url+'resources/filters', req_body).then((res) => {
            // console.log(res)
        }).catch((err) => { console.log(err) })
        updateTags(temp);
        
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
        await axios.post(backend_url+'resources/filters', req_body).then((res) => {
            // console.log(res)
        }).catch((err) => { console.log(err) })
        updateCategories(temp);
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
        await axios.post(backend_url+'resources/filters', req_body).then((res) => {
            // console.log(res)
        }).catch((err) => { console.log(err) })
        updateContentAreas(temp);
        
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
        await axios.post(backend_url+'resources/filters', req_body).then((res) => {
            // console.log(res)
        }).catch((err) => { console.log(err) })
        updateInternalUses(temp);
    }
    const TestSubmit = (e) => {

        e.preventDefault();
        const currentUser = getLocalUser();
        const data = {
            title: title,
            categories: selectedCategory,
            description: description,
            tags: selectedTag,
            internal_uses: selectedInternalUse,
            content_areas: selectedArea,
            form: selectedForm,
            creator: currentUser.firstName + " " + currentUser.lastName,
            tenantId: currentUser.tenantId,
            external_internal: externalInternal,
            public_pvt:public_pvt,
            file:file,
            thumb:thumb,
            _id:resourceId
        }
        console.log("updated data is",data,"filters are",filters);
        decreaseFilterCount(filters);
        // console.log(allCategories,allTags,allContentAreas,allInternalUses);
        //upload thumbnail to cloudinary
        // const rq = new FormData();
        // rq.append("file", thumb);
        // rq.append("upload_preset", "ce0qpcmg");
        // //upload thumbnail
        // axios.post("https://api.cloudinary.com/v1_1/tellselling/image/upload", rq).then((res) => {
        //     const url = res.data.url;
        //     data.thumbnail = url;
        //     const fl = new FormData();
        //     fl.append("file", file);
        //     fl.append("upload_preset", "ce0qpcmg");
        //     //upload file
        //     axios.post("https://api.cloudinary.com/v1_1/tellselling/image/upload", fl).then((res) => {
        //         const url = res.data.url;
        //         data.file = url;
        //         //push db
        // console.log("id is",data._id);
                axios.post(backend_url+'resources/update/'+data._id, data)
                .then((res) => {
                    // let resData=res.data;
                    // console.log(data);
                    
                    increaseFilterCount(data.categories,data.tags,data.internal_uses,data.content_areas)
                    UpdateInternalUse(allInternalUses)
                    UpdateContentAreas(allContentAreas)
                    UpdateCategories(allCategories)
                    UpdateTags(allTags)
                    toast.success('Content updated successfully !', { position: toast.POSITION.BOTTOM_LEFT });
                    setIsloading(false);
                    onSuccess();
                }).catch((err) => {
                    console.log(err);
                    toast.error('Failed to update content !', { position: toast.POSITION.BOTTOM_LEFT });
                    setIsloading(false);
                });
        //     });
        // });
        setFile(file);
        setThumb(thumb);
        onClose();
    }

    const handleReset = (e) => {
        setFormData({ title: '', category: 'External', tags: [] });
        setFile('');
        setThumb('');
    };
    const Categories = []
    allCategories?.map((val, key) => {
        const temp = {
            label: val.name,
            value: val.name
        }
        Categories.push(temp);
    });
    const tags = [];
    allTags?.map((val, key) => {
        const temp = {
            label: val.name,
            value: val.name
        }
        tags.push(temp);
    })

    const areas = [];
    allContentAreas?.map((val, key) => {
        const temp = {
            label: val.name,
            value: val.name
        }
        areas.push(temp);
    })

    const internal_uses = [];
    allInternalUses?.map((val, key) => {
        const temp = {
            label: val.name,
            value: val.name
        }
        internal_uses.push(temp);
    });

    

    const handleExt = (e) => {
        externalInternal[0]=e.target.value;
        setExternalInternal(externalInternal);
        console.log("handle ext",externalInternal);
    }
    const handlePublic_Pvt = (e)=>{
        public_pvt[0]=e.target.value;
        setPublic_Pvt(public_pvt)
        console.log("handle pub",public_pvt);
    }
    const handleForm = (e) => {
        setSelectedForm(e.target.value);
        console.log(e.target.value);

    }
    return (
        <Fragment>
            <Drawer anchor='right' open={isOpen} onClose={onClose}>
                <Box className={styles.drawer_wrapper}>
                    <div className={styles.header}>
                        <p className={styles.title}>Edit Resources</p>
                        <span className={styles.close_icon} onClick={onClose}>
                            <CloseIcon />
                        </span>
                    </div>
                    <Box
                        component='form'
                        onSubmit={TestSubmit}
                        onReset={handleReset}
                        className={styles.form}
                        autoComplete='off'>
                        <Form.Label className={styles.required_field} htmlFor='title'>Change Resource 
                        </Form.Label>
                        <Form.Control
                            type="file"
                            
                            name="resourceImg"
                            onChange={handleFileUpload}
                            size="sm" />
                        <Form.Label htmlFor='title'>Change Thumbnail</Form.Label>
                        <Form.Control
                            type="file"
                            size="sm"
                            name="ThumbnailImg"
                            onChange={handleThumbUpload} />
                        <Form.Label className={styles.required_field}>Title</Form.Label>
                        <Form.Control type="text" placeholder='Resource title' name="title" value={title} onChange={handleChange} required></Form.Control>
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={2}
                            placeholder='Good description of resource'
                            name="description"
                            value={description}
                            onChange={handleDescChange}
                            type='text'></Form.Control>
                        <Form.Label>Gated download form
                        </Form.Label>
                        <Form.Select size='small' onChange={handleForm}>
                            <option>Not Gated Content</option>
                            {
                                allForms?.map((form, key) => {
                                    return (<option>{form}</option>);
                                })
                            }
                        </Form.Select>
                        <Form.Label className={styles.required_field}>External/Internal
                        </Form.Label>
                        <Form.Select size='small'value={externalInternal} onChange={handleExt}>
                            <option>External</option>
                            <option>Internal</option>
                        </Form.Select>
                        <Form.Label className={styles.required_field}>Private/Public
                        </Form.Label>
                        <Form.Select size='small' value={public_pvt} onChange={handlePublic_Pvt}>
                            <option>Private</option>
                            <option>Public</option>
                        </Form.Select>
                        <Form.Label>Categories</Form.Label>
                        <MultiSelect
                            options={Categories}
                            value={selectedCategory}
                            onChange={setSelectedCategory}
                            labelledBy="Select Category"
                        />
                        <Form.Label>Content Areas</Form.Label>
                        <MultiSelect
                            options={areas}
                            value={selectedArea}
                            onChange={setSelectedArea}
                            labelledBy="Select Area"
                        />
                        <Form.Label>Internal Use Only</Form.Label>
                        <MultiSelect
                            options={internal_uses}
                            value={selectedInternalUse}
                            onChange={setSelectedInternalUse}
                            labelledBy="Select Label"
                        />
                        <Form.Label>Tags</Form.Label>
                        <MultiSelect
                            options={tags}
                            value={selectedTag}
                            onChange={setSelectedTag}
                            labelledBy="Select Tag"
                            placeholder="Select Tag"
                        />
                        <div className={styles.buttons} style={{ marginBottom: '50px' }}>
                            <button type='submit' className={styles.add}>
                                {isLoading
                                    ? (<CircularProgress
                                        style={{
                                            color: 'white',
                                            margin: '0 5px',
                                            padding: '0'
                                        }}
                                        size='18px' />)
                                    : ('Update')}
                            </button>
                            
                        </div>
                    </Box>
                </Box>
            </Drawer>
        </Fragment>
    );
};
