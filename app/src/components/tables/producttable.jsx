import React from "react";
import { connect } from "react-redux";
import { Table } from "react-bootstrap";
import { changeCandidateProdID } from "Redux/components/productManager/productManagerSlice";
import { withTranslation } from "react-i18next";

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

  genRow(obj) {
    return (<tr key={obj.ID} onClick={()=>{
      this.props.changeCandidateProdID(obj.ID);
      }}>
    <th scope="row">{obj.ID}</th>
    <td><HighlightText name={obj.NAME} highlight={obj.DIRTY}></HighlightText></td>
    </tr>
    );
  }

  genLastRow(productList) {
    var obj = {};
    if(productList.length == 0) {
      obj.ID= 1 ;
      obj.NAME = "";
      obj.DIRTY = false;
    }
    else {
      let lastItem = productList.slice(-1)[0];
      obj.ID= lastItem.ID+1 ;
      obj.NAME = "";
      obj.DIRTY = false;
    }
    return this.genRow(obj);
  }

  render() {
    const { t } = this.props;
    let content = [];
    let productList = this.props.productManager.productList;
    for(let i=0; i<=productList.length-1; i++) {
      content.push(this.genRow(productList[i]));
    }
    content.push(this.genLastRow(productList));

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
  productManager: state.productManager
});
const mapDispatch = { changeCandidateProdID };

export default connect(mapStateToProps, mapDispatch)(withTranslation()(ProductTable));