import React from "react";
import { Container, Row, Table } from "react-bootstrap";
import CompInfo from "Components/selection/compInfo";
import Footer from "Components/footer/footer";

class CompanyList extends React.Component {
  render() {
    let content = [];
    let companyList = myAPI.listCompany();
    for(let i=0; i<=companyList.length-1; i++) {
      content.push(<tr key={companyList[i].ID}>
        <th scope="row">{companyList[i].ID}</th>
        <td>{companyList[i].NAME}</td>
        </tr>)
    }
    return (
      <section className="section">
          <Container fluid>
            <Row className="title is-1">Company View</Row>
            <Row>
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
            </Row>
          </Container><hr />
          <CompInfo></CompInfo>
          <Footer></Footer>
      </section>
    );
  }
}

export default CompanyList;
