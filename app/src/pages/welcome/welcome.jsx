import React from "react";
import { connect } from "react-redux";
import { updateCompanyList } from "Redux/components/companyManager/companyManagerSlice";
import { updateProductList } from "Redux/components/productManager/productManagerSlice";
import { updatePriceList } from "Redux/components/priceManager/priceManagerSlice";
import { updateFormList } from "Redux/components/formManager/formManagerSlice";
import { withTranslation } from "react-i18next";
import { readConfigRequest, readConfigResponse } from "secure-electron-store";
import { updateQuantityUnit } from "Redux/components/home/homeSlice";
import SettingTable from "Components/tables/settingtable";
import UtilCard from "Components/shortcut/utilCard";

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

    let formlist = myAPI.listForm().map(function(obj){
      obj.DIRTY = false;
      return obj;
    });
    this.props.updateFormList(formlist);

    function loadSettings(func) {
      return function(args) {
        if (args.success) {
          if (args.value) {
            func(args.value);
          }
        }
      }
    }
    // Clears all listeners
    window.api.store.clearRendererBindings();
    window.api.store.onReceive(readConfigResponse, loadSettings(this.props.updateQuantityUnit));

    // Read from file as soon as this component is rendered
    window.api.store.send(readConfigRequest, "quantity_unit");
  }

  render() {
    const { t } = this.props;
    return (
      <React.Fragment>
        <section className="section">
          <div className="container">
            <section className="hero is-info">
              <div className="hero-body">
                <p className="title">
                  {t("WelcomeTitle")}
                </p>
                <p className="subtitle">
                  Contact noahleft@gmail.com
                </p>
              </div>
            </section>
            <hr/>
            <section className="hero">
              <div className="hero-body">
                <p className="subtitle">
                  {t("Utility")}
                </p>
                <UtilCard/>
              </div>
            </section>
            <hr/>
            <section className="hero">
              <div className="hero-body">
                <p className="subtitle">
                  {t("Settings")}
                </p>
                <SettingTable/>
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
  formManager: state.formManager,
  home: state.home,
});
const mapDispatch = { updateCompanyList, updateProductList, updatePriceList, updateFormList, updateQuantityUnit };

export default connect(mapStateToProps, mapDispatch)(withTranslation()(Welcome));

