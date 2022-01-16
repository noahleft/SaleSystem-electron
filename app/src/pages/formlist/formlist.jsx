import React from "react";
import { Container, Row } from "react-bootstrap";
import FormInfo from "Components/selection/formInfo";
import FormTable from "Components/tables/formtable";
import FormFooter from "Components/footer/formFooter";

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
    return (
      <section className="section">
          <Container fluid>
            <Row className="title is-1">Form View</Row>
            <Row><FormTable onNavigate={(url) => {this.navigate(url)}}></FormTable></Row>
          </Container>
          <FormInfo></FormInfo>
          <FormFooter></FormFooter>
      </section>
    );
  }
}

export default FormList;
