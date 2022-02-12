import React from "react";
import { connect } from "react-redux";
import { Form, Row, Col } from "react-bootstrap";
import { changeCandidateCompBusNum } from "Redux/components/companyManager/companyManagerSlice";
import { withTranslation } from "react-i18next";

class FormBusinessNum extends React.Component {
  constructor(props) {
    super(props);

    this.handleBusNumChange = this.handleBusNumChange.bind(this);
  }

  handleBusNumChange(e) {
    const num = e.target.value;
    const idx = this.props.companyManager.candidateCompListIdx;
    this.props.changeCandidateCompBusNum({
      idx:   idx,
      value: num});
  }

  render() {
    const { t } = this.props;
    return (
    <Form.Group as={Row} className="mb-3" controlId="formCompBnum" ref="formCompBnum">
    <Form.Label column sm={4}>{t("BusinessNum")}:</Form.Label>
    <Col sm={6}>
      <Form.Control className="me-auto" placeholder={this.props.orig} disabled={this.props.disabled}
      type="text" value={this.props.val} onChange={this.handleBusNumChange} />
    </Col>
    </Form.Group>
    );
  }
}

const mapStateToProps = (state, props) => ({
  companyManager: state.companyManager
});
const mapDispatch = { changeCandidateCompBusNum };

export default connect(mapStateToProps, mapDispatch)(withTranslation()(FormBusinessNum));
