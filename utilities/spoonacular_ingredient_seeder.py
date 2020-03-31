import json
import os
import requests
import unicodedata

# Some quick hacks
def parse_str(stuff):
    stuff = stuff.replace("\u00bd", "1/2")
    stuff = stuff.replace(";", ".")
    stuff = stuff.replace("'", "''")
    stuff = unicodedata.normalize('NFKD', stuff).encode('ASCII', 'ignore')
    stuff = stuff.decode()
    return stuff


path = './spoonacular_recipes'
count = 0

ingredients = []  # done
recipes = []  # done
recipe_ingredients = []  # done
instructions = []

# Grab ingredient array
for root, directory, files in os.walk(path):
    for file in files:
        count += 1
        print("Starting on: " + str(count))

        with open(path + "/" + file, encoding="utf8") as f:
            recipe = json.load(f)

        # Exit conditions
        if 'status' in recipe and recipe['status'] == 'failure':
            continue

        if 'analyzedInstructions' not in recipe[0] or len(recipe[0]['analyzedInstructions']) == 0 or 'steps' not in \
                recipe[0]['analyzedInstructions'][0] or len(recipe[0]['analyzedInstructions'][0]['steps']) == 0:
            continue

        try:
            #
            # Grab Ingredients (for 2 reasons, first our ingredient list, and the ingredients for this recipe)
            #
            for ingredient in recipe[0]['extendedIngredients']:
                # Seed recipe ingredients table
                if ingredient['id'] is None:
                    continue

                recipe_ingredients.append({
                    'recipe_id': recipe[0]['id'],
                    'ingredient_id': ingredient['id'],
                    'amount': ingredient['measures']['us']['amount'],
                    'unit': ingredient['measures']['us']['unitLong']
                })

                # Search to see if this ingredient is already in our 'Ingredients' table
                # found = False
                # for ing in ingredients:
                #     if ing['id'] == ingredient['id']:
                #         found = True
                #         break
                # if not found:
                # Grab ingredient image
                # if ingredient['image'] is not None:
                #     with open('../front-end/public/img/ingredients/' + ingredient['image'], 'wb') as handle:
                #         response = requests.get('https://spoonacular.com/cdn/ingredients_100x100/' + ingredient['image'], stream=True)
                #
                #         for block in response.iter_content(1024):
                #             if not block:
                #                 break
                #             handle.write(block)

                # ingredients.append({
                #     'id': ingredient['id'],
                #     'name': ingredient['name'],
                #     'img': ingredient['image'],
                # })
            #
            # Grab Recipe Image
            #
            imgUrl = ''
            if 'image' in recipe[0] and  len(recipe[0]['image']) > 0:
                imgUrl = recipe[0]['image'].replace('https://spoonacular.com/recipeImages/', '')
                # with open('../front-end/public/img/recipes/' + imgUrl, 'wb') as handle:
                #     response = requests.get(recipe[0]['image'], stream=True)
                #
                #     if not response.ok:
                #         imgUrl = ''
                #
                #     for block in response.iter_content(1024):
                #         if not block:
                #             break
                #         handle.write(block)
            #
            # Process Recipe
            #
            vegetarian = 1 if recipe[0]['vegetarian'] is True else 0
            vegan = 1 if recipe[0]['vegan'] is True else 0
            glutenFree = 1 if recipe[0]['glutenFree'] is True else 0
            dairyFree = 1 if recipe[0]['dairyFree'] is True else 0
            healthy = 1 if recipe[0]['veryHealthy'] is True else 0
            sustainable = 1 if recipe[0]['sustainable'] is True else 0
            recipes.append({
                'id': recipe[0]['id'],
                'name': recipe[0]['title'],
                'cook_time': recipe[0]['readyInMinutes'],
                'servings': recipe[0]['servings'],
                'summary': recipe[0]['summary'],
                'image_url': imgUrl,
                'health_score': recipe[0]['healthScore'],
                'ww_points': recipe[0]['weightWatcherSmartPoints'],
                'ingredient_count': len(recipe[0]['extendedIngredients']),
                'vegetarian': vegetarian,
                'vegan': vegan,
                'gluten_free': glutenFree,
                'dairy_free': dairyFree,
                'healthy': healthy,
                'sustainable': sustainable
            })

            #
            # Grab Instructions
            #
            for step in recipe[0]['analyzedInstructions'][0]['steps']:
                instructions.append({
                    'recipe_id': recipe[0]['id'],
                    'sort_order': step['number'],
                    'direction': step['step']
                })
            f.close()
        except Exception as e:
            print(str(e))
            print(recipe)
            print(recipe[0]['id'])

print("Completed gathering")

# Create ingredient SQL
# characters = 0
# file_count = 1

# fw = open("../infrastructure/database/spoonacular/ingredients_1.sql", "w+")
# fw.write("INSERT INTO `Ingredient` (ID, IngredientName, ImageURL) VALUES ")
# for ingredient in ingredients:
#     name = ingredient['name'].replace("'", "''")
#     data = "('{0}', '{1}', '{2}'),\n".format(ingredient['id'], name, ingredient['img'])
#
#     fw.write(data)
#     characters += len(data)
#
#     if characters > 60000:
#         characters = 0
#         fw.close()
#         file_count += 1
#         fw = open("../infrastructure/database/spoonacular/ingredients_" + str(file_count) + ".sql", "w+")
#         fw.write("INSERT INTO `Ingredient` (ID, IngredientName, ImageURL) VALUES ")
# fw.close()

# Create recipe SQL
characters = 0
file_count = 1

try:
    fw = open("../infrastructure/database/spoonacular/recipes_1.sql", "w+")
    fw.write("INSERT INTO `Recipe` (ID, RecipeName, CookTime, IngredientCount, ImgURL, Servings, Summary, HealthScore, WeightWatcherPoints, Vegetarian, Vegan, GlutenFree, DairyFree, Healthy, Sustainable) VALUES ")
    for recipe in recipes:
        try:
            data = "('{0}', '{1}', '{2}', '{3}', '{4}', '{5}', '{6}', '{7}', '{8}', '{9}', '{10}', '{11}', '{12}', '{13}', '{14}'),\n".format(
                recipe['id'],
                parse_str(recipe['name']),
                recipe['cook_time'],
                recipe['ingredient_count'],
                parse_str(recipe['image_url']),
                recipe['servings'],
                parse_str(recipe['summary']),
                recipe['health_score'],
                recipe['ww_points'],
                recipe['vegetarian'],
                recipe['vegan'],
                recipe['gluten_free'],
                recipe['dairy_free'],
                recipe['healthy'],
                recipe['sustainable']
            )

            fw.write(data)
            characters += len(data)

            if characters > 60000:
                characters = 0
                fw.close()
                file_count += 1
                fw = open("../infrastructure/database/spoonacular/recipes_" + str(file_count) + ".sql", "w+")
                fw.write("INSERT INTO `Recipe` (ID, RecipeName, CookTime, IngredientCount, ImgURL, Servings, Summary, HealthScore, WeightWatcherPoints, Vegetarian, Vegan, GlutenFree, DairyFree, Healthy, Sustainable) VALUES ")
        except Exception as e:
            print(str(e))
            print(recipe['id'])

    fw.close()
except Exception as e:
    print(str(e))


# # Create recipe ingredients SQL
characters = 0
file_count = 1

try:
    fw = open("../infrastructure/database/spoonacular/recipes_list_item_1.sql", "w+")
    fw.write("INSERT INTO `RecipeListItem` (RecipeID, IngredientID, Amount, AmountUnitID) VALUES ")
    for ingredient in recipe_ingredients:
        try:
            data = "('{0}', '{1}', '{2}', '{3}'),\n".format(
                ingredient['recipe_id'],
                ingredient['ingredient_id'],
                ingredient['amount'],
                ingredient['unit'],
            )

            fw.write(data)
            characters += len(data)

            if characters > 60000:
                characters = 0
                fw.close()
                file_count += 1
                fw = open("../infrastructure/database/spoonacular/recipes_list_item_" + str(file_count) + ".sql", "w+")
                fw.write("INSERT INTO `RecipeListItem` (ID, RecipeID, IngredientID, Amount, AmountUnitID) VALUES ")
        except Exception as e:
            print(str(e))
            print(recipe['id'])

    fw.close()
except Exception as e:
    print(str(e))

# Create recipe instructions SQL
characters = 0
file_count = 1

try:
    fw = open("../infrastructure/database/spoonacular/directions_1.sql", "w+")
    fw.write("INSERT INTO `Directions` (RecipeID, SortOrder, Direction) VALUES ")
    for instruction in instructions:
        try:
            data = "('{0}', '{1}', '{2}'),\n".format(
                instruction['recipe_id'],
                instruction['sort_order'],
                parse_str(instruction['direction']),
            )

            fw.write(data)
            characters += len(data)

            if characters > 60000:
                characters = 0
                fw.close()
                file_count += 1
                fw = open("../infrastructure/database/spoonacular/directions_" + str(file_count) + ".sql", "w+")
                fw.write("INSERT INTO `Directions` (RecipeID, SortOrder, Direction) VALUES ")
        except Exception as e:
            print(str(e))
            print(recipe['id'])

    fw.close()
except Exception as e:
    print(str(e))