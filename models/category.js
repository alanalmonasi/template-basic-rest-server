const { Schema, model } = require('mongoose');

const CategorySchema = Schema({
   name: {
      type: String,
      required: [true, 'A name is mandatory'],
      unique: true,
   },
   active: {
      type: Boolean,
      default: true,
      required: true,
   },
   user: {
      type: Schema.Types.ObjectId, // Telling that this will point to a user
      ref: 'User',
      required: true,
   },
});

CategorySchema.methods.toJSON = function () {
   const { __v, ...category } = this.toObject();
   return category;
};

module.exports = model('Category', CategorySchema);
