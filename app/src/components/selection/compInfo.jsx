import React from "react";
import { connect } from "react-redux";
import { Card, Form, Row, Col, Button } from "react-bootstrap";
import { addDummyCompany, changeCandidateCompListIdx, changeCandidateCompName, changeCandidateCompBusNum } from "Redux/components/companyManager/companyManagerSlice";
import { withTranslation } from "react-i18next";
import FormID from "Components/compform/formID";
import FormName from "Components/compform/formName";
import FormBusinessNum from "Components/compform/FormBusinessNum";

class CompInfo extends React.Component {
  constructor(props) {
    super(props);

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleBusNumChange = this.handleBusNumChange.bind(this);
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

  handleBusNumChange(e) {
    const num = e.target.value;
    const idx = this.props.companyManager.candidateCompListIdx;
    this.props.changeCandidateCompBusNum({
      idx:   idx,
      value: num});
  }

  getCompanyName(id) {
    if(id == -1) return "";
    return this.props.companyManager.originalList[id].NAME;
  }

  render() {
    const { t } = this.props;
    const idx = this.props.companyManager.candidateCompListIdx;
    const curr = (idx!=-1)?this.props.companyManager.companyList[idx].NAME:"";
    const orig = (idx!=-1)?this.props.companyManager.originalList[idx].NAME:"";
    const bnum = (idx!=-1)?this.props.companyManager.companyList[idx].BUSINESSNUM:"";
    const orig_bnum = (idx!=-1)?this.props.companyManager.originalList[idx].BUSINESSNUM:"";
    
    return (
    <Card>
      <Card.Title>{t("CompanyInfo")}</Card.Title>
      <Card.Body>
      <Button onClick={this.handleNewRecord}>{t("NewRecord")}</Button>
        <Form>
          <FormID/>
          <FormName orig={orig} name={curr} disabled={idx==-1} onNameChange={this.handleNameChange}/>
          <FormBusinessNum orig={orig_bnum} name={bnum} disabled={idx==-1} onBusNumChange={this.handleBusNumChange}/>
        </Form>
      </Card.Body>
    </Card>
    );
  }
}

const mapStateToProps = (state, props) => ({
  companyManager: state.companyManager
});
const mapDispatch = { addDummyCompany, changeCandidateCompListIdx, changeCandidateCompName, changeCandidateCompBusNum };

export default connect(mapStateToProps, mapDispatch)(withTranslation()(CompInfo));
