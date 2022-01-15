import React from "react";
import { connect } from "react-redux";
import { Card, Form, Row, Col, Button } from "react-bootstrap";
import { addChangeRequest } from "Redux/components/companyManager/companyManagerSlice";

class CompInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(e) {
    if (this.state.value != '') {
      let CR = {ID:   e.target.formCompId.placeholder,
                NAME: this.state.value};
      this.props.addChangeRequest(CR);
    }
    // reset
    this.state.value = '';
  }

  handleChange(e) {
    this.setState({value: e.target.value});
  }

  render() {
    let display = {
      ID: this.props.companyManager.candidateCompID,
      NAME: myAPI.getCompany(this.props.companyManager.candidateCompID).NAME,
    }
    return (
    <Card>
      <Card.Title>Company Info</Card.Title>
      <Card.Body>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group as={Row} className="mb-3" controlId="formCompId">
            <Form.Label column sm={2}>ID:</Form.Label>
            <Col sm={10}>
            <Form.Control className="me-auto" placeholder={display.ID} readOnly />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3" controlId="formCompName" ref="formCompName">
            <Form.Label column sm={2}>Company Name:</Form.Label>
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
  companyManager: state.companyManager
});
const mapDispatch = { addChangeRequest };

export default connect(mapStateToProps, mapDispatch)(CompInfo);
