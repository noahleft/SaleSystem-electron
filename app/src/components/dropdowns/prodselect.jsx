import React from "react";
import { connect } from "react-redux";
import { Dropdown, DropdownButton } from "react-bootstrap";
import { changeSelectedProdID } from "Redux/components/priceManager/priceManagerSlice";
import { withTranslation } from "react-i18next";

class ProdSelect extends React.Component {
  componentWillUnmount() {
    // Clear any existing bindings;
    // important on mac-os if the app is suspended
    // and resumed. Existing subscriptions must be cleared
    window.api.contextMenu.clearRendererBindings();
  }

  render() {
    const { t } = this.props;
    let title = t("SelectProduct");
    let content = [<Dropdown.Item key='0' onClick={()=>{this.props.changeSelectedProdID(0);}} disabled>{title}</Dropdown.Item>];
    const productList = this.props.productManager.productList;
    for(let i=0; i<=productList.length-1; i++) {
      content.push(
        <Dropdown.Item key={productList[i].ID} onClick={()=>{
          this.props.changeSelectedProdID(productList[i].ID);
        }}>
        {productList[i].NAME}
        </Dropdown.Item>)
      
      if(productList[i].ID == this.props.priceManager.selectedProdID) {
        title = productList[i].NAME;
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
  productManager: state.productManager,
});
const mapDispatch = { changeSelectedProdID };

export default connect(mapStateToProps, mapDispatch)(withTranslation()(ProdSelect));
