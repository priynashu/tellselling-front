import  { Col, Row, Container } from 'react-bootstrap';
import ContentSelector from './ContentSelector';
import { ShareContent } from './ShareContent';
import 'bootstrap/dist/css/bootstrap.min.css';
import Preview from './Preview/Preview';
// import Info from './Info/Info'
import {Info} from './Info/Info';
import { Component } from 'react';
import { toast } from 'react-toastify';
import Manage from './Manage/Manage'
import axios from 'axios';
import { getLocalUser } from '../../../utils/GetLocalUser';
import { backend_url } from '../../../utils/Config';
import urlParser from "url-parse"

class CreateRoom2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //Important datas to create the salesroom
      info: { eventName: "", thumbnail: "", eventPlace: "", meetingValues: {}, eventType:"",link: Math.random().toString(36).slice(2), platform:'',stream_id:'',dateTime:"",sales_person:"",access:{},fullDate:"",endTime:""},
      contents: [],
      //Current Screen Transition
      current_screen: 'INFO',
      current_share_step: 1,
      //These are temporary datas
      sections: [],
      selectedCategories: [],
      selectedTags: [],
      searchKeyword: '',
      //Upcoming datas
      sales_person_name: 'here goes the name', // This would hold name of the salesroom person
      amount: '', // Amount 
      welcome_message: '', // Cloudinary Video URL
      actions:[],
      cta: [], // Call to Action / Customer Engagement Methods (String Array)
      prospectus: [], //Prospectus : Will hold Array or JSON,
      content_filters:{categories:[],content_area:'',search_keyword:'',tags:[]},
      //datas related to save/update
      salesroom_id:'',
      question:[{"type": "text","required": false,"label": "First Name","className": "form-control","name": "text-1645267055463-0","access": false,"subtype": "text"
        },{"type": "text","required": false,"label": "Last Name","className": "form-control","name": "text-1645267075412-0","access": false,"subtype": "text"},
        {"type": "text","required": false,"label": "Email","className": "form-control","name": "text-1645267089480-0","access": false,"subtype": "text"
        },{"type": "text","required": false,"label": "Organization","className": "form-control","name": "text-1645267075412-0","access": false,"subtype": "text"}
      ],
      domains:[]
    }
  }

  //Saving content to server
  Save = () => {
    console.log("inside save");
    
    const localUser = getLocalUser();
    const salesroom = {
      tenantId: localUser.tenantId,
      title: this.state.info.eventName,
      eventPlace: this.state.info.eventPlace,
      meetingValues :this.state.info.meetingValues,      
      eventType: this.state.info.eventType,
      tags: this.state.info.tags,
      thumbnail: this.state.info.thumbnail,
      link: this.state.info.link,
      dateTime:this.state.info.dateTime,
      endTime:this.state.info.endTime,
      welcome_message: this.state.welcome_message,
      sales_person: this.state.info.sales_person,
      access:this.state.info.access,      
      contents: this.state.contents,
      prospects: this.state.prospectus,
      cta: JSON.stringify(this.state.cta),
      question:this.state.question,
      fullDate:this.state.info.fullDate
    }
    axios.post(backend_url+'salesroom-webinar/create', salesroom).then((res) => {
      toast.success('Salesroom saved', {
        position: toast.POSITION.BOTTOM_LEFT,
      });
    }).catch(err => console.log(err));
    const publishData = {
      domains:this.state.domains,
      link:this.state.info.link,
      type:"salesroom-web",      
      method:'create'
    }
    axios.post(backend_url+`salesroom-webinar/publish/:${this.state.info.link}`, publishData).then((res) => {
      this.setState({ salesroom_id: res.data._id });
      console.log("web publish data saved");
    }).catch(err => console.log(err));
  }

    //Update content to server
    Update = () => {
      const localUser = getLocalUser();
      const salesroom = {
        tenantId: localUser.tenantId,
        title: this.state.info.eventName,
        eventPlace: this.state.info.eventPlace,
        meetingValues :this.state.info.meetingValues,      
        eventType: this.state.info.eventType,
        tags: this.state.info.tags,
        thumbnail: this.state.info.thumbnail,
        link: this.state.info.link,
        dateTime:this.state.info.dateTime,
        endTime:this.state.info.endTime,
        welcome_message: this.state.welcome_message,
        sales_person: this.state.info.sales_person,
        access:this.state.info.access,      
        contents: this.state.contents,
        prospects: this.state.prospectus,
        cta: JSON.stringify(this.state.cta),
        fullDate:this.state.info.fullDate,
        question:this.state.question
      }
      axios.post(backend_url+'salesroom-webinar/update', salesroom).then((res) => {
        toast.success('Salesroom saved', {
          position: toast.POSITION.BOTTOM_LEFT,
        });
      }).catch(err => console.log(err));
      console.log(salesroom);

      const publishData = {
        domains:this.state.domains,
        link:this.state.info.link,
        type:"salesroom-web",
        method:'update'
      }
      axios.post(backend_url+`salesroom-webinar/publish/:${this.state.info.link}`, publishData).then((res) => {
        console.log("web publish data saved");
      }).catch(err => console.log(err));
    }

  GetDataIfEdit(){
    //check if edit mode is open
    //check for id method
    const url=window.location.href
    const query=urlParser(url).query
    const salesroom_link = query.substring(1,query.length)    
    // console.log("query:",url,"link:",salesroom_link);
    if(query.length!=0){
      this.setState({current_screen:'SALESROOM'});
      const localUser = getLocalUser();
      const link=backend_url+'salesroom-webinar/'+localUser.tenantId+"/"+salesroom_link;
      // console.log("link 1",link);
      axios.get(link)
      .then((res)=>{
        const data=res.data;
        // console.log("inside get edit",data);
        this.setState({salesroom_id:data._id});
        this.setState({prospectus:data.prospects});
        this.setState({question:data.question})
        this.setState({info: { title: data.title, thumbnail: data.thumbnail, tags: data.tags, link: data.link, eventPlace: data.eventPlace, eventType: data.eventType, meetingValues:data.meetingValues,dateTime:data.dateTime,fullDate:data.fullDate,endTime:data.endTime}})
        this.setState({contents:data.contents});
        const sections_temp=[];
        this.setState({cta: JSON.parse(data.cta)});
        
        //add sections
        data.contents.map((dat,k)=>{
          sections_temp.push(dat.section_name);
        })
        this.setState({sections:sections_temp})
        this.setState({welcome_message:data.welcome_message});
      }).catch((err)=>{console.log(err)});
      
      const publishData = {
        link:salesroom_link,
        method:'get'
      }
      
      axios.post(backend_url+`salesroom-webinar/publish/${this.state.info.link}`,publishData).then((res)=>{
        const data = res.data
        console.log("edit publish",data);
        this.setState({domains:data.domains})
      }).catch((err)=>{
        console.log(err);
      })
    }
  }
  UpdateCTA = (cta)=>{
    this.setState({cta})
    //console.log(cta);
  }
  //check 
  componentDidMount(){
    this.GetDataIfEdit();
  }
  render() {
    //Update Current Screen
    const UpdateScreen = (screen) => {
      this.setState({ current_screen: screen }); // Screen Transitions
    }
    const UpdateStep = (step) => {
      this.setState({ current_share_step: step });
    }
    /**
     * @description These Functions are made for child components to update 
     * datas of states of current component
     * @param {*}  
     */
    //Update Salesroom Info 
    const UpdateInfo = (info) => {
      this.setState({ info });
      console.log("updated info is",info);
    }
    //Update All Prospects from Child component
    const UpdateProspectus = (prospectus) => {
      this.setState({ prospectus });
    }
    const UpdateWelcomeMessage = (welcome_message) => {
      this.setState({ welcome_message });
    }
    const setContentFilters = (content_filters)=>{
      console.log(this.state.content_filters);
    }
    const updateQuestion = (data)=>{
      this.setState({question:data})
      // console.log("index",this.state.question);
    }
    const UpdatemeetingUrl = (data)=>{
      // console.log("index",data);
      this.setState(prevState => ({
        info: {
          ...prevState.info,         
          meetingValues: {                   
            ...prevState.info.meetingValues,   
            meetingUrl:data          
          }
        }
      }))
    }
    const UpdateEventPlace = (data)=>{
      this.setState(prevState=>({
        info:{
          ...prevState.info,
          eventPlace:data
        }
      }))
    }
    const updateDomains = (data)=>{
      console.log("index",data);
      this.setState({domains:data})
    }
    /**
     * ALL THE SCREEN COMPONENT DATAS
     */
    //Info Page Screen
    const InfoScreen = () => {
      return (<Info UpdateScreen={UpdateScreen} UpdateInfo={UpdateInfo} InfoData={this.state.info} />);
    }

    const ManageScreen = () =>{
      return (<Manage UpdateScreen={UpdateScreen} UpdateInfo={UpdateInfo} updateQuestion={updateQuestion} InfoData={this.state.info} question={this.state.question} UpdatemeetingUrl={UpdatemeetingUrl} UpdateEventPlace={UpdateEventPlace}/>);
    }



    //Salesroom Content Editing Screen
    const SalesroomScreen = () => {
      console.log(this.state.content_filters);
      return (
        <Container style={{ padding: '15' }}>
          <Row>
            <Col xs={8} md={8}>
              <ContentSelector
                //Change Screens
                UpdateScreen={UpdateScreen}
                //Salesroom Datas
                ContentsData={this.state.contents}
                //Temp data :- to keep the data in same screen even if the component re-renders
                SectionsData={this.state.sections}
                //Update Functions
                UpdateFilter={setContentFilters}
                Filters = {this.state.content_filters}
                //Info data
                info= {this.state.info}
                //Save Function
                Save={(this.state.salesroom_id.length==0)?this.Save:this.Update} 
                updateDomains = {updateDomains}
                domains = {this.state.domains}
                />
            </Col>
            <Col xs={4} md={4}>
              <ShareContent UpdateCTA={this.UpdateCTA} CTA={this.state.cta} UpdateProspectus={UpdateProspectus} Step={this.state.current_share_step} UpdateStep={UpdateStep} WelcomeMessage={this.state.welcome_message} UpdateWelcomeMessage={UpdateWelcomeMessage} Prospectus={this.state.prospectus} />
            </Col>
          </Row>
        </Container>
      );
    }

    //Salesroom Preview Screen
    const PreviewScreen = () => {
      return (<Preview UpdateScreen={UpdateScreen} WelcomeMessage={this.state.welcome_message} PreviewData={this.state.contents} />)
    }

    return (
      <>
        {
          //Code can be optimized in a more better way
          (this.state.current_screen == "INFO") ? <InfoScreen /> : <></>
        }
        {
          //Code can be optimized in a more better way
          (this.state.current_screen == "MANAGE") ? <ManageScreen /> : <></>
        }
        {
          //Code can be optimized in a more better way
          (this.state.current_screen == "SALESROOM") ? <SalesroomScreen /> : <></>
        }
        {
          //Code can be optimized in a more better way
          (this.state.current_screen == "PREVIEW") ? <PreviewScreen /> : <></>
        } 
      </>
    );
  }
};

export { CreateRoom2 };
