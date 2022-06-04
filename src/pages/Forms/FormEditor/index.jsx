import React, { Component } from 'react'
import FormEditor from './FormEditor'
import urlParser from "url-parse"
import axios from 'axios'
import { getLocalUser } from '../../../utils/GetLocalUser';
import { backend_url } from '../../../utils/Config';
import Info from './Info/Info'
export class Form extends Component {
    constructor(props){
        super(props);
        this.state={
            data: {name:"",description:""},
            contents:[],
            screen:'info',
            thumbnail:"",
            _id:""
        }
    }
    getData(){
        const url = window.location.href;
        const query = urlParser(url).query;
        if (query.length != 0) {
            const localUser = getLocalUser();
            const link = backend_url+'forms/' + localUser.tenantId + "/" + query.substr(1, query.length);
            axios.get(link)
                .then((res) => {
                    const data = res.data;
                    console.log("data after get",data);
                    // if (this.state.contents.length == 0) {
                        this.setState({ contents: data.contents });
                        this.setState({data:{
                            name:data.formTitle,description:data.description
                        }})
                        this.setState({_id:data._id})
                        this.setState({thumbnail:data.thumbnail})
                        // console.log("data state",this.state.data);
                        
                        // const formData = JSON.parse(data.content);
                        // this.setState({ isLoaded: true });
                        // obj = $(this.fb.current).formBuilder({ formData });
                        // console.log(this.state.contents)
                    // }
                    // console.log(data.content);
                }).catch((err) => { console.log(err) });
            }
    }
    componentDidMount(){
        this.getData()
    }
    render() {
        const updateData = (name,value)=>{
            // console.log("name value : ",name,value);
            this.setState(prevState=>({
                data:{
                    ...prevState.data,[name]:value
                }
            }))
        }
        const updateThumbnail = (data)=>{
            console.log("thumb",data);
            this.setState({thumbnail:data})
        }
        const setScreen = (screen) =>{
            this.setState({screen});
        }
        return (
            <>
                {
                    (this.state.screen=="info")?<Info data={this.state.data} updateData={updateData}  updateThumbnail={updateThumbnail} setScreen={setScreen}/>:<FormEditor  data={this.state.data} thumbnail={this.state.thumbnail} contents={this.state.contents} _id={this.state._id}/>
                }
                  
                {/* <FormEditor contents={this.state.contents}/> */}
            </>
        )
    }
}

export default Form
