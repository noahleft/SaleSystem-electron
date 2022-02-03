import React from "react";
import { Container, Row, Stack } from "react-bootstrap";
import CompSelect from "Components/dropdowns/compselect";
import PriceTable from "Components/tables/pricetable";
import PriceFooter from "Components/footer/priceFooter";

class PriceList extends React.Component {
  render() {
    return (
      <section className="section">
        <Container fluid>
          <Row className="title is-1">
            <Stack direction="horizontal">
              <div>Unit Price View</div>
              <div className="ms-auto"><CompSelect/></div>
            </Stack>
          </Row>
          <Row><PriceTable></PriceTable></Row>
        </Container>
        <PriceFooter></PriceFooter>
      </section>
    );
  }
}

export default PriceList;
