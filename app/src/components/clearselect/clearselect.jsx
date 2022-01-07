import React from "react";
import { connect } from "react-redux";
import { Button } from "react-bootstrap";
import { changeSelectedCompID , changeSelectedProdID } from "Redux/components/home/homeSlice";

class ClearSelect extends React.Component {
  constructor(props) {
    super(props);
  }
  componentWillUnmount() {
    // Clear any existing bindings;
    // important on mac-os if the app is suspended
    // and resumed. Existing subscriptions must be cleared
    window.api.contextMenu.clearRendererBindings();
  }

  render() {
    return (
        <Button variant="link" onClick={()=> {
            this.props.changeSelectedCompID(0);
            this.props.changeSelectedProdID(0);
        }}>Reset</Button>
    );
  }
}

const mapStateToProps = (state, props) => ({
  home: state.home
});
const mapDispatch = { changeSelectedCompID , changeSelectedProdID };

export default connect(mapStateToProps, mapDispatch)(ClearSelect);