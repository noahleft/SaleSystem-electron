import React from "react";
import { connect } from "react-redux";
import { updateProductList } from "Redux/components/productManager/productManagerSlice";
import { Button, Stack } from "react-bootstrap";
import { withTranslation } from "react-i18next";

class ProdSave extends React.Component {
  constructor(props) {
    super(props);

    this.saveAction = this.saveAction.bind(this);
    this.clearAction = this.clearAction.bind(this);
  }

  saveAction() {
    let modifiedList = this.props.productManager.productList.filter(function(obj){
      if(obj.DIRTY && obj.NAME!="") return true;
      return false;
    });
    let CRList = modifiedList.map(function(obj){
      var rObj = {
        id: obj.ID,
        name: obj.NAME,
        type: obj.TYPE,
        group_id: obj.GROUP_ID,
        hide: obj.HIDE,
      };
      return rObj;
    });
    myAPI.handleProductChangeRequest(CRList);

    this.clearAction();
  }

  clearAction() {
    let productlist = myAPI.listProduct().map(function(obj){
      obj.DIRTY = false;
      return obj;
    });
    this.props.updateProductList(productlist);
  }

  render() {
    const { t } = this.props;
    return (
      <Stack direction="horizontal" gap={3}>
        <Button onClick={this.saveAction} disabled={!this.props.enable}>{t("Save")}</Button>
        <Button variant="danger" onClick={this.clearAction} disabled={!this.props.enable}>{t("Clear")}</Button>
      </Stack>
    )
  }
}

const mapStateToProps = (state, props) => ({
    productManager: state.productManager
});
const mapDispatch = { updateProductList };

export default connect(mapStateToProps, mapDispatch)(withTranslation()(ProdSave));
