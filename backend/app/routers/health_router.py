from app.schemas.health import HealthResponse
from app.utils.settings import APP_VERSION

from .base import APIRouter, NoCache, PlainTextResponse

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

    return {"pong": True, "version": APP_VERSION}


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

    return APP_VERSION
