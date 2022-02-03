import React from "react";
import { connect } from "react-redux";
import { Card, Form, Row, Col, Button } from "react-bootstrap";
import { addChangeRequest } from "Redux/components/formManager/formManagerSlice";
import { withTranslation } from "react-i18next";

class FormInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(e) {
    if (this.state.value != '') {
      let CR = {ID:   e.target.formFormId.placeholder,
                NAME: this.state.value};
      this.props.addChangeRequest(CR);
    }
    // reset
    this.state.value = '';
  }

  handleChange(e) {
    this.setState({value: e.target.value});
  }

  getFormName(id) {
    let formList = this.props.formManager.formList;
    for(let i=0; i<formList.length; i++) {
      if(formList[i].ID == id) return formList[i].NAME;
    }
    return "";
  }

  render() {
    const { t } = this.props;
    let display = {
      ID: this.props.formManager.candidateFormID,
      NAME: this.getFormName(this.props.formManager.candidateFormID),
    };
    return (
    <Card>
      <Card.Title>{t("FormInfo")}</Card.Title>
      <Card.Body>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group as={Row} className="mb-3" controlId="formFormId">
            <Form.Label column sm={2}>ID:</Form.Label>
            <Col sm={10}>
            <Form.Control className="me-auto" placeholder={display.ID} readOnly />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3" controlId="formFormName" ref="formFormName">
            <Form.Label column sm={2}>Form Name:</Form.Label>
            <Col sm={10}>
              <Form.Control className="me-auto" placeholder={display.NAME} 
              type="text" value={this.state.value} onChange={this.handleChange} />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3">
            <Col sm={{span: 10, offset:2}}>
              <Button type="submit">Submit</Button>
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
const mapDispatch = { addChangeRequest };

export default connect(mapStateToProps, mapDispatch)(withTranslation()(FormInfo));
