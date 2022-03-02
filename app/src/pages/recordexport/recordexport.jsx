import React from "react";
import { connect } from "react-redux";
import ExportTable from "Components/tables/exporttable";
import { Container, Row, Col, Stack, Card, Navbar, Nav } from "react-bootstrap";
import ExportSelect from "Components/dropdowns/exportselect";
import TaxCheck from "Components/checkbox/taxcheck";
import { withTranslation } from "react-i18next";
import "./print.css";

class RecordExport extends React.Component {
  getCompany() {
    if(this.props.exportManager.selectedCompID==0) return {
      NAME: "",
      CONTACT: "",
      PHONE: "",
      ADDRESS: "",
    };
    return myAPI.getCompany(this.props.exportManager.selectedCompID);
  }
  getFormName() {
    const idx = this.props.formManager.candidateFormListIdx;
    return this.props.formManager.formList[idx].NAME;
  }

  getCompanyText(comp) {
    const { t } = this.props;
    if(comp.NAME==="") return "";
    const compText = comp.NAME!=""?comp.NAME:"";
    return t("CompanyName")+":"+compText;
  }

  getContactText(comp) {
    const { t } = this.props;
    if(comp.PHONE==="" && comp.CONTACT==="") return "";
    const phoneText = comp.PHONE!=""?comp.PHONE:"";
    const windowText = comp.CONTACT!=""?comp.CONTACT:"";
    if(phoneText==="")
      return t("Contact")+":"+windowText;
    return t("Contact")+":"+phoneText+" ("+windowText+")";
  }

  getAddressText(comp) {
    const { t } = this.props;
    if(comp.ADDRESS==="") return "";
    const compAddress = comp.ADDRESS!=""?comp.ADDRESS:"";
    return t("Address")+":"+compAddress;
  }

  render() {
    const { t } = this.props;
    let formName = this.getFormName();
    const comp = this.getCompany();
    let companyText = this.getCompanyText(comp);
    let contactText = this.getContactText(comp);
    let addressText = this.getAddressText(comp);
    return (
      <section className="section">
        <Navbar bg="light">
          <Container>
            <Navbar.Brand>{t("ExportTitle")} {formName}</Navbar.Brand>
            <Nav className="me-auto">
              <ExportSelect/>
            </Nav>
            <Nav>
              <TaxCheck/>
            </Nav>
          </Container>
        </Navbar>
        <Card>
        <Container fluid>
          <div className="section-to-print">
            <Row>
              <Stack direction="horizontal" gap={3}>
                <div><h1>{this.props.home.config.company_title}</h1></div>
                <div><h1>{t("PrintableTitle")}</h1></div>
                <div className="ms-auto"><h1>{formName}</h1></div>
              </Stack>
            </Row>
            <Row>
              <Stack direction="horizontal" gap={3}>
                <div><h3>{companyText}</h3></div>
                <div className="ms-auto"><h3>{contactText}</h3></div>
              </Stack>
            </Row>
            <Row>
              <h3>{addressText}</h3>
            </Row>
            <Row>
              <ExportTable/>
            </Row>
          </div>
        </Container>
        </Card>
      </section>
    );
  }
}

const mapStateToProps = (state, props) => ({
  formManager: state.formManager,
  exportManager: state.exportManager,
  home: state.home,
});
const mapDispatch = { };

export default connect(mapStateToProps, mapDispatch)(withTranslation()(RecordExport));