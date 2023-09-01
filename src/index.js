
        const socket = io();
        var room;
       var fullname;
        socket.on("roomno", (args) => {
            
            room = args;
            
        })
        function send()
        {
            const message= document.getElementById('text').value;
          
            var my= document.createElement('p');
           my.setAttribute('class', 'me');
           my.innerHTML=message;
           document.getElementById('msgBox').appendChild(my);

            socket.emit("sendMsg", [message,room]);
            document.getElementById('text').value="";
            document.getElementById('msgBox').scrollTo(0,document.getElementById('msgBox').scrollHeight);
            showbtn();
        }
function showbtn()
{
    const message= document.getElementById('text').value;
    if(message!="")
    {
        document.getElementById('submit').style.visibility="visible";
    }
    else{
        document.getElementById('submit').style.visibility="hidden";
    }
    
}


function details()
    {
     fullname= document.getElementById('fname').value; 
     localStorage.setItem('varname', fullname);
    }

    setInterval(function()
      {
          socket.emit("detail", localStorage.getItem('varname'));
      },1000);

    socket.on('details', args =>
    {
        document.getElementById('person').innerHTML=args;
    })

        socket.on('recieveMsg' ,(args)=>
        {

            var you= document.createElement('p');
           you.setAttribute('class', 'you');
           you.innerHTML=args;
           document.getElementById('msgBox').appendChild(you);
            
        });

     

    