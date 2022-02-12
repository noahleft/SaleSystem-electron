import React from "react";
import { connect } from "react-redux";
import { Card, Form, Row, Col, Button } from "react-bootstrap";
import { addDummyForm, changeCandidateFormListIdx, changeCandidateFormName } from "Redux/components/formManager/formManagerSlice";
import { withTranslation } from "react-i18next";

class FormInfo extends React.Component {
  constructor(props) {
    super(props);

    this.handleNameChange = this.handleNameChange.bind(this);

    this.handleNewRecord = this.handleNewRecord.bind(this);
  }

  handleNewRecord(e) {
    const len = this.props.formManager.formList.length;
    let dummy = {
      ID: len+1,
      NAME: "",
      DIRTY: false,
      INSERT: true,
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
      <Button onClick={this.handleNewRecord}>{t("NewRecord")}</Button>
        <Form onSubmit={this.handleSubmit}>
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
        </Form>
      </Card.Body>
    </Card>
    );
  }
}

const mapStateToProps = (state, props) => ({
  formManager: state.formManager
});
const mapDispatch = { addDummyForm, changeCandidateFormListIdx, changeCandidateFormName };

export default connect(mapStateToProps, mapDispatch)(withTranslation()(FormInfo));
