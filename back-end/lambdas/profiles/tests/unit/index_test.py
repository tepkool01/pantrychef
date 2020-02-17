from unittest import TestCase
import json

from profiles.tests.unit.testdata import SUCCESS_PAYLOAD, CREATE_EVENT
from profiles.index import lambda_handler  # will be used to run the tests later


class IndexTest(TestCase):
    def test_happy_path(self):
        result = lambda_handler({}, {})  # passing empty event and context for now
        self.assertEqual(SUCCESS_PAYLOAD, result)

    def test_success_status_code(self):
        result = lambda_handler({}, {})
        self.assertEqual(200, result["statusCode"])

    def test_retrieve_profiles(self):
        self.assertEqual([], None)

    def test_retrieve_one_profile(self):
        result = lambda_handler({}, {})  # todo: in the event (first param), we will pass in an ID to retrieve a profile
        data = json.loads(result["body"])
        self.assertEqual(1, len(data))

    def test_create_profile(self):
        result = lambda_handler(CREATE_EVENT, {})
        data = json.loads(result["body"])
        self.assertEqual(CREATE_EVENT, data)

    def test_add_item_to_profile(self):
        result = lambda_handler({}, {})
        self.assertEqual(True, False)

    def test_remove_item_from_profile(self):
        result = lambda_handler({}, {})
        self.assertEqual(True, False)