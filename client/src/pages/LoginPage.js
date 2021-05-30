import React, {useState} from "react";
import { Container, Row, Col, Form, Button, Image } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { postLogin } from "../store/actions/actions"
import {useHistory} from "react-router-dom"


function Login() {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const history = useHistory();

    const handleSubmit = (event) => {
        event.preventDefault();
        postLogin(email, password)
          .then(response => {
            if(localStorage.getItem("access_token")) {
              history.push("/");
            } else {
    
            }
          })
        
    };

    return (
      <Container fluid>
        <Row style={{ height: "100vh" }}>

          <Col sm={8} xs={8} style={{
          backgroundImage: "url(https://images.unsplash.com/photo-1533512389737-05a29630f71e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover"
          }}></Col>

          <Col sm={4} xs={4} style={{backgroundColor: "#06BEE1"}}>
            <Container fluid className="shadow border border-dark" style={{ marginTop: "15vh", width: "450px", backgroundColor: "#ffffff", borderRadius: "15px"}}>
              <h1 className="mt-5" style={{ textAlign:"center" }}>Login</h1>
              <Form onSubmit={(event) => handleSubmit(event)} className="mt-5 mb-5 ml-3 mr-3">

                <Form.Group controlId="formBasicUsername">
                  <Form.Label>Username:</Form.Label>
                  <Form.Control  type="text" placeholder="Enter Username" onChange={(event) => setEmail(event.target.value)}/>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Password:</Form.Label>
                  <Form.Control type="password" placeholder="Password" onChange={(event) => setPassword(event.target.value)}/>
                </Form.Group>

                <Button className="mt-3" variant="success" type="submit" style={{width: "100%"}}>
                  Login
                </Button>

                <div className="mt-3" style={{ display: "flex", justifyContent: "center"}}>
                  <p>Don't have an account? <Link to="/register"><span>Register here</span></Link></p>
                </div>

              </Form>
            </Container>
          </Col>
        </Row>
      </Container>
    );
}

export default Login