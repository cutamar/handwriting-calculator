$(document).ready(function() 
{
        var socket = io.connect('http://' + document.domain + ':' + location.port);
        socket.on('echo', onReceived);
        
        function onReceived(data){
            console.log(data.echo);
        }
        
        function send(){
            socket.emit('send_message', {message : "Test"});
        }

        send();
});