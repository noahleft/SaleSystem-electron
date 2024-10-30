import React from "react";
import { connect } from "react-redux";
import { Form, Row, Col } from "react-bootstrap";
import { Dropdown, DropdownButton } from "react-bootstrap";
import { changeCandidateProdGroupID } from "Redux/components/productManager/productManagerSlice";
import { withTranslation } from "react-i18next";

class ProdGroupID extends React.Component {
  constructor(props) {
    super(props);

    this.handleGroupIDChange = this.handleGroupIDChange.bind(this);
  }

  handleGroupIDChange(type) {
    const idx = this.props.productManager.candidateProdListIdx;
    this.props.changeCandidateProdGroupID({
      idx:   idx,
      value: type});
  }

  render() {
    const { t } = this.props;
    const idx = this.props.productManager.candidateProdListIdx;
    let title = idx==-1?t("SetGroupID"):this.props.productManager.productList[idx].GROUP_ID;
    return (
      <Form.Group as={Row} className="mb-3" controlId="formProdGroupId">
      <Form.Label column sm={4}>{t("GroupID")}:</Form.Label>
      <Col sm={6}>
        <DropdownButton title={title} disabled={idx==-1}>
            <Dropdown.Item key='0' onClick={()=>{this.handleGroupIDChange(0);}}>0 (default)</Dropdown.Item>
            <Dropdown.Item key='1' onClick={()=>{this.handleGroupIDChange(1);}}>1</Dropdown.Item>
            <Dropdown.Item key='2' onClick={()=>{this.handleGroupIDChange(2);}}>2</Dropdown.Item>
            <Dropdown.Item key='3' onClick={()=>{this.handleGroupIDChange(3);}}>3</Dropdown.Item>
            <Dropdown.Item key='4' onClick={()=>{this.handleGroupIDChange(4);}}>4</Dropdown.Item>
            <Dropdown.Item key='5' onClick={()=>{this.handleGroupIDChange(5);}}>5</Dropdown.Item>
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
const mapDispatch = { changeCandidateProdGroupID };

export default connect(mapStateToProps, mapDispatch)(withTranslation()(ProdGroupID));
