import axiosIntance from "../helpers/axios"
import { authConstants, API_TOKEN, API_ROOT } from "./constants"
import axios from 'axios';
import { api } from "../urlConfig";
const encode = encodeURIComponent;

export const login = (user) => {
  return async (dispatch) => {
    dispatch({ type: authConstants.LOGIN_REQUEST })
    const res = await fetch(`${API_TOKEN}`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: `email=${user.email}&password=${user.password}`
    });
    const res_1 = await res.json();
    console.error('res: ', res_1)
    var user = res_1.data;
    if (user) {
      localStorage.setItem('tokenAdmin', user);
    } else {
      dispatch({
        type: authConstants.LOGIN_FAILURE,
        payload: {
          error: "Lỗi đăng nhập!"
        }
      })
    }
  }
}

export const isUserLoggedIn = () => {
  return async dispatch => {
    const user = localStorage.getItem('tokenAdmin');
    if (user) {
      dispatch({
        type: authConstants.LOGIN_SUCCESS,
        payload: {
          user
        }
      })
    } else {
      dispatch({
        type: authConstants.LOGIN_FAILURE,
        payload: {
          error: 'Failed to login'
        }
      })
    }
  }
}
export const signout = () => {
  return async dispatch => {
    localStorage.clear();
    dispatch({
      type: authConstants.LOGOUT_SUCCESS
    })

  }
}
// export const signout = () => {
//   return async dispatch => {
//     dispatch({
//       type: authConstants.LOGOUT_REQUEST
//     })
//     const res = await axios.post('admin/signout');

//     if(res.status === 200){
//       localStorage.clear();
//       dispatch({
//         type: authConstants.LOGOUT_SUCCESS
//       })
//     }else{
//       dispatch({
//         type: authConstants.LOGOUT_FAILURE,
//         payload: {
//           error: res.data.error
//         }
//       })
//     }
//   }
// }