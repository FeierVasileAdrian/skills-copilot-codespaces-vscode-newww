```
// Create web server
```
var express = require('express');
var app = express();
var http = require('http');
var server = http.createServer(app);
```
// Set up socket.io
```
var socketio = require('socket.io');
var io = socketio.listen(server);
```
// Set up mongoose
```
var mongoose = require('mongoose');
```
// Connect to database
```
mongoose.connect('mongodb://localhost/comments');
```
// Create schema
```
var commentSchema = new mongoose.Schema({
    name: String,
    comment: String
});
```
// Create model
```
var Comment = mongoose.model('Comment', commentSchema);
```
// Create static route
```
app.use(express.static(__dirname + '/public'));
```
// Create GET route
```
app.get('/', function(req, res) {
    res.sendfile(__dirname + '/public/index.html');
});
```
// Create POST route
```
app.post('/comment', function(req, res) {
    var comment = new Comment(req.body);
    comment.save(function(err) {
        if (err) {
            console.log(err);
        } else {
            res.redirect('/');
        }
    });
});
```
// Listen on port 3000
```
server.listen(3000, function() {
    console.log('Listening on port 3000');
});
```
// Set up socket.io
```
io.on('connection', function(socket) {
    console.log('A user connected');
    socket.on('disconnect', function() {
        console.log('A user disconnected');
    });
});
```
// Export app
```
module.exports = app;
```
// Path: public/index.html
```
<!DOCTYPE html>
<html>
<head>
    <title>Comments</title>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
    <script src="/socket.io/socket.io.js"></script>
    <script>
        var socket = io();
        $('form').submit(function() {
            var name = $('#name').val();
            var comment = $('#comment').val();
            var data = {
                name: name,
                comment: comment
            };
            socket.emit('comment', data);
            return false;
        });
    </script>
</head>
<body>
    <form>
        <input type="text" id="name" placeholder="Name"><br>
        <




