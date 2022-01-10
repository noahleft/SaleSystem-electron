import React from "react";
import { connect } from "react-redux";
import FormTable from "Components/tables/formtable";
import { Container, Row } from "react-bootstrap";

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
      </section>
    );
  }
}

const mapStateToProps = (state, props) => ({
  home: state.home,
});
const mapDispatch = { };

export default connect(mapStateToProps, mapDispatch)(FormList);
