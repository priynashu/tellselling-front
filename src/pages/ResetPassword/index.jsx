import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

import { AllRoutes } from '../../utils/AllRoutes';

import ResetPasswordImage from '../../assets/forgot-password.svg';
import styles from './ResetPass.module.scss';
import { backend_url } from '../../utils/Config';

const ResetPassword = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', newPassword: '', confirmPassword: '' });

  useEffect(() => {
    if (window.location.href.includes('?data=')) {
      const query = window.location.href.split('?')[1];
      const reset_data = query.split('=')[1];
      const data = JSON.parse(atob(reset_data));
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
    console.log(formData);
    try {
      const res = await axios.post(backend_url+'users/reset', formData);
      console.log(res);
      navigate(AllRoutes.signinRoute, { replace: true });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.main}>
      <div className={styles.wrapper}>
        <div className={styles.left}>
          <h2>TellSelling</h2>
          <div className={styles.image_wrapper}>
            <img src={ResetPasswordImage} alt='Banner' />
          </div>
        </div>
        <div className={styles.right}>
          <h3 className={styles.welcome_text}>Reset Password 🔒</h3>
          <p className={styles.welcome_des}>
            Your new password must be different from previously used passwords
          </p>
          <form onSubmit={handleSubmit}>
            <label htmlFor='newPassword'>New Password</label>
            <input
              type='password'
              id='newPassword'
              autoComplete='off'
              style={{ marginBottom: 20 }}
              className={styles.textfield}
              required
              value={formData.newPassword}
              onChange={(e) => handleChange(e.target.id, e.target.value)}
            />
            <label htmlFor='confirmPassword'>Confirm Password</label>
            <input
              type='password'
              id='confirmPassword'
              autoComplete='off'
              style={{ marginBottom: 20 }}
              className={styles.textfield}
              required
              value={formData.confirmPassword}
              onChange={(e) => handleChange(e.target.id, e.target.value)}
            />
            <button type='submit' className={styles.submit_button}>
              Set New Password
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

export { ResetPassword };
