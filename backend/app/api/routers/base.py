from fastapi import Depends  # noqa
from fastapi.responses import PlainTextResponse  # noqa
from fastapi.routing import APIRouter  # noqa

from app.api.caching import no_cache

NoCache = Depends(no_cache)
