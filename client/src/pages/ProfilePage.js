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
  Image,
} from 'react-bootstrap';

function ProfilePage() {
  return (
    <>
      {/* <Navigation /> */}
      <Container fluid>
        <Row>
          <Col xs={2} id='sidebar-wrapper'>
            <Sidebar />
          </Col>
          <Col xs={10} id='page-content-wrapper'>
            <Row className='justify-content-md-center mb-5'>
              <h1>Property Profile</h1>
            </Row>
            <Row>
              <Col>
                <h3 className='text-center'>Juragan Kosan</h3>
              </Col>
            </Row>
            <Row>
              <Col>
                <div
                  className='text-center mt-3'
                  // style={{ backgroundColor: '#db0000' }}
                >
                  <Image
                    src='https://images.unsplash.com/photo-1455587734955-081b22074882?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80'
                    class='rounded'
                    alt='Kamar Kosan'
                    style={{ width: '80%' }}
                    rounded
                  />
                </div>
              </Col>
              <Col className='align-items-center justify-content-center'>
                <h3>Address : Jalan Kosan</h3>
                <h3>Phone Number: 082242439xxx</h3>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default ProfilePage;
