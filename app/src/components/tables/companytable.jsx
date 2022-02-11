import React from "react";
import { connect } from "react-redux";
import { Table } from "react-bootstrap";
import { changeCandidateCompListIdx } from "Redux/components/companyManager/companyManagerSlice";
import { withTranslation } from "react-i18next";

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

  genRow(idx, obj) {
    return (<tr key={idx} onClick={()=>{
      this.props.changeCandidateCompListIdx(idx);
      }}>
    <th scope="row">{obj.ID}</th>
    <td><HighlightText name={obj.NAME} highlight={obj.DIRTY}></HighlightText></td>
    </tr>
    );
  }

  render() {
    const { t } = this.props;
    let content = [];
    let companyList = this.props.companyManager.companyList;
    for(let i=0; i<=companyList.length-1; i++) {
      content.push(this.genRow(i, companyList[i]));
    }

    return (
    <div className="scrollTable">
    <Table striped bordered hover size="sm">
    <thead>
      <tr>
        <th scope="col" width="80px">#</th>
        <th scope="col">{t("Name")}</th>
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