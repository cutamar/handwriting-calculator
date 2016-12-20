import numpy as np

train_data = open("train.csv").read()
train_data = train_data.split("\n")[1:-1]
train_data = [i.split(",") for i in train_data]
#print(train_data)
X_train = np.array([[int(i[j]) for j in range(1,len(i))] for i in train_data])
y_train = np.array([int(i[0]) for i in train_data])
invArr = np.full((30, 1024), 255)
X_train = invArr - X_train
print X_train
with open("test.csv", "a") as f_handle:
    np.savetxt(f_handle, X_train, fmt="%.0f", comments="", delimiter=",")
