const { Schema } = require('mongoose');

// This is a subdocument schema, it won't become its own model but we'll use it as the schema for the User's `savedStats` array in User.js
const statsSchema = new Schema({
      makes: {
        type: Number,
      },
      misses: {
        type: Number,
      },
      shotType: {
        type: String,
      },
      x: {
        type: Number,
      },
      y: {
        type: Number,
      },
      courtLocation: {
        type: Number,
      },
      createdAt: Number,
      updatedAt: Number,
}, {
      timestamps: {currentTime: () => Math.floor(Date.now() / 1000) }    
});

module.exports = statsSchema;