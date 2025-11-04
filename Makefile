.PHONY: setup install fmt lint test check validate dev run clean

VENV := .venv
PY := $(VENV)/bin/python
PIP := $(VENV)/bin/pip
UVICORN := $(VENV)/bin/uvicorn
RUFF := $(VENV)/bin/ruff
BLACK := $(VENV)/bin/black
ISORT := $(VENV)/bin/isort
PYTEST := $(VENV)/bin/pytest

setup install:
	python3 -m venv $(VENV)
	$(PIP) install --upgrade pip
	$(PIP) install -r requirements.txt

fmt:
	$(BLACK) src tests
	$(ISORT) src tests

lint:
	$(RUFF) check src tests

test:
	PYTHONPATH=src $(PYTEST) -q

dev:
	PYTHONPATH=src $(UVICORN) app.main:app --reload --host 0.0.0.0 --port 8000

run:
	PYTHONPATH=src $(UVICORN) app.main:app --host 0.0.0.0 --port 8000

check validate:
	bash scripts/validate.sh

clean:
	rm -rf $(VENV) .pytest_cache .ruff_cache .mypy_cache
