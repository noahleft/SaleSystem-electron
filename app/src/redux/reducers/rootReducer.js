import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import homeReducer from "../components/home/homeSlice";
import companyManagerReducer from "../components/companyManager/companyManagerSlice";

const rootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    home: homeReducer,
    companyManager: companyManagerReducer,
  });

export default rootReducer;
