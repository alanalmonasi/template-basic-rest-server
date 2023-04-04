const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
   name: {
      type: String,
      required: [true, 'Name is mandatory'],
   },
   email: {
      type: String,
      required: [true, 'An email is required'],
      unique: true,
   },
   password: {
      type: String,
      required: [true, 'You need a password'],
   },
   img: {
      type: String,
   },
   role: {
      type: String,
      required: true,
      enum: ['admin_role', 'user_role'],
   },
   active: {
      type: Boolean,
      default: true,
   },
   google: {
      type: Boolean,
      default: false,
   },
});

UserSchema.methods.toJSON = function () {
   const { __v, password, ...user } = this.toObject();
   return user;
};

module.exports = model('User', UserSchema);
