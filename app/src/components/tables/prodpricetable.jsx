import React from "react";
import { connect } from "react-redux";
import { Table } from "react-bootstrap";
import ProdPriceRow from "Components/selection/prodpriceRow";
import { withTranslation } from "react-i18next";
import "./tablesize.css";

class ProdPriceTable extends React.Component {
  componentWillUnmount() {
    // Clear any existing bindings;
    // important on mac-os if the app is suspended
    // and resumed. Existing subscriptions must be cleared
    window.api.contextMenu.clearRendererBindings();
  }

  getPrice(compId, prodId) {
    let priceList = this.props.priceManager.priceList.filter(function(obj){
      if(obj.COMP_ID == compId && obj.PROD_ID == prodId) return true;
      return false;
    });
    if(priceList.length==0) {
      return {UNIT_PRICE: "", DIRTY: false};
    }
    return priceList[0];
  }

  render() {
    const { t } = this.props;
    let content = [];
    let compPriceList = this.props.companyManager.companyList.filter(function(obj){
      if(obj.HIDE == 1) return false;
      return true;
    }).map(function(obj){
      var rObj = {
        ID: obj.ID,
        NAME: obj.NAME,
        UNIT_PRICE: "",
        DIRTY: false,
        HIDE: obj.HIDE,
      };
      return rObj;
    });
    for(let i=0; i<compPriceList.length; i++) {
      let priceItem = this.getPrice(compPriceList[i].ID, this.props.priceManager.selectedProdID);
      if(priceItem.UNIT_PRICE=="") {
        compPriceList[i].UNIT_PRICE = "";
        compPriceList[i].DIRTY = false;
      }
      else {
        compPriceList[i].UNIT_PRICE = priceItem.UNIT_PRICE.toFixed(1);
        compPriceList[i].DIRTY = priceItem.DIRTY;
      }
    }
    const disable = this.props.priceManager.selectedProdID==0;
    const hidden = !disable && !this.props.priceManager.showAllProduct;
    for(let i=0; i< compPriceList.length; i++) {
      content.push(<ProdPriceRow key={compPriceList[i].ID} compPrice={compPriceList[i]} disabled={disable} hidden={hidden}/>);
    }

    return (
    <div className="scrollTable">
    <Table bordered hover size="sm">
    <thead>
      <tr>
        <th scope="col" className="thID">#</th>
        <th scope="col" className="thText">{t("Company")}</th>
        <th scope="col" className="thNum">{t("UnitPrice")}</th>
        <th scope="col">{t("EditPrice")}</th>
      </tr>
    </thead>
    <tbody> 
    {content}
    </tbody>
    </Table>
    </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  companyManager: state.companyManager,
  productManager: state.productManager,
  priceManager: state.priceManager,
});
const mapDispatch = { };

export default connect(mapStateToProps, mapDispatch)(withTranslation()(ProdPriceTable));