import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "./salesroom.css"
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import GridViewIcon from '@mui/icons-material/GridView';
import ListIcon from '@mui/icons-material/List';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import styles from './Salesroom.module.scss';
import { AllRoutes } from '../../utils/AllRoutes';
import { getLocalUser } from '../../utils/GetLocalUser';
import { backend_url } from '../../utils/Config';
import axios from 'axios';
import ListView from './ListView';
import GridView from './GridView';
import {Col,Row,Button,DropdownButton,Dropdown,Form,InputGroup} from "react-bootstrap"
import {FiSearch} from 'react-icons/fi'
import {BsChevronRight} from 'react-icons/bs'
const SalesRoom = () => {
  const navigate = useNavigate();
  const [type, setType] = useState('Featured');
  const [searchText, setSearchText] = useState('');
  const [viewType,setViewType] = useState('list');
  const [Salesrooms, setSalesrooms]=useState([]);

  const localUser = getLocalUser();  

  useEffect(()=>{
    GetSalesRooms();
  },[])
  const onSuccess=()=>{
    GetSalesRooms()
  }
  const GetSalesRooms = async() =>{
    const url=backend_url+'salesroom/salesroom/'+localUser.tenantId;
    const url_web = backend_url+'salesroom-webinar/salesroomWeb/'+localUser.tenantId;
    const url_live = backend_url+'salesroom-live-stream/salesroomLive/'+localUser.tenantId;
    await axios.get(url)
    .then((res)=>{
      console.log("all basic",res.data);
      setSalesrooms(res.data);
    }).catch((err)=>{
      console.log(err);
    })
    await axios.get(url_web).then((res)=>{
      console.log("all webinars",res.data);
      if(res.data.length!=0)
      setSalesrooms(prevState=>{return([...prevState,...res.data])});
    })
    await axios.get(url_live).then((res)=>{
      console.log("all live",res.data);
      setSalesrooms(prevState=>{return([...prevState,...res.data])});
    }) 
    console.log("Salesrooms",Salesrooms);   
  }
  
//  if(Salesrooms.length==0){
  // GetSalesRooms();
//  }

  return (
    <div className={styles.main}>
      <div className={styles.topbar}>
        {/* <div className="row">
          <div className='col-12'>
          
          </div>
        
        </div> */}
        <Row>
        <Col sm="auto" style={{paddingTop:"5px",paddingLeft:"10px",paddingRight:"0"}}>
          <a className={styles.after_title}>Home</a>&nbsp;&nbsp;<BsChevronRight style={{fontSize:"12px",color:"gray",fontWeight:"900"}}/>
          </Col>
          <Col sm="auto" style={{paddingTop:"5px",paddingLeft:"5px",paddingRight:"0"}}>
          <a className={styles.after_title}>Salesroom</a>
          </Col>
          
        </Row>
        
        <div className={styles.right_buttons}>
          <Button
          variant='custom'            
            className="createBtn"
            onClick={() => navigate(AllRoutes.selectRoomType)}>
            Create Digital Sales Room
          </Button>
          <DropdownButton
            value={type}
            title="Featured"
            onChange={(e) => setType(e.target.value)}
            size='small'
            variant = "custom"
            className="featured"
            >
            <Dropdown.Item value='Featured'>Featured</Dropdown.Item>
            <Dropdown.Item value='Newest'>Newest</Dropdown.Item>
            <Dropdown.Item value='Oldest'>Oldest</Dropdown.Item>
          </DropdownButton>
          <Row>
            <Col>
            <Button variant='custom' className="list" value={viewType} onClick={()=>{setViewType('list')}}>
            <ListIcon />
          </Button>
          <Button variant='custom' className="grid" value={viewType} onClick={()=>{setViewType('grid')}}>
            <GridViewIcon />
          </Button>
            </Col>
          </Row>
          
        </div>
      </div>
      <div className={styles.search_area}>
      <InputGroup className="mb-3">
        <Form.Control
          placeholder='Search Digital Sales Room'          
          aria-describedby="basic-addon2"
          className="search-bar"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
       />
        <InputGroup.Text id="basic-addon2"><FiSearch style={{color: "rgba(0, 0, 0, 0.54)",cursor:"pointer"}}/></InputGroup.Text>
         </InputGroup>

        
      </div>
      {
        (viewType=="list")?<ListView onSuccess = {onSuccess} contents={Salesrooms}  search={searchText}/>:<GridView search={searchText} contents={Salesrooms} onSuccess = {onSuccess} />
      }
    </div>
  );
};

export { SalesRoom };
