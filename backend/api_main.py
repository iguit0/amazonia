from fastapi import FastAPI


def create_app() -> FastAPI:
    from app.cdi import Injector

    return Injector.inject(FastAPI)
