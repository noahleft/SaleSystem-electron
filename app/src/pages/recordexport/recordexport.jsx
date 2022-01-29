import React from "react";
import { connect } from "react-redux";
import ExportTable from "Components/tables/exporttable";
import { Container, Row, Stack } from "react-bootstrap";
import ExportSelect from "Components/dropdowns/exportselect";

class RecordExport extends React.Component {

  render() {
    let message = myAPI.getForm(this.props.formManager.candidateFormID).NAME;
    return (
      <section className="section">
        <Container fluid>
          <Row className="title is-1">
            <Stack direction="horizontal">
              <div>{message}</div>
              <div className="ms-auto"><ExportSelect></ExportSelect></div>
            </Stack>
          </Row>
          <ExportTable></ExportTable>
        </Container>
      </section>
    );
  }
}

const mapStateToProps = (state, props) => ({
  formManager: state.formManager,
});
const mapDispatch = { };

export default connect(mapStateToProps, mapDispatch)(RecordExport);