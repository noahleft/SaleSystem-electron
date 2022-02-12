import React from "react";
import { connect } from "react-redux";
import { Card, Form, Row, Col, Button, Container } from "react-bootstrap";
import { addDummyCompany, changeCandidateCompListIdx } from "Redux/components/companyManager/companyManagerSlice";
import { withTranslation } from "react-i18next";
import CompID from "Components/compform/compID";
import CompName from "Components/compform/compName";
import CompBusinessNum from "Components/compform/compBusinessNum";
import CompPhone from "Components/compform/compPhone";
import CompContact from "Components/compform/compContact";

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
    return (
    <Card>
      <Card.Title>{t("CompanyInfo")}</Card.Title>
      <Card.Body>
        <Form><Container>
          <Row>
            <Col><Button onClick={this.handleNewRecord}>{t("NewRecord")}</Button></Col>
          </Row>
          <Row>
            <Col><CompID/></Col>
            <Col></Col>
          </Row>
          <Row>
            <Col><CompName/></Col>
            <Col><CompBusinessNum/></Col>
          </Row>
          <Row>
            <Col><CompPhone/></Col>
            <Col><CompContact/></Col>
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
