import React from "react";
import { Container, Row } from "react-bootstrap";
import ProdInfo from "Components/selection/prodInfo";
import ProductTable from "Components/tables/producttable";
import ProdFooter from "Components/footer/prodFooter";

class ProductList extends React.Component {
  render() {
    return (
      <section className="section">
        <Container fluid>
          <Row className="title is-1">Product View</Row>
          <Row><ProductTable></ProductTable></Row>
        </Container><hr />
        <ProdInfo></ProdInfo>
        <ProdFooter></ProdFooter>
      </section>
    );
  }
}

export default ProductList;
