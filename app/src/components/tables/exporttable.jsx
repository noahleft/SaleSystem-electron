import React from "react";
import { connect } from "react-redux";
import { Table, Stack } from "react-bootstrap";

class ExportTable extends React.Component {
  componentWillUnmount() {
    // Clear any existing bindings;
    // important on mac-os if the app is suspended
    // and resumed. Existing subscriptions must be cleared
    window.api.contextMenu.clearRendererBindings();
  }

  render() {
    let content = [];
    function isSelectedCompID(CompId) {
      return function(obj) {
        if(CompId == 0) return true;
        if(obj.COMP_ID == CompId) return true;
        return false; 
      }
    }
    let recordList = this.props.exportManager.exportList.filter(isSelectedCompID(this.props.exportManager.selectedCompID));
    let total = 0;
    for(let i=0; i<=recordList.length-1; i++) {
      let sum = recordList[i].UNIT_PRICE * recordList[i].QUANTITY;
      total += sum;
      content.push(<tr key={recordList[i].ID}>
        <td>{recordList[i].DELIVER_DATE}</td>
        <td>{myAPI.getProduct(recordList[i].PROD_ID).NAME}</td>
        <td>{recordList[i].QUANTITY}</td>
        <td>{recordList[i].UNIT_PRICE}</td>
        <td>{sum}</td>
        </tr>)
    }
    return (
    <div>
      <div>
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th scope="col">Deliver_Date</th>
              <th scope="col">Product Name</th>
              <th scope="col">Quantity</th>
              <th scope="col">Unit Price</th>
              <th scope="col">Sum</th>
            </tr>
          </thead>
          <tbody> 
          {content}
          </tbody>
        </Table>
      </div>
      <Stack>
        <div className="ms-auto">Total:{total}</div>
      </Stack>
    </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  formManager: state.formManager,
  exportManager: state.exportManager,
});
const mapDispatch = { };

export default connect(mapStateToProps, mapDispatch)(ExportTable);