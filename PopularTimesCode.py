import populartimes
import secret
import fakedata

##print(populartimes.get(secret.APIKey, ["park"], (51.3494488,-0.0960801), (51.3689835,-0.0617154), all_places = False))
##print(populartimes.get(secret.APIKey, ["park"], (51.3494488,-0.0960801), (51.4251894,0.0476962), all_places = False))

for item in fakedata.bigSet:
    print(item['name'])
