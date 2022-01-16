import React from "react";
import { connect } from "react-redux";
import { Table } from "react-bootstrap";
import { changeCandidateCompID } from "Redux/components/companyManager/companyManagerSlice";

function HighlightText(props) {
  if(props.highlight)
    return <span className="text-danger">{props.name}</span>;
  else
    return <span>{props.name}</span>;
}

class CompanyTable extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillUnmount() {
    // Clear any existing bindings;
    // important on mac-os if the app is suspended
    // and resumed. Existing subscriptions must be cleared
    window.api.contextMenu.clearRendererBindings();
  }

  genRow(obj) {
    return (<tr key={obj.ID} onClick={()=>{
      this.props.changeCandidateCompID(obj.ID);
      }}>
    <th scope="row">{obj.ID}</th>
    <td><HighlightText name={obj.NAME} highlight={obj.DIRTY}></HighlightText></td>
    </tr>
    );
  }

  genLastRow(companyList) {
    var obj = {};
    if(companyList.length == 0) {
      obj.ID= 1 ;
      obj.NAME = "";
      obj.DIRTY = false;
    }
    else {
      let lastItem = companyList.slice(-1)[0];
      obj.ID= lastItem.ID+1 ;
      obj.NAME = "";
      obj.DIRTY = false;
    }
    return this.genRow(obj);
  }

  render() {
    let content = [];
    let companyList = this.props.companyManager.companyList;
    for(let i=0; i<=companyList.length-1; i++) {
      content.push(this.genRow(companyList[i]));
    }
    content.push(this.genLastRow(companyList));

    return (
    <div className="scrollTable">
    <Table striped bordered hover size="sm">
    <thead>
      <tr>
        <th scope="col" width="80px">#</th>
        <th scope="col">Company Name</th>
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
  companyManager: state.companyManager
});
const mapDispatch = { changeCandidateCompID };

export default connect(mapStateToProps, mapDispatch)(CompanyTable);