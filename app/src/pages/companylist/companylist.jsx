import React from "react";
import { Container, Row, Stack } from "react-bootstrap";
import CompInfo from "Components/selection/compInfo";
import CompanyTable from "Components/tables/companytable";
import CompFooter from "Components/footer/compFooter";
import { withTranslation } from "react-i18next";

class CompanyList extends React.Component {
  render() {
    const { t } = this.props;
    return (
      <section className="section">
          <Container fluid>
            <Row className="title is-1">
              <Stack direction="horizontal">
                <div>{t("CompanyTitle")}</div>
              </Stack>
            </Row>
            <Row><CompanyTable></CompanyTable></Row>
          </Container><hr />
          <CompInfo></CompInfo>
          <CompFooter></CompFooter>
      </section>
    );
  }
}


export default withTranslation()(CompanyList);
