import React from "react";
import { connect } from "react-redux";
import { updateFormList } from "Redux/components/formManager/formManagerSlice";
import { Button } from "react-bootstrap";

class FormSave extends React.Component {
  constructor(props) {
    super(props);

    this.saveAction = this.saveAction.bind(this);
  }

  saveAction() {
    let CRList = this.props.formManager.changeRequests.map(function(obj){
      var rObj = {
        id: obj.ID,
        name: obj.NAME,
        hide: "false",
      };
      return rObj;
    });
    myAPI.handleFormChangeRequest(CRList);

    let formlist = myAPI.listForm().map(function(obj){
      obj.DIRTY = false;
      return obj;
    });
    this.props.updateFormList(formlist);
  }

  render() {
    if(this.props.enable)
      return <Button onClick={this.saveAction}>Save</Button>
    else
      return <Button disabled>Save</Button>
  }
}

const mapStateToProps = (state, props) => ({
    formManager: state.formManager
});
const mapDispatch = { updateFormList };

export default connect(mapStateToProps, mapDispatch)(FormSave);
