import React from "react";
import { connect } from "react-redux";
import { Form, Row, Col } from "react-bootstrap";

class FormPrice extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
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
