import React from "react";
import { connect } from "react-redux";

class CompName extends React.Component {
  render() {
    let companyNameList = this.props.companyManager.companyList.map(function(d){return d.NAME;});
    let selectList = ["Select", ...companyNameList];
    return (
      <a>{selectList[this.props.priceManager.selectedCompID]}</a>
    );
  }
}

const mapStateToProps = (state, props) => ({
  companyManager: state.companyManager,
  priceManager: state.priceManager
});
const mapDispatch = { };

export default connect(mapStateToProps, mapDispatch)(CompName);
