import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Col, Row, Container, Form, Button } from 'react-bootstrap';
import TagsInput from 'react-tagsinput'
import 'react-tagsinput/react-tagsinput.css' // If using WebPack and style-loader.
import axios from 'axios';
import { AllRoutes } from '../../../../utils/AllRoutes';
import urlParser from 'url-parse'
import { Link } from 'react-router-dom';
export class Info extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: this.props.InfoData,
            tags: [],
            link: this.props.InfoData.link,
            thumbnail: this.props.InfoData.thumbnail,
            fullDate:this.props.InfoData.fullDate,
        }
    }
    render() {
        
        const url = window.location.href;
        const query = urlParser(url).query;

        const HandleInput = (e) => {

            const temp = this.props.InfoData;
            temp[e.target.name] = e.target.value;
            this.setState({ data: temp });
        }
        const submitForm = (e) => {
            e.preventDefault();
            const final_data = {
                name: this.state.data.name,
                thumbnail: this.state.thumbnail,
                description: this.state.data.description,
                tags: this.state.tags,
                link: this.state.data.link
            }
            this.setState({ data: final_data });
            this.props.UpdateInfo(final_data);
            this.props.UpdateScreen("SALESROOM");
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
                this.setState({ thumbnail: url });
            }).catch((err) => {
                console.log(err);
            });
        }
        return (
            <Container style={{ backgroundColor: '#ffffff', padding: '15px' }} >
                <h4>Digital Salesroom - Info</h4>
                <Form onSubmit={submitForm}>
                    <Form.Group className="mt-3 mb-2">
                        <Form.Label>Name</Form.Label>
                        <Form.Control name="name" onChange={HandleInput} type="text" placeholder="Enter name" value={this.state.data.name} required />
                    </Form.Group>

                    <Form.Group className="mt-3 mb-2">
                        <Form.Label>Thumbnail pic</Form.Label>
                        <Form.Control type="file" name="thumbnail" onChange={HandleThumbnail} />
                    </Form.Group>

                    <Form.Group className="mt-3 mb-2">
                        <Form.Label>Description</Form.Label>
                        <Form.Control type="text" name="description" onChange={HandleInput} value={this.state.data.description} placeholder='This is a good example of digital sales room' required />
                    </Form.Group>

                    <Form.Group className="mt-3 mb-2">
                        <Form.Label>Tags</Form.Label>
                        <TagsInput value={this.state.tags}
                            onChangeInput={handleTags} onChange={handleTags} name='tags' addKeys={[9, 13, 32, 188]} required />
                    </Form.Group>

                    <Form.Group className="mt-3 mb-2">
                        <Form.Label>Link</Form.Label>
                        <Form.Control name="link" onChange={HandleInput} type="text" placeholder="Enter link" value={(query.length)? query.substr(1,query.length) :this.state.data.link} required  contentEditable={false}/>
                    </Form.Group>

                    <Button className="mt-2" variant="success" type="submit">
                        Continue
                    </Button>
                    <Link className="mt-2 btn btn-outline-danger" to={AllRoutes.selectRoomType} style={{ marginLeft: 10 }} variant="outline-danger" type="submit">
                        Cancel
                    </Link>
                </Form>
            </Container >
        )
    }
}

export default Info
