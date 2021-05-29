import React from 'react';
import { Nav } from 'react-bootstrap';
import { withRouter } from 'react-router';
import { useHistory } from 'react-router-dom';
import * as RiIcons from 'react-icons/ri';
import * as BsIcons from 'react-icons/bs';
import * as IoIcons from 'react-icons/io5';
import * as IoIcons4 from 'react-icons/io';
import './Sidebar.css';

const Side = (props, navigation) => {
  const History = useHistory();
  return (
    <>
      <Nav
        className='col-md-2 d-none d-md-block sidebar shadow'
        // className='flex-column'
        defaultActiveKey='/'
        variant='pills'
        style={{ backgroundColor: '#06BEE1' }}
      >
        <div className='sidebar-sticky'>
          <h3 className='ml-2 mb-3 text-center' style={{ color: 'white' }}>
            Papikos
          </h3>
        </div>
        <hr />
        <Nav.Item className='nav '>
          <Nav.Link
            onClick={() => {
              History.push('/');
            }}
            style={{ color: 'white' }}
          >
            <RiIcons.RiLayoutMasonryFill />
            <span>Dashboard</span>
          </Nav.Link>
        </Nav.Item>
        <Nav.Item className='nav'>
          <Nav.Link
            onClick={() => {
              History.push('/profile');
            }}
            style={{ color: 'white' }}
          >
            <RiIcons.RiProfileFill />
            <span>Property Profile</span>
          </Nav.Link>
        </Nav.Item>
        <Nav.Item className='nav'>
          <Nav.Link
            onClick={() => {
              History.push('/tenant');
            }}
            style={{ color: 'white' }}
          >
            <BsIcons.BsFillPeopleFill />
            <span>Tenant</span>
          </Nav.Link>
        </Nav.Item>
        <Nav.Item className='nav'>
          <Nav.Link
            onClick={() => {
              History.push('/calendar');
            }}
            style={{ color: 'white' }}
          >
            <IoIcons.IoCalendar />
            <span>Calendar</span>
          </Nav.Link>
        </Nav.Item>
        <Nav.Item className='nav'>
          <Nav.Link
            onClick={() => {
              History.push('/Gallery');
            }}
            style={{ color: 'white' }}
          >
            <IoIcons4.IoMdPhotos />
            <span>Gallery</span>
          </Nav.Link>
        </Nav.Item>
        <hr />
        <Nav.Item className='nav'>
          <Nav.Link
            onClick={() => {
              History.push('/Gallery');
            }}
            style={{ color: 'white' }}
          >
            <IoIcons4.IoMdExit />
            <span>Logout</span>
          </Nav.Link>
        </Nav.Item>
      </Nav>
    </>
  );
};
const Sidebar = withRouter(Side);
export default Sidebar;
