import React from "react";
import { connect } from "react-redux";
import { Table } from "react-bootstrap";
import { changeCandidateRecordListIdx } from "Redux/components/recordManager/recordManagerSlice";

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
    if(id==0) return "";
    let companyList = this.props.companyManager.companyList;
    for(let i=0; i<companyList.length; i++) {
      if(companyList[i].ID == id) return companyList[i].NAME;
    }
    return "";
  }

  getProductName(id) {
    if(id==0) return "";
    let productList = this.props.productManager.productList;
    for(let i=0; i<productList.length; i++) {
      if(productList[i].ID == id) return productList[i].NAME;
    }
    return "";
  }

  genRow(idx, obj, ori) {
    return (<tr key={obj.ID} onClick={()=>{
      this.props.changeCandidateRecordListIdx(idx);
      }}>
    <th scope="row">{obj.ID}</th>
    <td><HighlightText name={this.getCompanyName(obj.COMP_ID)} highlight={obj.COMP_ID!=ori.COMP_ID} /></td>
    <td><HighlightText name={this.getProductName(obj.PROD_ID)} highlight={obj.PROD_ID!=ori.PROD_ID} /></td>
    <td>{obj.DELIVER_DATE}</td>
    <td>{obj.UNIT_PRICE}</td>
    <td>{obj.QUANTITY}</td>
    <td></td>
    </tr>
    );
  }

  render() {
    let content = [];
    const recordList = this.props.recordManager.recordList;
    const originalList = this.props.recordManager.originalList;
    for(let i=0; i<=recordList.length-1; i++) {
      content.push(this.genRow(i, recordList[i], originalList[i]));
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
const mapDispatch = { changeCandidateRecordListIdx };

export default connect(mapStateToProps, mapDispatch)(RecordTable);