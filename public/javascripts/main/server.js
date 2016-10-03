/**
 * Created by Sahin on 02/10/16.
 */

var express = require('express');
var app = express();
var PORT = process.env.PORT || 3000;
var nextId = 1;

var _ = require('underscore');


var bodyParser = require('body-parser');

app.use(bodyParser.json());


var todos = [{
    id: 1,
    desription: 'Go to metrobus',
    completed: false
},

    {
        id: 2,
        desription: 'Go to sok market',
        completed: false

    }];


app.get('/', function (req, res) {
    res.send('To do root.');
});


app.get('/todos', function (req, res) {
    res.send(todos);
});


app.get('/todos/:id', function (req, res) {

    var reqId = parseInt(req.params.id, 10);
    var matchedTodo = _.findWhere(todos, {id: reqId});

    if (matchedTodo) {
        res.send(matchedTodo);
    }
    else {
        res.status(404).send('No to to found !');
    }
});

app.post('/todos', function (req, res) {
    var body = req.body;


    if (!_.isBoolean(body.completed) || !_.isString(body.description) || body.description.trim().length === 0) {
        return res.status(400).send();
    }
    body.id = nextId++;

    todos.push(body);

    res.json(body);
});


app.delete('/todos/:id', function (req, res) {
    var todoId = parseInt(req.params.id);

    var matchedTodo = _.findWhere(todos, {id: todoId});

    if (!matchedTodo) {

        res.status(400).send({"error": " no to do item found with the specified id"});
    }

    else {
        todos = _.without(todos, matchedTodo);
        res.json(matchedTodo);
    }
});


app.listen(PORT, function () {
    console.log('Server listening on port ' + PORT);
});
