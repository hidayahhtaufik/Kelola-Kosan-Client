import React, { useEffect, useState } from 'react';
import Sidebar from './components/Sidebar';
import Navigation from './components/Navigation';
import { _, Grid } from 'gridjs-react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTenant, createTenant, updateTenant, deleteTenant } from '../store/actions/actions';
import { dateOnly } from '../helpers/helpers'
import { jsPDF } from "jspdf"

import {
  Container,
  Row,
  Col,
  Button,
  Navbar,
  Nav,
  NavDropdown,
  Modal, Form
} from 'react-bootstrap';
import { FaPhoneSquareAlt } from 'react-icons/fa';

function TenantPage() {
  const dispatch = useDispatch();
  

  const tenantData = useSelector((state) => state.tenant.tenantsData);

  useEffect(() => {
    dispatch(fetchTenant());
  }, []);


  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [showEditForm, setShowEditForm] = useState(false);
  const handleCloseEditForm = () => setShowEditForm(false);
  

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [checkIn, setCheckIn] = useState('')

  const [editName, setEditName] = useState('')
  const [editEmail, setEditEmail] = useState('')
  const [editPhone, setEditPhone] = useState('')
  const [editCheckIn, setEditCheckIn] = useState('')
  const [editId, setEditId] = useState('')

  const handleShowEditForm = (e) => {
    setEditName(e.name)
    setEditEmail(e.email)
    setEditPhone(e.phone)
    setEditCheckIn(e.checkIn)
    setEditId(e.id)
    setShowEditForm(true)
  }

  const handleAddTenant = () => {
    const newTenant = { name, email, phone, checkIn }
    
    setName('')
    setEmail('')
    setPhone('')
    setCheckIn('')

    dispatch(createTenant(newTenant))
    handleClose()
  }

  const handleUpdateTenant = () => {
    const updateDataTenant = {
      name : editName,
      email : editEmail,
      phone : editPhone,
      checkIn : editCheckIn,
      checkOut : null
    }
    dispatch(updateTenant(editId, updateDataTenant))
    handleCloseEditForm()
  }

  const handleDeleteTenant = id => {
    dispatch(deleteTenant(id))
  }

  const handleExportToPdf = () => {
    
  }

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
                  handleShow()
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
                          onClick={() => {
                            handleShowEditForm(e)
                          }}
                        >
                          Edit
                        </Button>{' '}
                        <Button
                          variant={'danger'}
                          size='sm'
                          onClick={() => handleDeleteTenant(e.id)}
                        >
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

              <div style={{ alignSelf: 'flex-end' }}>
                <Button
                  onClick={() => { 
                    console.log('clicked');
                    handleExportToPdf()
                  }}
                  variant="light"
                >
                  Export To PDF
                </Button>
              </div>

              {/* Modal Add Tenant */}
              <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Form>
                    <Form.Group controlId='formBasicEmail'>
                      <Form.Label>Name</Form.Label>
                      <Form.Control 
                        type="text" 
                        placeholder="full name"  
                        value={name}
                        onChange={ e => setName(e.target.value) } 
                      />
                    </Form.Group>
                    <Form.Group controlId='formBasicEmail'>
                      <Form.Label>Email</Form.Label>
                      <Form.Control 
                        type="email"
                        placeholder="Enter email"
                        value={email}
                        onChange={ e => setEmail(e.target.value) }
                      />
                    </Form.Group>
                    <Form.Group controlId='formBasicEmail'>
                      <Form.Label>Phone</Form.Label>
                      <Form.Control 
                        type="text" min={1}
                        value={phone}
                        onChange={ e => setPhone(e.target.value) }
                      />
                    </Form.Group>
                    <Form.Group controlId='formBasicEmail'>
                      <Form.Label>Check In</Form.Label>
                      <Form.Control 
                        type="date"
                        value={checkIn}
                        onChange={ e => setCheckIn(e.target.value) }
                      />
                    </Form.Group>
                  </Form>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                    Close
                  </Button>
                  <Button variant="primary" onClick={handleAddTenant}>
                    Add
                  </Button>
                </Modal.Footer>
              </Modal>

              {/* Modal Edii Tenant */}
              <Modal show={showEditForm} onHide={handleCloseEditForm}>
                <Modal.Header closeButton>
                  <Modal.Title>Modal Edit</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Form>
                    <Form.Group controlId='formBasicEmail'>
                      <Form.Label>Name</Form.Label>
                      <Form.Control 
                        type="text" 
                        placeholder="full name"  
                        value={editName}
                        onChange={ e => setEditName(e.target.value) } 
                      />
                    </Form.Group>
                    <Form.Group controlId='formBasicEmail'>
                      <Form.Label>Email</Form.Label>
                      <Form.Control 
                        type="email"
                        placeholder="Enter email"
                        value={editEmail}
                        onChange={ e => setEditEmail(e.target.value) }
                      />
                    </Form.Group>
                    <Form.Group controlId='formBasicEmail'>
                      <Form.Label>Phone</Form.Label>
                      <Form.Control 
                        type="text" min={1}
                        value={editPhone}
                        onChange={ e => setEditPhone(e.target.value) }
                      />
                    </Form.Group>
                    <Form.Group controlId='formBasicEmail'>
                      <Form.Label>Check In</Form.Label>
                      <Form.Control
                        type="date"
                        value={dateOnly(editCheckIn)}
                        onChange={ e => setEditCheckIn(e.target.value) }
                      />
                    </Form.Group>
                  </Form>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleCloseEditForm}>
                    Close
                  </Button>
                  <Button variant="primary" onClick={handleUpdateTenant}>
                    Update
                  </Button>
                </Modal.Footer>
              </Modal>

            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default TenantPage;
