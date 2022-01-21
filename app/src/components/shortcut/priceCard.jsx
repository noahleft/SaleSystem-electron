import React from "react";
import { connect } from "react-redux";
import { Card, Button, Stack } from "react-bootstrap";

class PriceCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};
  }

  handleSubmit(e) {
  }

  handleChange(e) {
    this.setState({value: e.target.value});
  }

  render() {
    const idx = this.props.recordManager.candidateRecordListIdx;
    let display = {
      ID: this.props.recordManager.recordList[idx].ID,
      NAME: "",
    };
    return (
    <Card>
      <Card.Body>
        <Card.Title>Modify Unit Price</Card.Title>
        <Card.Text>
          <Stack gap={2} direction="horizontal">
            <div>From 0 To 0</div>
            <div><Button disabled>Set</Button></div>
          </Stack>
        </Card.Text>
      </Card.Body>
    </Card>
    );
  }
}

const mapStateToProps = (state, props) => ({
  companyManager: state.companyManager,
  recordManager: state.recordManager
});
const mapDispatch = { };

export default connect(mapStateToProps, mapDispatch)(PriceCard);
