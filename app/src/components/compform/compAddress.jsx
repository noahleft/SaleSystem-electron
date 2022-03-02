import React from "react";
import { connect } from "react-redux";
import { Form, Row, Col } from "react-bootstrap";
import { changeCandidateCompAddress } from "Redux/components/companyManager/companyManagerSlice";
import { withTranslation } from "react-i18next";

class CompAddress extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const val = e.target.value;
    const idx = this.props.companyManager.candidateCompListIdx;
    this.props.changeCandidateCompAddress({
      idx:   idx,
      value: val});
  }

  render() {
    const { t } = this.props;
    const idx = this.props.companyManager.candidateCompListIdx;
    let defaultVal = idx==-1;
    let curr = (defaultVal)?"":this.props.companyManager.companyList[idx].ADDRESS;
    let orig = (defaultVal)?"":this.props.companyManager.originalList[idx].ADDRESS;
    return (
    <Form.Group as={Row} className="mb-3" controlId="formCompAddress" ref="formCompAddress">
    <Form.Label column sm={4}>{t("Address")}:</Form.Label>
    <Col sm={6}>
      <Form.Control className="me-auto" placeholder={orig} disabled={defaultVal}
      type="text" value={curr} onChange={this.handleChange} />
    </Col>
    </Form.Group>
    );
  }
}

const mapStateToProps = (state, props) => ({
  companyManager: state.companyManager
});
const mapDispatch = { changeCandidateCompAddress };

export default connect(mapStateToProps, mapDispatch)(withTranslation()(CompAddress));
