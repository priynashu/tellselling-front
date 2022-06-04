import { Col, Row, Container } from 'react-bootstrap';
import ContentSelector from './ContentSelector';
import { ShareContent } from './ShareContent';
import 'bootstrap/dist/css/bootstrap.min.css';
import Preview from './Preview/Preview';
import Info from './Info/Info'
import { Component } from 'react';
import { toast } from 'react-toastify';
import Manage from './Manage/Manage'
import axios from 'axios';
import { getLocalUser } from '../../../utils/GetLocalUser';
import { backend_url } from '../../../utils/Config';
import urlParser from "url-parse"

class CreateRoom3 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //Important datas to create the salesroom
      info: { name: "", thumbnail: "", description: "", tags: [], link: Math.random().toString(36).slice(2), platform:'',stream_id:'',events:[] },
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
    }
  }

  //Saving content to server
  Save = () => {
    const localUser = getLocalUser();
    const salesroom = {
      tenantId: localUser.tenantId,
      title: this.state.info.name,
      events: this.state.info.events,
      platform :this.state.info.platform,
      stream_id:this.state.info.stream_id,
      description: this.state.info.description,
      tags: this.state.info.tags,
      thumbnail: this.state.info.thumbnail,
      link: this.state.info.link,
      welcome_message: this.state.welcome_message,
      sales_person: localUser.firstName+" "+localUser.lastName,
      contents: this.state.contents,
      prospects: this.state.prospectus,
      cta: JSON.stringify(this.state.cta),
    }
    axios.post('http://localhost:5000/salesroom-live-stream/create', salesroom).then((res) => {
      toast.success('Salesroom saved', {
        position: toast.POSITION.BOTTOM_LEFT,
      });
    }).catch(err => console.log(err));
  }

    //Update content to server
    Update = () => {
      const localUser = getLocalUser();
      const salesroom = {
        tenantId: localUser.tenantId,
        id: this.state.salesroom_id,
        title: this.state.info.name,
        description: this.state.info.description,
        tags: this.state.info.tags,
        thumbnail: this.state.info.thumbnail,
        link: this.state.info.link,
        welcome_message: this.state.welcome_message,
        sales_person: localUser.firstName+" "+localUser.lastName,
        contents: this.state.contents,
        prospects: this.state.prospectus,
        cta: JSON.stringify(this.state.cta),
      }
      axios.post('http://localhost:5000/salesroom/update', salesroom).then((res) => {
        toast.success('Salesroom saved', {
          position: toast.POSITION.BOTTOM_LEFT,
        });
      }).catch(err => console.log(err));
      console.log(salesroom);
    }

  GetDataIfEdit(){
    //check if edit mode is open
    //check for id method
    const url=window.location.href;
    const query=urlParser(url).query;
    if(query.length!=0){
      this.setState({current_screen:'SALESROOM'});
      const localUser = getLocalUser();
      const link='https://frontend-340522.de.r.appspot.com/salesroom-live-stream/'+localUser.tenantId+"/"+query.substr(1,query.length);
      axios.get(link)
      .then((res)=>{
        const data=res.data;
        this.setState({salesroom_id:data._id});
        this.setState({prospectus:data.prospects});
        this.setState({info: { name: data.title, thumbnail: data.thumbnail, description: data.description, tags: data.tags, link: data.link, platform: data.platform, stream_id: data.stream_id, events:data.events }})
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
      console.log(info);
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
    /**
     * ALL THE SCREEN COMPONENT DATAS
     */
    //Info Page Screen
    const InfoScreen = () => {
      return (<Info UpdateScreen={UpdateScreen} UpdateInfo={UpdateInfo} InfoData={this.state.info} />);
    }

    const ManageScreen = () =>{
      return (<Manage UpdateScreen={UpdateScreen} UpdateInfo={UpdateInfo} InfoData={this.state.info} />);
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
                //Save Function
                Save={(this.state.salesroom_id.length==0)?this.Save:this.Update}  />
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

export { CreateRoom3 };
