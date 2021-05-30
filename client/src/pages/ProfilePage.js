import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProperties, fetchRoom } from '../store/actions/actions';
import Sidebar from './components/Sidebar';
import styles from './styling/profileProperty.module.css';

import {
  Container,
  Row,
  Col,
  Button,
  Navbar,
  Nav,
  NavDropdown,
  Image,
  Table,
} from 'react-bootstrap';

function ProfilePage() {
  const [property, setProperty] = useState([]);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const propertiesData = useSelector((state) => state.property.properties);
  const roomData = useSelector((state) => state.room.rooms);
  console.log(roomData);

  console.log(propertiesData);
  console.log(property, '<<< Local');

  useEffect(() => {
    setLoading(true);
    dispatch(fetchProperties(loading, setLoading, property, setProperty));
    // setProperty(propertiesData);
  }, []);

  useEffect(() => {
    dispatch(fetchRoom());
  }, []);

  function handleEditButton() {
    console.log(property, 'Edit ke Klik');
  }
  return (
    <>
      <Container fluid>
        <Row>
          <Col xs={2}>
            <Sidebar />
          </Col>
          {loading ? (
            <h1>Loading..</h1>
          ) : (
            <Col
              xs={10}
              style={{ border: 'solid', borderColor: 'blue', padding: '20px' }}
            >
              <Row
                className='justify-content-md-center mb-2'
                style={{ border: 'solid', borderColor: 'red', padding: '20px' }}
              >
                <h1>Property Profile</h1>
              </Row>
              <Row
                className='mb-2'
                style={{
                  border: 'solid',
                  borderColor: 'yellow',
                  padding: '20px',
                }}
              >
                <Col>
                  <h3 className='text-center'>{property[0]?.name}</h3>
                </Col>
              </Row>
              <Row
                style={{
                  border: 'solid',
                  borderColor: 'green',
                  padding: '20px',
                }}
              >
                <Col
                  style={{
                    border: 'solid',
                    borderColor: 'purple',
                    padding: '20px',
                  }}
                >
                  <div className='text-center mt-3'>
                    <Image
                      src={property[0]?.image}
                      class='rounded'
                      alt='Kamar Kosan'
                      style={{ width: '100%' }}
                      rounded
                    />
                  </div>
                </Col>
                <Col
                  className='align-items-center justify-content-center'
                  style={{
                    border: 'solid',
                    borderColor: 'gray',
                    padding: '20px',
                  }}
                >
                  <Table bordered hover>
                    <tbody>
                      <tr>
                        <td>Name Owner:</td>
                        <td>{property[0]?.username}</td>
                      </tr>
                    </tbody>
                    <tbody>
                      <tr>
                        <td className={styles.column}>Address:</td>
                        <td>{property[0]?.address}</td>
                      </tr>
                    </tbody>
                    <tbody>
                      <tr>
                        <td>Phone Number:</td>
                        <td>{property[0]?.phone}</td>
                      </tr>
                    </tbody>
                    <tbody>
                      <tr>
                        <td>Email:</td>
                        <td>{property[0]?.email}</td>
                      </tr>
                    </tbody>
                    <tbody>
                      <tr>
                        <td>Quantity Room:</td>
                        <td>{roomData.length} Room</td>
                      </tr>
                    </tbody>
                  </Table>
                  <Button
                    variant='success rounded'
                    className='mr-5'
                    onClick={handleEditButton}
                  >
                    Edit data
                  </Button>
                </Col>
              </Row>
            </Col>
          )}
        </Row>
      </Container>
    </>
  );
}

export default ProfilePage;
