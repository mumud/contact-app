import { alertConstants } from '../../constants';

const alertReducer = (state = {}, action) => {
  switch (action.type) {
    case alertConstants.success:
      return {
        type: 'success',
        message: action.message,
      };
    case alertConstants.warning:
      return {
        type: 'warning',
        message: action.message,
      };
    case alertConstants.error:
      return {
        type: 'error',
        message: action.message,
      };
    case alertConstants.clear:
      return {};

    default:
      return state;
  }
};

export default alertReducer;
