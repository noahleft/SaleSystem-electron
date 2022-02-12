import React from "react";
import { connect } from "react-redux";
import { updatePriceList } from "Redux/components/priceManager/priceManagerSlice";
import { Button, Stack } from "react-bootstrap";
import { withTranslation } from "react-i18next";

class PriceSave extends React.Component {
  constructor(props) {
    super(props);

    this.saveAction = this.saveAction.bind(this);
    this.clearAction = this.clearAction.bind(this);
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

    this.clearAction();
  }

  clearAction() {
    let pricelist = myAPI.listPrice().map(function(obj){
      obj.DIRTY = false;
      return obj;
    });
    this.props.updatePriceList(pricelist);
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
    priceManager: state.priceManager
});
const mapDispatch = { updatePriceList };

export default connect(mapStateToProps, mapDispatch)(withTranslation()(PriceSave));
