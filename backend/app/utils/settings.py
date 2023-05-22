from typing import Set

from pydantic import BaseSettings, Field

from .release import APP_VERSION


class Settings(BaseSettings):
    cors_allow_origins: Set[str] = Field(
        default_factory=lambda: {"*"}, title="Origins released for CORS"
    )

    openapi_path: str = Field(
        "/openapi.json",
        title=("Path to export OpenAPI, leave empty to not export."),
    )

    @property
    def version(self) -> str:
        return APP_VERSION

    class Config:
        env_prefix = "APP_"
        env_file = ".env"
        env_file_encoding = "utf-8"
