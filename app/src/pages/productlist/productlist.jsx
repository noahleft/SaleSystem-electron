import React from "react";
import { Container, Row, Stack } from "react-bootstrap";
import ProdInfo from "Components/selection/prodInfo";
import ProductTable from "Components/tables/producttable";
import ProdFooter from "Components/footer/prodFooter";
import ShowProdCheck from "Components/checkbox/showProdCheck";
import { withTranslation } from "react-i18next";

class ProductList extends React.Component {
  render() {
    const { t } = this.props;
    return (
      <section className="section">
        <Container fluid>
          <Row>
            <Stack direction="horizontal">
              <div className="title is-1">{t("ProductTitle")}</div>
              <div className="ms-auto"><ShowProdCheck/></div>
            </Stack>
          </Row>
          <Row><ProductTable></ProductTable></Row>
        </Container><hr />
        <ProdInfo></ProdInfo>
        <ProdFooter></ProdFooter>
      </section>
    );
  }
}

export default withTranslation()(ProductList);
