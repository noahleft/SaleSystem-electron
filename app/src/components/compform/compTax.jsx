import React from "react";
import { connect } from "react-redux";
import { Form, Row, Col, ToggleButton, ToggleButtonGroup } from "react-bootstrap";
import { changeCandidateCompTax } from "Redux/components/companyManager/companyManagerSlice";
import { withTranslation } from "react-i18next";

class CompTax extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const val = e;
    const idx = this.props.companyManager.candidateCompListIdx;
    this.props.changeCandidateCompTax({
      idx:   idx,
      value: val});
  }

  render() {
    const { t } = this.props;
    const idx = this.props.companyManager.candidateCompListIdx;
    let defaultVal = idx==-1;
    let curr = (defaultVal)?"":this.props.companyManager.companyList[idx].PRINTTAX;
    return (
    <Form.Group as={Row} className="mb-3" controlId="formCompPrintTax" ref="formCompPrintTax">
    <Form.Label column sm={4}>{t("PrintTax")}:</Form.Label>
    <Col sm={6}>
      <ToggleButtonGroup name="radio-tax" type="radio" value={curr} onChange={this.handleChange}>
        <ToggleButton id="tax-true" value={1} variant="outline-success">Yes</ToggleButton>
        <ToggleButton id="tax-false" value={0} variant="outline-danger">No</ToggleButton>
      </ToggleButtonGroup>
    </Col>
    </Form.Group>
    );
  }
}

const mapStateToProps = (state, props) => ({
  companyManager: state.companyManager
});
const mapDispatch = { changeCandidateCompTax };

export default connect(mapStateToProps, mapDispatch)(withTranslation()(CompTax));
