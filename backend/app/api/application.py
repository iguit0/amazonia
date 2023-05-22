from typing import TYPE_CHECKING

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

if TYPE_CHECKING:
    from app.utils.settings import Settings


def configure_middlewares(app: FastAPI, settings: "Settings") -> None:
    app.add_middleware(
        CORSMiddleware,
        allow_origins=settings.cors_allow_origins,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
        expose_headers=("X-Pagination",),
    )


def configure_routes(app: FastAPI) -> None:
    from .routers.health_router import router as health_router
    from .routers.delivery_router import router as delivery_router

    routes = (
        health_router,
        delivery_router
    )

    for router in routes:
        app.include_router(router)


def create_fastapi_application(settings: "Settings") -> FastAPI:
    from .openapi.generator import generate_description

    description_md = generate_description()

    app = FastAPI(
        title="Amazonia API",
        description=description_md,
        version=settings.version,
        openapi_tags=[
            {
                "name": "Deliveries",
                "description": "Delivery Services",
            },
            {
                "name": "Utils",
                "description": "Utilitary Services",
            }
        ],
        openapi_url=settings.openapi_path,
    )

    configure_middlewares(app, settings)
    configure_routes(app)

    return app
