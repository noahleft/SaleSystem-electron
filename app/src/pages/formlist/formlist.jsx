import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

class FormList extends React.Component {
  render() {
    let content = [];
    let formList = myAPI.listForm();
    for(let i=0; i<=formList.length-1; i++) {
      content.push(<tr key={formList[i].ID}>
        <th scope="row">{formList[i].ID}</th>
        <td>{formList[i].NAME}</td>
        </tr>)
    }

    return (
      <section className="section">
          <div className="container">
              <h1 className="title is-1">Form View</h1>
          </div>
          <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Form Name</th>
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

export default FormList;
