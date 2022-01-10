import React from "react";
import { Container, Row, Table } from "react-bootstrap";
import CompInfo from "Components/selection/compInfo";
import CompanyTable from "Components/tables/companytable";
import Footer from "Components/footer/footer";

class CompanyList extends React.Component {
  render() {
    return (
      <section className="section">
          <Container fluid>
            <Row className="title is-1">Company View</Row>
            <Row><CompanyTable></CompanyTable></Row>
          </Container><hr />
          <CompInfo></CompInfo>
          <Footer></Footer>
      </section>
    );
  }
}

export default CompanyList;
