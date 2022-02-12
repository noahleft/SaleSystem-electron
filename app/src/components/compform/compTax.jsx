import React from "react";
import { connect } from "react-redux";
import { Form, Row, Col, ButtonGroup, ToggleButton } from "react-bootstrap";
import { changeCandidateCompTax } from "Redux/components/companyManager/companyManagerSlice";
import { withTranslation } from "react-i18next";

class CompTax extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const val = e.target.value;
    const idx = this.props.companyManager.candidateCompListIdx;
    this.props.changeCandidateCompTax({
      idx:   idx,
      value: val});
  }

  render() {
    const { t } = this.props;
    const idx = this.props.companyManager.candidateCompListIdx;
    let defaultVal = idx==-1;
    let curr = (defaultVal)?"":this.props.companyManager.companyList[idx].PRINTTAX;
    const radios = [
        { name: 'Yes', value: 1 },
        { name: 'No', value: 0 },
    ];
    return (
    <Form.Group as={Row} className="mb-3" controlId="formCompPrintTax" ref="formCompPrintTax">
    <Form.Label column sm={4}>{t("PrintTax")}:</Form.Label>
    <Col sm={6}>
      <ButtonGroup>
        {radios.map((radio, idx) => (
          <ToggleButton
            key={idx}
            id={`radio-${idx}`}
            type="radio"
            variant={idx % 2 ? 'outline-danger' : 'outline-success'}
            name="radio"
            value={radio.value}
            checked={curr == radio.value}
            onChange={this.handleChange}
          >
            {radio.name}
          </ToggleButton>
        ))}
      </ButtonGroup>
    </Col>
    </Form.Group>
    );
  }
}

const mapStateToProps = (state, props) => ({
  companyManager: state.companyManager
});
const mapDispatch = { changeCandidateCompTax };

export default connect(mapStateToProps, mapDispatch)(withTranslation()(CompTax));
