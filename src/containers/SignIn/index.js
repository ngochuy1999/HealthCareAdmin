import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import Input from '../../components/UI/Input';
import { login } from '../../actions';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

function Signin(props) {

  const [email, setEmail] = useState('huy@gmail.com');
  const [password, setPassword] = useState('admin');
  const [message, setMessage] = useState('');
  const userLogin = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8080/api/admin/login', { email, password })
      .then(res => {
        console.error('res: ', res.data.data)
        if (res.data.status) {
          window.location.href = '/medical';
          localStorage.setItem('admin', JSON.stringify(res.data.data))
        } else {
          setMessage('Vui lòng kiểm tra tài khoản hoặc mật khẩu!')
        }
      })
  }

  return (
    <Layout>
      <Container>
        <Row style={{ paddingTop: '5rem' }}>
          <Col md={{ span: 6, offset: 3 }}>
          <p style={{ color: 'red' }}>{message}</p>
            <Form onSubmit={userLogin}>
              <Input
                placeholder="Email"
                label="Email"
                value={email}
                type="email"
                onChange={(e) => setEmail(e.target.value)} />

              <Input
                placeholder="Mật khẩu"
                label="Mật khẩu"
                value={password}
                type="password"
                onChange={(e) => setPassword(e.target.value)} />
              <Button variant="primary" type="submit">
                Đăng nhập
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
}

export default Signin;