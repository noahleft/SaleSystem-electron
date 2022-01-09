import React from "react";
import { connect } from "react-redux";
import { Card, Stack } from "react-bootstrap";

class CompInfo extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
    <Card>
      <Card.Title>Company Info</Card.Title>
      <Card.Body>
        <Stack gap={2}>
          <div className="bg-light border">ID:</div>
          <div className="bg-light border">Company Name:</div>
        </Stack>
      </Card.Body>
    </Card>
    );
  }
}

const mapStateToProps = (state, props) => ({
  home: state.home
});
const mapDispatch = { };

export default connect(mapStateToProps, mapDispatch)(CompInfo);
