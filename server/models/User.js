const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

// import schema
const statsSchema = require('./PlayerStats');
// const preferencesSchema = require('./Preferences')

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, 'Must use a valid email address'],
    },
    password: {
      type: String,
      required: true,
    },
    createdAt: Number,
    updatedAt: Number,
    // set savedStats to be an array of data that adheres to the statsSchema
    savedStats: [statsSchema],
    // savedPreferences: [preferencesSchema]
  },
  // set this to use virtual below
  {
    toJSON: {
      virtuals: true,
    }
  },
  {
     // Make Mongoose use Unix time
    timestamps: {currentTime: () => Math.floor(Date.now() / 1000) } 
  }
)

// hash user password
userSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// custom method to compare and validate password for logging in
userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const User = model('User', userSchema);

module.exports = User;
