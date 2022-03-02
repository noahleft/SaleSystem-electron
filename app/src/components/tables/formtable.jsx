import React from "react";
import ROUTES from "Constants/routes";
import { changeCandidateFormListIdx } from "Redux/components/formManager/formManagerSlice";
import { updateRecordList } from "Redux/components/recordManager/recordManagerSlice";
import { connect } from "react-redux";
import { Button } from "react-bootstrap";
import { withTranslation } from "react-i18next";
import "./tablesize.css";
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import BootstrapTable from "react-bootstrap-table-next";

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
    <td>{numberWithCommas(obj.QUANTITY)+this.props.home.config.quantity_unit}</td>
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

  renderNaviButton(obj) {
    const { t } = this.props;
    return (
    <Button variant="primary" size="sm"
      onClick={() => {
        this.props.changeCandidateFormListIdx(obj.ID);
        this.updateRecord(obj.ID);
        this.props.onNavigate(ROUTES.RECORDLIST);
      }} disabled={obj.DISABLE || this.props.formManager.requireSaving}>
      {t("OpenIt")}
    </Button>
    )
  }

  genData(idx, obj) {
    var rObj = {
      idx: idx,
      id: obj.ID,
      name: (<HighlightText name={obj.NAME} highlight={obj.DIRTY}></HighlightText>),
      quantity: numberWithCommas(obj.QUANTITY)+this.props.home.config.quantity_unit,
      total: numberWithCommas(obj.SUM),
      navi: this.renderNaviButton(obj),
    };
    return rObj;
  }

  render() {
    let QuantityUnit = this.props.home.config.quantity_unit==""?"":"("+this.props.home.config.quantity_unit+")";
    const { t } = this.props;
    let formList = this.props.formManager.formList;

    const columns = [{
      dataField: 'id',
      text: '#',
      sort: true,
      headerClasses: 'thID',
    },{
      dataField: 'name',
      text: t("Name"),
      headerClasses: 'thText',
    },{
      dataField: 'quantity',
      text: t("Quantity")+QuantityUnit,
      headerClasses: 'thNum',
    },{
      dataField: 'total',
      text: t("Total"),
      headerClasses: 'thNum',
    },{
      dataField: 'navi',
      text: "",
    }];

    let data = [];
    for(let i=0; i<=formList.length-1; i++) {
      data.push(this.genData(i, formList[i]));
    }

    const rowEvents = {
      onClick: (e, row, rowIndex) => {
        this.props.changeCandidateFormListIdx(row.idx);
      }
    }

    const defaultSorted = [{
      dataField: 'id',
      order: 'desc',
    }];

    return (
    <div className="scrollTable">
      <BootstrapTable keyField="id" data= {data} columns={columns} rowEvents={rowEvents} defaultSorted={defaultSorted} hover bordered classes="table-sm" bootstrap4={true}/>
    </div>
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