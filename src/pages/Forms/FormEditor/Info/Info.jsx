import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Col, Row, Container, Form, Button } from 'react-bootstrap';
import TagsInput from 'react-tagsinput'
import 'react-tagsinput/react-tagsinput.css' // If using WebPack and style-loader.
import axios from 'axios';
import urlParser from 'url-parse'
export class Info extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: {name:"",description:""},
            tags: [],
            link: '',
            thumbnail: ''
        }
    }
    render() {
        const url = window.location.href;
        const query = urlParser(url).query;
        // console.log("data inside info",this.props.data);
        const HandleInput = (e) => {
            this.props.updateData(e.target.name,e.target.value)
            this.setState(prevState=>({
                data:{
                    ...prevState.data,[e.target.name]:e.target.value
                }
            }))
            // temp[e.target.name] = e.target.value;
            // this.setState({ data: temp });
            // console.log("data is",this.state.data);
        }
        const submitForm = (e) => {
            e.preventDefault();
            this.props.setScreen("editor") 
            // console.log("data sent is ");
        }
        const handleTags = (tags) => {
            this.setState({ tags })
        }
        const HandleThumbnail = (e) => {
            this.setState({ thumbnail: e.target.files[0] })
            //Upload thumbnail
            const formData = new FormData();
            formData.append("file", e.target.files[0]);
            formData.append("upload_preset", "ce0qpcmg");
            axios.post("https://api.cloudinary.com/v1_1/tellselling/image/upload", formData).then((res) => {
                const url = res.data.url;
                this.props.updateThumbnail(url)
            }).catch((err) => {
                console.log(err);
            });
        }
        return (
            <Container style={{ backgroundColor: '#ffffff', padding: '15px' }} >
                <h4>Form - Info</h4>
                <Form>
                    <Form.Group className="mt-3 mb-2">
                        <Form.Label>Name</Form.Label>
                        <Form.Control name="name" onChange={HandleInput} type="text" placeholder="Enter name" value={this.state.data.name||this.props.data.name} required />
                    </Form.Group>

                    <Form.Group className="mt-3 mb-2">
                        <Form.Label>Thumbnail pic</Form.Label>
                        <Form.Control type="file" name="thumbnail" onChange={HandleThumbnail} />
                    </Form.Group>

                    <Form.Group className="mt-3 mb-2">
                        <Form.Label>Description</Form.Label>
                        <Form.Control type="text" name="description" onChange={HandleInput} value={this.state.data.description||this.props.data.description} placeholder='This is a good example of digital sales room' required />
                    </Form.Group>

                    <Button className="mt-2" variant="success" onClick={submitForm}>
                        Continue
                    </Button>
                    <Button className="mt-2" style={{ marginLeft: 10 }} variant="outline-danger" type="submit">
                        Cancel
                    </Button>
                </Form>
            </Container >
        )
    }
}

export default Info
