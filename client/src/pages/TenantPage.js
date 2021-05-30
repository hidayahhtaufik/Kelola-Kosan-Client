import React, { useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Navigation from './components/Navigation';
import { _ , Grid } from 'gridjs-react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTenant } from '../store/actions/actions';

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

  const tenantData = useSelector((state) => state.tenant.tenants);
  console.log(tenantData, 'tenant data');


  useEffect(() => {
    dispatch(fetchTenant());
  }, []);

  const mockTenant = [
    {
      "id": 1,
      "email": "joko@mail.com",
      "name": "joko",
      "phone": "0823452",
      "checkIn": "2021-05-30T08:38:38.770Z",
      "checkOut": null,
      "createdAt": "2021-05-30T08:38:38.770Z",
      "updatedAt": "2021-05-30T08:38:38.770Z"
    },
    {
      "id": 2,
      "email": "papang@mail.com",
      "name": "papang",
      "phone": "0883249821",
      "checkIn": "2021-05-30T08:38:38.770Z",
      "checkOut": null,
      "createdAt": "2021-05-30T08:38:38.770Z",
      "updatedAt": "2021-05-30T08:38:38.770Z"
    },
    {
      "id": 3,
      "email": "jalang@mail.com",
      "name": "jee",
      "phone": "082158e75678",
      "checkIn": "2021-05-28T08:38:38.770Z",
      "checkOut": null,
      "createdAt": "2021-05-30T08:38:38.770Z",
      "updatedAt": "2021-05-30T08:38:38.770Z"
    }
  ]
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
            <Row className='m-5 flex-column'>
              <Grid
                data={mockTenant.map(e => {
                  return [
                    e.id,
                    e.name,
                    e.email,
                    e.phone,
                    new Date(e.checkIn).toDateString(),
                    e.checkOut && new Date(e.checkOut).toDateString(),
                    _(<> <Button variant={"primary"} onClick={() => console.log(`${e.name} edited`)}>Edit</Button> <Button variant={"danger"} onClick={() => console.log(`${e.name} deleted`)}>delete</Button> </>)
                  ]
                })}
                columns={[
                  'Room',
                  'Name',
                  'Email',
                  'Phone',
                  'CheckIn',
                  'CheckOut',
                ]}
                sort={true}
                search={true}
                pagination={{
                  enabled: true,
                  limit: 3,
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
