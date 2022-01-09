import React from "react";
import { connect } from "react-redux";
import { Dropdown } from "react-bootstrap";
import CompName from "Components/name/compname/compname";
import { changeSelectedCompID } from "Redux/components/home/homeSlice";

class CompSelect extends React.Component {
  constructor(props) {
    super(props);
  }
  componentWillUnmount() {
    // Clear any existing bindings;
    // important on mac-os if the app is suspended
    // and resumed. Existing subscriptions must be cleared
    window.api.contextMenu.clearRendererBindings();
  }

  render() {
    let content = [<Dropdown.Item key='0' eventKey='0'>All</Dropdown.Item>];
    let companyList = myAPI.listCompany();
    for(let i=0; i<=companyList.length-1; i++) {
      content.push(
        <Dropdown.Item key={companyList[i].ID} eventKey={companyList[i].ID}>
        {companyList[i].NAME}
        </Dropdown.Item>)
    }
    return (
        <Dropdown onSelect={(evt) => {
            this.props.changeSelectedCompID(evt);}}>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            <CompName></CompName>
          </Dropdown.Toggle>
          <Dropdown.Menu>
          {content}
          </Dropdown.Menu>
        </Dropdown>
    );
  }
}

const mapStateToProps = (state, props) => ({
  home: state.home
});
const mapDispatch = { changeSelectedCompID };

export default connect(mapStateToProps, mapDispatch)(CompSelect);
