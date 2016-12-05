export async function genericAction({
  dispatch,
  getState,
  getAsyncData,
  actionCreators: { initial, success, failure },
  extra
}) {
  const initialState = getState();
  !!initial && dispatch(initial({ extra, initialState }));

  let data;
  try {
    data = await getAsyncData({ extra, initialState, getState });
  } catch(error) {
    return !!failure && dispatch(failure({ extra, initialState, error, getState }));
  }

  return !!success && dispatch(success({ data, extra, initialState, getState }));
}


const asyncActionCreator = ({ extra, ...other }) => (dispatch, getState, reduxCustom) => {
  const arg = {
    ...other,
    dispatch,
    getState,
    extra: { ...extra, reduxCustom },
  };

  return genericAction(arg)
}

export default asyncActionCreator;