import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { readConfigRequest, readConfigResponse } from "secure-electron-store";

class RecordList extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    api.store.onReceive(readConfigResponse, function(args){
      if (args.success) {
        console.log(`Received '${args.key}:${args.value}' from file.`);
      }
    });
    api.store.send(readConfigRequest, "formID");

    let content = [];
    let recordList = myAPI.listRecord();
    for(let i=0; i<=recordList.length-1; i++) {
      content.push(<tr key={recordList[i].ID}>
        <th scope="row">{recordList[i].ID}</th>
        <td>{myAPI.getCompany(recordList[i].COMP_ID).NAME}</td>
        <td>{myAPI.getProduct(recordList[i].PROD_ID).NAME}</td>
        <td>{recordList[i].UNIT_PRICE}</td>
        <td>{recordList[i].QUANTITY}</td>
        </tr>)
    }

    return (
      <section className="section">
          <div className="container">
              <h1 className="title is-1">Record</h1>
          </div>
          <table className="table">
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
      </section>
    );
  }
}

export default RecordList;
