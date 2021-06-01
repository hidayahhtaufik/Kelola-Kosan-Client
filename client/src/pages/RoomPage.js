import React, { useState, useEffect } from 'react';
import {
  Container,
  Col,
  Row,
  Button,
  Card,
  Table,
  Modal,
  Form,
} from 'react-bootstrap';
import { _, Grid } from 'gridjs-react';
import Sidebar from './components/Sidebar';
import styles from './styling/room.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { fetchRoom, deleteRoom, createRoom, updateRoom } from '../store/actions/actions';
import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import * as MdIcons from 'react-icons/md';
import { GrAdd } from 'react-icons/gr';
import { IconContext } from 'react-icons';

function Room() {
  const dispatch = useDispatch();
  const rooms = useSelector((state) => state.room.rooms);
  console.log(rooms);

  const [showAddForm, setShowAddForm] = useState(false);
  const handleCloseAddForm = () => setShowAddForm(false);

  const [addRoomNumber, setAddRoomNumber] = useState(0);
  const [addRoomStatus, setAddRoomStatus] = useState('');
  const [addRoomType, setAddRoomType] = useState('');
  const [addRoomPrice, setAddRoomPrice] = useState(0);

  const [showEditForm, setShowEditForm] = useState(false)
  const handleCloseEditForm = () => setShowEditForm(false)
  
  const [editRoomId, setEditRoomId] = useState()
  const [editRoomNumber, setEditRoomNumber] = useState()
  const [editRoomStatus, setEditRoomStatus] = useState()
  const [editRoomType, setEditRoomType] = useState()
  const [editRoomPrice, setEditRoomPrice] = useState()


  let standartRoom = 0;
  let deluxeRoom = 0;
  rooms.map((room) => {
    if (room.type === 'standard') {
      standartRoom++;
    } else if (room.type === 'deluxe') {
      deluxeRoom++;
    }
  });

  function handleDeleteRoom(id) {
    dispatch(deleteRoom(id));
  }

  useEffect(() => {
    dispatch(fetchRoom());
  }, []);

  const handleCreate = () => {
    console.log('GW DI KLIK');
    setShowAddForm(true);
  };

  function handleAddSubmit(e) {
    e.preventDefault()
    let payload = {
      number: addRoomNumber,
      status: addRoomStatus,
      type: addRoomType
    }
    setAddRoomNumber(0)
    dispatch(createRoom(payload))
    handleCloseAddForm()
  }

  const handleShowEditRoomForm = (e) => {
    setEditRoomId(e.id)
    setEditRoomNumber(e.number)
    setEditRoomStatus(e.status)
    setEditRoomType(e.type)
    setEditRoomPrice(e.price)
    setShowEditForm(true)
  }

  const handleEditSubmit = () => {
    let newPayload = {
      id: editRoomId,
      number: editRoomNumber,
      status: editRoomStatus,
      type: editRoomType,
      price: editRoomPrice
    }
    console.log(newPayload)
    dispatch(updateRoom(newPayload, editRoomId))
    handleCloseEditForm()
  }

  return (
    <Container fluid>
      <Row>
        <Col xs={2}>
          <Sidebar></Sidebar>
        </Col>
        <Col xs={10} style={{ padding: '20px' }}>
          <Row className='justify-content-md-center mb-3'>
            <h1 className={styles.title}>Rooms</h1>
          </Row>
          

          <div className='m-5'>
            <Card className={styles.card}>
              <Card.Body className='flex-column'>
                <Row>
                  <Col xs={9} onClick={() => console.log('STANDARD ROOMS')}>
                    <h4 style={{ color: '#343f56' }}>
                      {standartRoom} Standard Rooms
                    </h4>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
            <Card className={styles.card}>
              <Card.Body className='flex-column'>
                <Row>
                  <Col xs={9}>
                    <h4 style={{ color: '#343f56' }}>
                      {deluxeRoom} Deluxe Rooms
                    </h4>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </div>

          <div className={styles.wrapper}></div>

          <Row
            className='shadow m-5 border border-3'
            style={{
              backgroundColor: 'white',
              borderRadius: 30,
              padding: '20px',
            }}
          >
            <Col>
              <h3
                className='text-center mb-3'
                style={{
                  // border: 'solid',
                  // borderColor: 'red',
                  padding: '10px',
                  fontWeight: 'bold',
                  color: '#343F56',
                }}
              >
                Detail Table
              </h3>
              <div className='d-flex justify-content-end align-items-center'>
                <Button
                  variant='primary shadow'
                  className='mr-5'
                  onClick={() => handleCreate()}
                >
                  <MdIcons.MdAdd
                    style={{
                      fontSize: '1.3rem',
                      color: '#fff',
                      alignItems: 'center',
                      marginRight: '3px',
                    }}
                  />{' '}
                  Add New Room
                </Button>
              </div>
              <Grid
                data={rooms.map((e) => {
                  return [
                    e.number,
                    e.status.toUpperCase(),
                    e.type.toUpperCase(),
                    `Rp. ${e.price.toLocaleString()}`,
                    _(
                      <>
                        {' '}
                        <Button
                          variant={'primary'}
                          // style={{color: "#fff", background: "#77acf1"}}
                          size='sm'
                          onClick={() => { handleShowEditRoomForm(e) }}
                        >
                          <FaEdit />
                        </Button>{' '}
                        <Button
                          variant={'danger'}
                          size='sm'
                          onClick={() => {
                            handleDeleteRoom(e.id);
                          }}
                        >
                          <MdDelete />
                        </Button>{' '}
                      </>
                    ),
                  ];
                })}
                columns={[
                  'Room Number',
                  'Status',
                  'Type',
                  'Price',
                  {
                    name: 'Action',
                  },
                ]}
                sort={true}
                search={true}
                pagination={{
                  enabled: true,
                  limit: 10,
                  summary: false,
                }}
                style={{
                  table: {
                    color: '#343f56',
                  },
                  th: {
                    'background-color': '#343F56',
                    color: '#FFF',
                    'text-align': 'center',
                  },
                  td: {
                    'background-color': '##EEF3F8',
                  },
                  footer: {
                    'background-color': '#343F56',
                  },
                }}
              ></Grid>
            </Col>
          </Row>

          {/* MODAL ADD */}
          <Modal show={showAddForm} onHide={handleCloseAddForm}>
            <Modal.Header>
              <Modal.Title>Add Room</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>

                <Form.Group controlId='formBasicEmail' className="mb-3">
                  <Form.Label>Room Number:</Form.Label>
                  <Form.Control
                    type='number'
                    min={1}
                    value={addRoomNumber}
                    onChange={(e) => setAddRoomNumber(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className='mb-3'>
                  <Form.Label>Room Type:</Form.Label><br></br>
                  <select
                    className='custom-select'
                    onChange={(e) => setAddRoomType(e.target.value)}
                  >
                    <option selected disabled>
                      Select Room Type
                    </option>
                    <option value={'standard'}>
                      Standard Room
                    </option>
                    <option value={'deluxe'}>
                      Deluxe Room
                    </option>
                  </select>
                </Form.Group>

                <Form.Group controlId='formBasicEmail' className="mb-3">
                  <Form.Label>Room Status:</Form.Label><br></br>
                  <select
                    className='custom-select'
                    onChange={(e) => setAddRoomStatus(e.target.value)}
                  >
                    <option selected disabled>
                      Select Room Status
                    </option>
                    <option value={'empty'}>
                      Empty
                    </option>
                    <option value={'maintenance'}>
                      Maintenance
                    </option>
                    <option value={'occupied'}>
                      Occupied
                    </option>
                  </select>
                </Form.Group>

              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseAddForm}>Close</Button>
              <Button variant='primary' onClick={handleAddSubmit}>Add</Button>
            </Modal.Footer>
          </Modal>

          {/* MODAL EDIT */}
          <Modal show={showEditForm} onHide={handleCloseEditForm}>
            <Modal.Header>
              <Modal.Title>Edit Room</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>

                <Form.Group controlId='formBasicEmail' className="mb-3">
                  <Form.Label>Room Number:</Form.Label>
                  <Form.Control
                    type="number" min={1}
                    defaultValue={editRoomNumber}
                    onChange={e => setEditRoomNumber(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className='mb-3'>
                  <Form.Label>Room Type:</Form.Label>
                  <select
                    className='custom-select'
                    defaultValue={editRoomType}
                    onChange={(e) => setEditRoomType(e.target.value)}
                  >
                    <option selected disabled>
                      Select this Room Type
                    </option>
                    <option value={'standard'}>
                      Standard Room
                    </option>
                    <option value={'deluxe'}>
                      Deluxe Room
                    </option>
                  </select>
                </Form.Group>

                <Form.Group controlId='formBasicEmail' className="mb-3">
                  <Form.Label>Room Status:</Form.Label>
                  <select
                    className='custom-select'
                    defaultValue={editRoomStatus}
                    onChange={(e) => setEditRoomStatus(e.target.value)}
                  >
                    <option selected disabled>
                      Select Room Status
                    </option>
                    <option value={'empty'}>
                      Empty
                    </option>
                    <option value={'maintenance'}>
                      Maintenance
                    </option>
                    <option value={'occupied'}>
                      Occupied
                    </option>
                  </select>
                </Form.Group>

                <Form.Group controlId='formBasicEmail' className="mb-3">
                  <Form.Label>Room Price:</Form.Label>
                  <Form.Control
                    type="number" min={1}
                    defaultValue={editRoomPrice}
                    onChange={e => setEditRoomPrice(e.target.value)}
                  />
                </Form.Group>

              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseEditForm}>Close</Button>
              <Button variant='primary' onClick={handleEditSubmit}>Confirm</Button>
            </Modal.Footer>
          </Modal>


        </Col>
      </Row>
    </Container>
  );
}

export default Room;
