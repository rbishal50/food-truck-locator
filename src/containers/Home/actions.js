import {
  GET_ALL_DATA,
  GET_ALL_DATA_ERROR,
  GET_ALL_DATA_SUCCESS,
} from './constants';

export const getAllData = () => {
  return { type: GET_ALL_DATA };
};
export const getAllDataSuccess = (payload) => {
  return { type: GET_ALL_DATA_SUCCESS, payload };
};
export const getAllDataError = (error) => {
  return { type: GET_ALL_DATA_ERROR, error };
};
