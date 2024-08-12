const Auth = Object.freeze({

  MESSAGES: {
    INTERNAL_SERVER_ERROR: 'internal server error',
    SOMETHING_WENT_WRONG: 'Something went wrong',
    CANNOT_FULFILL_THE_REQUEST: 'Cannot fulfill the request',
    AUTHHEADER_EMPTY:'Authorization Header is empty',
    TOKEN_IS_NULL: 'Header does not contain Token'
  }

});

module.exports = Auth;
