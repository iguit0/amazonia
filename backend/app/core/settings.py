from pydantic import BaseSettings


class APISettings(BaseSettings):
    class Config:
        env_prefix = "APP_API_"
        env_file = ".env"
        env_file_encoding = "utf-8"


api_settings = APISettings()
