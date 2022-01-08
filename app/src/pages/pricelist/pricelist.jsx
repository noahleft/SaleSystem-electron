import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import CompSelect from "Components/compselect/compselect";
import ProdSelect from "Components/prodselect/prodselect";
import ClearSelect from "Components/clearselect/clearselect";
import PriceTable from "Components/pricetable/pricetable";

class PriceList extends React.Component {
  render() {
    return (
      <section className="section">
        <Container fluid>
          <Row className="title is-1">Unit Price View</Row>
          <Row><Col>
            <CompSelect></CompSelect>
            <ProdSelect></ProdSelect>
            <ClearSelect></ClearSelect>
          </Col></Row>
          <Row>
            <PriceTable></PriceTable>
          </Row>
        </Container>
      </section>
    );
  }
}

export default PriceList;
