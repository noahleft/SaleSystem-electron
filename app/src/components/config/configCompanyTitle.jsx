import React from "react";
import { connect } from "react-redux";
import { Form } from "react-bootstrap";
import { updateCompanyTitle } from "Redux/components/home/homeSlice";
import { writeConfigRequest } from "secure-electron-store";

class EditCompanyTitle extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        value: "",
      }
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleChange = this.handleChange.bind(this);
    }
  
    handleSubmit(e) {
      window.api.store.send(writeConfigRequest, "company_title", this.state.value);
      this.props.updateCompanyTitle(this.state.value);
      e.preventDefault();
    }
  
    handleChange(e) {
      this.setState({value: e.target.value});
    }
  
    render() {
      return (
        <Form onSubmit={this.handleSubmit}>
          <Form.Group controlId="editValue">
            <Form.Control type="text" value={this.state.value} onChange={this.handleChange}/>
          </Form.Group>
        </Form>
      )
    }
}

const mapStateToProps = (state, props) => ({
    home: state.home
});
const mapDispatch = { updateCompanyTitle };

export default connect(mapStateToProps, mapDispatch)(EditCompanyTitle);