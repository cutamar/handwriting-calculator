# handwriting-calculator

Handwriting calculator written in Python 2.7 using Flask and SocketIO.

For the handwriting recognition part I am using the KNN algorithm, implemented from scratch.

The reason I did this was, to improve my understanding of how the KNN algorithm works.

The code will be refactored in the near future, because it's unorganized, missing comments etc.

Demo: [Click here](http://handwriting-calculator.herokuapp.com/)

## Training

The 'train.csv' contains only 20 different samples for every number/character, entered by me.

With only 20 samples, KNN can't do it's very best. But further training is possible.

You can change the variable 'training' to True in 'server.py' and set variable 'label' to the number/character you want to train.

After this, you just run the server.py locally, and everytime you click on predict, nothing will be predicted, but the data will be added to the training data.

When finished, just change 'training' in 'server.py' back to False.

## Deploying locally

Make sure you have [Python 2.7](https://www.python.org/downloads/) installed.

```sh
git clone https://github.com/cutamar/handwriting-calculator.git # or clone your own fork
cd handwriting-calculator
pip install -r requirements.txt # or create a virtualenv and install them into it
python server.py
```

Your app should now be running on [localhost:5000](http://localhost:5000/).

## Deploying to Heroku

Make sure you have the [Heroku Toolbelt](https://toolbelt.heroku.com/) installed.

```
heroku create
git push heroku master
heroku open
```

Alternatively, you can deploy your own copy of the app using this button:

[![Deploy to Heroku](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy)
