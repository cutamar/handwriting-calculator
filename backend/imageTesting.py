import numpy
from PIL import Image
import csv

def PIL2array(img):
    return numpy.asarray(img.convert('L'))

def array2PIL(arr):
    return Image.fromarray(arr)

def main():
    img = Image.open('test.png')
    arr = PIL2array(img)
    arr = numpy.reshape(arr, (1,1024))
    arr = numpy.insert(arr, 0, 3)
    arr = numpy.reshape(arr, (1,1025))
    print arr.shape
    print arr[0]
    header='label'
    for x in xrange(1024+1):
        header += ',pixel'+str(x)
    print header
    # with open("test.csv", "w") as output:
    #     writer = csv.writer(output, lineterminator='\n')
    #     for val in arr:
    #         writer.writerow([val])   
    with open("test.csv", "a") as f_handle:
        numpy.savetxt(f_handle, arr, fmt="%.0f", comments="", header=header, delimiter=",")
    #with open("test.csv", "wb") as f:
        #numpy.savetxt(f, arr, delimiter=",")
    #img2 = array2PIL(arr)
    #img2.save('out.png')

if __name__ == '__main__':
    main()