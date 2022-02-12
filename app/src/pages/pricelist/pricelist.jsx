import React from "react";
import { Container, Row, Stack } from "react-bootstrap";
import CompSelect from "Components/dropdowns/compselect";
import PriceTable from "Components/tables/pricetable";
import PriceFooter from "Components/footer/priceFooter";
import ShowProductCheck from "Components/checkbox/showProdCheck";
import { withTranslation } from "react-i18next";

class PriceList extends React.Component {
  render() {
    const { t } = this.props;
    return (
      <section className="section">
        <Container fluid>
          <Row>
            <Stack direction="horizontal" gap={3}>
              <div className="is-1 title">{t("PriceTitle")}</div>
              <div className="ms-auto"><CompSelect/></div>
              <div><ShowProductCheck/></div>
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
