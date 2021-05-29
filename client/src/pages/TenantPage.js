import React from 'react';
import Sidebar from './components/Sidebar';
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
      <Container fluid>
        <Row>
          <Col xs={3} id='sidebar-wrapper'>
            <Sidebar />
          </Col>
          <Col xs={9} id='page-content-wrapper'>
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
