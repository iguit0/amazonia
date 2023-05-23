from pydantic import BaseModel, Field


class HealthResponse(BaseModel):
    pong: bool = Field(
        ...,
        title="Boolean value indicating whether the API is healthy or not",
    )
    version: str = Field(title="API Version")

    class Config:
        schema_extra = {"example": {"pong": True, "version": "0.0.1"}}
