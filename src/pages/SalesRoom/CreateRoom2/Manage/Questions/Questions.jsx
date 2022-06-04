import React, { Component, createRef } from 'react'
import $ from "jquery";
import urlParser from "url-parse"
import axios from 'axios';
import { backend_url } from '../../../../../utils/Config';
import "./style.css";
import { Button } from 'react-bootstrap';

window.jQuery = $;
window.$ = $;
require("jquery-ui-sortable");
require("formBuilder");
// const form=[
//   {
//     "type": "text",
//     "required": false,
//     "label": "First Name",
//     "className": "form-control",
//     "name": "text-1645267055463-0",
//     "access": false,
//     "subtype": "text"
//   },
//   {
//     "type": "text",
//     "required": false,
//     "label": "Last Name",
//     "className": "form-control",
//     "name": "text-1645267075412-0",
//     "access": false,
//     "subtype": "text"
//   },
//   {
//     "type": "text",
//     "required": false,
//     "label": "Email",
//     "className": "form-control",
//     "name": "text-1645267089480-0",
//     "access": false,
//     "subtype": "text"
//   }
// ]
const formData = [
{type: "text",
      required: false,
      label: "First Name",
      className: "form-control",
      name: "text-1645267055463-0",
      access: false,
      subtype: "text"
    },
  {
        type: "text",
        required: false,
        label: "Last Name",
        className: "form-control",
        name: "text-1645267075412-0",
        access: false,
        subtype: "text"
      },
      {
            type: "text",
            required: false,
            label: "Email",
            className: "form-control",
            name: "text-1645267089480-0",
            access: false,
            subtype: "text"
          },
          {
            type: "text",
            required: false,
            label: "Organization",
            className: "form-control",
            name: "text-1645267075412-0",
            access: false,
            subtype: "text"
          },
  
];

var obj = null;
export class Questions extends Component {
  fb = createRef();
  componentDidMount() {
    const url = window.location.href;
    const query = urlParser(url).query;
    
    const formData=this.props.question;
    obj = $(this.fb.current).formBuilder({formData} );
    
  }
  render() {
    const Save = async(e)=>{
      e.preventDefault()
      const data = obj.actions.getData('json', true);
      console.log("data save is",JSON.parse(data));
      // console.log("backend Url is",backend_url);
     const updateData={
        question:JSON.parse(data),
        link:this.props.link
      }
      await axios.post(backend_url+"salesroom-webinar/update-question",updateData).then((res)=>{
        this.props.updateQuestion(JSON.parse(data))
        console.log(res.data);
      }).catch((err)=>{
        console.log(err);
      })
      
    }
    return (
      <>
        <br/>
        {/* <h4 >Edit Questionaries</h4> */}
        <div id="fb-editor" ref={this.fb} />
        <Button onClick={Save}>Save</Button>
      </>

    )
  }
}

export default Questions