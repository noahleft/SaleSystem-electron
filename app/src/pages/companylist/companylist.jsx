import React from "react";

class CompanyList extends React.Component {
  constructor(props) {
    super(props);

    myAPI.listCompany();
  }

  render() {
    return (
      <section className="section">
          <div className="container">
              <h1 className="title is-1">Company View</h1>
          </div>
          <div className="container mt-2">
              Company:
          </div>
      </section>
    );
  }
}

export default CompanyList;
