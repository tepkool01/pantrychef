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



cd ../coverage
coverage combine -a
coverage html
coverage report