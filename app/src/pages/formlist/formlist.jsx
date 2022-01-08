import React from "react";
import ROUTES from "Constants/routes";
import { connect } from "react-redux";
import { changeSelectedFormID } from "Redux/components/home/homeSlice";
import { Container, Row, Table, Button } from "react-bootstrap";

class FormList extends React.Component {
  constructor(props) {
    super(props);
    this.history = props.history;
  }

  navigate(url) {
    this.setState(
      {
        mobileMenuActive: false,
      },
      function () {
        this.history.push(url);
      }
    );
  }

  render() {
    let content = [];
    let formList = myAPI.listForm();
    for(let i=0; i<=formList.length-1; i++) {
      content.push(<tr key={formList[i].ID}>
        <th scope="row">{formList[i].ID}</th>
        <td>{formList[i].NAME}</td>
        <td>
        <Button variant="primary" size="sm"
          onClick={() => {
            this.props.changeSelectedFormID(formList[i].ID);
            this.navigate(ROUTES.RECORDLIST);
          }}>
          OpenIt!
        </Button></td>
        </tr>)
    }

    return (
      <section className="section">
          <Container fluid>
            <Row className="title is-1">Form View</Row>
            <Row>
              <Table striped bordered hover size="sm">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Form Name</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
              {content}
              </tbody>
              </Table>
            </Row>
          </Container>
      </section>
    );
  }
}

const mapStateToProps = (state, props) => ({
  home: state.home,
});
const mapDispatch = { changeSelectedFormID };

export default connect(mapStateToProps, mapDispatch)(FormList);
