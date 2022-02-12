import React from "react";
import { connect } from "react-redux";
import { Form, Row, Col } from "react-bootstrap";
import { changeCandidateCompBusNum } from "Redux/components/companyManager/companyManagerSlice";
import { withTranslation } from "react-i18next";

class CompBusinessNum extends React.Component {
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
    const idx = this.props.companyManager.candidateCompListIdx;
    let defaultVal = idx==-1;
    let curr = (defaultVal)?"":this.props.companyManager.companyList[idx].BUSINESSNUM;
    let orig = (defaultVal)?"":this.props.companyManager.originalList[idx].BUSINESSNUM;
    return (
    <Form.Group as={Row} className="mb-3" controlId="formCompBnum" ref="formCompBnum">
    <Form.Label column sm={4}>{t("BusinessNum")}:</Form.Label>
    <Col sm={6}>
      <Form.Control className="me-auto" placeholder={orig} disabled={defaultVal}
      type="text" value={curr} onChange={this.handleBusNumChange} />
    </Col>
    </Form.Group>
    );
  }
}

const mapStateToProps = (state, props) => ({
  companyManager: state.companyManager
});
const mapDispatch = { changeCandidateCompBusNum };

export default connect(mapStateToProps, mapDispatch)(withTranslation()(CompBusinessNum));
