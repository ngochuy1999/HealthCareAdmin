import React from 'react';
import Header from '../Header';
import { Col, Container, Row } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

import './style.css';

function Layout(props) {
  return (
    <>
      <Header />
      {
        props.sidebar ?
          <Container fluid>
            <Row>
              <Col md={2} className="sidebar">
                <ul>
                  {/* <li><NavLink exact to={`/home`}>Home</NavLink></li> */}
                  <li><NavLink to={`/medical`}>Medical</NavLink></li>
                  <li><NavLink to={`/test-result`}>Add Test Result</NavLink></li>
                  {/* <li><NavLink to={`/medical-record`}>Medical Record</NavLink></li> */}
                </ul>
              </Col>
              <Col md={10} style={{ marginLeft: 'auto', paddingTop: '60px' }}>
                {props.children}
              </Col>
            </Row>
          </Container>
          : props.children
      }
    </>
  );
}

export default Layout;