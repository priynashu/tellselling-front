import React, { Component } from 'react'
import './style.css'
import urlParser from "url-parse"
import { useParams } from 'react-router-dom'
import axios from 'axios';
import Content from './Content';

export class SalesroomsLiveStream extends Component {
    constructor(props){
        super(props);
        this.state={
            data:{}
        }
    }
    FetchData = async () => {
        const query = urlParser(window.location.href).pathname;
        const link = query.substring(23, query.length);
        //const link = "";
        const url = "http://frontend-340522.de.r.appspot.com/salesroom-live-stream/get-salesroom-data/" + link;
        console.log(url);
        //console.log(url);
        await axios.get(url).then((res) => {
            this.setState({ data: res.data });
            const temp=[];
            temp.push(res.data);
            this.setState({data:temp});
            console.log(temp);
            document.title = res.data.title;
        }).catch((err) => {
            console.log(err);
        })
    }
    componentDidMount() {
        this.FetchData();
    }

    render() {
        return (
            <>
                {
                    (this.state.data.length==1)?<Content Contents={this.state.data}/>:<></>
                } 
            </>
        )
    }
}

export default SalesroomsLiveStream