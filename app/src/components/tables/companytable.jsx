import React from "react";
import { connect } from "react-redux";
import { Table, Form } from "react-bootstrap";
import { changeCandidateCompListIdx } from "Redux/components/companyManager/companyManagerSlice";
import { withTranslation } from "react-i18next";
import "./tablesize.css";

function HighlightText(props) {
  if(props.highlight)
    return <span className="text-danger">{props.name}</span>;
  else
    return <span>{props.name}</span>;
}

class CompanyTable extends React.Component {
  componentWillUnmount() {
    // Clear any existing bindings;
    // important on mac-os if the app is suspended
    // and resumed. Existing subscriptions must be cleared
    window.api.contextMenu.clearRendererBindings();
  }

  genRow(idx, obj, orig) {
    return (<tr key={idx} onClick={()=>{
      this.props.changeCandidateCompListIdx(idx);
      }}>
    <th scope="row"><HighlightText name={obj.ID} highlight={obj.DIRTY}/></th>
    <td><HighlightText name={obj.NAME} highlight={obj.NAME!=orig.NAME}/></td>
    <td><HighlightText name={obj.BUSINESSNUM} highlight={obj.BUSINESSNUM!=orig.BUSINESSNUM}/></td>
    <td><HighlightText name={obj.PHONE} highlight={obj.PHONE!=orig.PHONE}/></td>
    <td><HighlightText name={obj.CONTACT} highlight={obj.CONTACT!=orig.CONTACT}/></td>
    <td><Form.Check type="checkbox" aria-label="PrintTax" checked={obj.PRINTTAX!=0} disabled/></td>
    <td><HighlightText name={obj.NOTE} highlight={obj.NOTE!=orig.NOTE}/></td>
    </tr>
    );
  }

  render() {
    const { t } = this.props;
    let content = [];
    let companyList = this.props.companyManager.companyList;
    let originalList = this.props.companyManager.originalList;
    for(let i=0; i<=companyList.length-1; i++) {
      content.push(this.genRow(i, companyList[i], originalList[i]));
    }

    return (
    <div className="scrollTable">
    <Table bordered hover responsive size="sm">
    <thead>
      <tr>
        <th scope="col" className="thID">#</th>
        <th scope="col" className="thName">{t("Name")}</th>
        <th scope="col" className="thNum">{t("BusinessNum")}</th>
        <th scope="col" className="thNum">{t("Phone")}</th>
        <th scope="col" className="thNum">{t("Contact")}</th>
        <th scope="col" width="80px">{t("PrintTax")}</th>
        <th scope="col">{t("Note")}</th>
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
  companyManager: state.companyManager
});
const mapDispatch = { changeCandidateCompListIdx };

export default connect(mapStateToProps, mapDispatch)(withTranslation()(CompanyTable));