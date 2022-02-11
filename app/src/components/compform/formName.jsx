import React from "react";
import { Form, Row, Col } from "react-bootstrap";
import { withTranslation } from "react-i18next";

class FormName extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { t } = this.props;
    return (
    <Form.Group as={Row} className="mb-3" controlId="formCompName" ref="formCompName">
    <Form.Label column sm={2}>{t("CompanyName")}:</Form.Label>
    <Col sm={10}>
      <Form.Control className="me-auto" placeholder={this.props.orig} disabled={this.props.disabled}
      type="text" value={this.props.name} onChange={this.props.onNameChange} />
    </Col>
    </Form.Group>
    );
  }
}

export default withTranslation()(FormName);
