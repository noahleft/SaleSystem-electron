import React from "react";
import { connect } from "react-redux";
import ExportTable from "Components/exporttable/exporttable";
import { Container, Row, Col } from "react-bootstrap";

class RecordExport extends React.Component {

  render() {
    let message = myAPI.getForm(this.props.home.selectedFormID).NAME;
    return (
      <section className="section">
        <Container fluid>
          <Row className="title is-1"><Col>
            {message}
          </Col></Row>
          <ExportTable></ExportTable>
          Total:
        </Container>
      </section>
    );
  }
}

const mapStateToProps = (state, props) => ({
  home: state.home
});
const mapDispatch = { };

export default connect(mapStateToProps, mapDispatch)(RecordExport);