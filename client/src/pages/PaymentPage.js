import React, { useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Navigation from './components/Navigation';
import { _, Grid } from 'gridjs-react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPayment } from '../store/actions/actions';
import { dateOnly } from '../../src/helpers/helpers';

import {
  Container,
  Row,
  Col,
  Button,
  Navbar,
  Nav,
  NavDropdown,
} from 'react-bootstrap';

function PaymentPage() {
  const dispatch = useDispatch();

  const paymentData = useSelector((state) => state.payment.payments);
  console.log(paymentData);

  useEffect(() => {
    dispatch(fetchPayment());
  }, []);

  return (
    <>
      {/* <Navigation /> */}
      <Container fluid>
        <Row>
          <Col xs={2}>
            <Sidebar />
          </Col>
          <Col
            xs={10}
            style={{ border: 'solid', borderColor: 'blue', padding: '20px' }}
          >
            <Row
              className='justify-content-md-center'
              style={{ border: 'solid', borderColor: 'red', padding: '20px' }}
            >
              <h1>Halaman Payment</h1>
            </Row>
            <Row
              className='m-5 flex-column'
              style={{ border: 'solid', borderColor: 'green' }}
            >
              <Grid
                data={paymentData.map((e) => {
                  return [
                    e.id,
                    e.Tenant.name,
                    e.month,
                    e.year,
                    dateOnly(e.nextDueDate),
                    e.paidCash,
                    e.Room.number,
                    _(
                      <>
                        {' '}
                        <Button
                          variant={'primary'}
                          size='sm'
                          onClick={() => console.log(`${e.name} edited`)}
                        >
                          Edit
                        </Button>{' '}
                        <Button
                          variant={'danger'}
                          size='sm'
                          onClick={() => console.log(`${e.name} deleted`)}
                        >
                          delete
                        </Button>{' '}
                      </>
                    ),
                  ];
                })}
                columns={[
                  'No',
                  'Name',
                  'Month',
                  'Year',
                  'Next DueDate',
                  'Paid Cash',
                  'Room Id',
                  'Action',
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

export default PaymentPage;
