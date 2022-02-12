import React from "react";
import { connect } from "react-redux";
import { Form, Row, Col } from "react-bootstrap";
import { changeCandidateRecordNote } from "Redux/components/recordManager/recordManagerSlice";
import { withTranslation } from "react-i18next";

class FormNote extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const idx = this.props.recordManager.candidateRecordListIdx;
    const note = e.target.value;
    this.props.changeCandidateRecordNote({
      idx:   idx,
      value: note
    });
  }

  render() {
    const { t } = this.props;
    const idx = this.props.recordManager.candidateRecordListIdx;
    const note = (idx!=-1)?this.props.recordManager.recordList[idx].NOTE:"";
    return (
    <Form.Group as={Row} className="mb-3" controlId="formNote" ref="formNote">
    <Form.Label column sm={4}>{t("Note")}:</Form.Label>
    <Col sm={6}>
        <Form.Control className="me-auto" placeholder={note} disabled={idx==-1}
        type="text" value={note} onChange={this.handleChange} />
    </Col>
    </Form.Group>
    );
  }
}

const mapStateToProps = (state, props) => ({
  recordManager: state.recordManager
});
const mapDispatch = { changeCandidateRecordNote };

export default connect(mapStateToProps, mapDispatch)(withTranslation()(FormNote));
