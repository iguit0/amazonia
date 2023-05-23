import os
from http import HTTPStatus

import requests
from dotenv import load_dotenv

from app.common.exceptions import UnprocessableEntityException

load_dotenv()

API_URL = os.getenv("APP_EXTERNAL_DATA_TIME_API_URL")


def fetch_external_data():
    """Fetch external data from API"""
    if not API_URL:
        raise UnprocessableEntityException(
            HTTPStatus.UNPROCESSABLE_ENTITY,
            "External API URL not found",
            {"message": "External API URL not found"},
        )

    try:
        response = requests.get(API_URL, timeout=60)
        response.raise_for_status()
        return response.json()
    except requests.Timeout as timeout_error:
        raise timeout_error
    except requests.RequestException as request_exception_error:
        raise request_exception_error
