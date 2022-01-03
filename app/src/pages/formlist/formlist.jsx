import React from "react";
import ROUTES from "Constants/routes";
import "bootstrap/dist/css/bootstrap.min.css";
import { writeConfigRequest } from "secure-electron-store";
import { connect } from "react-redux";
import { changeMessage, changeSelectedFormID } from "Redux/components/home/homeSlice";

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
        <a
          onClick={() => {
            this.props.changeMessage(formList[i].NAME);
            this.props.changeSelectedFormID(formList[i].ID);
            this.navigate(ROUTES.RECORDLIST);
          }}>
          OpenIt!
        </a></td>
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
const mapDispatch = { changeMessage, changeSelectedFormID };

export default connect(mapStateToProps, mapDispatch)(FormList);
