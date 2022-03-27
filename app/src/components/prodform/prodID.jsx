import React from "react";
import { connect } from "react-redux";
import { Form, Row, Col } from "react-bootstrap";

class ProdID extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const idx = this.props.productManager.candidateProdListIdx;
    const id = idx==-1?"":this.props.productManager.originalList[idx].ID;
    return (
    <Form.Group as={Row} className="mb-3" controlId="formProdId">
    <Form.Label column sm={4}>ID:</Form.Label>
    <Col sm={6}>
    <Form.Control className="me-auto" placeholder={id} readOnly />
    </Col>
    </Form.Group>
    );
  }
}

const mapStateToProps = (state, props) => ({
    productManager: state.productManager
});
const mapDispatch = { };

export default connect(mapStateToProps, mapDispatch)(ProdID);
