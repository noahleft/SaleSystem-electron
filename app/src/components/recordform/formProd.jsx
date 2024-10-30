import React from "react";
import { connect } from "react-redux";
import { Form, Row, Col } from "react-bootstrap";
import { changeCandidateRecordProdId, changeCandidateRecordUnitPrice } from "Redux/components/recordManager/recordManagerSlice";
import { withTranslation } from "react-i18next";

class FormProd extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const prod_id = e.target.value;
    const idx = this.props.recordManager.candidateRecordListIdx;
    this.props.changeCandidateRecordProdId({
      idx:   idx,
      value: prod_id,
    });

    const record = this.props.recordManager.recordList[idx];
    if(record.INSERT && record.COMP_ID!=0) {
      for(const obj of this.props.priceManager.priceList) {
        if(obj.COMP_ID==record.COMP_ID && obj.PROD_ID==prod_id) {
          this.props.changeCandidateRecordUnitPrice({
            idx:   idx,
            value: obj.UNIT_PRICE
          });
        }
      }
    }
  }

  getProductOptions(compId) {
    const { t } = this.props;
    const prodList = this.props.productManager.productList.filter(function(obj){
      if(obj.HIDE==1) return false;
      return true;
    });
    if(compId==0) {
      return prodList.map(function(obj){
        return (<option key={obj.ID} value={obj.ID}>{obj.NAME}</option>)
      });
    }
    else {
      function matchedPrice(compId) {
        return function(obj) {
          if(obj.COMP_ID == compId) return true;
          return false;
        }
      }
      const priceList = this.props.priceManager.priceList.filter(matchedPrice(compId));
      const prodSet = new Set(priceList.map(p=>p.PROD_ID));
      function inProdSet(prodSet) {
        return function(obj) {
          return prodSet.has(obj.ID);
        }
      }
      function notInProdSet(prodSet) {
        return function(obj) {
          return ! prodSet.has(obj.ID);
        }
      }
      function withProdGroup(idx) {
        return function(obj) {
          return obj.GROUP_ID == idx;
        }
      }
      let inSetProductList = prodList.filter(inProdSet(prodSet));
      let restProductList =  prodList.filter(notInProdSet(prodSet));
      let restProductGroup0 = restProductList.filter(withProdGroup(0));
      let restProductGroup1 = restProductList.filter(withProdGroup(1));
      let restProductGroup2 = restProductList.filter(withProdGroup(2));
      let restProductGroup3 = restProductList.filter(withProdGroup(3));
      let restProductGroup4 = restProductList.filter(withProdGroup(4));
      let restProductGroup5 = restProductList.filter(withProdGroup(5));
      let content = inSetProductList.map(function(obj){
        return (<option key={obj.ID} value={obj.ID}>{obj.NAME}</option>)
      });
      if (restProductGroup1.length > 0) {
        content.push(<option key={-1} disabled>---{t("GroupID")} 1---</option>);
        content.push(restProductGroup1.map(function(obj){
          return (<option key={obj.ID} value={obj.ID}>{obj.NAME}</option>)
        }));
      }
      if (restProductGroup2.length > 0) {
        content.push(<option key={-2} disabled>---{t("GroupID")} 2---</option>);
        content.push(restProductGroup2.map(function(obj){
          return (<option key={obj.ID} value={obj.ID}>{obj.NAME}</option>)
        }));
      }
      if (restProductGroup3.length > 0) {
        content.push(<option key={-3} disabled>---{t("GroupID")} 3---</option>);
        content.push(restProductGroup3.map(function(obj){
          return (<option key={obj.ID} value={obj.ID}>{obj.NAME}</option>)
        }));
      }
      if (restProductGroup4.length > 0) {
        content.push(<option key={-4} disabled>---{t("GroupID")} 4---</option>);
        content.push(restProductGroup4.map(function(obj){
          return (<option key={obj.ID} value={obj.ID}>{obj.NAME}</option>)
        }));
      }
      if (restProductGroup5.length > 0) {
        content.push(<option key={-5} disabled>---{t("GroupID")} 5---</option>);
        content.push(restProductGroup5.map(function(obj){
          return (<option key={obj.ID} value={obj.ID}>{obj.NAME}</option>)
        }));
      }
      if (restProductGroup0.length > 0) {
        content.push(<option key={-6} disabled>-------------</option>);
        content.push(restProductGroup0.map(function(obj){
          return (<option key={obj.ID} value={obj.ID}>{obj.NAME}</option>)
        }));
      }
      return content;
    }
  }

  render() {
    const { t } = this.props;
    const idx = this.props.recordManager.candidateRecordListIdx;
    const comp_id = (idx!=-1)?this.props.recordManager.recordList[idx].COMP_ID:0;
    const prod_id = (idx!=-1)?this.props.recordManager.recordList[idx].PROD_ID:0;
    const content = this.getProductOptions(comp_id);
    return (
    <Form.Group as={Row} className="mb-3" controlId="formProdName" ref="formProdName">
    <Form.Label column sm={4}>{t("ProductName")}:</Form.Label>
    <Col sm={6}>
    <Form.Select aria-label="Select" value={prod_id} onChange={this.handleChange} disabled={idx==-1}>
      <option key="0" value="0" disabled>{t("Select")}</option>
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

export default connect(mapStateToProps, mapDispatch)(withTranslation()(FormProd));
