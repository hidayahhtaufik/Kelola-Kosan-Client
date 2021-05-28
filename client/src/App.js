import './App.css';
import { Switch, Route, Link } from 'react-router-dom';

import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import TenantPage from './pages/TenantPage';
import CalendarPage from './pages/CalendarPage';
import GalleryPage from './pages/GalleryPage';

function App() {
  return (
    <>
      {/* <ul>
        <li>
          <Link to='/'>Home</Link>
        </li>
      </ul> */}
      <Switch>
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
        <Route path='/'>
          <HomePage />
        </Route>
      </Switch>
    </>
  );
}

export default App;
