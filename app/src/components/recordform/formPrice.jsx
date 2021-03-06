import React from "react";
import { connect } from "react-redux";
import { Form, Row, Col } from "react-bootstrap";
import { changeCandidateRecordUnitPrice } from "Redux/components/recordManager/recordManagerSlice";
import { withTranslation } from "react-i18next";

class FormPrice extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const idx = this.props.recordManager.candidateRecordListIdx;
    const price = e.target.value;
    this.props.changeCandidateRecordUnitPrice({
      idx:   idx,
      value: price,
    });
  }

  render() {
    const { t } = this.props;
    const idx = this.props.recordManager.candidateRecordListIdx;
    const price = (idx!=-1)?this.props.recordManager.recordList[idx].UNIT_PRICE:"";
    return (
    <Form.Group as={Row} className="mb-3" controlId="formUnitPrice" ref="formUnitPrice">
    <Form.Label column sm={4}>{t("UnitPrice")}:</Form.Label>
    <Col sm={6}>
        <Form.Control className="me-auto" placeholder={price} disabled={idx==-1}
        type="number" step="0.1" value={price} onChange={this.handleChange} />
    </Col>
    </Form.Group>
    );
  }
}

const mapStateToProps = (state, props) => ({
  recordManager: state.recordManager
});
const mapDispatch = { changeCandidateRecordUnitPrice };

export default connect(mapStateToProps, mapDispatch)(withTranslation()(FormPrice));
