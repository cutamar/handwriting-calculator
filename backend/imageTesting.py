import numpy
from PIL import Image

def PIL2array(img):
    return numpy.array(img)

def array2PIL(arr):
    return Image.fromarray(arr)

def main():
    img = Image.open('test.png')
    arr = PIL2array(img)
    print arr[23,45]
    #with open("test.csv", "wb") as f:
        #numpy.savetxt(f, arr, delimiter=",")
    #img2 = array2PIL(arr)
    #img2.save('out.png')

if __name__ == '__main__':
    main()