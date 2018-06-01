const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  username: String,
  google: {
    id:String,
    token:String
  },
  tokens: [{
    createdAt: {
      type: Date,
      default: Date.now
    },
    access: {
      type: String,
      required: true
    },
    token: {
      type: String,
      required: true
    }
  }],
});

UserSchema.methods.toJSON = function () {
  var user = this;
  var userObject = user.toObject();

  // TODO: Filter password and other unnecessary stuff out of returned user.
  //return _.pick(userObject, ['_id', 'email']);
  return userObject
};

UserSchema.methods.generateAuthToken = () => {

  var user = this;
  var access = 'auth';

  var token = jwt.sign({ _id: user._id.toHexString(), access }, process.env.JWT_SECRET).toString();

  console.log('token:', token)

  user.tokens.push({ access, token });
  return user.save().then(() => {
    return token;
  });
};

UserSchema.methods.removeToken = function (token) {
  var user = this;

  return user.update({
    $pull: {
      tokens: { token }
    }
  })
}

UserSchema.statics.findByToken = function (token, roles = ['user']) {
  console.log("Finding by token...")
  var User = this;
  var decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (e) {
    return Promise.reject('Authentication Failed. Find By Token.');
  }
  return User.findOne({
    '_id': decoded._id,
    'roles': {
      $in: roles
    },
    'tokens.token': token,
    'tokens.access': 'auth'
  })

};

UserSchema.statics.findByCredentials = function (email, password) {
  var User = this;
  return User.findOne({ email }).then((user) => {
    if (!user) {
      return Promise.reject();
    }
    return new Promise((resolve, reject) => {
      bcrypt.compare(password, user.password, (err, res) => {
        if (res) {
          resolve(user);
        } else {
          reject();
        }
      });
    });
  })
}

UserSchema.pre('save', function (next) {
  var user = this;
  if (user.isModified('password')) {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, (err, hash) => {
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
})

const User = mongoose.model('ex_user', UserSchema)

module.exports = User;