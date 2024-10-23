import React from "react";
import { Switch, Route } from "react-router";
import ROUTES from "Constants/routes";
import loadable from "@loadable/component";

// Load bundles asynchronously so that the initial render happens faster
const Welcome = loadable(() =>
  import(/* webpackChunkName: "WelcomeChunk" */ "Pages/welcome/welcome")
);
const CompanyList = loadable(() =>
  import(/* webpackChunkName: "CompanyListChunk" */ "Pages/companylist/companylist")
);
const ProductList = loadable(() =>
  import(/* webpackChunkName: "ProductListChunk" */ "Pages/productlist/productlist")
);
const PriceList = loadable(() =>
  import(/* webpackChunkName: "PriceListChunk" */ "Pages/pricelist/pricelist")
);
const ProdPriceList = loadable(() =>
  import(/* webpackChunkName: "ProdPriceListChunk" */ "Pages/pricelist/prodpricelist")
);
const FormList = loadable(() =>
  import(/* webpackChunkName: "FormListChunk" */ "Pages/formlist/formlist")
);
const RecordList = loadable(() =>
  import(/* webpackChunkName: "RecordListChunk" */ "Pages/recordlist/recordlist")
);
const RecordExport = loadable(() =>
import(/* webpackChunkName: "RecordExportChunk" */ "Pages/recordexport/recordexport")
);

class Routes extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path={ROUTES.WELCOME} component={Welcome}></Route>
        <Route path={ROUTES.COMPANYLIST} component={CompanyList}></Route>
        <Route path={ROUTES.PRODUCTLIST} component={ProductList}></Route>
        <Route path={ROUTES.PRICELIST} component={PriceList}></Route>
        <Route path={ROUTES.PRODPRICELIST} component={ProdPriceList}></Route>
        <Route path={ROUTES.FORMLIST} component={FormList}></Route>
        <Route path={ROUTES.RECORDLIST} component={RecordList}></Route>
        <Route path={ROUTES.RECORDEXPORT} component={RecordExport}></Route>
      </Switch>
    );
  }
}

export default Routes;
