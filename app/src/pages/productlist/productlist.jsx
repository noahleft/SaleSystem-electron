import React from "react";
import { Container, Row, Table } from "react-bootstrap";

class ProductList extends React.Component {
  render() {
    let content = [];
    let productList = myAPI.listProduct();
    for(let i=0; i<=productList.length-1; i++) {
      content.push(<tr key={productList[i].ID}>
        <th scope="row">{productList[i].ID}</th>
        <td>{productList[i].NAME}</td>
        </tr>)
    }
    return (
      <section className="section">
        <Container fluid>
          <Row className="title is-1">Product View</Row>
          <Row>
            <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <th scope="col" width="80px">#</th>
                <th scope="col">Product Name</th>
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

export default ProductList;
