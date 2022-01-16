import React from "react";
import { connect } from "react-redux";
import { Table } from "react-bootstrap";

class PriceTable extends React.Component {
  componentWillUnmount() {
    // Clear any existing bindings;
    // important on mac-os if the app is suspended
    // and resumed. Existing subscriptions must be cleared
    window.api.contextMenu.clearRendererBindings();
  }

  genRow(obj) {
    return (<tr key={obj.ID}>
    <th scope="row">{obj.ID}</th>
    <td>{obj.NAME}</td>
    <td>{obj.UNIT_PRICE}</td>
    </tr>
    );
  }

  getPrice(compId, prodId) {
    let priceList = this.props.priceManager.priceList.filter(function(obj){
      if(obj.COMP_ID == compId && obj.PROD_ID == prodId) return true;
      return false;
    });
    if(priceList.length==0) return "";
    return priceList[0].UNIT_PRICE;
  }

  render() {
    let content = [];
    let compPriceList = this.props.productManager.productList.map(function(obj){
      var rObj = {
        ID: obj.ID,
        NAME: obj.NAME,
        UNIT_PRICE: "",
      };
      return rObj;
    });
    for(let i=0; i<compPriceList.length; i++) {
      compPriceList[i].UNIT_PRICE = this.getPrice(this.props.priceManager.selectedCompID, compPriceList[i].ID);
    }
    for(let i=0; i< compPriceList.length; i++) {
      content.push(this.genRow(compPriceList[i]));
    }

    return (
    <div className="scrollTable">
    <Table striped bordered hover size="sm">
    <thead>
      <tr>
        <th scope="col" width="80px">#</th>
        <th scope="col">Product Name</th>
        <th scope="col">Unit Price</th>
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