import React from "react";
import { connect } from "react-redux";
import { Stack } from "react-bootstrap";
import { withTranslation } from "react-i18next";
import i18n from "I18n/i18n.config";
import { Math } from "globalthis/implementation";
import "./textalign.css";
import "./export.css";

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

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
    recordList.sort(function(a, b) {
      if(a.DELIVER_DATE < b.DELIVER_DATE) {
        return -1;
      }
      if(a.DELIVER_DATE > b.DELIVER_DATE) {
        return 1;
      }
      if(a.ID < b.ID) {
        return -1;
      }
      if(a.ID > b.ID) {
        return 1;
      }
      return 0;
    });
    let total = 0;
    for(let i=0; i<=recordList.length-1; i++) {
      let sum = Math.round(recordList[i].UNIT_PRICE * recordList[i].QUANTITY);
      total += sum;
      let prod = myAPI.getProduct(recordList[i].PROD_ID);
      let unit = this.getUnitString(prod.TYPE);
      content.push(<tr key={recordList[i].ID}>
        <td className="export dateTime">{this.getDisplayDate(recordList[i].DELIVER_DATE)}</td>
        <td className="export productName">{prod.NAME}</td>
        <td className="export quantity">{recordList[i].QUANTITY}{unit}</td>
        <td className="export price">{recordList[i].UNIT_PRICE.toFixed(1).toString()}</td>
        <td className="export price">{numberWithCommas(sum)}</td>
        <td className="export note">{recordList[i].NOTE}</td>
        </tr>)
    }
    total = Math.round(total);
    let tax = Math.round(total * 0.05);
    let posttax = tax + total;
    return (
    <div>
      <div>
        <table className="export">
          <thead>
            <tr>
              <th scope="col" className="export dateTime">{t("DeliverDate")}</th>
              <th scope="col" className="export productName">{t("Item")}</th>
              <th scope="col" className="export quantity">{t("Quantity")}</th>
              <th scope="col" className="export price">{t("UnitPrice")}</th>
              <th scope="col" className="export price">{t("Sum")}</th>
              <th scope="col" className="export note">{t("Note")}</th>
            </tr>
          </thead>
          <tbody> 
          {content}
          </tbody>
        </table>
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
            <div className="right-side"><h4>{numberWithCommas(total)}</h4></div>
            <div className="right-side" hidden={!this.props.exportManager.needTax}><h4>{numberWithCommas(tax)}</h4></div>
            <div className="right-side" hidden={!this.props.exportManager.needTax}><h4>{numberWithCommas(posttax)}</h4></div>
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