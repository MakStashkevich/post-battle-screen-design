from pydantic import BaseModel

from .codes import ErrorCodes


class ErrorResponseSchema(BaseModel):
    code: int = ErrorCodes.SYSTEM
    type: str = "server_error"
    detail: str | list[str]
    # more_info: str


class ErrorServerResponseSchema(ErrorResponseSchema):
    pass  # clone


class ErrorBadRequestResponseSchema(ErrorResponseSchema):
    code: int = ErrorCodes.SYSTEM + 1
    type: str = "bad_request"


class ErrorNotAuthenticatedResponseSchema(ErrorResponseSchema):
    code: int = ErrorCodes.SYSTEM + 2
    type: str = "not_authenticated"


class ErrorNotFoundResponseSchema(ErrorResponseSchema):
    code: int = ErrorCodes.SYSTEM + 3
    type: str = "data_not_found"


class ErrorMethodResponseSchema(ErrorResponseSchema):
    code: int = ErrorCodes.SYSTEM + 4
    type: str = "method_not_allowed"


class ErrorValidationDetailSchema(BaseModel):
    loc: list[str | int]
    msg: str
    type: str


class ErrorValidationResponseSchema(ErrorResponseSchema):
    code: int = ErrorCodes.SYSTEM + 5
    type: str = "sent_invalid_data"
    detail: list[ErrorValidationDetailSchema]
    body: dict = {}
