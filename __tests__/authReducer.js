// import { TRUE } from 'node-sass';
import { SIGN_IN, REGISTER, LOGOUT } from '../client/constants/actionTypes';
import subject from '../client/reducers/authReducer';

describe('Authentication reducer', () => {
  let state;

  beforeEach(() => {
    state = {
      currentUser: null,
      isLogged: false,
    };
  });

  describe('SIGN_IN, but account doesnt exist', () => {
    const noAccount = {
      type: SIGN_IN,
      payload: null,
    };

    it('should return a default state', () => {
      expect(subject(state, noAccount)).toEqual(state);
    });
  });

  describe('SIGN_IN, has an acount', () => {
    const actionWithAccount = {
      type: SIGN_IN,
      payload: { name: 'cb', email: 'cb@gmail.com' },
    };

    const expectedState = {
      currentUser: { name: 'cb', email: 'cb@gmail.com' },
      isLogged: true,
    };

    it('test all of them', () => {
      expect(expectedState).toEqual(subject(state, actionWithAccount));
    });
  });

  describe('REGISTER', () => {
    const actionRegister = {
      type: REGISTER,
      payload: { name: 'cb', email: 'cb@gmail.com' },
    };

    const expectedState = {
      currentUser: { name: 'cb', email: 'cb@gmail.com' },
      isLogged: true,
    };

    it('test all of them', () => {
      expect(subject(state, actionRegister)).toEqual(expectedState);
    });
  });

  describe('LOGOUT', () => {
    const actionLogout = {
      type: LOGOUT,
      payload: [],
    };

    it('test logout', () => {
      expect(subject(state, actionLogout)).toEqual(state);
    });
  });
});
