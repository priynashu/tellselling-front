import $ from "jquery";
import React, { Component, createRef } from "react";
import ReactDOM from "react-dom";
import axios from 'axios';
import { getLocalUser } from '../../../utils/GetLocalUser';

import { backend_url } from '../../../utils/Config';
import { toast } from 'react-toastify';
import urlParser from "url-parse"
import "./style.css";

window.jQuery = $;
window.$ = $;

require("jquery-ui-sortable");
require("formBuilder");

var obj = null;
export class FormEditor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contents: [],
            isLoaded: false,
        }
    }
    fb = createRef();
    componentDidMount() {
        // const url = window.location.href;
        // const query = urlParser(url).query;
        
            const formData=this.props.contents||{};
        
        
        obj = $(this.fb.current).formBuilder({formData});
        // if (query.length != 0) {
        //     const localUser = getLocalUser();
        //     const link = backend_url+'forms/' + localUser.tenantId + "/" + query.substr(1, query.length);
        //     axios.get(link)
        //         .then((res) => {
        //             const data = res.data;
        //             if (this.state.contents.length == 0) {
        //                 //this.setState({ contents: JSON.parse(data.content) });
        //                 const formData = JSON.parse(data.content);
        //                 this.setState({ isLoaded: true });
        //                 obj = $(this.fb.current).formBuilder({ formData });
        //                 console.log(this.state.contents)
        //             }
        //             console.log(data.content);
        //         }).catch((err) => { console.log(err) });
        // } else {
        //     obj = $(this.fb.current).formBuilder();
        // }
    }
    render() {
        console.log("_id",this.props._id);
        const Save = () => {
            // const name = prompt('Enter Form Name');
            const data = obj.actions.getData('json', true);
            console.log("data save is",JSON.parse(data));
            
                // console.log(data);
                //preparing data
                const localUser = getLocalUser();
                const formData = {
                    tenantId: localUser.tenantId,
                    data:this.props.data,
                    thumbnail:this.props.thumbnail,
                    contents: JSON.parse(data),   
                    _id:this.props._id                 
                }
                axios.post(backend_url+'forms/create', formData).then((res) => {
                    console.log("form res",res);
                    if(res.status===201){
                        toast.success('Form updated', {
                            position: toast.POSITION.BOTTOM_LEFT,
                        });
                    }
                    else if(res.status===200){
                        toast.success('Form created', {
                            position: toast.POSITION.BOTTOM_LEFT,
                        });
                    }
                    
                }).catch(err => {
                    toast.error(err.message, {
                                    position: toast.POSITION.BOTTOM_LEFT,
                                });
                });
            // } else {
            //     // if (name.length == 0) {
            //         toast.error('Give a name', {
            //             position: toast.POSITION.BOTTOM_LEFT,
            //         });
                // } else {
                //     toast.error('Make a form first', {
                //         position: toast.POSITION.BOTTOM_LEFT,
                //     });
                // }
            
        }
        return (

            <>
                <h3>Form Editor</h3>
                <div id="fb-editor" ref={this.fb} />
                <button className="btn btn-success" onClick={Save}>Save</button>
            </>

        );
    }
}

export default FormEditor
