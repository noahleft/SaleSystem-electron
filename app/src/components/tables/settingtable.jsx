import React from "react";
import { connect } from "react-redux";
import { Form, Table } from "react-bootstrap";
import { updateQuantityUnit } from "Redux/components/home/homeSlice";
import { withTranslation } from "react-i18next";
import { writeConfigRequest } from "secure-electron-store";
import "./tablesize.css";

class EditForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(e) {
    window.api.store.send(writeConfigRequest, "quantity_unit", this.state.value);
    this.props.updateFunc(this.state.value);
    e.preventDefault();
  }

  handleChange(e) {
    this.setState({value: e.target.value});
  }

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Group controlId="editValue">
          <Form.Control type="text" value={this.state.value} onChange={this.handleChange}/>
        </Form.Group>
      </Form>
    )
  }
}

class SettingTable extends React.Component {
  componentWillUnmount() {
    // Clear any existing bindings;
    // important on mac-os if the app is suspended
    // and resumed. Existing subscriptions must be cleared
    window.api.contextMenu.clearRendererBindings();
  }

  render() {
    const { t } = this.props;
    return (
    <div className="scrollTable">
    <Table striped bordered hover size="sm">
    <thead>
      <tr>
        <th scope="col" className="thName">{t("Key")}</th>
        <th scope="col" className="thText">{t("Value")}</th>
        <th scope="col">{t("EditValue")}</th>
      </tr>
    </thead>
    <tbody>
      <tr key={1}>
        <th scope="row">{t("QuantityUnit")}</th>
        <td>{this.props.home.quantity_unit}</td>
        <td><EditForm updateFunc={this.props.updateQuantityUnit}/></td>
      </tr>
    </tbody>
    </Table></div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  home: state.home
});
const mapDispatch = { updateQuantityUnit };

export default connect(mapStateToProps, mapDispatch)(withTranslation()(SettingTable));