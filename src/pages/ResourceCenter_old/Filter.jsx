import React, {useState, Fragment, useEffect, Component} from 'react';
import styles from './drawerstyles.module.scss';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CloseIcon from '@mui/icons-material/Close';
import {Row, Col, Container, Button, Form} from "react-bootstrap"
import {BiEdit} from 'react-icons/bi';
import axios from 'axios';
import {getLocalUser} from '../../utils/GetLocalUser';
import TagsInput from 'react-tagsinput';
import 'react-tagsinput/react-tagsinput.css'
import EditableLabel from 'react-inline-editing';


class Filter extends Component {
    constructor(props){
        super(props);
        this.state = {
            tags: [],
            datas: this.props.data,
            selected_text: '',
            edited_text: ''
        };
    }
        
        
    //   this._handleFocus = this._handleFocus.bind(this);
    //   this._handleFocusOut = this._handleFocusOut.bind(this)

    
  
    
    
   
    
    
    render() {
        // console.log("edited text",this.state.edited_text);
        // console.log("update ",this.props.updateData);
        let handleFocustext="";
        const handleTags = (tags) => {
            this.setState({tags})
            console.log("handle tags",tags,this.state.tags);
        }
        const Add = () => {
            const temp = this.state.datas;
            console.log("add tag",this.state.tags);
            // const temp = [{}];
            this.state.tags.forEach((val, key) => {
                temp.push({name:val,count:0});
            })
            //this.setState({ datas: temp });
            this.props.updateData(temp);
            console.log("temp",temp);
            this.setState({tags: []});
        }
        const Delete = (item) => {
            const temp = this.state.datas;
            const pos = temp.indexOf(item);
            temp.splice(pos, 1);
            this.setState({datas: temp});
            console.log('delete');
            this
                .props
                .updateData(temp);
        }
        const handleFocus =(text)=>{
                console.log("inside handle focus",text);
                handleFocustext=text;
        }
        const handleFocusOut=(text)=> {
            // console.log('Left editor with text: ' + text);
            console.log("focus text",handleFocustext);
            // this.setState({edited_text:text})            
            const temp = this.state.datas;
            temp?.map((item)=>{
                if(item.name===handleFocustext){
                    item.name=text
                }
            })            
            this.setState({datas:temp})
            console.log("updated data is ",this.state.datas);
            this
                .props
                .updateData(temp);
        }
        // this.setState({selected_text:handleFocustext})
        const Filters = () => {
            return (
                <div className='mt-3'>
                    {this
                        .state
                        .datas
                        ?.map((filter, k) => {
                            return (
                                <Container
                                    className='mt-1'
                                    style={{
                                    fontSize: '14px',
                                    color: 'gray'
                                }}>
                                    <Row>
                                        <Col sm={10}>
                                            <Row>
                                                <Col sm={6}>
                                                    <EditableLabel
                                                        text={filter.name}
                                                        labelClassName='myLabelClass'
                                                        inputClassName='myInputClass'
                                                        inputWidth='200px'
                                                        inputFontWeight='bold'
                                                        onFocus={handleFocus}
                                                        onFocusOut={handleFocusOut}
                                                        
                                                        />
                                                    {/* <EditableLabel
                                                        text={filter.name}
                                                        onFocusOut={this.handleFocusOut}
                                                        onFocus={this.handleFocus}
                                                        inputWidth='150px'/> */}
                                                </Col>
                                                <Col sm={2}>
                                                    <p>({filter.count})</p>
                                                </Col>
                                            </Row>
                                        </Col>
                                        <Col
                                            sm={{
                                            span: 1,
                                            offset: 1
                                        }}>
                                            <Button
                                                type='submit'
                                                disabled={(filter.count != 0)
                                                ? true
                                                : false}
                                                variant="secondary"
                                                style={{
                                                float: "right"
                                            }}
                                                onClick={() => {
                                                Delete(filter)
                                            }}
                                                className={styles.addBtn}
                                                size="sm">Delete</Button>
                                        </Col>
                                    </Row>
                                </Container>
                            )
                        })}
                </div>
            )
        }
        return (
            <Fragment>
                <Drawer anchor='right' open={this.props.isOpen} onClose={this.props.onClose}>
                    <Box className={styles.drawer_wrapper}>
                        <div className={styles.header}>
                            <p className={styles.title}>{this.props.title}</p>
                            <span className={styles.close_icon} onClick={this.props.onClose}>
                                <CloseIcon/>
                            </span>
                        </div>
                        <Filters/>
                        <Container className="mt-4">
                            <Row className="mt-2">
                                <Col sm={10}>
                                    <TagsInput
                                        value={this.state.tags}
                                        addKeys={[9, 13, 32, 188]}
                                        onChangeInput={handleTags}
                                        onChange={handleTags}
                                        name='tags'
                                        style={{
                                        height: '40px !important'
                                    }}
                                        required/>
                                </Col>
                                <Col
                                    sm={{
                                    span: 1,
                                    offset: 1
                                }}>
                                    <Button
                                        type='submit'
                                        onClick={Add}
                                        variant="secondary"
                                        style={{
                                        float: "right",
                                        height: '100%'
                                    }}
                                        className={styles.addBtn}
                                        size="sm">Add</Button>
                                </Col>
                            </Row>
                        </Container>

                    </Box>
                </Drawer>
            </Fragment>
        );
    }
}
export default Filter;
