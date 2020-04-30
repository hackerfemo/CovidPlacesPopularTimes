import populartimes
import matplotlib.pyplot as plt; plt.rcdefaults()
import numpy as np
import fakedata

def Overview(dataset):
	for item in dataset:
		print("name: "+item['name'], "    Moday poulartimes: " + str(item['populartimes'][0]['data']))

Overview(fakedata.bigSet)
