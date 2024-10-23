import React from "react";
import { connect } from "react-redux";
import { Form } from "react-bootstrap";
import { updateNumProdType } from "Redux/components/home/homeSlice";

class EditNumProdType extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        value: "",
      }
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleChange = this.handleChange.bind(this);
    }
  
    handleSubmit(e) {
      this.props.updateNumProdType(this.state.value);
      this.props.writeFunc({
        ...this.props.home.config,
        num_prod_type: this.state.value});
      e.preventDefault();
    }
  
    handleChange(e) {
      this.setState({value: e.target.value});
    }
  
    render() {
      return (
        <Form onSubmit={this.handleSubmit}>
          <Form.Group controlId="editValue">
            <Form.Control type="number" value={this.state.value} onChange={this.handleChange}/>
          </Form.Group>
        </Form>
      )
    }
}

const mapStateToProps = (state, props) => ({
    home: state.home
});
const mapDispatch = { updateNumProdType };

export default connect(mapStateToProps, mapDispatch)(EditNumProdType);