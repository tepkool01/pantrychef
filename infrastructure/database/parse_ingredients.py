import json

with open("ingredients.json") as f:
    ingredients = json.load(f)

with open("recipe_ingredient_list.json", encoding="utf8") as fr:
    recipe_ingredients = json.load(fr)

fw = open("recipe_ingredients.sql", "w")

insert_index = 0
for recipe_ingredient_index in range(len(recipe_ingredients)):
    for ingredient_index in range(len(ingredients)):
        if ingredients[ingredient_index] in recipe_ingredients[recipe_ingredient_index]['ingredients'].lower():
            insert_index += 1
            fw.write("REPLACE INTO `RecipeIngredients` SET `ID`='{0}' `RecipeID`='{1}' `IngredientID`='{2}';\n".format(insert_index, recipe_ingredients[recipe_ingredient_index]['recipeId'], ingredient_index))

fw.close()
