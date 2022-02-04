import React from "react";
import { connect } from "react-redux";
import ExportTable from "Components/tables/exporttable";
import { Container, Row, Card, Navbar, Nav } from "react-bootstrap";
import ExportSelect from "Components/dropdowns/exportselect";
import TaxCheck from "Components/checkbox/taxcheck";
import { withTranslation } from "react-i18next";
import "./print.css";

class RecordExport extends React.Component {
  getCompanyName() {
    if(this.props.exportManager.selectedCompID==0) return "";
    return myAPI.getCompany(this.props.exportManager.selectedCompID).NAME;
  }
  getFormName() {
    return myAPI.getForm(this.props.formManager.candidateFormID).NAME;
  }

  render() {
    const { t } = this.props;
    let formName = this.getFormName();
    let message = t("PrintableTitle") + this.getCompanyName() + formName;
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
            <Row className="title is-1">{message}</Row>
            <Row>
              <ExportTable></ExportTable>
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
});
const mapDispatch = { };

export default connect(mapStateToProps, mapDispatch)(withTranslation()(RecordExport));