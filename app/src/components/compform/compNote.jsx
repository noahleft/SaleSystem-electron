import React from "react";
import { connect } from "react-redux";
import { Form, Row, Col } from "react-bootstrap";
import { changeCandidateCompNote } from "Redux/components/companyManager/companyManagerSlice";
import { withTranslation } from "react-i18next";

class CompNote extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const val = e.target.value;
    const idx = this.props.companyManager.candidateCompListIdx;
    this.props.changeCandidateCompNote({
      idx:   idx,
      value: val});
  }

  render() {
    const { t } = this.props;
    const idx = this.props.companyManager.candidateCompListIdx;
    let defaultVal = idx==-1;
    let curr = (defaultVal)?"":this.props.companyManager.companyList[idx].NOTE;
    let orig = (defaultVal)?"":this.props.companyManager.originalList[idx].NOTE;
    return (
    <Form.Group as={Row} className="mb-3" controlId="formCompNote" ref="formCompNote">
    <Form.Label column sm={4}>{t("Note")}:</Form.Label>
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
const mapDispatch = { changeCandidateCompNote };

export default connect(mapStateToProps, mapDispatch)(withTranslation()(CompNote));
