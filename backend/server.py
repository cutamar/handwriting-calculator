from flask import Flask, render_template
from flask_socketio import SocketIO
import json
from base64 import decodestring

app = Flask(__name__)
socketio = SocketIO(app)

@app.route("/")
def index():
    return render_template('index.html',)

@socketio.on('send_image')
def handle_source(json_data):
    imgData = json_data['message'].split(',',1)[1] + '='
    pngFile = decodestring(imgData)
    with open("test.png","wb") as f:
        f.write(pngFile)
    #text = json_data['message'].encode('ascii', 'ignore')
    #socketio.emit('echo', {'echo': 'Server Says: '+text})

if __name__ == "__main__":
    socketio.run(app)