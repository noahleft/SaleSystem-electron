import React from "react";
import { connect } from "react-redux";

class RecordTable extends React.Component {
  componentWillUnmount() {
    // Clear any existing bindings;
    // important on mac-os if the app is suspended
    // and resumed. Existing subscriptions must be cleared
    window.api.contextMenu.clearRendererBindings();
  }

  render() {
    let content = [];
    let recordList = myAPI.listRecord(this.props.home.selectedFormID);
    for(let i=0; i<=recordList.length-1; i++) {
      content.push(<tr key={recordList[i].ID}>
        <th scope="row">{recordList[i].ID}</th>
        <td>{myAPI.getCompany(recordList[i].COMP_ID).NAME}</td>
        <td>{myAPI.getProduct(recordList[i].PROD_ID).NAME}</td>
        <td>{recordList[i].UNIT_PRICE}</td>
        <td>{recordList[i].QUANTITY}</td>
        <td>{recordList[i].DELIVER_DATE}</td>
        </tr>)
    }

    return (<table className="table">
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Company Name</th>
        <th scope="col">Product Name</th>
        <th scope="col">Unit Price</th>
        <th scope="col">Quantity</th>
        <th scope="col">Deliver_Date</th>
      </tr>
    </thead>
    <tbody> 
    {content}
    </tbody>
    </table>
    );
  }
}

const mapStateToProps = (state, props) => ({
  home: state.home
});
const mapDispatch = { };

export default connect(mapStateToProps, mapDispatch)(RecordTable);