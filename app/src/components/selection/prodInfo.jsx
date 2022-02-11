import React from "react";
import { connect } from "react-redux";
import { Card, Form, Row, Col, Button } from "react-bootstrap";
import { addDummyProduct, changeCandidateProdListIdx, changeCandidateProdName } from "Redux/components/productManager/productManagerSlice";
import { withTranslation } from "react-i18next";

class ProdInfo extends React.Component {
  constructor(props) {
    super(props);

    this.handleNameChange = this.handleNameChange.bind(this);

    this.handleNewRecord = this.handleNewRecord.bind(this);
  }

  handleNewRecord(e) {
    const len = this.props.productManager.productList.length;
    let dummy = {
      ID: len+1,
      NAME: "",
      DIRTY: false,
      INSERT: true,
    }
    this.props.addDummyProduct(dummy);
    this.props.changeCandidateProdListIdx(len);
  }

  handleNameChange(e) {
    const name = e.target.value;
    const idx = this.props.productManager.candidateProdListIdx;
    this.props.changeCandidateProdName({
      idx:   idx,
      value: name});
  }

  getProductName(idx) {
    if(idx==-1) return "";
    return this.props.productManager.productList[idx].NAME;
  }

  render() {
    const { t } = this.props;
    const idx = this.props.productManager.candidateProdListIdx;
    const id = (idx!=-1)?this.props.productManager.productList[idx].ID:"";
    const name = (idx!=-1)?this.props.productManager.productList[idx].NAME:"";
    const orig = (idx!=-1)?this.props.productManager.originalList[idx].NAME:"";
    return (
    <Card>
      <Card.Title>{t("ProductInfo")}</Card.Title>
      <Card.Body>
      <Button onClick={this.handleNewRecord}>{t("NewRecord")}</Button>
        <Form>
          <Form.Group as={Row} className="mb-3" controlId="formProdId">
            <Form.Label column sm={2}>ID:</Form.Label>
            <Col sm={10}>
            <Form.Control className="me-auto" placeholder={id} readOnly />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3" controlId="formProdName" ref="formProdName">
            <Form.Label column sm={2}>{t("ProductName")}:</Form.Label>
            <Col sm={10}>
              <Form.Control className="me-auto" placeholder={orig} disabled={idx==-1}
              type="text" value={name} onChange={this.handleNameChange} />
            </Col>
          </Form.Group>
        </Form>
      </Card.Body>
    </Card>
    );
  }
}

const mapStateToProps = (state, props) => ({
  productManager: state.productManager
});
const mapDispatch = { addDummyProduct, changeCandidateProdListIdx, changeCandidateProdName };

export default connect(mapStateToProps, mapDispatch)(withTranslation()(ProdInfo));
