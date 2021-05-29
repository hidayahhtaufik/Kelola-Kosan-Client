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

function TenantPage() {
  return (
    <>
      {/* <Navigation /> */}
      <Container fluid>
        <Row>
          <Col xs={2} id='sidebar-wrapper'>
            <Sidebar />
          </Col>
          <Col xs={10} id='page-content-wrapper'>
            <Row className='justify-content-md-center'>
              <h1>Halaman Tenant</h1>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default TenantPage;
