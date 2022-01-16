import React from "react";
import { connect } from "react-redux";
import { Container, Navbar, NavbarBrand } from "react-bootstrap";
import PriceSave from "Components/savebutton/priceSave";

class PriceFooter extends React.Component {
  render() {
    let enableSave = this.props.priceManager.changeRequests.length != 0;
    return(
      <Navbar fixed="bottom" bg="dark">
        <Container>
          <NavbarBrand className="ml-auto">
            <PriceSave enable={enableSave}></PriceSave>
          </NavbarBrand>
        </Container>
      </Navbar>
    )
  }
}

const mapStateToProps = (state, props) => ({
    priceManager: state.priceManager
});
const mapDispatch = { };

export default connect(mapStateToProps, mapDispatch)(PriceFooter);
