import React from "react";
import { Form } from "react-bootstrap";
import { connect } from "react-redux";
import { addChangeRequest } from "Redux/components/priceManager/priceManagerSlice";

function HighlightText(props) {
  if(props.highlight)
    return <span className="text-danger">{props.name}</span>;
  else
    return <span>{props.name}</span>;
}

class PriceRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(e) {
    if (this.state.value != '') {
      let CR = {COMP_ID: this.props.priceManager.selectedCompID,
                PROD_ID: Number(e.target.formProd.value),
                UNIT_PRICE: Number(e.target.formUnitPrice.value),
            };
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
      ID: this.props.compPrice.ID,
      NAME: this.props.compPrice.NAME,
      UNIT_PRICE: this.props.compPrice.UNIT_PRICE,
      DIRTY: this.props.compPrice.DIRTY,
    };
    return (<tr key={display.ID} hidden={this.props.hidden && display.UNIT_PRICE==""}>
    <th scope="row">{display.ID}</th>
    <td>{display.NAME}</td>
    <td><HighlightText name={display.UNIT_PRICE} highlight={display.DIRTY}></HighlightText></td>
    <td>
    <Form onSubmit={this.handleSubmit}>
    <Form.Group className="sm" controlId="formProd" value={display.ID}>
    <Form.Control size="sm" className="me-auto" type="hidden" value={display.ID}/>
    </Form.Group>
    <Form.Group className="sm" controlId="formUnitPrice">
    <Form.Control size="sm" className="me-auto" type="text" value={this.state.value}
    onChange={this.handleChange} disabled={this.props.disabled} prod_id={display.ID}/>
    </Form.Group>
    </Form></td>
    </tr>
    );
  }
}

const mapStateToProps = (state, props) => ({
  priceManager: state.priceManager
});
const mapDispatch = { addChangeRequest };

export default connect(mapStateToProps, mapDispatch)(PriceRow);
