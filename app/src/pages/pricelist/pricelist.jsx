import React from "react";
import CompSelect from "Components/compselect/compselect";
import PriceTable from "Components/pricetable/pricetable";

class PriceList extends React.Component {
  render() {
    let content = [];
    let priceList = myAPI.listPrice();
    for(let i=0; i<=priceList.length-1; i++) {
      content.push(<tr key={priceList[i].ID}>
        <th scope="row">{priceList[i].ID}</th>
        <td>{myAPI.getCompany(priceList[i].COMP_ID).NAME}</td>
        <td>{myAPI.getProduct(priceList[i].PROD_ID).NAME}</td>
        <td>{priceList[i].UNIT_PRICE}</td>
        </tr>)
    }

    return (
      <section className="section">
          <div className="container">
              <h1 className="title is-1">Unit Price View</h1>
          </div>
          <CompSelect></CompSelect>
          <PriceTable></PriceTable>
      </section>
    );
  }
}

export default PriceList;
