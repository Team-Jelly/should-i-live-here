import { SEARCH_ADDRESS, HISTORY } from '../constants/actionTypes';

const initialState = {
  address_search: '',
  previous_searches: [],
  current_results: null,
  longitude: 40.71,
  latitude: -74.00,
};

const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_ADDRESS:
      return {
        ...state,
        address_search: action.payload.address_search,
        previous_searches: [...state.previous_searches, action.payload.address_search],
        current_results: action.payload.current_results,
        longitude: action.payload.current_results[0].location.latitude,
        latitude: action.payload.current_results[0].location.longitude,
      };
    case HISTORY:
      return {
        ...state,
        previous_searches: [...state.previous_searches, action.payload],
      };
    default:
      return state;
  }
};

export default searchReducer;
