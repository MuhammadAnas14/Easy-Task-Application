const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
    default: "",
  },
  phone: {
    type: String,
    default: "",
  },
  picture: {
    type: String,
    default: "",
  },
  googleId: {
    type: String,
    default: ""
  },
  facebookId: {
    type:String,
    default: "",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  Emailverify: {
    type: Boolean,
    default: false,
  },
  Phoneverify: {
    type: Boolean,
    default: false,
  },
});

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.getSignedJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};


UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("Users", UserSchema);
