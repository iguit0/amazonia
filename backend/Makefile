ISORT_PYTHON_VERSION=311

# Run

.PHONY: build-venv
build-venv:
	python -m venv venv

.PHONY: requirements-dev
requirements-dev:
	python -m pip install --upgrade pip
	pip install wheel
	pip install -r requirements.txt

.PHONY: run-dev
run-dev:
	uvicorn api_main:app --reload

# Lint Check

bandit-check:
	bandit -r -f custom app

black-check:
	@venv/bin/black --config ./devtools/black.toml --check .

deadfixtures-check:
	@py.test --dead-fixtures --dup-fixtures

flake8-check:
	flake8 --config ./devtools/flake8.ini

isort-check:
	isort -c --py ${ISORT_PYTHON_VERSION} --profile=black -l 79 .

mypy-checking:
	@mypy app

lint-check: isort-check black-check bandit-check flake8-check mypy-checking deadfixtures-check

# Lint
black:
	@venv/bin/black --config ./devtools/black.toml .

isort:
	isort --py ${ISORT_PYTHON_VERSION} --profile=black -l 79 .

lint: isort black flake8-check mypy-checking deadfixtures-check