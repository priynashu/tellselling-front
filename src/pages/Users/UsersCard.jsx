import {useState} from 'react';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import {Modal, Box, Typography} from '@mui/material';
import {Container, Row, Col, Form, Button} from 'react-bootstrap'
import styles from './Users.module.scss';
import { AllRoutes } from '../../utils/AllRoutes';
import { useNavigate } from 'react-router-dom';


const image1 = 'https://i.pinimg.com/originals/ae/ec/c2/aeecc22a67dac7987a80ac0724658493.jpg';
const image2 = 'https://i.imgur.com/VpQ3gGV.png';
const image3 = `https://snusercontent.global.ssl.fastly.net/member-profile-full/46/4274246_8809836.jpg`;
const image4 = `https://www.archiefoundationhome.org.uk/wp-content/uploads/2020/05/profile-photo-social-media.jpg`;
const image5 = `https://i.pinimg.com/originals/de/64/80/de64801f0275c1ab2ea5a9e2bb3ce7bc.jpg`;

const UsersCard = ({roleN, usersNumber}) => {
  const navigate = useNavigate();
    const initialState = {
        role: "",
        permissions: [
            {
                name: "user_management",
                access: []
            }, {
                name: "billing_management",
                access: []
            }, {
                name: "commission_management",
                access: []
            }, {
                name: "digital_sales_management",
                access: []
            }, {
                name: "resource_center",
                access: []
            }, {
                name: "landing_pages",
                access: []
            }, {
                name: "insights",
                access: []
            }
        ]
    }

    const [rolePermission,setRolePermission] = useState(initialState);
    const {permissions,role}=rolePermission;
    const [open,setOpen] = useState(false);
    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };    
    const handleChange = (e) => {        
        const value=e.target.value;
        setRolePermission({...rolePermission,["role"]:value});
    }
    const handleCheckBoxChange=(e,value)=>{
      // console.log(e,value,e.target.checked);
      let isChecked=e.target.checked;
      const valueToAdd=e.target.value;      
      if(isChecked){
        permissions[value].access.push(valueToAdd)
       
      }
      else if(!isChecked && permissions[value].access.includes(valueToAdd)){
        
        var index = permissions[value].access.indexOf(valueToAdd);
        
        permissions[value].access.splice(index, 1)
        
      }
      setRolePermission({...rolePermission,["permissions"]:permissions});
      // console.log(permissions[value]);        
    }

    const handleSubmit = (e) => {
      e.preventDefault();
      console.log("submit done",rolePermission);
      setRolePermission(initialState);
      navigate(AllRoutes.users, { replace: true });
      setOpen(false);
      // console.log("after initial state",rolePermission);
  }
    const roleColumn = (name,value) => {
        return <Row>
            <Col sm={4}>
                <Form.Text className={styles.text}>{name}</Form.Text>
            </Col>
            <Col sm={2}>
                <Form.Check type="Checkbox"  label="Read" value="Read" onChange={(e)=>handleCheckBoxChange(e,value)}/>
            </Col>
            <Col sm={2}>
                <Form.Check type="Checkbox" label="Write" value="Write" onChange={(e)=>handleCheckBoxChange(e,value)}/>
            </Col>
            <Col sm={2}>
                <Form.Check type="Checkbox" label="Create" value="Create" onChange={(e)=>handleCheckBoxChange(e,value)}/>
            </Col>
        </Row>

    }
    return (
        <div className={styles.user_card}>
            <div className={styles.details_div}>
                <p className={styles.total_number}>Total {usersNumber} users</p>
                <AvatarGroup max={4}>
                    <Avatar alt='Remy Sharp' src={image1}/>
                    <Avatar alt='Travis Howard' src={image2}/>
                    <Avatar alt='Cindy Baker' src={image3}/>
                    <Avatar alt='Agnes Walker' src={image4}/>
                    <Avatar alt='Trevor Henderson' src={image5}/>
                </AvatarGroup>
            </div>
            <h3 className={styles.role}>{role}</h3>
            <p className={styles.edit_button} onClick={handleOpen}>Edit Role</p>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description">
                <Box className={styles.box}>
                    <Container className="px-5">
                        <Row className="justify-content-md-center py-4">
                            <Col md="auto">
                                <h2>Set Role Permissions</h2>
                            </Col>
                        </Row>
                        <Form onSubmit={(e)=>handleSubmit(e)}>
                        <Row>
                            <Col>
                                <Form.Group className="mb-3">
                                    <Form.Label>Role Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter role name"
                                        value={role}
                                        required={true}
                                        onChange={(e) => handleChange(e)}
                                        />
                                </Form.Group>
                                <br/>
                            </Col>

                            <h3>Role Permissions</h3>
                            <Row>
                                <Col sm={4}>
                                    <Form.Text className={styles.text}>Administrator Access</Form.Text>
                                </Col>
                                <Col sm={8}>
                                    <Form.Check type="Checkbox" label="Select All"/>
                                </Col>
                            </Row>
                            <hr/> {roleColumn("User Management",0)}
                            <hr/> {roleColumn("Billing Management",1)}
                            <hr/> {roleColumn("Commission Management",2)}
                            <hr/> {roleColumn("Digital Sales Room",3)}
                            <hr/> {roleColumn("Resource Center",4)}
                            <hr/> {roleColumn("Landing Pages",5)}
                            <hr/> {roleColumn("Insights",6)}

                            
                        </Row>
                        <Row className="justify-content-md-center py-4">
                                <Col md="auto">
                                    <Button
                                        className={styles.submit}
                                        variant="custom"
                                        type="submit"
                                        >Submit</Button>&nbsp;&nbsp;
                                    <Button variant="outline-secondary" className="px-3 mx-3">Discard</Button>
                                </Col>
                            </Row>
                        </Form>

                    </Container>
                </Box>
            </Modal>

        </div>
    );
};

export {UsersCard};
