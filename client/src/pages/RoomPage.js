import React from 'react';
import { Container, Col, Row, Button, Card } from 'react-bootstrap';
import Sidebar from './components/Sidebar';
import styles from './styling/room.module.css';

function Room() {
  return (
    <Container fluid>
      <Row>
        <Col xs={2}>
          <Sidebar></Sidebar>
        </Col>
        <Col
          xs={10}
          style={{ border: 'solid', borderColor: 'blue', padding: '20px' }}
        >
          <div className={styles.wrapper}>
            <h1 className={styles.title}>Rooms</h1>
            <div className='d-flex mb-3 justify-content-end align-items-center'>
              <Button variant='success rounded-pill' className='mr-5'>
                Create Room Type
              </Button>
            </div>
            <div className={styles.content}>
              <Card className={styles.card}>
                <Card.Body>
                  <Row>
                    <Col xs={9} onClick={() => console.log('STANDARD ROOMS')}>
                      12 Standard Rooms
                    </Col>
                    <Col xs={3} style={{ textAlign: 'center' }}>
                      <Button
                        variant='primary rounded-pill'
                        className={styles.btnStyle}
                      >
                        Add
                      </Button>
                      <Button
                        variant='secondary rounded-pill'
                        className={styles.btnStyle}
                      >
                        Edit
                      </Button>
                      <Button
                        variant='danger rounded-pill'
                        className={styles.btnStyle}
                      >
                        Delete
                      </Button>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
              <Card className={styles.card}>
                <Card.Body>
                  <Row>
                    <Col xs={9}>5 Deluxe Rooms</Col>
                    <Col xs={3} style={{ textAlign: 'center' }}>
                      <Button
                        variant='primary rounded-pill'
                        className={styles.btnStyle}
                      >
                        Add
                      </Button>
                      <Button
                        variant='secondary rounded-pill'
                        className={styles.btnStyle}
                      >
                        Edit
                      </Button>
                      <Button
                        variant='danger rounded-pill'
                        className={styles.btnStyle}
                      >
                        Delete
                      </Button>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </div>
          </div>
          <h3 className='mt-5'>Border masih buat inspect doang abaikan</h3>
        </Col>
      </Row>
    </Container>
  );
}

export default Room;
