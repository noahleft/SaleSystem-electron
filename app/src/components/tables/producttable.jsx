import React from "react";
import { connect } from "react-redux";
import { Table } from "react-bootstrap";

class ProductTable extends React.Component {
  componentWillUnmount() {
    // Clear any existing bindings;
    // important on mac-os if the app is suspended
    // and resumed. Existing subscriptions must be cleared
    window.api.contextMenu.clearRendererBindings();
  }

  render() {
    let content = [];
    let productList = myAPI.listProduct();
    for(let i=0; i<=productList.length-1; i++) {
      content.push(<tr key={productList[i].ID}>
        <th scope="row">{productList[i].ID}</th>
        <td>{productList[i].NAME}</td>
        </tr>)
    }

    return (
    <div className="scrollTable">
    <Table striped bordered hover size="sm">
    <thead>
      <tr>
        <th scope="col" width="80px">#</th>
        <th scope="col">Product Name</th>
      </tr>
    </thead>
    <tbody>
    {content}
    </tbody>
    </Table></div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  home: state.home
});
const mapDispatch = { };

export default connect(mapStateToProps, mapDispatch)(ProductTable);