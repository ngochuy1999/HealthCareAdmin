import { medicalConstants } from "../actions/constants";

const initState = {
    medicals: [],
    loading: false,
    error: null,
    total: null,
    pageSize: null,
    page: null
};

export default (state = initState, action) => {
    switch (action.type) {
        case medicalConstants.GET_ALL_MEDICAL_REQUEST: {
            state = {
                ...state,
                medicals: action.payload.data
            }
            break;
        }
    }
    return state;
}