const User = require("../../models/User");

module.exports = {
  Mutation: {
    register(
      _,
      { registerInput: { username, email, password, confirmPassword } },
      context,
      info
    ) {
      //TODO: Validate user data
      //Make sure user doesnt already exist
      //Hash password and create auth token
    },
  },
};
