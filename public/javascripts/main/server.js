/**
 * Created by Sahin on 02/10/16.
 */

var express = require('express');
var app = express();
var PORT = process.env.PORT || 3000;


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
    res.send(JSON.stringify(todos));
});


app.get('/todos/:id', function (req, res) {
    var matchedTodo;
    var reqId = parseInt(req.params.id, 10);

    todos.forEach(function (todo) {
        if (reqId == todo.id) {
            matchedTodo = todo;
        }
    })

    if (matchedTodo) {
        res.send(matchedTodo);
    }
    else {
        res.status(404).send('No to to found !');
    }
});


app.listen(PORT, function () {
    console.log('Server listening on port ' + PORT);
});
