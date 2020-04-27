import populartimes
import matplotlib.pyplot as plt; plt.rcdefaults()
import numpy as np
import matplotlib.pyplot as plt
import fakedata

def popularTimesReporter(dataset):
	for item in dataset:
	    #print(item['name'], item['types'][0])
	    print(item['populartimes'][0]['data'])

def PlotPopularTimes_BarChart(placeData):
	print("making bar chart")
	popularTimes = placeData['populartimes']
	data = popularTimes[0]['data']
	hours = []
	for i in range(0, 24):
		hours.append(i)
	plt.bar(hours, data, align='center', alpha=0.5)
	plt.ylabel('Popularity')
	plt.title('Popular Times at %s - %s'%(placeData['name'], popularTimes[0]['name']))
	plt.show()

#popularTimesReporter(fakedata.smallSet)
for place in fakedata.bigSet:
	#item = fakedata.bigSet[40]
	PlotPopularTimes_BarChart(place)