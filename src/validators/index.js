import * as authFunctions from "./auth.validator.js";
import * as forgetPasswordAndPinFunctions from "./forgetpasswortandpin.validator.js";

export default {
  ...authFunctions,
  ...forgetPasswordAndPinFunctions,
};
