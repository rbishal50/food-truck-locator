import {
  GET_ALL_DATA,
  GET_ALL_DATA_SUCCESS,
  GET_ALL_DATA_ERROR,
} from './constants';

export default (
  state = {
    getAllDataLoading: true,
    data: [],
    getAllDataError: '',
  },
  action
) => {
  switch (action.type) {
    case GET_ALL_DATA:
      return {
        ...state,
        getAllDataLoading: true,
        postProfileError: '',
        data: [],
      };
    case GET_ALL_DATA_SUCCESS:
      return {
        ...state,
        getAllDataLoading: false,
        data: action.payload,
      };
    case GET_ALL_DATA_ERROR:
      return {
        ...state,
        getAllDataLoading: false,
        getAllDataError: action.error,
      };

    default:
      return state;
  }
};
