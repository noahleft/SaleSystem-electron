import React from "react";
import { connect } from "react-redux";
import { updatePriceList } from "Redux/components/priceManager/priceManagerSlice";
import { Button } from "react-bootstrap";

class PriceSave extends React.Component {
  constructor(props) {
    super(props);

    this.saveAction = this.saveAction.bind(this);
  }

  saveAction() {
    let CRList = this.props.priceManager.changeRequests.map(function(obj){
      var rObj = {
        id: obj.ID,
        comp_id: obj.COMP_ID,
        prod_id: obj.PROD_ID,
        unit_price: obj.UNIT_PRICE,
      };
      return rObj;
    });
    myAPI.handlePriceChangeRequest(CRList);

    let pricelist = myAPI.listPrice().map(function(obj){
      obj.DIRTY = false;
      return obj;
    });
    this.props.updatePriceList(pricelist);
  }

  render() {
    if(this.props.enable)
      return <Button onClick={this.saveAction}>Save</Button>
    else
      return <Button disabled>Save</Button>
  }
}

const mapStateToProps = (state, props) => ({
    priceManager: state.priceManager
});
const mapDispatch = { updatePriceList };

export default connect(mapStateToProps, mapDispatch)(PriceSave);
