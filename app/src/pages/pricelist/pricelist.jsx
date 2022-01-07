import React from "react";
import CompSelect from "Components/compselect/compselect";
import ProdSelect from "Components/prodselect/prodselect";
import ClearSelect from "Components/clearselect/clearselect";
import PriceTable from "Components/pricetable/pricetable";

class PriceList extends React.Component {
  render() {
    return (
      <section className="section">
          <div className="container">
              <h1 className="title is-1">Unit Price View</h1>
          </div>
          <CompSelect></CompSelect>
          <ProdSelect></ProdSelect>
          <ClearSelect></ClearSelect>
          <PriceTable></PriceTable>
      </section>
    );
  }
}

export default PriceList;
