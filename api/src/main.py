from fastapi import FastAPI, Request
from fastapi.encoders import jsonable_encoder
from fastapi.exceptions import RequestValidationError
from fastapi.middleware.cors import CORSMiddleware
from fastapi.utils import is_body_allowed_for_status_code
from starlette import status
from starlette.exceptions import HTTPException as StarletteHTTPException, HTTPException
from starlette.responses import JSONResponse, Response

from .battle.routes import router as battle_router
from .error.exceptions import ResponseException
from .error.schemas import ErrorBadRequestResponseSchema, ErrorNotFoundResponseSchema, ErrorMethodResponseSchema, \
    ErrorValidationResponseSchema, ErrorServerResponseSchema, ErrorResponseSchema, ErrorNotAuthenticatedResponseSchema
from .error.validators import valid_response_error

_description = """
This API enables HTTP access to Post-battle. 🚀
"""

_options = {
    "title": "Post-battle API",
    "description": _description,
    "version": "1.0.0",
    "contact": {
        "name": "Maksim Stashkevich",
        "url": "https://makstashkevich.com",
    },
    "openapi_url": "/v1/openapi.json",
    "docs_url": "/",
    "redoc_url": None,
    "debug": True,
}

app = FastAPI(**_options)


@app.exception_handler(StarletteHTTPException)
async def http_exception_handler(request: Request, exc: HTTPException) -> Response:
    headers = getattr(exc, "headers", None)
    if not is_body_allowed_for_status_code(exc.status_code):
        return Response(status_code=exc.status_code, headers=headers)

    detail = exc.detail
    if type(detail) is str and "\n" in detail:
        detail = list(detail.split("\n"))

    error_data = {
        "detail": detail
    }
    if isinstance(exc, ResponseException):
        if exc.code:
            error_data['code'] = exc.code
        if exc.type:
            error_data['type'] = exc.type

    if exc.status_code == status.HTTP_400_BAD_REQUEST:
        error_response = ErrorBadRequestResponseSchema(**error_data)
    elif exc.status_code == status.HTTP_401_UNAUTHORIZED:
        error_response = ErrorNotAuthenticatedResponseSchema(**error_data)
    elif exc.status_code == status.HTTP_404_NOT_FOUND:
        error_response = ErrorNotFoundResponseSchema(**error_data)
    elif exc.status_code == status.HTTP_405_METHOD_NOT_ALLOWED:
        error_response = ErrorMethodResponseSchema(**error_data)
    elif exc.status_code == status.HTTP_500_INTERNAL_SERVER_ERROR:
        error_response = ErrorServerResponseSchema(**error_data)
    else:
        error_response = ErrorResponseSchema(**error_data)

    return JSONResponse(
        status_code=exc.status_code,
        headers=headers,
        content={
            "error": error_response.dict()
        },
    )


@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request: Request, exc: RequestValidationError) -> JSONResponse:
    error_data = {
        "detail": exc.errors(),
        "body": exc.body if exc.body is not None and type(exc.body) is dict else {}
    }
    error_response = ErrorValidationResponseSchema(**jsonable_encoder(error_data))
    return JSONResponse(
        status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
        content={
            "error": error_response.dict()
        },
    )


@app.middleware("http")
async def catch_exceptions_middleware(request: Request, call_next):
    try:
        return await call_next(request)
    except Exception as error:
        return await http_exception_handler(request, valid_response_error(error))


error_responses = {
    status.HTTP_400_BAD_REQUEST: {
        "model": ErrorBadRequestResponseSchema,
        "description": "Bad request"
    },
    status.HTTP_404_NOT_FOUND: {
        "model": ErrorNotFoundResponseSchema,
        "description": "Not found"
    },
    status.HTTP_405_METHOD_NOT_ALLOWED: {
        "model": ErrorMethodResponseSchema,
        "description": "Method not allowed"
    },
    status.HTTP_422_UNPROCESSABLE_ENTITY: {
        "model": ErrorValidationResponseSchema,
        "description": "Validation Error"
    },
    status.HTTP_500_INTERNAL_SERVER_ERROR: {
        "model": ErrorServerResponseSchema,
        "description": "Server Error"
    }
}

# Routes modules
v1_prefix = '/v1'
app.include_router(battle_router, prefix=v1_prefix, tags=['battle'], responses=error_responses)

# CORS urls
origins = [
    "http://localhost:3000",
    "http://localhost:3601",
    "https://makstashkevich.com",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)
