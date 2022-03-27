import React from "react";
import { connect } from "react-redux";
import { Form, Row, Col } from "react-bootstrap";
import { changeCandidateProdName } from "Redux/components/productManager/productManagerSlice";
import { withTranslation } from "react-i18next";

class ProdName extends React.Component {
  constructor(props) {
    super(props);

    this.handleNameChange = this.handleNameChange.bind(this);
  }

  handleNameChange(e) {
    const name = e.target.value;
    const idx = this.props.productManager.candidateProdListIdx;
    this.props.changeCandidateProdName({
      idx:   idx,
      value: name});
  }

  render() {
    const { t } = this.props;
    const idx = this.props.productManager.candidateProdListIdx;
    let defaultVal = idx==-1;
    let curr = (defaultVal)?"":this.props.productManager.productList[idx].NAME;
    let orig = (defaultVal)?"":this.props.productManager.originalList[idx].NAME;
    return (
    <Form.Group as={Row} className="mb-3" controlId="formProdName" ref="formProdName">
    <Form.Label column sm={4}>{t("ProductName")}:</Form.Label>
    <Col sm={6}>
      <Form.Control className="me-auto" placeholder={orig} disabled={defaultVal}
      type="text" value={curr} onChange={this.handleNameChange} />
    </Col>
    </Form.Group>
    );
  }
}

const mapStateToProps = (state, props) => ({
  productManager: state.productManager
});
const mapDispatch = { changeCandidateProdName };

export default connect(mapStateToProps, mapDispatch)(withTranslation()(ProdName));
