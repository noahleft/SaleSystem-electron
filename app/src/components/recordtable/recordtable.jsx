import React from "react";
import { readConfigRequest, readConfigResponse } from "secure-electron-store";
import { connect } from "react-redux";

class RecordTable extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillUnmount() {
    // Clear any existing bindings;
    // important on mac-os if the app is suspended
    // and resumed. Existing subscriptions must be cleared
    window.api.contextMenu.clearRendererBindings();
  }

  componentDidMount() {
    api.store.onReceive(readConfigResponse, function(args){
      if(args.success) {
      }
    });
  }

  render() {
    console.log(`${this.props.home.selectedFormID}`);
    let content = [];
    let recordList = myAPI.listRecord(this.props.home.selectedFormID);
    for(let i=0; i<=recordList.length-1; i++) {
      content.push(<tr key={recordList[i].ID}>
        <th scope="row">{recordList[i].ID}</th>
        <td>{myAPI.getCompany(recordList[i].COMP_ID).NAME}</td>
        <td>{myAPI.getProduct(recordList[i].PROD_ID).NAME}</td>
        <td>{recordList[i].UNIT_PRICE}</td>
        <td>{recordList[i].QUANTITY}</td>
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