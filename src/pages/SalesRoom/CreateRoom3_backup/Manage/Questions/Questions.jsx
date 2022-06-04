import React, { Component, createRef } from 'react'
import $ from "jquery";
import urlParser from "url-parse"
import axios from 'axios';
import "./style.css";
import { Button } from 'react-bootstrap';

window.jQuery = $;
window.$ = $;
require("jquery-ui-sortable");
require("formBuilder");

var obj = null;
export class Questions extends Component {
  fb = createRef();
  componentDidMount() {
    const url = window.location.href;
    const query = urlParser(url).query;
    const form=[
      {
        "type": "text",
        "required": false,
        "label": "First Name",
        "className": "form-control",
        "name": "text-1645267055463-0",
        "access": false,
        "subtype": "text"
      },
      {
        "type": "text",
        "required": false,
        "label": "Last Name",
        "className": "form-control",
        "name": "text-1645267075412-0",
        "access": false,
        "subtype": "text"
      },
      {
        "type": "text",
        "required": false,
        "label": "Email",
        "className": "form-control",
        "name": "text-1645267089480-0",
        "access": false,
        "subtype": "text"
      }
    ]
    obj = $(this.fb.current).formBuilder({ form} );
    
  }
  render() {
    const Save = ()=>{
      const data = obj.actions.getData('json', true);
      console.log(data);
    }
    return (
      <>
        <br/>
        <h4 >Edit Questionaries</h4>
        <div id="fb-editor" ref={this.fb} />
        <Button onClick={Save}>Save</Button>
      </>

    )
  }
}

export default Questions