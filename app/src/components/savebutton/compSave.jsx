import React from "react";
import { connect } from "react-redux";
import { updateCompanyList } from "Redux/components/companyManager/companyManagerSlice";
import { Button } from "react-bootstrap";

class CompSave extends React.Component {
  constructor(props) {
    super(props);

    this.saveAction = this.saveAction.bind(this);
  }

  saveAction() {
    let CRList = this.props.companyManager.changeRequests.map(function(obj){
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
    if(this.props.enable)
      return <Button onClick={this.saveAction}>Save</Button>
    else
      return <Button disabled>Save</Button>
  }
}

const mapStateToProps = (state, props) => ({
    companyManager: state.companyManager
});
const mapDispatch = { updateCompanyList };

export default connect(mapStateToProps, mapDispatch)(CompSave);
