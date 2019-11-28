import React from "react";
import { Container, Row, Col, MDBJumbotron as Jumbotron } from "mdbreact";
import RelatedItems from "../common/RelatedItems";
import projects from "../common/projects.json";
import clients from "../common/clients.json";
import suppliers from "../common/suppliers.json";

const ObjectDetails = () => {
  return (
    <Container className="mt-3">
      <Row className="justify-content-center">
        <Col md={12}>
          <Jumbotron>
            <Row>
              <Col md={12}>
                <h2>ObjectName</h2>
              </Col>
            </Row>
            <Row>
              <Col>ObjectId</Col>
            </Row>
            <Row>
              <Col>Street name + number</Col>
            </Row>
            <Row>
              <Col>Postal Code</Col>
            </Row>
            <Row>
              <Col>City</Col>
            </Row>
            <Row>
              <Col>Surface</Col>
            </Row>
            <Row>
              <Col>Number of floors</Col>
            </Row>
          </Jumbotron>
        </Col>
      </Row>
      <Row>
        <Col md={4}>
          <RelatedItems type="project" label="Projects" items={projects} />
        </Col>
        <Col md={4}>
          <RelatedItems type="client" label="Clients" items={clients} />
        </Col>
        <Col md={4}>
          <RelatedItems type="supplier" label="Suppliers" items={suppliers} />
        </Col>
      </Row>
    </Container>
  );
};

export default ObjectDetails;
