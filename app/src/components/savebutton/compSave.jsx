import React from "react";
import { connect } from "react-redux";
import { updateCompanyList } from "Redux/components/companyManager/companyManagerSlice";
import { Button } from "react-bootstrap";
import { withTranslation } from "react-i18next";

class CompSave extends React.Component {
  constructor(props) {
    super(props);

    this.saveAction = this.saveAction.bind(this);
  }

  saveAction() {
    let modifiedList = this.props.companyManager.companyList.filter(function(obj){
      if(obj.DIRTY) return true;
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

    let companylist = myAPI.listCompany().map(function(obj){
      obj.DIRTY = false;
      return obj;
    });
    this.props.updateCompanyList(companylist);
  }

  render() {
    const { t } = this.props;
    return <Button onClick={this.saveAction} disabled={!this.props.enable}>{t("Save")}</Button>
  }
}

const mapStateToProps = (state, props) => ({
    companyManager: state.companyManager
});
const mapDispatch = { updateCompanyList };

export default connect(mapStateToProps, mapDispatch)(withTranslation()(CompSave));
