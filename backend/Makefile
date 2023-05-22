.PHONY: build-venv
build-venv:
	python3.11 -m venv venv

.PHONY: requirements-dev
requirements-dev:
	python -m pip install --upgrade pip
	pip install wheel
	pip install -r requirements/develop.txt

.PHONY: run-dev
run-dev:
	uvicorn --factory api_main:create_app --reload