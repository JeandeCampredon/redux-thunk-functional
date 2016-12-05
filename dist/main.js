var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

export let genericAction = (() => {
  var _ref = _asyncToGenerator(function* ({
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
      data = yield getAsyncData({ extra, initialState, getState });
    } catch (error) {
      return !!failure && dispatch(failure({ extra, initialState, error, getState }));
    }

    return !!success && dispatch(success({ data, extra, initialState, getState }));
  });

  return function genericAction(_x) {
    return _ref.apply(this, arguments);
  };
})();

const asyncActionCreator = (_ref2) => {
  let { extra } = _ref2;

  let other = _objectWithoutProperties(_ref2, ["extra"]);

  return (dispatch, getState, reduxCustom) => {
    const arg = _extends({}, other, {
      dispatch,
      getState,
      extra: _extends({}, extra, { reduxCustom })
    });

    return genericAction(arg);
  };
};

export default asyncActionCreator;
