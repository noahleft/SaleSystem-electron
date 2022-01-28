import React from "react";
import { connect } from "react-redux";
import { Card, Form, Row, Col, Button, Stack, Container } from "react-bootstrap";
import { addChangeRequest, addDummyRecord, changeCandidateRecordListIdx } from "Redux/components/recordManager/recordManagerSlice";
import FormID from "Components/recordform/formID";
import FormComp from "Components/recordform/formComp";
import FormProd from "Components/recordform/formProd";
import FormPrice from "Components/recordform/formPrice";
import FormQuan from "Components/recordform/formQuan";
import FormDate from "Components/recordform/formDate";
import PriceCard from "Components/shortcut/priceCard";

class RecordInfo extends React.Component {
  constructor(props) {
    super(props);

    this.handleNewRecord = this.handleNewRecord.bind(this);
  }

  handleNewRecord(e) {
    const len = this.props.recordManager.recordList.length;
    let dummy = {
      ID: len+1,
      COMP_ID: 0,
      PROD_ID: 0,
      UNIT_PRICE: "",
      DELIVER_DATE: "",
      QUANTITY: "",
      DIRTY: false,
    }
    this.props.addDummyRecord(dummy);
    this.props.changeCandidateRecordListIdx(len);
  }

  render() {
    return (
    <Card>
      <Card.Title>Record Info</Card.Title>
      <Card.Body>
        <Button onClick={this.handleNewRecord}>New Record</Button>
        <Form><Container>
          <Row>
            <Col><FormID /></Col>
            <Col>Deliver Date:</Col>
          </Row>
          <Row>
            <Col>
              <FormComp />
              <FormProd />
              <FormPrice />
            </Col>
            <Col>
              <Row><FormDate /></Row>
            </Col>
          </Row>
          <Row>
            <Col>
              {/* <PriceCard></PriceCard> */}
            </Col>
            <Col>
              <FormQuan />
            </Col>
          </Row>
          <Row>
            <Col>
            </Col>
            <Col>
            </Col>
          </Row>
          </Container></Form>
      </Card.Body>
    </Card>
    );
  }
}

const mapStateToProps = (state, props) => ({
  recordManager: state.recordManager
});
const mapDispatch = { addChangeRequest, addDummyRecord, changeCandidateRecordListIdx };

export default connect(mapStateToProps, mapDispatch)(RecordInfo);
