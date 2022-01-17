import React from "react";
import { connect } from "react-redux";
import { Card, Form, Row, Col, Button, Stack, Container } from "react-bootstrap";
import { addChangeRequest } from "Redux/components/recordManager/recordManagerSlice";
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
  }

  handleSubmit(e) {
    let CR = { 
      ID: e.target.formRecordId.placeholder,
      COMP_ID: e.target.formCompName.placeholder,
      PROD_ID: e.target.formProdName.placeholder,
    };
    console.log(CR);
  }

  render() {
    return (
    <Card>
      <Card.Title>Record Info</Card.Title>
      <Card.Body>
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
const mapDispatch = { addChangeRequest };

export default connect(mapStateToProps, mapDispatch)(RecordInfo);
