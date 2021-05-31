import React, { useEffect, useState } from 'react';
import Sidebar from './components/Sidebar';
import Navigation from './components/Navigation';
import { _, Grid } from 'gridjs-react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchPayment,
  fetchTenant,
  fetchRoom,
  createPayment,
  deletePayment,
} from '../store/actions/actions';
import { dateOnly } from '../../src/helpers/helpers';

import {
  Container,
  Row,
  Col,
  Button,
  Navbar,
  Nav,
  NavDropdown,
  Modal,
  Form,
} from 'react-bootstrap';

function PaymentPage() {
  const [showAdd, setShowAdd] = useState(false);
  const [name, setName] = useState('');
  const [roomNumber, setRoomNumber] = useState(0);
  const [month, setMonth] = useState(0);
  const [year, setYear] = useState(0);
  const [nextDueDate, setNextDueDate] = useState('');
  const [paidCash, setPaidCash] = useState(0);

  const tenantData = useSelector((state) => state.tenant.tenantsData);
  console.log(tenantData, '<<<<<<<<<<<<<<<<<<<<<<<<<<<< DI payment');

  const dispatch = useDispatch();

  const handleCloseAdd = () => setShowAdd(false);
  const handleShowAdd = () => setShowAdd(true);

  const paymentData = useSelector((state) => state.payment.payments);
  const roomData = useSelector((state) => state.room.rooms);
  console.log(paymentData, '<< Data Payment');
  console.log(roomNumber, '<< Id Room');
  console.log(name, '<< Name');

  function handleSubmitButtonAdd() {
    const newPaymentData = {
      month: +month,
      year: +year,
      nextDueDate,
      paidCash: +paidCash,
      roomId: +roomNumber,
      tenanId: +name,
    };
    console.log(newPaymentData, 'Click Button');
    dispatch(createPayment(newPaymentData));
    dispatch(fetchRoom());
  }

  function handleDeletePayment(id) {
    console.log(id);
    dispatch(deletePayment(id));
  }

  useEffect(() => {
    dispatch(fetchPayment());
  }, []);

  useEffect(() => {
    dispatch(fetchTenant());
  }, []);

  useEffect(() => {
    dispatch(fetchRoom());
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
              <Button
                onClick={() => {
                  console.log('clicked');
                  handleShowAdd();
                }}
                style={{ alignSelf: 'flex-end' }}
              >
                Add Payment
              </Button>
              <Grid
                data={paymentData.map((e) => {
                  const monthYear = `${e.month}-${e.year}`;

                  return [
                    e.id,
                    e.Tenant.name,
                    monthYear,
                    dateOnly(e.nextDueDate),
                    e.paidCash,
                    e.Room.number,
                    _(
                      <>
                        {' '}
                        <Button
                          variant={'primary'}
                          size='sm'
                          onClick={() => console.log(`${e.Tenant.name} edited`)}
                        >
                          Edit
                        </Button>{' '}
                        <Button
                          variant={'danger'}
                          size='sm'
                          onClick={() => handleDeletePayment(e.id)}
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
                  'Next DueDate',
                  'Paid Cash',
                  'Room Number',
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
        <Modal show={showAdd} onHide={handleCloseAdd}>
          <Modal.Header closeButton>
            <Modal.Title>Add Payment</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className='container p-3'>
              <Form>
                <Form.Group className='mb-3'>
                  <Form.Label>Name:</Form.Label>
                  <select
                    className='custom-select'
                    onChange={(e) => setName(e.target.value)}
                  >
                    {tenantData.map((e) => (
                      <option key={e.id} value={e.id}>
                        {e.name}
                      </option>
                    ))}
                  </select>
                  {/* 
                <Form.Control
                  type='text'
                  // defaultValue={property[0]?.name}
                  onChange={(e) => setName(e.target.value)}
                /> */}
                </Form.Group>
                <Form.Group className='mb-3'>
                  <Form.Label>Room Number:</Form.Label>
                  <select
                    className='custom-select'
                    onChange={(e) => setRoomNumber(e.target.value)}
                  >
                    {roomData.map((e) => {
                      return e.status === 'empty' ? (
                        <option key={e.id} value={e.id}>
                          {e.number}
                        </option>
                      ) : (
                        <option key={e.id} defaultValue={e.id} disabled>
                          Not Available
                        </option>
                      );
                    })}
                  </select>
                </Form.Group>
                <Form.Group className='mb-3'>
                  <Form.Label>Month:</Form.Label>
                  <Form.Control
                    type='number'
                    // defaultValue={property[0]?.address}
                    onChange={(e) => setMonth(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className='mb-3'>
                  <Form.Label>Year:</Form.Label>
                  <Form.Control
                    type='number'
                    // defaultValue={property[0]?.image}
                    onChange={(e) => setYear(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className='mb-3'>
                  <Form.Label>Next DueDate:</Form.Label>
                  <Form.Control
                    type='date'
                    // defaultValue={property[0]?.phone}
                    onChange={(e) => setNextDueDate(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className='mb-3'>
                  <Form.Label>Paid Cash:</Form.Label>
                  <Form.Control
                    type='number'
                    // defaultValue={property[0]?.image}
                    onChange={(e) => setPaidCash(e.target.value)}
                  />
                </Form.Group>
              </Form>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant='secondary' onClick={handleCloseAdd}>
              Close
            </Button>
            <Button
              variant='primary'
              onClick={(event) => {
                handleSubmitButtonAdd(event);
              }}
            >
              Add Payment
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </>
  );
}

export default PaymentPage;
