import React from "react";
import { connect } from "react-redux";
import { Form, Row, Col } from "react-bootstrap";

class FormProd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({value: e.target.value});
  }

  getRecord() {
    const idx = this.props.recordManager.candidateRecordListIdx;
    let id = this.props.recordManager.recordList[idx].ID;
    let recordList = this.props.recordManager.recordList;
    for(let i=0; i<recordList.length; i++) {
      if(recordList[i].ID == id) return recordList[i];
    }
    var dummy = {
      ID: id,
      PROD_ID: 0,
    };
    return dummy;
  }

  getProductName(id) {
    if(id==0) return "";
    let productList = this.props.productManager.productList;
    for(let i=0; i<productList.length; i++) {
      if(productList[i].ID == id) return productList[i].NAME;
    }
    return "";
  }

  render() {
    const idx = this.props.recordManager.candidateRecordListIdx;
    let display = {
      ID: this.props.recordManager.recordList[idx].ID,
      NAME: this.getProductName(this.getRecord().PROD_ID),
    };
    return (
    <Form.Group as={Row} className="mb-3" controlId="formProdName" ref="formProdName">
    <Form.Label column sm={4}>Product:</Form.Label>
    <Col sm={6}>
        <Form.Control className="me-auto" placeholder={display.NAME} 
        type="text" value={this.state.value} onChange={this.handleChange} />
    </Col>
    </Form.Group>
    );
  }
}

const mapStateToProps = (state, props) => ({
  productManager: state.productManager,
  recordManager: state.recordManager
});
const mapDispatch = { };

export default connect(mapStateToProps, mapDispatch)(FormProd);
