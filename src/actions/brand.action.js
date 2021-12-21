import { brandConstants, medicalConstants } from './constants';
import axios from '../helpers/axios';

export const getAllBrand = () => {
  return async dispatch => {
    const res = await axios.get('admin/medical-bill-examine?doctorId=2');
    dispatch({
      type: brandConstants.GET_ALL_BRAND_SUCCESS,
      payload: {
        data: res.data
      }
    })
  }
}


export const getAllMedicalBill = () => {
  return async dispatch => {
    const res = await axios.get('admin/medical-bill?doctorId=2');
    dispatch({
      type: medicalConstants.GET_ALL_MEDICAL_REQUEST,
      payload: {
        data: res.data
      }
    })
  }
}
