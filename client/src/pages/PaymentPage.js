import React, { useEffect, useState } from 'react';
import Sidebar from './components/Sidebar';
import Navigation from './components/Navigation';
import { dateOnly } from '../helpers/helpers';
import { _, Grid } from 'gridjs-react';
import { useDispatch, useSelector } from 'react-redux';
import * as FaIcons from 'react-icons/fa';
import * as MdIcons from 'react-icons/md';
// import * as AiIcons from 'react-icons/ai';
import styles from './styling/payment.module.css';
import {
  fetchPayment,
  fetchTenant,
  fetchRoom,
  createPayment,
  deletePayment,
  changeRoomStatus,
  updatePayment,
} from '../store/actions/actions';

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
  const [showEdit, setShowEdit] = useState(false);

  const [idEdit, setIdEdit] = useState(0);
  const [name, setName] = useState('');
  const [roomNumber, setRoomNumber] = useState(0);
  const [month, setMonth] = useState(0);
  const [year, setYear] = useState(0);
  const [nextDueDate, setNextDueDate] = useState('');
  const [paidCash, setPaidCash] = useState(0);

  const [nameEdit, setNameEdit] = useState('');
  const [roomNumberEdit, setRoomNumberEdit] = useState(0);
  const [monthEdit, setMonthEdit] = useState(0);
  const [yearEdit, setYearEdit] = useState(0);
  const [nextDueDateEdit, setNextDueDateEdit] = useState('');
  const [paidCashEdit, setPaidCashEdit] = useState(0);

  const tenantData = useSelector((state) => state.tenant.tenantsData);

  const dispatch = useDispatch();

  const handleCloseAdd = () => setShowAdd(false);
  const handleShowAdd = () => setShowAdd(true);

  const handleCloseEdit = () => setShowEdit(false);
  const handleShowEdit = () => setShowEdit(true);

  const paymentData = useSelector((state) => state.payment.payments);
  const roomData = useSelector((state) => state.room.rooms);
  // console.log(paymentData, '<< Data Payment');
  // console.log(roomNumber, '<< Id Room');
  // console.log(nameEdit, '<< Name');

  let newDataPayment = [...paymentData];

  function handleSubmitButtonAdd() {
    const newPaymentData = {
      month: +month,
      year: +year,
      nextDueDate,
      paidCash: +paidCash,
      roomId: +roomNumber,
      tenanId: +name,
    };

    const statusUpdate = {
      roomId: +roomNumber,
      status: 'occupied',
    };
    dispatch(createPayment(newPaymentData));
    // dispatch(changeRoomStatus(statusUpdate));
    dispatch(fetchRoom());
    handleCloseAdd();
  }

  function handleSubmitButtonEdit(event) {
    const newDataEditPayment = {
      id: +idEdit,
      month: +monthEdit,
      year: +yearEdit,
      nextDueDate: nextDueDateEdit,
      paidCash: +paidCashEdit,
      // roomId: +roomNumberEdit,
      // tenanId: +nameEdit,
    };
    console.log(newDataEditPayment, '<<<<<<<<<<<<<<<< DI PAYMENT PAGE');

    dispatch(updatePayment(newDataEditPayment));
    handleCloseEdit();

    console.log(newDataEditPayment, '<< New Data Edit Payment');
  }

  function handleDeletePayment(id) {
    console.log(id);
    dispatch(deletePayment(id));
  }

  function handleEditButton(e) {
    setIdEdit(e.id);
    setNameEdit(e.Tenant.id);
    setRoomNumberEdit(e.Room.id);
    setMonthEdit(e.month);
    setYearEdit(e.year);
    setNextDueDateEdit(e.nextDueDate);
    setPaidCashEdit(e.paidCash);
    handleShowEdit();
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
      <Container fluid>
        <Row>
          <Col xs={2}>
            <Sidebar />
          </Col>
          <Col
            xs={10}
           style={{ padding: "20px"}}
          >
            <Row
              className='justify-content-md-center'
              style={{ padding: '20px', borderRadius: 20 }}
            >
              <h1 className={styles.title}>Payments</h1>
            </Row>
            <Row
              className='m-5 flex-column'
              style={{ paddingLeft: '30px', paddingRight: '30px', borderRadius: 20}}
            >
              <Button
                onClick={() => {
                  console.log('clicked');
                  handleShowAdd();
                }}
                style={{ marginTop: 30, color: '77acf1', alignSelf: 'flex-end'}}
              >
                Add Payment
              </Button>
              <Grid
                data={newDataPayment.map((e, index) => {
                  const monthYear = `${e.month}-${e.year}`;
                  const yearPaid = `Rp. ${e.paidCash?.toLocaleString()}`
                  return [
                    index + 1,
                    e.Tenant.name,
                    monthYear,
                    dateOnly(e.nextDueDate),
                    yearPaid,
                    e.Room.number,
                    _(
                      <>
                        {' '}
                        <Button
                          variant={'info'}
                          size='sm'
                          onClick={() => handleEditButton(e)}
                        >
                          <FaIcons.FaEdit />
                        </Button>{' '}
                        <Button
                          variant={'danger'}
                          size='sm'
                          onClick={() => handleDeletePayment(e.id)}
                        >
                          <MdIcons.MdDelete />
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
                  'No.Room',
                  'Action'
                ]}
                sort={true}
                search={true}
                pagination={{
                  enabled: true,
                  limit: 5,
                  summary: false,
                }}
                style={{
                  table: {
                    color: '#343f56',
                    'justify-content': 'center',
                    'text-align': 'center',

                  },
                  th: {
                    'background-color': '#343F56',
                    color: '#FFF',
                    'text-align': 'center'
                  },
                  td: {
                    'background-color': '##EEF3F8'
                  },
                  footer: {
                    'background-color': '#343F56'
                  }
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
                    <option selected disabled>
                      Open this select Name
                    </option>
                    {tenantData.map((e) => (
                      <option key={e.id} value={e.id}>
                        {e.name}
                      </option>
                    ))}
                  </select>
                </Form.Group>
                <Form.Group className='mb-3'>
                  <Form.Label>Room Number:</Form.Label>
                  <select
                    className='custom-select'
                    onChange={(e) => setRoomNumber(e.target.value)}
                  >
                    <option selected disabled>
                      Open this select Room
                    </option>
                    {roomData.map((e) => {
                      return e.status === 'empty' ? (
                        <option key={e.id} value={e.id}>
                          {e.number}
                        </option>
                      ) : (
                        <option key={e.id} defaultValue={e.id} disabled>
                          {e.number}
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

        <Modal show={showEdit} onHide={handleCloseEdit}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Payment</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className='container p-3'>
              <Form>
                {/* <Form.Group className='mb-3'>
                  <Form.Label>Name:</Form.Label>
                  <select
                    className='custom-select'
                    selected={nameEdit}
                    onChange={(e) => setNameEdit(e.target.value)}
                  >
                    <option disabled>Open this select Name</option>
                    {tenantData.map((e) => {
                      console.log(e, ' <<<<<<<<<<<<<<<<<<<<<<<<<<<<');
                      return (
                        <option
                          key={e.id}
                          value={e.id}
                          selected={
                            nameEdit ? (nameEdit == e.id ? true : false) : false
                          }
                        >
                          {e.name}
                        </option>
                      );
                    })}
                  </select>
                </Form.Group>
                <Form.Group className='mb-3'>
                  <Form.Label>Room Number:</Form.Label>
                  <select
                    className='custom-select'
                    selected={roomNumberEdit}
                    onChange={(e) => setRoomNumber(e.target.value)}
                  >
                    {roomData?.map((e) => {
                      return (
                        <option
                          key={e.id}
                          defaultValue={e.id}
                          selected={
                            roomNumberEdit
                              ? roomNumberEdit == e.id
                                ? true
                                : false
                              : false
                          }
                        >
                          {e.number}
                        </option>
                      );
                    })}
                  </select>
                </Form.Group> */}
                <Form.Group className='mb-3'>
                  <Form.Label>Month:</Form.Label>
                  <Form.Control
                    type='number'
                    defaultValue={monthEdit}
                    onChange={(e) => setMonthEdit(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className='mb-3'>
                  <Form.Label>Year:</Form.Label>
                  <Form.Control
                    type='number'
                    defaultValue={yearEdit}
                    onChange={(e) => setYearEdit(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className='mb-3'>
                  <Form.Label>Next DueDate:</Form.Label>
                  <Form.Control
                    type='date'
                    defaultValue={dateOnly(nextDueDateEdit)}
                    onChange={(e) => setNextDueDateEdit(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className='mb-3'>
                  <Form.Label>Paid Cash:</Form.Label>
                  <Form.Control
                    type='number'
                    defaultValue={paidCashEdit}
                    onChange={(e) => setPaidCashEdit(e.target.value)}
                  />
                </Form.Group>
              </Form>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant='secondary' onClick={handleCloseEdit}>
              Close
            </Button>
            <Button
              variant='primary'
              onClick={(event) => {
                handleSubmitButtonEdit(event);
              }}
            >
              Edit Payment
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </>
  );
}

export default PaymentPage;
