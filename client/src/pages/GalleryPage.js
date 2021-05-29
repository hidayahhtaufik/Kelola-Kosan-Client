import React from 'react';
import Sidebar from './components/Sidebar';
<<<<<<< HEAD
=======
import Navigation from './components/Navigation';
>>>>>>> cbd8271c988733d05084bb74e8321d776751342d
import {
  Container,
  Row,
  Col,
  Button,
  Navbar,
  Nav,
  NavDropdown,
} from 'react-bootstrap';

function GalleryPage() {
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
              <h1>Halaman Gallery</h1>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default GalleryPage;
