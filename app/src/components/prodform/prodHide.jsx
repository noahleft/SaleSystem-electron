import React from "react";
import { connect } from "react-redux";
import { Form, Row, Col, ToggleButton, ToggleButtonGroup } from "react-bootstrap";
import { changeCandidateProdHide } from "Redux/components/productManager/productManagerSlice";
import { withTranslation } from "react-i18next";

class ProdHide extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const val = e;
    const idx = this.props.productManager.candidateProdListIdx;
    this.props.changeCandidateProdHide({
      idx:   idx,
      value: val});
  }

  render() {
    const { t } = this.props;
    const idx = this.props.productManager.candidateProdListIdx;
    let defaultVal = idx==-1;
    let curr = (defaultVal)?"":this.props.productManager.productList[idx].HIDE;
    return (
    <Form.Group as={Row} className="mb-3" controlId="formProdHide" ref="formProdHide">
    <Form.Label column sm={4}>{t("Hide")}:</Form.Label>
    <Col sm={6}>
      <ToggleButtonGroup name="radio-hide" type="radio" value={curr} onChange={this.handleChange}>
        <ToggleButton id="hide-true" value={1} variant="outline-success">Yes</ToggleButton>
        <ToggleButton id="hide-false" value={0} variant="outline-danger">No</ToggleButton>
      </ToggleButtonGroup>
    </Col>
    </Form.Group>
    );
  }
}

const mapStateToProps = (state, props) => ({
  productManager: state.productManager
});
const mapDispatch = { changeCandidateProdHide };

export default connect(mapStateToProps, mapDispatch)(withTranslation()(ProdHide));
