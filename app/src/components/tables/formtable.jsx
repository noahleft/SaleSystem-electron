import React from "react";
import ROUTES from "Constants/routes";
import { changeCandidateFormID } from "Redux/components/formManager/formManagerSlice";
import { updateRecordList } from "Redux/components/recordManager/recordManagerSlice";
import { connect } from "react-redux";
import { Table, Button } from "react-bootstrap";

function HighlightText(props) {
  if(props.highlight)
    return <span className="text-danger">{props.name}</span>;
  else
    return <span>{props.name}</span>;
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
      return obj;
    });
    this.props.updateRecordList(recordlist);
  }

  genRow(obj) {
    return (<tr key={obj.ID} onClick={()=>{
      this.props.changeCandidateFormID(obj.ID);
    }}>
    <th scope="row">{obj.ID}</th>
    <td><HighlightText name={obj.NAME} highlight={obj.DIRTY}></HighlightText></td>
    <td>
      <Button variant="primary" size="sm"
        onClick={() => {
          this.props.changeCandidateFormID(obj.ID);
          this.updateRecord(obj.ID);
          this.props.onNavigate(ROUTES.RECORDLIST);
        }} disabled={obj.DISABLE || this.props.formManager.changeRequests.length!=0}>
        OpenIt!
      </Button>
    </td>
    </tr>
    );
  }

  genLastRow(formList) {
    var obj = {};
    if(formList.length == 0) {
      obj.ID= 1 ;
      obj.NAME = "";
      obj.DIRTY = false;
      obj.DISABLE = true;
    }
    else {
      let lastItem = formList.slice(-1)[0];
      obj.ID= lastItem.ID+1 ;
      obj.NAME = "";
      obj.DIRTY = false;
      obj.DISABLE = true;
    }
    return this.genRow(obj);
  }

  render() {
    let content = [];
    let formList = this.props.formManager.formList;
    for(let i=0; i<=formList.length-1; i++) {
      content.push(this.genRow(formList[i]));
    }
    content.push(this.genLastRow(formList));

    return (
    <div className="scrollTable">
    <Table striped bordered hover size="sm">
    <thead>
      <tr>
        <th scope="col" width="80px">#</th>
        <th scope="col">Form Name</th>
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
});
const mapDispatch = { changeCandidateFormID, updateRecordList };

export default connect(mapStateToProps, mapDispatch)(FormTable);