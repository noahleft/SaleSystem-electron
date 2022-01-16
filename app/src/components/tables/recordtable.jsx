import React from "react";
import { connect } from "react-redux";
import { Table } from "react-bootstrap";
import { changeCandidateRecordID } from "Redux/components/recordManager/recordManagerSlice";

function HighlightText(props) {
  if(props.highlight)
    return <span className="text-danger">{props.name}</span>;
  else
    return <span>{props.name}</span>;
}

class RecordTable extends React.Component {
  componentWillUnmount() {
    // Clear any existing bindings;
    // important on mac-os if the app is suspended
    // and resumed. Existing subscriptions must be cleared
    window.api.contextMenu.clearRendererBindings();
  }

  getCompanyName(id) {
    let companyList = this.props.companyManager.companyList;
    for(let i=0; i<companyList.length; i++) {
      if(companyList[i].ID == id) return companyList[i].NAME;
    }
    return "";
  }

  getProductName(id) {
    let productList = this.props.productManager.productList;
    for(let i=0; i<productList.length; i++) {
      if(productList[i].ID == id) return productList[i].NAME;
    }
    return "";
  }

  genRow(obj) {
    return (<tr key={obj.ID} onClick={()=>{
      this.props.changeCandidateRecordID(obj.ID);
      }}>
    <th scope="row">{obj.ID}</th>
    <td>{this.getCompanyName(obj.COMP_ID)}</td>
    <td>{this.getProductName(obj.PROD_ID)}</td>
    <td>{obj.DELIVER_DATE}</td>
    <td>{obj.UNIT_PRICE}</td>
    <td>{obj.QUANTITY}</td>
    <td></td>
    </tr>
    );
  }

  render() {
    let content = [];
    let recordList = myAPI.listRecord(this.props.formManager.candidateFormID);
    for(let i=0; i<=recordList.length-1; i++) {
      content.push(this.genRow(recordList[i]));
    }
    return (
    <div className="scrollTable">
    <Table striped bordered hover size="sm">
      <thead>
        <tr>
          <th scope="col" width="80px">#</th>
          <th scope="col">Company Name</th>
          <th scope="col">Product Name</th>
          <th scope="col">Deliver_Date</th>
          <th scope="col">Unit Price</th>
          <th scope="col">Quantity</th>
          <th scope="col">Note</th>
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
  companyManager: state.companyManager,
  productManager: state.productManager,
  formManager: state.formManager,
  recordManager: state.recordManager,
});
const mapDispatch = { changeCandidateRecordID };

export default connect(mapStateToProps, mapDispatch)(RecordTable);