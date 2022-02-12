import React from "react";
import { connect } from "react-redux";
import { NavDropdown } from "react-bootstrap";
import { changeSelectedCompID } from "Redux/components/exportManager/exportManagerSlice";
import { changeNeedTax } from "Redux/components/exportManager/exportManagerSlice";
import { withTranslation } from "react-i18next";

class ExportSelect extends React.Component {
  componentWillUnmount() {
    // Clear any existing bindings;
    // important on mac-os if the app is suspended
    // and resumed. Existing subscriptions must be cleared
    window.api.contextMenu.clearRendererBindings();
  }

  extractCompIDSet() {
    const compIdSet = new Set(this.props.exportManager.exportList.map(p => p.COMP_ID));
    function isInCompIdSet(compIdSet) {
      return function(obj) {
        if(compIdSet.has(obj.ID)) return true;
        return false; 
      }
    }
    const reducedCompanyList = this.props.companyManager.companyList.filter(isInCompIdSet(compIdSet));
    return reducedCompanyList;
  }

  render() {
    const { t } = this.props;
    let title = t("AllCompany");
    let content = [<NavDropdown.Item key='0' onClick={()=>{
      this.props.changeSelectedCompID(0);
      this.props.changeNeedTax(false);}
    }>{title}</NavDropdown.Item>];
    const companyList = this.extractCompIDSet();
    for(let i=0; i<=companyList.length-1; i++) {
      content.push(
        <NavDropdown.Item key={companyList[i].ID} onClick={()=>{
          this.props.changeSelectedCompID(companyList[i].ID);
          this.props.changeNeedTax(companyList[i].PRINTTAX);
        }}>
        {companyList[i].NAME}
        </NavDropdown.Item>)
      
      if(companyList[i].ID == this.props.exportManager.selectedCompID) {
        title = companyList[i].NAME;
      }
    }
    return (
        <NavDropdown title={title}>
        {content}
        </NavDropdown>
    );
  }
}

const mapStateToProps = (state, props) => ({
  exportManager: state.exportManager,
  companyManager: state.companyManager,
});
const mapDispatch = { changeSelectedCompID, changeNeedTax };

export default connect(mapStateToProps, mapDispatch)(withTranslation()(ExportSelect));
