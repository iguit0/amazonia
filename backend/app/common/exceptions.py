from typing import Any, Dict, Final, Union

from fastapi import HTTPException, status

# TODO: Maybe should adopt RFC 7807? https://tools.ietf.org/html/rfc7807


class ApplicationException(HTTPException):
    """Base exception for application"""

    def __init__(
        self,
        status_code: int,
        code: int,
        message: str,
        detail: Any = None,
        headers: Union[Dict[str, Any], None] = None,
    ) -> None:
        super().__init__(status_code, detail, headers)

        self.code: Final = code
        self.message: Final = message


class ConflictException(ApplicationException):
    """Exception for conflict errors"""

    def __init__(
        self,
        code: int,
        message: str = "Conflict resource",
        detail: Any = None,
        headers: Union[Dict[str, Any], None] = None,
    ) -> None:
        super().__init__(
            status.HTTP_409_CONFLICT,
            code,
            message,
            detail,
            headers,
        )


class UnprocessableEntityException(ApplicationException):
    """Exception for unprocessable entity errors"""

    def __init__(
        self,
        code: int,
        message: str = "The instructions contained in the request or file could not be processed",
        detail: Any = None,
        headers: Union[Dict[str, Any], None] = None,
    ) -> None:
        super().__init__(
            status.HTTP_422_UNPROCESSABLE_ENTITY,
            code,
            message,
            detail,
            headers,
        )


class NotFoundException(ApplicationException):
    """Exception for not found errors"""

    def __init__(
        self,
        code: int,
        message: str = "Resource not found",
        detail: Any = None,
        headers: Union[Dict[str, Any], None] = None,
    ) -> None:
        super().__init__(
            status.HTTP_404_NOT_FOUND,
            code,
            message,
            detail,
            headers,
        )


class TimeoutException(ApplicationException):
    """Exception for timeout errors"""

    def __init__(
        self,
        code: int = status.HTTP_408_REQUEST_TIMEOUT,
        message: str = "Timeout error",
        detail: Any = None,
        headers: Union[Dict[str, Any], None] = None,
    ) -> None:
        super().__init__(
            status.HTTP_408_REQUEST_TIMEOUT,
            code,
            message,
            detail,
            headers,
        )


class ServiceUnavailableException(ApplicationException):
    """Exception for service unavailable errors"""

    def __init__(
        self,
        code: int = status.HTTP_503_SERVICE_UNAVAILABLE,
        message: str = "Service unavailable, try again later",
        detail: Any = None,
        headers: Union[Dict[str, Any], None] = None,
    ) -> None:
        super().__init__(
            status.HTTP_503_SERVICE_UNAVAILABLE,
            code,
            message,
            detail,
            headers,
        )
