import React from "react";
import { connect } from "react-redux";
import { Card, Form, Row, Col, Button, Stack, Container } from "react-bootstrap";

class FormPrice extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    // this.handleSubmit = this.handleSubmit.bind(this);
    // this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(e) {
    // if (this.state.value != '') {
    //   let CR = {ID:   e.target.formCompId.placeholder,
    //             NAME: this.state.value};
    //   this.props.addChangeRequest(CR);
    // }
    // // reset
    // this.state.value = '';
  }

  handleChange(e) {
    this.setState({value: e.target.value});
  }

  getRecord() {
    let id = this.props.recordManager.candidateRecordID;
    let recordList = this.props.recordManager.recordList;
    for(let i=0; i<recordList.length; i++) {
      if(recordList[i].ID == id) return recordList[i];
    }
    var dummy = {
      ID: id,
      UNIT_PRICE: "",
    };
    return dummy;
  }

  render() {
    let display = {
      ID: this.props.recordManager.candidateRecordID,
      NAME: this.getRecord().UNIT_PRICE,
    };
    return (
    <Form.Group as={Row} className="mb-3" controlId="formUnitPrice" ref="formUnitPrice">
    <Form.Label column sm={4}>Unit Price:</Form.Label>
    <Col sm={6}>
        <Form.Control className="me-auto" placeholder={display.NAME} 
        type="text" value={this.state.value} onChange={this.handleChange} />
    </Col>
    </Form.Group>
    );
  }
}

const mapStateToProps = (state, props) => ({
  recordManager: state.recordManager
});
const mapDispatch = { };

export default connect(mapStateToProps, mapDispatch)(FormPrice);
