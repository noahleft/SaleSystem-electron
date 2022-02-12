import React from "react";
import { connect } from "react-redux";
import { Table } from "react-bootstrap";
import { changeCandidateProdListIdx } from "Redux/components/productManager/productManagerSlice";
import { withTranslation } from "react-i18next";
import "./tablesize.css";

function HighlightText(props) {
  if(props.highlight)
    return <span className="text-danger">{props.name}</span>;
  else
    return <span>{props.name}</span>;
}

class ProductTable extends React.Component {
  componentWillUnmount() {
    // Clear any existing bindings;
    // important on mac-os if the app is suspended
    // and resumed. Existing subscriptions must be cleared
    window.api.contextMenu.clearRendererBindings();
  }

  genRow(idx, obj) {
    return (<tr key={idx} onClick={()=>{
      this.props.changeCandidateProdListIdx(idx);
      }}>
    <th scope="row">{obj.ID}</th>
    <td><HighlightText name={obj.NAME} highlight={obj.DIRTY}></HighlightText></td>
    </tr>
    );
  }

  render() {
    const { t } = this.props;
    let content = [];
    let productList = this.props.productManager.productList;
    for(let i=0; i<=productList.length-1; i++) {
      content.push(this.genRow(i, productList[i]));
    }

    return (
    <div className="scrollTable">
    <Table striped bordered hover size="sm">
    <thead>
      <tr>
        <th scope="col" className="thID">#</th>
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
  productManager: state.productManager
});
const mapDispatch = { changeCandidateProdListIdx };

export default connect(mapStateToProps, mapDispatch)(withTranslation()(ProductTable));