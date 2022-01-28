import React from "react";
import { connect } from "react-redux";
import { Form, Row, Col } from "react-bootstrap";
import { changeCandidateRecordProdId, changeCandidateRecordUnitPrice } from "Redux/components/recordManager/recordManagerSlice";

class FormProd extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const prod_id = e.target.value;
    this.props.changeCandidateRecordProdId(prod_id);

    const record = this.props.recordManager.recordList[this.props.recordManager.candidateRecordListIdx];
    if(record.INSERT && record.COMP_ID!=0) {
      for(const obj of this.props.priceManager.priceList) {
        if(obj.COMP_ID==record.COMP_ID && obj.PROD_ID==prod_id) {
          this.props.changeCandidateRecordUnitPrice(obj.UNIT_PRICE);
        }
      }
    }
  }

  render() {
    const content = this.props.productManager.productList.map(function(obj){
      return (<option key={obj.ID} value={obj.ID}>{obj.NAME}</option>)
    });
    const idx = this.props.recordManager.candidateRecordListIdx;
    const prod_id = (idx!=-1)?this.props.recordManager.recordList[idx].PROD_ID:0;
    return (
    <Form.Group as={Row} className="mb-3" controlId="formProdName" ref="formProdName">
    <Form.Label column sm={4}>Product:</Form.Label>
    <Col sm={6}>
    <Form.Select aria-label="Select" value={prod_id} onChange={this.handleChange} disabled={idx==-1}>
      <option key="0" value="0" disabled>Select</option>
      {content}
    </Form.Select>
    </Col>
    </Form.Group>
    );
  }
}

const mapStateToProps = (state, props) => ({
  productManager: state.productManager,
  priceManager: state.priceManager,
  recordManager: state.recordManager
});
const mapDispatch = { changeCandidateRecordProdId, changeCandidateRecordUnitPrice };

export default connect(mapStateToProps, mapDispatch)(FormProd);
