import React from "react";
import ROUTES from "Constants/routes";
import { connect } from "react-redux";
import { changeSelectedFormID } from "Redux/components/home/homeSlice";

class FormList extends React.Component {
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
    let content = [];
    let formList = myAPI.listForm();
    for(let i=0; i<=formList.length-1; i++) {
      content.push(<tr key={formList[i].ID}>
        <th scope="row">{formList[i].ID}</th>
        <td>{formList[i].NAME}</td>
        <td>
        <button type="button" className="btn btn-primary btn-sm"
          onClick={() => {
            this.props.changeSelectedFormID(formList[i].ID);
            this.navigate(ROUTES.RECORDLIST);
          }}>
          OpenIt!
        </button></td>
        </tr>)
    }

    return (
      <section className="section">
          <div className="container">
              <h1 className="title is-1">Form View</h1>
          </div>
          <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Form Name</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
          {content}
          </tbody>
          </table>
      </section>
    );
  }
}

const mapStateToProps = (state, props) => ({
  home: state.home,
});
const mapDispatch = { changeSelectedFormID };

export default connect(mapStateToProps, mapDispatch)(FormList);
