import React from "react";
import { connect } from "react-redux";
import { updateCompanyList } from "Redux/components/companyManager/companyManagerSlice";
import { updateProductList } from "Redux/components/productManager/productManagerSlice";
import { updatePriceList } from "Redux/components/priceManager/priceManagerSlice";

class Welcome extends React.Component {
  componentDidMount() {
    let companylist = myAPI.listCompany().map(function(obj){
      obj.DIRTY = false;
      return obj;
    });
    this.props.updateCompanyList(companylist);

    let productlist = myAPI.listProduct().map(function(obj){
      obj.DIRTY = false;
      return obj;
    });
    this.props.updateProductList(productlist);

    let pricelist = myAPI.listPrice().map(function(obj){
      obj.DIRTY = false;
      return obj;
    });
    this.props.updatePriceList(pricelist);
  }

  render() {
    return (
      <React.Fragment>
        <section className="section">
          <div className="container">
            <section className="hero is-info">
              <div className="hero-body">
                <p className="title">
                  Thank you for trying out the secure-electron-template!
                </p>
                <p className="subtitle">
                  Please navigate to view the features of this template.
                </p>
              </div>
            </section>
          </div>
        </section>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state, props) => ({
  companyManager: state.companyManager,
  productManager: state.productManager,
  priceManager: state.priceManager,
});
const mapDispatch = { updateCompanyList, updateProductList, updatePriceList };

export default connect(mapStateToProps, mapDispatch)(Welcome);

