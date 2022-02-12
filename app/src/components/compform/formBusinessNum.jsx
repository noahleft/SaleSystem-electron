import React from "react";
import { Form, Row, Col } from "react-bootstrap";
import { withTranslation } from "react-i18next";

class FormBusinessNum extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { t } = this.props;
    return (
    <Form.Group as={Row} className="mb-3" controlId="formCompBnum" ref="formCompBnum">
    <Form.Label column sm={4}>{t("BusinessNum")}:</Form.Label>
    <Col sm={6}>
      <Form.Control className="me-auto" placeholder={this.props.orig} disabled={this.props.disabled}
      type="text" value={this.props.val} onChange={this.props.onBusNumChange} />
    </Col>
    </Form.Group>
    );
  }
}

export default withTranslation()(FormBusinessNum);
