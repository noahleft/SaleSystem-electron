import React from "react";
import { connect } from "react-redux";
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import moment from 'moment';
import 'moment/locale/zh-tw';
import { Form, Row, Col } from "react-bootstrap";
import { changeCandidateRecordDeliverDate } from "Redux/components/recordManager/recordManagerSlice";

class FormDate extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const date = e.format("YYYY-MM-DD");
    this.props.changeCandidateRecordDeliverDate(date);
  }

  render() {
    const idx = this.props.recordManager.candidateRecordListIdx;
    let display = {
      ID: this.props.recordManager.recordList[idx].ID,
      NAME: this.props.recordManager.recordList[idx].DELIVER_DATE,
    };
    return (
      <Form.Group as={Row} className="mb-3" controlId="formDeliverDate" ref="formDeliverDate">
      <Form.Control className="me-auto" placeholder={display.NAME} type="text" value={display.NAME} readOnly/>
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
const mapDispatch = { changeCandidateRecordDeliverDate };

export default connect(mapStateToProps, mapDispatch)(FormDate);
