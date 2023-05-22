from fastapi import FastAPI

# TODO: separate routes from app (entry point)
app = FastAPI()


@app.get('/healthcheck')
def healthcheck():
    return 'OK'
