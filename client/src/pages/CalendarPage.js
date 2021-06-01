import React from 'react';
import Sidebar from './components/Sidebar';
import Navigation from './components/Navigation';
import {
  Container,
  Row,
  Col,
  Button,
  Navbar,
  Nav,
  NavDropdown,
} from 'react-bootstrap';

function CalendarPage() {
  return (
    <>
      <Container fluid>
        <Row>
          <Col xs={2}>
            <Sidebar />
          </Col>
          <Col xs={10} style={{ padding: '20px' }}>
            <Row className='justify-content-md-center'>
              <h1
                className='text-center'
                style={{
                  fontWeight: 'bold',
                  fontSize: '50px',
                  color: '#343F56',
                }}
              >
                Calendar
              </h1>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default CalendarPage;
