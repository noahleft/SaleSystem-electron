import React from "react";
import { connect } from "react-redux";
import { Container, Navbar, NavbarBrand } from "react-bootstrap";
import FormSave from "Components/savebutton/formSave";

class FormFooter extends React.Component {
  render() {
    let enableSave = this.props.formManager.requireSaving;
    return(
      <Navbar fixed="bottom" bg="dark">
        <Container>
          <NavbarBrand className="ml-auto">
            <FormSave enable={enableSave}></FormSave>
          </NavbarBrand>
        </Container>
      </Navbar>
    )
  }
}

const mapStateToProps = (state, props) => ({
    formManager: state.formManager
});
const mapDispatch = { };

export default connect(mapStateToProps, mapDispatch)(FormFooter);
