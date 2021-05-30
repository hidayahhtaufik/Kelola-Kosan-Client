import React from 'react';
import './App.css';
import { Switch, Route, Link } from 'react-router-dom';
import Register from './pages/RegisterPage';
import Login from './pages/LoginPage';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import TenantPage from './pages/TenantPage';
import CalendarPage from './pages/CalendarPage';
import GalleryPage from './pages/GalleryPage';
import RoomPage from './pages/RoomPage';

function App() {
  return (
    <>
      <div className='App'>
        <Switch>
          <Route exact path='/register'>
            <Register />
          </Route>
          <Route path='/login'>
            <Login />
          </Route>
          <Route path='/gallery'>
            <GalleryPage />
          </Route>
          <Route path='/calendar'>
            <CalendarPage />
          </Route>
          <Route path='/tenant'>
            <TenantPage />
          </Route>
          <Route path='/profile'>
            <ProfilePage />
          </Route>
          <Route path='/rooms'>
            <RoomPage />
          </Route>
          <Route path='/'>
            <HomePage />
          </Route>
        </Switch>
      </div>
    </>
  );
}

export default App;
