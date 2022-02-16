import React from "react";
import { Card, Dropdown, DropdownButton, Stack, Form, Col, Row, Container } from "react-bootstrap";
import { withTranslation } from "react-i18next";

class UtilCard extends React.Component {
  constructor(props) {
      super(props);

      this.state = { select: 0, width: 91.44, length: 91.44};
      let styles = [40, 50, 60, 65, 80, 90, 100, 110, 120, 140, 150, 170, 180, 200];
      this.arr = styles.map(function(obj, idx) {
        var rObj = {
          title: obj.toString()+"g/y2",
          eventKey: idx,
          value: obj,
        }
        return rObj;
      });

      this.handleSelect = this.handleSelect.bind(this);
      this.handleLengthChange = this.handleLengthChange.bind(this);
      this.handleWidthChange = this.handleWidthChange.bind(this);
  }

  handleSelect(e) {
      this.setState({select: e});
  }

  handleLengthChange(e) {
      this.setState({length: e.target.value});
  }

  handleWidthChange(e) {
      this.setState({width: e.target.value});
  }

  componentWillUnmount() {
    // Clear any existing bindings;
    // important on mac-os if the app is suspended
    // and resumed. Existing subscriptions must be cleared
    window.api.contextMenu.clearRendererBindings();
  }

  render() {
    const { t } = this.props;
    const value = this.arr[this.state.select].value * this.state.length * this.state.width / 91.44 / 91.44;
    const round = Math.round(value * 100) / 100;
    return (
    <Card>
      <Card.Title>{t("UnitConverter")}</Card.Title>
      <Card.Body>
        <Container>
          <Row>
            <Col>{t("Unit")}</Col>
            <Col>{t("Length")} (cm)</Col>
            <Col>{t("Width")} (cm)</Col>
            <Col></Col>
            <Col>{t("Weight")} (g)</Col>
          </Row>
          <Row>
            <Col>
              <Dropdown>
                <DropdownButton title={this.arr[this.state.select].title} onSelect={this.handleSelect}>
                {this.arr.map(function(item){
                    return (<Dropdown.Item key={item.eventKey} eventKey={item.eventKey}>{item.title}</Dropdown.Item>)
                })}
                </DropdownButton>
              </Dropdown>
            </Col>
            <Col>
              <Form>
                <Form.Group controlId="length">
                <Form.Control type="number" value={this.state.length} onChange={this.handleLengthChange}/>
                </Form.Group>
              </Form>
            </Col>
            <Col>
              <Form>
                <Form.Group controlId="width">
                <Form.Control type="number" value={this.state.width} onChange={this.handleWidthChange}/>
              </Form.Group>
            </Form>
            </Col>
            <Col>
            =
            </Col>
            <Col>
            {round}g
            </Col>
          </Row>
        </Container>
      </Card.Body>
    </Card>
    );
  }
}

export default withTranslation()(UtilCard);