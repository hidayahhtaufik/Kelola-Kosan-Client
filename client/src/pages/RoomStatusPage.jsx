import React, { useEffect, useState } from 'react'
import Sidebar from './components/Sidebar'
import { useDispatch, useSelector } from 'react-redux'
import { fetchRoomStatus } from '../store/actions/actions'


import {
  Container,
  Row,
  Col,
  Card,
  Button
} from 'react-bootstrap';

const RoomStatus = () => {

  const dispatch = useDispatch()
  const rooms = useSelector(state => state.room.roomsStatus[0])

  useEffect( _ => {
    dispatch(fetchRoomStatus())
  },[])


  return(
    <>
     <p style={{
       textAlign: 'center',
          marginLeft: '10rem',
          paddingLeft: '10rem'}}>
            {JSON.stringify(rooms)}</p>
      <Container fluid >
        <Row>
          <Col xs={2}>
            <Sidebar />
          </Col>
          <Col xs={10} style={{ padding: '20px' }}>
            <Row 
              className='justify-content-md-center'
              style={{ padding: '20px', borderRadius: 20 }}
            >
              <h1
                className='text-center'
                style={{
                  fontWeight: 'bold',
                  fontSize: '50px',
                  color: '#343F56',
                }}
              >
                Status Room
              </h1>
            </Row>
          </Col>

        
              
          {
            rooms?.map(room => {
              return(
                <div
                  key={room.number}
                  style={{
                    marginLeft: '30rem',
                  }}>

                <Col>
                  <Card style={{ width: '18rem' }}>
                      <Card.Body>
                    <Button disable variant="warning" size="sm">
                      {room.status}
                    </Button>
                      <Card.Title
                        style={{fontSize: '4rem', textAlign: 'center'}}
                      >
                        {room.number}
                      </Card.Title>
                      <Card.Subtitle 
                        className="mb-2 text-muted text-center">
                          {room.tenantName}
                        </Card.Subtitle>
                    </Card.Body>
                  </Card>
                </Col>
                </div>
              )
            })
          }
            
              

        </Row>
      </Container>
    </>
  )
}

export default RoomStatus