import React from "react";
import { Container, Row, Table } from "react-bootstrap";
import ProdInfo from "Components/selection/prodInfo";
import ProductTable from "Components/tables/producttable";

class ProductList extends React.Component {
  render() {
    return (
      <section className="section">
        <Container fluid>
          <Row className="title is-1">Product View</Row>
          <Row><ProductTable></ProductTable></Row>
          <Row><hr /></Row>
          <Row><ProdInfo></ProdInfo></Row>
        </Container>
      </section>
    );
  }
}

export default ProductList;
