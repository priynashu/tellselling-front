import React from 'react'
import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'
import {BarChart} from '../Graphs/Bar'
const Bar_1 =()=>{
return <Container>
<Card style={{ width: '18rem' }}>

<Card.Body>
  <Card.Title>Card Title</Card.Title>
  <BarChart style={{objectFit:"cover"}}/>  
</Card.Body>
</Card>
</Container>
}
export default Bar_1;