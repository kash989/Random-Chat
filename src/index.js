
        const socket = io();
        var room;
        
        socket.on("roomno", (args) => {
            
            room = args;
            
        })
        function send()
        {
            const message= document.getElementById('txt').value;
          
            var my= document.createElement('p');
           my.setAttribute('class', 'me');
           my.innerHTML=message;
           document.getElementById('messages').appendChild(my);

            socket.emit("sendMsg", [message,room]);
            document.getElementById('txt').value="";
            document.getElementById('messages').scrollTo(0,document.getElementById('messages').scrollHeight);
            showbtn();
        }
function showbtn()
{
    const message= document.getElementById('txt').value;
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
    var gender= document.querySelector("input[type='radio'][name=gndr]:checked").value;
    var arr=[fullname,gender];
     localStorage.setItem('varname', JSON.stringify(arr));
    }

    setInterval(function()
      {
        console.log(room);
          socket.emit("detail", [JSON.parse(localStorage.getItem('varname')),room]);
      },1000);

    socket.on('details', args =>
    {
        document.getElementById('person').innerHTML=args[0][0];
        if(args[0][1]=="Male")
        {
            document.getElementById("icon").src="boy.avif";
        }
        else{
            document.getElementById("icon").src="girl.avif";
        }
    })

        socket.on('recieveMsg' ,(args)=>
        {

            var you= document.createElement('p');
           you.setAttribute('class', 'you');
           you.innerHTML=args;
           document.getElementById('messages').appendChild(you);
            
        });

     

    
