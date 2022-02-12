import React from "react";
import { connect } from "react-redux";
import { Form, Row, Col } from "react-bootstrap";
import { changeCandidateCompContact } from "Redux/components/companyManager/companyManagerSlice";
import { withTranslation } from "react-i18next";

class CompContact extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const name = e.target.value;
    const idx = this.props.companyManager.candidateCompListIdx;
    this.props.changeCandidateCompContact({
      idx:   idx,
      value: name});
  }

  render() {
    const { t } = this.props;
    const idx = this.props.companyManager.candidateCompListIdx;
    let defaultVal = idx==-1;
    let curr = (defaultVal)?"":this.props.companyManager.companyList[idx].CONTACT;
    let orig = (defaultVal)?"":this.props.companyManager.originalList[idx].CONTACT;
    return (
    <Form.Group as={Row} className="mb-3" controlId="formCompContact" ref="formCompContact">
    <Form.Label column sm={4}>{t("Contact")}:</Form.Label>
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
const mapDispatch = { changeCandidateCompContact };

export default connect(mapStateToProps, mapDispatch)(withTranslation()(CompContact));
