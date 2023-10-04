import pytest
from server.model import Secret
from datetime import datetime, timedelta
from unittest.mock import Mock, patch
from pytest import MonkeyPatch
from server.logic import is_out_of_views, is_expired, update_views, validate_input_keys, validate_input_data
from server import logic 
from server.exception import SecretServiceError
from contextlib import nullcontext as does_not_raise



@pytest.mark.parametrize(
        "remaining_view, boolean", [
            ( 4, False),
            ( 0, True),
            ( -4, True)
        ] 
)
def test_is_out_of_views(remaining_view, boolean):
    secret = Secret("abc", "secret", datetime.now(), datetime.now(), remaining_view)
    result = is_out_of_views(secret)
    assert result == boolean



@pytest.mark.parametrize(
        "date, boolean", [
            (datetime.now() + timedelta(1), False),
            (datetime.now() - timedelta(1), True),
        ]
)
def test_is_expired(date, boolean):
        secret = Secret("abc", "secret", datetime.now(), date, 5)
        result = is_expired(secret)
        assert result == boolean



@pytest.fixture
def mock_get(monkeypatch:MonkeyPatch):
    mock = Mock(return_value=None)
    monkeypatch.setattr(logic, "update_secret_remaining_views", mock)
    return mock

def test_update_views(mock_get:Mock):
    secret = Secret("abc", "secret", datetime.now(), datetime.now(), 5)
    update_views(secret)
    assert secret.remaining_views == 4
    assert mock_get.call_count == 1
    mock_get.assert_called_with(secret.hash, 4)



@pytest.mark.parametrize(
          "incoming_data, expectation", [
               ( {}, pytest.raises(SecretServiceError)),
               ( {"secret_text": "", "expire_after_views": ""}, pytest.raises(SecretServiceError)),
               ( {"secret_text": "", "expire_after": "", "expire_after_views": ""}, does_not_raise()),
               ( {"secret_text": "", "expire_after": "", "expire_after_views": "", "unexpected_key": ""}, pytest.raises(SecretServiceError)),
          ]
)
def test_validate_input_keys(incoming_data, expectation):
    with expectation:
        validate_input_keys(incoming_data)
    
    


@pytest.mark.parametrize(
          "incoming_data, expectation", [
               ({"expire_after_views": "text", "expire_after": 2}, pytest.raises(SecretServiceError)),
               ({"expire_after_views": -2, "expire_after": 2}, pytest.raises(SecretServiceError)),
               ({"expire_after_views": 2, "expire_after": "text"}, pytest.raises(SecretServiceError)),
               ({"expire_after_views": 2, "expire_after": -2}, pytest.raises(SecretServiceError)),
               ({"expire_after_views": 2, "expire_after": 2}, does_not_raise()),
          ]
)
def test_validate_input_data(incoming_data, expectation):
     with expectation:
          validate_input_data(incoming_data)