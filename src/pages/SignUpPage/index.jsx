import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

import { AllRoutes } from '../../utils/AllRoutes';

import SignupImage from '../../assets/signup.svg';
import styles from './Signup.module.scss';
import { backend_url } from '../../utils/Config';
const endpoint = backend_url;

const SignUpPage = () => {
  const navigate = useNavigate();
  const [message,setMessage]=useState()
  const [messageStyle,setMessageStyle]=useState({
    color:"red",
    fontSize:"13px",
    display:"none"
  })
  const [link_style,setLinkStyle]=useState({display:"none"})
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    agree: true,
  });

  useEffect(() => {
    if (window.location.href.includes('?invite=')) {
      const query = window.location.href.split('?')[1];
      const invitation_data = query.split('=')[1];
      const data = JSON.parse(atob(invitation_data));

      setFormData((prevData) => {
        return { ...prevData, email: data.email };
      });
    }
  }, []);

  const handleChange = (id, value) => {
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    axios
      .post(`${backend_url}users/signup`, formData)
      .then((res) => {
        if (res.status === 200) {
          const resData = res.data;
          console.log(res.data);
          // localStorage.setItem('token', resData.token);
          // localStorage.setItem('user', JSON.stringify(resData.user));
          const defaultResources = {tenantId:resData.user.tenantId,
                                    internal_ext: [{ name: 'Internal', count: 0 }, { name: 'External', count: 0 }],
                                    public_pvt: [{ name: 'Public', count: 0 }, { name: 'Private', count: 0 }],
                                    categories:[],
                                    tags:[],
                                    content_areas:[],
                                    internal_uses:[],
                                    owner:[]
          }
          axios.post(`${backend_url}resources/filters/create`,defaultResources)
          messageShown("success","Account Created Sign In Now")
          // navigate(AllRoutes.homeRoute, { replace: true });
        } else {
          alert('Failed !');
        }
      })
      .catch((err) => {
        // alert(err.message);
        if(err.message.includes('404')){
          // console.log("User already exists");
          messageShown("error","User already exists")
        }
        else{
          messageShown("error",err.message)
        }
        
      });
  };
  
  const messageShown =(type,message)=>{
    setMessage(message)
    if(type==='error'){
      setMessageStyle((prevData) => {
        return { ...prevData, display: "block",color:'red' };
      });
      setLinkStyle({display:"none"})
    }
    else if(type=="success"){
      setMessageStyle((prevData) => {
        return { ...prevData, display: "block",color:'green' };
      });
      setLinkStyle({display:"block"})
    }
    
  }
  
  return (
    <div className={styles.main}>
      <div className={styles.wrapper}>
        <div className={styles.left}>
          <h2>TellSelling</h2>
          <div className={styles.image_wrapper}>
            <img src={SignupImage} alt='Banner' />
          </div>
        </div>
        <div className={styles.right}>
          <h3 className={styles.welcome_text}>Adventure starts here 🚀</h3>
          <p className={styles.welcome_des}>Make your app management easy and fun!</p>
          <p style={messageStyle}>{message} &nbsp; &nbsp;
          <Link className={styles.signInLink} style={link_style} to={AllRoutes.signinRoute}>
              Sign in
            </Link>
          </p>
          <form onSubmit={handleSubmit}>
            <label htmlFor='firstName'>First Name</label>
            <input
              type='text'
              id='firstName'
              className={styles.textfield}
              autoComplete='false'
              required
              value={formData.username}
              onChange={(e) => handleChange(e.target.id, e.target.value)}
            />

            <label htmlFor='lastName'>Last Name</label>
            <input
              type='text'
              id='lastName'
              className={styles.textfield}
              autoComplete='false'
              required
              value={formData.username}
              onChange={(e) => handleChange(e.target.id, e.target.value)}
            />

            <label htmlFor='email'>Email</label>
            <input
              type='email'
              id='email'
              className={styles.textfield}
              autoComplete='email'
              required
              value={formData.email}
              onChange={(e) => handleChange(e.target.id, e.target.value)}
            />

            <label htmlFor='password'>Password</label>
            <input
              type='password'
              id='password'
              className={styles.textfield}
              autoComplete='current-password'
              required
              value={formData.password}
              onChange={(e) => handleChange(e.target.id, e.target.value)}
            />

            <div className={styles.checkbox_div}>
              <input
                type='checkbox'
                id='agree'
                className={styles.checkbox}
                checked={formData.agree}
                onChange={(e) => handleChange(e.target.id, e.target.checked)}
              />
              <label htmlFor='agree'>I agree to privacy policy & terms</label>
            </div>
            <button type='submit' className={styles.submit_button}>
              Sign Up
            </button>
          </form>
          <div className={styles.create_account}>
            <p className={styles.new_text}>Already have an account?</p>
            <Link className={styles.link} to={AllRoutes.signinRoute}>
              Sign in instead
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export { SignUpPage };
