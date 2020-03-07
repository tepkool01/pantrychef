########################################################################
#    Purpose: The purpose of this python script is to get the accurate varchar
#             size for Directions and IngredientList
#    Author: Michael Rodriguez
#    Date: 03/04/2020
#########################################################################

#necessary libraries
import json


#Tables of Interests
recipeTable = "Recipe"
ingredientTable = "RecipeIngredients"
directionsTable = "Directions"

replaceIntoRecipeStatement = ''
replaceIntoIngredientListStatement = ''
replaceIntoDirectionsStatement = ''

with open('recipe_info.json', 'r') as f:
	jsondata = json.loads(f.read())

directions_max = 0
ingredients_max = 0
for json in jsondata:
	dict_items = json.items()
	a,b,c,d = dict_items
	new_directions_max = len(c[1])
	if new_directions_max > directions_max:
		directions_max = new_directions_max

	new_ingredients_max = len(b[1])
	if new_ingredients_max > ingredients_max:
		ingredients_max = new_ingredients_max
print(directions_max)
print(ingredients_max)