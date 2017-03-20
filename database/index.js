'use strict';

const config = require('../config/mongo.js');
const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');

let connection = mongoose.connect(`mongodb://${config.login}:${config.password}@ds033976.mlab.com:33976/rarus_db_title`);
autoIncrement.initialize(connection);

module.exports.todo = function() {
  // Use native promises
  mongoose.Promise = global.Promise;

  let TodoSchema = mongoose.Schema({
    title: String,
    done: Boolean,
    date: {
      type: Date,
      default: Date.now
    }
  });
  TodoSchema.plugin(autoIncrement.plugin, { model: 'Todo', field: 'id' });

  return mongoose.model('Todo', TodoSchema);
};
