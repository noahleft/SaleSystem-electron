import React from "react";
import { connect } from "react-redux";
import { updateCompanyList } from "Redux/components/companyManager/companyManagerSlice";
import { Button, Stack } from "react-bootstrap";
import { withTranslation } from "react-i18next";

class CompSave extends React.Component {
  constructor(props) {
    super(props);

    this.saveAction = this.saveAction.bind(this);
    this.clearAction = this.clearAction.bind(this);
  }

  saveAction() {
    let modifiedList = this.props.companyManager.companyList.filter(function(obj){
      if(obj.DIRTY && obj.NAME!="") return true;
      return false;
    });
    let CRList = modifiedList.map(function(obj){
      var rObj = {
        id: obj.ID,
        name: obj.NAME,
        hide: "false",
      };
      return rObj;
    });
    myAPI.handleCompanyChangeRequest(CRList);

    this.clearAction();
  }

  clearAction() {
    let companylist = myAPI.listCompany().map(function(obj){
      obj.DIRTY = false;
      return obj;
    });
    this.props.updateCompanyList(companylist);
  }

  render() {
    const { t } = this.props;
    return (
      <Stack direction="horizontal" gap={3}>
        <Button onClick={this.saveAction}  disabled={!this.props.enable}>{t("Save")}</Button>
        <Button variant="danger" onClick={this.clearAction} disabled={!this.props.enable}>{t("Clear")}</Button>
      </Stack>
    )
  }
}

const mapStateToProps = (state, props) => ({
    companyManager: state.companyManager
});
const mapDispatch = { updateCompanyList };

export default connect(mapStateToProps, mapDispatch)(withTranslation()(CompSave));
