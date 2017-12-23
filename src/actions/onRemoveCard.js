import types from '../action_types';

export default (id) =>
  (dispatch, getState) => {
    const { history } = getState();
    let filteredHistory = history.filter(item => item.id !== id);
    if (!filteredHistory.length) {
      filteredHistory = [{ from: 'btc', to: 'etc', value: 0.1, id: 0, exchanges: [] }];
    }
    dispatch({
      type: types.REMOVE_HISTORY_ITEM,
      history: filteredHistory,
    });
  }
