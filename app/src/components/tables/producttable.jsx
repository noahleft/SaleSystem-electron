import React from "react";
import { connect } from "react-redux";
import { Table, Form } from "react-bootstrap";
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

  getTypeString(type) {
    if(type == 0) {
      if (this.props.home.config.quantity_unit != "")
        return this.props.home.config.quantity_unit;
    }
    if(type == 1) {
      if (this.props.home.config.quantity_unit_1 != "")
        return this.props.home.config.quantity_unit_1;
    }
    if(type == 2) {
      if (this.props.home.config.quantity_unit_2 != "")
        return this.props.home.config.quantity_unit_2;
    }
    if(type == 3) {
      if (this.props.home.config.quantity_unit_3 != "")
        return this.props.home.config.quantity_unit_3;
    }
    if(type == 4) {
      if (this.props.home.config.quantity_unit_4 != "")
        return this.props.home.config.quantity_unit_4;
    }
    if(type == 5) {
      if (this.props.home.config.quantity_unit_5 != "")
        return this.props.home.config.quantity_unit_5;
    }
    return type;
  }

  genRow(idx, obj) {
    return (<tr key={idx} onClick={()=>{
      this.props.changeCandidateProdListIdx(idx);
      }} hidden={this.props.productManager.showAllProduct?false:obj.HIDE}>
    <th scope="row">{obj.ID}</th>
    <td><HighlightText name={obj.NAME} highlight={obj.DIRTY}></HighlightText></td>
    <td><HighlightText name={obj.GROUP_ID} highlight={obj.DIRTY}></HighlightText></td>
    <td><HighlightText name={this.getTypeString(obj.TYPE)} highlight={obj.DIRTY}></HighlightText></td>
    <td><Form.Check type="checkbox" aria-label="Hide" checked={obj.HIDE} disabled/></td>
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
    <Table bordered hover size="sm">
    <thead>
      <tr>
        <th scope="col" className="thID">#</th>
        <th scope="col">{t("Name")}</th>
        <th scope="col">{t("GroupID")}</th>
        <th scope="col">{t("Type")}</th>
        <th scope="col" width="80px">{t("Hide")}</th>
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
  productManager: state.productManager,
  home: state.home
});
const mapDispatch = { changeCandidateProdListIdx };

export default connect(mapStateToProps, mapDispatch)(withTranslation()(ProductTable));