import types from '../action_types';

const initialState = [
  {
    id: 0,
    from: 'btc',
    to: 'etc',
    value: 0.1,
    exchanges: [],
  },
  {
    id: 1,
    from: 'btc',
    to: 'ltc',
    value: 0.1,
    exchanges: [],
  }
];

export default function(state = initialState, action) {
  switch (action.type) {
    case types.UPDATE_HISTORY:
      return [...action.history];
    default:
      return state;
  }
}
