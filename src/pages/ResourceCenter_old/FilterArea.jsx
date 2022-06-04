import { useState, useEffect } from 'react';
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



export const FilterArea = ({ filterData, allCategories, setAllCategories, allTags, setAllTags }) => {

  const localUser = getLocalUser();
  const [isOpenTag, setIsOpentag] = useState(false);
  const [isOpenCategory, setIsOpenCategory] = useState(false);
  const [isOpenContentAreas, setIsOpenContentAreas] = useState(false);
  const [isOpenInternalUse, setIsOpenInternalUse] = useState(false);

  //filter datas
  const [tags, setTags] = useState([]);
  const [categories, setCategories] = useState([]);
  const [contentAreas, setContentAreas] = useState([]);
  const [internalUse, setInternalUse] = useState([]);
  //default filters
  const [externalInternal, setExternalInternal] = useState([{ name: "External", count: 0 }, { name: "Internal", count: 0 }]);
  const [publicPrivate, setPublicPrivate] = useState([{ name: "Public", count: 0 }, { name: "Private", count: 0 }])
  const [dataLoaded,setDataLoaded]=useState(false);


  //Retrive existing categories, tags, content areas from server & sync values
  const Sync = () => {
    const localUser = getLocalUser();
    const req = {
      tenantId: localUser.tenantId,
      method: 'GET'
    }
    axios.post(backend_url+'resources/filters', req).then((res) => {
      const data = res.data;
      //parsing categories
      const cats = [];
      data.categories?.map((val, key) => {
        const obj = {
          name: val,
          count: 0
        }
        cats.push(obj);
      })
      setCategories(cats);
      //parsing tags
      const tgs = [];
      data.tags?.map((val, key) => {
        const obj = {
          name: val,
          count: 0
        }
        tgs.push(obj);
      })
      setTags(tgs)
      //parsing content areas
      const carea = [];
      data.content_areas?.map((val, key) => {
        const obj = {
          name: val,
          count: 0
        }
        carea.push(obj);
      })
      setContentAreas(carea)
      //parsing internal uses
      const iuses = [];
      data.internal_uses?.map((val, key) => {
        const obj = {
          name: val,
          count: 0
        }
        iuses.push(obj);
      })
      setInternalUse(iuses)

      setDataLoaded(true);

    }).catch((err) => {
      console.log(err);
    })
    //must call this function from a useEffect
    /**
     * TO DO:
     * 1. Use Axios to fetch the filters against the Tenant ID
     * 2. Update local datas with server fetched datas
     *    a. setTags()
     *    b. setCategories()
     */

    //SET DEFAULT FILTERS
    //external/internal
  }
  useEffect(() => {
    Sync();
  }, []);

  //Sync();

  //FILTER FUNCTIONALITIES
  //These functions should be passed to child as props and 
  //should be controlled by the child components
  const UpdateTags = (data) => {
    //update tag database from here
    setTags(data);
  }
  const UpdateCategories = async (data) => {
    console.log('update request')
    //processing datas
    const localUser = getLocalUser(); 
    const temp=[];
    data.forEach((val,key)=>{
      temp.push(val.name);
    })
    const req_body={
      tenantId: localUser.tenantId,
      method: 'UPDATE',
      filter:"categories",
      data:temp
    }
    await axios.post(backend_url+'resources/filters', req_body).then((res) => {
      console.log(res)
    }).catch((err)=>{console.log(err)})
    setCategories(data);
  }
  const UpdateContentAreas = (data) => {
    //update tag database from here
    setContentAreas(data);
  }
  const UpdateInternalUse = (data) => {
    //update tag database from here
    setInternalUse(data);
  }

  // const ext_int = [{ name: "External", count: 0 }, { name: "Internal", count: 0 }];
  // setExternalInternal(ext_int);
  // const pub_pri = [{ name: "Public", count: 0 }, { name: "Private", count: 0 }];
  // setPublicPrivate(pub_pri);
  const FilterComponents = () => {
    return (
      <>
        <Filter
          isOpen={isOpenCategory}
          onClose={() => { setIsOpenCategory(false) }}
          data={categories}
          updateData={UpdateCategories}
          title="Categories" />
        <Filter
          isOpen={isOpenTag}
          onClose={() => { setIsOpentag(false) }}
          data={tags}
          updateData={UpdateTags}
          title="Tags" />
        <Filter
          isOpen={isOpenInternalUse}
          onClose={() => { setIsOpenInternalUse(false) }}
          data={internalUse}
          updateData={UpdateInternalUse}
          title="Internal Use Only" />
        <Filter
          isOpen={isOpenContentAreas}
          onClose={() => { setIsOpenContentAreas(false) }}
          data={contentAreas}
          updateData={UpdateContentAreas}
          title="Content Areas" />
      </>
    )
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
          <p style={{ fontWeight: 400, fontSize: "15px", color: '#58575f', marginTop: "10px" }}>External/Internal &nbsp;</p>
        </AccordionSummary>
        <AccordionDetails style={{ paddingTop: '10px', paddingLeft: '0', paddingBottom: "0" }}>
          <FormGroup>
            {externalInternal?.map((item) => (
              <Row key={item._id} className={styles.row}>
                <Col sm={2}><Checkbox style={{ paddingTop: "4px" }} size="small" /></Col>
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
          <p style={{ fontWeight: 400, fontSize: "15px", color: '#58575f', marginTop: "10px" }}>Public/Private &nbsp;</p>
        </AccordionSummary>
        <AccordionDetails style={{ paddingTop: '10px', paddingLeft: '0', paddingBottom: "0" }}>
          <FormGroup>
            {publicPrivate?.map((item) => (
              <Row key={item._id} className={styles.row}>
                <Col sm={2}><Checkbox style={{ paddingTop: "4px" }} size="small" /></Col>
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
          <p style={{ fontWeight: 400, fontSize: "15px", color: '#58575f', marginTop: "10px" }}>Categories &nbsp;<IoSettingsSharp onClick={() => setIsOpenCategory(true)} /></p>
        </AccordionSummary>
        <AccordionDetails style={{ paddingTop: '10px', paddingLeft: '0', paddingBottom: "0" }}>
          <FormGroup>
            {categories?.map((item) => (
              <Row key={item._id} className={styles.row}>
                <Col sm={2}><Checkbox style={{ paddingTop: "4px" }} size="small" /></Col>
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
          <p style={{ fontWeight: 400, fontSize: "15px", color: '#58575f', marginTop: "10px" }}>Tags &nbsp;<IoSettingsSharp onClick={() => setIsOpentag(true)} /></p>
        </AccordionSummary>
        <AccordionDetails style={{ paddingTop: '10px', paddingLeft: '0', paddingBottom: "0" }}>
          <FormGroup>
            {tags?.map((item) => (
              <Row key={item._id} className={styles.row}>
                <Col sm={2}><Checkbox style={{ paddingTop: "4px" }} size="small" /></Col>
                <Col sm={{ offset: 1, span: 6 }} className=" pr-2"><span className={styles.title}>{item.name}</span></Col>
                <Col sm={2} className=" pr-2"><span className={styles.count}>({item.count})</span></Col>
              </Row>
            ))}
          </FormGroup>
        </AccordionDetails>
      </Accordion>
      {/* ContentAreas */}
      <Accordion style={{ boxShadow: 'none', paddingTop: '10px', paddingBottom: '10px' }} defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls='panel1a-content'
          id='panel1a-header'
          style={{ minHeight: '0px', height: '10px', paddingTop: '10px', paddingLeft: "0" }}>
          <p style={{ fontWeight: 400, fontSize: "15px", color: '#58575f', marginTop: "10px" }}>Content Areas &nbsp;<IoSettingsSharp onClick={() => setIsOpenContentAreas(true)} /></p>
        </AccordionSummary>
        <AccordionDetails style={{ paddingTop: '10px', paddingLeft: '0', paddingBottom: "0" }}>
          <FormGroup>
            {contentAreas?.map((item) => (
              <Row key={item._id} className={styles.row}>
                <Col sm={2}><Checkbox style={{ paddingTop: "4px" }} size="small" /></Col>
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
          <p style={{ fontWeight: 400, fontSize: "15px", color: '#58575f', marginTop: "10px" }}>Internal Use Only &nbsp;<IoSettingsSharp onClick={() => setIsOpenInternalUse(true)} /></p>
        </AccordionSummary>
        <AccordionDetails style={{ paddingTop: '10px', paddingLeft: '0', paddingBottom: "0" }}>
          <FormGroup>
            {internalUse?.map((item) => (
              <Row key={item._id} className={styles.row}>
                <Col sm={2}><Checkbox style={{ paddingTop: "4px" }} size="small" /></Col>
                <Col sm={{ offset: 1, span: 6 }} className=" pr-2"><span className={styles.title}>{item.name}</span></Col>
                <Col sm={2} className=" pr-2"><span className={styles.count}>({item.count})</span></Col>
              </Row>
            ))}
          </FormGroup>
        </AccordionDetails>
      </Accordion>


      {/* // ))} */}
      {
        (dataLoaded)?<FilterComponents/>:<></>
      }

    </div>

  );
};
