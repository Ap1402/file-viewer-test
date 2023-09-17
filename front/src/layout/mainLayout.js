import React from "react";
import { Col, Row } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";

const MainLayout = ({ children }) => (
  <main>
    <Navbar expand="lg" className="bg-danger bg-gradient mb-5">
      <Container>
        <Navbar.Brand className="text-white fw-bold">React Test App</Navbar.Brand>
      </Container>
    </Navbar>
    <Container fluid>
      <Row className="justify-content-md-center">
        <Col xs='12'>{children}</Col>
      </Row>
    </Container>
  </main>
);

export default MainLayout;
