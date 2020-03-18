import requests
from datetime import date
import json

# MAKE SURE YOU USE YOUR API KEY!
# MAKE SURE TO START OFF WITH THE MOST RECENT ID YOU SEE IN THE '/spoonacular_recipes' folder

today = date.today()

date_filename = today.strftime("%Y%m%d")

# CHANGE THESE NUMBERS!!!
start = 130
end = 260  # max for free tier is 150 a day, so I incremented by 130, to be safe

api_key = 'c1de684c34644eb29f056d11a35d94b0'  # MY's key

# Grabs 10 entries at a time
for i in range(start, end, 1):
    print(f"Scraping ID: {i}")
    try:
        data = requests.get(f"https://api.spoonacular.com/recipes/informationBulk?ids={i}&includeNutrition=true&apiKey={api_key}")
        f = open(f"./spoonacular_recipes/{date_filename}_{api_key}_{i}.json", "w")
        json.dump(data.json(), f)
        f.close()
    except:
        pass
