import { useState, Fragment } from 'react';
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


export const UploadContentDrawer = ({ isOpen, onClose, onSuccess, filterData, allCategories, allTags, allContentAreas, allPublic_Pvt, allInternal_Ext, allInternalUses, allForms, updateTags, updateCategories, updateInternalUses, updateContentAreas, updatePublic_Pvt, updateInternal_Ext }) => {

    // console.log("upload",allCategories);
    const [formData, setFormData] = useState({ title: '', category: [], tags: [], description: '', contentAreas: [], internalUse: [], form: '', external_internal: '' });
    const [file, setFile] = useState("");
    const [thumb, setThumb] = useState("");
    const [isLoading, setIsloading] = useState(false);

    const [selectedForm, setSelectedForm] = useState('');
    const [externalInternal, setExternalInternal] = useState('External');
    const [privatePublic, setPrivatePublic] = useState('Private');
    const [fileType, setFileType] = useState("");

    const handleChange = (e) => {
        // console.log(e.target.value,e.target.name);
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileUpload = (e) => {
        // console.log(e.target.files[0]);
        const selectedFile = e.target.files[0];
        cloudinaryUpload(selectedFile, "file")
    };

    const handleThumbUpload = (e) => {
        const selectedThumb = e.target.files[0];
        cloudinaryUpload(selectedThumb, "thumb")
    };

    const resetIt = (e) => {
        setFormData({ title: '', description: '', category: 'External', tags: [] });
        setFile('');
        setThumb('');
        setSelectedArea([]);
        setSelectedCategory([]);
        setSelectedTag([]);
        setSelectedLabel([]);
    }
    const cloudinaryUpload = (item, name) => {
        console.log("File is", item.type);
        const formData = new FormData();
        let fileType = "";
        if (item.type.includes("video")) {
            const video = new File(
                [item],
                "demo.mp4",
                { type: 'video/mp4' }
            );
            //   console.log("video",video);
            formData.append("file", video);
            setFileType("video");
        }
        else if (item.type.includes("pdf")) {
            setFileType("pdf");
            console.log("pdf", fileType);
        }
        else {
            formData.append("file", item);
            setFileType("image");
        }



        formData.append("upload_preset", "ce0qpcmg");
        console.log("upload item", item, " ", name);
        axios.post(`https://api.cloudinary.com/v1_1/tellselling/image/upload/${item.name}`, formData).then((res) => {
            const url = res.data.secure_url;
            // console.log(url);
            if (name === "file") {
                setFile(res.data.secure_url)
                console.log("file", res.data.secure_url);
            }
            else if (name === "thumb") {
                setThumb(res.data.secure_url)
                console.log("thumb", res.data.secure_url);
            }
        }).catch((err) => {
            console.log(err.message);
        });

    }
    const handleSubmit = async (e) => {
        // e.preventDefault();
        // console.log("handle Submit",file,"thumb",thumb);
        setIsloading(true);
        const currentUser = getLocalUser();
        const uploadData = new FormData();
        uploadData.append('data', JSON.stringify(formData));
        uploadData.append('tenantId', currentUser.tenantId);
        uploadData.append('userId', currentUser._id);
        uploadData.append('file', file);
        uploadData.append('thumb', thumb);
        // uploadData.append("file","file-1")
        console.log(Array.from(uploadData));// 
        try {
            const res = axios.post(backend_url + 'resources/upload', uploadData)
            toast.success('Content added successfully !', { position: toast.POSITION.BOTTOM_LEFT });
            setIsloading(false);
            resetIt();
            onSuccess();
        } catch (error) {
            console.log(error);
            toast.error('Failed to add content !', { position: toast.POSITION.BOTTOM_LEFT });
            setIsloading(false);
        }
        onClose();
    };
    const handleExt = (e) => {
        console.log("handle Ext", e.target.value);
        setExternalInternal(e.target.value);
    }
    const handlePvtPub = (e) => {
        console.log("handle private public", e.target.value);
        setPrivatePublic(e.target.value);
    }

    const UpdateTags = async (data) => {
        //update tag database from here
        //processing datas
        // console.log(" add tags",data);
        const localUser = getLocalUser();
        const temp = [];
        data.forEach((val, key) => {
            temp.push({ name: val.name, count: val.count });
        })
        const req_body = {
            tenantId: localUser.tenantId,
            method: 'UPDATE',
            filter: "tags",
            data: temp
        }
        await axios.post(backend_url + 'resources/filters', req_body).then((res) => {
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
            temp.push({ name: val.name, count: val.count });
        })
        const req_body = {
            tenantId: localUser.tenantId,
            method: 'UPDATE',
            filter: "categories",
            data: temp
        }
        await axios.post(backend_url + 'resources/filters', req_body).then((res) => {
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
            temp.push({ name: val.name, count: val.count });
        })
        const req_body = {
            tenantId: localUser.tenantId,
            method: 'UPDATE',
            filter: "content_areas",
            data: temp
        }
        await axios.post(backend_url + 'resources/filters', req_body).then((res) => {
            // console.log(res)
        }).catch((err) => { console.log(err) })
        updateContentAreas(temp);

    }
    const UpdateInternalUse = async (data) => {
        //processing datas
        console.log("internal", data);
        const localUser = getLocalUser();
        const temp = [];
        data.forEach((val, key) => {
            temp.push({ name: val.name, count: val.count });
        })
        const req_body = {
            tenantId: localUser.tenantId,
            method: 'UPDATE',
            filter: "internal_uses",
            data: temp
        }
        await axios.post(backend_url + 'resources/filters', req_body).then((res) => {
            // console.log(res)
        }).catch((err) => { console.log(err) })
        updateInternalUses(temp);

    }
    const UpdatePublic_Pvt = async (data) => {
        //processing datas
        // console.log("internal",data);
        const localUser = getLocalUser();
        const temp = [];
        data.forEach((val, key) => {
            temp.push({ name: val.name, count: val.count });
        })
        const req_body = {
            tenantId: localUser.tenantId,
            method: 'UPDATE',
            filter: "public_pvt",
            data: temp
        }
        await axios.post(backend_url + 'resources/filters', req_body).then((res) => {
            console.log(res)
        }).catch((err) => { console.log(err) })
        updatePublic_Pvt(temp)
        // this.props.updatePublic_Pvt(temp);
        // setPublic_Pvt(data);
    }
    const UpdateInternal_Ext = async (data) => {
        //processing datas
        // console.log("internal",data);
        const localUser = getLocalUser();
        const temp = [];
        data.forEach((val, key) => {
            temp.push({ name: val.name, count: val.count });
        })
        const req_body = {
            tenantId: localUser.tenantId,
            method: 'UPDATE',
            filter: "internal_ext",
            data: temp
        }
        await axios.post(backend_url + 'resources/filters', req_body).then((res) => {
            console.log(res)
        }).catch((err) => { console.log(err) })
        updateInternal_Ext(temp)
        // this.props.updatePublic_Pvt(temp);
        // setPublic_Pvt(data);
    }
    const updateAllFilters = (categories, tags, content_areas, internal_uses, public_pvt, internal_ext) => {
        // count tags
        allTags?.map((item, i) => {
            tags?.map((index) => {
                if (item.name == index.label) {
                    allTags[i].count += 1;
                    // console.log(allTags[i].name," ",allTags[i].count);
                    // console.log("tags name",item.name);
                }

            })
        })
        UpdateTags(allTags)

        // count cats
        console.log("cats selected", categories);
        allCategories?.map((item, i) => {
            categories?.map((index) => {
                if (item.name == index.label) {
                    allCategories[i].count += 1;
                    // console.log(allCategories[i].name," ",allCategories[i].count);
                    // console.log("tags name",item.name);
                }

            })
        })
        UpdateCategories(allCategories)

        //count areas
        allContentAreas?.map((item, i) => {
            content_areas?.map((index) => {
                if (item.name == index.label) {
                    allContentAreas[i].count += 1;
                    // console.log(allContentAreas[i].name," ",allContentAreas[i].count);
                    // console.log("tags name",item.name);
                }

            })
        })
        UpdateContentAreas(allContentAreas)

        //count internal_use
        allInternalUses?.map((item, i) => {
            internal_uses?.map((index) => {
                if (item.name == index.label) {
                    allInternalUses[i].count += 1;
                    console.log(allInternalUses[i].name, " ", allInternalUses[i].count);
                    // console.log("tags name",item.name);
                }

            })
        })
        UpdateInternalUse(allInternalUses)
        // console.log("internal use",allInternalUses);

        //count public_pvt

        if (public_pvt == "Public") {
            allPublic_Pvt[0].count += 1;
        }
        else if (public_pvt == "Private") {
            allPublic_Pvt[1].count += 1;
        }
        UpdatePublic_Pvt(allPublic_Pvt)
        // console.log("public private",allPublic_Pvt);

        //count internal_ext
        if (internal_ext == "Internal") {
            allInternal_Ext[0].count += 1;
        }
        else if (internal_ext == "External") {
            allInternal_Ext[1].count += 1;
        }
        UpdateInternal_Ext(allInternal_Ext)
        console.log("Internal External", allInternal_Ext);

    }

    const TestSubmit = (e) => {

        e.preventDefault();
        const currentUser = getLocalUser();
        const data = {
            title: formData.title,
            categories: selectedCategory,
            description: formData.description,
            tags: selectedTag,
            internal_uses: selectedLabel,
            content_areas: selectedArea,
            form: selectedForm,
            creator: currentUser.firstName + " " + currentUser.lastName,
            tenantId: currentUser.tenantId,
            internal_ext: externalInternal,
            public_pvt: privatePublic,
            file: file,
            thumb: thumb
        }

        // console.log("all tags",allTags);

        // console.log("all tags",allTags);

        // UpdateTags()
        console.log("submitted data is", data);


        //upload thumbnail to cloudinary

        if (data.categories != 0 && data.tags != 0 && data.content_areas != 0 && data.internal_uses != 0) {
            axios.post(backend_url+'resources/upload', data)
                .then((res) => {
                    console.log(res);
                    updateAllFilters(data.categories, data.tags, data.content_areas, data.internal_uses, data.public_pvt, data.internal_ext)
                    toast.success('Content added successfully !', { position: toast.POSITION.BOTTOM_LEFT });
                    setIsloading(false);
                    resetIt();
                    onSuccess();
                }).catch((err) => {
                    console.log("error in thumb", err);
                    toast.error('Failed to add content !', { position: toast.POSITION.BOTTOM_LEFT });
                    setIsloading(false);
                })
            onClose();
        }

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

    const [selectedCategory, setSelectedCategory] = useState([]);
    const [selectedArea, setSelectedArea] = useState([]);
    const [selectedLabel, setSelectedLabel] = useState([]);
    const [selectedTag, setSelectedTag] = useState([]);

    const handleForm = (e) => {
        setSelectedForm(e.target.value);
        console.log(e.target.value);

    }
    return (
        <Fragment>
            <Drawer anchor='right' open={isOpen} onClose={onClose}>
                <Box className={styles.drawer_wrapper}>
                    <div className={styles.header}>
                        <p className={styles.title}>Upload Resources</p>
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
                        <Form.Label className={styles.required_field} htmlFor='title'>Resource
                        </Form.Label>
                        <Form.Control
                            type="file"
                            size="sm"
                            required
                            name="resourceImg"
                            onChange={handleFileUpload}
                            size="sm" />
                        <Form.Label htmlFor='title'>Thumbnail</Form.Label>
                        <Form.Control
                            type="file"
                            size="sm"
                            required
                            name="ThumbnailImg"
                            onChange={handleThumbUpload} />
                        <Form.Label className={styles.required_field}>Title</Form.Label>
                        <Form.Control type="text" placeholder='Resource title' name="title" onChange={handleChange} required></Form.Control>
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={2}
                            placeholder='Good description of resource'
                            name="description"
                            required
                            onChange={handleChange}
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
                        <Form.Select size='small' onChange={handleExt}>
                            <option>External</option>
                            <option>Internal</option>
                        </Form.Select>
                        <Form.Label className={styles.required_field}>Private/Public
                        </Form.Label>
                        <Form.Select size='small' onChange={handlePvtPub}>
                            <option>Private</option>
                            <option>Public</option>
                        </Form.Select>
                        <Form.Label className={styles.required_field}>Categories</Form.Label>
                        <MultiSelect

                            options={Categories}
                            value={selectedCategory}
                            onChange={setSelectedCategory}
                            labelledBy="Select Category"
                        />
                        <Form.Label className={styles.required_field}>Content Areas</Form.Label>
                        <MultiSelect
                            options={areas}
                            value={selectedArea}
                            onChange={setSelectedArea}
                            labelledBy="Select Area"
                        />
                        <Form.Label className={styles.required_field}>Internal Use Only</Form.Label>
                        <MultiSelect
                            options={internal_uses}
                            value={selectedLabel}
                            onChange={setSelectedLabel}
                            labelledBy="Select Label"
                        />
                        <Form.Label className={styles.required_field}>Tags</Form.Label>
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
                                    : ('Add')}
                            </button>
                            <button type='reset' className={styles.reset}>
                                Reset
                            </button>
                        </div>
                    </Box>
                </Box>
            </Drawer>
        </Fragment>
    );
};
