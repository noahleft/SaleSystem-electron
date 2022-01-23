import React from "react";
import { connect } from "react-redux";
import { Form, Row, Col } from "react-bootstrap";
import { changeCandidateRecordCompId } from "Redux/components/recordManager/recordManagerSlice";

class FormComp extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const comp_id = e.target.value;
    this.props.changeCandidateRecordCompId(comp_id);
  }

  render() {
    const content = this.props.companyManager.companyList.map(function(obj){
      return (<option key={obj.ID} value={obj.ID}>{obj.NAME}</option>)
    });
    const idx = this.props.recordManager.candidateRecordListIdx;
    const comp_id = (idx!=-1)?this.props.recordManager.recordList[idx].COMP_ID:0;
    return (
    <Form.Group as={Row} className="mb-3" controlId="formCompName" ref="formCompName">
    <Form.Label column sm={4}>Company:</Form.Label>
    <Col sm={6}>
    <Form.Select value={comp_id} onChange={this.handleChange} disabled={idx==-1}>
      <option key="0" value="0" disabled>Select</option>
      {content}
    </Form.Select>
    </Col>
    </Form.Group>
    );
  }
}

const mapStateToProps = (state, props) => ({
  companyManager: state.companyManager,
  recordManager: state.recordManager
});
const mapDispatch = { changeCandidateRecordCompId };

export default connect(mapStateToProps, mapDispatch)(FormComp);
