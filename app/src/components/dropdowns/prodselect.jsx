import React from "react";
import { connect } from "react-redux";
import { Dropdown } from "react-bootstrap";
import ProdName from "Components/name/prodname";
import { changeSelectedProdID } from "Redux/components/home/homeSlice";

class ProdSelect extends React.Component {
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
    let content = [<Dropdown.Item key='0' eventKey='0'>All</Dropdown.Item>];
    let productList = myAPI.listProduct();
    for(let i=0; i<=productList.length-1; i++) {
      content.push(
        <Dropdown.Item key={productList[i].ID} eventKey={productList[i].ID}>
        {productList[i].NAME}
        </Dropdown.Item>)
    }
    return (
        <Dropdown onSelect={(evt) => {
            this.props.changeSelectedProdID(evt);}}>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            <ProdName></ProdName>
          </Dropdown.Toggle>
          <Dropdown.Menu>
          {content}
          </Dropdown.Menu>
        </Dropdown>
    );
  }
}

const mapStateToProps = (state, props) => ({
  home: state.home
});
const mapDispatch = { changeSelectedProdID };

export default connect(mapStateToProps, mapDispatch)(ProdSelect);