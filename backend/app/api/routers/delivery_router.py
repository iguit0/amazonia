from typing import TYPE_CHECKING

from app.api.schemas.delivery_schemas import DeliveryCoordinatesRequest
from app.cdi import Injector

from .base import APIRouter, NoCache

if TYPE_CHECKING:
    from app.utils.settings import Settings

settings: "Settings" = Injector.lazy_inject("Settings")
router = APIRouter(prefix="/api/v1/deliveries")


@router.put(
    "/calculate",
    summary="Calculate the shortest path given the origin, pickup and destination positions",
    response_description="Returns the fastest path to pick up the package and \
     deliver it to the destination, as well as the time elapsed.",
    dependencies=(NoCache,),
    tags=["Deliveries"],
)
def calculate(delivery_coordinates: DeliveryCoordinatesRequest):
    """Calculate the shortest path and elapsed time"""
    # TODO: Implement properly the delivery router
    return {
        "origin": delivery_coordinates.origin,
        "pickup": delivery_coordinates.pickup,
        "destination": delivery_coordinates.destination,
    }
