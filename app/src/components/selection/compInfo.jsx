import React from "react";
import { connect } from "react-redux";
import { Card, Form, Row, Col, Button, Container } from "react-bootstrap";
import { addDummyCompany, changeCandidateCompListIdx } from "Redux/components/companyManager/companyManagerSlice";
import { withTranslation } from "react-i18next";
import FormID from "Components/compform/formID";
import FormName from "Components/compform/formName";
import FormBusinessNum from "Components/compform/FormBusinessNum";

class CompInfo extends React.Component {
  constructor(props) {
    super(props);
    
    this.handleNewRecord = this.handleNewRecord.bind(this);
  }

  handleNewRecord(e) {
    const len = this.props.companyManager.companyList.length;
    let dummy = {
      ID: len+1,
      NAME: "",
      DIRTY: false,
      INSERT: true,
      BUSINESSNUM: "",
      PHONE: "",
      CONTACT: "",
      PRINTTAX: 0,
      NOTE: "",
    }
    this.props.addDummyCompany(dummy);
    this.props.changeCandidateCompListIdx(len);
  }

  getCompanyName(id) {
    if(id == -1) return "";
    return this.props.companyManager.originalList[id].NAME;
  }

  render() {
    const { t } = this.props;
    const idx = this.props.companyManager.candidateCompListIdx;
    let defaultVal = idx==-1;
    let curr = {
      NAME: (defaultVal)?"":this.props.companyManager.companyList[idx].NAME,
      BNUM: (defaultVal)?"":this.props.companyManager.companyList[idx].BUSINESSNUM,
    };
    let orig = {
      NAME: (defaultVal)?"":this.props.companyManager.originalList[idx].NAME,
      BNUM: (defaultVal)?"":this.props.companyManager.originalList[idx].BUSINESSNUM,
    };
    
    return (
    <Card>
      <Card.Title>{t("CompanyInfo")}</Card.Title>
      <Card.Body>
        <Form><Container>
          <Row>
            <Col><Button onClick={this.handleNewRecord}>{t("NewRecord")}</Button></Col>
          </Row>
          <Row>
            <Col><FormID/></Col>
            <Col></Col>
          </Row>
          <Row>
            <Col><FormName orig={orig.NAME} val={curr.NAME} disabled={defaultVal}/></Col>
            <Col><FormBusinessNum orig={orig.BNUM} val={curr.BNUM} disabled={defaultVal}/></Col>
          </Row>
          <Row>
          
          </Row>
        </Container></Form>
      </Card.Body>
    </Card>
    );
  }
}

const mapStateToProps = (state, props) => ({
  companyManager: state.companyManager
});
const mapDispatch = { addDummyCompany, changeCandidateCompListIdx };

export default connect(mapStateToProps, mapDispatch)(withTranslation()(CompInfo));
