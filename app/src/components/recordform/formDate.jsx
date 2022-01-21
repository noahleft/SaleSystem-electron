import React from "react";
import { connect } from "react-redux";
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import moment from 'moment';
import 'moment/locale/zh-tw';
import { Form, Row, Col } from "react-bootstrap";

class FormDate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({value: e.format("YYYY-MM-DD")});
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
      DELIVER_DATE: moment().format("YYYY-MM-DD"),
    };
    return dummy;
  }

  render() {
    const idx = this.props.recordManager.candidateRecordListIdx;
    let display = {
      ID: this.props.recordManager.recordList[idx].ID,
      NAME: this.getRecord().DELIVER_DATE,
    };
    return (
      <Form.Group as={Row} className="mb-3" controlId="formDeliverDate" ref="formDeliverDate">
      <Form.Control className="me-auto" placeholder={display.NAME} type="text" value={this.state.value} readOnly/>
      <Datetime locale="zh-tw" dateFormat="YYYY-MM-DD" timeFormat={false} input={false} value={display.NAME} 
        onChange={this.handleChange} />
      </Form.Group>
    );
  }
}

const mapStateToProps = (state, props) => ({
  companyManager: state.companyManager,
  recordManager: state.recordManager
});
const mapDispatch = { };

export default connect(mapStateToProps, mapDispatch)(FormDate);
