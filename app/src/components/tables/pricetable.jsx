import React from "react";
import { connect } from "react-redux";
import { Table } from "react-bootstrap";
import PriceRow from "Components/selection/priceRow";

class PriceTable extends React.Component {
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
    let content = [];
    let compPriceList = this.props.productManager.productList.map(function(obj){
      var rObj = {
        ID: obj.ID,
        NAME: obj.NAME,
        UNIT_PRICE: "",
        EDITABLE: false,
        DIRTY: false,
      };
      return rObj;
    });
    for(let i=0; i<compPriceList.length; i++) {
      let priceItem = this.getPrice(this.props.priceManager.selectedCompID, compPriceList[i].ID);
      compPriceList[i].UNIT_PRICE = priceItem.UNIT_PRICE;
      compPriceList[i].DIRTY = priceItem.DIRTY;
      compPriceList[i].EDITABLE = this.props.priceManager.selectedCompID!=0;
    }
    for(let i=0; i< compPriceList.length; i++) {
      content.push(<PriceRow key={compPriceList[i].ID} compPrice={compPriceList[i]}></PriceRow>);
    }

    return (
    <div className="scrollTable">
    <Table striped bordered hover size="sm">
    <thead>
      <tr>
        <th scope="col" width="80px">#</th>
        <th scope="col">Product Name</th>
        <th scope="col">Unit Price</th>
        <th scope="col">Edit</th>
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

export default connect(mapStateToProps, mapDispatch)(PriceTable);