import React from "react";
import ROUTES from "Constants/routes";
import { connect } from "react-redux";
import RecordInfo from "Components/selection/recordInfo";
import RecordTable from "Components/tables/recordtable";
import RecordFooter from "Components/footer/recordFooter";
import { Container, Row, Col, Button } from "react-bootstrap";
import { updateExportList } from "Redux/components/exportManager/exportManagerSlice";

class RecordList extends React.Component {
  constructor(props) {
    super(props);
    this.history = props.history;
  }

  navigate(url) {
    this.setState(
      {
        mobileMenuActive: false,
      },
      function () {
        this.history.push(url);
      }
    );
  }
  
  render() {
    let message = myAPI.getForm(this.props.formManager.candidateFormID).NAME;
    let disableExport = this.props.recordManager.requireSaving;
    return (
      <section className="section">
        <Container fluid>
          <Row className="title is-1"><Col>
            {message}
            <Button variant="primary"
              onClick={() => {
                let exportList = myAPI.listRecord(this.props.formManager.candidateFormID);
                this.props.updateExportList(exportList);
                this.navigate(ROUTES.RECORDEXPORT);
              }} disabled={disableExport}>
              Export
            </Button>
          </Col></Row>
          <RecordTable></RecordTable>
        </Container>
        <RecordInfo></RecordInfo>
        <RecordFooter></RecordFooter>
      </section>
    );
  }
}

const mapStateToProps = (state, props) => ({
  formManager: state.formManager,
  recordManager: state.recordManager,
  exportManager: state.exportManager,
});
const mapDispatch = { updateExportList };

export default connect(mapStateToProps, mapDispatch)(RecordList);