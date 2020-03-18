import json

with open("ingredients.json") as f:
    ingredients = json.load(f)

with open("recipe_ingredient_list.json", encoding="utf8") as fr:
    recipe_ingredients = json.load(fr)


characters = 0
file_count = 1

fw = open("ingredient_inserts/recipe_ingredients_1.sql", "w")
fw.write("INSERT INTO `RecipeListItem` (ID, RecipeID, IngredientID) VALUES ")
insert_index = 0
for recipe_ingredient_index in range(len(recipe_ingredients)):
    for ingredient_index in range(len(ingredients)):
        if ingredients[ingredient_index] in recipe_ingredients[recipe_ingredient_index]['ingredients'].lower():
            insert_index += 1
            data = "('{0}', '{1}', '{2}'),\n".format(insert_index, recipe_ingredients[recipe_ingredient_index]['recipeId'], ingredient_index+1)
            fw.write(data)
            characters += len(data)

            if characters > 60000:
                characters = 0
                fw.close()
                file_count += 1
                fw = open("ingredient_inserts/recipe_ingredients_" + str(file_count) + ".sql", "w")
                fw.write("INSERT INTO `RecipeListItem` (ID, RecipeID, IngredientID) VALUES ")


fw.close()
