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
    //           Login
    //         </h1>
    //         <Form
    //           onSubmit={(event) => handleSubmit(event)}
    //           className='mt-5 mb-5 ml-3 mr-3'
    //         >
    //           <Form.Group controlId='formBasicUsername'>
    //             <Form.Label>Email:</Form.Label>
    //             <Form.Control
    //               type='text'
    //               placeholder='Enter Username'
    //               onChange={(event) => setEmail(event.target.value)}
    //             />
    //           </Form.Group>

    //           <Form.Group controlId='formBasicPassword'>
    //             <Form.Label>Password:</Form.Label>
    //             <Form.Control
    //               type='password'
    //               placeholder='Password'
    //               onChange={(event) => setPassword(event.target.value)}
    //             />
    //           </Form.Group>

    //           <Button
    //             className='mt-3'
    //             variant='success'
    //             type='submit'
    //             style={{ width: '100%' }}
    //           >
    //             Login
    //           </Button>

    //           <div
    //             className='mt-3'
    //             style={{ display: 'flex', justifyContent: 'center' }}
    //           >
                // <p>
                //   Don't have an account?{' '}
                //   <Link to='/register'>
                //     <span>Register here</span>
                //   </Link>
                // </p>
    //           </div>
    //         </Form>
    //       </Container>
    //     </Col>
    //   </Row>
    // </Container>
    <div className="bg-info d-flex" style={{minHeight: "100vh"}}>
      <div className="container align-items-center justify-content-around d-flex flex-column mx-auto my-auto bg-white" style={{height: "75vh", maxWidth: "40vw", borderRadius: "30px"}}>
      <div claassName="row">
        <h1>Login</h1>
      </div>

      <div className="row" style={{ width: "90%" }}>
        <form onSubmit={(event) => handleSubmit(event)}>
          <div className="mb-3">
            <label for="exampleInputEmail1" className="form-label">Email address</label>
            <input onChange={(event) => setEmail(event.target.value)} placeholder="Email Address" type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
          </div>
          <div className="mb-3">
            <label for="exampleInputPassword1" className="form-label">Password</label>
            <input onChange={(event) => setPassword(event.target.value)} placeholder="Password" type="password" className="form-control" id="exampleInputPassword1"/>
          </div>

          <div className="d-flex justify-content-center">
            <Button rounded size={"lg"} type="submit" style={{color:"black",
            minWidth: "60%",
            maxWidth: "80%",
            background: "#85FFBD",
            background: "linear-gradient(45deg, #85FFBD 0%, #FFFB7D 50%)"}}
            >Submit</Button>
          </div>
        </form>
      </div>

      <div className="row">
        <h6>
          Don't have an account?{' '}
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
