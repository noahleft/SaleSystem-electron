import React from "react";
import { connect } from "react-redux";
import { Table } from "react-bootstrap";
import { withTranslation } from "react-i18next";
import EditQuantityUnit from "Components/config/configQuantityUnit";
import EditCompanyTitle from "Components/config/configCompanyTitle";
import "./tablesize.css";

class SettingTable extends React.Component {
  render() {
    const { t } = this.props;
    return (
    <Table bordered hover size="sm">
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
        <td>{this.props.home.config.quantity_unit}</td>
        <td><EditQuantityUnit writeFunc={this.props.writeFunc}/></td>
      </tr>
      <tr key={2}>
        <th scope="row">{t("CompanyName")}</th>
        <td>{this.props.home.config.company_title}</td>
        <td><EditCompanyTitle writeFunc={this.props.writeFunc}/></td>
      </tr>
    </tbody>
    </Table>
    );
  }
}

const mapStateToProps = (state, props) => ({
  home: state.home
});
const mapDispatch = { };

export default connect(mapStateToProps, mapDispatch)(withTranslation()(SettingTable));