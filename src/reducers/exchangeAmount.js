import types from '../action_types';

const initialState = null;

export default function(state = initialState, action) {
  switch (action.type) {
    case types.FETCH_EXCHANGE_AMOUNT_SUCCESS:
      return action.amount;
    default:
      return state;
  }
}
