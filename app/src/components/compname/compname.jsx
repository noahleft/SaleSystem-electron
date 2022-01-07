import React from "react";
import { connect } from "react-redux";

class CompName extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let companyNameList = myAPI.listCompany().map(function(d){return d.NAME;});
    let selectList = ["Company", ...companyNameList];
    return (
      <a>{selectList[this.props.home.selectedCompID]}</a>
    );
  }
}

const mapStateToProps = (state, props) => ({
  home: state.home
});
const mapDispatch = { };

export default connect(mapStateToProps, mapDispatch)(CompName);
