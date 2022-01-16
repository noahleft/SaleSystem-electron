import React from "react";
import { Container, Row, Stack } from "react-bootstrap";
import CompSelect from "Components/dropdowns/compselect";
import PriceTable from "Components/tables/pricetable";

class PriceList extends React.Component {
  render() {
    return (
      <section className="section">
        <Container fluid>
          <Row className="title is-1">Unit Price View</Row>
          <Row>
            <Stack direction="horizontal" gap={2}>
              <CompSelect></CompSelect>
            </Stack>
          </Row>
          <Row>
            <PriceTable></PriceTable>
          </Row>
        </Container>
      </section>
    );
  }
}

export default PriceList;
