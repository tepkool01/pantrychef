import json
from os import path

with open("ingredients.json") as f:
    ingredients = json.load(f)

with open("recipe_ingredient_list.json", encoding="utf8") as fr:
    recipe_ingredients = json.load(fr)

with open("../../utilities/recipe_seed.json", encoding="utf8") as fr:
    recipe = json.load(fr)

characters = 0
file_count = 1

fw = open("recipe_inserts/recipe_1.sql", "w")
# fw.write("INSERT INTO `Recipe` (ID, RecipeName, CookTime, DietType, IngredientCount) VALUES ")
insert_index = 0

for recipe_ingredient_index in range(len(recipe_ingredients)):
    ingredient_count = 0
    for ingredient_index in range(len(ingredients)):
        if ingredients[ingredient_index] in recipe_ingredients[recipe_ingredient_index]['ingredients'].lower():
            ingredient_count += 1

    if path.exists("../../utilities/img/" + recipe_ingredients[recipe_ingredient_index]['recipeId'] + '.jpg'):
        img_url = recipe_ingredients[recipe_ingredient_index]['recipeId'] + '.jpg'
    else:
        img_url = ''

    insert_index += 1
    data = "UPDATE `Recipe` SET RecipeName='{1}', CookTime='{2}', DietType='{3}', IngredientCount='{4}', ImgURL='{5}' WHERE ID={0};\n".format(
        recipe_ingredients[recipe_ingredient_index]['recipeId'],
        recipe[recipe_ingredient_index]['recipe_name'],
        recipe[recipe_ingredient_index]['cook_time'],
        recipe[recipe_ingredient_index]['diet_type'],
        ingredient_count,
        img_url
    )

    fw.write(data)
    characters += len(data)

    if characters > 60000:
        characters = 0
        fw.close()
        file_count += 1
        fw = open("recipe_inserts/recipe_" + str(file_count) + ".sql", "w")


fw.close()
