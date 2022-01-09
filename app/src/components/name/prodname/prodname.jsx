import React from "react";
import { connect } from "react-redux";

class ProdName extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let productNameList = myAPI.listProduct().map(function(d){return d.NAME;});
    let selectList = ["Product", ...productNameList];
    return (
      <a>{selectList[this.props.home.selectedProdID]}</a>
    );
  }
}

const mapStateToProps = (state, props) => ({
  home: state.home
});
const mapDispatch = { };

export default connect(mapStateToProps, mapDispatch)(ProdName);
