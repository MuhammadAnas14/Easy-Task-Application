const ErrorResponse = require("../utils/ErrorResponse");
const asyncHandler = require("../middleware/async");
const User = require("../models/user");
const sendTokenResponse = require("../middleware/tokenGenerate");

exports.googleLogin = asyncHandler(async (req, res, next) => {
  const { email, familyName, givenName, id, name, photoUrl } = req.body;

  const emailFound = await User.findOne({ email: email });

  let user;

  if (emailFound) {

    user = emailFound;
    
  } else {
    
    user = await User.create({
      firstName: givenName,
      lastName: familyName,
      email: email,
      googleId: id,
      picture: photoUrl,
    });
  }

  sendTokenResponse(user, 200, res);
});

exports.facebookLogin = asyncHandler(async (req, res, next) => {
  
  const { email, first_name, id, last_name, photoUrl } = req.body;

  console.log(req.body)

  const emailFound = await User.findOne({ email: email });

  let user;

  if (emailFound) {

    user = emailFound;
    
  } else {
    
    user = await User.create({
      firstName: first_name,
      lastName: last_name,
      email: email,
      facebookId: id,
      picture: photoUrl,
    });
  }

  sendTokenResponse(user, 200, res);
});
