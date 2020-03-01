########################################################################
#    Purpose: The purpose of this python script is to remove duplicate URLs
#    Author: Michael Rodriguez
#    Date: 02/17/2020
#########################################################################



#import necessary libraries
import os

# read in old list of urls which contains duplicates and write to the non duplicate urls into the new text file
oldUrlList = os.path.join(os.getcwd(),'old_myfridgefoodURLs.txt')
newUrlList = os.path.join(os.getcwd(),'myfridgefoodURLs.txt')
file = open(newUrlList, 'w')

with open(oldUrlList, 'r') as f:
    x = f.readlines()
    counter = 0
    # read each url from old list and verify that it does not end with a '/'
    for url in x:
        print(len(os.path.basename(url)))
        if (len(os.path.basename(url)) != 1):
            file.write(url)
file.close()