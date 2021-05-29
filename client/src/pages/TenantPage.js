import React from 'react';
import Sidebar from './components/Sidebar';
import Navigation from './components/Navigation';
import { Grid } from 'gridjs-react';

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
            <Row className="ml-5">
            <Grid
              data={[
                ['John', 'john@example.com', '+53535215'],
                ['Mike', 'mike@gmail.com', '+23453462623'],
                ['surti', 'surti@gmail.com', '+23453462623'],
                ['tejo', 'tejo@gmail.com', '+23453462623'],
                ['acong', 'acong@gmail.com', '+23453462623'],
                ['susi', 'susi@gmail.com', '+23453462623'],
                ['susan', 'susan@gmail.com', '+23453462623'],
            ]}
              style={{
                table: {
                  border: '3px solid #ccc'
                },
                th: {
                  'background-color': 'rgba(0, 0, 0, 0.1)',
                  color: '#000',
                  'border-bottom': '3px solid #ccc',
                  'text-align': 'center'
                },
                td: {
                  'text-align': 'center'
                }
              }}
              columns={['Name', 'Email', 'Phone']}
              search={true}
              pagination={{
                enabled: true,
                limit: 5,
              }}></Grid>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default TenantPage;
