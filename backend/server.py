from flask import Flask, render_template, request
from flask_socketio import SocketIO
import json
from base64 import decodestring
import knn
import numpy as np
from PIL import Image
from io import BytesIO
import os.path

app = Flask(__name__)
socketio = SocketIO(app)

k = 1
training = False
label = "+/-"

def load_data():
    train_data = open("train.csv").read()
    train_data = train_data.split("\n")[1:-1]
    train_data = [i.split(",") for i in train_data]
    print(len(train_data))
    X_train = np.array([[int(i[j]) for j in range(1,len(i))] for i in train_data])
    y_train = np.array([str(i[0]) for i in train_data])

    return X_train, y_train

if not training:
    X_train, y_train = load_data()
    classifier = knn.simple_knn()
    classifier.train(X_train, y_train)

@app.route("/")
def index():
    return render_template('index.html',)

@socketio.on('send_image')
def handle_source(json_data):
    imgData = json_data['message'].split(',',1)[1] + '='
    pngFile = decodestring(imgData)
    img = Image.open(BytesIO(pngFile))
    arr = np.asarray(img.convert('L'))
    arr = np.reshape(arr, (1,1024))
    invArr = np.full((1, 1024), 255)
    arr = invArr - arr
    if(training):
        if os.path.isfile("train.csv"):
            with open("train.csv", "a") as f_handle:
                f_handle.write(label + ',')
                np.savetxt(f_handle, arr, fmt="%.0f", comments="", delimiter=",")
        else:
            header='label'
            for x in xrange(1024+1):
                header += ',pixel'+str(x)
            with open("train.csv", "w") as f_handle:
                f_handle.write(header + '\n' + label + ',')
                np.savetxt(f_handle, arr, fmt="%.0f", comments="", delimiter=",")
    else:
        predicted = classifier.predict(arr, k)
        print("Predicted " + str(predicted[0]))
        socketio.emit('echo', {'echo': str(predicted[0])}, room=request.sid)

if __name__ == "__main__":
    socketio.run(app, "0.0.0.0", 5000)
