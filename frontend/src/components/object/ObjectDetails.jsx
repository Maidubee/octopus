import React from "react";
import { Container, Row, Col, MDBJumbotron as Jumbotron } from "mdbreact";
import useReactRouter from "use-react-router";

import RelatedItems from "../common/RelatedItems";
import objects from "../common/objects.json";
import projects from "../common/projects.json";
import clients from "../common/clients.json";
import suppliers from "../common/suppliers.json";

const ObjectDetails = () => {
  const { match } = useReactRouter();
  const object = objects.filter(object => object.id === Number(match.params.id))[0];
  return (
    <Container className="mt-3">
      <Row className="justify-content-center">
        <Col md={12}>
          <Jumbotron>
            <Row>
              <Col md={12}>
                <h2>{object.name}</h2>
              </Col>
            </Row>
            <Row>
              <Col>{object.id}</Col>
            </Row>
            <Row>
              <Col>
                {object.street_name} {object.street_number}
              </Col>
            </Row>
            <Row>
              <Col>{object.postal_code}</Col>
            </Row>
            <Row>
              <Col>{object.city}</Col>
            </Row>
            <Row>
              <Col>{object.surface}</Col>
            </Row>
            <Row>
              <Col>{object.n_floors} floors</Col>
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
