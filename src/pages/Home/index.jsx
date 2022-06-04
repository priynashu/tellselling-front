/**
 * @name HomePage
 * @type Component
 * @description Holds digital salesroom summary in cards
 */

import { Component } from 'react';
import { SalesRoomCard } from '../../components';
import styles from './Home.module.scss';
import { getLocalUser } from '../../utils/GetLocalUser';
import { backend_url } from '../../utils/Config';
import axios from 'axios';
import BillingPlan from './billingPlan';
import React, { useState } from 'react'
import { useNavigate, Redirect, Navigate, Route,Link } from 'react-router-dom';
import { AllRoutes } from '../../utils/AllRoutes';
import Header from '../../components/Header';
/**
 * Demo Image URLs
 */
const url1 = 'https://source.unsplash.com/XtUd5SiX464/1000x900';
const url2 = 'https://source.unsplash.com/xej3GOtAQ-o/1000x900';
const url3 = 'https://source.unsplash.com/b-qKvXilo6Q/1000x900';

//Class Component
class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      salesrooms: [],
      expiryDateArray: [],
      expiryDate: "",
      checkPlan: false,
      open: false,
      planType: "Basic",
      expDate: ""
    }
  }

  FetchSalesrooms = () => {
    const localUser = getLocalUser();
    const url = backend_url + 'salesroom/' + localUser.tenantId;
    axios.get(url)
      .then((res) => {
        this.setState({ salesrooms: res.data });
      }).catch((err) => {
        console.log(err);
      })
  }
  setExpiryDate = (expiryDate) => {
    // console.log(expiryDate);
    const date = expiryDate
    const year = JSON.stringify(date[2]).substring(1, 5)
    const month = JSON.stringify(date[0]).substring(1, 4)
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    const monthNo = months.findIndex((item) => item == month)
    const day = JSON.stringify(date[1]).substring(1, 3)
    const d = new Date()
    d.setFullYear(year, monthNo, day);
    this.setState({ expiryDate: d.getTime() })
  }
  getPlan = async () => {
    const localUser = getLocalUser();
    const tenantId = localUser.tenantId;
    await axios.get(backend_url+`billing/${tenantId}`).then((res) => {
      const data = res.data;
      // console.log("data fetched is",res.data[0]);
      if (res.data.length === 0) {
        this.setState({ open: true })
      }
      // console.log(data[0].expiryDate.split(" "));        
      this.setState({ expiryDateArray: data[0]?.expiryDate.split(" ") })
      this.setExpiryDate(this.state.expiryDateArray)
    })
  }
  checkExpiry = () => {
    const expd = new Date(this.state.expiryDate);
    const date = new Date()
    date.setFullYear(2022, 4, 25)
    // console.log("date is",expd.getTime())
    if (expd.getTime() && (expd.getTime() > date.getTime())) {
      // console.log(expd.getTime(),date.getTime());
      return false
    }
    else {
      return true
    }
  }
  ExistingSalesroom = async () => {
    const Salesrooms=[];
    const localUser = getLocalUser();
    const url = backend_url + 'salesroom/salesroom/' + localUser.tenantId;
    const url_web = backend_url + 'salesroom-webinar/salesroomWeb/' + localUser.tenantId;
    const url_live = backend_url + 'salesroom-live-stream/salesroomLive/' + localUser.tenantId;
    await axios.get(url)
      .then((res) => {
        Salesrooms.push(...res.data);
      }).catch((err) => {
        console.log(err);
      })
    await axios.get(url_web).then((res) => {
      Salesrooms.push(...res.data);
    })
    await axios.get(url_live).then((res) => {
      // console.log("all webinars",res.data);
      Salesrooms.push(...res.data);
    })
    this.setState({salesrooms:Salesrooms})
    console.log("salesroom are",Salesrooms);
  }
  componentDidMount() {
    this.FetchSalesrooms();
    // console.log("inside mount");
    this.getPlan();
    this.ExistingSalesroom();
  }

  render() {

    // let navigate = useNavigate();
    const setExpiryDate = (expDate) => {
      this.setState({ expDate: expDate })
    }
    const setPlanType = (planType) => {
      this.setState({ planType: planType })
    }
    const handleOpen = () => {
      this.setState({ open: true })
    };
    const handleClose = () => {
      this.setState({ open: false })
    }
    const redirect = () => {
      console.log("inside redirect");
      return <Route path="/signIn" element={<Navigate to="/signIn" />} />
    }
    const expired = this.checkExpiry()
    // console.log("expired",expired);
    if (expired) {
      console.log("plan is expired");
      // navigate("/signIn", { replace: true });
      redirect();
    }
    else if (!expired) {
      console.log("your time is left so not expired");
    }
    return (
      <div className={styles.home_wrapper}>
        <Header title={'Home'} links={['Digital Sales Room']} />
        <div className={styles.card_wrapper}>
        <div className={styles.card_body}>
      <div className={styles.text}>
        <h4 className={styles.room_title}>Welcome to tellselling digital sales platform</h4>
        <p className={styles.card_text}>With supporting text below as a natural lead-in to additional content.</p>
        <Link className={styles.link} to={AllRoutes.selectRoomType}>
          Create Digital Sales Room
        </Link>
      </div>
    </div>
    {this.state.salesrooms?.slice(0,2).map((i)=>{
      return <SalesRoomCard data={i} />
    })}
          {/* <SalesRoomCard imageUrl={url3} /> */}
        </div>
        <BillingPlan open={this.state.open} handleClose={handleClose} setPlanType={setPlanType} planType={this.state.planType} expiryDate={this.state.expDate} setExpiryDate={setExpiryDate} />
      </div>
    );
  }
}

export { HomePage };
