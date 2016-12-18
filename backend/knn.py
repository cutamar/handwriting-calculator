import numpy as np
from collections import Counter
import time
from PIL import Image

# load csv files to numpy arrays
def load_data():
    train_data = open("train.csv").read()
    train_data = train_data.split("\n")[1:-1]
    train_data = [i.split(",") for i in train_data]
    print(len(train_data))
    X_train = np.array([[int(i[j]) for j in range(1,len(i))] for i in train_data])
    y_train = np.array([int(i[0]) for i in train_data])

    print(X_train.shape, y_train.shape)

    # test_data = open(data_dir + "test.csv").read()
    # test_data = test_data.split("\n")[1:-1]
    # test_data = [i.split(",") for i in test_data]
    # # print(len(test_data))
    # X_test = np.array([[int(i[j]) for j in range(0,len(i))] for i in test_data])

    # # print(X_test.shape)

    return X_train, y_train#, X_test


class simple_knn():
    "a simple kNN with L2 distance"

    def __init__(self):
        pass

    def train(self, X, y):
        self.X_train = X
        self.y_train = y

    def predict(self, X, k=1):
        dists = self.compute_distances(X)
        # print("computed distances")

        num_test = dists.shape[0]
        y_pred = np.zeros(num_test)

        for i in range(num_test):
            k_closest_y = []
            labels = self.y_train[np.argsort(dists[i,:])].flatten()
            # find k nearest lables
            k_closest_y = labels[:k]

            # out of these k nearest lables which one is most common
            # for 5NN [1, 1, 1, 2, 3] returns 1
            # break ties by selecting smaller label
            # for 5NN [1, 2, 1, 2, 3] return 1 even though 1 and 2 appeared twice.
            c = Counter(k_closest_y)
            y_pred[i] = c.most_common(1)[0][0]

        return(y_pred)

    def compute_distances(self, X):
        num_test = X.shape[0]
        num_train = self.X_train.shape[0]

        dot_pro = np.dot(X, self.X_train.T)
        sum_square_test = np.square(X).sum(axis = 1)
        sum_square_train = np.square(self.X_train).sum(axis = 1)
        dists = np.sqrt(-2 * dot_pro + sum_square_train + np.matrix(sum_square_test).T)

        return(dists)

X_train, y_train = load_data()

# predict labels for batch_size number of test images at a time.
batch_size = 2000
# k = 3
k = 1
classifier = simple_knn()
classifier.train(X_train, y_train)

img = Image.open('test.png')
arr = np.asarray(img.convert('L'))
arr = np.reshape(arr, (1,1024))
np.set_printoptions(threshold=np.nan)
arr = np.insert(arr, [1], arr[0])
arr = np.reshape(arr, (2,1024))
print(arr)
predicted = classifier.predict(arr, k)
print("Predicted: " + str(predicted))