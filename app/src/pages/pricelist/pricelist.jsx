import React from "react";
import { Container, Row, Stack } from "react-bootstrap";
import CompSelect from "Components/dropdowns/compselect";
import PriceTable from "Components/tables/pricetable";
import PriceFooter from "Components/footer/priceFooter";
import { withTranslation } from "react-i18next";

class PriceList extends React.Component {
  render() {
    const { t } = this.props;
    return (
      <section className="section">
        <Container fluid>
          <Row className="title is-1">
            <Stack direction="horizontal">
              <div>{t("PriceTitle")}</div>
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

export default withTranslation()(PriceList);
