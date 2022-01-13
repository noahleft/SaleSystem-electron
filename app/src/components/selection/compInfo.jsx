import React from "react";
import { connect } from "react-redux";
import { Card, Stack, Form, Row, Col } from "react-bootstrap";

class CompInfo extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
    <Card>
      <Card.Title>Company Info</Card.Title>
      <Card.Body>
        <Stack gap={2}>
          <Row>
            <Form.Label column lg={2}>ID:</Form.Label>
            <Col>
              <Form.Control className="me-auto" placeholder={this.props.companyManager.candidateCompID} readOnly />
            </Col>
          </Row>
          <Row>
            <Form.Label column lg={2}>Company Name:</Form.Label>
            <Col>
              <Form.Control className="me-auto" placeholder={myAPI.getCompany(this.props.companyManager.candidateCompID).NAME} />
            </Col>
          </Row>
        </Stack>
      </Card.Body>
    </Card>
    );
  }
}

const mapStateToProps = (state, props) => ({
  companyManager: state.companyManager
});
const mapDispatch = { };

export default connect(mapStateToProps, mapDispatch)(CompInfo);
