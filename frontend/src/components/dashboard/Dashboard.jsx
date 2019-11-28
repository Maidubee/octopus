import React from "react";
import { Container, Row, Col, MDBJumbotron as Jumbotron } from "mdbreact";
import CustomList from "../common/CustomList";
import projects from "../common/projects.json";
import clients from "../common/clients.json";
import suppliers from "../common/suppliers.json";
import objects from "../common/objects.json";

export default function Dashboard() {
  return (
    <Container className="mt-3">
      <Jumbotron>
        <h1>Welcome to your personal Octopus dashboard 😁</h1>
      </Jumbotron>
      <Row>
        <Col md={3}>
          <CustomList type="client" label="Clients" items={clients} />
        </Col>
        <Col md={3}>
          <CustomList type="project" label="Projects" items={projects} />
        </Col>
        <Col md={3}>
          <CustomList type="supplier" label="Suppliers" items={suppliers} />
        </Col>
        <Col md={3}>
          <CustomList type="object" label="Objects" items={objects} />
        </Col>
      </Row>
    </Container>
  );
}
