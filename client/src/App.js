import React from 'react'
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Register from './pages/RegisterPage'
import Login from './pages/LoginPage'

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/register">
            <Register/>
          </Route>
          <Route path="/login">
            <Login/>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
