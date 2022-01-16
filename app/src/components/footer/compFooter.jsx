import React from "react";
import { connect } from "react-redux";
import { Container, Navbar, NavbarBrand } from "react-bootstrap";
import CompSave from "Components/savebutton/compSave";

class CompFooter extends React.Component {
  render() {
    let enableSave = this.props.companyManager.changeRequests.length != 0;
    return(
      <Navbar fixed="bottom" bg="dark">
        <Container>
          <NavbarBrand className="ml-auto">
            <CompSave enable={enableSave}></CompSave>
          </NavbarBrand>
        </Container>
      </Navbar>
    )
  }
}

const mapStateToProps = (state, props) => ({
    companyManager: state.companyManager
});
const mapDispatch = { };

export default connect(mapStateToProps, mapDispatch)(CompFooter);
