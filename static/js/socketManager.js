var socket;

function onReceived(data){
    console.log(data.echo);
    if(data.echo === "/" || data.echo === "*" || data.echo === "-" || data.echo === "+" || data.echo === "+/-")
    {
        operatorClicked(null, data.echo);
    }
    else if(data.echo === "=")
    {
        equalClicked();
    }
    else
    {
        keyClicked(null, data.echo);
    }
}

function send(img){
    socket.emit('send_image', {message : img});
}

$(document).ready(function() 
{
        socket = io.connect(location.protocol + '//' + document.domain + ':' + location.port);
        socket.on('echo', onReceived);

});
