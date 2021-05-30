import React, { useEffect, useState  } from 'react';
import Sidebar from './components/Sidebar';
import Navigation from './components/Navigation';
import { newMonth, numberMonth } from '../helpers/helpers';
import { useDispatch, useSelector } from 'react-redux';
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
import { Doughnut, Bar, defaults } from 'react-chartjs-2';
import {
  fetchRevenue,
  fetchRoom,
  fetchExpenses,
  createExpenses
} from '../store/actions/actions';

// console.log(defaults);
defaults.plugins.legend.position = 'right';

function HomePage() {
  const dispatch = useDispatch();

  const revenueData = useSelector((state) => state.revenue.revenues);
  const expenseData = useSelector((state) => state.expense.expenses);

  const roomData = useSelector((state) => state.room.rooms);

  // Kebutuhan Revenue =======================================================
  let newDataRevenue = [];
  for (let i = 0; i < revenueData.length; i++) {
    const revenue = revenueData[i].total;
    newDataRevenue.push(revenue);
  }
  console.log(revenueData, '<<< DI Home Revenue');
  console.log(newDataRevenue, '<<< Data Baru Revenue');

  // Kebutuhan Expense ======================================================
  // ? >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> HOME Expense
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  let newDataExpense = [...expenseData]

  const [expenseTitle, setExpenseTitle] = useState('')
  const [expenseMonth, setExpenseMonth] = useState(0)
  const [expenseYear, setExpenseYear]   = useState(0)
  const [expenseTotal, setExpenseTotal] = useState(0)

  const addExpenseTransaction = () => {
    console.log('clickeddd add transaction');
    const newDataExpense = {
      title      : expenseTitle,
      month      : expenseMonth,
      year       : expenseYear,
      total      : expenseTotal
    }
    dispatch(createExpenses(newDataExpense))

    handleClose()
  }



  // ? <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< End Expense

  // Kebutuhan Room ===========================================================
  let emptyStatus = 0;
  let maintenaceStatus = 0;
  let occupiedStatus = 0;
  console.log(roomData, '<<< Di Home Room');
  for (let i = 0; i < roomData.length; i++) {
    const statusRoom = roomData[i].status;

    if (statusRoom === 'empty') {
      emptyStatus++;
    } else if (statusRoom === 'maintenance') {
      maintenaceStatus++;
    } else {
      occupiedStatus++;
    }
  }

  const dataGraph = {
    labels: [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ],
    datasets: [
      {
        label: 'Income',
        // data: [
        //   60000000, 59000000, 80000000, 81000000, 56000000, 55000000, 40000000,
        // ],
        data: newDataRevenue,
        fill: false,
        backgroundColor: 'rgba(75, 192, 192)',
        borderColor: 'rgba(75, 192, 192, 1)',
        tension: 0.1,
      },
      {
        label: 'Expense',
        // data: [
        //   60000000, 59000000, 80000000, 81000000, 56000000, 55000000, 40000000,
        // ],
        data: newDataExpense,
        fill: false,
        backgroundColor: 'rgba(255, 99, 132)',
        borderColor: 'rgba(255, 99, 132, 1)',
        tension: 0.1,
      },
    ],
  };

  const dataPie = {
    // empty, maintenance, occupied
    labels: ['Empty', 'Maintenance', 'Occupied'],
    datasets: [
      {
        label: '# of Votes',
        // data: [12, 19, 2],
        data: [emptyStatus, maintenaceStatus, occupiedStatus],
        backgroundColor: [
          'rgba(255, 99, 132, 0.8)',
          'rgba(54, 162, 235, 0.8)',
          'rgba(255, 206, 86, 0.8)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  useEffect(() => {
    dispatch(fetchRevenue());
  }, []);

  useEffect(() => {
    dispatch(fetchRoom());
  }, []);

  useEffect(() => {
    dispatch(fetchExpenses());
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
              <Col>
                <h1 className='text-center'>Dashboard</h1>
              </Col>
            </Row>
            <Row className='shadow m-5 border border-3'>
              <Col
                className='m-2'
                style={{
                  border: 'solid',
                  borderColor: 'green',
                  padding: '20px',
                }}
              >
                <h3
                  className='text-center mb-3'
                  style={{
                    border: 'solid',
                    borderColor: 'red',
                    padding: '10px',
                  }}
                >
                  Grafik Income
                </h3>
                <Row>
                  <Col>
                    <Bar data={dataGraph} />
                  </Col>
                  <Col className='d-flex justify-content-center align-items-center'>
                    <div className='text-center' style={{ width: '100%' }}>
                      <h2>Bulan: {newMonth()}</h2>
                      <h3>
                        Income : Rp.{' '}
                        {newDataRevenue[numberMonth()]?.toLocaleString()} /month
                      </h3>
                      <h3>
                        Expense : Rp.{' '}
                        {newDataExpense[numberMonth()]?.toLocaleString()} /month
                      </h3>
                      <h3>
                        Profit : Rp.{' '}
                        {Number(
                          newDataRevenue[numberMonth()] -
                            newDataExpense[numberMonth()]
                        )?.toLocaleString()}
                      </h3>
                    </div>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row className='shadow m-5 border border-3'>
              <Col
                className='m-2 d-flex align-items-center'
                style={{
                  flexDirection: 'column',
                  border: 'solid',
                  borderColor: 'yellow',
                  padding: '20px',
                }}
              >
                <h3
                  className='text-center mb-3'
                  style={{
                    border: 'solid',
                    borderColor: 'red',
                    padding: '10px',
                  }}
                >
                  Grafik Occupancy
                </h3>
                <div
                  // className='d-flex justify-content-center'
                  style={{
                    borderWidth: '10rem',
                    width: '50%',
                    borderColor: 'red',
                    border: 'solid',
                    padding: '5px',
                  }}
                >
                  <Doughnut data={dataPie} />
                </div>
              </Col>
            </Row>


        {/* >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> Start Expense */}
        <Row className='shadow m-5 border border-3'>
              <Col
                className='m-2 d-flex align-items-center'
                style={{
                  flexDirection: 'column',
                  border: 'solid',
                  borderColor: 'yellow',
                  padding: '20px',
                }}
              >
                <h3
                  className='text-center mb-3'
                  style={{
                    border: 'solid',
                    borderColor: 'red',
                    padding: '10px',
                  }}
                >
                  CRUD EXPENSE
                </h3>

                {/* ADDD */}
                <Button variant="primary" onClick={handleShow}>
                  Add
                </Button>
                  <p>{JSON.stringify(expenseData)}</p>


                <Modal show={show} onHide={handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <Form>
                      <Form.Group controlId="formBasicEmail">
                        <Form.Label>Title</Form.Label>
                        <Form.Control 
                          type="text" 
                          placeholder="expense title"  
                          value={expenseTitle}
                          onChange={ e => setExpenseTitle(e.target.value) } 
                        />
                      </Form.Group>
                      <Form.Group controlId="formBasicEmail">
                        <Form.Label>Month</Form.Label>
                        <Form.Control 
                          type="number" min={1} max={12}
                          value={expenseMonth}
                          onChange={ e => setExpenseMonth(e.target.value) }
                        />
                      </Form.Group>
                      <Form.Group controlId="formBasicEmail">
                        <Form.Label>Year</Form.Label>
                        <Form.Control 
                          type="number" min={1}
                          value={expenseYear}
                          onChange={ e => setExpenseYear(e.target.value) }
                        />
                      </Form.Group>
                      <Form.Group controlId="formBasicEmail">
                        <Form.Label>Total</Form.Label>
                        <Form.Control 
                          type="number" min={1}
                          value={expenseTotal}
                          onChange={ e => setExpenseTotal(e.target.value) }
                        />
                      </Form.Group>
                    </Form>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                      Close
                    </Button>
                    <Button variant="primary" onClick={addExpenseTransaction}>
                      Add
                    </Button>
                  </Modal.Footer>
                </Modal>

              </Col>
            </Row>
        {/* <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< End Expense*/}


          </Col>
        </Row>
      </Container>
    </>
  );
}

export default HomePage;
