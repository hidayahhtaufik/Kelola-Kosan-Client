import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { postLogin } from '../store/actions/actions';
import { useHistory } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const history = useHistory();

  const handleSubmit = (event) => {
    event.preventDefault();
    postLogin(email, password).then((response) => {
      if (localStorage.getItem('access_token')) {
        history.push('/');
      } else {
      }
    });
  };

  return (
    // <Container className='m-5'>
    //   <Row>
    //     <Col>
    //       <Container className='justify-content-md-center'>
    //         <Row>
    //           <Col>
    //             <h1>Login</h1>
    //           </Col>
    //         </Row>
    //         <Row>
    //           <Col>
    //             <Form>
    //               <Form.Group className='mb-3'>
    //                 <Form.Label>Email address</Form.Label>
    //                 <Form.Control type='email' placeholder='Enter email' />
    //               </Form.Group>
    //               <Form.Group className='mb-3'>
    //                 <Form.Label>Password</Form.Label>
    //                 <Form.Control type='password' placeholder='Password' />
    //               </Form.Group>
    //               <Button variant='primary' type='submit'>
    //                 Submit
    //               </Button>
    //             </Form>
    //           </Col>
    //         </Row>
    //       </Container>
    //     </Col>
    //   </Row>
    // </Container>

    <div
      className='d-flex'
      style={{
        minHeight: '100vh',
        background:
          'linear-gradient( 90.5deg,  rgba(255,207,139,0.50) 1.1%, rgba(255,207,139,1) 81.3% )',
        // background: "##00DBDE",
        // background: "linear-gradient(270deg, #00DBDE 19%, #FC00FF 100%)"
      }}
    >
      <div
        className='container shadow align-items-center justify-content-around d-flex flex-column mx-auto my-auto bg-white'
        style={{ height: '75vh', maxWidth: '40vw', borderRadius: '30px' }}
      >
        <div claassName='row'>
          <h1>Login</h1>
        </div>

        <div className='row' style={{ width: '90%' }}>
          <form onSubmit={(event) => handleSubmit(event)}>
            <div className='mb-3'>
              <label className='form-label'>Email address</label>
              <input
                onChange={(event) => setEmail(event.target.value)}
                placeholder='Email Address'
                type='email'
                className='form-control'
                aria-describedby='emailHelp'
              />
            </div>
            <div className='mb-3'>
              <label className='form-label'>Password</label>
              <input
                onChange={(event) => setPassword(event.target.value)}
                placeholder='Password'
                type='password'
                className='form-control'
              />
            </div>

            <div className='d-flex justify-content-center'>
              <Button
                rounded
                variant={'outline-success'}
                size={'lg'}
                type='submit'
                style={{
                  // color: 'black',
                  minWidth: '60%',
                  maxWidth: '80%',
                  // background: "linear-gradient( 90.5deg,  rgba(255,207,139,0.50) 1.1%, rgba(255,207,139,1) 81.3% )"
                }}
              >
                Login
              </Button>
            </div>
          </form>
        </div>

        <div className='row'>
          <h6>
            Don't have an account?
            <Link to='/register'>
              <span>Register here</span>
            </Link>
          </h6>
        </div>
      </div>
    </div>
  );
}

export default Login;
