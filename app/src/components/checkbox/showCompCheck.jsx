import React from "react";
import { connect } from "react-redux";
import { Form } from "react-bootstrap";
import { changeShowAllCompany } from "Redux/components/companyManager/companyManagerSlice";
import { withTranslation } from "react-i18next";

class ShowCompanyCheck extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  componentWillUnmount() {
    // Clear any existing bindings;
    // important on mac-os if the app is suspended
    // and resumed. Existing subscriptions must be cleared
    window.api.contextMenu.clearRendererBindings();
  }

  handleChange(e) {
    const checked = e.target.checked;
    this.props.changeShowAllCompany(checked);
  }

  render() {
    const { t } = this.props;
    return (
        <Form.Check type="checkbox" label={t("ShowAllCompany")} defaultChecked={this.props.companyManager.showAllCompany} onChange={this.handleChange} />
    );
  }
}

const mapStateToProps = (state, props) => ({
  companyManager: state.companyManager,
});
const mapDispatch = { changeShowAllCompany };

export default connect(mapStateToProps, mapDispatch)(withTranslation()(ShowCompanyCheck));
