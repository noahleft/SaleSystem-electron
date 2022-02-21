import React from "react";
import { Container, Row, Stack } from "react-bootstrap";
import CompInfo from "Components/selection/compInfo";
import CompanyTable from "Components/tables/companytable";
import CompFooter from "Components/footer/compFooter";
import ShowCompanyCheck from "Components/checkbox/showCompCheck";
import { withTranslation } from "react-i18next";

class CompanyList extends React.Component {
  render() {
    const { t } = this.props;
    return (
      <section className="section">
          <Container fluid>
            <Row>
              <Stack direction="horizontal">
                <div className="is-1 title">{t("CompanyTitle")}</div>
                <div className="ms-auto"><ShowCompanyCheck/></div>
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
