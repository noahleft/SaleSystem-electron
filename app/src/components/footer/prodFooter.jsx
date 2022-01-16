import React from "react";
import { connect } from "react-redux";
import { Container, Navbar, NavbarBrand } from "react-bootstrap";
import ProdSave from "Components/savebutton/prodSave";

class ProdFooter extends React.Component {
  render() {
    let enableSave = this.props.productManager.changeRequests.length != 0;
    return(
      <Navbar fixed="bottom" bg="dark">
        <Container>
          <NavbarBrand className="ml-auto">
            <ProdSave enable={enableSave}></ProdSave>
          </NavbarBrand>
        </Container>
      </Navbar>
    )
  }
}

const mapStateToProps = (state, props) => ({
    productManager: state.productManager
});
const mapDispatch = { };

export default connect(mapStateToProps, mapDispatch)(ProdFooter);
