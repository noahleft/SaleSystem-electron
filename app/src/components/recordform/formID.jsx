import React from "react";
import { connect } from "react-redux";
import { Card, Form, Row, Col, Button, Stack, Container } from "react-bootstrap";

class FormID extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let display = {
      ID: this.props.recordManager.candidateRecordID,
      NAME: "",
    };
    return (
    <Form.Group as={Row} className="mb-3" controlId="formRecordId">
    <Form.Label column sm={4}>ID:</Form.Label>
    <Col sm={6}>
    <Form.Control className="me-auto" placeholder={display.ID} readOnly />
    </Col>
    </Form.Group>
    );
  }
}

const mapStateToProps = (state, props) => ({
  recordManager: state.recordManager
});
const mapDispatch = { };

export default connect(mapStateToProps, mapDispatch)(FormID);
