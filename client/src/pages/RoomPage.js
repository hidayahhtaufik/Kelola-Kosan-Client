import React, { useState, useEffect } from 'react';
import { Container, Col, Row, Button, Card, Table } from 'react-bootstrap';
import Sidebar from "./components/Sidebar";
import styles from "./styling/room.module.css"
import { useSelector, useDispatch } from "react-redux"
import { fetchRoom } from "../store/actions/actions"

function Room() {
    const rooms = useSelector(state => state.room.rooms);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchRoom());
    }, [])

    const handleCreate = () => {
        console.log("GW DI KLIK");
    }

    return (
        <Container fluid>
            <Row>
                <Col xs={2}>
                    <Sidebar></Sidebar>
                </Col>
                <Col xs={10} style={{ padding: "20px" }}>
                    <div className={styles.wrapper}>
                        <h1 className={styles.title}>Rooms</h1>
                        <div className="d-flex mb-3 justify-content-end align-items-center">
                            <Button variant="success rounded-pill" className="mr-5" onClick={() => handleCreate()}>Create Room Type</Button>
                        </div>
                        <div className={styles.content}>
                            <Card className={styles.card}>
                                <Card.Body>
                                    <Row>
                                        <Col xs={9} onClick={() => console.log("STANDARD ROOMS")}>
                                            12 Standard Rooms
                                        </Col>
                                        <Col xs={3} style={{ textAlign: "center" }}>
                                            <Button variant="primary rounded-pill" className={styles.btnStyle}>Add</Button>
                                            <Button variant="secondary rounded-pill" className={styles.btnStyle}>Edit</Button>
                                            <Button variant="danger rounded-pill" className={styles.btnStyle}>Delete</Button>
                                        </Col>
                                    </Row>
                                </Card.Body>
                            </Card>
                            <Card className={styles.card}>
                                <Card.Body>
                                    <Row>
                                        <Col xs={9}>
                                            5 Deluxe Rooms
                                        </Col>
                                        <Col xs={3} style={{ textAlign: "center" }}>
                                            <Button variant="primary rounded-pill" className={styles.btnStyle}>Add</Button>
                                            <Button variant="secondary rounded-pill" className={styles.btnStyle}>Edit</Button>
                                            <Button variant="danger rounded-pill" className={styles.btnStyle}>Delete</Button>
                                        </Col>
                                    </Row>
                                </Card.Body>
                            </Card>
                        </div>
                    </div>

                    <div className={styles.roomList}>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Number</th>
                                    <th>Status</th>
                                    <th>Type</th>
                                    <th>Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    rooms.map((room) => {
                                        return (
                                            <tr key={room.id}>
                                                <td>{room.number}</td>
                                                <td>{room.status}</td>
                                                <td>{room.type}</td>
                                                <td>{room.price}</td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </Table>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default Room;