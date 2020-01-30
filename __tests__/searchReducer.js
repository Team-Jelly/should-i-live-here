import { SEARCH_ADDRESS } from '../client/constants/actionTypes';
import subject from '../client/reducers/searchReducer';

describe('Test search reducer functionality', () => {
  let state; 

  beforeEach(() => {
    state = {
      address_search: '',
      previous_searches: [],
      current_results: null,
    };
  });
  describe('Test SEACH_ADDRESS', () => {
    const actionType = {
      type: SEARCH_ADDRESS,
      payload: {
        address_search: '27 Lake St Brooklyn',
        current_results: 'some good data',
      },
    };
    const newState = {
      address_search: '27 Lake St Brooklyn',
      previous_searches: ['27 Lake St Brooklyn'],
      current_results: 'some good data',
    };
    it('test SEARCH_ADDRESS works', () => {
      expect(subject(state, actionType)).toEqual(newState);
    });
  });

  describe('Test DEFAULT', () => {
    const actionType = {
      type: 'ADDRESS',
      payload: {
        address_search: '27 Lake St Brooklyn',
        current_results: 'some good data',
      },
    };
    it('test that default state is returned if no switch case is hit', () => {
      expect(subject(state, actionType)).toEqual(state);
    });
  });
});
