import React, { Component } from 'react'
import { AllRoutes } from '../../utils/AllRoutes';
import { getLocalUser } from '../../utils/GetLocalUser';
import { backend_url } from '../../utils/Config';

import axios from 'axios';

import { FormCard } from '../../components';
import styles from './style.scss';
import thumbnail from './thumbnail.png'
import { Button, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import Empty from '../../components/Empty';
/**
 * @name FormManagementModule
 * @description To manage - create/view/edit/delete forms
 */
class Forms extends Component {
    //By default empty constructor
    //Datas to be fetched from backend once components get loaded
    constructor(props) {
        super(props);
        this.state = {
            forms: []
        }
    }
    componentDidMount() {
        //Component Loading Finishes
        this.GetSalesRooms();
    }
    GetSalesRooms = () => {
        //fetch all form data from server
        const localUser = getLocalUser();
        const url = backend_url+'forms/' + localUser.tenantId;
        console.log(url);
        axios.get(url)
            .then((res) => {
                this.setState({ forms: res.data });
                console.log(this.state.forms)
            }).catch((err) => {
                console.log(err);
            })
    }
    render() {
        return (
            <div className={styles.home_wrapper}>

                <Link to={AllRoutes.form} style={{float:'right'}}><Button variant="success">New Form</Button> </Link>
                <Header title={'Forms'} links={['Form Editor']}/>
                <div className={styles.card_wrapper}>
                    <Row>
                        {
                            this.state.forms.map((data, key) => {
                                return (
                                    <Col className='mt-2' xs={3} md={3} sm={3}>
                                        <FormCard title={data.formTitle} id={data._id} key={key} imageUrl={data.thumbnail||thumbnail} />
                                    </Col>
                                );
                            })
                        }
                        {
                            (this.state.forms.length==0)?<Empty/>:<></>
                        }
                    </Row>
                </div>
            </div>
        )
    }
}
export { Forms }

