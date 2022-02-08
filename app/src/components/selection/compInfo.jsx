import React from "react";
import { connect } from "react-redux";
import { Card, Form, Row, Col, Button } from "react-bootstrap";
import { addChangeRequest } from "Redux/components/companyManager/companyManagerSlice";
import { withTranslation } from "react-i18next";
import FormID from "Components/compform/formID";
import FormName from "Components/compform/formName";

class CompInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {name: ''};

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
  }

  handleSubmit(e) {
    if (this.state.name != '') {
      let CR = {ID:   e.target.formCompId.placeholder,
                NAME: this.state.name};
      this.props.addChangeRequest(CR);
    }
    // reset
    this.setState({name: ""});
  }

  handleNameChange(e) {
    this.setState({name: e.target.value});
  }

  getCompanyName(id) {
    let companyList = this.props.companyManager.originalList;
    for(let i=0; i<companyList.length; i++) {
      if(companyList[i].ID == id) return companyList[i].NAME;
    }
    return "";
  }

  render() {
    const { t } = this.props;
    let display = {
      ID: this.props.companyManager.candidateCompID,
      NAME: this.getCompanyName(this.props.companyManager.candidateCompID),
    };
    return (
    <Card>
      <Card.Title>{t("CompanyInfo")}</Card.Title>
      <Card.Body>
        <Form onSubmit={this.handleSubmit}>
          <FormID/>
          <FormName orig={display.NAME} name={this.state.name} onNameChange={this.handleNameChange}/>
          <Form.Group as={Row} className="mb-3">
            <Col sm={{span: 10, offset:2}}>
              <Button type="submit">{t("Submit")}</Button>
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

export default connect(mapStateToProps, mapDispatch)(withTranslation()(CompInfo));
