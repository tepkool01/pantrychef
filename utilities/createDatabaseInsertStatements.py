########################################################################
#    Purpose: The purpose of this python script is to read in a json file and create a text file
#             with insert statements of the recipes into the appropriate table.
#    Author: Michael Rodriguez
#    Date: 03/05/2020
#########################################################################

#necessary libraries
import json
import io


#Tables of Interests
recipeTable = "Recipe"
ingredientTable = "RecipeIngredients"
directionsTable = "Directions"

replaceIntoRecipeStatement = ''
replaceIntoIngredientListStatement = ''
replaceIntoDirectionsStatement = ''

recipeSeed = "recipeSeed.sql"
recipeIngredientsList = "recipeIngredientsListSeed.sql"
directionsSeed = "recipeDirectionsSeed.sql"

with open('recipe_info.json', 'r') as f:
	jsondata = json.loads(f.read())

count = 1
for json in jsondata:
	dict_items = json.items()
	a,b,c,d = dict_items
	replaceIntoRecipeStatement += "REPLACE INTO '" + recipeTable + "' SET 'ID'='" +  str(count) + "', 'RecipeName'='" + a[1] + "', CookTime'='" + d[1] + "', DietType'='" + 'TBD' + "';\n"
	replaceIntoIngredientListStatement += "REPLACE INTO '" + ingredientTable + "' SET 'ID'='" +  str(count) + "', 'RecipeID'='" + str(count) +"', 'IngredientList'='" + b[1] + "';\n"
	replaceIntoDirectionsStatement += "REPLACE INTO '" + directionsTable + "' SET 'ID'='" +  str(count) + "', 'RecipeID'='" + str(count) +"', 'SortOrder'='" + '0' +"', 'Directions'='" + c[1] + "';\n"
	count = count + 1
	with io.open(recipeSeed, 'w', encoding="utf-8") as f1:
		f1.write(replaceIntoRecipeStatement)
	with io.open(recipeIngredientsList, 'w', encoding="utf-8") as f2:
		f2.write(replaceIntoIngredientListStatement)
	with io.open(directionsSeed, 'w', encoding="utf-8") as f3:
		f3.write(replaceIntoDirectionsStatement)
	# print(replaceIntoRecipeStatement)
	# print(replaceIntoIngredientListStatement)
	# print(replaceIntoDirectionsStatement)

