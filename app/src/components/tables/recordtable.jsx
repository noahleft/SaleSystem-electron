import React from "react";
import { connect } from "react-redux";
import { Table } from "react-bootstrap";
import { changeCandidateRecordListIdx } from "Redux/components/recordManager/recordManagerSlice";
import { withTranslation } from "react-i18next";
import i18n from "I18n/i18n.config";
import "./tablesize.css";

function HighlightText(props) {
  if(props.highlight)
    return <span className="text-danger">{props.name}</span>;
  else
    return <span>{props.name}</span>;
}

class RecordTable extends React.Component {
  componentWillUnmount() {
    // Clear any existing bindings;
    // important on mac-os if the app is suspended
    // and resumed. Existing subscriptions must be cleared
    window.api.contextMenu.clearRendererBindings();
  }

  getCompanyName(id) {
    if(id==0) return "";
    let companyList = this.props.companyManager.companyList;
    for(let i=0; i<companyList.length; i++) {
      if(companyList[i].ID == id) return companyList[i].NAME;
    }
    return "";
  }

  getProductName(id) {
    if(id==0) return "";
    let productList = this.props.productManager.productList;
    for(let i=0; i<productList.length; i++) {
      if(productList[i].ID == id) return productList[i].NAME;
    }
    return "";
  }

  getDisplayDate(date) {
    if(i18n.language=="zh_TW") {
      var element = date.split('-');
      element[0] = element[0] - 1911;
      return element.join('-');
    }
    return date;
  }

  getProductType(id) {
    if(id==0) return "";
    let productList = this.props.productManager.productList;
    for(let i=0; i<productList.length; i++) {
      if(productList[i].ID == id) return this.getUnitString(productList[i].TYPE);
    }
    return "";
  }

  getUnitString(idx) {
    if (idx == 1)
      return this.props.home.config.quantity_unit_1;
    if (idx == 2)
      return this.props.home.config.quantity_unit_2;
    if (idx == 3)
      return this.props.home.config.quantity_unit_3;
    if (idx == 4)
      return this.props.home.config.quantity_unit_4;
    if (idx == 5)
      return this.props.home.config.quantity_unit_5;
    return this.props.home.config.quantity_unit;
  }

  genRow(idx, obj, ori) {
    let unit = this.getProductType(obj.PROD_ID);
    return (<tr key={idx} onClick={()=>{
      this.props.changeCandidateRecordListIdx(idx);
      }}>
    <th scope="row">{obj.ID}</th>
    <td><HighlightText name={this.getCompanyName(obj.COMP_ID)} highlight={obj.COMP_ID!=ori.COMP_ID} /></td>
    <td><HighlightText name={this.getProductName(obj.PROD_ID)} highlight={obj.PROD_ID!=ori.PROD_ID} /></td>
    <td><HighlightText name={this.getDisplayDate(obj.DELIVER_DATE)} highlight={obj.DELIVER_DATE!=ori.DELIVER_DATE} /></td>
    <td><HighlightText name={obj.UNIT_PRICE} highlight={obj.UNIT_PRICE!=ori.UNIT_PRICE} /></td>
    <td><HighlightText name={obj.QUANTITY.toString()+unit} highlight={obj.QUANTITY!=ori.QUANTITY} /></td>
    <td><HighlightText name={obj.NOTE} highlight={obj.NOTE!=ori.NOTE} /></td>
    </tr>
    );
  }

  render() {
    const { t } = this.props;
    let content = [];
    const recordList = this.props.recordManager.recordList;
    const originalList = this.props.recordManager.originalList;
    for(let i=0; i<=recordList.length-1; i++) {
      content.push(this.genRow(i, recordList[i], originalList[i]));
    }
    return (
    <div className="scrollTable">
    <Table bordered hover size="sm">
      <thead>
        <tr>
          <th scope="col" className="thID">#</th>
          <th scope="col" className="thName">{t("CompanyName")}</th>
          <th scope="col" className="thText">{t("ProductName")}</th>
          <th scope="col" className="thName">{t("DeliverDate")}</th>
          <th scope="col" className="thNum">{t("UnitPrice")}</th>
          <th scope="col" className="thNum">{t("Quantity")}</th>
          <th scope="col">{t("Note")}</th>
        </tr>
      </thead>
      <tbody> 
      {content}
      </tbody>
    </Table></div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  companyManager: state.companyManager,
  productManager: state.productManager,
  formManager: state.formManager,
  recordManager: state.recordManager,
  home: state.home,
});
const mapDispatch = { changeCandidateRecordListIdx };

export default connect(mapStateToProps, mapDispatch)(withTranslation()(RecordTable));