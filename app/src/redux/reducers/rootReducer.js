import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import homeReducer from "../components/home/homeSlice";
import companyManagerReducer from "../components/companyManager/companyManagerSlice";
import productManagerReducer from "../components/productManager/productManagerSlice";
import priceManagerReducer from "../components/priceManager/priceManagerSlice";

const rootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    home: homeReducer,
    companyManager: companyManagerReducer,
    productManager: productManagerReducer,
    priceManager: priceManagerReducer,
  });

export default rootReducer;
