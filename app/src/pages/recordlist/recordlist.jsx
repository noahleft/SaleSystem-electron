import React from "react";
import { connect } from "react-redux";
import RecordTable from "Components/recordtable/recordtable";

class RecordList extends React.Component {
  render() {
    return (
      <section className="section">
          <div className="container">
              <h1 id="title" className="title is-1">{this.props.home.message}</h1>
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