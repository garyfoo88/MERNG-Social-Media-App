const jwt = require("jsonwebtoken");
const { AuthenticationError } = require("apollo-server");

module.exports = (context) => {
  //context should containt {...headers}
  const authHeader = context.req.headers.authorization;
  if (authHeader) {
    //Bearer...
    const token = authHeader.split("Bearer ")[1];
    if (token) {
      try {
        const user = jwt.verify(token, process.env.JWT_SECRET);
        return user;
      } catch (err) {
        throw new AuthenticationError("Invalid/Expired");
      }
    }
    throw new Error("Authentication token error")
  }
  throw new Error("Authorization header must be provided")
};
