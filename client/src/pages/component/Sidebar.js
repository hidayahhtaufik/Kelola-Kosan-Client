import React from 'react';
// import '../App.css';
import { Nav } from 'react-bootstrap';
import { withRouter } from 'react-router';
import { useHistory } from 'react-router-dom';
import './Sidebar.css';

const Side = (props, navigation) => {
  const History = useHistory();
  return (
    <>
      <Nav
        className='col-md-2 d-none d-md-block sidebar'
        // className='flex-column'
        defaultActiveKey='/'
        variant='pills'
        // onSelect={(selectedKey) => alert(`selected ${selectedKey}`)}
        style={{ backgroundColor: '#06BEE1' }}
      >
        <div className='sidebar-sticky'>
          <h3 className='ml-2 mb-3' style={{ color: 'white' }}>
            Papikos
          </h3>
        </div>
        <Nav.Item className='nav'>
          <Nav.Link
            onClick={() => {
              History.push('/');
            }}
            style={{ color: 'white' }}
          >
            Dashboard
          </Nav.Link>
        </Nav.Item>
        <Nav.Item className='nav'>
          <Nav.Link
            onClick={() => {
              History.push('/profile');
            }}
            style={{ color: 'white' }}
          >
            Property Profile
          </Nav.Link>
        </Nav.Item>
        <Nav.Item className='nav'>
          <Nav.Link
            onClick={() => {
              History.push('/tenant');
            }}
            style={{ color: 'white' }}
          >
            Tenant
          </Nav.Link>
        </Nav.Item>
        <Nav.Item className='nav'>
          <Nav.Link
            onClick={() => {
              History.push('/calendar');
            }}
            style={{ color: 'white' }}
          >
            Calendar
          </Nav.Link>
        </Nav.Item>
        <Nav.Item className='nav'>
          <Nav.Link
            onClick={() => {
              History.push('/Gallery');
            }}
            style={{ color: 'white' }}
          >
            Gallery
          </Nav.Link>
        </Nav.Item>
      </Nav>
    </>
  );
};
const Sidebar = withRouter(Side);
export default Sidebar;
