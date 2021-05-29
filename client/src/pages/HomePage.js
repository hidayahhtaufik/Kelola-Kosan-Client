import React from 'react';
import Sidebar from './components/Sidebar';
import {
  Container,
  Row,
  Col,
  Button,
  Navbar,
  Nav,
  NavDropdown,
} from 'react-bootstrap';
import { Doughnut, Bar } from 'react-chartjs-2';

// const labels = Utils.months({ count: 7 });
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
      label: 'profit',
      data: [65, 59, 80, 81, 56, 55, 40],
      fill: false,
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      borderColor: 'rgba(75, 192, 192, 1)',
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
      data: [12, 19, 2],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
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

function HomePage() {
  return (
    <>
      <Container fluid>
        <Row>
          <Col xs={3} id='sidebar-wrapper'>
            <Sidebar />
          </Col>
          <Col xs={9} id='page-content-wrapper'>
            <Row className='justify-content-md-center'>
              <Col>
                <h1 className='text-center'>Halaman Dashboard</h1>
              </Col>
            </Row>
            <Row>
              <Col>
                <h3 className='text-center'>Grafik Profit</h3>
                <Bar data={dataGraph} />
              </Col>
            </Row>
            <Row>
              <Col>
                <h3 className='text-center'>Grafik Occupancy</h3>
                <Doughnut data={dataPie} />
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default HomePage;
