import React from "react";
import { connect } from "react-redux";
import { updateRecordList } from "Redux/components/recordManager/recordManagerSlice";
import { changeCandidateFormSummary } from "Redux/components/formManager/formManagerSlice";
import { Button, Stack } from "react-bootstrap";
import { withTranslation } from "react-i18next";

class RecordSave extends React.Component {
  constructor(props) {
    super(props);

    this.saveAction = this.saveAction.bind(this);
    this.clearAction = this.clearAction.bind(this);
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
    let quantity = this.props.recordManager.recordList.map(function(obj){
      return Number(obj.QUANTITY);
    }).reduce((partial, a)=> partial+a, 0);
    let sum = this.props.recordManager.recordList.map(function(obj){
      return Number(obj.QUANTITY)*obj.UNIT_PRICE;
    }).reduce((partial, a)=> partial+a, 0);
    let formSummary = {
      id: formId,
      quantity: quantity,
      sum: sum,
    }
    myAPI.handleFormSummary([formSummary]);
    this.props.changeCandidateFormSummary({
      idx: idx,
      quantity: quantity,
      sum: sum,
    });

    this.clearAction();
  }

  clearAction() {
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
    return (
    <Stack direction="horizontal" gap={3}>
      <Button onClick={this.saveAction} disabled={!this.props.enable}>{t("Save")}</Button>
      <Button variant="danger" onClick={this.clearAction} disabled={!this.props.enable}>{t("Clear")}</Button>
    </Stack>
    )
  }
}

const mapStateToProps = (state, props) => ({
  formManager: state.formManager,
  recordManager: state.recordManager
});
const mapDispatch = { updateRecordList, changeCandidateFormSummary };

export default connect(mapStateToProps, mapDispatch)(withTranslation()(RecordSave));
