import React, { useEffect, useState } from 'react';
import Sidebar from './components/Sidebar';
import { _, Grid } from 'gridjs-react';
import * as FaIcons from 'react-icons/fa';
import * as MdIcons from 'react-icons/md';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { newMonth, numberMonth, month } from '../helpers/helpers';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Row, Col, Button, Modal, Form } from 'react-bootstrap';
import {
  fetchRevenue,
  fetchExpenses,
  createExpenses,
  updateExpenses,
  deleteExpense,
  fetchReportPayment,
  fetchReportExpenses,
} from '../store/actions/actions';

function HistoryPage() {
  const dispatch = useDispatch();

  const expenseData = useSelector((state) => state.expense.expenses);
  const reportExpenseData = useSelector(
    (state) => state.expense.reportExpenses
  );
  const reportPaymentData = useSelector(
    (state) => state.payment.reportPayments
  );

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
    handleCloseUpdateForm();
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

  useEffect(() => {
    dispatch(fetchRevenue());
    dispatch(fetchExpenses());
    dispatch(fetchReportPayment());
    dispatch(fetchReportExpenses());
  }, []);

  const handleExportToPdf = () => {
    const doc = new jsPDF();

    // doc.text('Revenues Report', 85, 10);
    // doc.autoTable({
    //   head: [['Month', 'Year', 'Total']],
    //   body: reportPaymentData.map((t, index) => {
    //     return [
    //       index,
    //       month(t.month),
    //       t.year,
    //       `Rp. ${t.totalPaid?.toLocaleString()}`,
    //     ];
    //   }),
    // });
    // doc.addPage();

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

    doc.save('expense_report.pdf');
  };

  const handleExportPaymentToPdf = () => {
    const doc = new jsPDF();

    doc.text('Revenue Report', 85, 10);
    doc.autoTable({
      head: [['Id', 'Month', 'Year', 'Total Revenue']],
      body: reportPaymentData.map((t, index) => {
        return [
          index + 1,
          month(t.month),
          t.year,
          `Rp. ${t.totalPaid?.toLocaleString()}`,
        ];
      }),
    });

    doc.save('revenue_report.pdf');
  };

  return (
    <>
      <Container fluid>
        <Row>
          <Col xs={2}>
            <Sidebar />
          </Col>
          <Col xs={10} style={{ padding: '20px' }}>
            <Row className='justify-content-md-center'>
              <h1
                className='text-center'
                style={{
                  fontWeight: 'bold',
                  fontSize: '50px',
                  color: '#343F56',
                }}
              >
                History
              </h1>
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

                {/* Update */}
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
            </Row>

            {/* ======================== PROFIT =========================== */}

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
                  }}
                >
                  Income Table
                </h3>

                <div style={{ alignSelf: 'flex-center' }}>
                  <Button
                    onClick={() => {
                      console.log('clicked');
                      handleExportPaymentToPdf();
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
                  data={reportPaymentData.map((e, index) => {
                    return [
                      index + 1,
                      month(e.month),
                      e.year,
                      `Rp. ${e.totalPaid?.toLocaleString()}`,
                    ];
                  })}
                  columns={['Id', 'Month', 'Year', 'Total']}
                  sort={true}
                  search={true}
                  pagination={{
                    enabled: true,
                    // limit: 5,
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
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default HistoryPage;
