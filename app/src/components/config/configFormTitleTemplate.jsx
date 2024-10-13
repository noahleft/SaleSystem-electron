import React from "react";
import { connect } from "react-redux";
import { Form } from "react-bootstrap";
import { updateFormTitleTemplate } from "Redux/components/home/homeSlice";

class EditFormTitleTemplate extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        value: "",
      }
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleChange = this.handleChange.bind(this);
    }
  
    handleSubmit(e) {
      this.props.updateFormTitleTemplate(this.state.value);
      this.props.writeFunc({
        ...this.props.home.config,
        form_title_template: this.state.value});
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
const mapDispatch = { updateFormTitleTemplate };

export default connect(mapStateToProps, mapDispatch)(EditFormTitleTemplate);