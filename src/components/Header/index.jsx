import React, { Component } from 'react'
import { NavLink, useLocation } from 'react-router-dom';
import { getLocalUser } from '../../utils/GetLocalUser';
import { AllRoutes } from '../../utils/AllRoutes';
import { BsChevronRight } from 'react-icons/bs'
import { Row, Col } from 'react-bootstrap'
import styles from './style.scss';
export class Header extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className={styles.wrapper}>
                <Row>
                    <Col sm="auto">
                        <h2 style={{ fontSize: '1.414rem', fontWeight: '500', color: '#636363', paddingRight: '1rem', borderRight: '1px solid #d6dce1' }}>{this.props.title}</h2>
                    </Col>
                    {
                        this.props.links.map((data, key) => {
                            return (
                                <Col sm="auto" style={{ paddingTop: "5px", paddingLeft: "0", paddingRight: "0" }}>
                                    <a className={styles.after_title} style={{fontWeight: '400',color: '#7367f0',fontSize: '0.8rem', marginBottom: '20px', cursor: 'pointer'  }}>{data}</a>&nbsp;&nbsp;
                                    {
                                        (this.props.links.indexOf(data)==this.props.links.length)?<BsChevronRight style={{ fontSize: "12px", color: "gray", fontWeight: "900" }} />:<></>
                                    }                                    
                                </Col>
                            );
                        })
                    }

                </Row>
            </div>
        )
    }
}

export default Header;