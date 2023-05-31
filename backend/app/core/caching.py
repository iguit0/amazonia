from fastapi import Response


def no_cache(response: Response):
    """Add headers to disable caching"""
    response.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
