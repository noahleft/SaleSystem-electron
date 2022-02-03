import React from "react";
import { connect } from "react-redux";
import { Card, Form, Row, Col, Button } from "react-bootstrap";
import { addChangeRequest } from "Redux/components/productManager/productManagerSlice";
import { withTranslation } from "react-i18next";

class ProdInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(e) {
    if (this.state.value != '') {
      let CR = {ID:   e.target.formProdId.placeholder,
                NAME: this.state.value};
      this.props.addChangeRequest(CR);
    }
    // reset
    this.state.value = '';
  }

  handleChange(e) {
    this.setState({value: e.target.value});
  }

  getProductName(id) {
    let productList = this.props.productManager.productList;
    for(let i=0; i<productList.length; i++) {
      if(productList[i].ID == id) return productList[i].NAME;
    }
    return "";
  }

  render() {
    const { t } = this.props;
    let display = {
      ID: this.props.productManager.candidateProdID,
      NAME: this.getProductName(this.props.productManager.candidateProdID),
    };
    return (
    <Card>
      <Card.Title>{t("ProductInfo")}</Card.Title>
      <Card.Body>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group as={Row} className="mb-3" controlId="formProdId">
            <Form.Label column sm={2}>ID:</Form.Label>
            <Col sm={10}>
            <Form.Control className="me-auto" placeholder={display.ID} readOnly />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3" controlId="formProdName" ref="formProdName">
            <Form.Label column sm={2}>{t("ProductName")}:</Form.Label>
            <Col sm={10}>
              <Form.Control className="me-auto" placeholder={display.NAME} 
              type="text" value={this.state.value} onChange={this.handleChange} />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3">
            <Col sm={{span: 10, offset:2}}>
              <Button type="submit">{t("Submit")}</Button>
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
const mapDispatch = { addChangeRequest };

export default connect(mapStateToProps, mapDispatch)(withTranslation()(ProdInfo));
