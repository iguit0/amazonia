# FastRoute API

A lightweight RESTful service for optimizing drone delivery routes, enabling businesses to determine the fastest path for their aerial deliveries.

### Technologies

- [Python](https://www.python.org/)
- [FastAPI](https://fastapi.tiangolo.com/)
- [Pytest](https://docs.pytest.org/en/7.3.x/)
- [Mypy](https://mypy-lang.org/)
- [Docker](https://docs.docker.com/get-docker/)
  - [Docker-compose](https://docs.docker.com/engine/reference/commandline/compose/)


## Features

- [x] Linting
- [x] Create Makefile
- [x] Calculate shortest path using Dijkstra's algorithm
- [ ] List the last 10 trips previously calculated
- [ ] Dockerize
- [ ] Testing

### Configuration

1. Create a virtual environment

```shell
    make build-venv
```

2. Activate the virtual environment

```shell
    source venv/bin/activate
```

3. Configure env file

```shell
    make load-env
```

4. Install dependencies

```shell
    make requirements-dev 
```

### Linting

Run lint and type checkers to reformat files before commit

```shell
    make lint
```

### Running

```shell
    make run-dev
```

To open documentation navigate to http://localhost:8000/docs

### Routing Performance

Read [PERFORMANCE.md](./PERFORMANCE.md) for more details on routing performance algorithms.
