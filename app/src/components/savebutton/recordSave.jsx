import React from "react";
import { connect } from "react-redux";
import { updateRecordList } from "Redux/components/recordManager/recordManagerSlice";
import { Button } from "react-bootstrap";

class RecordSave extends React.Component {
  constructor(props) {
    super(props);

    this.saveAction = this.saveAction.bind(this);
  }

  saveAction() {
    let CRList = this.props.recordManager.changeRequests.map(function(obj){
      var rObj = {
        id: obj.ID,
        name: obj.NAME,
        hide: "false",
      };
      return rObj;
    });
    // myAPI.handleCompanyChangeRequest(CRList);

    let recordlist = myAPI.listRecord().map(function(obj){
      obj.DIRTY = false;
      return obj;
    });
    this.props.updateRecordList(recordlist);
  }

  render() {
    if(this.props.enable)
      return <Button onClick={this.saveAction}>Save</Button>
    else
      return <Button disabled>Save</Button>
  }
}

const mapStateToProps = (state, props) => ({
    recordManager: state.recordManager
});
const mapDispatch = { updateRecordList };

export default connect(mapStateToProps, mapDispatch)(RecordSave);
