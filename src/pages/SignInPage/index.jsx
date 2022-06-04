import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';

import { AllRoutes } from '../../utils/AllRoutes';
import { backend_url } from '../../utils/Config';

import SigninImage from '../../assets/signin.svg';
import styles from './Signin.module.scss';

const endpoint = backend_url;

const SignInPage = ({history}) => {
  let navigate = useNavigate();
  const [isLoading, setIsloading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    remember: true,
  });

  const handleChange = (id, value) => {
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsloading(true);
    axios
      .post(backend_url+'users/login', formData)
      .then((res) => {
        setIsloading(false);
        const resData = res.data;
        localStorage.setItem('token', resData.token);
        localStorage.setItem('user', JSON.stringify(resData.user));
        console.log(resData,"home route",AllRoutes.resourceCenter);        
        navigate("/", { replace: true });
        window.location.reload(true);
      })
      .catch((error) => {
        setIsloading(false);
        const errorData = error.response.data;
        toast.error(errorData.message, {
          position: toast.POSITION.BOTTOM_LEFT,
        });
      });
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate(AllRoutes.homeRoute, { replace: true });
    }
  }, [navigate]);

  return (
    <div className={styles.main}>
      <div className={styles.wrapper}>
        <div className={styles.left}>
          <h2>TellSelling</h2>
          <div className={styles.image_wrapper}>
            <img src={SigninImage} alt='Banner' />
          </div>
        </div>
        <div className={styles.right}>
          <h3 className={styles.welcome_text}>Welcome to Tellselling! &#128075;</h3>
          <p className={styles.welcome_des}>
            Please sign-in to your account and start the adventure
          </p>
          <form onSubmit={handleSubmit}>
            <label htmlFor='email'>Email</label>
            <input
              type='email'
              id='email'
              className={styles.textfield}
              autoComplete='username'
              required
              value={formData.email}
              onChange={(e) => handleChange(e.target.id, e.target.value)}/>
            <div className={styles.password_div}>
              <label htmlFor='password'>Password</label>
              <Link
                style={{ textDecoration: 'none' }}
                className={styles.forgot_password}
                to={AllRoutes.forgotPassword}>
                Forgot Password?
              </Link>
            </div>
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
                id='remember'
                className={styles.checkbox}
                checked={formData.remember}
                onChange={(e) => handleChange(e.target.id, e.target.checked)}/>
              <label htmlFor='remember'>Remember Me</label>
            </div>
            <button type='submit' className={styles.submit_button}>
              {isLoading ? (
                <CircularProgress
                  style={{ color: 'white', margin: '0', padding: '0' }}
                  size='20px'
                />
              ) : (
                'Sign In'
              )}
            </button>
          </form>
          <div className={styles.create_account}>
            <p style={{float:'left'}} className={styles.new_text}>New on our platform?</p><br/>
            <Link style={{float:'right'}} className={styles.link} to={AllRoutes.signupRoute}>
              Create an account
            </Link>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export { SignInPage };
