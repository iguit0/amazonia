from pydantic import BaseModel, Field


class DeliveryCoordinatesRequest(BaseModel):
    origin: str = Field(
        ...,
        title="Origin position. Where the drone is going to start",
        example="A1",
    )
    pickup: str = Field(
        ...,
        title="Object pickup position. Where the drone is going to pick up the package",
        example="B2",
    )
    destination: str = Field(..., title="Destination position. Where the drone is going \
        to deliver the package",
        example="C8",
    )

