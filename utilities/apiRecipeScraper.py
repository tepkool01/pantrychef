########################################################################
#    Purpose: The purpose of this script is to remove duplicate URLs
#    Author: Michael Rodriguez
#    Date: 03/17/2020
#########################################################################

# import necessary libraries
from bs4 import BeautifulSoup
import requests
import json
import time
import os
import re

# path with the urls we want to scrape
strPath = os.path.join(os.getcwd(),'myfridgefoodURLs.txt')

with open(strPath, 'r') as f:
    x = f.readlines()
    out_list=[]
    for url in x:
        print(url)
        # need to add headers to avoid getting the 'get' rejected
        response = requests.get(os.path.join(url.replace("\n","")), headers={'Cache-Control': 'private', 'Content-Type': 'text/html; charset=utf-8',
        'Content-Encoding': 'gzip', 'Vary': 'Accept-Encoding', 'Date': 'Tue, 18 Feb 2020 02:11:16GMT'})

        # use BeatifulSoup to get data in a nice format 
        content = BeautifulSoup(response.content, "html.parser")

        # retrieve title
        title = content.findAll('title')
        title = str(title).replace("<title>"," ")
        title = str(title).replace("</title>"," ")
        title = str(title).replace("[MyFridgeFood - "," ")
        title = str(title).replace("[ MyFridgeFood - "," ")
        title = str(title).replace("]","")
        title = str(title).replace("<p>","")
        title = re.sub(r'<.+?>',"", title)
        title = " ".join(title.split())

        # retrieve ingredients
        try:
            ingredients = content.findAll('p', attrs={"style": "margin-bottom: 20px;"})[1]
        except IndexError:
            ingredients = content.findAll('p', attrs={"style": "margin-bottom: 20px;"})
        ingredients = str(ingredients).replace("</p>"," ")
        ingredients = str(ingredients).replace(">\n"," ")
        ingredients = str(ingredients).replace("\n"," ")
        ingredients = str(ingredients).replace("<ul"," ")
        ingredients = str(ingredients).replace("</ul"," ")
        ingredients = str(ingredients).replace("<li>"," ")
        ingredients = str(ingredients).replace("</li",", ")
        ingredients = str(ingredients).replace("<br/>"," ")
        ingredients = str(ingredients).replace("<br>"," ")
        ingredients = str(ingredients).replace("<br/"," ")
        ingredients = str(ingredients).replace("["," ")
        ingredients = str(ingredients).replace("]"," ")
        ingredients = str(ingredients).replace("<p>"," ")
        ingredients = str(ingredients).replace("<span>"," ")
        ingredients = str(ingredients).replace("</span>"," ")
        ingredients = str(ingredients).replace("\u00c2\u00b0","")
        ingredients = str(ingredients).replace("\u00b0","")
        ingredients = str(ingredients).replace("\u201c","")
        ingredients = str(ingredients).replace("\u2013","")
        ingredients = str(ingredients).replace("\u201d","")
        ingredients = str(ingredients).replace("\u00e2","")
        ingredients = str(ingredients).replace("\u20ac","")
        ingredients = str(ingredients).replace("\u00a2","")
        ingredients = str(ingredients).replace("</div"," ")
        ingredients = re.sub(r'<.+?>',"", ingredients)
        ingredients = str(ingredients).replace("<li class=\"ingredient\">"," ")
        ingredients = str(ingredients).replace("<p style=\"margin-bottom: 20px;\""," ")
        ingredients = " ".join(ingredients.split())

        # retrieve steps
        steps = content.findAll('p', attrs={"style": "margin-bottom: 10px;"})
        steps = str(steps).replace("</p>"," ")
        steps = str(steps).replace(">\n"," ")
        steps = str(steps).replace("\n"," ")
        steps = str(steps).replace("["," ")
        steps = str(steps).replace("]"," ")
        steps = str(steps).replace("</span>"," ")
        steps = str(steps).replace("</ul"," ")
        steps = str(steps).replace("<span>"," ")
        steps = str(steps).replace("\u00e2\u20ac\u2122","")
        steps = str(steps).replace("\2019","")
        steps = str(steps).replace("<ol"," ")
        steps = str(steps).replace("</ol"," ")
        steps = str(steps).replace("<li>"," ")
        steps = str(steps).replace("</li"," ")
        steps = str(steps).replace("<br/>"," ")
        steps = str(steps).replace("<br/"," ")
        steps = str(steps).replace("<br>"," ")
        steps = str(steps).replace("\xa0"," ")
        steps = str(steps).replace("<p>"," ")
        steps = str(steps).replace("</div"," ")
        steps = str(steps).replace("<li class=\"instruction\">"," ")
        steps = re.sub(r'<.+?>',"", steps)
        steps = str(steps).replace("<p style=\"margin-bottom: 10px;\""," ")
        steps = " ".join(steps.split())

        # retrieve duration
        try:
            duration = content.findAll('td', attrs={"style": "width: 40%; text-align: right;"})[0]
        except:
            duration = content.findAll('td', attrs={"style": "width: 40%; text-align: right;"})
        duration = str(duration).replace("<td style=\"width: 40%; text-align: right;\">"," ")
        duration = str(duration).replace("</td>"," ")
        duration = str(duration).replace("\n"," ")
        duration = str(duration).replace("<p>"," ")
        duration = str(duration).replace("</span>"," ")
        duration = str(duration).replace("<span>"," ")
        duration = str(duration).replace("<br/>"," ")
        duration = str(duration).replace("<br/"," ")
        duration = str(duration).replace("<br>"," ")
        duration = str(duration).replace("</div"," ")
        duration = re.sub(r'<.+?>',"", duration)
        duration = " ".join(duration.split())

        # create json object
        recipe_object = {
            "Recipe_Name": title,
            "Ingredients": ingredients,
            "Cooking_Steps": steps,
            "Cooking_Duration": duration}
        print(recipe_object)
        out_list.append(recipe_object)
    output_json_file = os.path.join(os.getcwd(),'out.json')
    json_file = open(output_json_file, 'w')
    # dump json object into json file
    json.dump(out_list,json_file)
json_file.close()