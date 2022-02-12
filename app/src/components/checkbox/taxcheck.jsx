import React from "react";
import { connect } from "react-redux";
import { Form } from "react-bootstrap";
import { changeNeedTax } from "Redux/components/exportManager/exportManagerSlice";
import { withTranslation } from "react-i18next";

class TaxCheck extends React.Component {
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
    this.props.changeNeedTax(checked);
  }

  render() {
    const { t } = this.props;
    return (
        <Form.Check type="checkbox" label={t("PrintTax")} checked={this.props.exportManager.needTax} onChange={this.handleChange} />
    );
  }
}

const mapStateToProps = (state, props) => ({
  exportManager: state.exportManager,
});
const mapDispatch = { changeNeedTax };

export default connect(mapStateToProps, mapDispatch)(withTranslation()(TaxCheck));
