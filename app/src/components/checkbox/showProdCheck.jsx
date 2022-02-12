import React from "react";
import { connect } from "react-redux";
import { Form } from "react-bootstrap";
import { changeShowAllProduct } from "Redux/components/priceManager/priceManagerSlice";
import { withTranslation } from "react-i18next";

class ShowProductCheck extends React.Component {
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
    this.props.changeShowAllProduct(checked);
  }

  render() {
    const { t } = this.props;
    return (
        <Form.Check type="checkbox" label={t("ShowAllProduct")} defaultChecked={this.props.priceManager.showAllProduct} onChange={this.handleChange} />
    );
  }
}

const mapStateToProps = (state, props) => ({
  priceManager: state.priceManager,
});
const mapDispatch = { changeShowAllProduct };

export default connect(mapStateToProps, mapDispatch)(withTranslation()(ShowProductCheck));
