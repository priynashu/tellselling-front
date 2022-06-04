import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

import { AllRoutes } from '../../utils/AllRoutes';

import ForgotPasswordImage from '../../assets/forgot-password.svg';
import styles from './ForgotPass.module.scss';
import { backend_url } from '../../utils/Config';

const ForgotPassword = () => {
  let navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '' });
  const [messageStyle,setMessageStyle]=useState({
    color:"green",
    fontSize:"13px",
    display:"none"
  })
  const handleChange = (id, value) => {
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("forgot pass",formData);
    try {
      const res = await axios.post(backend_url+'users/forgot', formData);
      console.log(res);
      setMessageStyle((prevData) => {
        return { ...prevData, display: "block" };
      });
      // navigate(AllRoutes.signinRoute, { replace: true });
    } catch (error) {
      console.log(error);
    }
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
            <img src={ForgotPasswordImage} alt='Banner' />
          </div>
        </div>
        <div className={styles.right}>
          <h3 className={styles.welcome_text}>Forgot Password? &#128075;</h3>
          <p className={styles.welcome_des}>
            Enter your email and we'll send you instructions to reset your password
          </p>
          <p style={messageStyle}>Email Sent to your email address!!</p>
          <form onSubmit={handleSubmit}>
            <label htmlFor='email'>Email</label>
            <input
              type='email'
              id='email'
              style={{ marginBottom: 20 }}
              className={styles.textfield}
              autoComplete='username'
              required
              value={formData.email}
              onChange={(e) => handleChange(e.target.id, e.target.value)}
            />
            <button type='submit' className={styles.submit_button}>
              Send reset link
            </button>
          </form>
          <div className={styles.create_account}>
            <Link className={styles.link} to={AllRoutes.signinRoute}>
              Back to login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export { ForgotPassword };
