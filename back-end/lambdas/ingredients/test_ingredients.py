import unittest
from moto import rds2

class IngredientTest(unittest.TestCase):

    @mock_rds2
    def test_Test1(self):
        self.assertEqual(1, 1)

    def test_Test2(self):
        self.assertEqual(2, 2)