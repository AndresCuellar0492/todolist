const AUTH_BASE = 'auth';

export const OPERATIONS_AUTH = {
  SIGNIN: operationJoin('signin'),
  SIGNOUT: operationJoin('signout'),
  SIGNUP: operationJoin('signup'),
  VERIFICATION_CODE_EMAIL: operationJoin('generate-code'),
  VALIDATE_CODE_EMAIL: operationJoin('validate-code'),
  UPDATE_PASSWORD: operationJoin('update-password'),
};

function operationJoin(OPERATION: string) {
  return `${AUTH_BASE}/${OPERATION}`;
}
