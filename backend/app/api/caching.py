from fastapi import Response


def no_cache(response: Response):
    response.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
