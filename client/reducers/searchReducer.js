import { SEARCH_ADDRESS, HISTORY } from '../constants/actionTypes';

const initialState = {
  address_search: '',
  previous_searches: [],
  current_results: null,
};

const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_ADDRESS:
      return {
        ...state,
        address_search: action.payload.address_search,
        previous_searches: [...state.previous_searches, action.payload.address_search],
        current_results: action.payload.current_results,
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
