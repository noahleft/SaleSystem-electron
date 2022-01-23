import React from "react";
import { connect } from "react-redux";
import { Form, Row, Col } from "react-bootstrap";
import { changeCandidateRecordQuantity } from "Redux/components/recordManager/recordManagerSlice";

class FormQuan extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const quantity = e.target.value;
    this.props.changeCandidateRecordQuantity(quantity);
  }

  render() {
    const idx = this.props.recordManager.candidateRecordListIdx;
    const quantity = (idx!=-1)?this.props.recordManager.recordList[idx].QUANTITY:"";
    return (
    <Form.Group as={Row} className="mb-3" controlId="formQuantity" ref="formQuantity">
    <Form.Label column sm={4}>Quantity:</Form.Label>
    <Col sm={6}>
        <Form.Control className="me-auto" placeholder={quantity} disabled={idx==-1}
        type="text" value={quantity} onChange={this.handleChange} />
    </Col>
    </Form.Group>
    );
  }
}

const mapStateToProps = (state, props) => ({
  recordManager: state.recordManager
});
const mapDispatch = { changeCandidateRecordQuantity };

export default connect(mapStateToProps, mapDispatch)(FormQuan);
