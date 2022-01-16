import React from "react";
import ROUTES from "Constants/routes";
import { connect } from "react-redux";
import RecordTable from "Components/tables/recordtable";
import { Container, Row, Col, Button } from "react-bootstrap";

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
    return (
      <section className="section">
        <Container fluid>
          <Row className="title is-1"><Col>
            {message}
            <Button variant="primary"
              onClick={() => {
                this.navigate(ROUTES.RECORDEXPORT);
              }}>
              Export
            </Button>
          </Col></Row>
          <RecordTable></RecordTable>
        </Container>
      </section>
    );
  }
}

const mapStateToProps = (state, props) => ({
  formManager: state.formManager,
});
const mapDispatch = { };

export default connect(mapStateToProps, mapDispatch)(RecordList);