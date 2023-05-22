from typing import TYPE_CHECKING

from app.api.schemas.health_schemas import HealthResponse
from app.cdi import Injector

from .base import APIRouter, NoCache, PlainTextResponse

if TYPE_CHECKING:
    from app.utils.settings import Settings

settings: "Settings" = Injector.lazy_inject("Settings")
router = APIRouter(prefix="/api/v1/health")


@router.get(
    "",
    summary="Healthcheck application",
    response_model=HealthResponse,
    response_model_by_alias=False,
    response_description="""In case of successful response from the application, you
    you will receive the following information:
- `pong`: Boolean value indicating success. Always `true`.
- `version`: API version.""",
    dependencies=(NoCache,),
    tags=["Utils"],
)
def ping():
    """
    With this _ping_ call you will be checking:

    - Whether the application is responding/alive.
    """

    return {"pong": True, "version": settings.version}


@router.get(
    "/version",
    summary="String with application version",
    response_description="Returns the application version in string format",
    response_class=PlainTextResponse,
    dependencies=(NoCache,),
    tags=["Utils"],
)
def get_version() -> str:
    """
    Returns API version in string format.
    """

    return settings.version
