from typing import TYPE_CHECKING

from app.cdi import Module, SingletonScope

if TYPE_CHECKING:
    from app.utils.settings import Settings


class FastAPIModule(Module):
    @staticmethod
    def fastapi_provider(settings: "Settings"):
        from .application import create_fastapi_application

        return create_fastapi_application(settings)

    def configure(self) -> None:
        from fastapi import FastAPI

        self.bind(
            FastAPI, to_provider=self.fastapi_provider, scope=SingletonScope
        )
