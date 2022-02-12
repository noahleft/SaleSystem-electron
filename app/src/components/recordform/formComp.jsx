import React from "react";
import { connect } from "react-redux";
import { Form, Row, Col } from "react-bootstrap";
import { changeCandidateRecordCompId, changeCandidateRecordUnitPrice } from "Redux/components/recordManager/recordManagerSlice";
import { withTranslation } from "react-i18next";

class FormComp extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const comp_id = e.target.value;
    const idx = this.props.recordManager.candidateRecordListIdx;
    this.props.changeCandidateRecordCompId({
      idx:   idx,
      value: comp_id});

    const record = this.props.recordManager.recordList[idx];
    if(record.INSERT && record.PROD_ID!=0) {
      for(const obj of this.props.priceManager.priceList) {
        if(obj.COMP_ID==comp_id && obj.PROD_ID==record.PROD_ID) {
          this.props.changeCandidateRecordUnitPrice({
            idx:   idx,
            value: obj.UNIT_PRICE
          });
        }
      }
    }
  }

  render() {
    const { t } = this.props;
    const content = this.props.companyManager.companyList.map(function(obj){
      return (<option key={obj.ID} value={obj.ID}>{obj.NAME}</option>)
    });
    const idx = this.props.recordManager.candidateRecordListIdx;
    const comp_id = (idx!=-1)?this.props.recordManager.recordList[idx].COMP_ID:0;
    return (
    <Form.Group as={Row} className="mb-3" controlId="formCompName" ref="formCompName">
    <Form.Label column sm={4}>{t("CompanyName")}:</Form.Label>
    <Col sm={6}>
    <Form.Select value={comp_id} onChange={this.handleChange} disabled={idx==-1}>
      <option key="0" value="0" disabled>{t("Select")}</option>
      {content}
    </Form.Select>
    </Col>
    </Form.Group>
    );
  }
}

const mapStateToProps = (state, props) => ({
  companyManager: state.companyManager,
  priceManager: state.priceManager,
  recordManager: state.recordManager
});
const mapDispatch = { changeCandidateRecordCompId, changeCandidateRecordUnitPrice };

export default connect(mapStateToProps, mapDispatch)(withTranslation()(FormComp));
