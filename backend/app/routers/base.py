from fastapi import Depends  # noqa
from fastapi.responses import PlainTextResponse  # noqa
from fastapi.routing import APIRouter  # noqa

from app.core.caching import no_cache

NoCache = Depends(no_cache)
