import React from "react";
import { Container, Row, Col, MDBJumbotron as Jumbotron } from "mdbreact";
import RelatedItems from "../common/RelatedItems";
import objects from "../common/objects.json";
import projects from "../common/projects.json";

const SupplierDetails = () => {
  return (
    <Container className="mt-3">
      <Row className="justify-content-center">
        <Col md={12}>
          <Jumbotron>
            <Row>
              <Col md={12}>
                <h2>SupplierName</h2>
              </Col>
            </Row>
            <Row>
              <Col>SupplierId</Col>
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
          </Jumbotron>
        </Col>
      </Row>
      <Row>
        <Col md={4}>
          <RelatedItems type="project" label="Projects" items={projects} />
        </Col>
        <Col md={4}>
          <RelatedItems type="object" label="Objects" items={objects} />
        </Col>
      </Row>
    </Container>
  );
};

export default SupplierDetails;
