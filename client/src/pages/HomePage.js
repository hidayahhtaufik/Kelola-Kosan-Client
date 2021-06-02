import React, { useEffect, useState } from 'react';
import './styling/home.module.css';
import Sidebar from './components/Sidebar';
import { _, Grid } from 'gridjs-react';
import * as FaIcons from 'react-icons/fa';
import * as MdIcons from 'react-icons/md';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { newMonth, numberMonth, month } from '../helpers/helpers';
import { useDispatch, useSelector } from 'react-redux';
import {
  Container,
  Row,
  Col,
  Button,
  Modal,
  Form,
  Table,
} from 'react-bootstrap';
import { Doughnut, Bar, defaults } from 'react-chartjs-2';
import {
  fetchRevenue,
  fetchRoom,
  fetchExpenses,
  createExpenses,
  updateExpenses,
  deleteExpense,
  fetchPayment,
  fetchReportPayment,
  fetchReportExpenses,
} from '../store/actions/actions';

defaults.plugins.legend.position = 'right';

function HomePage({ component: Component, ...rest }) {
  const dispatch = useDispatch();

  const revenueData = useSelector((state) => state.revenue.revenues);
  const expenseData = useSelector((state) => state.expense.expenses);
  const reportExpenseData = useSelector(
    (state) => state.expense.reportExpenses
  );
  const reportPaymentData = useSelector(
    (state) => state.payment.reportPayments
  );
  const roomData = useSelector((state) => state.room.rooms);

  let newDataRevenue = [];
  for (let i = 0; i < revenueData.length; i++) {
    const revenue = revenueData[i].total;
    newDataRevenue.push(revenue);
  }
  console.log(revenueData, '<<< DI Home Revenue');
  console.log(newDataRevenue, '<<< Data Baru Revenue');

  let newDataPayment = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  reportPaymentData.map((data) => {
    newDataPayment[data.month - 1] = data.totalPaid;
  });

  let dataExpenseReport = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  reportExpenseData.map((data) => {
    dataExpenseReport[data.month - 1] = data.totalExpense;
  });

  console.log(reportPaymentData, '<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>');

  // Kebutuhan Expense ======================================================
  // ? >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> HOME Expense
  const [showAddForm, setShowAddForm] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);

  let newDataExpense = [...expenseData];

  const [expenseAddTitle, setExpenseAddTitle] = useState('');
  const [expenseAddMonth, setExpenseAddMonth] = useState(0);
  const [expenseAddYear, setExpenseAddYear] = useState(0);
  const [expenseAddTotal, setExpenseAddTotal] = useState(0);

  const [expenseUpdateTitle, setExpenseUpdateTitle] = useState('');
  const [expenseUpdateMonth, setExpenseUpdateMonth] = useState(0);
  const [expenseUpdateYear, setExpenseUpdateYear] = useState(0);
  const [expenseUpdateTotal, setExpenseUpdateTotal] = useState(0);
  const [expenseUpdateId, setExpenseUpdateId] = useState('');

  const handleCloseAddForm = () => setShowAddForm(false);
  const handleShowAddForm = () => setShowAddForm(true);
  const handleCloseUpdateForm = () => setShowUpdateForm(false);
  const handleShowUpdateForm = (payload) => {
    setExpenseUpdateTitle(payload.title);
    setExpenseUpdateMonth(payload.month);
    setExpenseUpdateYear(payload.year);
    setExpenseUpdateTotal(payload.total);
    setExpenseUpdateId(payload.id);
    setShowUpdateForm(true);
  };

  const addExpenseTransaction = () => {
    const newDataExpense = {
      title: expenseAddTitle,
      month: expenseAddMonth,
      year: expenseAddYear,
      total: expenseAddTotal,
    };
    dispatch(createExpenses(newDataExpense));
    handleCloseAddForm();
  };

  const updateExpenseTransaction = () => {
    const updateDataExpense = {
      title: expenseUpdateTitle,
      month: expenseUpdateMonth,
      year: expenseUpdateYear,
      total: expenseUpdateTotal,
    };
    dispatch(updateExpenses(expenseUpdateId, updateDataExpense));
    handleCloseAddForm();
  };

  const handelDeleteExpense = (id) => {
    dispatch(deleteExpense(id));
  };

  let newDataExpenseBar = [];
  for (let i = 0; i < expenseData.length; i++) {
    const expense = expenseData[i].total;
    newDataExpenseBar.push(expense);
  }

  // ? <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< End Expense

  // Kebutuhan Room ===========================================================
  let emptyStatus = 0;
  let maintenaceStatus = 0;
  let occupiedStatus = 0;

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
        // data: newDataRevenue,
        data: newDataPayment,
        fill: false,
        backgroundColor: 'rgb(54, 162, 235)',
        borderColor: 'rgba(54, 162, 235, 1)',
        tension: 0.1,
      },
      {
        label: 'Expense',
        // data: [
        //   60000000, 59000000, 80000000, 81000000, 56000000, 55000000, 40000000,
        // ],
        data: dataExpenseReport,
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
          'rgba(255, 99, 132)',
          'rgba(54, 162, 235)',
          'rgba(255, 206, 86)',
        ],
        borderWidth: 1,
        hoverOffset: 10,
        radius: '90%',
      },
    ],
  };
  console.log(rest, 'INI REST DI HOME');

  const handleExportToPdf = () => {
    const doc = new jsPDF();

    doc.text('Revenues Report', 85, 10);
    doc.autoTable({
      head: [['Id', 'Month', 'Year', 'Total']],
      body: reportPaymentData.map((t, index) => {
        return [
          index + 1,
          month(t.month),
          t.year,
          `Rp. ${t.totalPaid?.toLocaleString()}`,
        ];
      }),
    });
    doc.addPage();
    doc.text('Expenses Report', 85, 10);
    doc.autoTable({
      head: [['Id', 'Description', 'Month', 'Year', 'Total Expense']],
      body: reportExpenseData.map((t, index) => {
        return [
          index + 1,
          t.title,
          month(t.month),
          t.year,
          `Rp. ${t.totalPaid?.toLocaleString()}`,
        ];
      }),
    });

    doc.save('general_report.pdf');
  };

  const handleReportPdf = () => {
    const doc = new jsPDF();

    doc.text('Revenues Report', 85, 10);
    doc.autoTable({
      head: [[]],
    });

    doc.addPage();
    doc.text('Expense Report', 85, 10);
    doc.autoTable({
      head: [['Id', 'Description', 'Month', 'Year', 'Total Expense']],
      body: newDataExpense.map((t) => {
        return [
          t.id,
          t.title,
          month(t.month),
          t.year,
          `Rp. ${t.total?.toLocaleString()}`,
        ];
      }),
    });

    doc.save('expense_report.pdf');
  };

  useEffect(() => {
    dispatch(fetchRevenue());
    dispatch(fetchRoom());
    dispatch(fetchExpenses());
    dispatch(fetchPayment());
    dispatch(fetchReportPayment());
    dispatch(fetchReportExpenses());
  }, []);

  return (
    <>
      <Container fluid>
        <Row>
          <Col xs={2}>
            <Sidebar />
          </Col>
          <Col xs={10} style={{ padding: '20px' }}>
            <Row className='justify-content-md-center'>
              <Col>
                <h1
                  className='text-center'
                  style={{
                    fontWeight: 'bold',
                    fontSize: '50px',
                    color: '#343F56',
                  }}
                >
                  Dashboard
                </h1>
              </Col>
            </Row>
            <Row className='justify-content-md-centen m-5'>
              <Col
                className='text-center shadow '
                style={{
                  padding: '20px',
                  backgroundColor: 'rgb(255,216,120)',
                  borderRadius: 20,
                  color: 'white',
                  fontWeight: 'bold',
                  fontSize: '30px',
                }}
              >
                {newMonth(new Date())}
              </Col>
            </Row>
            <Row className='justify-content-md-centen m-5'>
              <Col
                className='text-center shadow '
                style={{
                  padding: '20px',
                  backgroundColor: 'rgb(54, 162, 235)',
                  borderRadius: 20,
                  color: 'white',
                  fontSize: '20px',
                }}
              >
                Income
                <div>Rp. {newDataPayment[numberMonth()]?.toLocaleString()}</div>
              </Col>
              <Col
                className='text-center shadow mr-4 ml-4'
                style={{
                  padding: '20px',
                  backgroundColor: 'rgba(255, 99, 132)',
                  borderRadius: 20,
                  color: 'white',
                  fontSize: '20px',
                }}
              >
                Expense
                <div>
                  Rp. {newDataExpenseBar[numberMonth()]?.toLocaleString()}
                </div>
              </Col>
              <Col
                className='text-center shadow '
                style={{
                  padding: '20px',
                  backgroundColor: 'rgba(75, 192, 192)',
                  borderRadius: 20,
                  color: 'white',
                  fontSize: '20px',
                }}
              >
                Profit
                <div style={{ fontWeight: 'bold' }}>
                  Rp.
                  {Number(
                    newDataPayment[numberMonth()] -
                      newDataExpenseBar[numberMonth()]
                  )?.toLocaleString()}
                </div>
              </Col>
            </Row>
            <Row
              className='shadow m-5 border border-3'
              style={{
                backgroundColor: 'white',
                borderRadius: 30,
              }}
            >
              <Col
                className='m-2'
                style={{
                  padding: '20px',
                }}
              >
                <h3
                  className='text-center mb-3'
                  style={{
                    padding: '10px',
                    fontWeight: 'bold',
                    color: '#343F56',
                  }}
                >
                  Income & Outcome
                </h3>
                <div className='d-flex justify-content-lg-center mb-3'>
                  <Button
                    onClick={() => {
                      console.log('clicked');
                      handleExportToPdf();
                    }}
                    variant='info shadow'
                  >
                    <MdIcons.MdFileDownload
                      style={{
                        fontSize: '1.3rem',
                        color: '#fff',
                        alignItems: 'center',
                        marginRight: '3px',
                      }}
                    />
                    Export To PDF
                  </Button>
                </div>

                <Row>
                  <Col className='text-center'>
                    <Bar data={dataGraph} />
                  </Col>
                  {/* <Col className='d-flex justify-content-center align-items-center'>
                    <Table bordered hover>
                      <tbody>
                        <tr>
                          <td>Month:</td>
                          <td>{newMonth()}</td>
                        </tr>
                      </tbody>
                      <tbody>
                        <tr>
                          <td>Income:</td>
                          <td>
                            Rp.{' '}
                            {newDataPayment[numberMonth()]?.toLocaleString()}{' '}
                          </td>
                        </tr>
                      </tbody>
                      <tbody>
                        <tr>
                          <td>Expense:</td>
                          <td>
                            Rp.{' '}
                            {newDataExpenseBar[numberMonth()]?.toLocaleString()}{' '}
                          </td>
                        </tr>
                      </tbody>
                      <tbody>
                        <tr>
                          <td>Profit:</td>
                          <td>
                            Rp.{' '}
                            {Number(
                              newDataPayment[numberMonth()] -
                                newDataExpenseBar[numberMonth()]
                            )?.toLocaleString()}
                          </td>
                        </tr>
                      </tbody>
                    </Table>
                  </Col> */}
                </Row>
              </Col>
            </Row>
            <Row
              className='shadow m-5 border border-3'
              style={{
                backgroundColor: 'white',
                borderRadius: 30,
              }}
            >
              <Col
                className='m-2 d-flex align-items-center'
                style={{
                  flexDirection: 'column',
                  padding: '20px',
                }}
              >
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
                  All Room Status
                </h3>
                <div
                  // className='d-flex justify-content-center'
                  style={{
                    borderWidth: '10rem',
                    width: '50%',
                    // borderColor: 'red',
                    // border: 'solid',
                    padding: '5px',
                  }}
                >
                  <Doughnut data={dataPie} />
                </div>
              </Col>
            </Row>

            {/* <Row
              className='shadow m-5 border border-3'
              style={{
                backgroundColor: 'white',
                borderRadius: 30,
              }}
            >
              <Col
                className='m-2 d-flex align-items-center'
                style={{
                  flexDirection: 'column',
                  padding: '20px',
                }}
              >
                <h3
                  className='text-center mb-3'
                  style={{
                    // border: 'solid',
                    // borderColor: 'red',
                    padding: '10px',
                    fontWeight: 'bold',
                  }}
                >
                  Expense Table
                </h3>

                <div style={{ alignSelf: 'flex-center' }}>
                  <Button
                    className='mr-2'
                    variant='primary shadow'
                    onClick={() => {
                      handleShowAddForm();
                    }}
                  >
                    <MdIcons.MdAdd
                      style={{
                        fontSize: '1.3rem',
                        color: '#fff',
                        alignItems: 'center',
                        marginRight: '3px',
                      }}
                    />
                    Input Expense
                  </Button>
                  <Button
                    onClick={() => {
                      console.log('clicked');
                      handleExportToPdf();
                    }}
                    variant='info shadow'
                  >
                    <MdIcons.MdFileDownload
                      style={{
                        fontSize: '1.3rem',
                        color: '#fff',
                        alignItems: 'center',
                        marginRight: '3px',
                      }}
                    />
                    Export To PDF
                  </Button>
                </div>

                <Grid
                  data={newDataExpense.map((e, index) => {
                    return [
                      index + 1,
                      e.title,
                      month(e.month),
                      e.year,
                      `Rp. ${e.total?.toLocaleString()}`,
                      _(
                        <>
                          {' '}
                          <Button
                            variant={'info'}
                            size='sm'
                            onClick={() => handleShowUpdateForm(e)}
                          >
                            <FaIcons.FaEdit />
                          </Button>{' '}
                          <Button
                            variant={'danger'}
                            size='sm'
                            onClick={() => handelDeleteExpense(e.id)}
                          >
                            <MdIcons.MdDelete />
                          </Button>{' '}
                        </>
                      ),
                    ];
                  })}
                  columns={['Id', 'Title', 'Month', 'Year', 'Total', 'Action']}
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

                <Modal show={showAddForm} onHide={handleCloseAddForm}>
                  <Modal.Header closeButton>
                    <Modal.Title>Add Expense</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <Form>
                      <Form.Group controlId='formBasicEmail'>
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                          type='text'
                          placeholder='expense title'
                          value={expenseAddTitle}
                          onChange={(e) => setExpenseAddTitle(e.target.value)}
                        />
                      </Form.Group>
                      <Form.Group controlId='formBasicEmail'>
                        <Form.Label>Month</Form.Label>
                        <Form.Control
                          type='number'
                          min={1}
                          max={12}
                          value={expenseAddMonth}
                          onChange={(e) => setExpenseAddMonth(e.target.value)}
                        />
                      </Form.Group>
                      <Form.Group controlId='formBasicEmail'>
                        <Form.Label>Year</Form.Label>
                        <Form.Control
                          type='number'
                          min={1}
                          value={expenseAddYear}
                          onChange={(e) => setExpenseAddYear(e.target.value)}
                        />
                      </Form.Group>
                      <Form.Group controlId='formBasicEmail'>
                        <Form.Label>Total</Form.Label>
                        <Form.Control
                          type='number'
                          min={1}
                          value={expenseAddTotal}
                          onChange={(e) => setExpenseAddTotal(e.target.value)}
                        />
                      </Form.Group>
                    </Form>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant='secondary' onClick={handleCloseAddForm}>
                      Close
                    </Button>
                    <Button variant='primary' onClick={addExpenseTransaction}>
                      Add
                    </Button>
                  </Modal.Footer>
                </Modal>

                <Modal show={showUpdateForm} onHide={handleCloseUpdateForm}>
                  <Modal.Header closeButton>
                    <Modal.Title>Update Expense</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <Form>
                      <Form.Group controlId='formBasicEmail'>
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                          type='text'
                          placeholder='expense title'
                          value={expenseUpdateTitle}
                          onChange={(e) =>
                            setExpenseUpdateTitle(e.target.value)
                          }
                        />
                      </Form.Group>
                      <Form.Group controlId='formBasicEmail'>
                        <Form.Label>Month</Form.Label>
                        <Form.Control
                          type='number'
                          min={1}
                          max={12}
                          value={expenseUpdateMonth}
                          onChange={(e) =>
                            setExpenseUpdateMonth(e.target.value)
                          }
                        />
                      </Form.Group>
                      <Form.Group controlId='formBasicEmail'>
                        <Form.Label>Year</Form.Label>
                        <Form.Control
                          type='number'
                          min={1}
                          value={expenseUpdateYear}
                          onChange={(e) => setExpenseUpdateYear(e.target.value)}
                        />
                      </Form.Group>
                      <Form.Group controlId='formBasicEmail'>
                        <Form.Label>Total</Form.Label>
                        <Form.Control
                          type='number'
                          min={1}
                          value={expenseUpdateTotal}
                          onChange={(e) =>
                            setExpenseUpdateTotal(e.target.value)
                          }
                        />
                      </Form.Group>
                    </Form>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant='secondary' onClick={handleCloseUpdateForm}>
                      Close
                    </Button>
                    <Button
                      variant='primary'
                      onClick={updateExpenseTransaction}
                    >
                      Update
                    </Button>
                  </Modal.Footer>
                </Modal>
              </Col>
            </Row> */}
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default HomePage;
