import React from "react";
import ROUTES from "Constants/routes";
import { changeCandidateFormListIdx } from "Redux/components/formManager/formManagerSlice";
import { updateRecordList } from "Redux/components/recordManager/recordManagerSlice";
import { connect } from "react-redux";
import { Table, Button } from "react-bootstrap";
import { withTranslation } from "react-i18next";
import "./tablesize.css";

function HighlightText(props) {
  if(props.highlight)
    return <span className="text-danger">{props.name}</span>;
  else
    return <span>{props.name}</span>;
}

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

class FormTable extends React.Component {
  componentWillUnmount() {
    // Clear any existing bindings;
    // important on mac-os if the app is suspended
    // and resumed. Existing subscriptions must be cleared
    window.api.contextMenu.clearRendererBindings();
  }

  updateRecord(formId) {
    let recordlist = myAPI.listRecord(formId).map(function(obj){
      obj.DIRTY = false;
      obj.INSERT = false;
      return obj;
    });
    this.props.updateRecordList(recordlist);
  }

  genRow(idx, obj) {
    const { t } = this.props;
    return (<tr key={idx} onClick={()=>{
      this.props.changeCandidateFormListIdx(idx);
    }}>
    <th scope="row">{obj.ID}</th>
    <td><HighlightText name={obj.NAME} highlight={obj.DIRTY}></HighlightText></td>
    <td>{numberWithCommas(obj.QUANTITY)+this.props.home.quantity_unit}</td>
    <td>{numberWithCommas(obj.SUM)}</td>
    <td>
      <Button variant="primary" size="sm"
        onClick={() => {
          this.props.changeCandidateFormListIdx(obj.ID);
          this.updateRecord(obj.ID);
          this.props.onNavigate(ROUTES.RECORDLIST);
        }} disabled={obj.DISABLE || this.props.formManager.requireSaving}>
        {t("OpenIt")}
      </Button>
    </td>
    </tr>
    );
  }

  render() {
    let QuantityUnit = this.props.home.quantity_unit==""?"":"("+this.props.home.quantity_unit+")";
    const { t } = this.props;
    let content = [];
    let formList = this.props.formManager.formList;
    for(let i=0; i<=formList.length-1; i++) {
      content.push(this.genRow(i, formList[i]));
    }

    return (
    <div className="scrollTable">
    <Table bordered hover size="sm">
    <thead>
      <tr>
        <th scope="col" className="thID">#</th>
        <th scope="col" className="thText">{t("Name")}</th>
        <th scope="col" className="thNum">{t("Quantity")+QuantityUnit}</th>
        <th scope="col" className="thNum">{t("Total")}</th>
        <th scope="col"></th>
      </tr>
    </thead>
    <tbody>
    {content}
    </tbody>
    </Table></div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  formManager: state.formManager,
  recordManager: state.recordManager,
  home: state.home,
});
const mapDispatch = { changeCandidateFormListIdx, updateRecordList };

export default connect(mapStateToProps, mapDispatch)(withTranslation()(FormTable));