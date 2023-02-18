from starlette import status
from starlette.exceptions import HTTPException

from .codes import ErrorCodes


class ResponseException(HTTPException):
    status_code: int = status.HTTP_400_BAD_REQUEST
    detail: str | list[str] = "Bad request."
    code: int = ErrorCodes.DEFAULT
    type: str = "bad_request"
    key: str = None
    value = None

    def __init__(self, detail: str = None, **kwargs):
        if detail is not None:
            self.detail = detail
        values = ", ".join(f"{key}={value}" for key, value in kwargs.items())
        self.detail = self.detail.format(values=values)

    def __str__(self) -> str:
        return self.detail
