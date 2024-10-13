import React from "react";
import { connect } from "react-redux";
import { updateCompanyList, setDBMigrationNeeded } from "Redux/components/companyManager/companyManagerSlice";
import { updateProductList } from "Redux/components/productManager/productManagerSlice";
import { updatePriceList } from "Redux/components/priceManager/priceManagerSlice";
import { updateFormList } from "Redux/components/formManager/formManagerSlice";
import { withTranslation } from "react-i18next";
import { readConfigRequest, readConfigResponse, writeConfigRequest } from "secure-electron-store";
import { loadConfig } from "Redux/components/home/homeSlice";
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

    this.readConfig();

    this.user_db_version = myAPI.getDBUserVersion();
    if (this.user_db_version < this.props.home.config.required_user_db_version) {
      this.props.setDBMigrationNeeded();
    }
  }

  readConfig() {
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
    window.api.store.onReceive(readConfigResponse, loadSettings(this.props.loadConfig));

    // Read from file as soon as this component is rendered
    window.api.store.send(readConfigRequest, "config");
  }

  writeConfig(config) {
    window.api.store.send(writeConfigRequest, "config", config);  
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
                  {t("WelcomeTitle")} {this.props.home.config.company_title}
                </p>
                <p className="subtitle">
                  Contact noahleft@gmail.com
                </p>
                <p className="body">
                  User DB Version: {this.user_db_version}
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
                <SettingTable writeFunc={this.writeConfig}/>
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
const mapDispatch = { updateCompanyList, updateProductList, updatePriceList, updateFormList, loadConfig, setDBMigrationNeeded };

export default connect(mapStateToProps, mapDispatch)(withTranslation()(Welcome));

