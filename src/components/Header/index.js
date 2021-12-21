import React, { useEffect, useState } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { signout } from '../../actions';
import './style.css';

function Header(props) {
  const [admin, setAdmin] = useState(null);
  useEffect(() => {
    setAdmin(JSON.parse(window.localStorage.getItem('admin')));
  }, [])

  const renderLoggedInLinks = () => {
    return (
      <Nav>
        <li className="nav-item">
          <span className="nav-link" onClick={() => {
            window.localStorage.setItem('admin', null);
            window.location.href='/signIn';
          }}>Signout</span>
        </li>
      </Nav>
    );
  }

  const renderNonLoggedInLinks = () => {
    return (
      <Nav>
        {/* <Nav.Link href="#memes">
        <i class="far fa-user-circle"></i>&nbsp;
        cobebandiem
        </Nav.Link> */}
        <li className="nav-item">
          <Link to="/signin" className="nav-link">Signin</Link>
        </li>
      </Nav>
    );
  }

  return (
    <Navbar className="navbar" collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container fluid>
        <Link to="/" className="navbar-brand">Health Care</Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
          </Nav>
          {admin ? renderLoggedInLinks() : renderNonLoggedInLinks()}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;