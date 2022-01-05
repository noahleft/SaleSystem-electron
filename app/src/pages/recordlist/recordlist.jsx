import React from "react";
import { connect } from "react-redux";
import RecordTable from "Components/recordtable/recordtable";

class RecordList extends React.Component {

  render() {
    let message = myAPI.getForm(this.props.home.selectedFormID).NAME;
    return (
      <section className="section">
          <div className="container">
              <h1 id="title" className="title is-1">{message}</h1>
          </div>
          <RecordTable></RecordTable>
      </section>
    );
  }
}

const mapStateToProps = (state, props) => ({
  home: state.home
});
const mapDispatch = { };

export default connect(mapStateToProps, mapDispatch)(RecordList);