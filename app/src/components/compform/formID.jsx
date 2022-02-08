import React from "react";
import { connect } from "react-redux";
import { Form, Row, Col } from "react-bootstrap";

class FormID extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const id = this.props.companyManager.candidateCompID;
    return (
    <Form.Group as={Row} className="mb-3" controlId="formCompId">
    <Form.Label column sm={2}>ID:</Form.Label>
    <Col sm={10}>
    <Form.Control className="me-auto" placeholder={id} readOnly />
    </Col>
    </Form.Group>
    );
  }
}

const mapStateToProps = (state, props) => ({
    companyManager: state.companyManager
});
const mapDispatch = { };

export default connect(mapStateToProps, mapDispatch)(FormID);