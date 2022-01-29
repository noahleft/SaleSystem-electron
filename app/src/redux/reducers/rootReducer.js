import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import homeReducer from "../components/home/homeSlice";
import companyManagerReducer from "../components/companyManager/companyManagerSlice";
import productManagerReducer from "../components/productManager/productManagerSlice";
import priceManagerReducer from "../components/priceManager/priceManagerSlice";
import formManagerReducer from "../components/formManager/formManagerSlice";
import recordManagerReducer from "../components/recordManager/recordManagerSlice";
import exportManagerReducer from "../components/exportManager/exportManagerSlice";

const rootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    home: homeReducer,
    companyManager: companyManagerReducer,
    productManager: productManagerReducer,
    priceManager: priceManagerReducer,
    formManager: formManagerReducer,
    recordManager: recordManagerReducer,
    exportManager: exportManagerReducer,
  });

export default rootReducer;
