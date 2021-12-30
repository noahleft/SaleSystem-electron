import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

class CompanyList extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    let lists = [];
    let companyList = myAPI.listCompany();
    for(let i=0; i<=companyList.length-1; i++) {
      lists.push(<tr key={companyList[i].ID}>
        <th scope="row">{companyList[i].ID}</th>
        <td>{companyList[i].NAME}</td>
        </tr>)
    }

    return (
      <section className="section">
          <div className="container">
              <h1 className="title is-1">Company View</h1>
          </div>
          <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Company Name</th>
            </tr>
          </thead>
          <tbody>
          {lists}
          </tbody>
          </table>
      </section>
    );
  }
}

export default CompanyList;
