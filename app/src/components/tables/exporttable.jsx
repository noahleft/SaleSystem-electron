import React from "react";
import { connect } from "react-redux";
import { Table, Stack } from "react-bootstrap";
import { withTranslation } from "react-i18next";
import i18n from "I18n/i18n.config";
import { Math } from "globalthis/implementation";
import "./textalign.css";
import "./tablesize.css";

class ExportTable extends React.Component {
  componentWillUnmount() {
    // Clear any existing bindings;
    // important on mac-os if the app is suspended
    // and resumed. Existing subscriptions must be cleared
    window.api.contextMenu.clearRendererBindings();
  }

  getDisplayDate(date) {
    if(i18n.language=="zh_TW") {
      var element = date.split('-');
      element[0] = element[0] - 1911;
      return element.join('-');
    }
    return date;
  }

  render() {
    const { t } = this.props;
    let content = [];
    function isSelectedCompID(CompId) {
      return function(obj) {
        if(CompId == 0) return true;
        if(obj.COMP_ID == CompId) return true;
        return false; 
      }
    }
    let recordList = this.props.exportManager.exportList.filter(isSelectedCompID(this.props.exportManager.selectedCompID));
    let total = 0;
    for(let i=0; i<=recordList.length-1; i++) {
      let sum = recordList[i].UNIT_PRICE * recordList[i].QUANTITY;
      total += sum;
      content.push(<tr key={recordList[i].ID}>
        <td>{this.getDisplayDate(recordList[i].DELIVER_DATE)}</td>
        <td>{myAPI.getProduct(recordList[i].PROD_ID).NAME}</td>
        <td>{recordList[i].QUANTITY}{this.props.home.quantity_unit}</td>
        <td>{recordList[i].UNIT_PRICE}</td>
        <td>{sum}</td>
        <td>{recordList[i].NOTE}</td>
        </tr>)
    }
    let tax = Math.round(total * 0.05);
    let posttax = tax + total;
    let QuantityUnit = this.props.home.quantity_unit==""?"":"("+this.props.home.quantity_unit+")";
    return (
    <div>
      <div>
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th scope="col" className="thName">{t("DeliverDate")}</th>
              <th scope="col" className="thText">{t("Item")}</th>
              <th scope="col" className="thNum">{t("Quantity")}{QuantityUnit}</th>
              <th scope="col" className="thNum">{t("UnitPrice")}</th>
              <th scope="col" className="thNum">{t("Sum")}</th>
              <th scope="col">{t("Note")}</th>
            </tr>
          </thead>
          <tbody> 
          {content}
          </tbody>
        </Table>
      </div>
      <Stack direction="horizontal">
        <div className="ms-auto">
          <Stack>
            <div className="right-side" hidden={!this.props.exportManager.needTax}><h4>{t("PreTax")}:</h4></div>
            <div className="right-side" hidden={!this.props.exportManager.needTax}><h4>{t("Tax")}:</h4></div>
            <div className="right-side"><h4>{t("Total")}:</h4></div>
          </Stack>
        </div>
        <div>
          <Stack>
            <div className="right-side"><h4>{total}</h4></div>
            <div className="right-side" hidden={!this.props.exportManager.needTax}><h4>{tax}</h4></div>
            <div className="right-side" hidden={!this.props.exportManager.needTax}><h4>{posttax}</h4></div>
          </Stack>
        </div>
      </Stack>
    </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  formManager: state.formManager,
  exportManager: state.exportManager,
  home: state.home,
});
const mapDispatch = { };

export default connect(mapStateToProps, mapDispatch)(withTranslation()(ExportTable));