import React from "react";
import { Container, Row, Col, MDBJumbotron as Jumbotron } from "mdbreact";
import useReactRouter from "use-react-router";

import RelatedItems from "../common/RelatedItems";
import clients from "../common/clients.json";
import projects from "../common/projects.json";
import objects from "../common/objects.json";

const ClientDetails = () => {
  const { match } = useReactRouter();
  const client = clients.filter(client => client.id === Number(match.params.id))[0];
  return (
    <Container className="mt-3">
      <Row className="justify-content-center">
        <Col md={12}>
          <Jumbotron>
            <Row>
              <Col md={12}>
                <h2>{client.name}</h2>
              </Col>
            </Row>
            <Row>
              <Col>{client.id}</Col>
            </Row>
            <Row>
              <Col>
                {client.street_name} {client.street_number}
              </Col>
            </Row>
            <Row>
              <Col>{client.postal_code}</Col>
            </Row>
            <Row>
              <Col>{client.city}</Col>
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

export default ClientDetails;
