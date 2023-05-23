from app.business.delivery import calculate_path
from app.schemas.delivery import DeliveryCoordinatesRequest, DeliveryResponse

from .base import APIRouter, NoCache

router = APIRouter(prefix="/api/v1/deliveries")


@router.put(
    "/calculate",
    summary="Calculate the shortest path given the origin, pickup and destination positions",
    response_model=DeliveryResponse,
    response_description="Returns the fastest path to pick up the package and \
     deliver it to the destination, as well as the time elapsed.",
    dependencies=(NoCache,),
    tags=["Deliveries"],
)
def calculate(coordinates: DeliveryCoordinatesRequest) -> DeliveryResponse:
    """Calculates the best path for a delivery, given the origin, pickup, and destination coordinates"""
    return calculate_path(delivery_coordinates=coordinates)
