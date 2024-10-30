import React from "react";
import { connect } from "react-redux";
import { Form } from "react-bootstrap";
import { updateQuantityUnit1, updateQuantityUnit2, updateQuantityUnit3,
  updateQuantityUnit4, updateQuantityUnit5
 } from "Redux/components/home/homeSlice";

class EditQuantityUnitN extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        value: "",
      }
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleChange = this.handleChange.bind(this);
    }
  
    handleSubmit(e) {
      if (this.props.idx == 1) {
        this.props.updateQuantityUnit1(this.state.value);
        this.props.writeFunc({
          ...this.props.home.config,
          quantity_unit_1: this.state.value});
      }
      if (this.props.idx == 2) {
        this.props.updateQuantityUnit2(this.state.value);
        this.props.writeFunc({
          ...this.props.home.config,
          quantity_unit_2: this.state.value});
      }
      if (this.props.idx == 3) {
        this.props.updateQuantityUnit3(this.state.value);
        this.props.writeFunc({
          ...this.props.home.config,
          quantity_unit_3: this.state.value});
      }
      if (this.props.idx == 4) {
        this.props.updateQuantityUnit4(this.state.value);
        this.props.writeFunc({
          ...this.props.home.config,
          quantity_unit_4: this.state.value});
      }
      if (this.props.idx == 5) {
        this.props.updateQuantityUnit5(this.state.value);
        this.props.writeFunc({
          ...this.props.home.config,
          quantity_unit_5: this.state.value});
      }
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
const mapDispatch = { updateQuantityUnit1, updateQuantityUnit2,
  updateQuantityUnit3, updateQuantityUnit4, updateQuantityUnit5
 };

export default connect(mapStateToProps, mapDispatch)(EditQuantityUnitN);