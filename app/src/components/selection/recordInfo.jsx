import React from "react";
import { connect } from "react-redux";
import { Card, Form, Row, Col, Button, Stack, Container } from "react-bootstrap";
import { addChangeRequest, addDummyRecord } from "Redux/components/recordManager/recordManagerSlice";
import FormID from "Components/recordform/formID";
import FormComp from "Components/recordform/formComp";
import FormProd from "Components/recordform/formProd";
import FormPrice from "Components/recordform/formPrice";
import FormQuan from "Components/recordform/formQuan";
import FormDate from "Components/recordform/formDate";
import PriceCard from "Components/shortcut/priceCard";

function FormSubmit() {
  return (<Form.Group as={Row} className="mb-3">
    <Col sm={{span: 4, offset:8}}>
      <Button type="submit">Submit</Button>
    </Col>
  </Form.Group>
  );
}

class RecordInfo extends React.Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleNewRecord = this.handleNewRecord.bind(this);
  }

  handleSubmit(e) {
    let CR = { 
      ID: e.target.formRecordId.placeholder,
      COMP_ID: e.target.formCompName.placeholder,
      PROD_ID: e.target.formProdName.placeholder,
      UNIT_PRICE: e.target.formUnitPrice.placeholder,
      DELIVER_DATE: e.target.formDeliverDate.placeholder,
      QUANTITY: e.target.formQuantity.placeholder,
    };
    console.log(CR);
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
  }

  render() {
    return (
    <Card>
      <Card.Title>Record Info</Card.Title>
      <Card.Body>
        <Button onClick={this.handleNewRecord}>New Record</Button>
        <Form onSubmit={this.handleSubmit}><Container>
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
              <FormSubmit />
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
const mapDispatch = { addChangeRequest, addDummyRecord };

export default connect(mapStateToProps, mapDispatch)(RecordInfo);
