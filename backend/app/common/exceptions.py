from typing import Any, Dict, Final, Union

from fastapi import HTTPException, status

# TODO: Maybe should adopt RFC 7807? https://tools.ietf.org/html/rfc7807


class ApplicationException(HTTPException):
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
    def __init__(
        self,
        code: int,
        message: str = "Recurso em conflito",
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
    def __init__(
        self,
        code: int,
        message: str = "Não foi possível processar as instruções contidas na requisição ou no arquivo",
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
    def __init__(
        self,
        code: int,
        message: str = "O recurso solicitado não foi encontrado no servidor.",
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
    def __init__(
        self,
        code: int = status.HTTP_408_REQUEST_TIMEOUT,
        message: str = "O serviço não respondeu a tempo.",
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
    def __init__(
        self,
        code: int = status.HTTP_503_SERVICE_UNAVAILABLE,
        message: str = "Há um problema com o serviço nesse momento, tente novamente mais tarde",
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
