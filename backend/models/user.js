// schema for the user collection
const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");


// the basic schema
const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: false, unique: true },
  password: { type: String, required: true },
  gender: { type: String, required: true },
  dob: { type: Date, required: true },
  bio: { type: String, required: false },
  profilePcture: { type: String, required: false },
  coverPhoto: { type: String, required: false },
  verificationStatus: { type: Boolean, required: true },
  timestamp: { type: Date, default: Date.now }
});

// methods for the schema

// signup method
userSchema.statics.signup = async function(fName, lName, email, dob, phone, gender, password){
  // validating email
  if (!validator.isEmail(email) || !(email.includes("@g.bracu.ac.bd") || email.includes("@bracu.ac.bd"))) {
    throw Error("Invalid email");
  }

  // validating password
  if (!validator.isStrongPassword(password)) {
    throw Error("Weak password");
  }

  // checking if the email already exists
  const exists = await this.findOne({ email: email });
  if (exists) {
    throw Error("User already exists");
  }

  // new user detected. so hashing the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // creating the new user
  const newUser = await this.create({
    firstName: fName,
    lastName: lName,
    email: email,
    phone: phone,
    password: hashedPassword,
    gender: gender,
    dob: dob,
    bio: "",
    profilePcture: "",
    coverPhoto: "",
    verificationStatus: false
  });

  return newUser;
}

// login method
userSchema.statics.login = async function(email, password){
  // validating email
  const user = await this.findOne({ email: email });
  if (!user) {
    throw Error("Incorrect email");
  }

  // validating password
  if (!(await bcrypt.compare(password, user.password))) {
    throw Error("Incorrect password");
  }

  return user;
}

const userModel = mongoose.model("users", userSchema);
module.exports = userModel;
