var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var myParser = require("body-parser");

var pako = require('pako'); //Compression

app.use(express.static(__dirname));
app.get('/projects', function(req, res){
  res.sendFile('home.html', { root: __dirname });
});

function init(socket){
  socket.emit('init',true);
  socket.on('bndMove', function(packet){
    io.emit('update', packet);
  });
  socket.on('del', function(id){
    io.emit('del', id);
  });
  socket.on('disconnect', function(){
    io.emit('clientLeave', socket.id);
  });
}

//Eventual batch client update, better performance but less fluid clientside
// setInterval(()=>{
//   if(moving.length > 0){
//     console.log('Sending '+moving.length+' updates');
//     io.emit('update', moving);
//     moving = [];
//   }
// },1000);

function hash(str){
  var hash = 0, i, chr;
  if (str.length === 0) return hash;
  for (i = 0; i < this.length; i++) {
    chr   = str.charCodeAt(i);
    hash  = ((hash << 5) - hash) + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
}

io.on('connection',init);
http.listen(8080, ()=>{console.log("Running...")});
