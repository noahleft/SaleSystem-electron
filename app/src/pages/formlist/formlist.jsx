import React from "react";
import { Container, Row, Stack } from "react-bootstrap";
import FormInfo from "Components/selection/formInfo";
import FormTable from "Components/tables/formtable";
import FormFooter from "Components/footer/formFooter";
import { withTranslation } from "react-i18next";

class FormList extends React.Component {
  constructor(props) {
    super(props);
    this.history = props.history;
  }

  navigate(url) {
    this.setState(
      {
        mobileMenuActive: false,
      },
      function () {
        this.history.push(url);
      }
    );
  }

  render() {
    const { t } = this.props;
    return (
      <section className="section">
          <Container fluid>
            <Row className="title is-1">
              <Stack direction="horizontal">
                <div>{t("FormTitle")}</div>
              </Stack>
            </Row>
            <Row><FormTable onNavigate={(url) => {this.navigate(url)}}></FormTable></Row>
          </Container>
          <FormInfo></FormInfo>
          <FormFooter></FormFooter>
      </section>
    );
  }
}

export default withTranslation()(FormList);
