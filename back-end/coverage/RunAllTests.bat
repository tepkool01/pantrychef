del .coverage /q
cd ../lambdas/


cd ingredients/
coverage run --rcfile=../../coverage/.coveragerc -m unittest
rename .coverage .coverage.ingredients 
copy .coverage.ingredients ..\..\coverage\.coverage.ingredients /y
del .coverage.ingredients /q
cd ..

cd new-user/
coverage run --rcfile=../../coverage/.coveragerc -m unittest
rename .coverage .coverage.newuser
copy .coverage.newuser ..\..\coverage\.coverage.newuser /y
del .coverage.newuser /q
cd ..

cd pantry/
coverage run --rcfile=../../coverage/.coveragerc -m unittest
rename .coverage .coverage.pantry
copy .coverage.pantry ..\..\coverage\.coverage.pantry /y
del .coverage.pantry /q
cd ..

cd profiles/
coverage run --rcfile=../../coverage/.coveragerc -m unittest
rename .coverage .coverage.profile
copy .coverage.profile ..\..\coverage\.coverage.profile /y
del .coverage.profile /q
cd ..

cd recipes/
coverage run --rcfile=../../coverage/.coveragerc -m unittest
rename .coverage .coverage.recipes
copy .coverage.recipes ..\..\coverage\.coverage.recipes /y
del .coverage.recipes /q
cd ..

cd shopping-list/
coverage run --rcfile=../../coverage/.coveragerc -m unittest
rename .coverage .coverage.shoppinglist
copy .coverage.shoppinglist ..\..\coverage\.coverage.shoppinglist /y
del .coverage.shoppinglist /q
cd ..

cd user/
coverage run --rcfile=../../coverage/.coveragerc -m unittest
rename .coverage .coverage.user
copy .coverage.user ..\..\coverage\.coverage.user /y
del .coverage.user /q
cd ..


cd ../coverage
coverage combine -a
coverage html
coverage report