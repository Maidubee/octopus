import React from "react";
import { Container, Row, Col, MDBJumbotron as Jumbotron } from "mdbreact";
import RelatedItems from "../common/RelatedItems";
import clients from "../common/clients.json";
import suppliers from "../common/suppliers.json";
import objects from "../common/objects.json";

const ProjectDetails = () => {
  return (
    <Container className="mt-3">
      <Row className="justify-content-center">
        <Col md={12}>
          <Jumbotron>
            <Row>
              <Col md={12}>
                <h2>ProjectName</h2>
              </Col>
            </Row>
            <Row>
              <Col>ProjectId</Col>
            </Row>
            <Row>
              <Col>ProjectNumber</Col>
            </Row>
          </Jumbotron>
        </Col>
      </Row>
      <Row>
        <Col md={4}>
          <RelatedItems type="client" label="Clients" items={clients} />
        </Col>
        <Col md={4}>
          <RelatedItems type="object" label="Objects" items={objects} />
        </Col>
        <Col md={4}>
          <RelatedItems type="supplier" label="Suppliers" items={suppliers} />
        </Col>
      </Row>
    </Container>
  );
};

export default ProjectDetails;
