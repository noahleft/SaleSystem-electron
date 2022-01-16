import React from "react";
import { connect } from "react-redux";
import { Card, Form, Row, Col, Button, Stack, Container } from "react-bootstrap";

class FormComp extends React.Component {
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
      COMP_ID: 0,
    };
    return dummy;
  }

  getCompanyName(id) {
    if(id==0) return "";
    let companyList = this.props.companyManager.companyList;
    for(let i=0; i<companyList.length; i++) {
      if(companyList[i].ID == id) return companyList[i].NAME;
    }
    return "";
  }

  render() {
    let display = {
      ID: this.props.recordManager.candidateRecordID,
      NAME: this.getCompanyName(this.getRecord().COMP_ID),
    };
    return (
    <Form.Group as={Row} className="mb-3" controlId="formCompName" ref="formCompName">
    <Form.Label column sm={4}>Company:</Form.Label>
    <Col sm={6}>
    <Form.Control className="me-auto" placeholder={display.NAME} 
        type="text" value={this.state.value} onChange={this.handleChange} />
    </Col>
    </Form.Group>
    );
  }
}

const mapStateToProps = (state, props) => ({
  companyManager: state.companyManager,
  recordManager: state.recordManager
});
const mapDispatch = { };

export default connect(mapStateToProps, mapDispatch)(FormComp);
