import React from "react";
import { connect } from "react-redux";
import { updateRecordList } from "Redux/components/recordManager/recordManagerSlice";
import { Button } from "react-bootstrap";
import { withTranslation } from "react-i18next";

class RecordSave extends React.Component {
  constructor(props) {
    super(props);

    this.saveAction = this.saveAction.bind(this);
  }

  saveAction() {
    let modifiedList = this.props.recordManager.recordList.filter(function(obj){
      if(obj.DIRTY) return true;
      return false;
    });
    let CRList = modifiedList.map(function(obj){
      var rObj = {
        id: obj.INSERT?0:obj.ID,
        comp_id: obj.COMP_ID,
        prod_id: obj.PROD_ID,
        form_id: obj.FORM_ID,
        created_date: obj.CREATED_DATE,
        deliver_date: obj.DELIVER_DATE,
        unit_price: obj.UNIT_PRICE,
        quantity: obj.QUANTITY,
        note: obj.NOTE,
        hide: "false",
      };
      return rObj;
    });
    myAPI.handleRecordChangeRequest(CRList);

    const idx = this.props.formManager.candidateFormListIdx;
    let formId = this.props.formManager.formList[idx].ID;
    let recordlist = myAPI.listRecord(formId).map(function(obj){
      obj.DIRTY = false;
      return obj;
    });
    this.props.updateRecordList(recordlist);
  }

  render() {
    const { t } = this.props;
    return <Button onClick={this.saveAction} disabled={!this.props.enable}>{t("Save")}</Button>
  }
}

const mapStateToProps = (state, props) => ({
  formManager: state.formManager,
  recordManager: state.recordManager
});
const mapDispatch = { updateRecordList };

export default connect(mapStateToProps, mapDispatch)(withTranslation()(RecordSave));
