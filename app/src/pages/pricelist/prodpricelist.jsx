import React from "react";
import { Container, Row, Stack } from "react-bootstrap";
import ProdSelect from "Components/dropdowns/prodselect";
import ProdPriceTable from "Components/tables/prodpricetable";
import PriceFooter from "Components/footer/priceFooter";
import ShowPriceCheck from "Components/checkbox/showPriceCheck";
import { withTranslation } from "react-i18next";
import "./print.css";

class ProdPriceList extends React.Component {
  render() {
    const { t } = this.props;
    return (
      <section className="section">
        <Container fluid>
          <div className="section-to-print">
          <Row>
            <Stack direction="horizontal" gap={3}>
              <div className="is-1 title">{t("PriceTitle")}</div>
              <div className="is-1 ms-auto"><ProdSelect/></div>
              <div><ShowPriceCheck/></div>
            </Stack>
          </Row>
          <Row><ProdPriceTable></ProdPriceTable></Row>
          </div>
        </Container>
        <PriceFooter></PriceFooter>
      </section>
    );
  }
}

export default withTranslation()(ProdPriceList);
