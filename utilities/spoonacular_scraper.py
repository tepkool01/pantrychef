import requests
from datetime import date
import json

# MAKE SURE YOU USE YOUR API KEY!
# MAKE SURE TO START OFF WITH THE MOST RECENT ID YOU SEE IN THE '/spoonacular_recipes' folder

today = date.today()

date_filename = today.strftime("%Y%m%d")

# CHANGE THESE NUMBERS!!!
threshold = 5000
i_start = 12984
end = i_start + threshold

headers = {
    'x-rapidapi-host': "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
    'x-rapidapi-key': "c1b6b44f32msh46215ad950d6ccdp19de70jsnc0f3dc6ce799"
}

querystring = {
    "ids": "",
    "includeNutrition": "true"
}

url = "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/informationBulk"

while i_start < end:

    try:
        querystring['ids'] = str(i_start)
        response = requests.request("GET", url, headers=headers, params=querystring)

        # Continue on failures, as they don't cost us money. Keep going
        if response.status_code != 200:
            print(f"\nFAIL: {i_start} failed to parse")
            i_start += 1
            continue

        # Write contents to file
        f = open(f"./spoonacular_recipes/{date_filename}_student_{i_start}.json", "w")
        json.dump(response.json(), f)
        f.close()

        # Exit so I'm not over-charged
        if 'X-RateLimit-requests-Remaining' in response.headers:
            if int(response.headers['X-RateLimit-requests-Remaining']) <= 1:
                print(f"\n\nMet plan quota threshold of {threshold}, exiting")
                i_start += 1
                break
            if int(response.headers['X-RateLimit-requests-Remaining']) % 250 == 0:
                print(f"\n\nQuota used: {response.headers['X-RateLimit-requests-Remaining']}")

        print(f"Scraped ID: {i_start} with, {response.headers['X-RateLimit-requests-Remaining']} requests remaining")
    except:
        pass

    # Increment tracker
    i_start += 1

print(f"\n====\nNew Start: {i_start}")
