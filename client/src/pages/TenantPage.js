import React, { useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Navigation from './components/Navigation';
import { _, Grid } from 'gridjs-react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTenant } from '../store/actions/actions';
import { FiEdit } from "react-icons/fi";
import { FaTrash } from "react-icons/fa";

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
  const dispatch = useDispatch();

  const tenantData = useSelector((state) => state.tenant.tenantsData);

  useEffect(() => {
    dispatch(fetchTenant());
  }, []);

  return (
    <>
      {/* <Navigation /> */}
      <Container fluid>
        <Row>
          <Col xs={2}>
            <Sidebar />
          </Col>
          <Col xs={10}>
            <Row className='justify-content-md-center'>
              <h1>Halaman Tenant</h1>
            </Row>
            <Row className='m-5 flex-column'>
              <Button
                onClick={() => {
                  console.log('clicked');
                }}
                style={{ alignSelf: 'flex-end' }}
              >
                Add Tenant
              </Button>
              <Grid
                data={tenantData.map((e) => {
                  return [
                    e.id,
                    e.name,
                    e.email,
                    e.phone,
                    new Date(e.checkIn).toDateString(),
                    e.checkOut && new Date(e.checkOut).toDateString(),
                    _(
                      <>
                        {' '}
                        <Button
                          variant={'primary'}
                          size='sm'
                          onClick={() => console.log(`${e.name} edited`)}
                        ><FiEdit/>
                          Edit
                        </Button>{' '}
                        <Button
                          variant={'danger'}
                          size='sm'
                          onClick={() => console.log(`${e.name} deleted`)}
                        ><FaTrash/>
                          delete
                        </Button>{' '}
                      </>
                    ),
                  ];
                })}
                columns={[
                  'Room',
                  'Name',
                  'Email',
                  'Phone',
                  'CheckIn',
                  'CheckOut',
                  'Action',
                ]}
                sort={true}
                search={true}
                pagination={{
                  enabled: true,
                  limit: 10,
                  summary: false,
                }}
              ></Grid>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default TenantPage;
