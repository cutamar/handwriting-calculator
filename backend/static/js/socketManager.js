var socket;

function onReceived(data){
    console.log(parseInt(data.echo));
    keyClicked(parseInt(data.echo));
}

function send(img){
    socket.emit('send_image', {message : img});
}

$(document).ready(function() 
{
        socket = io.connect('http://' + document.domain + ':' + location.port);
        socket.on('echo', onReceived);

});
