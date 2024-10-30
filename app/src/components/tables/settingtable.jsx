import React from "react";
import { connect } from "react-redux";
import { Table } from "react-bootstrap";
import { withTranslation } from "react-i18next";
import EditQuantityUnit from "Components/config/configQuantityUnit";
import EditCompanyTitle from "Components/config/configCompanyTitle";
import EditFormTitleTemplate from "Components/config/configFormTitleTemplate";
import EditQuantityUnitN from "Components/config/configQuantityUnitN";
import "./tablesize.css";

class SettingTable extends React.Component {
  render() {
    const { t } = this.props;
    return (
    <Table bordered hover size="sm">
    <thead>
      <tr>
        <th scope="col" className="thText">{t("Key")}</th>
        <th scope="col" className="thText">{t("Value")}</th>
        <th scope="col">{t("EditValue")}</th>
      </tr>
    </thead>
    <tbody>
      <tr key={1}>
        <th scope="row">{t("CompanyName")}</th>
        <td>{this.props.home.config.company_title}</td>
        <td><EditCompanyTitle writeFunc={this.props.writeFunc}/></td>
      </tr>
      <tr key={2}>
        <th scope="row">{t("FormNameTemplate")}</th>
        <td>{this.props.home.config.form_title_template}</td>
        <td><EditFormTitleTemplate writeFunc={this.props.writeFunc}/></td>
      </tr>
      <tr key={3}>
        <th scope="row">{t("DefaultQuantityUnit")}</th>
        <td>{this.props.home.config.quantity_unit}</td>
        <td><EditQuantityUnit writeFunc={this.props.writeFunc}/></td>
      </tr>
      <tr key={4}>
        <th scope="row">{t("QuantityUnit")}1</th>
        <td>{this.props.home.config.quantity_unit_1}</td>
        <td><EditQuantityUnitN writeFunc={this.props.writeFunc} idx={1} /></td>
      </tr>
      <tr key={5}>
        <th scope="row">{t("QuantityUnit")}2</th>
        <td>{this.props.home.config.quantity_unit_2}</td>
        <td><EditQuantityUnitN writeFunc={this.props.writeFunc} idx={2}/></td>
      </tr>
      <tr key={6}>
        <th scope="row">{t("QuantityUnit")}3</th>
        <td>{this.props.home.config.quantity_unit_3}</td>
        <td><EditQuantityUnitN writeFunc={this.props.writeFunc} idx={3}/></td>
      </tr>
      <tr key={7}>
        <th scope="row">{t("QuantityUnit")}4</th>
        <td>{this.props.home.config.quantity_unit_4}</td>
        <td><EditQuantityUnitN writeFunc={this.props.writeFunc} idx={4}/></td>
      </tr>
      <tr key={8}>
        <th scope="row">{t("QuantityUnit")}5</th>
        <td>{this.props.home.config.quantity_unit_5}</td>
        <td><EditQuantityUnitN writeFunc={this.props.writeFunc} idx={5}/></td>
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