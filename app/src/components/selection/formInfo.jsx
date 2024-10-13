import React from "react";
import { connect } from "react-redux";
import { Card, Form, Row, Col, Button, Container } from "react-bootstrap";
import { addDummyForm, changeCandidateFormListIdx, changeCandidateFormName } from "Redux/components/formManager/formManagerSlice";
import { withTranslation } from "react-i18next";

class FormInfo extends React.Component {
  constructor(props) {
    super(props);

    this.handleNameChange = this.handleNameChange.bind(this);

    this.handleNewRecord = this.handleNewRecord.bind(this);
  }

  getNewFormName(e) {
    if (this.props.home.config.form_title_template == "") {
      return "";
    }
    const template = this.props.home.config.form_title_template;
    const len = this.props.formManager.formList.length;
    if (len == 0) {
      return template;
    }
    const yearIdx = template.search("yyyy");
    const monthIdx = template.search("mm");
    if (yearIdx == -1 || monthIdx == -1) {
      return template;
    }
    const lastFormName = this.props.formManager.formList[len-1].NAME;
    const year = parseInt(lastFormName.substr(yearIdx, 4));
    const month = parseInt(lastFormName.substr(monthIdx, 2));
    if (isNaN(year) || isNaN(month)) {
      return template;
    }
    if (month == 12) {
      const newYear = year+1;
      const newMonth = 1;
      return template.replace("yyyy", newYear.toString()).replace("mm", newMonth.toString());
    }
    else {
      const newYear = year;
      const newMonth = month+1;
      return template.replace("yyyy", newYear.toString()).replace("mm", newMonth.toString());
    }
  }

  handleNewRecord(e) {
    const len = this.props.formManager.formList.length;
    const formName = this.getNewFormName();
    const isEmptyFormName = formName == "";
    let dummy = {
      ID: len+1,
      NAME: formName,
      DIRTY: !isEmptyFormName,
      INSERT: true,
      QUANTITY: 0,
      SUM: 0,
    }
    this.props.addDummyForm(dummy);
    this.props.changeCandidateFormListIdx(len);
  }

  handleNameChange(e) {
    const name = e.target.value;
    const idx = this.props.formManager.candidateFormListIdx;
    this.props.changeCandidateFormName({
      idx:   idx,
      value: name});
  }

  render() {
    const { t } = this.props;
    const idx = this.props.formManager.candidateFormListIdx;
    const id = idx==-1?"":this.props.formManager.formList[idx].ID;
    const name = idx==-1?"":this.props.formManager.formList[idx].NAME;
    const orig = idx==-1?"":this.props.formManager.originalList[idx].NAME;
    return (
    <Card>
      <Card.Title>{t("FormInfo")}</Card.Title>
      <Card.Body>
        <Form onSubmit={this.handleSubmit}><Container>
          <Row>
            <Col><Button onClick={this.handleNewRecord}>{t("NewRecord")}</Button></Col>
          </Row>
          <Form.Group as={Row} className="mb-3" controlId="formFormId">
            <Form.Label column sm={2}>ID:</Form.Label>
            <Col sm={10}>
            <Form.Control className="me-auto" placeholder={id} readOnly />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3" controlId="formFormName" ref="formFormName">
            <Form.Label column sm={2}>{t("FormName")}:</Form.Label>
            <Col sm={10}>
              <Form.Control className="me-auto" placeholder={orig} disabled={idx==-1}
              type="text" value={name} onChange={this.handleNameChange} />
            </Col>
          </Form.Group>
        </Container></Form>
      </Card.Body>
    </Card>
    );
  }
}

const mapStateToProps = (state, props) => ({
  formManager: state.formManager,
  home: state.home
});
const mapDispatch = { addDummyForm, changeCandidateFormListIdx, changeCandidateFormName };

export default connect(mapStateToProps, mapDispatch)(withTranslation()(FormInfo));
