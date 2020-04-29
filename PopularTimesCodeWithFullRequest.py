import populartimes
import secret

data = populartimes.get(secret.APIKey, ["park"], (51.3494488,-0.0960801), (51.3689835,-0.0617154), all_places = False)
##print(populartimes.get(secret.APIKey, ["park"], (51.3494488,-0.0960801), (51.4251894,0.0476962), all_places = False))

for item in data:
    print(item['name'])
