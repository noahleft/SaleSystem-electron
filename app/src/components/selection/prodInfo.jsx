import React from "react";
import { connect } from "react-redux";
import { Card, Form, Row, Col, Button, Container } from "react-bootstrap";
import { addDummyProduct, changeCandidateProdListIdx } from "Redux/components/productManager/productManagerSlice";
import { withTranslation } from "react-i18next";
import ProdID from "Components/prodform/prodID";
import ProdName from "Components/prodform/prodName";
import ProdType from "Components/prodform/prodType";
import ProdHide from "Components/prodform/prodHide";
import ProdGroupID from "Components/prodform/prodGroupID";

class ProdInfo extends React.Component {
  constructor(props) {
    super(props);

    this.handleNewRecord = this.handleNewRecord.bind(this);
  }

  handleNewRecord(e) {
    const len = this.props.productManager.productList.length;
    let dummy = {
      ID: len+1,
      NAME: "",
      TYPE: 0,
      GROUP_ID: 0,
      DIRTY: false,
      INSERT: true,
      HIDE: 0,
    }
    this.props.addDummyProduct(dummy);
    this.props.changeCandidateProdListIdx(len);
  }

  render() {
    const { t } = this.props;
    return (
    <Card>
      <Card.Title>{t("ProductInfo")}</Card.Title>
      <Card.Body>
        <Form><Container>
          <Row>
            <Col><Button onClick={this.handleNewRecord}>{t("NewRecord")}</Button></Col>
          </Row>
          <Row>
            <Col><ProdID/></Col>
            <Col><ProdGroupID/></Col>
          </Row>
          <Row>
            <Col><ProdName/></Col>
            <Col><ProdType/></Col>
          </Row>
          <Row>
            <Col><ProdHide/></Col>
            <Col></Col>
          </Row>
        </Container></Form>
      </Card.Body>
    </Card>
    );
  }
}

const mapStateToProps = (state, props) => ({
  productManager: state.productManager
});
const mapDispatch = { addDummyProduct, changeCandidateProdListIdx };

export default connect(mapStateToProps, mapDispatch)(withTranslation()(ProdInfo));
