import React from "react";
import { connect } from "react-redux";
import { Form, Row, Col } from "react-bootstrap";
import { Dropdown, DropdownButton } from "react-bootstrap";
import { changeCandidateProdType } from "Redux/components/productManager/productManagerSlice";
import { withTranslation } from "react-i18next";

class ProdType extends React.Component {
  constructor(props) {
    super(props);

    this.handleTypeChange = this.handleTypeChange.bind(this);
  }

  handleTypeChange(type) {
    const idx = this.props.productManager.candidateProdListIdx;
    this.props.changeCandidateProdType({
      idx:   idx,
      value: type});
  }

  getTypeString(type) {
    if(type == 1) return "kg";
    if(this.props.home.config.quantity_unit == "") return "0";
    return this.props.home.config.quantity_unit;
  }

  render() {
    const { t } = this.props;
    const idx = this.props.productManager.candidateProdListIdx;
    let title = idx==-1?t("SelectType"):
                this.getTypeString(this.props.productManager.productList[idx].TYPE);
    return (
      <Form.Group as={Row} className="mb-3" controlId="formProdType">
      <Form.Label column sm={4}>{t("Type")}:</Form.Label>
      <Col sm={6}>
        <DropdownButton title={title} disabled={idx==-1}>
            <Dropdown.Item key='0' onClick={()=>{this.handleTypeChange(0);}}>{this.getTypeString(0)}</Dropdown.Item>
            <Dropdown.Item key='1' onClick={()=>{this.handleTypeChange(1);}}>{this.getTypeString(1)}</Dropdown.Item>
            <Dropdown.Item key='2' onClick={()=>{this.handleTypeChange(2);}}>{this.getTypeString(2)}</Dropdown.Item>
            <Dropdown.Item key='3' onClick={()=>{this.handleTypeChange(3);}}>{this.getTypeString(3)}</Dropdown.Item>
            <Dropdown.Item key='4' onClick={()=>{this.handleTypeChange(4);}}>{this.getTypeString(4)}</Dropdown.Item>
            <Dropdown.Item key='5' onClick={()=>{this.handleTypeChange(5);}}>{this.getTypeString(5)}</Dropdown.Item>
        </DropdownButton>
      </Col>
    </Form.Group>
        
    );
  }
}

const mapStateToProps = (state, props) => ({
  productManager: state.productManager,
  home: state.home
});
const mapDispatch = { changeCandidateProdType };

export default connect(mapStateToProps, mapDispatch)(withTranslation()(ProdType));
