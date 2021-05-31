import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from '../API/axios';
import { userRegister } from '../store/actions/actions';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

export default function Register() {
  const History = useHistory();

  const dispatch = useDispatch();
  const [email, setEmail] = useState();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [fullName, setFullName] = useState();
  const [bankAccount, setBankAccount] = useState();

  async function registerHandler(e) {
    e.preventDefault();
    dispatch(userRegister(email, username, password, fullName, bankAccount));
    History.push('/login');
  }
  return (
    // <Container fluid>
    //   <Row style={{ height: '100vh' }}>
    //     <Col
    //       sm={8}
    //       xs={8}
    //       style={{
    //         backgroundImage:
    //           'url(https://images.unsplash.com/photo-1533512389737-05a29630f71e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80)',
    //         backgroundRepeat: 'no-repeat',
    //         backgroundSize: 'cover',
    //       }}
    //     ></Col>

    //     <Col sm={4} xs={4} style={{ backgroundColor: '#06BEE1' }}>
    //       <Container
    //         fluid
    //         className='shadow border border-dark'
    //         style={{
    //           marginTop: '15vh',
    //           width: '450px',
    //           backgroundColor: '#ffffff',
    //           borderRadius: '15px',
    //         }}
    //       >
    //         <h1 className='mt-5' style={{ textAlign: 'center' }}>
    //           Register
    //         </h1>
    //         <Form onSubmit={registerHandler} className='mt-5 mb-5 ml-3 mr-3'>
    //           <Form.Group controlId='formBasicEmail'>
    //             <Form.Label>Email address:</Form.Label>
    //             <Form.Control
    //               type='email'
    //               placeholder='Enter email'
    //               onChange={(e) => {
    //                 setEmail(e.target.value);
    //               }}
    //             />
    //           </Form.Group>

    //           <Form.Group controlId='formBasicUsername'>
    //             <Form.Label>Username:</Form.Label>
    //             <Form.Control
    //               type='text'
    //               placeholder='Enter Username'
    //               onChange={(e) => {
    //                 setUsername(e.target.value);
    //               }}
    //             />
    //           </Form.Group>

    //           <Form.Group controlId='formBasicPassword'>
    //             <Form.Label>Password:</Form.Label>
    //             <Form.Control
    //               type='password'
    //               placeholder='Password'
    //               onChange={(e) => {
    //                 setPassword(e.target.value);
    //               }}
    //             />
    //           </Form.Group>

    //           <Button
    //             className='mt-3'
    //             variant='primary'
    //             type='submit'
    //             style={{ width: '100%' }}
    //           >
    //             Register
    //           </Button>

    //           <div
    //             className='mt-3'
    //             style={{ display: 'flex', justifyContent: 'center' }}
    //           >
    //             <p>
    //               Already have an account?{' '}
    //               <Link to='/login'>
    //                 <span>Login here</span>
    //               </Link>
    //             </p>
    //           </div>
    //         </Form>
    //       </Container>
    //     </Col>
    //   </Row>
    // </Container>

    <div className="bg-info d-flex" style={{minHeight: "100vh"}}>
      <div className="container align-items-center justify-content-around d-flex flex-column mx-auto my-auto bg-white" style={{height: "75vh", maxWidth: "55vw", borderRadius: "30px"}}>
      <div claassName="row">
        <h1>Register</h1>
      </div>

          <form onSubmit={registerHandler} className="d-flex justify-content-center" style={{ width: "90%" }}>
      <div className="row" style={{ width: "90%" }}>
        <Col>
            <div className="mb-3">
              <label for="exampleInputEmail1" className="form-label">Username</label>
              <input onChange={(e) => { setUsername(e.target.value) }} placeholder="Username" type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
            </div>
            <div className="mb-3">
              <label for="exampleInputEmail1" className="form-label">Email address</label>
              <input onChange={(e) => { setEmail(e.target.value) }} placeholder="Email Address" type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
            </div>
            <div className="mb-3">
              <label for="exampleInputPassword1" className="form-label">Password</label>
              <input onChange={(e) => setPassword(e.target.value)} placeholder="Password" type="password" className="form-control" id="exampleInputPassword1" />
            </div>
            
        </Col>
        <Col>
            <div className="mb-3">
              <label for="exampleInputEmail1" className="form-label">Full Name</label>
              <input onChange={(e) => { setFullName(e.target.value) }} placeholder="Full Name" type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
            </div>
            <div className="mb-3">
              <label for="exampleInputEmail1" className="form-label">Bank Account</label>
              <input onChange={(e) => { setBankAccount(e.target.value) }} placeholder="Bank Account" type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
            </div>
        </Col>
        <div className="d-flex justify-content-center">
              <Button rounded size={"lg"} type="submit" style={{
                color: "black",
                minWidth: "60%",
                maxWidth: "80%",
                background: "#85FFBD",
                background: "linear-gradient(45deg, #85FFBD 0%, #FFFB7D 50%)"
              }}
              >Submit</Button>
            </div>
      </div>
        </form>

      <div className="row">
        <h6>
          Already have an account?{' '}
          <Link to='/login'>
            <span>Login Here</span>
          </Link>
        </h6>
      </div>
      </div>
    </div>
  );
}
