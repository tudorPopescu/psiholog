import * as toast from 'toastr';

import 'toastr/build/toastr.css';
import './toastr.scss';

export const toastr = (type, message) => {
  toast.options.preventDuplicates = true;
  toast.options.timeOut = 1500;
  toast.options.extendedTimeOut = 1500;
  toast.options.progressBar = true;
  toast.options.closeButton = true;

  return type && message ? toast[type](message) : null;
};
