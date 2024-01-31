import React, { useState } from 'react';
import { FaBars } from 'react-icons/fa';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { logout } from '../redux/actions/userActions';
import {useDispatch} from "react-redux";
const HeaderComponent = () => {
  const dispatch=useDispatch();
  const expandValue = 'lg'; // Choose the desired expand value
  const [showOffcanvas, setShowOffcanvas] = useState(false);

  const handleToggle = () => setShowOffcanvas(!showOffcanvas);

  return (
    <>
      <style>
        {`
          .offcanvas-toggle-button {
            background-color: transparent;
            border: none;
            padding: 0;
          }
        `}
      </style>

      <Navbar expand={expandValue} style={{ backgroundColor: '#D5F0C1' }} className="mb-3">
        <Container fluid>
          <Button
            variant="light"
            onClick={handleToggle}
            className="me-2 offcanvas-toggle-button"
          >
            <FaBars /> {/* Icon for the toggle button */}
          </Button>

          <Offcanvas
            show={showOffcanvas}
            onHide={() => setShowOffcanvas(false)}
            aria-labelledby="offcanvasNavbarLabel"
            placement="start"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id="offcanvasNavbarLabel">CureQ</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="flex-column">
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="#action2" onClick={()=>dispatch(logout())}>Logout</Nav.Link>
                <NavDropdown title="Dropdown" id="offcanvasNavbarDropdown">
                  <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                  <NavDropdown.Item href="#action4">Another action</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action5">Something else here</NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Offcanvas.Body>
          </Offcanvas>
          <Navbar.Brand className="mx-auto">CureQ</Navbar.Brand>
        </Container>
      </Navbar>
    </>
  );
}

export default HeaderComponent;
