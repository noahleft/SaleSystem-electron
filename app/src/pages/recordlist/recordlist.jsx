import React from "react";
import ROUTES from "Constants/routes";
import { connect } from "react-redux";
import RecordTable from "Components/recordtable/recordtable";

class RecordList extends React.Component {
  constructor(props) {
    super(props);
    this.history = props.history;
  }

  navigate(url) {
    this.setState(
      {
        mobileMenuActive: false,
      },
      function () {
        this.history.push(url);
      }
    );
  }
  
  render() {
    let message = myAPI.getForm(this.props.home.selectedFormID).NAME;
    return (
      <section className="section">
          <div className="container">
              <h1 id="title" className="title is-1">{message}
                <button type="button" className="btn btn-primary btn-sm"
                  onClick={() => {
                    this.navigate(ROUTES.RECORDEXPORT);
                  }}>
                  Export
                </button>
              </h1>
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