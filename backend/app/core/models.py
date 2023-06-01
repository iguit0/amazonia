from typing import Any, Dict, Union

from pydantic import BaseModel, Field


class ErrorResponse(BaseModel):
    """Error response schema"""

    code: int = Field(..., example=1000)
    detail: Union[Dict[str, Any], None] = Field(None)
