import React from "react";
import { connect } from "react-redux";
import { updateProductList } from "Redux/components/productManager/productManagerSlice";
import { Button } from "react-bootstrap";

class ProdSave extends React.Component {
  constructor(props) {
    super(props);

    this.saveAction = this.saveAction.bind(this);
  }

  saveAction() {
    let CRList = this.props.productManager.changeRequests.map(function(obj){
      var rObj = {
        id: obj.ID,
        name: obj.NAME,
        hide: "false",
      };
      return rObj;
    });
    myAPI.handleProductChangeRequest(CRList);

    let productlist = myAPI.listProduct().map(function(obj){
      obj.DIRTY = false;
      return obj;
    });
    this.props.updateProductList(productlist);
  }

  render() {
    if(this.props.enable)
      return <Button onClick={this.saveAction}>Save</Button>
    else
      return <Button disabled>Save</Button>
  }
}

const mapStateToProps = (state, props) => ({
    productManager: state.productManager
});
const mapDispatch = { updateProductList };

export default connect(mapStateToProps, mapDispatch)(ProdSave);
