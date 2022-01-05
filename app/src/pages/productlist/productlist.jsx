import React from "react";

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
          <div className="container">
              <h1 className="title is-1">Product View</h1>
          </div>
          <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Product Name</th>
            </tr>
          </thead>
          <tbody>
          {content}
          </tbody>
          </table>
      </section>
    );
  }
}

export default ProductList;
