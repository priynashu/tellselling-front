import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import { Button, Container, Table } from 'react-bootstrap';
import axios from 'axios'
export class Guests extends Component {
  constructor(props){
    super(props);
    this.state={
      data:{}
    }
  }
  getData = async()=>{
    console.log("inside get data");
    await axios.get(`http://localhost:5000/salesroom-live-stream/${this.props.link}`).then((res)=>{        
      console.log("data fetched",res.data);
        this.setState({data:res.data})
    })
  }
  componentDidMount(){
    this.getData();
  }
  render() {
    return (
      <>
        <Container className='my-2 mx-2'>
          <h4>Guests</h4>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {this.state.data?.guests?.map((item,index)=>{
                return(<tr>
                  <td>{index+1}</td>
                  <td>{item.First_Name}</td>
                  <td>{item.Last_Name}</td>
                  <td>{item.Email}</td>
                  <td>
                    <Button variant='success'>Approve</Button>&nbsp;
                    <Button variant='danger'>Decline</Button>
                  </td>
                </tr>)
              })}
              
            </tbody>
          </Table>
        </Container>
      </>
    )
  }
}

export default Guests