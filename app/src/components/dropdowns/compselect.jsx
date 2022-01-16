import React from "react";
import { connect } from "react-redux";
import { Dropdown, DropdownButton } from "react-bootstrap";
import { changeSelectedCompID } from "Redux/components/priceManager/priceManagerSlice";

class CompSelect extends React.Component {
  componentWillUnmount() {
    // Clear any existing bindings;
    // important on mac-os if the app is suspended
    // and resumed. Existing subscriptions must be cleared
    window.api.contextMenu.clearRendererBindings();
  }

  render() {
    let content = [<Dropdown.Item key='0' onClick={()=>{this.props.changeSelectedCompID(0);}}>Select</Dropdown.Item>];
    const companyList = this.props.companyManager.companyList;
    let title = "Select";
    for(let i=0; i<=companyList.length-1; i++) {
      content.push(
        <Dropdown.Item key={companyList[i].ID} onClick={()=>{
          this.props.changeSelectedCompID(companyList[i].ID);
        }}>
        {companyList[i].NAME}
        </Dropdown.Item>)
      
      if(companyList[i].ID == this.props.priceManager.selectedCompID) {
        title = companyList[i].NAME;
      }
    }
    return (
        <DropdownButton title={title} disabled={this.props.priceManager.changeRequests.length!=0}>
        {content}
        </DropdownButton>
    );
  }
}

const mapStateToProps = (state, props) => ({
  priceManager: state.priceManager,
  companyManager: state.companyManager,
});
const mapDispatch = { changeSelectedCompID };

export default connect(mapStateToProps, mapDispatch)(CompSelect);
