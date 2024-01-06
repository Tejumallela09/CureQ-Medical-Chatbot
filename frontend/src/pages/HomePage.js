import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import { Link } from "react-router-dom";
import yourImageSource from '../images/img1.jpeg'; // Adjust the relative path accordingly

function HomePage() {
  const buttonStyle = {
    backgroundColor: '#D5F0C1',
    color: '#000', // Adjust text color as needed
    border: 'none',
  };

  return (
    <Container fluid>
      <Row className='mt-5'>
        <Col className='d-flex align-items-stretch'>
          {/* Image in the first column */}
          <Image src={yourImageSource} fluid />
        </Col>
        <Col className='d-flex align-items-center justify-content-center' style={{ minHeight: '100vh' }}>
          {/* Login and Register buttons in the center of the second column */}
          <div>
            <Button variant='primary' className='me-3' style={buttonStyle}>
              <Link to={"/login"}> Login </Link>
            </Button>
            <Button variant='secondary' style={buttonStyle}>
              <Link to={"/register"}> Register </Link>
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default HomePage;
