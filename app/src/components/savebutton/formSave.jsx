import React from "react";
import { connect } from "react-redux";
import { updateFormList } from "Redux/components/formManager/formManagerSlice";
import { Button, Stack } from "react-bootstrap";
import { withTranslation } from "react-i18next";

class FormSave extends React.Component {
  constructor(props) {
    super(props);

    this.saveAction = this.saveAction.bind(this);
    this.clearAction = this.clearAction.bind(this);
  }

  saveAction() {
    let modifiedList = this.props.formManager.formList.filter(function(obj){
      if(obj.DIRTY && obj.NAME!="") return true;
      return false;
    });
    let CRList = modifiedList.map(function(obj){
      var rObj = {
        id: obj.ID,
        name: obj.NAME,
        hide: 0,
      };
      return rObj;
    });
    myAPI.handleFormChangeRequest(CRList);

    this.clearAction();
  }

  clearAction(){
    let formlist = myAPI.listForm().map(function(obj){
      obj.DIRTY = false;
      return obj;
    });
    this.props.updateFormList(formlist);
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
    formManager: state.formManager
});
const mapDispatch = { updateFormList };

export default connect(mapStateToProps, mapDispatch)(withTranslation()(FormSave));
