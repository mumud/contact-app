import { alertConstants } from '../../constants';

export const alertActions = {
  success,
  error,
  clear,
  warning,
};

function success(message) {
  return { type: alertConstants.success, message };
}

function warning(message) {
  return { type: alertConstants.warning, message };
}

function error(message) {
  return { type: alertConstants.error, message };
}

function clear() {
  return { type: alertConstants.clear };
}
