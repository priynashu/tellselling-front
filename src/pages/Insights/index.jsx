import React from 'react';
import { BarChart } from './Graphs/Bar.jsx'
import { BarChart_2 } from './Graphs/Bar2.jsx'
import { LineChart } from './Graphs/Line.jsx';
import Bar_1 from "./Cards/Bar-1"
import { DoughnutChart } from './Graphs/Doughnut'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Header from '../../components/Header/index.jsx';
const Insights = () => {

  return (
  <Container >
    <Header title={'Insights'} links={['Insights']}/>
    <Row className='mt-4'>
      <Col sm={6}>
        <Row>
          <Col sm={6}><BarChart_2 /></Col>
          <Col sm={6}><LineChart /></Col>
        </Row>
        <Row>
          <Col sm={12}><DoughnutChart /></Col>
        </Row>
      </Col>
      <Col sm={6}>
        <BarChart />
      </Col>
    </Row>
  </Container>);
};

export { Insights };
//461616