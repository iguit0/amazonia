from pydantic import BaseSettings, Field


class APISettings(BaseSettings):
    per_page_min: int = Field(1, ge=1)
    per_page_max: int = Field(50, ge=1)
    per_page_default: int = Field(10, ge=1)

    class Config:
        env_prefix = "APP_API_"
        env_file = ".env"
        env_file_encoding = "utf-8"


api_settings = APISettings()
