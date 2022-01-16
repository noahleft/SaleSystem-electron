import React from "react";
import { connect } from "react-redux";
import { Container, Navbar, NavbarBrand } from "react-bootstrap";
import RecordSave from "Components/savebutton/recordSave";

class RecordFooter extends React.Component {
  render() {
    let enableSave = this.props.recordManager.changeRequests.length != 0;
    return(
      <Navbar fixed="bottom" bg="dark">
        <Container>
          <NavbarBrand className="ml-auto">
            <RecordSave enable={enableSave}></RecordSave>
          </NavbarBrand>
        </Container>
      </Navbar>
    )
  }
}

const mapStateToProps = (state, props) => ({
    recordManager: state.recordManager
});
const mapDispatch = { };

export default connect(mapStateToProps, mapDispatch)(RecordFooter);
