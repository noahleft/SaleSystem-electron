import React from "react";
import ROUTES from "Constants/routes";
import { changeSelectedFormID } from "Redux/components/home/homeSlice";
import { connect } from "react-redux";
import { Table, Button } from "react-bootstrap";

class FormTable extends React.Component {

  componentWillUnmount() {
    // Clear any existing bindings;
    // important on mac-os if the app is suspended
    // and resumed. Existing subscriptions must be cleared
    window.api.contextMenu.clearRendererBindings();
  }

  render() {
    let content = [];
    let formList = myAPI.listForm();
    for(let i=0; i<=formList.length-1; i++) {
      content.push(<tr key={formList[i].ID}>
        <th scope="row">{formList[i].ID}</th>
        <td>{formList[i].NAME}</td>
        <td>
        <Button variant="primary" size="sm"
          onClick={() => {
            this.props.changeSelectedFormID(formList[i].ID);
            this.props.onNavigate(ROUTES.RECORDLIST);
          }}>
          OpenIt!
        </Button></td>
        </tr>)
    }

    return (
    <div className="scrollTable">
    <Table striped bordered hover size="sm">
    <thead>
      <tr>
        <th scope="col" width="80px">#</th>
        <th scope="col">Form Name</th>
        <th scope="col"></th>
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
const mapDispatch = { changeSelectedFormID };

export default connect(mapStateToProps, mapDispatch)(FormTable);