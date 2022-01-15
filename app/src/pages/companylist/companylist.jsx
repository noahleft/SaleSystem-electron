import React from "react";
import { connect } from "react-redux";
import { Container, Row } from "react-bootstrap";
import CompInfo from "Components/selection/compInfo";
import CompanyTable from "Components/tables/companytable";
import Footer from "Components/footer/footer";
import { updateCompanyList } from "Redux/components/companyManager/companyManagerSlice";

class CompanyList extends React.Component {

  componentDidMount() {
    let companylist = myAPI.listCompany();
    this.props.updateCompanyList(companylist);
  }

  render() {
    return (
      <section className="section">
          <Container fluid>
            <Row className="title is-1">Company View</Row>
            <Row><CompanyTable></CompanyTable></Row>
          </Container><hr />
          <CompInfo></CompInfo>
          <Footer></Footer>
      </section>
    );
  }
}

const mapStateToProps = (state, props) => ({
  companyManager: state.companyManager
});
const mapDispatch = { updateCompanyList };

export default connect(mapStateToProps, mapDispatch)(CompanyList);
