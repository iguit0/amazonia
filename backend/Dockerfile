FROM python
WORKDIR /app
ADD requirements.txt .
COPY requirements ./requirements/
RUN python3 -m venv venv \
    && venv/bin/python -m pip install pip setuptools wheel --no-cache-dir --upgrade \
    && venv/bin/python -m pip install --no-cache-dir -r requirements.txt
COPY . .
ENV HOME="/app"
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1
ENV PATH="/${HOME}/venv/bin:$PATH"
ENV PYTHONPATH "${PYTHONPATH}:${HOME}"
EXPOSE 8000