import React from 'react';
import Sidebar from './components/Sidebar';
import Navigation from './components/Navigation';
import {
  Container,
  Row,
  Col,
  Button,
  Navbar,
  Nav,
  NavDropdown,
} from 'react-bootstrap';
import { Doughnut, Bar, defaults } from 'react-chartjs-2';

// console.log(defaults);
defaults.plugins.legend.position = 'right';

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
      label: 'Profit',
      data: [
        60000000, 59000000, 80000000, 81000000, 56000000, 55000000, 40000000,
      ],
      fill: false,
      backgroundColor: 'rgba(75, 192, 192)',
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

function HomePage() {
  return (
    <>
      {/* <Navigation /> */}
      <Container fluid>
        <Row>
          <Col xs={2} id='sidebar-wrapper'>
            <Sidebar />
          </Col>
          <Col xs={10} id='page-content-wrapper'>
            <Row className='justify-content-md-center'>
              <Col>
                <h1 className='text-center'>Dashboard</h1>
              </Col>
            </Row>
            <Row className='shadow m-5 border border-3'>
              <Col className='m-2'>
                <h3 className='text-center mb-3'>Grafik Profit</h3>
                <Row>
                  <Col>
                    <Bar data={dataGraph} />
                  </Col>
                  <Col className='d-flex justify-content-center align-items-center'>
                    <div className='text-center' style={{ width: '100%' }}>
                      <h2>Rp. 20.000.000</h2>
                    </div>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row className='shadow m-5 border border-3'>
              <Col
                className='m-2 d-flex align-items-center'
                style={{ flexDirection: 'column' }}
              >
                <h3 className='text-center'>Grafik Occupancy</h3>
                <div
                  // className='d-flex justify-content-center'
                  style={{
                    borderWidth: '10rem',
                    width: '50%',
                    borderColor: 'red',
                  }}
                >
                  <Doughnut data={dataPie} />
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default HomePage;
