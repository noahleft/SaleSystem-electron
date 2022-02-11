import React from "react";
import { connect } from "react-redux";
import { Card, Form, Row, Col, Button } from "react-bootstrap";
import { addDummyCompany, changeCandidateCompListIdx, changeCandidateCompName } from "Redux/components/companyManager/companyManagerSlice";
import { withTranslation } from "react-i18next";
import FormID from "Components/compform/formID";
import FormName from "Components/compform/formName";

class CompInfo extends React.Component {
  constructor(props) {
    super(props);

    this.handleNameChange = this.handleNameChange.bind(this);

    this.handleNewRecord = this.handleNewRecord.bind(this);
  }

  handleNewRecord(e) {
    const len = this.props.companyManager.companyList.length;
    let dummy = {
      ID: len+1,
      NAME: "",
      DIRTY: false,
      INSERT: true,
    }
    this.props.addDummyCompany(dummy);
    this.props.changeCandidateCompListIdx(len);
  }

  handleNameChange(e) {
    const name = e.target.value;
    const idx = this.props.companyManager.candidateCompListIdx;
    this.props.changeCandidateCompName({
      idx:   idx,
      value: name});
  }

  getCompanyName(id) {
    if(id == -1) return "";
    return this.props.companyManager.originalList[id].NAME;
  }

  render() {
    const { t } = this.props;
    const idx = this.props.companyManager.candidateCompListIdx;
    const name = (idx!=-1)?this.props.companyManager.companyList[idx].NAME:"";
    const orig = (idx!=-1)?this.props.companyManager.originalList[idx].NAME:"";
    
    return (
    <Card>
      <Card.Title>{t("CompanyInfo")}</Card.Title>
      <Card.Body>
      <Button onClick={this.handleNewRecord}>New Record</Button>
        <Form onSubmit={this.handleSubmit}>
          <FormID/>
          <FormName orig={orig} name={name} disabled={idx==-1} onNameChange={this.handleNameChange}/>
          <Form.Group as={Row} className="mb-3">
            <Col sm={{span: 10, offset:2}}>
            </Col>
          </Form.Group>
        </Form>
      </Card.Body>
    </Card>
    );
  }
}

const mapStateToProps = (state, props) => ({
  companyManager: state.companyManager
});
const mapDispatch = { addDummyCompany, changeCandidateCompListIdx, changeCandidateCompName };

export default connect(mapStateToProps, mapDispatch)(withTranslation()(CompInfo));
