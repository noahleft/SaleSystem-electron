import React from "react";
import { connect } from "react-redux";
import { Form, Row, Col } from "react-bootstrap";

class FormID extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const idx = this.props.companyManager.candidateCompListIdx;
    const id = idx==-1?"":this.props.companyManager.originalList[idx].ID;
    return (
    <Form.Group as={Row} className="mb-3" controlId="formCompId">
    <Form.Label column sm={4}>ID:</Form.Label>
    <Col sm={6}>
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
