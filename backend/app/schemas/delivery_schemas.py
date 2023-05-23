from pydantic import BaseModel, Field

VALID_POSITION = r"^[a-hA-H][1-8]$"


class DeliveryCoordinatesRequest(BaseModel):
    origin: str = Field(
        ...,
        title="Origin position. Where the drone is going to start",
        example="A1",
        regex=VALID_POSITION,
    )
    pickup: str = Field(
        ...,
        title="Object pickup position. Where the drone is going to pick up the package",
        example="B2",
        regex=VALID_POSITION,
    )
    destination: str = Field(
        ...,
        title="Destination position. Where the drone is going \
        to deliver the package",
        example="C8",
        regex=VALID_POSITION,
    )
