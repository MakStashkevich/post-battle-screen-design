import logging

from .exceptions import ResponseException


def valid_response_error(error: Exception) -> ResponseException:
    logging.exception(error)
    error = error if isinstance(error, ResponseException) else ResponseException(str(error))
    return error
