import React from "react";
import { Switch, Route } from "react-router";
import ROUTES from "Constants/routes";
import loadable from "@loadable/component";

// Load bundles asynchronously so that the initial render happens faster
const Welcome = loadable(() =>
  import(/* webpackChunkName: "WelcomeChunk" */ "Pages/welcome/welcome")
);
const About = loadable(() =>
  import(/* webpackChunkName: "AboutChunk" */ "Pages/about/about")
);
const CompanyList = loadable(() =>
  import(/* webpackChunkName: "CompanyListChunk" */ "Pages/companylist/companylist")
);
const ProductList = loadable(() =>
  import(/* webpackChunkName: "ProductListChunk" */ "Pages/productlist/productlist")
);

class Routes extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path={ROUTES.WELCOME} component={Welcome}></Route>
        <Route path={ROUTES.ABOUT} component={About}></Route>
        <Route path={ROUTES.COMPANYLIST} component={CompanyList}></Route>
        <Route path={ROUTES.PRODUCTLIST} component={ProductList}></Route>
      </Switch>
    );
  }
}

export default Routes;
