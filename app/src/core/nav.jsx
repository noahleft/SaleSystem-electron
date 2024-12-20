import React from "react";
import { connect } from "react-redux";
import ROUTES from "Constants/routes";
import {
  validateLicenseRequest,
  validateLicenseResponse,
} from "secure-electron-license-keys";
import { withTranslation } from "react-i18next";

class Nav extends React.Component {
  constructor(props) {
    super(props);

    this.history = props.history;
    this.state = {
      mobileMenuActive: false,
      licenseModalActive: false,
      naviModalActive: false,
      naviModalActiveOnDBMigration: this.props.companyManager.requireDBMigration,

      // license-specific
      licenseValid: false,
      allowedMajorVersions: "",
      allowedMinorVersions: "",
      appVersion: "",
      licenseExpiry: "",
    };

    this.toggleMenu = this.toggleMenu.bind(this);
    this.toggleLicenseModal = this.toggleLicenseModal.bind(this);
    this.toggleNaviModal = this.toggleNaviModal.bind(this);
    this.toggleNaviModalOnDBMigration = this.toggleNaviModalOnDBMigration.bind(this);
    this.navigate = this.navigate.bind(this);
  }

  componentWillUnmount() {
    window.api.licenseKeys.clearRendererBindings();
  }

  componentDidMount() {
    // Set up binding to listen when the license key is
    // validated by the main process
    const _ = this;

    window.api.licenseKeys.onReceive(validateLicenseResponse, function (data) {
      // If the license key/data is valid
      if (data.success) {
        // Here you would compare data.appVersion to
        // data.major, data.minor and data.patch to
        // ensure that the user's version of the app
        // matches their license
        _.setState({
          licenseValid: true,
          allowedMajorVersions: data.major,
          allowedMinorVersions: data.minor,
          allowedPatchVersions: data.patch,
          appVersion: data.appVersion,
          licenseExpiry: data.expire,
        });
      } else {
        _.setState({
          licenseValid: false,
        });
      }
    });
  }

  toggleMenu(event) {
    this.setState({
      mobileMenuActive: !this.state.mobileMenuActive,
    });
  }

  toggleLicenseModal(event) {
    const previous = this.state.licenseModalActive;

    // Only send license request if the modal
    // is not already open
    if (!previous) {
      window.api.licenseKeys.send(validateLicenseRequest);
    }

    this.setState({
      licenseModalActive: !this.state.licenseModalActive,
    });
  }

  toggleNaviModal(event) {
    this.setState({
      naviModalActive: !this.state.naviModalActive,
    });
  }
  
  toggleNaviModalOnDBMigration(event) {
    this.setState({
      naviModalActiveOnDBMigration: !this.state.naviModalActiveOnDBMigration,
    });
  }

  hasUnsavedChangeRequest() {
    if(this.props.companyManager.requireSaving) {
      return true;
    }
    if(this.props.productManager.requireSaving) {
      return true;
    }
    if(this.props.priceManager.changeRequests.length!=0) {
      return true;
    }
    if(this.props.formManager.requireSaving) {
      return true;
    }
    if(this.props.recordManager.requireSaving) {
      return true;
    }
    return false;
  }

  needDBMigration() {
    if(this.props.companyManager.requireDBMigration) {
      return true;
    }
    return false;
  }

  // Using a custom method to navigate because we
  // need to close the mobile menu if we navigate to
  // another page
  navigate(url) {
    if(this.hasUnsavedChangeRequest()) {
      this.toggleNaviModal();
    }
    else if (this.needDBMigration()) {
      this.toggleNaviModalOnDBMigration();
    }
    else {
      this.setState(
        {
          mobileMenuActive: false,
        },
        function () {
          this.history.push(url);
        }
      );
    }
  }

  renderLicenseModal() {
    return (
      <div
        className={`modal ${this.state.licenseModalActive ? "is-active" : ""}`}>
        <div className="modal-background"></div>
        <div className="modal-content">
          {this.state.licenseValid ? (
            <div className="box">
              The license key for this product has been validated and the
              following versions of this app are allowed for your use:
              <div>
                <strong>Major versions:</strong>{" "}
                {this.state.allowedMajorVersions} <br />
                <strong>Minor versions:</strong>{" "}
                {this.state.allowedMinorVersions} <br />
                <strong>Patch versions:</strong>{" "}
                {this.state.allowedPatchVersions} <br />
                <strong>Expires on:</strong>{" "}
                {!this.state.licenseExpiry
                  ? "never!"
                  : this.state.licenseExpiry}{" "}
                <br />(
                <em>
                  App version:
                  {` v${this.state.appVersion.major}.${this.state.appVersion.minor}.${this.state.appVersion.patch}`}
                </em>
                )
                <br />
              </div>
            </div>
          ) : (
            <div className="box">
              <div>The license key is not valid.</div>
              <div>
                If you'd like to create a license key, follow these steps:
                <ol style={{ marginLeft: "30px" }}>
                  <li>
                    Install this package globally (
                    <strong>npm i secure-electron-license-keys-cli -g</strong>).
                  </li>
                  <li>
                    Run <strong>secure-electron-license-keys-cli</strong>.
                  </li>
                  <li>
                    Copy <strong>public.key</strong> and{" "}
                    <strong>license.data</strong> into the <em>root</em> folder
                    of this app.
                  </li>
                  <li>
                    Re-run this app (ie. <strong>npm run dev</strong>).
                  </li>
                  <li>
                    If you'd like to further customize your license keys, copy
                    this link into your browser:{" "}
                    <a href="https://github.com/reZach/secure-electron-license-keys-cli">
                      https://github.com/reZach/secure-electron-license-keys-cli
                    </a>
                    .
                  </li>
                </ol>
              </div>
            </div>
          )}
        </div>
        <button
          className="modal-close is-large"
          aria-label="close"
          onClick={this.toggleLicenseModal}></button>
      </div>
    );
  }

  renderNaviModal() {
    return (
      <div
        className={`modal ${this.state.naviModalActive ? "is-active" : ""}`}>
        <div className="modal-background"></div>
        <div className="modal-content">
        <div className="box">
        <div>There are unsaved change request.</div>
        </div>
        </div>
        <button
          className="modal-close is-large"
          aria-label="close"
          onClick={this.toggleNaviModal}></button>
      </div>
    );
  }

  renderNaviModalOnDBMigrationNeeded() {
    return (
      <div
        className={`modal ${this.state.naviModalActiveOnDBMigration ? "is-active" : ""}`}>
        <div className="modal-background"></div>
        <div className="modal-content">
        <div className="box">
        <div>You DB version is out-of-date.</div>
        <div>
          (1) Export current database.
          (2) Purge database.
          (3) Import database to migrate.</div>
        </div>
        </div>
        <button
          className="modal-close is-large"
          aria-label="close"
          onClick={this.toggleNaviModalOnDBMigration}></button>
      </div>
    );
  }

  render() {
    const { t } = this.props;
    return (
      <nav
        className="navbar is-dark"
        role="navigation"
        aria-label="main navigation">
        <div className="navbar-brand">
          <a
            role="button"
            className={`navbar-burger ${
              this.state.mobileMenuActive ? "is-active" : ""
            }`}
            data-target="navbarBasicExample"
            aria-label="menu"
            aria-expanded="false"
            onClick={this.toggleMenu}>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>
        <div
          id="navbarBasicExample"
          className={`navbar-menu ${
            this.state.mobileMenuActive ? "is-active" : ""
          }`}>
          <div className="navbar-start">
            <a
              className="navbar-item"
              onClick={() => this.navigate(ROUTES.WELCOME)}>
              {t("Home")}
            </a>

            <a
              className="navbar-item"
              onClick={() => this.navigate(ROUTES.COMPANYLIST)}>
              {t("CompanyList")}
            </a>
            <a
              className="navbar-item"
              onClick={() => this.navigate(ROUTES.PRODUCTLIST)}>
              {t("ProductList")}
            </a>
            <a
              className="navbar-item"
              onClick={() => this.navigate(ROUTES.PRICELIST)}>
              {t("UnitPriceList")}
            </a>
            <a
              className="navbar-item"
              onClick={() => this.navigate(ROUTES.PRODPRICELIST)}>
              {t("ProdUnitPriceList")}
            </a>
            <a
              className="navbar-item"
              onClick={() => this.navigate(ROUTES.FORMLIST)}>
              {t("FormList")}
            </a>
          </div>
          {this.renderLicenseModal()}
          {this.renderNaviModal()}
          {this.renderNaviModalOnDBMigrationNeeded()}
          <div className="navbar-end">
            <div className="navbar-item">
              <div className="buttons">
                <a
                  className="button is-light"
                  onClick={this.toggleLicenseModal}>
                  {t("CheckLicense")}
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = (state, props) => ({
  companyManager: state.companyManager,
  productManager: state.productManager,
  priceManager: state.priceManager,
  formManager: state.formManager,
  recordManager: state.recordManager,
});
const mapDispatch = { };

export default connect(mapStateToProps, mapDispatch)(withTranslation()(Nav));
