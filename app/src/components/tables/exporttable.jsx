import React from "react";
import { connect } from "react-redux";
import { Table, Stack } from "react-bootstrap";
import { withTranslation } from "react-i18next";
import i18n from "I18n/i18n.config";
import { Math } from "globalthis/implementation";
import "./textalign.css";

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
        <td>{recordList[i].QUANTITY}</td>
        <td>{recordList[i].UNIT_PRICE}</td>
        <td>{sum}</td>
        <td></td>
        </tr>)
    }
    let tax = Math.round(total * 0.05);
    let posttax = tax + total;
    return (
    <div>
      <div>
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th scope="col">{t("DeliverDate")}</th>
              <th scope="col">{t("Item")}</th>
              <th scope="col">{t("Quantity")}</th>
              <th scope="col">{t("UnitPrice")}</th>
              <th scope="col">{t("Sum")}</th>
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
            <div className="right-side" hidden={!this.props.exportManager.needTax}>{t("PreTax")}:</div>
            <div className="right-side" hidden={!this.props.exportManager.needTax}>{t("Tax")}:</div>
            <div className="right-side">{t("Total")}:</div>
          </Stack>
        </div>
        <div>
          <Stack>
            <div className="right-side">{total}</div>
            <div className="right-side" hidden={!this.props.exportManager.needTax}>{tax}</div>
            <div className="right-side" hidden={!this.props.exportManager.needTax}>{posttax}</div>
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
});
const mapDispatch = { };

export default connect(mapStateToProps, mapDispatch)(withTranslation()(ExportTable));