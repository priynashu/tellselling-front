import './style.css'
import {Card,Col,Row} from 'react-bootstrap'
import {useEffect, useState} from 'react'
import axios from 'axios'
import {GrApps} from 'react-icons/gr'
import $ from 'jquery'
// const htmlFile = require("./salesroom-live.html")
const SalesroomPreview = ()=>{
    const [data,setData] = useState();
    $('#content').fadeIn(1500);
    useEffect(()=>{
        getData()
    },[])
    const getData=async()=>{
        await axios.get("http://localhost:5000/salesroom-live-stream/").then((res)=>{
            const data = res.data
            console.log("data inside ajax",data);
            setData(data[0])
            
        })
    }
    const LoadEvent = (data)=>{        
        console.log("data is",data);
        return(<div id="events">
        <div className="card event-card">
            <div className=" card-image">
                <img
                className="card-event-image"
                src={data?.thumbnail}/>
                <a href={data?.fileCdnLink} target='_blank' className="btn-floating halfway-fab waves-effect waves-light"
                    style={{backgroundColor:"#1c67f3"}}>
                    {/* <i className="material-icons">cloud_download</i> */}
                </a> 
            </div>
            <div className="card-content">
                <b>Sales Demo Live</b>
                <p>new Date() <button>Add to Calender</button></p>
                <br/>
                <p>Hosted By {data?.sales_person}</p>
                <strong>tellselling.tech</strong>
            </div>
        </div>
    </div>)
    }
    const LoadContent = (section_name)=>{
        console.log("data is ",section_name);
        return(
            data?.contents[0].contents.map((item)=>{
                return(<div className="card">
                <div className="card-image">
                    <img
                        src= {item.thumbnail }/>
                    <a href={item.fileCdnLink} target='_blank' className="btn-floating halfway-fab waves-effect waves-light"
                        style={{backgroundColor:"#1c67f3"}}>
                        {/* <i class="material-icons">cloud_download</i> */}
                    </a>
                </div>
                <div className="card-content">
                    <b>{item.resourceTitle}</b>
                </div>
            </div>)
            })
            
        )
    }
    const handleSectionClick=()=>{
        document.getElementById('events').classList.toggle('clear')
    }
    const handleEventClick = ()=>{
        document.getElementById('contents').classList.toggle('clear')
    }
return (    
    <><div>
  <div id="loader">
  </div>
  <div id="content" className="container">
    <h1 style={{"color":"#e9e9e9"}} className="title" />
    <Row>
      {/*Navigation*/}
      <Col sm={3}className="col s3 sticky">
        <p className="event" onClick={handleEventClick}><i className="fa-solid house-icon fa-house" />Event</p>
        <b>Content Sections</b>
        <div className="collection" style={{"border":"none","borderRight":"0.5px solid #cccccc"}}>
        <a className="collection-item" data-section="`+ content[0].section_name + `" onClick={handleSectionClick} > 
        <i className="material-icons content-nav-icon"><GrApps/></i>{data?.contents[0].section_name}</a>
        </div>
      </Col>
      {/*Contents*/}
      <Col sm={6}className="col s6" style={{"height":"100vh","overflowY":"scroll","padding":"20px"}}>
        <div className="container">          
        <div id = "events"className="event clear">
        {LoadEvent(data)}          
        </div>            
          <div id="contents" className="contents">
              {LoadContent(data?.contents[0].section_name)}
          </div>
        </div>
      </Col>
      {/*Sales Actions*/}
      <Col sm={3} className="col s3 sticky">
        <b className="single-line">Salesroom for {data?.title}<b className="title" /> </b>
        <hr />
        <b>Contact : {data?.sales_person}</b>
        <span className="sales_person" />
        <video id="my-video" className="video-js" controls preload="auto" style={{"width":"100%","height":"auto","borderRadius":"5px","marginTop":"10px"}} data-setup="{}">
          <source src={data?.welcome_message.url} type="video/mp4" />
          <p className="vjs-no-js">
            To view this video please enable JavaScript, and consider upgrading to a
            web browser that
          </p>
        </video>
        <a className="waves-effect waves-light btn modal-trigger cta-btn" href="#modal1">BOOK A MEETING</a>
        <a className="waves-effect waves-light btn-small cta-btn-outline"><i className="material-icons" style={{"float":"left"}}>chat_bubble_outline</i> Ask a question</a>
        <hr />
        <b className="share-head">Share this room</b>
        <div className="social-share" style={{"width":"100%"}}>
          <span className="mini">
            <a href="#" style={{"color":"#1c67f3","fontSize":"12px"}}><i className="fa-solid fa-envelope" /> Share
              via email</a>
          </span>
        </div>
        <b className="share-head">Social Medias</b>
        <div className="social-share" style={{"width":"100%"}}>
          <a href="#" className="social-link"><i className="fa-brands fa-facebook" /></a>
          <a href="#" className="social-link"><i className="fa-brands fa-twitter" /></a>
          <a href="#" className="social-link"><i className="fa-brands fa-linkedin-in" /></a>
          <a href="#" className="social-link"><i className="fa-brands fa-google" /></a>
        </div>
      </Col>
    </Row>
  </div>
  <div id="modal1" className="modal">
    <div className="modal-content" style={{"padding":"0px !important"}}>
      <div className="calendly-inline-widget" data-url="https://calendly.com/username" style={{"minWidth":"320px","height":"580px"}}>
      </div>
    </div>
  </div>
</div></>
    // <iframe src="htmlFile" frameborder="0"></iframe>
)
}
export default SalesroomPreview