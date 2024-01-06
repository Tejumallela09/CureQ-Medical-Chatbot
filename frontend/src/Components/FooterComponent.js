import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

function FooterComponent() {
  const footerStyle = {
    backgroundColor: '#D5F0C1',
    padding: '2px',
    marginTop: 'auto', // This will push the footer to the bottom
  };

  return (
    <footer style={footerStyle}>
      <Container>
        <Row className='mt-1'>
          <Col className="text-center py-0.5"> CureQ can make mistakes. Consider checking important information</Col>
        </Row>
      </Container>
    </footer>
  );
}

export default FooterComponent;
