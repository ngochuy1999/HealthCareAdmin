import authReducer from "./auth.reducer";
import { combineReducers } from 'redux';
import brandReducer from "./brand.reducer";
import medicalReducer from "./medical.reducer";

const rootReducer = combineReducers({
  auth: authReducer,
  brand: brandReducer,
  medical: medicalReducer
})

export default rootReducer;