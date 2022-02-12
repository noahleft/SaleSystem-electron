import React from "react";
import { connect } from "react-redux";
import { Card, Form, Row, Col, Button, Stack, Container } from "react-bootstrap";
import { addDummyRecord, changeCandidateRecordListIdx } from "Redux/components/recordManager/recordManagerSlice";
import FormID from "Components/recordform/formID";
import FormComp from "Components/recordform/formComp";
import FormProd from "Components/recordform/formProd";
import FormPrice from "Components/recordform/formPrice";
import FormQuan from "Components/recordform/formQuan";
import FormDate from "Components/recordform/formDate";
import PriceCard from "Components/shortcut/priceCard";
import moment from 'moment';
import { withTranslation } from "react-i18next";

class RecordInfo extends React.Component {
  constructor(props) {
    super(props);

    this.handleNewRecord = this.handleNewRecord.bind(this);
  }

  handleNewRecord(e) {
    const len = this.props.recordManager.recordList.length;
    const idx = this.props.formManager.candidateFormListIdx;
    let dummy = {
      ID: len+1,
      COMP_ID: 0,
      PROD_ID: 0,
      FORM_ID: this.props.formManager.formList[idx].ID,
      UNIT_PRICE: "",
      CREATED_DATE: moment().format('YYYY-MM-DD'),
      DELIVER_DATE: moment().format('YYYY-MM-DD'),
      QUANTITY: "",
      DIRTY: false,
      INSERT: true,
    }
    this.props.addDummyRecord(dummy);
    this.props.changeCandidateRecordListIdx(len);
  }

  render() {
    const { t } = this.props;
    return (
    <Card>
      <Card.Title>{t("RecordInfo")}</Card.Title>
      <Card.Body>
        <Button onClick={this.handleNewRecord}>{t("NewRecord")}</Button>
        <Form><Container>
          <Row>
            <Col><FormID /></Col>
            <Col>{t("DeliverDate")}:</Col>
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
  formManager: state.formManager,
  recordManager: state.recordManager
});
const mapDispatch = { addDummyRecord, changeCandidateRecordListIdx };

export default connect(mapStateToProps, mapDispatch)(withTranslation()(RecordInfo));
