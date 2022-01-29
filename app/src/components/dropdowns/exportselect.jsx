import React from "react";
import { connect } from "react-redux";
import { Dropdown, DropdownButton } from "react-bootstrap";
import { changeSelectedCompID } from "Redux/components/exportManager/exportManagerSlice";

class ExportSelect extends React.Component {
  componentWillUnmount() {
    // Clear any existing bindings;
    // important on mac-os if the app is suspended
    // and resumed. Existing subscriptions must be cleared
    window.api.contextMenu.clearRendererBindings();
  }

  render() {
    let content = [<Dropdown.Item key='0' onClick={()=>{this.props.changeSelectedCompID(0);}}>All</Dropdown.Item>];
    const companyList = this.props.companyManager.companyList;
    let title = "All";
    for(let i=0; i<=companyList.length-1; i++) {
      content.push(
        <Dropdown.Item key={companyList[i].ID} onClick={()=>{
          this.props.changeSelectedCompID(companyList[i].ID);
        }}>
        {companyList[i].NAME}
        </Dropdown.Item>)
      
      if(companyList[i].ID == this.props.exportManager.selectedCompID) {
        title = companyList[i].NAME;
      }
    }
    return (
        <DropdownButton title={title}>
        {content}
        </DropdownButton>
    );
  }
}

const mapStateToProps = (state, props) => ({
  exportManager: state.exportManager,
  companyManager: state.companyManager,
});
const mapDispatch = { changeSelectedCompID };

export default connect(mapStateToProps, mapDispatch)(ExportSelect);
