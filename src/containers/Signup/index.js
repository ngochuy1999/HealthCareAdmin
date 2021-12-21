import React, { useState } from 'react';
import Layout from '../../components/Layout';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import Input from '../../components/UI/Input';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
// import { signup } from '../../actions';

function Signup(props) {

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const userSignup = (e) => {
    e.preventDefault();
    const user = {
      firstName,
      lastName,
      email,
      password
    }
    // dispatch(signup(user));
  }

  if (auth.authenticate) {
    return <Redirect to={`/`} />
  }

  return (
    <Layout>
      <Container>
        <Row style={{ paddingTop: '5rem' }}>
          <Col md={{ span: 6, offset: 3 }}>
            <Form onSubmit={userSignup}>
              <Row>
                <Col md={6}>
                  <Input
                    placeholder="First name"
                    label="First Name"
                    value={firstName}
                    type="text"
                    onChange={(e) => { setFirstName(e.target.value) }} />
                </Col>
                <Col md={6}>
                  <Input
                    placeholder="Last name"
                    label="Last Name"
                    value={lastName}
                    type="text"
                    onChange={(e) => { setLastName(e.target.value) }} />
                </Col>
              </Row>
              <Input
                placeholder="Email"
                label="Email"
                value={email}
                type="email"
                onChange={(e) => { setEmail(e.target.value) }} />

              <Input
                placeholder="Password"
                label="Password"
                value={password}
                type="password"
                onChange={(e) => { setPassword(e.target.value) }} />
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
}

export default Signup;