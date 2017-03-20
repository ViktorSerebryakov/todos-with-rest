var express = require('express');
var router = express.Router();
var database = require('../database');
var Todo = database.todo();

router.get('/api/', function(req, res) {

  Todo.find(function (err, todos) {
    if (err) return console.error(err);
    res.send(todos);
  });
});

router.post('/api/', function(req, res) {
  var body = {
    title: req.body.title,
    done: req.body.done
  };
  var todo = new Todo(body);
  Todo.create(todo, function(err, todo) {
    if (err) return console.error(err);
    res.send(todo);
  });

});

router.put('/api/:id', function(req, res) {
  var id = req.params.id;
  var opts = { strict: false };
  var update = {
    title: req.body.title,
    done: req.body.done
  };
  console.log(update);
  Todo.update({id: id}, update, opts, function(err, raw) {
    if (err) return console.error(err);
    res.send({modified: raw.nModified});
  });
});

router.delete('/api/:id', function(req, res) {
  var id = req.params.id;
  Todo.remove({ id: id }, function(err) {
    if (err) return console.error(err);
    res.send({removed: "success"});
  });
});

module.exports = router;