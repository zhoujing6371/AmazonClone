const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bcrypt = require('bcrypt-nodejs'); // a library to encrypt ang strings
const crypto = require('crypto');

const UserSchema = new Schema({
  email: { type: String, unique: true, lowercase: true },
  name: String,
  password: String,
  picture: String,
  isSeller: { type: Boolean, default: false },
  address: {
    addr1: String,
    addr2: String,
    city: String,
    state: String,
    country: String,
    postalCode: String
  },
  created: { type: Date, default: Date.now },
});


UserSchema.pre('save', function(next) {// It will increase depass password before saving the password attribute to the database.
  var user = this;

  if (!user.isModified('password')) return next();
  
  bcrypt.hash(user.password, null, null, function(err, hash) {
    if (err) return next(err);
    
    user.password = hash;
    next();
  });
});

UserSchema.methods.comparePassword = function(password) {
  return bcrypt.compareSync(password, this.password); // compare the password you typed in with a password that has been encrypted in the database
};

// generate an image for us everytime a user sign up it.  
UserSchema.methods.gravatar = function(size) { //Gravatar is a website api that will generate a generic picture and it is free to use
  if (!this.size) size = 200;
  if (!this.email) {// id the email is not exist, we should return a default http route which telling that gravatar provides
    return 'https://gravatar.com/avatar/?s' + size + '&d=retro';
  } else {
    var md5 = crypto.createHash('md5').update(this.email).digest('hex');
    return 'https://gravatar.com/avatar/' + md5 + '?s' + size + '&d=retro'; 
  }

}

module.exports = mongoose.model('User', UserSchema);


