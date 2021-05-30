import React, {useState, useEffect} from 'react';
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
import ProtectedRoute from './protectedRoute';

function App() {
  
  return (
    <>
      <div className='App'>
        <Switch>
          <Route exact path='/register'>
            <Register />
          </Route>
          <Route path='/login' component={Login} />
          <ProtectedRoute path="/gallery" component={GalleryPage} />
          <ProtectedRoute path="/calendar" component={CalendarPage} />
          <ProtectedRoute path="/tenant" component={TenantPage} />
          <ProtectedRoute path="/profile" component={ProfilePage} />
          <ProtectedRoute path='/rooms' component={RoomPage} />
          <ProtectedRoute path='/' component={HomePage} />
        </Switch>
      </div>
    </>
  );
}

export default App;
