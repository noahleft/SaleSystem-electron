import React from "react";
import { connect } from "react-redux";
import { updateProductList } from "Redux/components/productManager/productManagerSlice";
import { Button } from "react-bootstrap";
import { withTranslation } from "react-i18next";

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
    const { t } = this.props;
    return <Button onClick={this.saveAction} disabled={!this.props.enable}>{t("Save")}</Button>
  }
}

const mapStateToProps = (state, props) => ({
    productManager: state.productManager
});
const mapDispatch = { updateProductList };

export default connect(mapStateToProps, mapDispatch)(withTranslation()(ProdSave));
