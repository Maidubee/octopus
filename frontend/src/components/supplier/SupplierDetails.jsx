import React from "react";
import { Container, Row, Col, MDBJumbotron as Jumbotron } from "mdbreact";
import useReactRouter from "use-react-router";

import RelatedItems from "../common/RelatedItems";
import suppliers from "../common/suppliers.json";
import objects from "../common/objects.json";
import projects from "../common/projects.json";

const SupplierDetails = () => {
  const { match } = useReactRouter();
  const supplier = suppliers.filter(supplier => supplier.id === Number(match.params.id))[0];
  return (
    <Container className="mt-3">
      <Row className="justify-content-center">
        <Col md={12}>
          <Jumbotron>
            <Row>
              <Col md={12}>
                <h2>{supplier.name}</h2>
              </Col>
            </Row>
            <Row>
              <Col>{supplier.id}</Col>
            </Row>
            <Row>
              <Col>
                {supplier.street_name} {supplier.street_number}
              </Col>
            </Row>
            <Row>
              <Col>{supplier.postal_code}</Col>
            </Row>
            <Row>
              <Col>{supplier.city}</Col>
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
