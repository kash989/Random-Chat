const express = require("express");
const bodyParser = require("body-parser");
const { createServer } = require("http");
const { Server } = require("socket.io");

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

app.use(express.static(__dirname + "/src"));
app.use(bodyParser.urlencoded({extended:true}));

var room=1;
var numOfClients=0;
var name;

app.get('/', function(req,res)
{
    res.sendFile("home");
});

app.post("/", function(req,res)
{
   name=req.body.fullName;
 res.sendFile(__dirname + "/src/chat.html");
});

io.on("connection", (socket) => {
  // ...
  if(numOfClients<2)
  {
    socket.join('room'+ room);
    socket.emit('roomno', room);
    
    numOfClients+=1;
  }
  else{
    
    room+=1;
    socket.join('room'+ room);
    socket.emit('roomno', room);
    
    numOfClients=1;
  }

  socket.on('detail',(args)=>
  {
    socket.in('room'+ room).emit("details",args);
    
  })

 socket.on('sendMsg', (arg)=>
 {
socket.in('room'+ arg[1]).emit('recieveMsg',arg[0]);
 })
 
 
});

httpServer.listen(3000);